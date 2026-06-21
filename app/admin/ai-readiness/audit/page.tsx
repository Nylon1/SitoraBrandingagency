import AIReadinessAuditForm from "./AIReadinessAuditForm";

export const metadata = {
  title: "AI Readiness Audit Questionnaire | Sitora",
  description:
    "Complete the Sitora AI Readiness & Governance Assessment questionnaire.",
};

export default function AIReadinessAuditPage() {
  return (
    <main className="min-h-screen bg-[#05070d] px-6 py-16 text-white sm:px-10 lg:px-20">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 inline-flex rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm text-[#f3d77b]">
          Sitora AI Readiness Assessment
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          AI Readiness & Governance Questionnaire
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
          This assessment helps identify how AI is being used in your business,
          where potential exposure may exist, and what governance documents,
          disclosures or internal controls may be needed.
        </p>

        <div className="mt-8 rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/10 p-6 text-sm leading-7 text-white/75">
          <strong className="text-[#f3d77b]">Important:</strong> Sitora is not a
          law firm and does not provide legal advice. This questionnaire is
          designed to support practical AI readiness, governance preparation and
          internal organisation.
        </div>

        <AIReadinessAuditForm />
      </section>
    </main>
  );
}