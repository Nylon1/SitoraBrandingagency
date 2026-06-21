import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowLeft,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Database,
  FileCheck2,
  Globe2,
  LockKeyhole,
  Scale,
  ShieldCheck,
  UserCheck,
  Eye,
  ClipboardCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

type Audit = {
  id: string;
  created_at: string;
  status: string | null;
  sitora_notes: string | null;

  company_name: string | null;
  contact_name: string | null;
  email: string | null;
  website: string | null;
  primary_market: string | null;
  business_type: string | null;
specialist_saudi_flags: string[] | null;
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

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function arr(value: string[] | null | undefined) {
  return value && value.length > 0 ? value : [];
}

function has(value?: string | null) {
  return value && value.trim().length > 0;
}

function yes(value?: string | null) {
  return (value || "").toLowerCase() === "yes";
}

function maybe(value?: string | null) {
  const v = (value || "").toLowerCase();
  return v === "possibly" || v === "not sure";
}

function getPackageRecommendation(audit: Audit) {
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
      price: "From £15,000+",
      reason:
        "The submission contains specialist, sensitive or regulated-sector indicators. A deeper governance engagement is recommended before launch, scale or market entry.",
    };
  }

  if (
    risk.includes("high") ||
    transfer === "yes" ||
    market.includes("saudi")
  ) {
    return {
      name: "KSA AI Trust Framework",
      price: "From £8,000",
      reason:
        "The system has KSA market exposure, cross-border transfer considerations or elevated risk indicators requiring a structured Saudi-readiness framework.",
    };
  }

  if (
    risk.includes("medium") ||
    sensitive === "possibly" ||
    transfer === "possibly"
  ) {
    return {
      name: "AI Governance & Launch Review",
      price: "From £2,500",
      reason:
        "The system appears to have moderate governance, data or user-transparency requirements and should be reviewed before wider launch.",
    };
  }

  return {
    name: "AI Risk Snapshot",
    price: "From £750",
    reason:
      "The system appears suitable for an initial risk review before deeper governance work is considered.",
  };
}

function getMissingEvidence(audit: Audit) {
  const missing: string[] = [];

  if (!arr(audit.available_evidence).some((x) => x.toLowerCase().includes("ai system"))) {
    missing.push("AI system description");
  }

  if (!arr(audit.available_evidence).some((x) => x.toLowerCase().includes("user journey"))) {
    missing.push("User journey / flow");
  }

  if (!arr(audit.available_evidence).some((x) => x.toLowerCase().includes("privacy"))) {
    missing.push("Privacy notice");
  }

  if (!arr(audit.available_evidence).some((x) => x.toLowerCase().includes("data flow"))) {
    missing.push("Data flow map");
  }

  if (!arr(audit.available_evidence).some((x) => x.toLowerCase().includes("testing"))) {
    missing.push("AI testing logs");
  }

  if (!arr(audit.available_evidence).some((x) => x.toLowerCase().includes("vendor"))) {
    missing.push("Vendor contracts / AI provider documentation");
  }

  if (!arr(audit.available_evidence).some((x) => x.toLowerCase().includes("incident"))) {
    missing.push("Incident response plan");
  }

  return missing;
}

function getPriorityActions(audit: Audit) {
  const actions: string[] = [];

  if (!has(audit.ai_description)) {
    actions.push("Document the AI system purpose, intended users, boundaries and business owner.");
  }

  if (yes(audit.sensitive_data_involved) || maybe(audit.sensitive_data_involved)) {
    actions.push("Create stronger controls for sensitive data, including access limits, consent wording and retention rules.");
  }

  if (yes(audit.data_leaves_ksa) || maybe(audit.data_leaves_ksa)) {
    actions.push("Prepare a cross-border data transfer review covering AI providers, cloud regions, prompts, logs, files and outputs.");
  }

  if (!has(audit.ai_disclosure_wording)) {
    actions.push("Add clear AI disclosure wording so users understand when AI is involved and what its limits are.");
  }

  if ((audit.human_review_available || "").toLowerCase() !== "yes") {
    actions.push("Define a human oversight process, including escalation, review and override routes.");
  }

  if (arr(audit.testing_completed).length === 0) {
    actions.push("Run and document AI safety testing, including hallucination, prompt injection, sensitive-topic and wrong-answer testing.");
  }

  if (arr(audit.security_controls).length === 0) {
    actions.push("Review cybersecurity basics including MFA, role-based access, API key handling, audit logs and backups.");
  }

  if (arr(audit.healthcare_flags).length > 0) {
    actions.push("Review whether the system may fall under SFDA medical/digital health expectations before any clinical claims are made.");
  }

  if (arr(audit.finance_flags).length > 0) {
    actions.push("Review whether the system creates SAMA-related finance, insurance, cybersecurity or decisioning exposure.");
  }

  if (arr(audit.hr_flags).length > 0) {
    actions.push("Review fairness, bias and human oversight controls for recruitment or employment-related AI decisions.");
  }

  if (arr(audit.education_flags).length > 0) {
    actions.push("Review safeguarding, parental consent and child-data controls before deploying to children or education users.");
  }

  if (actions.length === 0) {
    actions.push("Proceed to manual evidence review and confirm whether the initial estimated score should be adjusted.");
  }

  return actions;
}

export default async function AIAuditReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    throw new Error("Missing audit ID.");
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("ksa_ai_audit_intakes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Audit not found.");
  }

  const audit = data as Audit;
  const recommendation = getPackageRecommendation(audit);
  const missingEvidence = getMissingEvidence(audit);
  const priorityActions = getPriorityActions(audit);

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_35%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_35%),linear-gradient(180deg,#05070d_0%,#070b14_50%,#030407_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href={`/admin/ai-audits/${audit.id}`}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.1]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to audit detail
          </Link>

         <a
  href={`/api/admin/ai-audits/${audit.id}/report/pdf`}
  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_35px_rgba(250,204,21,0.2)] transition hover:scale-[1.01]"
>
  Download PDF
</a>
        </div>

        {/* Cover */}
        <section className="overflow-hidden rounded-[2.5rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/[0.12] via-white/[0.045] to-cyan-300/[0.08] p-7 shadow-2xl backdrop-blur sm:p-10">
          <div className="mb-16 inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10">
              <ShieldCheck className="h-6 w-6 text-amber-200" />
            </div>
            <div>
              <p className="text-xl font-semibold">Sitora</p>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                AI Trust Framework
              </p>
            </div>
          </div>

          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-amber-100/60">
            Draft Report
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">
            KSA AI Compliance & Governance Readiness Review
          </h1>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CoverInfo label="Client" value={audit.company_name} />
            <CoverInfo label="AI Product" value={audit.ai_product_name} />
            <CoverInfo label="Market" value={audit.primary_market} />
            <CoverInfo label="Date" value={formatDate(audit.created_at)} />
          </div>
        </section>

        {/* Executive Summary */}
        <ReportSection
          icon={ClipboardCheck}
          title="1. Executive Summary"
          subtitle="Initial overview based on the audit intake submission."
        >
          <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4 text-sm leading-7 text-white/68">
              <p>
                Sitora has prepared this draft AI Trust Report for{" "}
                <strong className="text-white">{audit.company_name || "the client"}</strong>{" "}
                based on the information submitted through the KSA AI Trust Audit
                intake form.
              </p>

              <p>
                The review considers the AI system through key governance,
                privacy, data-transfer, cybersecurity, cloud and sector-risk
                areas relevant to AI software being built, launched or positioned
                for Saudi Arabia, the GCC or regulated international markets.
              </p>

              <p>
                The current score is an initial estimate based on submitted
                answers only. A reviewed score may change after Sitora examines
                supporting evidence such as data flow maps, privacy notices,
                vendor documentation, testing logs and system screenshots.
              </p>
            </div>

            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.08] p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-100/55">
                KSA AI Trust Score
              </p>
              <p className="mt-4 text-5xl font-semibold">
                {audit.score ?? "—"}
                <span className="text-2xl text-white/45"> / 90</span>
              </p>
              <p className="mt-3 text-xl font-semibold text-amber-100">
                {audit.rating || "Not rated"}
              </p>
              <p className="mt-4 text-xs leading-5 text-white/50">
                Score type: {audit.score_type || "initial_estimate"}
              </p>
            </div>
          </div>
        </ReportSection>

        {/* Score Breakdown */}
        <ReportSection
          icon={Scale}
          title="2. KSA AI Trust Score Breakdown"
          subtitle="18 scoring domains, each scored out of 5."
        >
          <ScoreTable audit={audit} />
        </ReportSection>

        {/* Risk Classification */}
        <ReportSection
          icon={AlertTriangle}
          title="3. Risk Classification"
          subtitle="Initial risk assessment based on submitted use case and sector indicators."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Risk Level" value={audit.risk_level} />
            <Metric label="Sensitive Data" value={audit.sensitive_data_involved} />
            <Metric label="Data Leaves KSA" value={audit.data_leaves_ksa} />
            <Metric label="AI System Type" value={audit.ai_system_type} />
          </div>

          <TextReportBlock
            title="Risk Notes"
            text={
              audit.scoring_notes ||
              "No automatic scoring notes were generated. Manual review is recommended."
            }
          />
        </ReportSection>

        {/* Data Privacy */}
        <ReportSection
          icon={Database}
          title="4. Data & Privacy Review"
          subtitle="Review of personal data, sensitive data, retention and privacy wording."
        >
          <TagReportBlock label="Data Collected" values={arr(audit.data_collected)} />
<TagReportBlock
  label="Specialist Saudi Regulatory Flags"
  values={arr(audit.specialist_saudi_flags)}
/>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Personal Data Stored" value={audit.personal_data_stored} />
            <Metric label="Sensitive Data Involved" value={audit.sensitive_data_involved} />
            <Metric label="Retention Period" value={audit.retention_period} />
            <Metric label="AI Logs Access" value={audit.ai_logs_access} />
          </div>

          <TextReportBlock
            title="Privacy / Consent Wording Provided"
            text={audit.privacy_consent_wording || "No privacy or consent wording was provided."}
          />
        </ReportSection>

        {/* Cross Border */}
        <ReportSection
          icon={Globe2}
          title="5. Cross-Border Data Transfer Review"
          subtitle="Review of AI vendors, cloud hosting and possible transfer outside Saudi Arabia."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="AI Provider" value={audit.ai_provider} />
            <Metric label="Cloud Provider" value={audit.cloud_provider} />
            <Metric label="Hosting Region" value={audit.hosting_region} />
            <Metric label="Data Leaves KSA" value={audit.data_leaves_ksa} />
          </div>

          <TextReportBlock
            title="Third-Party Tools"
            text={audit.third_party_tools || "No third-party tool details were provided."}
          />
        </ReportSection>

        {/* Transparency */}
        <ReportSection
          icon={Eye}
          title="6. AI Transparency Review"
          subtitle="Review of user disclosure, AI notices and professional disclaimers."
        >
          <TagReportBlock
            label="Disclosures Present"
            values={arr(audit.disclosures_present)}
          />

          <TextReportBlock
            title="AI Disclosure Wording"
            text={audit.ai_disclosure_wording || "No AI disclosure wording was provided."}
          />
        </ReportSection>

        {/* Human Oversight */}
        <ReportSection
          icon={UserCheck}
          title="7. Human Oversight Review"
          subtitle="Review of review routes, escalation, override and accountability."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Human Review Available" value={audit.human_review_available} />
            <Metric label="AI Override Available" value={audit.ai_override_available} />
            <Metric label="Internal AI Owner" value={audit.internal_ai_owner} />
            <Metric label="Escalation Route" value={audit.escalation_route} />
          </div>

          <TextReportBlock
            title="Human Review Process"
            text={audit.human_review_process || "No human review process was provided."}
          />
        </ReportSection>

        {/* Cyber */}
        <ReportSection
          icon={LockKeyhole}
          title="8. Cybersecurity & Cloud Review"
          subtitle="Review of security controls, admin access, backups, cloud and hosting basics."
        >
          <TagReportBlock
            label="Security Controls"
            values={arr(audit.security_controls)}
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Metric label="Admin Dashboard Access" value={audit.admin_dashboard_access} />
            <Metric label="Backup Process" value={audit.backup_process} />
          </div>
        </ReportSection>

        {/* Testing */}
        <ReportSection
          icon={BrainCircuit}
          title="9. Testing & AI Safety Review"
          subtitle="Review of hallucination, prompt-injection, sensitive-topic and safety testing."
        >
          <TagReportBlock
            label="Testing Completed"
            values={arr(audit.testing_completed)}
          />

          <TextReportBlock
            title="Known AI Issues"
            text={audit.known_ai_issues || "No known AI issues were provided."}
          />
        </ReportSection>

        {/* Sector */}
        <ReportSection
          icon={Cloud}
          title="10. Sector-Specific Flags"
          subtitle="Healthcare, finance, HR, education and other specialist risk indicators."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <TagReportBlock label="Healthcare Flags" values={arr(audit.healthcare_flags)} />
            <TagReportBlock label="Finance Flags" values={arr(audit.finance_flags)} />
            <TagReportBlock label="HR Flags" values={arr(audit.hr_flags)} />
            <TagReportBlock label="Education Flags" values={arr(audit.education_flags)} />
          </div>
        </ReportSection>

        {/* Missing Evidence */}
        <ReportSection
          icon={FileCheck2}
          title="11. Missing Evidence"
          subtitle="Documents and evidence Sitora should request before finalising the report."
        >
          {missingEvidence.length === 0 ? (
            <PositiveBox text="No major missing evidence was automatically identified from the intake answers. Manual review is still recommended." />
          ) : (
            <NumberedList items={missingEvidence} />
          )}
        </ReportSection>

        {/* Priority Action Plan */}
        <ReportSection
          icon={CheckCircle2}
          title="12. Priority Action Plan"
          subtitle="Recommended next steps before launch, sale or wider deployment."
        >
          <NumberedList items={priorityActions} />
        </ReportSection>

        {/* Package */}
        <ReportSection
          icon={ShieldCheck}
          title="13. Recommended Sitora Package"
          subtitle="Commercial recommendation based on risk, market and submitted evidence."
        >
          <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.08] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-100/55">
              Recommendation
            </p>
            <h3 className="mt-4 text-3xl font-semibold">{recommendation.name}</h3>
            <p className="mt-2 text-xl font-semibold text-amber-200">
              {recommendation.price}
            </p>
            <p className="mt-5 text-sm leading-6 text-white/65">
              {recommendation.reason}
            </p>
          </div>
        </ReportSection>

        {/* Disclaimer */}
        <section className="my-10 rounded-[2rem] border border-red-300/20 bg-red-300/[0.07] p-6">
          <div className="flex gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-100" />
            <div>
              <h2 className="text-xl font-semibold">Important Disclaimer</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                Sitora provides AI governance, software trust and
                compliance-readiness support. This report is designed to
                identify risks, gaps and practical improvement actions. It does
                not constitute legal advice, regulatory certification or formal
                approval by any Saudi regulator. Where specialist legal,
                regulatory or sector-specific approval is required, the client
                should seek advice from qualified Saudi legal and regulatory
                professionals.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ReportSection({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: any;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur sm:p-8">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
          <Icon className="h-6 w-6 text-amber-200" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/52">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function CoverInfo({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-white/35">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white/80">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-white/35">
        {label}
      </p>
      <p className="mt-2 text-sm text-white/75">{value || "Not provided"}</p>
    </div>
  );
}

function TextReportBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-white/35">
        {title}
      </p>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/68">
        {text}
      </p>
    </div>
  );
}

function TagReportBlock({
  label,
  values,
}: {
  label: string;
  values: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/35">
        {label}
      </p>

      {values.length === 0 ? (
        <p className="text-sm text-white/45">None selected</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <span
              key={value}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/70"
            >
              {value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function PositiveBox({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] p-5">
      <div className="flex gap-3">
        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-100" />
        <p className="text-sm leading-7 text-white/68">{text}</p>
      </div>
    </div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item}
          className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10 text-sm font-semibold text-amber-100">
            {index + 1}
          </div>
          <p className="pt-1 text-sm leading-6 text-white/68">{item}</p>
        </div>
      ))}
    </div>
  );
}

function ScoreTable({ audit }: { audit: Audit }) {
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
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="border-b border-white/10 text-xs uppercase tracking-[0.2em] text-white/35">
          <tr>
            <th className="px-4 py-3">Domain</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Saudi Source Mapping</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(([label, score, source]) => (
            <tr key={label as string} className="border-b border-white/10">
              <td className="px-4 py-4 text-white/78">{label}</td>
              <td className="px-4 py-4">
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/75">
                  {score ?? 0} / 5
                </span>
              </td>
              <td className="px-4 py-4 text-white/55">{source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}