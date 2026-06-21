import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
  generateAIReadinessFindings,
  getRecommendedDocuments,
  formatAnswer,
} from "@/lib/aiReadinessReport";
import { aiAuditSections } from "@/lib/aiAuditQuestions";

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
    dateStyle: "long",
    timeStyle: "short",
  });
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

function getFindingClass(level: string) {
  if (level === "High") return "border-red-400/20 bg-red-400/10";
  if (level === "Medium") return "border-yellow-400/20 bg-yellow-400/10";
  return "border-green-400/20 bg-green-400/10";
}

export default async function AIReadinessAuditReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("ai_readiness_audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    throw new Error("Unable to fetch audit report");
  }

  const audit = data as AIReadinessAudit;
  const findings = generateAIReadinessFindings(audit.answers || {});
  const recommendedDocuments = getRecommendedDocuments(findings);

  const highFindings = findings.filter((finding) => finding.level === "High");
  const mediumFindings = findings.filter((finding) => finding.level === "Medium");
  const lowFindings = findings.filter((finding) => finding.level === "Low");

  return (
    <main className="min-h-screen bg-[#05070d] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 print:hidden lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/ai-readiness/audits"
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to audits
            </Link>

            <button
              onClick={undefined}
              className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-5 py-2 text-sm font-semibold text-[#f3d77b]"
            >
              Use browser print to save as PDF
            </button>
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl print:border-none print:bg-white print:text-black">
          <div className="border-b border-white/10 pb-8 print:border-gray-200">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Sitora AI Readiness Report
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              AI Readiness & Governance Report
            </h1>

            <p className="mt-4 max-w-3xl text-white/70 print:text-gray-700">
              Prepared for {audit.business_name}. This report summarises the
              AI readiness position based on the questionnaire answers provided.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 print:border-gray-200 print:bg-gray-50">
                <p className="text-xs text-white/50 print:text-gray-500">
                  Business
                </p>
                <p className="mt-1 font-semibold">{audit.business_name}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 print:border-gray-200 print:bg-gray-50">
                <p className="text-xs text-white/50 print:text-gray-500">
                  Contact
                </p>
                <p className="mt-1 font-semibold">{audit.contact_name}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 print:border-gray-200 print:bg-gray-50">
                <p className="text-xs text-white/50 print:text-gray-500">
                  Industry
                </p>
                <p className="mt-1 font-semibold">
                  {audit.industry || "Not provided"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-4 print:border-gray-200 print:bg-gray-50">
                <p className="text-xs text-white/50 print:text-gray-500">
                  Submitted
                </p>
                <p className="mt-1 font-semibold">
                  {formatDate(audit.created_at)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${getRiskClass(
                  audit.risk_level
                )}`}
              >
                Overall Risk: {audit.risk_level || "Low"}
              </span>

              <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-white/70 print:border-gray-200 print:bg-gray-50 print:text-gray-700">
                {highFindings.length} high findings
              </span>

              <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-white/70 print:border-gray-200 print:bg-gray-50 print:text-gray-700">
                {mediumFindings.length} medium findings
              </span>

              <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-white/70 print:border-gray-200 print:bg-gray-50 print:text-gray-700">
                {lowFindings.length} low findings
              </span>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">1. Executive Summary</h2>
            <p className="mt-4 leading-8 text-white/70 print:text-gray-700">
              Based on the questionnaire answers provided, Sitora has identified
              the following AI readiness position. The purpose of this report is
              to highlight practical gaps around AI usage, data handling,
              disclosures, governance documents, supplier checks, human
              oversight and internal processes.
            </p>

            <p className="mt-4 leading-8 text-white/70 print:text-gray-700">
              This report is designed to support practical AI readiness and
              governance preparation. Sitora is not a law firm and does not
              provide legal advice. Where legal advice is required, the business
              should consult a qualified legal professional.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">2. Key Findings</h2>

            <div className="mt-6 space-y-5">
              {findings.map((finding) => (
                <div
                  key={finding.title}
                  className={`rounded-2xl border p-5 ${getFindingClass(
                    finding.level
                  )} print:border-gray-200 print:bg-gray-50`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{finding.title}</h3>
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold print:border-gray-200 print:bg-white">
                      {finding.level}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-white/75 print:text-gray-700">
                    {finding.explanation}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-white/75 print:text-gray-700">
                    <strong>Recommendation:</strong> {finding.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">
              3. Recommended Governance Documents
            </h2>

            <p className="mt-4 leading-8 text-white/70 print:text-gray-700">
              Based on the questionnaire answers and identified findings, the
              following documents or controls may be useful for the business.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {recommendedDocuments.map((document) => (
                <div
                  key={document}
                  className="rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-white/75 print:border-gray-200 print:bg-gray-50 print:text-gray-700"
                >
                  {document}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">4. 30-Day Action Plan</h2>

            <div className="mt-6 grid gap-4 lg:grid-cols-4">
              {[
                {
                  week: "Week 1",
                  title: "Map AI use",
                  text: "Identify all AI tools, users, purposes, data inputs and supplier platforms.",
                },
                {
                  week: "Week 2",
                  title: "Control data risks",
                  text: "Set clear rules for personal, sensitive and confidential data entered into AI tools.",
                },
                {
                  week: "Week 3",
                  title: "Add disclosures",
                  text: "Update chatbot wording, website disclaimers and privacy policy AI wording where required.",
                },
                {
                  week: "Week 4",
                  title: "Build governance",
                  text: "Create AI policies, tool register, risk register, oversight process and staff guidance.",
                },
              ].map((item) => (
                <div
                  key={item.week}
                  className="rounded-2xl border border-white/10 bg-black/25 p-5 print:border-gray-200 print:bg-gray-50"
                >
                  <p className="text-sm font-semibold text-[#d4af37]">
                    {item.week}
                  </p>
                  <h3 className="mt-2 font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70 print:text-gray-700">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">5. Sitora Recommendation</h2>

            <p className="mt-4 leading-8 text-white/70 print:text-gray-700">
              Based on the findings identified in this assessment, Sitora
              recommends preparing a practical AI Governance Pack. This should
              include an AI usage policy, staff AI policy, AI tool register, AI
              risk register, AI supplier checklist, data handling guidance,
              human oversight process and relevant customer-facing disclosures.
            </p>

            <p className="mt-4 leading-8 text-white/70 print:text-gray-700">
              Where the business uses AI in higher-risk areas such as
              healthcare, recruitment, finance, eligibility, employee monitoring,
              children or vulnerable users, a deeper governance review may be
              appropriate.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">
              6. Questionnaire Answer Summary
            </h2>

            <div className="mt-6 space-y-5">
              {aiAuditSections.map((section) => (
                <details
                  key={section.title}
                  className="rounded-2xl border border-white/10 bg-black/25 p-5 print:border-gray-200 print:bg-gray-50"
                >
                  <summary className="cursor-pointer text-lg font-semibold text-[#f3d77b] print:text-black">
                    {section.title}
                  </summary>

                  <div className="mt-5 space-y-4">
                    {section.questions.map((question) => (
                      <div
                        key={question.id}
                        className="rounded-xl border border-white/10 bg-[#05070d] p-4 print:border-gray-200 print:bg-white"
                      >
                        <p className="text-sm font-semibold text-white print:text-black">
                          {question.question}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/70 print:text-gray-700">
                          {formatAnswer(audit.answers?.[question.id])}
                        </p>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/10 p-6 print:border-gray-200 print:bg-gray-50">
            <h2 className="text-xl font-semibold">Important Disclaimer</h2>
            <p className="mt-3 text-sm leading-7 text-white/75 print:text-gray-700">
              Sitora is not a law firm and does not provide legal advice. Our AI
              readiness and governance support is designed to help businesses
              identify practical AI use, organise internal processes, improve
              transparency, prepare documentation and understand potential areas
              of exposure. Where legal advice is required, businesses should
              consult a qualified legal professional.
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}