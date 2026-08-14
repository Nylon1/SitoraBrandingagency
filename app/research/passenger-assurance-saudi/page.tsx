import type { Metadata } from "next";
import Link from "next/link";

const title = "Passenger Assurance | Saudi Journey Intelligence";
const description =
  "A strategic concept for Saudi sovereign journey intelligence across airports, airlines, Hajj and Umrah operations.";
const url = "https://sitora.co.uk/research/passenger-assurance-saudi";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/research/passenger-assurance-saudi" },
  openGraph: {
    title: "Passenger Assurance",
    description,
    url,
    siteName: "Sitora",
    type: "article",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passenger Assurance",
    description,
  },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Passenger Assurance: Saudi Sovereign Journey Intelligence",
  description,
  datePublished: "2026-08-13",
  dateModified: "2026-08-14",
  author: { "@type": "Organization", name: "Sitora" },
  publisher: { "@type": "Organization", name: "Sitora" },
  mainEntityOfPage: url,
  url,
  about: [
    "Airport operations",
    "Passenger journey intelligence",
    "Hajj and Umrah travel",
    "Saudi digital infrastructure",
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07100f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
        <Link
          href="/research"
          className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7acdc3]"
        >
          ← Sitora Research
        </Link>
        <div className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#d7b978]">
          Saudi & Gulf innovation · Strategic concept
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
          Passenger Assurance
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-white/55">
          Saudi sovereign journey intelligence for airports, airlines, Hajj and Umrah.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/downloads/Passenger_Assurance_Sovereign_Biometric_Report_Comms_Update.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-[#2aa89a] px-5 py-3 text-sm font-semibold text-[#04110f]"
          >
            Download full PDF
          </a>
          <Link
            href="/research/saudi-gulf-innovation"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70"
          >
            Saudi & Gulf research
          </Link>
        </div>

        <section className="mt-12 rounded-3xl border border-[#2aa89a]/20 bg-[#2aa89a]/[0.05] p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-[#82d0c6]">
            Core principle
          </div>
          <p className="mt-3 text-2xl font-semibold leading-9 tracking-[-0.025em]">
            Saudi controls identity. Passenger Assurance controls journey intelligence.
          </p>
        </section>

        <section className="py-12 text-sm leading-8 text-white/55">
          <h2 className="mb-5 text-3xl font-semibold tracking-[-0.03em] text-white">
            The operating problem
          </h2>
          <p>
            Airports and airlines can know that a passenger has checked in, checked baggage or cleared a checkpoint while still lacking one continuously updated view of whether that passenger will reach the aircraft on time. The concept proposes a common journey model that combines authorised airport and airline events into a live operational state.
          </p>
        </section>

        <section className="border-t border-white/[0.07] py-12">
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">
            What the proposed layer does
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              ["Journey state", "Track where the passenger is against where they need to be in the airport journey."],
              ["Timing intelligence", "Estimate whether enough time remains to complete the journey before gate closure."],
              ["Intervention", "Turn risk into an operational action for staff rather than discovering failure at final boarding."],
              ["Common event model", "Normalise airline and airport events into one internal journey language."],
              ["Sovereign identity separation", "Use authorised journey events without requiring the journey layer to own biometric templates."],
              ["Multichannel communication", "Drive consistent passenger and staff instructions across approved channels."],
            ].map(([itemTitle, body]) => (
              <div
                key={itemTitle}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
              >
                <h3 className="font-semibold text-white/85">{itemTitle}</h3>
                <p className="mt-2 text-sm leading-7 text-white/48">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/[0.07] py-12 text-sm leading-8 text-white/55">
          <h2 className="mb-5 text-3xl font-semibold tracking-[-0.03em] text-white">
            Why Jeddah, Hajj and Umrah are a distinctive use case
          </h2>
          <p>
            High passenger volumes, multilingual journeys, group travel, elderly travellers, reduced-mobility needs and unfamiliar airport environments make early intervention particularly valuable. The concept is designed to support those operating conditions while keeping identity control with Saudi-approved infrastructure.
          </p>
        </section>

        <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d9bc7d]">
            Status and limitation
          </div>
          <p className="mt-3 text-sm leading-7 text-white/50">
            Passenger Assurance is a strategic system concept using illustrative and simulated examples. It is not presented as an existing live airport deployment or as a biometric identity provider.
          </p>
        </section>

        <section className="mt-14 rounded-3xl border border-[#2aa89a]/20 bg-[#2aa89a]/[0.055] p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Related Sitora research</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/research/saudi-dental-software-landscape-2026" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/65">
              Saudi Dental Software Landscape
            </Link>
            <Link href="/research/saudi-gulf-innovation" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/65">
              Saudi & Gulf Innovation
            </Link>
            <Link href="/research" className="rounded-xl bg-[#2aa89a] px-4 py-2.5 text-sm font-semibold text-[#04110f]">
              All research
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
