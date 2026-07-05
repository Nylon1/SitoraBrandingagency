export const metadata = {
  title: "Sample Sitora Trust 360™ Executive Report",
  description:
    "View a sample Sitora Qatar Trust 360™ executive report showing trust score, Qatar risk mapping, exposure areas and a 30/60/90 day action plan.",
};

const reportScores = [
  { label: "Data Protection & Privacy", score: 58, status: "High exposure" },
  { label: "Advertising & Public Claims", score: 64, status: "High exposure" },
  { label: "Cybersecurity Readiness", score: 72, status: "Medium exposure" },
  { label: "AI & Automation Use", score: 49, status: "High exposure" },
  { label: "Vendor & Third-Party Risk", score: 54, status: "High exposure" },
  { label: "Customer Experience", score: 76, status: "Medium exposure" },
  { label: "Website & Digital Presence", score: 81, status: "Low exposure" },
  { label: "Reputation & Crisis Readiness", score: 61, status: "High exposure" },
];

const topRisks = [
  {
    priority: "Critical",
    title: "No clear evidence of marketing consent records",
    area: "Data Protection / Direct Marketing",
    issue:
      "The organisation uses WhatsApp, email and paid social campaigns but does not appear to have a consistent record of consent capture, source of lead, unsubscribe handling or agency access.",
    impact:
      "Creates exposure under data protection and consumer-facing compliance expectations, especially where personal data is used for direct marketing.",
    action:
      "Create a central consent register, review CRM imports, update lead forms, document consent wording and ensure unsubscribe processes are working.",
  },
  {
    priority: "Critical",
    title: "Advertising claims are not reviewed before publication",
    area: "Consumer Protection / Advertising",
    issue:
      "Discounts, promotional claims and social media adverts are published without a documented internal review process.",
    impact:
      "Increases risk of misleading claims, unclear pricing, consumer complaints, campaign takedowns and regulatory scrutiny.",
    action:
      "Introduce a pre-publication claims review checklist covering offers, pricing, proof, Arabic/English consistency, disclaimers and approval records.",
  },
  {
    priority: "High",
    title: "AI tools used without internal policy",
    area: "AI / Data Governance",
    issue:
      "Staff use generative AI tools for content, customer support and document drafting without rules on customer data, confidential information or human approval.",
    impact:
      "Creates risk of data leakage, inaccurate claims, hallucinated content and lack of accountability for AI-generated outputs.",
    action:
      "Create an AI usage policy, ban sensitive data uploads, require human approval for external content and maintain an AI tool register.",
  },
  {
    priority: "High",
    title: "Vendor access is not centrally controlled",
    area: "Vendor / Third-Party Risk",
    issue:
      "Multiple external providers including web developers, marketing agencies, CRM platforms and cloud tools appear to have access to systems or customer data.",
    impact:
      "Creates risk if accounts are not removed, permissions are too broad, contracts are weak or suppliers mishandle personal data.",
    action:
      "Create a vendor register, review access permissions, document data-processing responsibilities and remove unnecessary accounts.",
  },
  {
    priority: "Medium",
    title: "No tested incident response process",
    area: "Cybersecurity / Breach Readiness",
    issue:
      "The organisation has backups and basic security controls but no documented breach notification pathway, internal escalation process or incident-response test.",
    impact:
      "A security incident could become more damaging if staff do not know who must act, what evidence to preserve and who must be notified.",
    action:
      "Create an incident response plan, define escalation owners, test the process and document breach-response timelines.",
  },
];

const qatarMapping = [
  {
    rule: "Personal Data Privacy Protection Law",
    reference: "Law No. 13 of 2016",
    relevance:
      "Customer data, employee data, consent, privacy notices, security safeguards, vendor access and breach readiness.",
    reportFinding:
      "Consent records and vendor data access require improvement.",
  },
  {
    rule: "Consumer Protection Law",
    reference: "Law No. 8 of 2008",
    relevance:
      "False or deceptive advertising, unclear pricing, promotional claims, offers, guarantees and customer-facing promises.",
    reportFinding:
      "Advertising approval process is not documented before campaigns go live.",
  },
  {
    rule: "Cybercrime / Digital Privacy Risk",
    reference: "Law No. 14 of 2014 and later amendments",
    relevance:
      "Use of images, videos, private information, social media content, testimonials and digital sharing.",
    reportFinding:
      "Image/video consent process should be formalised for marketing and social media.",
  },
  {
    rule: "Electronic Transactions & E-Commerce",
    reference: "Decree-Law No. 16 of 2010",
    relevance:
      "Online terms, e-signatures, checkout flows, digital acceptance records and transaction evidence.",
    reportFinding:
      "Website terms and online acceptance records need clearer evidence.",
  },
];

const actionPlan = [
  {
    period: "First 30 days",
    title: "Stabilise the highest-risk gaps",
    actions: [
      "Create marketing claims review checklist",
      "Update privacy notice and lead form wording",
      "Stop staff uploading customer data into AI tools",
      "Create vendor access register",
      "Review WhatsApp and email marketing consent evidence",
    ],
  },
  {
    period: "Days 31–60",
    title: "Build evidence and internal controls",
    actions: [
      "Implement AI usage policy",
      "Create breach response plan",
      "Review agency and vendor data access",
      "Create social media approval process",
      "Add customer complaint escalation process",
    ],
  },
  {
    period: "Days 61–90",
    title: "Strengthen trust and prepare for scrutiny",
    actions: [
      "Test incident response process",
      "Create executive Trust 360 dashboard",
      "Complete accessibility basics review",
      "Document Qatar risk mapping",
      "Prepare audit evidence folder for investors, clients or regulators",
    ],
  },
];

export default function SampleTrust360ReportPage() {
  const overallScore = 63;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-6 py-20 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.28),_transparent_34%),linear-gradient(135deg,_#050505,_#100c06)]" />

        <div className="mx-auto max-w-7xl">
          <a
            href="/qatar-trust-360"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Qatar Trust 360
          </a>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold text-[#D4AF37]">
                Sample Executive Report
              </p>

              <h1 className="mt-8 max-w-5xl text-5xl font-black tracking-tight sm:text-6xl">
                Sitora Trust 360™ Executive Report
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
                This sample report shows the type of output an organisation
                receives after a Sitora Qatar Trust 360™ audit: a clear trust
                score, Qatar risk mapping, priority findings and a practical
                30/60/90 day action plan.
              </p>

              <p className="mt-5 text-sm leading-7 text-white/45">
                Sample only. Findings shown are fictional and provided to
                demonstrate report structure.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Overall Trust Score™
              </p>
              <p className="mt-5 text-7xl font-black text-white">
                {overallScore}
                <span className="text-3xl text-white/40">/100</span>
              </p>
              <p className="mt-4 text-xl font-bold text-orange-200">
                High exposure
              </p>
              <p className="mt-4 leading-8 text-white/70">
                Several important trust and compliance gaps were identified,
                particularly around consent evidence, advertising claims, AI
                usage and vendor control.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          <SummaryCard label="Organisation" value="Sample Qatar Company" />
          <SummaryCard label="Sector" value="Healthcare / Services" />
          <SummaryCard label="Employees" value="51–200" />
          <SummaryCard label="Report Type" value="Corporate Trust 360" />
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Executive summary
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              The organisation looks credible, but evidence gaps create hidden
              exposure.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              The organisation has a strong public-facing presence and active
              marketing channels. However, the audit identified gaps in consent
              evidence, advertising review, vendor access management, AI usage
              controls and breach readiness. These issues could become more
              serious if the organisation scales campaigns, handles sensitive
              data, responds to a complaint, or enters investor or enterprise
              due diligence.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <InsightCard
              title="Commercial opportunity"
              text="Improving trust controls would strengthen customer confidence, investor readiness and enterprise supplier credibility."
            />
            <InsightCard
              title="Main exposure"
              text="The highest-risk areas are marketing consent, claims review, AI data handling and vendor access."
              danger
            />
            <InsightCard
              title="Priority recommendation"
              text="Implement a 30-day stabilisation plan followed by a 60-day evidence and governance build-out."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Score breakdown
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight">
            Trust Score™ by risk area
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {reportScores.map((item) => (
            <ScoreRow key={item.label} {...item} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Priority findings
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">
              Top risks identified
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {topRisks.map((risk, index) => (
              <RiskFinding key={risk.title} index={index + 1} {...risk} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Qatar rules mapping
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight">
            Relevant Qatar risk areas
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">
            Sitora reports map findings against relevant Qatar risk areas so
            leadership can see which business activities need stronger evidence,
            controls or review.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {qatarMapping.map((item) => (
            <QatarMappingCard key={item.rule} {...item} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Action plan
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">
              30/60/90 day improvement roadmap
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {actionPlan.map((plan) => (
              <ActionPlanCard key={plan.period} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
          Ready to assess your organisation?
        </p>

        <h2 className="mt-5 text-5xl font-black tracking-tight">
          Get your own Trust 360 Exposure Assessment.
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
          Start with the free exposure check. Sitora will review your answers
          and identify whether your organisation appears to have low, medium,
          high or urgent exposure.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/qatar-trust-360/exposure-check"
            className="rounded-full bg-[#D4AF37] px-8 py-4 text-center text-sm font-black text-black transition hover:bg-[#f0cf63]"
          >
            Start Free Exposure Check
          </a>

          <a
            href="/qatar-trust-360"
            className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-black text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            Back to Trust 360
          </a>
        </div>
      </section>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
      <p className="text-sm font-bold text-[#D4AF37]">{label}</p>
      <p className="mt-2 text-lg font-black text-white">{value}</p>
    </div>
  );
}

function InsightCard({
  title,
  text,
  danger = false,
}: {
  title: string;
  text: string;
  danger?: boolean;
}) {
  return (
    <div
      className={`rounded-[2rem] border p-7 ${
        danger
          ? "border-red-500/30 bg-red-500/10"
          : "border-[#D4AF37]/30 bg-[#D4AF37]/10"
      }`}
    >
      <h3
        className={`text-xl font-black ${
          danger ? "text-red-200" : "text-[#D4AF37]"
        }`}
      >
        {title}
      </h3>
      <p className="mt-4 leading-8 text-white/70">{text}</p>
    </div>
  );
}

function ScoreRow({
  label,
  score,
  status,
}: {
  label: string;
  score: number;
  status: string;
}) {
  const colour =
    score < 60
      ? "bg-red-400"
      : score < 75
        ? "bg-orange-300"
        : "bg-[#D4AF37]";

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
      <div className="flex items-center justify-between gap-5">
        <div>
          <p className="font-black text-white">{label}</p>
          <p className="mt-1 text-sm text-white/50">{status}</p>
        </div>
        <p className="text-2xl font-black text-white">
          {score}
          <span className="text-sm text-white/40">/100</span>
        </p>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${colour}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function RiskFinding({
  index,
  priority,
  title,
  area,
  issue,
  impact,
  action,
}: {
  index: number;
  priority: string;
  title: string;
  area: string;
  issue: string;
  impact: string;
  action: string;
}) {
  const critical = priority === "Critical";

  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/35 p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-bold text-[#D4AF37]">Finding {index}</p>
          <h3 className="mt-3 text-2xl font-black text-white">{title}</h3>
          <p className="mt-2 text-sm font-semibold text-white/50">{area}</p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full border px-4 py-2 text-xs font-black ${
            critical
              ? "border-red-500/30 bg-red-500/10 text-red-200"
              : "border-orange-400/30 bg-orange-400/10 text-orange-200"
          }`}
        >
          {priority}
        </span>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        <MiniBlock title="Issue" text={issue} />
        <MiniBlock title="Impact" text={impact} danger />
        <MiniBlock title="Recommended action" text={action} />
      </div>
    </div>
  );
}

function MiniBlock({
  title,
  text,
  danger = false,
}: {
  title: string;
  text: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <p className={`text-sm font-black ${danger ? "text-red-200" : "text-[#D4AF37]"}`}>
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
    </div>
  );
}

function QatarMappingCard({
  rule,
  reference,
  relevance,
  reportFinding,
}: {
  rule: string;
  reference: string;
  relevance: string;
  reportFinding: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
        {reference}
      </p>
      <h3 className="mt-4 text-2xl font-black text-white">{rule}</h3>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-sm font-black text-white">Why relevant</p>
          <p className="mt-2 text-sm leading-7 text-white/65">{relevance}</p>
        </div>

        <div>
          <p className="text-sm font-black text-[#D4AF37]">Sample finding</p>
          <p className="mt-2 text-sm leading-7 text-white/65">
            {reportFinding}
          </p>
        </div>
      </div>
    </div>
  );
}

function ActionPlanCard({
  period,
  title,
  actions,
}: {
  period: string;
  title: string;
  actions: string[];
}) {
  return (
    <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-7">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#D4AF37]">
        {period}
      </p>
      <h3 className="mt-4 text-2xl font-black text-white">{title}</h3>

      <ul className="mt-6 space-y-3">
        {actions.map((action) => (
          <li key={action} className="flex gap-3 text-sm leading-7 text-white/70">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
            <span>{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}