import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitora Research | Healthcare Systems, AI Governance & Saudi Innovation",
  description:
    "Independent Sitora research on healthcare systems, responsible AI, public health, dental technology and Saudi/Gulf digital infrastructure.",
  alternates: { canonical: "/research" },
  robots: { index: true, follow: true },
};

const featured = [
  {
    eyebrow: "Featured research · Saudi Arabia",
    title: "Saudi Dental Software Landscape 2026",
    text: "A market and infrastructure study asking what Saudi dental systems already solve, where workflow still fragments, and whether the next opportunity is orchestration rather than another practice-management system.",
    href: "/research/saudi-dental-software-landscape-2026",
  },
  {
    eyebrow: "Healthcare systems · England",
    title: "Closing the Medication Loop",
    text: "A shared, signed medication-change and waste-prevention model spanning general practice, pharmacy, hospital, mental health, homecare and social care.",
    href: "/research/closing-the-medication-loop",
  },
];

const collection = [
  {
    category: "AI, Safety & Governance",
    title: "AI as the NHS Front Door",
    description: "Policy research on safety, accountability, public trust and human escalation when AI becomes part of the NHS patient-access pathway.",
    href: "/research/ai-as-the-nhs-front-door",
    status: "Editorial review",
  },
  {
    category: "Public Health & Policy",
    title: "Beyond Compliance: School Health Reform 2026",
    description: "An evidence-led proposal to strengthen school food, health education, physical activity, monitoring and continuous improvement without stigmatising children.",
    href: "/research/school-health-reform-2026",
    status: "Policy proposal",
  },
  {
    category: "Saudi & Gulf Innovation",
    title: "Passenger Assurance",
    description: "A Saudi sovereign journey-intelligence concept for airports, airlines, Hajj and Umrah, designed to sit above existing identity and airline systems.",
    href: "/research/passenger-assurance-saudi",
    status: "Strategic concept",
  },
];

const themes = [
  ["Healthcare systems", "Medication continuity, dental operations, interoperability and accountable workflow."],
  ["AI governance", "Safety, evidence, audit, transparency and human accountability in high-trust systems."],
  ["Public policy", "Practical reform proposals grounded in measurable standards and visible limitations."],
  ["Saudi & Gulf innovation", "Saudi-first operating models for healthcare, infrastructure and high-scale public services."],
];

export default function ResearchHubPage() {
  return (
    <main className="min-h-screen bg-[#06110f] text-white">
      <section className="border-b border-white/[0.07] bg-[radial-gradient(circle_at_75%_0%,rgba(42,168,154,0.14),transparent_34%),radial-gradient(circle_at_15%_30%,rgba(214,184,120,0.07),transparent_28%)]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7fd0c5]">
            <span>Sitora Research</span><span className="text-white/25">·</span><span className="text-white/40">Evidence · Systems · Policy</span>
          </div>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.05em] md:text-7xl">
            Research for systems that need to work better, not simply look more digital.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-white/55 md:text-lg">
            Sitora studies the operating gaps between policy, technology and real-world delivery. We focus on healthcare systems, responsible AI, public policy and Saudi/Gulf innovation, separating established evidence from vendor claims and new hypotheses that still need field validation.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/research/methodology" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/72 transition hover:bg-white/[0.07]">Research methodology</Link>
            <Link href="/research/review-and-corrections" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/72 transition hover:bg-white/[0.07]">Review & corrections</Link>
            <Link href="/research/saudi-gulf-innovation" className="rounded-xl border border-[#c49a53]/25 bg-[#c49a53]/[0.06] px-4 py-2.5 text-sm font-medium text-[#dfc489]">Saudi & Gulf innovation</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div><div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d6b878]">Featured</div><h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em]">Current flagship research</h2></div>
          <div className="hidden text-sm text-white/35 md:block">Independent research · August 2026</div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {featured.map((paper) => (
            <Link key={paper.href} href={paper.href} className="group relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-white/[0.03] p-7 transition hover:-translate-y-0.5 hover:border-[#2aa89a]/35 md:p-9">
              <div className="absolute right-[-12%] top-[-35%] h-56 w-56 rounded-full bg-[#2aa89a]/10 blur-3xl" />
              <div className="relative text-xs font-semibold uppercase tracking-[0.15em] text-[#7fd0c5]">{paper.eyebrow}</div>
              <h3 className="relative mt-4 text-3xl font-semibold tracking-[-0.04em] group-hover:text-[#a5e2da]">{paper.title}</h3>
              <p className="relative mt-5 max-w-2xl text-sm leading-7 text-white/52">{paper.text}</p>
              <div className="relative mt-8 text-sm font-semibold text-[#73cabf]">Read the research →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          {themes.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-white/[0.07] bg-black/10 p-5"><h3 className="text-sm font-semibold text-white/85">{title}</h3><p className="mt-2 text-xs leading-6 text-white/42">{body}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-8"><div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7fd0c5]">Research collection</div><h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em]">Policy, governance and strategic concepts</h2></div>
        <div className="grid gap-5 lg:grid-cols-3">
          {collection.map((paper) => (
            <Link key={paper.href} href={paper.href} className="group rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition hover:-translate-y-0.5 hover:border-[#2aa89a]/30 hover:bg-white/[0.04]">
              <div className="text-xs uppercase tracking-[0.13em] text-[#76cbbf]">{paper.category}</div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] group-hover:text-[#9de0d7]">{paper.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/50">{paper.description}</p>
              <div className="mt-6 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.12em] text-white/32"><span>{paper.status}</span><span className="text-[#73cabf]">Open →</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div><div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d6b878]">Research standard</div><h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Evidence first. Hypotheses labelled. Limitations visible.</h2></div>
            <div><p className="text-sm leading-7 text-white/48">Published papers distinguish official evidence, vendor claims, modelling, strategic concepts and areas requiring field validation. Product concepts are presented as hypotheses to test rather than proof of effectiveness.</p><Link href="/research/methodology" className="mt-4 inline-flex text-sm font-semibold text-[#73cabf]">Read our methodology →</Link></div>
          </div>
        </div>
      </section>
    </main>
  );
}
