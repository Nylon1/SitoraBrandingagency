import { createClient } from "@supabase/supabase-js";
import {
  generateAIReadinessFindings,
  getRecommendedDocuments,
} from "@/lib/aiReadinessReport";

export const dynamic = "force-dynamic";

type AuditAnswers = Record<string, string | string[]>;

type AIReadinessAudit = {
  id: string;
  created_at: string;
  business_name: string;
  contact_name: string;
  email: string;
  website: string | null;
  industry: string | null;
  answers: AuditAnswers;
  status: string | null;
  risk_level: string | null;
  notes: string | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function safe(value: string | null | undefined) {
  return escapeXml(value || "Not provided");
}

function wrapText(text: string, maxLength = 72) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    if ((current + " " + word).trim().length > maxLength) {
      lines.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  });

  if (current) lines.push(current.trim());

  return lines;
}

function textLines(
  text: string,
  x: number,
  y: number,
  options?: {
    maxLength?: number;
    fontSize?: number;
    fill?: string;
    weight?: string;
    lineHeight?: number;
  }
) {
  const lines = wrapText(text, options?.maxLength || 72);
  const fontSize = options?.fontSize || 24;
  const fill = options?.fill || "#E5E7EB";
  const weight = options?.weight || "400";
  const lineHeight = options?.lineHeight || fontSize + 12;

  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" font-size="${fontSize}" font-weight="${weight}" fill="${fill}" font-family="Arial, sans-serif">${escapeXml(
          line
        )}</text>`
    )
    .join("");
}

function badge(x: number, y: number, label: string, fill: string, stroke: string) {
  return `
    <rect x="${x}" y="${y}" width="230" height="54" rx="27" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <text x="${x + 115}" y="${y + 35}" text-anchor="middle" font-size="22" font-weight="700" fill="#FFFFFF" font-family="Arial, sans-serif">${escapeXml(
    label
  )}</text>
  `;
}

function getRiskColours(risk: string | null) {
  if (risk === "High") {
    return {
      fill: "rgba(239,68,68,0.22)",
      stroke: "#EF4444",
      label: "High Risk",
    };
  }

  if (risk === "Medium") {
    return {
      fill: "rgba(245,158,11,0.22)",
      stroke: "#F59E0B",
      label: "Medium Risk",
    };
  }

  return {
    fill: "rgba(34,197,94,0.22)",
    stroke: "#22C55E",
    label: "Low Risk",
  };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { data, error } = await supabase
    .from("ai_readiness_audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return new Response("Audit not found", { status: 404 });
  }

  const audit = data as AIReadinessAudit;
  const findings = generateAIReadinessFindings(audit.answers || {});
  const recommendedDocuments = getRecommendedDocuments(findings);

  const risk = getRiskColours(audit.risk_level);

  const topFindings = findings.slice(0, 6);
  const topDocuments = recommendedDocuments.slice(0, 10);

  const createdDate = new Date(audit.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let y = 640;

  const findingsSvg = topFindings
    .map((finding, index) => {
      const blockY = y;
      y += 230;

      const levelColour =
        finding.level === "High"
          ? "#EF4444"
          : finding.level === "Medium"
          ? "#F59E0B"
          : "#22C55E";

      return `
        <rect x="90" y="${blockY}" width="1020" height="190" rx="28" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
        <text x="130" y="${blockY + 48}" font-size="26" font-weight="700" fill="#F8FAFC" font-family="Arial, sans-serif">${escapeXml(
        finding.title
      )}</text>
        <text x="1010" y="${blockY + 48}" text-anchor="end" font-size="20" font-weight="700" fill="${levelColour}" font-family="Arial, sans-serif">${finding.level}</text>
        ${textLines(finding.explanation, 130, blockY + 88, {
          maxLength: 88,
          fontSize: 20,
          fill: "#CBD5E1",
          lineHeight: 28,
        })}
        ${textLines(`Recommendation: ${finding.recommendation}`, 130, blockY + 145, {
          maxLength: 92,
          fontSize: 18,
          fill: "#D4AF37",
          lineHeight: 26,
        })}
      `;
    })
    .join("");

  const docsStartY = y + 30;

  const docsSvg = topDocuments
    .map((doc, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = col === 0 ? 90 : 615;
      const docY = docsStartY + row * 72;

      return `
        <rect x="${x}" y="${docY}" width="495" height="52" rx="18" fill="rgba(212,175,55,0.10)" stroke="rgba(212,175,55,0.32)" stroke-width="1.5"/>
        <text x="${x + 24}" y="${docY + 34}" font-size="19" fill="#FDE68A" font-family="Arial, sans-serif">${escapeXml(
        doc
      )}</text>
      `;
    })
    .join("");

  const disclaimerY = docsStartY + Math.ceil(topDocuments.length / 2) * 72 + 80;

  const svgHeight = Math.max(1600, disclaimerY + 230);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="${svgHeight}" viewBox="0 0 1200 ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#8A6A16"/>
    </linearGradient>

    <radialGradient id="glow" cx="50%" cy="0%" r="80%">
      <stop offset="0%" stop-color="rgba(212,175,55,0.25)"/>
      <stop offset="55%" stop-color="rgba(15,23,42,0.25)"/>
      <stop offset="100%" stop-color="rgba(5,7,13,1)"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="${svgHeight}" fill="#05070D"/>
  <rect width="1200" height="${svgHeight}" fill="url(#glow)"/>

  <rect x="45" y="45" width="1110" height="${svgHeight - 90}" rx="42" fill="none" stroke="url(#gold)" stroke-width="3"/>
  <rect x="70" y="70" width="1060" height="${svgHeight - 140}" rx="34" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>

  <text x="90" y="145" font-size="20" font-weight="700" letter-spacing="6" fill="#D4AF37" font-family="Arial, sans-serif">SITORA AI READINESS REPORT</text>

  <text x="90" y="230" font-size="54" font-weight="800" fill="#FFFFFF" font-family="Arial, sans-serif">AI Readiness &amp;</text>
  <text x="90" y="292" font-size="54" font-weight="800" fill="#FFFFFF" font-family="Arial, sans-serif">Governance Report</text>

  <text x="90" y="350" font-size="24" fill="#CBD5E1" font-family="Arial, sans-serif">Prepared for ${safe(
    audit.business_name
  )}</text>

  ${badge(880, 135, risk.label, risk.fill, risk.stroke)}

  <rect x="90" y="410" width="1020" height="140" rx="28" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

  <text x="130" y="458" font-size="18" fill="#94A3B8" font-family="Arial, sans-serif">Business</text>
  <text x="130" y="492" font-size="24" font-weight="700" fill="#F8FAFC" font-family="Arial, sans-serif">${safe(
    audit.business_name
  )}</text>

  <text x="430" y="458" font-size="18" fill="#94A3B8" font-family="Arial, sans-serif">Contact</text>
  <text x="430" y="492" font-size="24" font-weight="700" fill="#F8FAFC" font-family="Arial, sans-serif">${safe(
    audit.contact_name
  )}</text>

  <text x="700" y="458" font-size="18" fill="#94A3B8" font-family="Arial, sans-serif">Industry</text>
  <text x="700" y="492" font-size="24" font-weight="700" fill="#F8FAFC" font-family="Arial, sans-serif">${safe(
    audit.industry
  )}</text>

  <text x="930" y="458" font-size="18" fill="#94A3B8" font-family="Arial, sans-serif">Date</text>
  <text x="930" y="492" font-size="24" font-weight="700" fill="#F8FAFC" font-family="Arial, sans-serif">${escapeXml(
    createdDate
  )}</text>

  <text x="90" y="610" font-size="32" font-weight="800" fill="#FFFFFF" font-family="Arial, sans-serif">Key Findings</text>

  ${findingsSvg}

  <text x="90" y="${docsStartY - 35}" font-size="32" font-weight="800" fill="#FFFFFF" font-family="Arial, sans-serif">Recommended Governance Documents</text>

  ${docsSvg}

  <rect x="90" y="${disclaimerY}" width="1020" height="150" rx="28" fill="rgba(212,175,55,0.10)" stroke="rgba(212,175,55,0.30)" stroke-width="2"/>
  <text x="130" y="${disclaimerY + 42}" font-size="24" font-weight="800" fill="#FDE68A" font-family="Arial, sans-serif">Important Disclaimer</text>
  ${textLines(
    "Sitora is not a law firm and does not provide legal advice. This AI readiness report is designed to help businesses identify practical AI use, organise internal processes, improve transparency, prepare documentation and understand potential areas of exposure. Where legal advice is required, businesses should consult a qualified legal professional.",
    130,
    disclaimerY + 82,
    {
      maxLength: 98,
      fontSize: 18,
      fill: "#E5E7EB",
      lineHeight: 26,
    }
  )}

  <text x="90" y="${svgHeight - 70}" font-size="18" fill="#64748B" font-family="Arial, sans-serif">SITORA — AI Readiness &amp; Governance Support</text>
  <text x="1110" y="${svgHeight - 70}" text-anchor="end" font-size="18" fill="#64748B" font-family="Arial, sans-serif">Generated Report</text>
</svg>`;

  const filename = `${audit.business_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-ai-readiness-report.svg`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}