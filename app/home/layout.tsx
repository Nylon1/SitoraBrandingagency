import Link from "next/link";

const featuredResearch = [
  {
    eyebrow: "Saudi dental technology",
    title: "Saudi Dental Software Landscape 2026",
    text: "A research-led review of existing Saudi dental systems, NPHIES infrastructure and the next opportunity in cross-system orchestration.",
    href: "/research/saudi-dental-software-landscape-2026",
  },
  {
    eyebrow: "Healthcare systems",
    title: "Closing the Medication Loop",
    text: "A standards-based coordination model for signed medication changes, acknowledgement, reconciliation and safer hand-offs across care settings.",
    href: "/research/closing-the-medication-loop",
  },
  {
    eyebrow: "Public health policy",
    title: "Beyond Compliance: School Health Reform",
    text: "An evidence-led proposal for stronger school food, health education, physical activity and transparent improvement in England.",
    href: "/research/school-health-reform-2026",
  },
];

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <section className="border-y border-white/10 bg-[#06110f] px-5 py-24 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7fd0c5]">Sitora Research</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                We do more than build digital platforms. We study the systems they need to improve.
              </h2>
            </div>
            <div className="lg:pl-10">
              <p className="max-w-2xl text-base leading-8 text-white/55">
                Sitora publishes independent research across healthcare operations, responsible AI, public policy and Saudi/Gulf digital infrastructure. The work separates evidence from hypothesis and turns complex operating gaps into practical models that can be tested.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/research" className="rounded-full bg-[#d8b66d] px-6 py-3 text-sm font-bold text-[#07100f] transition hover:bg-[#f2cf83]">
                  Explore Sitora Research
                </Link>
                <Link href="/research/methodology" className="rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white">
                  Research methodology
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featuredResearch.map((paper) => (
              <Link key={paper.href} href={paper.href} className="group rounded-[1.7rem] border border-white/[0.08] bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#d8b66d]/30 hover:bg-white/[0.045]">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#78cbbf]">{paper.eyebrow}</div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] group-hover:text-[#efd28e]">{paper.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/48">{paper.text}</p>
                <div className="mt-6 text-sm font-semibold text-[#d8b66d]">Read the paper →</div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/45">
            <Link href="/research/saudi-gulf-innovation" className="transition hover:text-white">Saudi & Gulf Innovation →</Link>
            <Link href="/research/passenger-assurance-saudi" className="transition hover:text-white">Passenger Assurance →</Link>
            <Link href="/dental-control" className="transition hover:text-white">Dental Control prototype →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
