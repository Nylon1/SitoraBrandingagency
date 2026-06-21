import Link from "next/link";

export const metadata = {
  title: "AI Readiness Review Requested | Sitora",
};

export default function AIReadinessThankYouPage() {
  return (
    <main className="min-h-screen bg-[#05070d] px-6 py-20 text-white sm:px-10 lg:px-20">
      <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center text-center">
        <p className="mb-4 inline-flex rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm text-[#f3d77b]">
          Request received
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Thank you for requesting an AI Readiness Review.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
          We’ll review your answers and identify whether there may be areas
          worth checking around AI usage, data handling, disclosures, policies
          and governance.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left text-sm leading-7 text-white/70">
          <strong className="text-[#f3d77b]">Please note:</strong> Sitora is not
          a law firm and does not provide legal advice. Our AI readiness and
          governance support helps businesses become more organised,
          transparent and prepared for responsible AI use.
        </div>

        <Link
          href="/"
          className="mt-8 rounded-full bg-[#d4af37] px-7 py-4 font-semibold text-black transition hover:bg-[#f0cf65]"
        >
          Back to Sitora
        </Link>
      </section>
    </main>
  );
}