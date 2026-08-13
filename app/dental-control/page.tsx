import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Saudi Dental Intelligence Platform | Sitora Dental Control",
  description: "Explore Sitora Dental Control, a Saudi-focused operating intelligence prototype for dental groups covering chair utilisation, treatment leakage, claims risk, governance and evidence-grounded AI.",
  alternates: { canonical: "/dental-control" },
  robots: { index: true, follow: true },
};

export default function DentalControlLandingPage() {
  return (
    <main className="bg-[#071310] text-white">
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#86d4ca]">Saudi dental operating intelligence</div>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Dental groups already have software. Sitora helps them understand what is happening between the systems.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/55">Sitora Dental Control is a high-fidelity prototype of an intelligence layer for Saudi dental groups. It is designed to connect operating signals from existing practice-management, insurance, imaging and finance workflows, then turn those signals into evidence-backed actions.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tools/dental-control/demo" className="rounded-xl bg-[#2aa89a] px-5 py-3 text-sm font-semibold text-[#04110f]">Open the 5-minute demo</Link>
            <Link href="/research/saudi-dental-software-landscape-2026" className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70">Read the Saudi market research</Link>
          </div>
          <div className="mt-6 text-xs text-white/35">Prototype · synthetic data · no live clinical or NPHIES connection</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#73cabf]">The thesis</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] md:text-4xl">Not another practice-management system.</h2>
          <p className="mt-5 text-sm leading-7 text-white/50 md:text-base">Saudi dental clinics can already buy capable software for appointments, charting, treatment plans, billing, insurance and imaging. The remaining opportunity is increasingly about orchestration: seeing when capacity, treatment, documentation, imaging, claims and management workflows fall out of sync.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Control Tower", "Group-wide visibility across branches, chair utilisation, revenue, collections, treatment opportunity and operational risk."],
            ["Revenue Intelligence", "Identify accepted treatment that is still unbooked, unused chair capacity and recoverable commercial opportunities."],
            ["Claims Intelligence", "Surface claims requiring attention, detect repeated exception patterns and quantify value exposed to workflow delay."],
            ["Record Guardian", "Apply configurable documentation-completeness checks and route incomplete records into accountable review workflows."],
            ["Ask Sitora", "Ask operational questions in natural language and see evidence, source freshness, confidence and underlying drill-downs."],
            ["Action Centre", "Turn an insight into an owner, due date, status and tracked resolution rather than leaving it as another dashboard alert."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
              <h3 className="text-sm font-semibold text-white/90">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/42">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#73cabf]">Example operating question</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">Why is one branch underperforming?</h2>
            <p className="mt-4 text-sm leading-7 text-white/48">A conventional dashboard may show the variance. Sitora is designed to connect the variance to its underlying drivers: chair capacity, accepted-but-unbooked treatment, claims exposure, documentation completeness and accountable interventions.</p>
          </div>
          <div className="rounded-3xl border border-[#2aa89a]/20 bg-[#0d2822] p-6">
            <div className="text-xs font-semibold text-[#82d2c8]">Ask Sitora</div>
            <div className="mt-4 text-lg font-semibold">“Why is Jeddah Tahlia underperforming?”</div>
            <p className="mt-3 text-sm leading-7 text-white/50">The prototype answers using synthetic operating data, exposes its evidence trail and links directly into the relevant branch, clinician, patient or claims view.</p>
            <Link href="/tools/dental-control/copilot" className="mt-5 inline-flex text-sm font-semibold text-[#7fd0c5]">Try Ask Sitora →</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="rounded-3xl border border-[#c49a53]/20 bg-[#c49a53]/[0.045] p-7 md:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e2c184]">Research-led product development</div>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.035em]">The next question is bigger than analytics: can the full dental episode stay connected across systems?</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/50">Our Saudi dental software landscape research examines what existing systems already cover and where future gaps may remain, including episode-level workflow integrity, imaging-to-insurance handoffs, authorisation continuity, payer-response orchestration and evidence-grounded AI.</p>
          <Link href="/research/saudi-dental-software-landscape-2026" className="mt-6 inline-flex rounded-xl border border-[#c49a53]/25 bg-[#c49a53]/10 px-4 py-2.5 text-sm font-semibold text-[#e8c98f]">Read Saudi Dental Software Landscape 2026</Link>
        </div>
      </section>
    </main>
  );
}
