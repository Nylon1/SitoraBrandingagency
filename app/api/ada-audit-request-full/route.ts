import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function normaliseUrl(input: string): string {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error("Website URL is required");
  }

  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  return new URL(withProtocol).toString();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const websiteUrl = normaliseUrl(body.websiteUrl);

    const { data, error } = await supabase
      .from("ada_audit_requests")
      .insert({
        practice_name: body.practiceName || null,
        website_url: websiteUrl,
        contact_name: body.contactName || null,
        email: body.email || null,
        phone: body.phone || null,
        notes: body.notes || null,
        audit_type: "full_ada_accessibility_audit",
        status: "new",
        pages_requested: 25,
      })
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      id: data.id,
      ok: true,
    });
  } catch (error: any) {
    console.error("ADA audit request error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to submit audit request",
      },
      {
        status: 500,
      }
    );
  }
}