import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TrustIssue = {
  title: string;
  description: string;
  where_found: string;
  risk_level: "Critical" | "High" | "Medium" | "Low";
  category: string;
  regulator_body: string;
  suggested_fix: string;
};

type TrustVerdict = {
  score: number;
  verdict: "Low Risk" | "Medium Risk" | "High Risk" | "Critical Risk";
  summary: string;
  mapped_bodies: string[];
  top_risks: string[];
  issues: TrustIssue[];
  disclaimer: string;
};

function cleanText(input: string) {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 12000);
}

async function fetchPageText(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 SitoraTrust360Bot/1.0 digital risk review",
      },
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      return "";
    }

    const html = await response.text();
    return cleanText(html);
  } catch {
    return "";
  }
}

function fileToDataUrl(buffer: Buffer, mimeType: string) {
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

function safeString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function fallbackVerdict(args: {
  sector: string;
  region: string;
  pageText: string;
  fileName: string;
}): TrustVerdict {
  const text = args.pageText.toLowerCase();

  const issues: TrustIssue[] = [];

  const superiorityTriggers = [
    "no.1",
    "number 1",
    "best",
    "leading",
    "most trusted",
    "guaranteed",
    "guarantee",
  ];

  if (superiorityTriggers.some((term) => text.includes(term))) {
    issues.push({
      title: "Potential unsupported advertising claim",
      description:
        "The submitted page may contain superiority or guarantee-style wording that usually needs clear evidence before publication.",
      where_found: "Submitted page URL",
      risk_level: "High",
      category: "Misleading advertising / substantiation",
      regulator_body: "ASA/CAP",
      suggested_fix:
        "Add clear evidence for the claim or soften the wording so it does not read as a factual promise.",
    });
  }

  if (
    text.includes("from £") ||
    text.includes("from only") ||
    text.includes("offer") ||
    text.includes("limited time")
  ) {
    issues.push({
      title: "Pricing or offer clarity risk",
      description:
        "The page may contain price or promotional wording that needs clear conditions, availability and expiry details.",
      where_found: "Submitted page URL",
      risk_level: "Medium",
      category: "Pricing / promotional marketing",
      regulator_body: "ASA/CAP / CMA",
      suggested_fix:
        "Clarify what is included, what is excluded, eligibility, expiry dates and any compulsory fees.",
    });
  }

  if (
    ["Dental", "Healthcare", "Aesthetics"].includes(args.sector) &&
    (text.includes("treatment") ||
      text.includes("pain free") ||
      text.includes("clinically proven") ||
      text.includes("results"))
  ) {
    issues.push({
      title: "Health or treatment claim risk",
      description:
        "Health, treatment and outcome claims usually require careful evidence, balanced wording and appropriate disclaimers.",
      where_found: "Submitted page URL or uploaded evidence",
      risk_level: "High",
      category: "Sector-specific health claims",
      regulator_body:
        args.sector === "Dental" ? "GDC / ASA/CAP" : "CQC / ASA/CAP",
      suggested_fix:
        "Avoid promising outcomes. Explain suitability, limitations and the need for professional assessment.",
    });
  }

  if (!text.includes("privacy") && !text.includes("cookie")) {
    issues.push({
      title: "Privacy and cookie visibility gap",
      description:
        "The submitted evidence does not clearly show privacy or cookie information, which may matter if personal data is collected.",
      where_found: "Submitted page URL",
      risk_level: "Low",
      category: "Privacy / data collection",
      regulator_body: "ICO",
      suggested_fix:
        "Make privacy, cookies and data-use wording clear near forms and in footer policy links.",
    });
  }

  if (issues.length === 0) {
    issues.push({
      title: "No obvious major risk found in automated fallback scan",
      description:
        "No major trigger terms were detected, but a full review may still find issues in images, claims, policies or sector wording.",
      where_found: "Submitted evidence",
      risk_level: "Low",
      category: "General digital trust",
      regulator_body: "General",
      suggested_fix:
        "Complete a full audit before relying on the page for paid advertising or regulated-sector promotion.",
    });
  }

  const deductions = issues.reduce((total, issue) => {
    if (issue.risk_level === "Critical") return total + 25;
    if (issue.risk_level === "High") return total + 15;
    if (issue.risk_level === "Medium") return total + 8;
    return total + 3;
  }, 0);

  const score = Math.max(0, Math.min(100, 100 - deductions));

  const verdict =
    score >= 85
      ? "Low Risk"
      : score >= 65
        ? "Medium Risk"
        : score >= 40
          ? "High Risk"
          : "Critical Risk";

  return {
    score,
    verdict,
    summary:
      "This preliminary verdict is based on automated review of the submitted page and uploaded evidence. It highlights risk signals, not confirmed legal breaches.",
    mapped_bodies: Array.from(
      new Set(issues.map((issue) => issue.regulator_body)),
    ),
    top_risks: issues.slice(0, 3).map((issue) => issue.title),
    issues,
    disclaimer:
      "This verdict is based only on the submitted page, uploaded evidence, selected sector and visible digital content reviewed at the time of the scan. It is not legal advice and does not guarantee compliance.",
  };
}

function extractJson(text: string): TrustVerdict | null {
  try {
    return JSON.parse(text) as TrustVerdict;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]) as TrustVerdict;
    } catch {
      return null;
    }
  }
}
async function loadTrust360Rules(args: { sector: string; region: string }) {
  const supabase = createSupabaseAdmin();
  const country = args.region || "UK";

  const { data, error } = await supabase
    .from("trust360_rules")
    .select(
      "country, sector, regulator_body, category, rule_summary, trigger_terms, risk_level, guidance, suggested_fix_template",
    )
    .eq("country", country)
    .eq("is_active", true)
    .in("sector", ["General", args.sector])
    .order("regulator_body", { ascending: true })
    .limit(120);

  if (error) {
    console.error("Trust360 rules load error:", error);
    return "";
  }

  return (data || [])
    .map((rule, index) => {
      return `
Rule ${index + 1}
Country: ${rule.country}
Sector: ${rule.sector}
Body/Risk Area: ${rule.regulator_body}
Category: ${rule.category}
Risk Level: ${rule.risk_level}
Rule Summary: ${rule.rule_summary}
Trigger Terms: ${(rule.trigger_terms || []).join(", ")}
Guidance: ${rule.guidance || ""}
Suggested Fix Template: ${rule.suggested_fix_template || ""}
`;
    })
    .join("\n");
}


async function generateAiVerdict(args: {
  websiteUrl: string;
  sector: string;
  region: string;
  pageText: string;
  fileName: string;
  fileMimeType: string;
  fileDataUrl: string;
  rulesText: string;
}) {
  const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-4.0-mini";

console.log("Trust360 AI mode:", apiKey ? `OpenAI using ${model}` : "Fallback scanner");

if (!apiKey) {
  console.log("Trust360 using fallback because OPENAI_API_KEY is missing");

  return fallbackVerdict({
    sector: args.sector,
    region: args.region,
    pageText: args.pageText,
    fileName: args.fileName,
  });
}

 
const prompt = `
You are Sitora Trust 360, a digital claims and trust risk reviewer.

You must assess the submitted evidence against the Sitora rule pack below. Use the rules as your primary checklist. Do not invent confirmed legal breaches. Use cautious wording such as "potential", "may", "risk signal", "should be reviewed".

SITORA RULE PACK:
"""
${args.rulesText || "No database rules were loaded. Use general UK digital risk review principles cautiously."}
"""

Review ONLY the submitted evidence:
- Specific page URL: ${args.websiteUrl}
- Sector: ${args.sector}
- Region: ${args.region}
- Uploaded file name: ${args.fileName}
- Extracted page text:
"""
${args.pageText || "No page text could be extracted."}
"""

Assess potential digital risk signals. Do not say there is a definite breach. Use cautious wording: "potential", "may", "risk signal", "should be reviewed".

Map issues against relevant risk areas such as:
- ASA/CAP advertising standards
- CMA consumer protection
- ICO privacy/data/cookies
- Trading Standards enforcement risk
- FCA financial promotions if finance/credit/investment wording appears
- Sector bodies where relevant:
  Dental: GDC
  Healthcare: CQC/MHRA
  Legal: SRA
  Vets: RCVS
  Opticians: GOC
  Education: Ofsted

Return ONLY valid JSON in this exact shape:
{
  "score": 0,
  "verdict": "Low Risk | Medium Risk | High Risk | Critical Risk",
  "summary": "string",
  "mapped_bodies": ["string"],
  "top_risks": ["string"],
  "issues": [
    {
      "title": "string",
      "description": "string",
      "where_found": "Submitted page URL | Uploaded evidence | Both",
      "risk_level": "Critical | High | Medium | Low",
      "category": "string",
      "regulator_body": "string",
      "suggested_fix": "string"
    }
  ],
  "disclaimer": "string"
}

Scoring:
Start at 100.
Critical -25.
High -15.
Medium -8.
Low -3.
85-100 Low Risk.
65-84 Medium Risk.
40-64 High Risk.
0-39 Critical Risk.

The disclaimer must say the verdict is based only on the submitted page, uploaded evidence, selected sector and visible content, is not legal advice, and does not guarantee compliance.
`;

  const content: Array<Record<string, unknown>> = [
    {
      type: "input_text",
      text: prompt,
    },
  ];

  if (args.fileMimeType.startsWith("image/")) {
    content.push({
      type: "input_image",
      image_url: args.fileDataUrl,
    });
  } else {
    content.push({
      type: "input_text",
      text: `Uploaded file is not an image preview type. File name: ${args.fileName}. MIME type: ${args.fileMimeType}.`,
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "user",
            content,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);
      return fallbackVerdict({
        sector: args.sector,
        region: args.region,
        pageText: args.pageText,
        fileName: args.fileName,
      });
    }

    const outputText =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      data.output?.[0]?.content?.[0]?.content ||
      "";

    const parsed = extractJson(outputText);

    if (!parsed) {
      return fallbackVerdict({
        sector: args.sector,
        region: args.region,
        pageText: args.pageText,
        fileName: args.fileName,
      });
    }

    return parsed;
  } catch (error) {
    console.error("AI verdict failed:", error);

    return fallbackVerdict({
      sector: args.sector,
      region: args.region,
      pageText: args.pageText,
      fileName: args.fileName,
    });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = safeString(formData.get("name"));
    const email = safeString(formData.get("email"));
    const businessName = safeString(formData.get("businessName"));
    const websiteUrl = safeString(formData.get("websiteUrl"));
    const sector = safeString(formData.get("sector"));
    const region = safeString(formData.get("region")) || "UK";
    const file = formData.get("file");

    if (!email || !websiteUrl || !sector) {
      return NextResponse.json(
        { error: "Email, website URL and sector are required." },
        { status: 400 },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please upload an image, screenshot or PDF." },
        { status: 400 },
      );
    }

    const supabase = createSupabaseAdmin();

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileExt = file.name.split(".").pop() || "upload";
    const safeFileName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "-");
    const uploadPath = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("trust360-uploads")
      .upload(uploadPath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      return NextResponse.json(
        { error: "File upload failed. Check Supabase storage bucket." },
        { status: 500 },
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("trust360-uploads")
      .getPublicUrl(uploadPath);

    const uploadedFileUrl = publicUrlData.publicUrl;
    const pageText = await fetchPageText(websiteUrl);

    const fileDataUrl = fileToDataUrl(
      buffer,
      file.type || "application/octet-stream",
    );

  const rulesText = await loadTrust360Rules({
  sector,
  region,
});

console.log(
  `Trust360 loaded ${rulesText ? "database rules" : "no database rules"} for ${region} / ${sector}`,
);

const verdict = await generateAiVerdict({
  websiteUrl,
  sector,
  region,
  pageText,
  fileName: safeFileName,
  fileMimeType: file.type || "application/octet-stream",
  fileDataUrl,
  rulesText,
});

    const { data: audit, error: auditError } = await supabase
      .from("trust360_audits")
      .insert({
        name,
        email,
        business_name: businessName,
        website_url: websiteUrl,
        sector,
        region,
        uploaded_file_url: uploadedFileUrl,
        uploaded_file_path: uploadPath,
        uploaded_file_name: safeFileName,
        uploaded_file_type: file.type,
        page_text: pageText,
        score: verdict.score,
        verdict: verdict.verdict,
        summary: verdict.summary,
        mapped_bodies: verdict.mapped_bodies,
        top_risks: verdict.top_risks,
        ai_result_json: verdict,
      })
      .select("id")
      .single();

    if (auditError || !audit) {
      console.error(auditError);
      return NextResponse.json(
        { error: "Could not save audit." },
        { status: 500 },
      );
    }

    if (verdict.issues?.length) {
      const issueRows = verdict.issues.map((issue) => ({
        audit_id: audit.id,
        title: issue.title,
        description: issue.description,
        where_found: issue.where_found,
        risk_level: issue.risk_level,
        category: issue.category,
        regulator_body: issue.regulator_body,
        suggested_fix: issue.suggested_fix,
      }));

      const { error: issuesError } = await supabase
        .from("trust360_issues")
        .insert(issueRows);

      if (issuesError) {
        console.error(issuesError);
      }
    }

    return NextResponse.json({
      auditId: audit.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Trust 360 check failed." },
      { status: 500 },
    );
  }
}