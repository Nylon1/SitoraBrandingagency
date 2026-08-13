import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitora Research Methodology | Evidence, Sources & Limitations",
  description:
    "How Sitora approaches desk research, evidence grading, source selection, market analysis, limitations and publication transparency.",
  alternates: { canonical: "/research/methodology" },
  robots: { index: true, follow: true },
};

const principles = [
  ["Primary sources first", "Official guidance, regulator material, standards, public datasets and original research are prioritised wherever available."],
  ["Claims matched to evidence", "A source is used only for the proposition it actually supports. Context, date and scope matter."],
  ["Vendor claims labelled", "Product capabilities described by suppliers are treated as public vendor claims unless independently verified."],
  ["Hypotheses separated", "New operating models, product concepts and future opportunities are labelled as proposals to test, not established outcomes."],
  ["Limitations visible", "Known gaps, uncertain figures, old benchmarks and areas requiring field validation are stated rather than hidden."],
  ["Human accountability", "AI may support research synthesis, structure and analysis, but publication decisions and final claims remain subject to human review."],
];

export default function ResearchMethodologyPage() {
  return (
    <main className="min-h-screen bg-[#06110f] text-white">
      <header className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
          <Link href="/research" className="text-sm font-medium text-[#7acdc3]">← Sitora Research</Link>
          <div className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-[#d6b878]">Research methodology</div>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            Evidence first. Clear boundaries. Visible limitations.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/55 md:text-lg">
            Sitora publishes practical research intended to support discussion, policy development, product discovery and stakeholder validation. Our methodology is designed to make it clear what is established, what is reported by a third party, and what remains a hypothesis.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map(([title, body]) => (
            <article key={title} className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
              <h2 className="text-lg font-semibold text-white/90">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/50">{body}</p>
            </article>
          ))}
        </div>

        <section className="mt-14 border-t border-white/[0.07] pt-12">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Publication standard</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-white/52">
            <p>Each public paper should identify its purpose, publication date, evidence basis and material limitations. Where figures are historic, estimated or drawn from a limited population, that context should travel with the figure.</p>
            <p>Desk research cannot show how a workflow performs inside every organisation. Where the decisive evidence requires interviews, pilots, operational data or independent technical review, the paper should say so explicitly.</p>
            <p>Research pages may be revised when stronger evidence becomes available. Significant updates should be reflected in the page date or version note.</p>
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-[#2aa89a]/20 bg-[#2aa89a]/[0.055] p-6 md:p-8">
            <h2 className="text-xl font-semibold">Read the research</h2>
            <p className="mt-3 text-sm leading-7 text-white/50">Explore the current Sitora research collection across systems, policy, operations and Saudi/Gulf innovation.</p>
            <Link href="/research" className="mt-5 inline-flex rounded-xl bg-[#2aa89a] px-4 py-2.5 text-sm font-semibold text-[#04110f]">Open Sitora Research</Link>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
            <h2 className="text-xl font-semibold">Challenge or correct the work</h2>
            <p className="mt-3 text-sm leading-7 text-white/50">We welcome specific, source-based corrections and external review. Material errors should be corrected transparently.</p>
            <Link href="/research/review-and-corrections" className="mt-5 inline-flex rounded-xl border border-white/12 px-4 py-2.5 text-sm font-semibold text-white/75">Review & corrections policy</Link>
          </div>
        </section>
      </section>
    </main>
  );
}
