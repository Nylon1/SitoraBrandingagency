import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

export type AuditPdfData = {
  id: string;
  created_at: string;

  company_name: string | null;
  contact_name: string | null;
  email: string | null;
  website: string | null;
  primary_market: string | null;
  business_type: string | null;

  ai_product_name: string | null;
  ai_system_type: string | null;
  ai_description: string | null;
  ai_users: string | null;
  ai_influences: string[] | null;

  risk_level: string | null;
  data_collected: string[] | null;
  personal_data_stored: string | null;
  sensitive_data_involved: string | null;
  retention_period: string | null;
  ai_logs_access: string | null;
  privacy_consent_wording: string | null;

  ai_provider: string | null;
  cloud_provider: string | null;
  hosting_region: string | null;
  data_leaves_ksa: string | null;
  third_party_tools: string | null;

  disclosures_present: string[] | null;
  ai_disclosure_wording: string | null;

  human_review_available: string | null;
  ai_override_available: string | null;
  internal_ai_owner: string | null;
  escalation_route: string | null;
  human_review_process: string | null;

  security_controls: string[] | null;
  admin_dashboard_access: string | null;
  backup_process: string | null;

  testing_completed: string[] | null;
  known_ai_issues: string | null;

  healthcare_flags: string[] | null;
  finance_flags: string[] | null;
  hr_flags: string[] | null;
  education_flags: string[] | null;

  available_evidence: string[] | null;

  score: number | null;
  rating: string | null;
  score_type: string | null;
  scoring_notes: string | null;

  ai_purpose_score: number | null;
  risk_classification_score: number | null;
  data_flow_score: number | null;
  personal_data_score: number | null;
  sensitive_data_score: number | null;
  cross_border_score: number | null;
  transparency_score: number | null;
  human_oversight_score: number | null;
  output_safety_score: number | null;
  bias_fairness_score: number | null;
  vendor_governance_score: number | null;
  cybersecurity_score: number | null;
  cloud_hosting_score: number | null;
  incident_response_score: number | null;
  documentation_score: number | null;
  review_monitoring_score: number | null;
  user_journey_score: number | null;
  sector_readiness_score: number | null;
};

function value(input?: string | null) {
  return input && input.trim().length > 0 ? input : "Not provided";
}

function list(input?: string[] | null) {
  return input && input.length > 0 ? input.join(", ") : "None selected";
}

function arr(input?: string[] | null) {
  return input && input.length > 0 ? input : [];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function scoreBand(score?: number | null) {
  const s = score ?? 0;

  if (s <= 25) {
    return {
      label: "Critical Risk",
      colour: "#991b1b",
      bg: "#fee2e2",
      border: "#fecaca",
      summary:
        "Major AI governance, data, security or sector-readiness gaps are likely present. This system should not be treated as launch-ready without urgent review.",
    };
  }

  if (s <= 45) {
    return {
      label: "Weak Governance",
      colour: "#9a3412",
      bg: "#ffedd5",
      border: "#fed7aa",
      summary:
        "Significant governance gaps appear to exist. The system needs structured remediation before launch, sale or wider deployment.",
    };
  }

  if (s <= 65) {
    return {
      label: "Developing Governance",
      colour: "#92400e",
      bg: "#fef3c7",
      border: "#fde68a",
      summary:
        "Some governance foundations appear to be in place, but important evidence, controls or documentation may still be missing.",
    };
  }

  if (s <= 80) {
    return {
      label: "Strong Governance",
      colour: "#166534",
      bg: "#dcfce7",
      border: "#bbf7d0",
      summary:
        "The system shows a stronger governance foundation, although final review and sector-specific checks may still be required.",
    };
  }

  return {
    label: "AI Trust Ready",
    colour: "#065f46",
    bg: "#d1fae5",
    border: "#a7f3d0",
    summary:
      "The system appears to have strong compliance-readiness evidence, subject to manual review and any required legal or sector-specific assessment.",
  };
}

function getMissingEvidence(audit: AuditPdfData) {
  const evidence = arr(audit.available_evidence).map((item) =>
    item.toLowerCase()
  );

  const missing: string[] = [];

  if (!evidence.some((x) => x.includes("ai system"))) {
    missing.push("AI system description");
  }

  if (!evidence.some((x) => x.includes("user journey"))) {
    missing.push("User journey / product flow");
  }

  if (!evidence.some((x) => x.includes("privacy"))) {
    missing.push("Privacy notice and consent wording");
  }

  if (!evidence.some((x) => x.includes("data flow"))) {
    missing.push("Data flow map");
  }

  if (!evidence.some((x) => x.includes("testing"))) {
    missing.push("AI testing logs");
  }

  if (!evidence.some((x) => x.includes("vendor"))) {
    missing.push("Vendor contracts / AI provider documentation");
  }

  if (!evidence.some((x) => x.includes("incident"))) {
    missing.push("Incident response plan");
  }

  return missing;
}

function getPriorityActions(audit: AuditPdfData) {
  const actions: string[] = [];

  const sensitive = (audit.sensitive_data_involved || "").toLowerCase();
  const transfer = (audit.data_leaves_ksa || "").toLowerCase();

  if (!audit.ai_description) {
    actions.push(
      "Document the AI system purpose, intended users, boundaries, prohibited uses and accountable business owner."
    );
  }

  if (
    sensitive === "yes" ||
    sensitive === "possibly" ||
    sensitive === "not sure"
  ) {
    actions.push(
      "Strengthen sensitive data controls, including access restrictions, retention rules, consent wording and audit trail review."
    );
  }

  if (
    transfer === "yes" ||
    transfer === "possibly" ||
    transfer === "not sure"
  ) {
    actions.push(
      "Prepare a cross-border data transfer review covering AI providers, cloud regions, prompts, logs, uploaded files, outputs and backups."
    );
  }

  if (!audit.ai_disclosure_wording) {
    actions.push(
      "Add clear AI disclosure wording so users understand when AI is involved, what the AI can do, and what its limits are."
    );
  }

  if ((audit.human_review_available || "").toLowerCase() !== "yes") {
    actions.push(
      "Define a human oversight process, including escalation, review, override and accountability routes."
    );
  }

  if (!audit.testing_completed || audit.testing_completed.length === 0) {
    actions.push(
      "Run and document AI safety testing, including hallucination, prompt injection, sensitive-topic, bias and wrong-answer testing."
    );
  }

  if (!audit.security_controls || audit.security_controls.length === 0) {
    actions.push(
      "Review cybersecurity basics including MFA, role-based access, API key handling, audit logs, backups and admin permissions."
    );
  }

  if (arr(audit.healthcare_flags).length > 0) {
    actions.push(
      "Review whether the system may fall under Saudi medical or digital health expectations before clinical claims are made."
    );
  }

  if (arr(audit.finance_flags).length > 0) {
    actions.push(
      "Review whether the system creates finance, insurance, cybersecurity, outsourcing or automated decisioning exposure."
    );
  }

  if (arr(audit.hr_flags).length > 0) {
    actions.push(
      "Review fairness, bias, human oversight and explainability controls for recruitment or employment-related AI decisions."
    );
  }

  if (arr(audit.education_flags).length > 0) {
    actions.push(
      "Review safeguarding, parental consent, child-data, transparency and human oversight controls before deployment to education users."
    );
  }

  if (actions.length === 0) {
    actions.push(
      "Proceed to manual evidence review and confirm whether the initial estimated score should be adjusted."
    );
  }

  return actions;
}

function getPackageRecommendation(audit: AuditPdfData) {
  const risk = audit.risk_level?.toLowerCase() || "";
  const sensitive = audit.sensitive_data_involved?.toLowerCase() || "";
  const transfer = audit.data_leaves_ksa?.toLowerCase() || "";
  const type = audit.ai_system_type?.toLowerCase() || "";
  const market = audit.primary_market?.toLowerCase() || "";

  if (
    risk.includes("specialist") ||
    type.includes("healthcare") ||
    type.includes("finance") ||
    type.includes("recruitment") ||
    sensitive === "yes"
  ) {
    return {
      name: "Enterprise AI Governance Readiness",
      price: "From GBP 15,000+",
      reason:
        "This submission contains specialist, sensitive or regulated-sector indicators. A deeper governance engagement is recommended before launch, sale or market entry.",
    };
  }

  if (
    risk.includes("high") ||
    transfer === "yes" ||
    market.includes("saudi")
  ) {
    return {
      name: "KSA AI Trust Framework",
      price: "From GBP 8,000",
      reason:
        "This system has KSA market exposure, possible cross-border transfer exposure or elevated governance concerns. A structured Saudi-readiness framework is recommended.",
    };
  }

  if (
    risk.includes("medium") ||
    sensitive === "possibly" ||
    transfer === "possibly"
  ) {
    return {
      name: "AI Governance & Launch Review",
      price: "From GBP 2,500",
      reason:
        "This AI system appears to have moderate governance, data or user-transparency requirements and should be reviewed before wider launch.",
    };
  }

  return {
    name: "AI Risk Snapshot",
    price: "From GBP 750",
    reason:
      "This system appears suitable for an initial risk review before deeper governance work is considered.",
  };
}

const styles = StyleSheet.create({
  coverPage: {
    padding: 0,
    fontFamily: "Helvetica",
    backgroundColor: "#070707",
    color: "#ffffff",
  },
  page: {
    paddingTop: 42,
    paddingBottom: 52,
    paddingLeft: 42,
    paddingRight: 42,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  goldBar: {
    height: 12,
    backgroundColor: "#d6a84f",
  },
  coverInner: {
    padding: 48,
  },
  logoMark: {
    width: 42,
    height: 42,
    borderRadius: 12,
    border: "1px solid #d6a84f",
    backgroundColor: "#171717",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 22,
    fontWeight: 700,
    color: "#d6a84f",
  },
  coverBrandRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  brand: {
    fontSize: 22,
    fontWeight: 700,
    color: "#ffffff",
  },
  smallCapsLight: {
    fontSize: 8,
    letterSpacing: 1.6,
    color: "#c7a35a",
    textTransform: "uppercase",
  },
  smallCaps: {
    fontSize: 8,
    letterSpacing: 1.4,
    color: "#6b7280",
    textTransform: "uppercase",
  },
  coverLabel: {
    marginTop: 88,
    fontSize: 9,
    letterSpacing: 2.2,
    color: "#d6a84f",
    textTransform: "uppercase",
  },
  coverTitle: {
    marginTop: 16,
    fontSize: 34,
    lineHeight: 1.12,
    fontWeight: 700,
    color: "#ffffff",
    maxWidth: 450,
  },
  coverSubtitle: {
    marginTop: 18,
    fontSize: 11,
    lineHeight: 1.7,
    color: "#d1d5db",
    maxWidth: 450,
  },
  preparedBox: {
    marginTop: 42,
    border: "1px solid #3f3f46",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#111111",
  },
  coverGrid: {
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  coverBox: {
    width: "48%",
    border: "1px solid #3f3f46",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#111111",
  },
  coverBoxLabel: {
    fontSize: 7,
    letterSpacing: 1,
    color: "#a1a1aa",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  coverBoxValue: {
    fontSize: 10,
    color: "#ffffff",
    lineHeight: 1.4,
  },
  watermark: {
    position: "absolute",
    top: 330,
    left: 90,
    fontSize: 58,
    color: "#f3f4f6",
    opacity: 0.28,
    transform: "rotate(-25deg)",
    fontWeight: 700,
  },
  section: {
    marginBottom: 22,
  },
  h1: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 8,
    color: "#111827",
  },
  h2: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 8,
    color: "#111827",
  },
  h3: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
    color: "#111827",
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.65,
    color: "#374151",
    marginBottom: 8,
  },
  muted: {
    fontSize: 9,
    lineHeight: 1.55,
    color: "#6b7280",
  },
  divider: {
    height: 2,
    width: 80,
    backgroundColor: "#d6a84f",
    marginBottom: 18,
  },
  scoreHero: {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 18,
    marginTop: 14,
    backgroundColor: "#f9fafb",
    display: "flex",
    flexDirection: "row",
    gap: 18,
  },
  scoreNumberBox: {
    width: "34%",
    borderRight: "1px solid #e5e7eb",
    paddingRight: 14,
  },
  scoreTextBox: {
    width: "66%",
  },
  score: {
    fontSize: 36,
    fontWeight: 700,
    color: "#111827",
  },
  scoreOutOf: {
    fontSize: 14,
    color: "#6b7280",
  },
  ratingBadge: {
    marginTop: 8,
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 9,
    fontWeight: 700,
  },
  sourceMap: {
    marginTop: 14,
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#ffffff",
  },
  table: {
    width: "100%",
    border: "1px solid #e5e7eb",
    marginTop: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #e5e7eb",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottom: "1px solid #d1d5db",
  },
  cellDomain: {
    width: "42%",
    padding: 7,
    fontSize: 8.5,
  },
  cellScore: {
    width: "14%",
    padding: 7,
    fontSize: 8.5,
  },
  cellSource: {
    width: "44%",
    padding: 7,
    fontSize: 8.5,
  },
  th: {
    fontWeight: 700,
    color: "#374151",
  },
  metricGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  metric: {
    width: "48%",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9fafb",
  },
  label: {
    fontSize: 7,
    letterSpacing: 1,
    color: "#6b7280",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  value: {
    fontSize: 10,
    color: "#111827",
    lineHeight: 1.4,
  },
  tagBox: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9fafb",
    marginTop: 8,
  },
  listItem: {
    marginBottom: 7,
    fontSize: 10,
    lineHeight: 1.5,
    color: "#374151",
  },
  numberedItem: {
    display: "flex",
    flexDirection: "row",
    gap: 9,
    marginBottom: 9,
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  numberCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#111827",
    color: "#ffffff",
    fontSize: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5,
    color: "#374151",
  },
  commercialBox: {
    border: "1px solid #d6a84f",
    borderRadius: 14,
    padding: 18,
    backgroundColor: "#111827",
    color: "#ffffff",
    marginTop: 10,
  },
  commercialTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 6,
  },
  commercialPrice: {
    fontSize: 13,
    fontWeight: 700,
    color: "#d6a84f",
    marginBottom: 10,
  },
  commercialText: {
    fontSize: 10,
    lineHeight: 1.65,
    color: "#d1d5db",
  },
  disclaimer: {
    marginTop: 18,
    border: "1px solid #fecaca",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fef2f2",
    fontSize: 9,
    lineHeight: 1.6,
    color: "#7f1d1d",
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 42,
    right: 42,
    fontSize: 8,
    color: "#9ca3af",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #e5e7eb",
    paddingTop: 8,
  },
  coverFooter: {
    position: "absolute",
    bottom: 26,
    left: 48,
    right: 48,
    fontSize: 8,
    color: "#a1a1aa",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #3f3f46",
    paddingTop: 10,
  },
});

function CoverInfo({ label, val }: { label: string; val?: string | null }) {
  return (
    <View style={styles.coverBox}>
      <Text style={styles.coverBoxLabel}>{label}</Text>
      <Text style={styles.coverBoxValue}>{value(val)}</Text>
    </View>
  );
}

function Metric({ label, val }: { label: string; val?: string | null }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value(val)}</Text>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer} fixed>
      <Text>Sitora AI Trust Framework - sitora.co.uk</Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  );
}

function CoverFooter() {
  return (
    <View style={styles.coverFooter} fixed>
      <Text>Prepared by Sitora</Text>
      <Text>AI governance - compliance-readiness - digital trust</Text>
    </View>
  );
}

function PageHeader({ title }: { title: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.smallCaps}>Sitora AI Trust Framework</Text>
      <Text style={styles.h1}>{title}</Text>
      <View style={styles.divider} />
    </View>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={item} style={styles.numberedItem}>
          <View style={styles.numberCircle}>
            <Text>{index + 1}</Text>
          </View>
          <Text style={styles.numberText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function ScoreTable({ audit }: { audit: AuditPdfData }) {
  const rows = [
    ["AI purpose clarity", audit.ai_purpose_score, "SDAIA AI Ethics / AI Adoption"],
    ["AI risk classification", audit.risk_classification_score, "SDAIA AI Ethics / sector risk"],
    ["Data flow mapping", audit.data_flow_score, "PDPL / Implementing Regulations"],
    ["Personal data protection", audit.personal_data_score, "PDPL"],
    ["Sensitive data controls", audit.sensitive_data_score, "PDPL Implementing Regulations"],
    ["Cross-border transfer awareness", audit.cross_border_score, "SDAIA transfer rules"],
    ["AI transparency and disclosure", audit.transparency_score, "SDAIA AI Ethics"],
    ["Human oversight", audit.human_oversight_score, "SDAIA AI Ethics"],
    ["Output safety and testing", audit.output_safety_score, "SDAIA AI Ethics"],
    ["Bias and fairness controls", audit.bias_fairness_score, "SDAIA AI Ethics"],
    ["Vendor/API governance", audit.vendor_governance_score, "PDPL / NCA third-party risk"],
    ["Cybersecurity basics", audit.cybersecurity_score, "NCA ECC"],
    ["Cloud and hosting controls", audit.cloud_hosting_score, "NCA CCC / CST Cloud"],
    ["Incident response", audit.incident_response_score, "PDPL / SDAIA breach guidance / NCA"],
    ["Documentation quality", audit.documentation_score, "SDAIA / PDPL / NCA governance"],
    ["Review and monitoring", audit.review_monitoring_score, "SDAIA / NCA continuous review"],
    ["User journey trust", audit.user_journey_score, "SDAIA transparency / PDPL clarity"],
    ["Sector-specific readiness", audit.sector_readiness_score, "SFDA / SAMA / sector regulators"],
  ];

  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={[styles.cellDomain, styles.th]}>Domain</Text>
        <Text style={[styles.cellScore, styles.th]}>Score</Text>
        <Text style={[styles.cellSource, styles.th]}>Saudi Source Mapping</Text>
      </View>

      {rows.map(([label, score, source]) => (
        <View key={String(label)} style={styles.row}>
          <Text style={styles.cellDomain}>{String(label)}</Text>
          <Text style={styles.cellScore}>{String(score ?? 0)} / 5</Text>
          <Text style={styles.cellSource}>{String(source)}</Text>
        </View>
      ))}
    </View>
  );
}

function ReportDocument({ audit }: { audit: AuditPdfData }) {
  const missingEvidence = getMissingEvidence(audit);
  const priorityActions = getPriorityActions(audit);
  const recommendation = getPackageRecommendation(audit);
  const band = scoreBand(audit.score);

  return (
    <Document
      title={`Sitora KSA AI Trust Report - ${audit.company_name || "Client"}`}
      author="Sitora"
      subject="KSA AI Compliance and Governance Readiness Review"
    >
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.goldBar} />

        <View style={styles.coverInner}>
          <View style={styles.coverBrandRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>S</Text>
            </View>
            <View>
              <Text style={styles.brand}>Sitora</Text>
              <Text style={styles.smallCapsLight}>AI Trust Framework</Text>
            </View>
          </View>

          <Text style={styles.coverLabel}>Draft Report</Text>

          <Text style={styles.coverTitle}>
            KSA AI Compliance & Governance Readiness Review
          </Text>

          <Text style={styles.coverSubtitle}>
            A client-facing AI trust report reviewing governance, personal data,
            cross-border transfer exposure, transparency, human oversight,
            cybersecurity, cloud readiness and sector-risk indicators.
          </Text>

          <View style={styles.preparedBox}>
            <Text style={styles.coverBoxLabel}>Prepared for</Text>
            <Text style={styles.coverBoxValue}>
              {value(audit.company_name)}
            </Text>
            <Text style={[styles.coverBoxLabel, { marginTop: 10 }]}>
              Prepared by
            </Text>
            <Text style={styles.coverBoxValue}>Sitora</Text>
          </View>

          <View style={styles.coverGrid}>
            <CoverInfo label="AI Product" val={audit.ai_product_name} />
            <CoverInfo label="Primary Market" val={audit.primary_market} />
            <CoverInfo label="Contact" val={audit.contact_name} />
            <CoverInfo label="Report Date" val={formatDate(audit.created_at)} />
          </View>
        </View>

        <CoverFooter />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>DRAFT</Text>
        <PageHeader title="1. Executive Summary" />

        <Text style={styles.paragraph}>
          Sitora has prepared this draft AI Trust Report for{" "}
          {value(audit.company_name)} based on the information submitted through
          the KSA AI Trust Audit intake form.
        </Text>

        <Text style={styles.paragraph}>
          The review considers the AI system through key governance, privacy,
          data-transfer, cybersecurity, cloud and sector-risk areas relevant to
          AI software being built, launched or positioned for Saudi Arabia, the
          GCC or regulated international markets.
        </Text>

        <View style={styles.scoreHero}>
          <View style={styles.scoreNumberBox}>
            <Text style={styles.label}>KSA AI Trust Score</Text>
            <Text style={styles.score}>
              {audit.score ?? "—"} <Text style={styles.scoreOutOf}>/ 90</Text>
            </Text>
            <Text
              style={[
                styles.ratingBadge,
                {
                  color: band.colour,
                  backgroundColor: band.bg,
                  border: `1px solid ${band.border}`,
                },
              ]}
            >
              {audit.rating || band.label}
            </Text>
          </View>

          <View style={styles.scoreTextBox}>
            <Text style={styles.h3}>Initial Readiness Position</Text>
            <Text style={styles.paragraph}>{band.summary}</Text>
            <Text style={styles.muted}>
              Score type: {value(audit.score_type)}. This is an initial
              compliance-readiness estimate based on submitted answers. A
              reviewed score may change after manual evidence review.
            </Text>
          </View>
        </View>

        <View style={styles.sourceMap}>
          <Text style={styles.h3}>Source Mapping</Text>
          <Text style={styles.muted}>
            The Sitora score is mapped against key Saudi AI ethics, personal data
            protection, cross-border transfer, cybersecurity, cloud and
            sector-risk expectations. It is not an official certification,
            legal opinion or regulatory approval.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Key automatic notes</Text>
          <Text style={styles.paragraph}>
            {audit.scoring_notes ||
              "No automatic scoring notes were generated. Manual review is recommended."}
          </Text>
        </View>

        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>DRAFT</Text>
        <PageHeader title="2. KSA AI Trust Score Breakdown" />
        <ScoreTable audit={audit} />
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>DRAFT</Text>
        <PageHeader title="3. Risk, Data & Privacy Review" />

        <Text style={styles.h2}>Risk Classification</Text>
        <View style={styles.metricGrid}>
          <Metric label="Risk Level" val={audit.risk_level} />
          <Metric label="Sensitive Data" val={audit.sensitive_data_involved} />
          <Metric label="Data Leaves KSA" val={audit.data_leaves_ksa} />
          <Metric label="AI System Type" val={audit.ai_system_type} />
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Data & Privacy</Text>
          <View style={styles.metricGrid}>
            <Metric label="Personal Data Stored" val={audit.personal_data_stored} />
            <Metric label="Retention Period" val={audit.retention_period} />
            <Metric label="AI Logs Access" val={audit.ai_logs_access} />
            <Metric label="Business Type" val={audit.business_type} />
          </View>

          <View style={styles.tagBox}>
            <Text style={styles.label}>Data Collected</Text>
            <Text style={styles.value}>{list(audit.data_collected)}</Text>
          </View>

          <View style={styles.tagBox}>
            <Text style={styles.label}>Privacy / Consent Wording</Text>
            <Text style={styles.value}>
              {value(audit.privacy_consent_wording)}
            </Text>
          </View>
        </View>

        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>DRAFT</Text>
        <PageHeader title="4. Vendors, Transfers, Transparency & Oversight" />

        <Text style={styles.h2}>Cross-Border & Vendor Review</Text>
        <View style={styles.metricGrid}>
          <Metric label="AI Provider" val={audit.ai_provider} />
          <Metric label="Cloud Provider" val={audit.cloud_provider} />
          <Metric label="Hosting Region" val={audit.hosting_region} />
          <Metric label="Data Leaves KSA" val={audit.data_leaves_ksa} />
        </View>

        <View style={styles.tagBox}>
          <Text style={styles.label}>Third-Party Tools</Text>
          <Text style={styles.value}>{value(audit.third_party_tools)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Transparency</Text>
          <View style={styles.tagBox}>
            <Text style={styles.label}>Disclosures Present</Text>
            <Text style={styles.value}>{list(audit.disclosures_present)}</Text>
          </View>

          <View style={styles.tagBox}>
            <Text style={styles.label}>AI Disclosure Wording</Text>
            <Text style={styles.value}>{value(audit.ai_disclosure_wording)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Human Oversight</Text>
          <View style={styles.metricGrid}>
            <Metric label="Human Review Available" val={audit.human_review_available} />
            <Metric label="AI Override Available" val={audit.ai_override_available} />
            <Metric label="Internal AI Owner" val={audit.internal_ai_owner} />
            <Metric label="Escalation Route" val={audit.escalation_route} />
          </View>
        </View>

        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>DRAFT</Text>
        <PageHeader title="5. Cybersecurity, Testing & Sector Flags" />

        <Text style={styles.h2}>Cybersecurity & Cloud Controls</Text>
        <View style={styles.tagBox}>
          <Text style={styles.label}>Security Controls</Text>
          <Text style={styles.value}>{list(audit.security_controls)}</Text>
        </View>

        <View style={styles.metricGrid}>
          <Metric label="Admin Dashboard Access" val={audit.admin_dashboard_access} />
          <Metric label="Backup Process" val={audit.backup_process} />
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Testing & AI Safety</Text>
          <View style={styles.tagBox}>
            <Text style={styles.label}>Testing Completed</Text>
            <Text style={styles.value}>{list(audit.testing_completed)}</Text>
          </View>

          <View style={styles.tagBox}>
            <Text style={styles.label}>Known AI Issues</Text>
            <Text style={styles.value}>{value(audit.known_ai_issues)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Sector-Specific Flags</Text>
          <View style={styles.tagBox}>
            <Text style={styles.label}>Healthcare Flags</Text>
            <Text style={styles.value}>{list(audit.healthcare_flags)}</Text>
          </View>

          <View style={styles.tagBox}>
            <Text style={styles.label}>Finance Flags</Text>
            <Text style={styles.value}>{list(audit.finance_flags)}</Text>
          </View>

          <View style={styles.tagBox}>
            <Text style={styles.label}>HR / Education Flags</Text>
            <Text style={styles.value}>
              HR: {list(audit.hr_flags)} | Education: {list(audit.education_flags)}
            </Text>
          </View>
        </View>

        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>DRAFT</Text>
        <PageHeader title="6. Missing Evidence & Priority Action Plan" />

        <View style={styles.section}>
          <Text style={styles.h2}>Missing Evidence</Text>
          {missingEvidence.length === 0 ? (
            <Text style={styles.paragraph}>
              No major missing evidence was automatically identified from the
              intake answers. Manual review is still recommended.
            </Text>
          ) : (
            <NumberedList items={missingEvidence} />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Priority Action Plan</Text>
          <NumberedList items={priorityActions} />
        </View>

        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>DRAFT</Text>
        <PageHeader title="7. Recommended Sitora Engagement" />

        <Text style={styles.paragraph}>
          Based on the submitted intake, Sitora recommends the following next
          step. This recommendation may be adjusted after evidence review,
          technical review and any required specialist legal or regulatory input.
        </Text>

        <View style={styles.commercialBox}>
          <Text style={styles.commercialTitle}>{recommendation.name}</Text>
          <Text style={styles.commercialPrice}>{recommendation.price}</Text>
          <Text style={styles.commercialText}>{recommendation.reason}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Recommended next steps</Text>
          <NumberedList
            items={[
              "Confirm the client’s intended launch market, system scope and AI use case.",
              "Request missing evidence including privacy wording, data flow, vendor details and testing logs.",
              "Complete Sitora manual review and adjust the initial score if required.",
              "Prepare a practical remediation plan and implementation proposal.",
              "Where required, recommend specialist Saudi legal, cybersecurity or sector-regulatory review.",
            ]}
          />
        </View>

        <View style={styles.disclaimer}>
          <Text>
            Important disclaimer: Sitora provides AI governance, software trust
            and compliance-readiness support. This report is designed to
            identify risks, gaps and practical improvement actions. It does not
            constitute legal advice, regulatory certification or formal approval
            by any Saudi regulator. Where specialist legal, regulatory or
            sector-specific approval is required, the client should seek advice
            from qualified Saudi legal and regulatory professionals.
          </Text>
        </View>

        <Footer />
      </Page>
    </Document>
  );
}

export async function generateKsaAiReportPdf(audit: AuditPdfData) {
  return renderToBuffer(<ReportDocument audit={audit} />);
}