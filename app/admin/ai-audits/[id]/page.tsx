import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import AuditStatusPanel from "@/components/AuditStatusPanel";
import {
  ArrowLeft,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Database,
  Eye,
  FileCheck2,
  Globe2,
  LockKeyhole,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

type Audit = {
  id: string;
  created_at: string;
  status: string | null;
  sitora_notes: string | null;
specialist_saudi_flags: string[] | null;
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
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function arr(value: string[] | null | undefined) {
  return value && value.length > 0 ? value : [];
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
        "This submission includes specialist, sensitive or regulated-sector indicators. It should be handled as a premium governance engagement.",
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
        "This submission shows KSA exposure, high-risk indicators or cross-border transfer concerns.",
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
        "This AI system appears customer-facing or has moderate governance, data or launch-readiness issues.",
    };
  }

  return {
    name: "AI Risk Snapshot",
    price: "From £750",
    reason:
      "This appears to be an early-stage or lower-risk AI use case suitable for an initial review.",
  };
}

export default async function AIAuditDetailPage({
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

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_35%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_35%),linear-gradient(180deg,#05070d_0%,#070b14_50%,#030407_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <Link
          href="/admin/ai-audits"
          className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.1]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to audits
        </Link>

        <header className="mb-8 grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 shadow-2xl backdrop-blur">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              <ShieldCheck className="h-4 w-4" />
              Audit Detail
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              {audit.company_name || "Unnamed company"}
            </h1>

            <p className="mt-4 text-white/60">
              Submitted {formatDate(audit.created_at)}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Info label="Contact" value={audit.contact_name} />
              <Info label="Email" value={audit.email} />
              <Info label="Website" value={audit.website} />
              <Info label="Market" value={audit.primary_market} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.08] p-7 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-100/55">
              Recommended Package
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              {recommendation.name}
            </h2>

            <p className="mt-2 text-xl font-semibold text-amber-200">
              {recommendation.price}
            </p>

            <p className="mt-5 text-sm leading-6 text-white/62">
              {recommendation.reason}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Info label="Score" value={`${audit.score ?? "—"} / 90`} />
              <Info label="Rating" value={audit.rating} />
            </div>
            <Link
  href={`/admin/ai-audits/${audit.id}/report`}
  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 px-5 py-3.5 text-sm font-semibold text-black shadow-[0_0_35px_rgba(250,204,21,0.2)] transition hover:scale-[1.01]"
>
  Generate AI Trust Report
</Link>
<Link
  href={`/admin/ai-audits/${audit.id}/files`}
  className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-5 py-3.5 text-sm font-semibold text-white/75 transition hover:bg-white/[0.1]"
>
  Generate Saudi AI File Pack
</Link>
          </div>
        </header>

        <section className="mb-8">
          <AuditStatusPanel
            auditId={audit.id}
            initialStatus={audit.status}
            initialNotes={audit.sitora_notes}
          />
        </section>

        <ScoreBreakdown audit={audit} />

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <Panel icon={BrainCircuit} title="AI System Overview">
            <Info label="Product name" value={audit.ai_product_name} />
            <Info label="AI system type" value={audit.ai_system_type} />
            <Info label="Business type" value={audit.business_type} />
            <TextBlock label="What the AI does" value={audit.ai_description} />
            <TextBlock label="Who uses it" value={audit.ai_users} />
            <TagBlock label="AI influences" values={arr(audit.ai_influences)} /><TagBlock
  label="Specialist Saudi regulatory flags"
  values={arr(audit.specialist_saudi_flags)}
/>

          </Panel>
          
          <Panel icon={AlertTriangle} title="Risk Classification">
            <Info label="Risk level" value={audit.risk_level} />
            <Info
              label="Sensitive data involved"
              value={audit.sensitive_data_involved}
            />
            <Info label="Data leaves KSA" value={audit.data_leaves_ksa} />
            <Info label="Initial rating" value={audit.rating} />
            <Info label="Initial score" value={`${audit.score ?? "—"} / 90`} />
          </Panel>

          <Panel icon={Database} title="Data & Privacy">
            <TagBlock label="Data collected" values={arr(audit.data_collected)} />
            <Info
              label="Personal data stored"
              value={audit.personal_data_stored}
            />
            <Info label="Retention period" value={audit.retention_period} />
            <Info label="AI logs access" value={audit.ai_logs_access} />
            <TextBlock
              label="Privacy / consent wording"
              value={audit.privacy_consent_wording}
            />
          </Panel>

          <Panel icon={Globe2} title="Cross-Border & Vendors">
            <Info label="AI provider" value={audit.ai_provider} />
            <Info label="Cloud provider" value={audit.cloud_provider} />
            <Info label="Hosting region" value={audit.hosting_region} />
            <Info label="Data leaves KSA" value={audit.data_leaves_ksa} />
            <TextBlock
              label="Third-party tools"
              value={audit.third_party_tools}
            />
          </Panel>

          <Panel icon={Eye} title="Transparency & Disclosure">
            <TagBlock
              label="Disclosures present"
              values={arr(audit.disclosures_present)}
            />
            <TextBlock
              label="AI disclosure wording"
              value={audit.ai_disclosure_wording}
            />
          </Panel>

          <Panel icon={UserCheck} title="Human Oversight">
            <Info
              label="Human review available"
              value={audit.human_review_available}
            />
            <Info label="AI override available" value={audit.ai_override_available} />
            <Info label="Internal AI owner" value={audit.internal_ai_owner} />
            <Info label="Escalation route" value={audit.escalation_route} />
            <TextBlock
              label="Human review process"
              value={audit.human_review_process}
            />
          </Panel>

          <Panel icon={LockKeyhole} title="Cybersecurity & Access">
            <TagBlock
              label="Security controls"
              values={arr(audit.security_controls)}
            />
            <Info
              label="Admin dashboard access"
              value={audit.admin_dashboard_access}
            />
            <Info label="Backup process" value={audit.backup_process} />
          </Panel>

          <Panel icon={Cloud} title="Testing & Safety">
            <TagBlock
              label="Testing completed"
              values={arr(audit.testing_completed)}
            />
            <TextBlock label="Known AI issues" value={audit.known_ai_issues} />
          </Panel>

          <Panel icon={Scale} title="Sector-Specific Flags">
            <TagBlock
              label="Healthcare flags"
              values={arr(audit.healthcare_flags)}
            />
            <TagBlock label="Finance flags" values={arr(audit.finance_flags)} />
            <TagBlock label="HR flags" values={arr(audit.hr_flags)} />
            <TagBlock
              label="Education flags"
              values={arr(audit.education_flags)}
            />
          </Panel>

          <Panel icon={FileCheck2} title="Available Evidence">
            <TagBlock
              label="Evidence available"
              values={arr(audit.available_evidence)}
            />
          </Panel>
        </section>

        <section className="mt-8 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.07] p-7">
          <h2 className="text-2xl font-semibold">Next Sitora Actions</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Review missing evidence",
              "Confirm risk level",
              "Prepare action plan",
              "Send package proposal",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70"
              >
                <CheckCircle2 className="mb-3 h-5 w-5 text-cyan-100" />
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ScoreBreakdown({ audit }: { audit: Audit }) {
  const rows = [
    [
      "AI purpose clarity",
      audit.ai_purpose_score,
      "SDAIA AI Ethics / AI Adoption",
    ],
    [
      "AI risk classification",
      audit.risk_classification_score,
      "SDAIA AI Ethics / sector risk",
    ],
    [
      "Data flow mapping",
      audit.data_flow_score,
      "PDPL / Implementing Regulations",
    ],
    ["Personal data protection", audit.personal_data_score, "PDPL"],
    [
      "Sensitive data controls",
      audit.sensitive_data_score,
      "PDPL Implementing Regulations",
    ],
    [
      "Cross-border transfer awareness",
      audit.cross_border_score,
      "SDAIA transfer rules",
    ],
    [
      "AI transparency and disclosure",
      audit.transparency_score,
      "SDAIA AI Ethics",
    ],
    ["Human oversight", audit.human_oversight_score, "SDAIA AI Ethics"],
    [
      "Output safety and testing",
      audit.output_safety_score,
      "SDAIA AI Ethics",
    ],
    [
      "Bias and fairness controls",
      audit.bias_fairness_score,
      "SDAIA AI Ethics",
    ],
    [
      "Vendor/API governance",
      audit.vendor_governance_score,
      "PDPL / NCA third-party risk",
    ],
    ["Cybersecurity basics", audit.cybersecurity_score, "NCA ECC"],
    [
      "Cloud and hosting controls",
      audit.cloud_hosting_score,
      "NCA CCC / CST Cloud",
    ],
    [
      "Incident response",
      audit.incident_response_score,
      "PDPL / SDAIA breach guidance / NCA",
    ],
    [
      "Documentation quality",
      audit.documentation_score,
      "SDAIA / PDPL / NCA governance",
    ],
    [
      "Review and monitoring",
      audit.review_monitoring_score,
      "SDAIA / NCA continuous review",
    ],
    [
      "User journey trust",
      audit.user_journey_score,
      "SDAIA transparency / PDPL clarity",
    ],
    [
      "Sector-specific readiness",
      audit.sector_readiness_score,
      "SFDA / SAMA / sector regulators",
    ],
  ];

  return (
    <section className="rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.07] p-6 shadow-2xl backdrop-blur">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-100/55">
          KSA AI Trust Score
        </p>

        <h2 className="mt-3 text-3xl font-semibold">
          {audit.score ?? "—"} / 90 — {audit.rating || "Not rated"}
        </h2>

        <p className="mt-3 text-sm leading-6 text-white/60">
          Score type: {audit.score_type || "initial_estimate"}. This is a
          compliance-readiness score based on Sitora’s KSA AI Trust Framework,
          not legal advice, regulatory certification or official approval.
        </p>

        {audit.scoring_notes && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Scoring Notes
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {audit.scoring_notes}
            </p>
          </div>
        )}
      </div>

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
    </section>
  );
}

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
          <Icon className="h-5 w-5 text-amber-200" />
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Info({
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

function TextBlock({
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
      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/70">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function TagBlock({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
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