import Link from "next/link";

export default function ADAAccessibilityAuditPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-400">
          Sitora Full ADA Accessibility Audit
        </p>

        <h1 className="mb-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          Full ADA Website Accessibility Audit for Dental Practices
        </h1>

        <p className="mb-10 max-w-3xl text-lg leading-8 text-zinc-300">
          A dedicated WCAG-based accessibility audit designed to identify
          barriers that may affect disabled patients using your website,
          contact forms, booking journeys, PDFs and online patient information.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-3 text-xl font-semibold">10–25 Page Review</h2>
            <p className="leading-7 text-zinc-300">
              We review key website pages including homepage, contact, booking,
              treatments, fees, emergency pages and patient resources.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-3 text-xl font-semibold">Manual + Automated</h2>
            <p className="leading-7 text-zinc-300">
              The audit combines automated WCAG checks with manual review of
              patient access, keyboard usability, forms and navigation.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-3 text-xl font-semibold">Action Plan</h2>
            <p className="leading-7 text-zinc-300">
              You receive a plain-English report with priority fixes,
              accessibility risks and recommended remediation steps.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-amber-400/30 bg-amber-400/10 p-8">
          <h2 className="mb-6 text-3xl font-semibold">
            What the full audit includes
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "WCAG accessibility issue scan",
              "Homepage and key page review",
              "Contact form accessibility review",
              "Booking journey review",
              "Keyboard navigation review",
              "Screen-reader structure review",
              "Image alt text review",
              "Button and link label review",
              "Colour contrast review",
              "Mobile menu accessibility review",
              "PDF and download risk check",
              "Accessibility statement review",
              "Issues grouped by severity",
              "Priority remediation plan",
              "Client-friendly PDF report",
              "Before/after support if fixes are required",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-4 text-zinc-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Free Scan
            </h2>

            <p className="mb-6 leading-7 text-zinc-300">
              A quick homepage scan that identifies common automated
              accessibility issues.
            </p>

            <ul className="mb-8 space-y-3 text-zinc-300">
              <li>Homepage only</li>
              <li>Automated axe-core scan</li>
              <li>Basic risk score</li>
              <li>Top issues summary</li>
              <li>Good for initial screening</li>
            </ul>

            <Link
              href="/ada-accessibility-scan"
              className="inline-flex rounded-xl border border-white/20 px-6 py-4 font-semibold text-white"
            >
              Run Free Scan
            </Link>
          </div>

          <div className="rounded-3xl border border-amber-400/30 bg-white/5 p-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Full ADA Audit
            </h2>

            <p className="mb-6 leading-7 text-zinc-300">
              A deeper review for practices that want a proper accessibility
              risk report and remediation plan.
            </p>

            <ul className="mb-8 space-y-3 text-zinc-300">
              <li>10–25 page review</li>
              <li>Automated and manual checks</li>
              <li>Forms and booking review</li>
              <li>PDF and accessibility statement check</li>
              <li>Professional PDF report</li>
            </ul>

           <Link
  href="/ada-accessibility-scan-full/request"
  className="inline-flex rounded-xl bg-amber-400 px-6 py-4 font-semibold text-black"
>
  Request Full Audit
</Link>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-7 text-zinc-500">
          Sitora does not provide legal advice and does not guarantee ADA
          compliance. Our audit identifies common WCAG-related accessibility
          issues and practical patient-access risks that may require review or
          remediation.
        </p>
      </section>
    </main>
  );
}