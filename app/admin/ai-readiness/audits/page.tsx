import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { aiAuditSections } from "@/lib/aiAuditQuestions";
import { updateAIReadinessAudit } from "./actions";

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

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatAnswer(answer: string | string[] | undefined) {
  if (!answer) return "Not answered";
  if (Array.isArray(answer)) {
    return answer.length > 0 ? answer.join(", ") : "Not answered";
  }
  return answer.trim().length > 0 ? answer : "Not answered";
}

function getRiskClass(riskLevel: string | null) {
  if (riskLevel === "High") {
    return "border-red-400/30 bg-red-400/10 text-red-200";
  }

  if (riskLevel === "Medium") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-100";
  }

  return "border-green-400/30 bg-green-400/10 text-green-200";
}

export default async function AIReadinessAuditsAdminPage() {
  const { data, error } = await supabase
    .from("ai_readiness_audits")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("AI audits fetch error:", error);
    throw new Error("Unable to fetch AI readiness audits");
  }

  const audits = (data || []) as AIReadinessAudit[];

  return (
    <main className="min-h-screen bg-[#05070d] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Sitora Admin
            </p>

            <h1 className="mt-3 text-4xl font-semibold">
              AI Audit Questionnaires
            </h1>

            <p className="mt-3 max-w-2xl text-white/65">
              Review full AI readiness questionnaire submissions, risk levels,
              answers, status and internal notes.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/admin/ai-readiness"
                className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Short enquiries
              </Link>

              <Link
                href="/ai-readiness/audit"
                className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-5 py-2 text-sm font-semibold text-[#f3d77b] transition hover:bg-[#d4af37]/20"
              >
                Open audit form
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
            <p className="text-sm text-white/60">Total audits</p>
            <p className="text-3xl font-semibold text-[#f3d77b]">
              {audits.length}
            </p>
          </div>
        </div>

        {audits.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
            <h2 className="text-2xl font-semibold">No audit submissions yet</h2>
            <p className="mt-3 text-white/65">
              Completed AI readiness questionnaires will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {audits.map((audit) => (
              <article
                key={audit.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl"
              >
                <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 lg:flex-row">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold">
                        {audit.business_name}
                      </h2>
<div className="mt-4">
  <Link
    href={`/admin/ai-readiness/audits/${audit.id}/report`}
    className="inline-flex rounded-full bg-[#d4af37] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#f0cf65]"
  >
    Generate readiness report
  </Link>
</div>
                      <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-xs font-semibold text-[#f3d77b]">
                        {audit.status || "Submitted"}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getRiskClass(
                          audit.risk_level
                        )}`}
                      >
                        {audit.risk_level || "Low"} Risk
                      </span>
                    </div>

                    <p className="mt-2 text-white/65">
                      {audit.industry || "Industry not provided"} • Submitted{" "}
                      {formatDate(audit.created_at)}
                    </p>
                  </div>

                  <div className="text-sm text-white/70 lg:text-right">
                    <p>
                      <strong className="text-white">Contact:</strong>{" "}
                      {audit.contact_name}
                    </p>
                    <p>
                      <strong className="text-white">Email:</strong>{" "}
                      <a
                        href={`mailto:${audit.email}`}
                        className="text-[#f3d77b] hover:underline"
                      >
                        {audit.email}
                      </a>
                    </p>

                    {audit.website && (
                      <p>
                        <strong className="text-white">Website:</strong>{" "}
                        <a
                          href={audit.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#f3d77b] hover:underline"
                        >
                          {audit.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {aiAuditSections.map((section) => (
                    <details
                      key={section.title}
                      className="rounded-2xl border border-white/10 bg-black/25 p-5"
                    >
                      <summary className="cursor-pointer text-lg font-semibold text-[#f3d77b]">
                        {section.title}
                      </summary>

                      <div className="mt-5 space-y-4">
                        {section.questions.map((question) => (
                          <div
                            key={question.id}
                            className="rounded-xl border border-white/10 bg-[#05070d] p-4"
                          >
                            <p className="text-sm font-semibold text-white">
                              {question.question}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white/70">
                              {formatAnswer(audit.answers?.[question.id])}
                            </p>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>

                <form
                  action={updateAIReadinessAudit}
                  className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-black/25 p-5 lg:grid-cols-[220px_1fr_auto]"
                >
                  <input type="hidden" name="id" value={audit.id} />

                  <div>
                    <label className="mb-2 block text-sm text-white/60">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={audit.status || "Submitted"}
                      className="w-full rounded-xl border border-white/10 bg-[#05070d] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
                    >
                      <option>Submitted</option>
                      <option>Under Review</option>
                      <option>Report Drafting</option>
                      <option>Report Sent</option>
                      <option>Governance Pack Offered</option>
                      <option>Converted</option>
                      <option>Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/60">
                      Internal notes
                    </label>
                    <textarea
                      name="notes"
                      defaultValue={audit.notes || ""}
                      rows={3}
                      placeholder="Add notes, risk comments, report actions, pricing, follow-up date..."
                      className="w-full rounded-xl border border-white/10 bg-[#05070d] px-4 py-3 text-white outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#d4af37] px-6 py-3 font-semibold text-black transition hover:bg-[#f0cf65] lg:w-auto"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}