import AIReadinessAuditForm from "./audit/AIReadinessAuditForm";

export const metadata = {
  title: "AI Readiness & Governance Support | Sitora",
  description:
    "Sitora helps businesses identify how AI is being used, understand potential exposure, and prepare practical policies, disclosures and governance documents.",
};

const reviewItems = [
  "AI chatbots",
  "Website AI tools",
  "CRM and software AI",
  "Staff use of ChatGPT, Copilot, Gemini or Claude",
  "AI-generated content",
  "Customer, patient, staff or client data use",
  "Recruitment and HR AI",
  "Healthcare and dental AI",
  "Finance, eligibility or decision-support AI",
  "Policies, disclosures and governance gaps",
];

const packages = [
  {
    title: "AI Readiness Audit",
    text: "A practical first review to identify where AI is being used, where exposure may exist, and what needs attention.",
    points: [
      "AI usage review",
      "Website/chatbot/software check",
      "Risk summary",
      "Disclosure review",
      "Priority action plan",
    ],
  },
  {
    title: "AI Governance Pack",
    text: "For businesses that need clear documentation, internal guidance and a more organised AI governance structure.",
    points: [
      "AI usage policy",
      "Staff AI policy",
      "AI tool register",
      "AI risk register",
      "Supplier checklist",
    ],
  },
  {
    title: "Governance + Implementation",
    text: "For businesses that want Sitora to help put the documents, website wording and internal governance in place.",
    points: [
      "Full audit",
      "Policy pack",
      "Website disclosures",
      "Staff guidance",
      "90-day roadmap",
    ],
  },
];

const sectors = [
  "Healthcare & dental",
  "Recruitment & HR",
  "Finance & insurance",
  "Education & training",
  "Software & SaaS",
  "Ecommerce",
  "Professional services",
  "Marketing & customer service",
];

export default function AIReadinessPage() {
  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(80,120,255,0.12),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm text-[#f3d77b]">
              AI Readiness & Governance Support
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Is your business ready for responsible AI use?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Sitora helps businesses identify how AI is being used, understand
              potential exposure, and prepare practical policies, disclosures
              and governance documents for responsible AI use.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#review-form"
                className="rounded-full bg-[#d4af37] px-7 py-4 text-center font-semibold text-black transition hover:bg-[#f0cf65]"
              >
                Request an AI Readiness Review
              </a>
              <a
                href="#what-we-review"
                className="rounded-full border border-white/15 px-7 py-4 text-center font-semibold text-white transition hover:bg-white/10"
              >
                See what we review
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
            <h2 className="text-2xl font-semibold">
              Many businesses are already using AI.
            </h2>
            <p className="mt-4 text-white/70">
              The problem is that many have no AI policy, no tool register, no
              risk assessment, no staff guidance and no clear governance
              process.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "No AI usage policy",
                "No approved tool list",
                "No chatbot disclosure",
                "No data protection check",
                "No human oversight process",
                "No record of AI-assisted decisions",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-2xl font-semibold">AI is moving fast</h3>
              <p className="mt-4 text-white/70">
                Businesses are using AI through websites, CRMs, chatbots,
                marketing tools, recruitment software and internal workflows.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-2xl font-semibold">Governance matters</h3>
              <p className="mt-4 text-white/70">
                If AI touches customer data, staff, patients, candidates,
                decisions or advice, businesses need to understand the risk.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-2xl font-semibold">Documentation protects</h3>
              <p className="mt-4 text-white/70">
                Policies, disclosures, registers and oversight processes help
                businesses become more organised and AI-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="what-we-review" className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              What Sitora reviews
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              We help identify where AI is being used and where governance gaps
              may exist.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviewItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white/80"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Packages
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Start with a review, then build the governance system.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
              >
                <h3 className="text-2xl font-semibold">{pkg.title}</h3>
                <p className="mt-4 text-white/70">{pkg.text}</p>

                <ul className="mt-6 space-y-3 text-sm text-white/75">
                  {pkg.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="text-[#d4af37]">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
            Sectors
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            AI risk changes by sector.
          </h2>
          <p className="mt-4 max-w-3xl text-white/70">
            A simple AI content tool is different from AI used in healthcare,
            recruitment, finance or decision-support. Sitora helps businesses
            understand where their exposure may sit.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {sectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-white/75"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="review-form" className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Request a review
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Start with a short AI readiness form.
            </h2>
            <p className="mt-4 text-white/70">
              Complete the form and Sitora can review whether your business may
              need clearer AI policies, disclosures, tool registers or
              governance support.
            </p>

            <div className="mt-8 rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/10 p-6 text-sm text-white/75">
              <strong className="text-[#f3d77b]">Important:</strong> Sitora is
              not a law firm and does not provide legal advice. Our role is to
              help businesses become more organised, transparent and AI-ready.
            </div>
          </div>

          <AIReadinessAuditForm />
        </div>
      </section>
    </main>
  );
}