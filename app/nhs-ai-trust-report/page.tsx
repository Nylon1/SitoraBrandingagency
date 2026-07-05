import Link from "next/link";

export const metadata = {
  title: "AI as the NHS Front Door | Sitora NHS AI Trust Report",
  description:
    "Sitora policy report on NHS AI triage, patient safety, independent audit, clinical accountability and public trust.",
};

const trustTest = [
  {
    title: "Clinical safety validation",
    text: "AI triage tools should be tested against real-world clinical scenarios, urgent symptoms, complex patients and high-risk presentations.",
  },
  {
    title: "Independent AI audit",
    text: "The NHS should not rely only on supplier self-certification. AI systems should be independently audited for safety, bias, accuracy and risk.",
  },
  {
    title: "Human escalation",
    text: "Patients must have a clear route to human review where symptoms are serious, unclear, worsening, disputed or potentially urgent.",
  },
  {
    title: "Clear accountability",
    text: "Responsibility must be defined before rollout, including supplier, NHS, commissioner, clinical and procurement accountability.",
  },
  {
    title: "Patient transparency",
    text: "Patients should be told when AI is being used, what role it plays, what it cannot do, and how they can challenge or escalate a recommendation.",
  },
  {
    title: "Ongoing monitoring",
    text: "AI safety cannot be approved once and forgotten. Systems must be monitored for harm, bias, complaints, incidents and model drift.",
  },
];

const policyAsks = [
  "Mandatory AI impact assessments before NHS deployment.",
  "Independent pre-deployment audits for AI triage systems.",
  "Published plain-English safety cases for public trust.",
  "A guaranteed route to human review for patients.",
  "National reporting for AI-related patient safety incidents.",
  "Clear supplier accountability in NHS procurement contracts.",
  "Bias, equality and accessibility testing before rollout.",
  "Clear patient notification when AI influences care routing.",
];

const reviewAreas = [
  "Clinical safety and triage risk",
  "AI audit and assurance",
  "Data protection and transparency",
  "Equality, bias and digital exclusion",
  "Legal and clinical accountability",
];

export default function NhsAiTrustReportPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.22),transparent_28%),radial-gradient(circle_at_80%_5%,rgba(124,58,237,0.22),transparent_30%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.16),transparent_34%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(5,8,22,0.35),#050816_92%)]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#28D6C2]/30 bg-[#28D6C2]/10 px-4 py-2 text-sm font-medium text-[#8EF4E8] shadow-[0_0_30px_rgba(40,214,194,0.14)]">
              <span className="h-2 w-2 rounded-full bg-[#28D6C2]" />
              Sitora Policy Report • Open Expert Review
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
              AI as the{" "}
              <span className="bg-gradient-to-r from-[#28D6C2] via-[#7AE7FF] to-[#A78BFA] bg-clip-text text-transparent">
                NHS Front Door
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              A Sitora report on safety, accountability and public trust in AI
              triage across NHS primary care.
            </p>

            <p className="mt-5 max-w-3xl text-slate-400">
              AI can help the NHS improve access and reduce pressure. But if AI
              becomes the first point of contact for patients, it must be
              independently audited, clinically accountable, transparent and
              supported by clear human escalation routes.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/downloads/sitora_nhs_ai_trust_report.pdf"
                className="rounded-2xl bg-gradient-to-r from-[#28D6C2] to-[#7AE7FF] px-7 py-4 text-center font-semibold text-[#050816] shadow-[0_20px_60px_rgba(40,214,194,0.22)] transition hover:scale-[1.01]"
              >
                Download Full Report
              </a>

              <a
                href="/downloads/sitora_nhs_ai_policy_brief.pdf"
                className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-center font-semibold text-white backdrop-blur transition hover:border-[#28D6C2]/40 hover:bg-white/10"
              >
                Download Policy Brief
              </a>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Published by Sitora. Open for expert comment.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#28D6C2]/20 via-[#7C3AED]/15 to-[#0EA5E9]/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl border border-white/10 bg-[#050816]/70 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#28D6C2]">
                  Core recommendation
                </p>

                <h2 className="mt-4 text-2xl font-semibold leading-snug">
                  The NHS should adopt a mandatory AI Trust Test before AI
                  triage becomes a national front door to care.
                </h2>

                <div className="mt-8 grid gap-4">
                  {[
                    "Independent audit",
                    "Clinical accountability",
                    "Human escalation",
                    "Bias and accessibility testing",
                    "Transparent patient communication",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#28D6C2]/15 text-xs font-bold text-[#8EF4E8]">
                        ✓
                      </span>
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-semibold text-[#8EF4E8]">6</p>
                  <p className="mt-1 text-xs text-slate-400">Trust tests</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-semibold text-[#7AE7FF]">8</p>
                  <p className="mt-1 text-xs text-slate-400">Policy asks</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-semibold text-[#A78BFA]">30d</p>
                  <p className="mt-1 text-xs text-slate-400">Open review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro cards */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              label: "01",
              title: "The issue",
              text: "The NHS is moving towards AI-supported triage through digital channels including the NHS App. This could help patients reach the right service faster, but it also introduces new clinical and accountability risks.",
            },
            {
              label: "02",
              title: "The risk",
              text: "If AI incorrectly directs a patient away from urgent care, GP review or emergency treatment, the consequences could be serious. Public trust depends on safeguards before national scale.",
            },
            {
              label: "03",
              title: "Sitora’s position",
              text: "Sitora supports responsible AI adoption in healthcare. Our call is not to stop innovation, but to ensure AI triage is safe, explainable, accountable and trusted by patients.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition hover:-translate-y-1 hover:border-[#28D6C2]/35 hover:bg-white/[0.06]"
            >
              <p className="text-sm font-semibold text-[#28D6C2]">
                {card.label}
              </p>
              <h2 className="mt-5 text-2xl font-semibold">{card.title}</h2>
              <p className="mt-4 leading-7 text-slate-400">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote band */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#28D6C2]/20 bg-gradient-to-br from-[#0B1227] via-[#07152A] to-[#101033] p-8 md:p-12">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#28D6C2]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#7C3AED]/20 blur-3xl" />

          <div className="relative max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8EF4E8]">
              Sitora position
            </p>
            <blockquote className="mt-5 text-2xl font-semibold leading-snug md:text-4xl">
              “The NHS does not just need AI that works. It needs AI patients
              can trust.”
            </blockquote>
            <p className="mt-5 text-slate-400">
              The report proposes a practical trust framework for AI triage:
              clinical safety, independent assurance, transparency, human
              escalation and accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Test */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-18">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#28D6C2]">
              Sitora Framework
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              The NHS AI Trust Test
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Sitora recommends a mandatory trust framework before AI triage is
              scaled nationally.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trustTest.map((item, index) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050816] p-7 transition hover:border-[#28D6C2]/35"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#28D6C2]/10 blur-2xl" />

                <div className="relative">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#28D6C2] to-[#7AE7FF] text-sm font-bold text-[#050816]">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy asks */}
      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#28D6C2]">
              Policy recommendations
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              What Sitora is asking for
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              The report sets out practical safeguards for Government, NHS
              England, regulators and suppliers.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-medium text-slate-300">
                These recommendations are designed to support responsible AI
                adoption — not delay useful innovation.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {policyAsks.map((ask, index) => (
              <div
                key={ask}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#28D6C2]/30 hover:bg-white/[0.06]"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#28D6C2]/15 text-sm font-bold text-[#8EF4E8]">
                  {index + 1}
                </span>
                <p className="text-slate-300">{ask}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Review */}
      <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#28D6C2] via-[#7AE7FF] to-[#A78BFA] text-[#050816]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.45),transparent_28%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em]">
              Open expert review
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Help strengthen the report before wider submission
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#07152A]/80">
              Sitora welcomes comments from clinicians, NHS staff, AI
              researchers, patient-safety specialists, data protection
              professionals, legal experts, policymakers and patient groups.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-[#050816] p-7 text-white shadow-2xl">
            <h3 className="text-xl font-semibold">Review areas</h3>

            <div className="mt-5 space-y-3">
              {reviewAreas.map((area) => (
                <div
                  key={area}
                  className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-300"
                >
                  {area}
                </div>
              ))}
            </div>

            <a
              href="mailto:policy@sitora.ai?subject=Expert%20review%20comments%20on%20Sitora%20NHS%20AI%20Trust%20Report"
              className="mt-6 block rounded-2xl bg-white px-5 py-4 text-center font-semibold text-[#050816] transition hover:bg-slate-200"
            >
              Submit Review Comments
            </a>
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#28D6C2]">
              Evidence base
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              References and sources
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              The full report draws on existing policy, regulatory and health AI
              guidance, including NHS England digital transformation material,
              MHRA guidance, NICE evidence standards, ICO AI guidance and WHO
              ethics guidance.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7">
            <h3 className="text-xl font-semibold">Key reference areas</h3>

            <div className="mt-6 space-y-4">
              {[
                "NHS England — digital transformation, NHS App strategy and digital clinical safety assurance.",
                "MHRA — software and artificial intelligence as a medical device.",
                "NICE — evidence standards framework for digital health technologies.",
                "ICO — AI and data protection guidance.",
                "WHO — ethics and governance of artificial intelligence for health.",
              ].map((source) => (
                <div key={source} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#28D6C2]" />
                  <p className="text-sm leading-7 text-slate-400">{source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0B1227] via-[#07152A] to-[#050816] p-8 md:p-12">
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-[#28D6C2]/15 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-[#7C3AED]/15 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#28D6C2]">
                Sitora
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                AI adoption is moving fast. Governance has to move faster.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
                Download the report, share the policy brief, or contact Sitora
                to discuss AI governance, assurance and trust frameworks.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="/downloads/sitora_nhs_ai_trust_report.pdf"
                className="rounded-2xl bg-gradient-to-r from-[#28D6C2] to-[#7AE7FF] px-6 py-4 text-center font-semibold text-[#050816] transition hover:scale-[1.01]"
              >
                Download Report
              </a>

              <a
                href="mailto:policy@sitora.ai"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center font-semibold text-white transition hover:bg-white/10"
              >
                Contact Sitora
              </a>

              <Link
                href="/"
                className="rounded-2xl border border-white/10 px-6 py-4 text-center font-semibold text-slate-300 transition hover:bg-white/10"
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