import type { Metadata } from "next";
import Link from "next/link";

const title = "Beyond Compliance: School Health Reform 2026";
const description =
  "An evidence-led Sitora policy proposal on school food, health education, physical activity, transparency and continuous improvement in England.";
const url = "https://sitora.co.uk/research/school-health-reform-2026";

export const metadata: Metadata = {
  title: `${title} | Sitora Research`,
  description,
  alternates: { canonical: "/research/school-health-reform-2026" },
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
    "School food",
    "Health education",
    "Physical activity",
    "Public health policy",
  ],
};

const score = [
  ["Food environment", "45", "Menu standards, fruit and vegetables, wholegrains, pulses, sweet-food frequency, processing, drinks and ingredient transparency."],
  ["Health & food education", "20", "Curriculum delivery, food literacy, cooking, parent communication and consistency between teaching and catering."],
  ["Physical activity", "25", "PE provision, daily movement, extracurricular activity, inclusive participation and active travel."],
  ["Improvement & governance", "10", "Evidence quality, annual review, response to findings, improvement plans and governing-body oversight."],
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07110f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="border-b border-white/[0.07] bg-[radial-gradient(circle_at_78%_0%,rgba(42,168,154,0.13),transparent_34%)]">
        <div className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
          <Link href="/research" className="text-sm text-[#7acdc3]">
            ← Sitora Research
          </Link>
          <div className="mt-8 text-xs font-semibold uppercase tracking-[0.17em] text-[#7acdc3]">
            Public health & policy · August 2026
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            Beyond Compliance: School Health Reform 2026
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/55 md:text-xl">
            Reforming school food, health education and physical activity in England, with Lancashire as a 2026 case study.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/downloads/Beyond_Compliance_School_Health_Reform_Report_No_Em_Dashes.pdf"
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
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e1bf80]">
            Core proposition
          </div>
          <p className="mt-3 text-2xl font-semibold leading-9 tracking-[-0.025em]">
            England should move from minimum school-food compliance to measurable responsibility for the health environment schools create.
          </p>
        </section>

        <article className="mt-12 space-y-14">
          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">Why school policy matters</h2>
            <div className="mt-5 space-y-5 text-[15px] leading-8 text-white/55">
              <p>Schools do not cause childhood obesity on their own. Family income, neighbourhood food environments, genetics, sleep, marketing, activity and wider social conditions all matter.</p>
              <p>But the school day is one of the few environments government can influence repeatedly across childhood through food, health education and opportunities for movement.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">Compliance does not always mean the healthiest pattern is the default</h2>
            <p className="mt-5 text-[15px] leading-8 text-white/55">The current English School Food Standards contain meaningful protections. The report argues that the next question should be broader: what dietary pattern is the school normalising five days a week?</p>
            <p className="mt-4 text-[15px] leading-8 text-white/55">In the Lancashire Spring/Summer 2026 primary menu analysed for the report, a sweet headline dessert appeared on 12 of 15 days, while fruit, yoghurt and other alternatives were also available. This does not show what individual children ate. It shows how menu architecture can repeatedly foreground one choice over another.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">International systems point to different design tools</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["France", "Cycle-based frequency rules make repeated menu patterns measurable."],
                ["Finland", "A balanced daily meal is defined positively and connected to pupil welfare and education."],
                ["Japan", "Food education is integrated into school life so the canteen and curriculum reinforce each other."],
                ["Brazil", "Public procurement rules shape what can be bought with school-food funding before it reaches the menu."],
              ].map(([itemTitle, body]) => (
                <div key={itemTitle} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                  <h3 className="font-semibold text-white/85">{itemTitle}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/48">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">A whole-school health standard</h2>
            <p className="mt-5 text-[15px] leading-8 text-white/55">The proposal combines three areas government often treats separately: what children are fed, what they are taught about health and how much opportunity they have to move. The aim is to align the food environment, health education and physical activity rather than run them as disconnected initiatives.</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">The Healthy School Score</h2>
            <p className="mt-5 text-[15px] leading-8 text-white/55">The suggested 100-point score measures factors the school can control. It deliberately excludes individual pupil BMI and avoids equating local obesity prevalence with school quality.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {score.map(([itemTitle, points, body]) => (
                <div key={itemTitle} className="rounded-2xl border border-[#2aa89a]/15 bg-[#0c241f] p-5">
                  <div className="text-2xl font-semibold text-[#8bd8ce]">{points}</div>
                  <h3 className="mt-2 font-semibold">{itemTitle}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/48">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-[-0.03em]">Implementation should be firm but fair</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {["1. Legislate", "2. Transition", "3. Monitor", "4. Improve first, escalate later"].map((x) => (
                <div key={x} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 text-sm font-medium text-white/65">
                  {x}
                </div>
              ))}
            </div>
            <p className="mt-5 text-[15px] leading-8 text-white/55">Government should define stronger measurable standards first, give schools and caterers time to adapt, then introduce annual evidence-based monitoring. A weak score should trigger practical correction and re-review before punitive escalation.</p>
          </section>

          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
            <h2 className="text-2xl font-semibold">Safeguard against stigma</h2>
            <p className="mt-4 text-sm leading-7 text-white/52">A public score should never include individual pupil weight, named health data or a simplistic obesity-rate league table. It should measure the environment created by the school and show context, evidence dates and improvement status.</p>
          </section>
        </article>

        <section className="mt-14 rounded-3xl border border-[#2aa89a]/20 bg-[#2aa89a]/[0.055] p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Related Sitora research</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/research/closing-the-medication-loop" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/65">Closing the Medication Loop</Link>
            <Link href="/research/ai-as-the-nhs-front-door" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/65">AI as the NHS Front Door</Link>
            <Link href="/research" className="rounded-xl bg-[#2aa89a] px-4 py-2.5 text-sm font-semibold text-[#04110f]">All research</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
