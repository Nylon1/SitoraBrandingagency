import Link from "next/link";

export const metadata = {
  title: "AI as the NHS Front Door | Sitora NHS AI Trust Report",
  description:
    "Sitora policy report on NHS AI triage, patient safety, independent audit, clinical accountability and public trust.",
};

export default function NhsAiTrustReportPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.22),transparent_35%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-200">
              Sitora Policy Report • Open Expert Review
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              AI as the NHS Front Door
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              A Sitora report on safety, accountability and public trust in AI
              triage across NHS primary care.
            </p>

            <p className="mt-6 max-w-3xl text-slate-400">
              AI can help the NHS improve access and reduce pressure. But if AI
              becomes the first point of contact for patients, it must be
              independently audited, clinically accountable, transparent and
              supported by clear human escalation routes.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/downloads/sitora_nhs_ai_trust_report.pdf"
                className="rounded-xl bg-teal-400 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-teal-300"
              >
                Download Full Report
              </a>

              <a
                href="/downloads/sitora_nhs_ai_policy_brief.pdf"
                className="rounded-xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
              >
                Download Policy Brief
              </a>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Published by Sitora. Open for expert comment.
            </p>
          </div>
        </div>
      </section>

      {/* Core message */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">The issue</h2>
            <p className="mt-4 text-slate-400">
              The NHS is moving towards AI-supported triage through digital
              channels including the NHS App. This could help patients reach the
              right service faster, but it also introduces new clinical,
              ethical and accountability risks.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">The risk</h2>
            <p className="mt-4 text-slate-400">
              If AI incorrectly directs a patient away from urgent care, GP
              review or emergency treatment, the consequences could be serious.
              Public trust depends on clear safeguards before national scale.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">Sitora’s position</h2>
            <p className="mt-4 text-slate-400">
              Sitora supports responsible AI adoption in healthcare. Our call is
              not to stop innovation, but to ensure AI triage is safe,
              explainable, accountable and trusted by patients.
            </p>
          </div>
        </div>
      </section>

      {/* NHS AI Trust Test */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
              Sitora Framework
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              The NHS AI Trust Test
            </h2>
            <p className="mt-4 text-slate-400">
              Sitora recommends a mandatory trust framework before AI triage is
              scaled nationally.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Clinical safety validation",
                text: "AI triage tools should be validated against real-world clinical scenarios, urgent symptoms, complex cases and high-risk presentations.",
              },
              {
                title: "Independent AI audit",
                text: "The NHS should not rely only on supplier self-certification. AI systems should be independently audited for safety, bias and accuracy.",
              },
              {
                title: "Human escalation",
                text: "Patients must have a clear route to human review, especially when symptoms are serious, unclear, worsening or disputed.",
              },
              {
                title: "Clear accountability",
                text: "Responsibility must be defined before rollout, including supplier, NHS, commissioner and clinical accountability.",
              },
              {
                title: "Patient transparency",
                text: "Patients should be told when AI is being used, what role it plays and how they can challenge or escalate a recommendation.",
              },
              {
                title: "Ongoing monitoring",
                text: "AI safety should not be approved once and forgotten. Systems must be monitored for harm, bias, complaints and model drift.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-slate-950 p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal-400/10 text-sm font-bold text-teal-300">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy asks */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
              Policy Recommendations
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              What Sitora is asking for
            </h2>
            <p className="mt-4 text-slate-400">
              The report sets out practical safeguards for Government, NHS
              England, regulators and suppliers.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Mandatory AI impact assessments before NHS deployment.",
              "Independent pre-deployment audits for AI triage systems.",
              "Published plain-English safety cases for public trust.",
              "A guaranteed route to human review for patients.",
              "National reporting for AI-related patient safety incidents.",
              "Clear supplier accountability in NHS procurement contracts.",
              "Bias, equality and accessibility testing before rollout.",
              "Clear patient notification when AI influences care routing.",
            ].map((ask) => (
              <div
                key={ask}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-slate-300"
              >
                {ask}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open review */}
      <section className="border-y border-white/10 bg-teal-400 text-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Open for expert review</h2>
              <p className="mt-4 max-w-3xl text-slate-900">
                Sitora welcomes comments from clinicians, NHS staff, AI
                researchers, patient-safety specialists, data protection
                professionals, legal experts, policymakers and patient groups.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <h3 className="font-semibold">Review areas</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• Clinical safety and triage risk</li>
                <li>• AI audit and assurance</li>
                <li>• Data protection and transparency</li>
                <li>• Equality, bias and digital exclusion</li>
                <li>• Legal and clinical accountability</li>
              </ul>

              <a
                href="mailto:policy@sitora.ai?subject=Expert%20review%20comments%20on%20Sitora%20NHS%20AI%20Trust%20Report"
                className="mt-6 block rounded-xl bg-white px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Submit Review Comments
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
            Evidence Base
          </p>
          <h2 className="mt-3 text-3xl font-bold">References and sources</h2>
          <p className="mt-4 text-slate-400">
            The full report draws on existing policy, regulatory and health AI
            guidance, including NHS England digital transformation material,
            MHRA guidance on software and AI as a medical device, NICE digital
            health evidence standards, ICO AI and data protection guidance, and
            WHO guidance on ethics and governance of AI for health.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold">Key reference areas</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
              <li>
                NHS England — digital transformation, NHS App strategy and
                digital clinical safety assurance.
              </li>
              <li>
                MHRA — software and artificial intelligence as a medical device.
              </li>
              <li>
                NICE — evidence standards framework for digital health
                technologies.
              </li>
              <li>
                ICO — AI and data protection guidance.
              </li>
              <li>
                WHO — ethics and governance of artificial intelligence for
                health.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">
                AI adoption is moving fast. Governance has to move faster.
              </h2>
              <p className="mt-4 text-slate-400">
                Download the report, share the policy brief, or contact Sitora
                to discuss AI governance, assurance and trust frameworks.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="/downloads/sitora_nhs_ai_trust_report.pdf"
                className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Download Report
              </a>

              <a
                href="mailto:policy@sitora.ai"
                className="rounded-xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
              >
                Contact Sitora
              </a>

              <Link
                href="/"
                className="rounded-xl border border-white/10 px-6 py-3 text-center font-semibold text-slate-300 transition hover:bg-white/10"
              >
                Back to Sitora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}