import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Review & Corrections | Sitora Research",
  description: "How Sitora handles external review, factual corrections, source challenges and version updates across published research.",
  alternates: { canonical: "/research/review-and-corrections" },
  robots: { index: true, follow: true },
};

export default function ResearchCorrectionsPage() {
  return (
    <main className="min-h-screen bg-[#06110f] text-white">
      <div className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
        <Link href="/research" className="text-sm font-medium text-[#7acdc3]">← Sitora Research</Link>
        <div className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-[#d6b878]">Review & corrections</div>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Research should be challengeable, correctable and transparent about what changed.</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/55 md:text-lg">Sitora welcomes source-based corrections and external review. The objective is to improve the accuracy and usefulness of published work rather than defend every sentence after publication.</p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {[
            ["Challenge a claim", "Identify the exact claim, missing context, stronger source or factual error you believe should be reviewed."],
            ["Show the evidence", "Where possible, provide the source, relevant section and the correction you believe the evidence supports."],
            ["Review the issue", "We compare the challenge with the cited material and distinguish factual correction from reasonable differences of interpretation."],
            ["Correct transparently", "Material errors are corrected, and significant revisions should be reflected in a date, version note or correction statement."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/50">{body}</p>
            </article>
          ))}
        </div>

        <section className="mt-14 rounded-3xl border border-[#2aa89a]/20 bg-[#2aa89a]/[0.055] p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Send a review or correction</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/50">Please identify the paper, the exact claim and the source supporting your correction. Specific evidence-based feedback is the most useful.</p>
          <a href="mailto:hello@sitora.co.uk?subject=Sitora Research Review or Correction" className="mt-5 inline-flex rounded-xl bg-[#2aa89a] px-4 py-2.5 text-sm font-semibold text-[#04110f]">Send feedback</a>
        </section>
      </div>
    </main>
  );
}
