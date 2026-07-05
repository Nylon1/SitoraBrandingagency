import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { runTrust360Rules } from "@/lib/trust360/run-rules";

export const runtime = "nodejs";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

type ExposurePayload = {
  companyName?: string;
  website?: string;
  sector?: string;
  companySize?: string;
  qatarPresence?: string;

  country?: string;

  contactName?: string;
  role?: string;
  email?: string;
  phone?: string;

  digitalChannels?: string[];
  dataTypes?: string[];
  marketingUses?: string[];
  aiUses?: string[];
  systemAccess?: string[];
  cyberControls?: string[];
  existingDocuments?: string[];
  concerns?: string[];

  trigger?: string;
  consentToContact?: boolean;

  riskScore?: number;
  exposureLevel?: string;
};

function toStringOrNull(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function toArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(Boolean).map(String);
}

function clampScore(value: unknown) {
  const number = Number(value);

  if (Number.isNaN(number)) return 0;

  return Math.max(0, Math.min(100, Math.round(number)));
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderList(items: string[]) {
  if (!items.length) return "<p>None provided</p>";

  return `
    <ul>
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function getExposureLevel(score: number) {
  if (score >= 75) return "Urgent exposure";
  if (score >= 50) return "High exposure";
  if (score >= 25) return "Medium exposure";
  return "Low exposure";
}

function normaliseWebsite(url: string | null) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

async function sendAdminAlert({
  payload,
  leadId,
  rulesResult,
}: {
  payload: ExposurePayload;
  leadId: string;
  rulesResult: Awaited<ReturnType<typeof runTrust360Rules>>;
}) {
  if (!resend) return;

  const to = process.env.SITORA_LEADS_EMAIL;
  const from = process.env.SITORA_FROM_EMAIL;

  if (!to || !from) return;

  const riskScore = clampScore(payload.riskScore);
  const exposureLevel =
    payload.exposureLevel || getExposureLevel(riskScore);

  await resend.emails.send({
    from,
    to,
    subject: `New Trust 360 Exposure Check — ${exposureLevel} — ${payload.companyName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Trust 360 Exposure Check</h2>

        <p><strong>Lead ID:</strong> ${escapeHtml(leadId)}</p>
        <p><strong>Company:</strong> ${escapeHtml(payload.companyName)}</p>
        <p><strong>Website:</strong> ${escapeHtml(payload.website)}</p>
        <p><strong>Country:</strong> ${escapeHtml(rulesResult.country)}</p>
        <p><strong>Sector:</strong> ${escapeHtml(payload.sector)}</p>
        <p><strong>Company Size:</strong> ${escapeHtml(payload.companySize)}</p>
        <p><strong>Qatar / GCC Presence:</strong> ${escapeHtml(
          payload.qatarPresence
        )}</p>

        <hr />

        <h3>Contact</h3>
        <p><strong>Name:</strong> ${escapeHtml(payload.contactName)}</p>
        <p><strong>Role:</strong> ${escapeHtml(payload.role)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>

        <hr />

        <h3>Exposure Result</h3>
        <p><strong>Score:</strong> ${riskScore}/100</p>
        <p><strong>Exposure Level:</strong> ${escapeHtml(exposureLevel)}</p>

        <h3>Rules Engine Result</h3>
        <p><strong>Matched Rules:</strong> ${rulesResult.matchedRules.length}</p>
        <p><strong>Rules Score Impact:</strong> ${
          rulesResult.rulesScoreImpact
        }</p>
        <p><strong>Highest Severity:</strong> ${escapeHtml(
          rulesResult.highestSeverity
        )}</p>

        <h3>Priority Rule Categories</h3>
        ${renderList(rulesResult.priorityCategories)}

        <h3>Recommended Evidence</h3>
        ${renderList(rulesResult.recommendedEvidence)}

        <h3>Matched Rules</h3>
        ${
          rulesResult.matchedRules.length
            ? `<ul>${rulesResult.matchedRules
                .slice(0, 12)
                .map(
                  (rule) =>
                    `<li><strong>${escapeHtml(
                      rule.ruleCode
                    )}</strong> — ${escapeHtml(rule.ruleTitle)} (${escapeHtml(
                      rule.severity
                    )})</li>`
                )
                .join("")}</ul>`
            : "<p>No rules matched.</p>"
        }

        <hr />

        <h3>Selected Areas</h3>
        <p><strong>Digital Channels:</strong></p>
        ${renderList(toArray(payload.digitalChannels))}

        <p><strong>Data Types:</strong></p>
        ${renderList(toArray(payload.dataTypes))}

        <p><strong>Marketing Uses:</strong></p>
        ${renderList(toArray(payload.marketingUses))}

        <p><strong>AI Uses:</strong></p>
        ${renderList(toArray(payload.aiUses))}

        <p><strong>System Access:</strong></p>
        ${renderList(toArray(payload.systemAccess))}

        <p><strong>Cyber Controls:</strong></p>
        ${renderList(toArray(payload.cyberControls))}

        <p><strong>Existing Documents:</strong></p>
        ${renderList(toArray(payload.existingDocuments))}

        <p><strong>Concerns:</strong></p>
        ${renderList(toArray(payload.concerns))}

        <h3>Trigger / Notes</h3>
        <p>${escapeHtml(payload.trigger || "None provided")}</p>

        <p style="margin-top: 24px;">
          View this lead in the Sitora Trust 360 admin dashboard.
        </p>
      </div>
    `,
  });
}

async function sendProspectConfirmation({
  payload,
  rulesResult,
}: {
  payload: ExposurePayload;
  rulesResult: Awaited<ReturnType<typeof runTrust360Rules>>;
}) {
  if (!resend) return;

  const from = process.env.SITORA_FROM_EMAIL;

  if (!from || !payload.email) return;

  const riskScore = clampScore(payload.riskScore);
  const exposureLevel =
    payload.exposureLevel || getExposureLevel(riskScore);

  await resend.emails.send({
    from,
    to: payload.email,
    subject: "Your Sitora Trust 360 Exposure Assessment has been received",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Your Trust 360 Exposure Assessment Has Been Received</h2>

        <p>Hi ${escapeHtml(payload.contactName || "there")},</p>

        <p>
          Thank you for completing the Sitora Trust 360 Exposure Check for
          <strong>${escapeHtml(payload.companyName)}</strong>.
        </p>

        <p>
          Your indicative exposure level is:
          <strong>${escapeHtml(exposureLevel)}</strong>.
        </p>

        <p>
          Sitora has mapped your answers against our ${escapeHtml(
            rulesResult.country
          )} trust, compliance and reputation rules database.
        </p>

        <p>
          Based on your answers, the priority areas appear to include:
        </p>

        ${renderList(rulesResult.priorityCategories.slice(0, 8))}

        <p>
          A member of Sitora will review the assessment and may contact you with
          next steps, including any recommended evidence or documents required
          for a full Trust 360 audit.
        </p>

        <p>
          Regards,<br />
          Sitora
        </p>
      </div>
    `,
  });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ExposurePayload;

    const requiredFields: (keyof ExposurePayload)[] = [
      "companyName",
      "website",
      "sector",
      "companySize",
      "contactName",
      "email",
    ];

    for (const field of requiredFields) {
      if (!payload[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!payload.email || !emailRegex.test(payload.email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (!payload.consentToContact) {
      return NextResponse.json(
        { error: "Consent to contact is required." },
        { status: 400 }
      );
    }

    const riskScore = clampScore(payload.riskScore);
    const exposureLevel =
      payload.exposureLevel || getExposureLevel(riskScore);

    const rulesResult = await runTrust360Rules({
      country: payload.country || payload.qatarPresence || "Qatar",
      sector: payload.sector,
      companySize: payload.companySize,
      qatarPresence: payload.qatarPresence,
      digitalChannels: payload.digitalChannels,
      dataTypes: payload.dataTypes,
      marketingUses: payload.marketingUses,
      aiUses: payload.aiUses,
      systemAccess: payload.systemAccess,
      cyberControls: payload.cyberControls,
      existingDocuments: payload.existingDocuments,
      concerns: payload.concerns,
      trigger: payload.trigger,
      website: payload.website,
    });

    const insertPayload = {
      company_name: toStringOrNull(payload.companyName),
      website: normaliseWebsite(toStringOrNull(payload.website)),
      sector: toStringOrNull(payload.sector),
      company_size: toStringOrNull(payload.companySize),
      qatar_presence: toStringOrNull(payload.qatarPresence),

      contact_name: toStringOrNull(payload.contactName),
      role: toStringOrNull(payload.role),
      email: toStringOrNull(payload.email),
      phone: toStringOrNull(payload.phone),

      digital_channels: toArray(payload.digitalChannels),
      data_types: toArray(payload.dataTypes),
      marketing_uses: toArray(payload.marketingUses),
      ai_uses: toArray(payload.aiUses),
      system_access: toArray(payload.systemAccess),
      cyber_controls: toArray(payload.cyberControls),
      existing_documents: toArray(payload.existingDocuments),
      concerns: toArray(payload.concerns),

      trigger_note: toStringOrNull(payload.trigger),

      risk_score: riskScore,
      exposure_level: exposureLevel,

      country: rulesResult.country,
      matched_rules: rulesResult.matchedRules,
      rules_score_impact: rulesResult.rulesScoreImpact,
      recommended_evidence: rulesResult.recommendedEvidence,
      rules_guidance: rulesResult.clientGuidance,
      priority_rule_categories: rulesResult.priorityCategories,

      consent_to_contact: Boolean(payload.consentToContact),
      lead_status: "New",
    };

    const { data, error } = await supabaseAdmin
      .from("trust360_exposure_leads")
      .insert(insertPayload)
      .select("id")
      .single();

    if (error) {
      console.error("Trust 360 exposure insert error:", error);

      return NextResponse.json(
        {
          error:
            "Failed to save exposure assessment. Check Supabase table columns.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    await Promise.allSettled([
      sendAdminAlert({
        payload: {
          ...payload,
          riskScore,
          exposureLevel,
        },
        leadId: data.id,
        rulesResult,
      }),
      sendProspectConfirmation({
        payload: {
          ...payload,
          riskScore,
          exposureLevel,
        },
        rulesResult,
      }),
    ]);

    return NextResponse.json({
      success: true,
      id: data.id,
      score: riskScore,
      exposureLevel,
      country: rulesResult.country,
      matchedRulesCount: rulesResult.matchedRules.length,
      priorityCategories: rulesResult.priorityCategories,
      recommendedEvidence: rulesResult.recommendedEvidence,
      rulesGuidance: rulesResult.clientGuidance,
      highestSeverity: rulesResult.highestSeverity,
    });
  } catch (error) {
    console.error("Trust 360 exposure submission error:", error);

    return NextResponse.json(
      { error: "Failed to submit exposure assessment." },
      { status: 500 }
    );
  }
}