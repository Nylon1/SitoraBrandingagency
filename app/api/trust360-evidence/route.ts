import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const BUCKET_NAME = "trust360-evidence";

type UploadedFileRecord = {
  name: string;
  size: number;
  type: string;
  storagePath: string;
};

function safeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function safeFolderName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter(Boolean).map(String) : [];
}

function toStringOrNull(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
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

async function sendAdminEmail({
  payload,
  files,
  evidencePackId,
}: {
  payload: any;
  files: UploadedFileRecord[];
  evidencePackId: string;
}) {
  if (!resend) return;

  const to = process.env.SITORA_LEADS_EMAIL;
  const from = process.env.SITORA_FROM_EMAIL;

  if (!to || !from) return;

  await resend.emails.send({
    from,
    to,
    subject: `New Trust 360 Evidence Pack — ${payload.companyName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Trust 360 Evidence Pack</h2>

        <p><strong>Evidence Pack ID:</strong> ${escapeHtml(evidencePackId)}</p>
        <p><strong>Company:</strong> ${escapeHtml(payload.companyName)}</p>
        <p><strong>Website:</strong> ${escapeHtml(payload.website)}</p>
        <p><strong>Sector:</strong> ${escapeHtml(payload.sector)}</p>

        <hr />

        <h3>Primary Contact</h3>
        <p><strong>Name:</strong> ${escapeHtml(payload.primaryContactName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.primaryContactEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(payload.primaryContactPhone)}</p>
        <p><strong>Role:</strong> ${escapeHtml(payload.primaryContactRole)}</p>

        <hr />

        <h3>Priority Areas</h3>
        ${renderList(toArray(payload.priorityAreas))}

        <h3>Known Concerns</h3>
        <p>${escapeHtml(payload.knownConcerns || "None provided")}</p>

        <h3>Missing Documents</h3>
        <p>${escapeHtml(payload.missingDocuments || "None provided")}</p>

        <h3>Uploaded Files</h3>
        ${
          files.length
            ? `<ul>${files
                .map(
                  (file) =>
                    `<li>${escapeHtml(file.name)} — ${(
                      file.size /
                      1024 /
                      1024
                    ).toFixed(2)} MB</li>`
                )
                .join("")}</ul>`
            : "<p>No files uploaded.</p>"
        }

        <p style="margin-top: 24px;">
          View this evidence pack in the Sitora admin dashboard.
        </p>
      </div>
    `,
  });
}

async function sendClientEmail(payload: any) {
  if (!resend) return;

  const from = process.env.SITORA_FROM_EMAIL;

  if (!from || !payload.primaryContactEmail) return;

  await resend.emails.send({
    from,
    to: payload.primaryContactEmail,
    subject: "Sitora Trust 360 Evidence Pack Received",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Evidence Pack Received</h2>

        <p>Hi ${escapeHtml(payload.primaryContactName || "there")},</p>

        <p>
          Thank you for submitting the Trust 360 evidence pack for
          <strong>${escapeHtml(payload.companyName)}</strong>.
        </p>

        <p>
          Sitora will review the documents, links and information provided.
          If anything further is required, we will contact you with a focused
          follow-up request.
        </p>

        <p>
          Please do not create new documents just to appear compliant.
          The audit is designed to assess the real current position.
        </p>

        <p>Regards,<br />Sitora</p>
      </div>
    `,
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const payloadRaw = formData.get("payload");

    if (!payloadRaw || typeof payloadRaw !== "string") {
      return NextResponse.json(
        { error: "Missing evidence payload." },
        { status: 400 }
      );
    }

    const payload = JSON.parse(payloadRaw);

    const requiredFields = [
      "companyName",
      "website",
      "sector",
      "primaryContactName",
      "primaryContactEmail",
    ];

    for (const field of requiredFields) {
      if (!payload[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!payload.consent) {
      return NextResponse.json(
        { error: "Consent is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(payload.primaryContactEmail)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const files = formData
      .getAll("files")
      .filter((item): item is File => item instanceof File);

    const companyFolder = safeFolderName(payload.companyName);
    const submissionFolder = crypto.randomUUID();

    const uploadedFiles: UploadedFileRecord[] = [];

    for (const file of files) {
      const cleanName = safeFileName(file.name);
      const storagePath = `${companyFolder}/${submissionFolder}/${Date.now()}-${cleanName}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .upload(storagePath, buffer, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        console.error("Evidence file upload error:", uploadError);

        return NextResponse.json(
          { error: `Failed to upload file: ${file.name}` },
          { status: 500 }
        );
      }

      uploadedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        storagePath,
      });
    }

    const insertPayload = {
      company_name: toStringOrNull(payload.companyName),
      trading_name: toStringOrNull(payload.tradingName),
      website: toStringOrNull(payload.website),
      sector: toStringOrNull(payload.sector),
      qatar_location: toStringOrNull(payload.qatarLocation),
      main_services: toStringOrNull(payload.mainServices),

      primary_contact_name: toStringOrNull(payload.primaryContactName),
      primary_contact_email: toStringOrNull(payload.primaryContactEmail),
      primary_contact_phone: toStringOrNull(payload.primaryContactPhone),
      primary_contact_role: toStringOrNull(payload.primaryContactRole),

      legal_contact: toStringOrNull(payload.legalContact),
      marketing_contact: toStringOrNull(payload.marketingContact),
      it_contact: toStringOrNull(payload.itContact),

      key_urls: toStringOrNull(payload.keyUrls),
      privacy_policy_url: toStringOrNull(payload.privacyPolicyUrl),
      terms_url: toStringOrNull(payload.termsUrl),
      cookie_notice_url: toStringOrNull(payload.cookieNoticeUrl),
      refund_policy_url: toStringOrNull(payload.refundPolicyUrl),

      documents_available: toArray(payload.documentsAvailable),
      data_protection_evidence: toArray(payload.dataProtectionEvidence),
      marketing_evidence: toArray(payload.marketingEvidence),
      ai_evidence: toArray(payload.aiEvidence),
      cyber_evidence: toArray(payload.cyberEvidence),
      vendor_evidence: toArray(payload.vendorEvidence),
      customer_evidence: toArray(payload.customerEvidence),
      reputation_evidence: toArray(payload.reputationEvidence),
      priority_areas: toArray(payload.priorityAreas),

      vendors: toStringOrNull(payload.vendors),
      ai_tools: toStringOrNull(payload.aiTools),
      platforms: toStringOrNull(payload.platforms),
      known_concerns: toStringOrNull(payload.knownConcerns),
      missing_documents: toStringOrNull(payload.missingDocuments),
      additional_notes: toStringOrNull(payload.additionalNotes),

      uploaded_files: uploadedFiles,

      status: "Received",
      consent: Boolean(payload.consent),
    };

    const { data, error } = await supabaseAdmin
      .from("trust360_evidence_packs")
      .insert(insertPayload)
      .select("id")
      .single();

    if (error) {
      console.error("Evidence pack database insert error:", error);

      return NextResponse.json(
        { error: "Failed to save evidence pack." },
        { status: 500 }
      );
    }

    await Promise.allSettled([
      sendAdminEmail({
        payload,
        files: uploadedFiles,
        evidencePackId: data.id,
      }),
      sendClientEmail(payload),
    ]);

    return NextResponse.json({
      success: true,
      id: data.id,
      message: "Trust 360 evidence pack received.",
      filesReceived: uploadedFiles.length,
    });
  } catch (error) {
    console.error("Trust 360 evidence submission error:", error);

    return NextResponse.json(
      { error: "Failed to submit evidence pack." },
      { status: 500 }
    );
  }
}