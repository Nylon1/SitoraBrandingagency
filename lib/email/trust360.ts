import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY");
}

const resend = new Resend(resendApiKey);

const fromEmail = process.env.SITORA_FROM_EMAIL || "Sitora <hmaliks924@gmail.com>";
const leadsEmail = process.env.SITORA_LEADS_EMAIL || "onboarding@resend.dev";

type Trust360LeadEmailPayload = {
  id: string;
  companyName: string;
  website?: string;
  sector: string;
  companySize: string;
  qatarPresence: string;
  contactName: string;
  role?: string;
  email: string;
  phone?: string;
  riskScore: number;
  exposureLevel: string;
  concerns: string[];
  dataTypes: string[];
  marketingUses: string[];
  aiUses: string[];
  systemAccess: string[];
  trigger?: string;
};

function list(items: string[]) {
  if (!items || items.length === 0) return "<li>None selected</li>";

  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendTrust360AdminAlert(payload: Trust360LeadEmailPayload) {
  const subject = `New Trust 360 Lead — ${payload.exposureLevel} — ${payload.companyName}`;

  const html = `
    <div style="font-family: Arial, sans-serif; background:#050505; color:#ffffff; padding:32px;">
      <div style="max-width:760px; margin:auto; border:1px solid rgba(212,175,55,.35); border-radius:24px; padding:28px; background:#101010;">
        <p style="color:#D4AF37; font-size:12px; letter-spacing:2px; text-transform:uppercase; margin:0 0 12px;">
          New Trust 360 Exposure Lead
        </p>

        <h1 style="font-size:28px; margin:0 0 18px;">
          ${escapeHtml(payload.companyName)}
        </h1>

        <div style="background:rgba(212,175,55,.12); border:1px solid rgba(212,175,55,.35); border-radius:18px; padding:18px; margin:22px 0;">
          <p style="margin:0; color:#D4AF37; font-weight:bold;">Exposure Level</p>
          <p style="font-size:26px; margin:6px 0 0; font-weight:bold;">${escapeHtml(payload.exposureLevel)} — ${payload.riskScore}/100</p>
        </div>

        <h2 style="font-size:18px; color:#D4AF37;">Company</h2>
        <p><strong>Website:</strong> ${payload.website ? escapeHtml(payload.website) : "Not provided"}</p>
        <p><strong>Sector:</strong> ${escapeHtml(payload.sector)}</p>
        <p><strong>Company size:</strong> ${escapeHtml(payload.companySize)}</p>
        <p><strong>Qatar presence:</strong> ${escapeHtml(payload.qatarPresence)}</p>

        <h2 style="font-size:18px; color:#D4AF37;">Contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.contactName)}</p>
        <p><strong>Role:</strong> ${payload.role ? escapeHtml(payload.role) : "Not provided"}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Phone:</strong> ${payload.phone ? escapeHtml(payload.phone) : "Not provided"}</p>

        <h2 style="font-size:18px; color:#D4AF37;">Main Concerns</h2>
        <ul>${list(payload.concerns)}</ul>

        <h2 style="font-size:18px; color:#D4AF37;">High-Value Risk Signals</h2>

        <p><strong>Data types:</strong></p>
        <ul>${list(payload.dataTypes)}</ul>

        <p><strong>Marketing uses:</strong></p>
        <ul>${list(payload.marketingUses)}</ul>

        <p><strong>AI uses:</strong></p>
        <ul>${list(payload.aiUses)}</ul>

        <p><strong>System/vendor access:</strong></p>
        <ul>${list(payload.systemAccess)}</ul>

        <h2 style="font-size:18px; color:#D4AF37;">Trigger</h2>
        <p>${payload.trigger ? escapeHtml(payload.trigger) : "Not provided"}</p>

        <p style="margin-top:28px; color:#999;">
          Lead ID: ${payload.id}
        </p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: fromEmail,
    to: leadsEmail,
    subject,
    html,
  });
}

export async function sendTrust360ProspectConfirmation(
  payload: Trust360LeadEmailPayload
) {
  const subject = "Your Sitora Trust 360 Exposure Assessment has been received";

  const html = `
    <div style="font-family: Arial, sans-serif; background:#f7f7f7; color:#111; padding:32px;">
      <div style="max-width:700px; margin:auto; background:#ffffff; border-radius:24px; padding:30px; border:1px solid #e8e8e8;">
        <p style="color:#B8941F; font-size:12px; letter-spacing:2px; text-transform:uppercase; margin:0 0 12px;">
          Sitora Qatar Trust 360™
        </p>

        <h1 style="font-size:28px; margin:0 0 18px;">
          Your assessment has been received.
        </h1>

        <p style="line-height:1.7;">
          Thank you for completing the Sitora Trust 360 Exposure Assessment for <strong>${escapeHtml(payload.companyName)}</strong>.
        </p>

        <p style="line-height:1.7;">
          Sitora will review your answers across data protection, advertising claims, cyber readiness, AI use, vendor access, customer experience and reputation risk.
        </p>

        <div style="background:#111; color:#fff; border-radius:18px; padding:20px; margin:24px 0;">
          <p style="margin:0; color:#D4AF37; font-weight:bold;">Indicative exposure</p>
          <p style="font-size:24px; margin:6px 0 0; font-weight:bold;">${escapeHtml(payload.exposureLevel)}</p>
          <p style="margin:8px 0 0; color:#ccc;">Score: ${payload.riskScore}/100</p>
        </div>

        <p style="line-height:1.7;">
          This score is only an initial indication based on your answers. A full Trust 360 audit provides a more detailed view of the specific risks, evidence gaps and priority actions.
        </p>

        <p style="line-height:1.7;">
          If your answers suggest high or urgent exposure, Sitora may recommend a Trust 360 consultation to discuss the most important next steps.
        </p>

        <p style="margin-top:28px;">
          <a href="mailto:${leadsEmail}?subject=Trust 360 Consultation - ${encodeURIComponent(payload.companyName)}" style="display:inline-block; background:#D4AF37; color:#000; text-decoration:none; padding:14px 22px; border-radius:999px; font-weight:bold;">
            Book a Trust 360 Consultation
          </a>
        </p>

        <p style="font-size:12px; color:#777; margin-top:28px; line-height:1.6;">
          Sitora Qatar Trust 360™ is a business trust, compliance and reputation assessment. It does not replace formal legal advice, regulatory advice, cybersecurity penetration testing or statutory audit.
        </p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: fromEmail,
    to: payload.email,
    subject,
    html,
  });
}