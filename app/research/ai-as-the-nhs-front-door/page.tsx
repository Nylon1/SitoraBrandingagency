import type { Metadata } from "next";
import Link from "next/link";

const title = "AI as the NHS Front Door";
const description =
  "A Sitora policy report examining safety, accountability and public trust when AI is used in NHS patient triage and access pathways.";
const url = "https://sitora.co.uk/research/ai-as-the-nhs-front-door";

export const metadata: Metadata = {
  title: `${title} | Sitora Research`,
  description,
  alternates: { canonical: "/research/ai-as-the-nhs-front-door" },
  openGraph: {
    title,
    description,
    url,
    siteName: "Sitora",
    type: "article",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-07-01",
  dateModified: "2026-08-14",
  author: { "@type": "Organization", name: "Sitora" },
  publisher: { "@type": "Organization", name: "Sitora" },
  mainEntityOfPage: url,
  url,
  about: [
    "Artificial intelligence in healthcare",
    "NHS patient access",
    "Clinical safety",
    "AI governance",
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07100f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
          <Link href="/research" className="text-sm font-medium text-[#7acdc3]">
            ← Sitora Research
          </Link>

          <div className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-[#7acdc3]">
            AI, Safety & Governance · July 2026
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            AI as the NHS Front Door
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/55 md:text-xl">
            Safety, accountability and public trust in AI triage.
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/50">
            This Sitora policy report examines the safeguards needed when AI
            influences how patients are directed through NHS services,
            including clinical safety, independent audit, human escalation,
            transparency, accessibility and ongoing monitoring.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/downloads/sitora_nhs_ai_policy_brief.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#2aa89a] px-5 py-3 text-sm font-semibold text-[#04110f] transition hover:bg-[#41b9ab]"
            >
              Download full PDF
            </a>

            <Link
              href="/research/methodology"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08] hover:text-white"
            >
              Research methodology
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <div className="rounded-3xl border border-[#2aa89a]/20 bg-[#2aa89a]/[0.055] p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#80d0c5]">
            Sitora position
          </div>

          <p className="mt-4 text-2xl font-semibold leading-9 tracking-[-0.025em]">
            AI can help the NHS, but AI triage should be clinically safe,
            independently audited, transparent, accessible and accountable
            before it becomes a major front door to public healthcare.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            [
              "Clinical safety",
              "AI triage should be assessed against urgent, ambiguous, complex and routine scenarios, with documented hazards and controls.",
            ],
            [
              "Independent assurance",
              "Large-scale deployment should not depend solely on supplier assurances. Independent review should test safety, bias, accessibility and failure modes.",
            ],
            [
              "Human escalation",
              "Patients should have a clear route to human review where symptoms are serious, worsening, complex, uncertain or disputed.",
            ],
            [
              "Defined accountability",
              "Responsibility between NHS organisations, clinical safety owners, commissioners and technology suppliers should be clear before deployment.",
            ],
            [
              "Patient transparency",
              "Patients should know when AI is being used, what role it plays, what it cannot do and how to challenge or escalate an outcome.",
            ],
            [
              "Ongoing monitoring",
              "Deployment should include monitoring for incidents, near misses, complaints, demographic disparities, model changes and performance drift.",
            ],
          ].map(([itemTitle, text]) => (
            <article
              key={itemTitle}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6"
            >
              <h2 className="text-lg font-semibold text-white/90">{itemTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
            </article>
          ))}
        </div>

        <section className="mt-14 border-t border-white/[0.07] pt-12">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            The Sitora NHS AI Trust Test
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/52">
            The report proposes six public-facing assurance questions: clinical
            safety validation, independent AI audit, human escalation, defined
            accountability, patient transparency and continuous post-deployment
            monitoring.
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/52">
            The Trust Test is not intended to replace NHS clinical safety
            standards, NICE evidence frameworks, MHRA regulation, ICO
            requirements or CQC oversight. It is intended to translate those
            responsibilities into a clearer assurance model for NHS boards,
            policymakers and patients.
          </p>
        </section>

        <section className="mt-14 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
          <h2 className="text-xl font-semibold">Read the complete report</h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/50">
            The PDF includes the evidence base, regulatory landscape, risk
            analysis, policy recommendations, implementation roadmap, risk
            register and assurance checklist.
          </p>

          <a
            href="/downloads/sitora_nhs_ai_policy_brief.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-xl bg-[#2aa89a] px-5 py-3 text-sm font-semibold text-[#04110f]"
          >
            Download full PDF
          </a>
        </section>
      </section>
    </main>
  );
}
