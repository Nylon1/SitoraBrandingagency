import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitora Research | Healthcare, AI, Public Policy & Saudi Innovation",
  description:
    "Independent Sitora research on healthcare systems, responsible AI, public health, dental technology and Saudi/Gulf digital infrastructure.",
  alternates: { canonical: "/research" },
  robots: { index: true, follow: true },
};

const papers = [
  {
    category: "Dental & Healthcare Systems",
    title: "Saudi Dental Software Landscape 2026",
    description:
      "What existing Saudi dental systems already cover, where workflow still fragments, and the next opportunities in orchestration, NPHIES and dental intelligence.",
    href: "/research/saudi-dental-software-landscape-2026",
    status: "Published research",
  },
  {
    category: "AI, Safety & Governance",
    title: "AI as the NHS Front Door",
    description:
      "A policy paper on safety, accountability, public trust and human escalation when AI becomes part of the NHS patient-access pathway.",
    href: "/research/ai-as-the-nhs-front-door",
    status: "Policy research",
  },
  {
    category: "Healthcare Systems",
    title: "Closing the Medication Loop",
    description:
      "A closed-loop medication coordination model spanning general practice, pharmacy, hospital, mental health, homecare and social care.",
    href: "/research/closing-the-medication-loop",
    status: "Evidence & concept report",
  },
  {
    category: "Public Health & Policy",
    title: "Beyond Compliance: School Health Reform 2026",
    description:
      "An evidence-led proposal to strengthen school food, health education, physical activity, monitoring and continuous improvement without stigmatising children.",
    href: "/research/school-health-reform-2026",
    status: "Policy proposal",
  },
  {
    category: "Saudi & Gulf Innovation",
    title: "Passenger Assurance",
    description:
      "A Saudi sovereign journey-intelligence concept for airports, airlines, Hajj and Umrah, designed to sit above existing identity and airline systems.",
    href: "/research/passenger-assurance-saudi",
    status: "Strategic concept paper",
  },
];

export default function ResearchHubPage() {
  return (
    <main className="min-h-screen bg-[#06110f] text-white">
      <section className="border-b border-white/[0.07] bg-[radial-gradient(circle_at_75%_0%,rgba(42,168,154,0.13),transparent_32%)]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7fd0c5]">Sitora Research</div>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            Research into the systems, policies and operating gaps that shape better public services.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/55 md:text-lg">
            Sitora publishes independent research at the intersection of healthcare operations, responsible AI, public policy and Saudi/Gulf digital infrastructure. Our aim is to identify practical gaps, distinguish evidence from hypothesis and turn complex system problems into testable operating models.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/research/methodology" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/70">Research methodology</Link>
            <Link href="/research/saudi-gulf-innovation" className="rounded-xl border border-[#c49a53]/25 bg-[#c49a53]/[0.06] px-4 py-2.5 text-sm font-medium text-[#dfc489]">Saudi & Gulf innovation</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          {papers.map((paper) => (
            <Link
              key={paper.href}
              href={paper.href}
              className="group rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition hover:-translate-y-0.5 hover:border-[#2aa89a]/35 hover:bg-white/[0.04] md:p-8"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.13em] text-white/35">
                <span className="text-[#76cbbf]">{paper.category}</span>
                <span>·</span>
                <span>{paper.status}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white group-hover:text-[#9de0d7]">
                {paper.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">{paper.description}</p>
              <div className="mt-6 text-sm font-semibold text-[#73cabf]">Read research →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d6b878]">Research standard</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Evidence first. Hypotheses labelled. Limitations visible.</h2>
            </div>
            <p className="text-sm leading-7 text-white/48">
              Published papers distinguish official evidence, vendor claims, modelling, strategic concepts and areas that still require field validation. Where a paper proposes a new product or operating model, that proposal is presented as a hypothesis to test rather than proof of effectiveness.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
