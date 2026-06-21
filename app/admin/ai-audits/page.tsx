import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  Eye,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

type Audit = {
  id: string;
  created_at: string;
  status: string | null;
  company_name: string | null;
  contact_name: string | null;
  email: string | null;
  primary_market: string | null;
  business_type: string | null;
  ai_product_name: string | null;
  ai_system_type: string | null;
  risk_level: string | null;
  sensitive_data_involved: string | null;
  data_leaves_ksa: string | null;
  score: number | null;
  rating: string | null;
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
    month: "short",
    year: "numeric",
  }).format(new Date(date));
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
    return "Enterprise AI Governance Readiness";
  }

  if (
    risk.includes("high") ||
    transfer === "yes" ||
    market.includes("saudi")
  ) {
    return "KSA AI Trust Framework";
  }

  if (
    risk.includes("medium") ||
    sensitive === "possibly" ||
    transfer === "possibly"
  ) {
    return "AI Governance & Launch Review";
  }

  return "AI Risk Snapshot";
}

function getRiskBadge(risk?: string | null) {
  const value = risk || "Unclassified";
  const lower = value.toLowerCase();

  if (lower.includes("specialist") || lower.includes("high")) {
    return "border-red-300/25 bg-red-300/10 text-red-100";
  }

  if (lower.includes("medium")) {
    return "border-amber-300/25 bg-amber-300/10 text-amber-100";
  }

  return "border-emerald-300/25 bg-emerald-300/10 text-emerald-100";
}

export default async function AIAuditsAdminPage() {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("ksa_ai_audit_intakes")
    .select(
      "id, created_at, status, company_name, contact_name, email, primary_market, business_type, ai_product_name, ai_system_type, risk_level, sensitive_data_involved, data_leaves_ksa, score, rating"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const audits = (data || []) as Audit[];

  const total = audits.length;
  const highRisk = audits.filter((audit) =>
    (audit.risk_level || "").toLowerCase().includes("high")
  ).length;
  const specialist = audits.filter((audit) =>
    (audit.risk_level || "").toLowerCase().includes("specialist")
  ).length;
  const ksaMarket = audits.filter((audit) =>
    (audit.primary_market || "").toLowerCase().includes("saudi")
  ).length;

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_35%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_35%),linear-gradient(180deg,#05070d_0%,#070b14_50%,#030407_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="mb-10 flex flex-col justify-between gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              <ShieldCheck className="h-4 w-4" />
              Sitora Admin
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              AI Audit Submissions
            </h1>

            <p className="mt-4 max-w-2xl text-white/60">
              Review KSA AI Trust Audit intakes, risk levels, ratings and
              commercial package recommendations.
            </p>
          </div>

          <Link
            href="/ksa-ai-trust-audit"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/[0.09]"
          >
            View Audit Form
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Intakes"
            value={total}
            icon={ClipboardList}
            tone="amber"
          />
          <StatCard
            title="High Risk"
            value={highRisk}
            icon={AlertTriangle}
            tone="red"
          />
          <StatCard
            title="Specialist Review"
            value={specialist}
            icon={BrainCircuit}
            tone="cyan"
          />
          <StatCard
            title="Saudi Market"
            value={ksaMarket}
            icon={ShieldCheck}
            tone="emerald"
          />
        </section>

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl backdrop-blur">
          <div className="border-b border-white/10 p-5">
            <h2 className="text-xl font-semibold">Latest Audit Intakes</h2>
            <p className="mt-1 text-sm text-white/45">
              Newest submissions appear first.
            </p>
          </div>

          {audits.length === 0 ? (
            <div className="p-10 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-white/35" />
              <p className="mt-4 text-lg font-semibold">No submissions yet</p>
              <p className="mt-2 text-sm text-white/45">
                Submit a test from the KSA AI Trust Audit form.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left text-sm">
                <thead className="border-b border-white/10 bg-black/20 text-xs uppercase tracking-[0.2em] text-white/35">
                  <tr>
                    <th className="px-5 py-4">Company</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Market</th>
                    <th className="px-5 py-4">AI Type</th>
                    <th className="px-5 py-4">Risk</th>
                    <th className="px-5 py-4">Rating</th>
                    <th className="px-5 py-4">Package</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4 text-right">Open</th>
                  </tr>
                </thead>

                <tbody>
                  {audits.map((audit) => (
                    <tr
                      key={audit.id}
                      className="border-b border-white/10 transition hover:bg-white/[0.04]"
                    >
                      <td className="px-5 py-5">
                        <p className="font-semibold text-white">
                          {audit.company_name || "Unnamed company"}
                        </p>
                        <p className="mt-1 text-xs text-white/40">
                          {audit.ai_product_name || "No product name"}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-white/80">
                          {audit.contact_name || "No contact"}
                        </p>
                        <p className="mt-1 text-xs text-white/40">
                          {audit.email || "No email"}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-white/65">
                        {audit.primary_market || "Not set"}
                      </td>

                      <td className="px-5 py-5 text-white/65">
                        {audit.ai_system_type || "Not set"}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getRiskBadge(
                            audit.risk_level
                          )}`}
                        >
                          {audit.risk_level || "Unclassified"}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <p className="font-medium text-white/80">
                          {audit.rating || "Not rated"}
                        </p>
                        <p className="mt-1 text-xs text-white/40">
                          Score: {audit.score ?? "—"} / 90
                        </p>
                      </td>

                      <td className="px-5 py-5 text-white/65">
                        {getPackageRecommendation(audit)}
                      </td>

                      <td className="px-5 py-5 text-white/50">
                        {formatDate(audit.created_at)}
                      </td>

                      <td className="px-5 py-5 text-right">
                        <Link
                          href={`/admin/ai-audits/${audit.id}`}
                          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white/75 transition hover:bg-white/[0.1]"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  tone,
}: {
  title: string;
  value: number;
  icon: any;
  tone: "amber" | "red" | "cyan" | "emerald";
}) {
  const toneClass = {
    amber: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    red: "border-red-300/20 bg-red-300/10 text-red-100",
    cyan: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
    emerald: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  }[tone];

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur">
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${toneClass}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-white/45">{title}</p>
    </div>
  );
}