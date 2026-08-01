import { NextRequest, NextResponse } from "next/server";
import {
  COACH_SCHEMAS,
  COACH_SYSTEM_PROMPT,
  buildCoachInput,
  responseFormatName,
} from "../../../../lib/human-signal/coachServer";
import type { CoachRequest } from "../../../../lib/human-signal/coachTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function extractOutputText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";

  const candidate = payload as {
    output_text?: unknown;
    output?: Array<{
      content?: Array<{ type?: unknown; text?: unknown }>;
    }>;
  };

  if (typeof candidate.output_text === "string") return candidate.output_text;

  for (const item of candidate.output ?? []) {
    for (const part of item.content ?? []) {
      if (part.type === "output_text" && typeof part.text === "string") {
        return part.text;
      }
    }
  }

  return "";
}

function isCoachRequest(value: unknown): value is CoachRequest {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { task?: unknown; context?: unknown };
  return (
    (candidate.task === "idea_angles" ||
      candidate.task === "builder_questions" ||
      candidate.task === "deep_review" ||
      candidate.task === "weave_review") &&
    Boolean(candidate.context) &&
    typeof candidate.context === "object"
  );
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "OPENAI_API_KEY is not configured. HumanSignal will continue with its built-in local coach.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON request." }, { status: 400 });
  }

  if (!isCoachRequest(body)) {
    return NextResponse.json({ ok: false, error: "Invalid coaching request." }, { status: 400 });
  }

  if (body.task === "deep_review" && body.context.post.trim().length > 6000) {
    return NextResponse.json({ ok: false, error: "The post is too long to review." }, { status: 400 });
  }

  if (
    body.task === "weave_review" &&
    body.context.originalPost.trim().length > 6000
  ) {
    return NextResponse.json(
      { ok: false, error: "The post is too long to weave." },
      { status: 400 },
    );
  }

  if (
    body.task === "weave_review" &&
    (!Array.isArray(body.context.inputs) || body.context.inputs.length < 1)
  ) {
    return NextResponse.json(
      { ok: false, error: "At least one human input is required." },
      { status: 400 },
    );
  }

  try {
    const model = process.env.OPENAI_MODEL || "gpt-5-mini";
    const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        store: false,
        instructions: COACH_SYSTEM_PROMPT,
        input: buildCoachInput(body),
        max_output_tokens: 2400,
        text: {
          verbosity: "medium",
          format: {
            type: "json_schema",
            name: responseFormatName(body.task),
            strict: true,
            schema: COACH_SCHEMAS[body.task],
          },
        },
      }),
    });

    const payload = (await openAiResponse.json()) as unknown;

    if (!openAiResponse.ok) {
      const detail =
        payload && typeof payload === "object" && "error" in payload
          ? JSON.stringify((payload as { error: unknown }).error)
          : "Unknown OpenAI API error";
      console.error("HumanSignal coach API error:", detail);
      return NextResponse.json(
        { ok: false, error: "The intelligent coach could not respond. The local coach is still available." },
        { status: 502 },
      );
    }

    const outputText = extractOutputText(payload);
    if (!outputText) {
      throw new Error("The OpenAI response contained no structured output text.");
    }

    const data = JSON.parse(outputText) as unknown;
    return NextResponse.json({ ok: true, mode: "ai", data });
  } catch (error) {
    console.error("HumanSignal coach route failed:", error);
    return NextResponse.json(
      { ok: false, error: "The intelligent coach is temporarily unavailable. The local coach is still available." },
      { status: 502 },
    );
  }
}
