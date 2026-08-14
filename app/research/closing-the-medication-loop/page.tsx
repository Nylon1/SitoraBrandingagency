import type { Metadata } from "next";
import Link from "next/link";

const title = "CareGrid: Closing the Medication Loop";
const description =
  "A Sitora evidence and concept paper on closing medication-change workflows across general practice, pharmacy, hospital, mental health, homecare and social care.";
const url = "https://sitora.co.uk/research/closing-the-medication-loop";

export const metadata: Metadata = {
  title: "Closing the Medication Loop | NHS Medication Coordination Research",
  description,
  alternates: { canonical: "/research/closing-the-medication-loop" },
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
  datePublished: "2026-08-13",
  dateModified: "2026-08-14",
  author: { "@type": "Organization", name: "Sitora" },
  publisher: { "@type": "Organization", name: "Sitora" },
  mainEntityOfPage: url,
  url,
  about: [
    "Medication reconciliation",
    "NHS interoperability",
    "Medicines waste",
    "Integrated care",
  ],
};

const principles = [
  ["Read", "Authorised staff see a reconciled current medication view with provenance."],
  ["Change", "An appropriately authorised prescriber signs starts, stops and changes with reason and effective time."],
  ["Notify", "Affected teams receive the structured medication-change event."],
  ["Acknowledge", "A named team accepts the next action; silence remains visible and can escalate."],
  ["Close", "Repeat, supply or administration records are reconciled and the outcome is recorded."],
  ["Learn", "Verified waste and balancing safety outcomes are attached once to the event."],
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07110f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="border-b border-white/[0.07] bg-[radial-gradient(circle_at_75%_0%,rgba(42,168,154,0.13),transparent_34%)]">
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
          <Link href="/research" className="text-sm text-[#7acdc3]">← Sitora Research</Link>
          <div className="mt-8 text-xs font-semibold uppercase tracking-[0.17em] text-[#7acdc3]">Healthcare systems · August 2026</div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">CareGrid: Closing the Medication Loop</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/55 md:text-xl">A shared, signed medication-change and waste-prevention layer for integrated care.</p>
          <div className="mt-6 text-xs text-white/35">Independent concept report · not commissioned or endorsed by NHS England or an NHS organisation · financial outcomes are hypotheses for controlled evaluation</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/downloads/CareGrid_Closing_the_Medication_Loop_Report.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#2aa89a] px-5 py-3 text-sm font-semibold text-[#04110f]"
            >
              Download full PDF
            </a>
            <Link
              href="/research/methodology"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70"
            >
              Research methodology
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <section className="rounded-3xl border border-[#c49a53]/20 bg-[#c49a53]/[0.05] p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e1bf80]">Core proposition</div>
          <p className="mt-3 text-2xl font-semibold leading-9 tracking-[-0.025em]">One reconciled medication view. Every authorised change signed. Every affected service notified. Every next action acknowledged and closed.</p>
        </section>

        <article className="mt-12 space-y-14">
          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">The problem is not visibility alone</h2>
            <div className="mt-5 space-y-5 text-[15px] leading-8 text-white/55">
              <p>England already has electronic prescribing, shared-care viewing and transfer-of-care services. The remaining operational gap appears when a medicine is started, stopped, changed or cannot be supplied in one setting while an old repeat, dispensing instruction or administration record remains active elsewhere.</p>
              <p>The CareGrid thesis is that a medication decision needs more than a record. It needs a signed source, a defined recipient, a named next action, acknowledgement and a resolved state.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">Build on NHS foundations, do not duplicate them</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Electronic Prescription Service", "Keep the signed prescription transaction and connect change context to cross-provider ownership."],
                ["Summary / Shared Care Records", "Keep authoritative viewing and provenance, then add actionable workflow, acknowledgement and resolution."],
                ["Discharge Medicines Service", "Build on transfer and reconciliation by making shared status and closure measurable."],
                ["NHS App and oversupply analytics", "Reuse status and signals where possible, then turn them into owned interventions rather than creating another portal."],
              ].map(([itemTitle, body]) => (
                <div key={itemTitle} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                  <h3 className="font-semibold text-white/85">{itemTitle}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/48">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">Six operating rules</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {principles.map(([itemTitle, body], i) => (
                <div key={itemTitle} className="rounded-2xl border border-[#2aa89a]/15 bg-[#0c241f] p-5">
                  <div className="text-xs font-semibold text-[#77cfc3]">0{i + 1}</div>
                  <h3 className="mt-2 font-semibold">{itemTitle}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/48">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">The full medication loop crosses every setting</h2>
            <p className="mt-5 text-[15px] leading-8 text-white/55">The model spans general practice, community pharmacy, urgent care, admission, inpatient wards, discharge, tertiary care, mental health, hospital homecare, community nursing, care homes, hospice, supported living and emergency transfer. Each setting needs appropriate permissions and interfaces, but the event semantics should remain consistent.</p>
          </section>

          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7acdc3]">Worked scenario</div>
            <h2 className="mt-3 text-2xl font-semibold">A medicine is stopped in hospital</h2>
            <p className="mt-4 text-sm leading-7 text-white/52">In a fragmented pathway, the discharge record may change while the GP repeat or pharmacy workflow stays active until someone notices. In the proposed CareGrid pathway, the hospital prescriber creates a signed stop event, the GP and nominated pharmacy receive the same structured event, a named team accepts the reconciliation task, supply status is recorded, and the event closes only when the downstream records have been reconciled.</p>
            <p className="mt-4 text-sm font-semibold text-white/75">The important design choice is that nothing is silently overwritten. Conflicting sources remain visible until an accountable professional resolves them.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">Patient value without making the patient the workflow engine</h2>
            <p className="mt-5 text-[15px] leading-8 text-white/55">The core system should work even if a patient has no smartphone or never enters data. Better reconciliation can still mean fewer obsolete supplies, less chasing, safer transitions and clearer communications. A later patient companion could add reminders, stock reporting and discrepancy reporting, but patient input should remain a signal rather than an autonomous instruction to stop or withhold medication.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">Pilot before national claims</h2>
            <p className="mt-5 text-[15px] leading-8 text-white/55">The paper recommends a controlled Lancashire discovery and alpha using synthetic data first, followed by clinical-safety and information-governance work and then shadow-mode evaluation. The first use cases are deliberately narrow: a stopped medicine still due for supply, duplicate supply after discharge, and a care-home repeat/stock mismatch.</p>
            <p className="mt-4 text-sm text-white/45">The historic £300 million medicines-waste estimate is used as a size-of-opportunity benchmark, not as a 2026 audit or a savings promise. Any pilot should separately measure safety, verified prevented supply, staff time, patient effort and cash-releasing value.</p>
          </section>
        </article>

        <section className="mt-14 rounded-3xl border border-[#2aa89a]/20 bg-[#2aa89a]/[0.055] p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Related Sitora research</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/research/ai-as-the-nhs-front-door" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/65">AI as the NHS Front Door</Link>
            <Link href="/research/saudi-dental-software-landscape-2026" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/65">Saudi Dental Software Landscape</Link>
            <Link href="/research" className="rounded-xl bg-[#2aa89a] px-4 py-2.5 text-sm font-semibold text-[#04110f]">All research</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
