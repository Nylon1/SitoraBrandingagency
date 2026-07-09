import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FileSearch,
  ShieldCheck,
  Upload,
} from "lucide-react";

const mappedBodies = [
  "ASA/CAP",
  "CMA",
  "ICO",
  "Trading Standards",
  "FCA",
  "GDC",
  "CQC",
  "SRA",
  "RCVS",
  "GOC",
];

const trustStats = [
  { label: "UK digital risk checks", value: "270+" },
  { label: "Sector rule packs", value: "5" },
  { label: "Core risk bodies", value: "10+" },
];



export default function Trust360LandingPage() {
  return (
    <main className="min-h-screen bg-[#03050a] text-white">
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,182,109,0.24),transparent_35%),linear-gradient(180deg,#03050a_0%,#07101d_52%,#03050a_100%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-8 inline-flex rounded-full border border-[#d8b66d]/30 bg-[#d8b66d]/10 px-4 py-2 text-sm text-[#f4dfaa]">
            Sitora Trust 360™ · Digital Claims & Trust Audit
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Upload. Scan. Get your digital trust verdict.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
                Sitora Trust 360 reviews a submitted page, uploaded screenshot
                or document, sector and region against advertising, privacy,
                consumer and sector-specific risk signals.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/trust-360/check"
                  className="inline-flex items-center justify-center rounded-full bg-[#d8b66d] px-7 py-4 font-semibold text-[#07101d] transition hover:bg-[#f0ce7b]"
                >
                  Run Free Exposure Check
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
                >
                  See how it works
                </a>
              </div>
<div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
  {trustStats.map((stat) => (
    <div
      key={stat.label}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
    >
      <p className="text-2xl font-semibold text-[#f4dfaa] sm:text-3xl">
        {stat.value}
      </p>
      <p className="mt-1 text-xs leading-5 text-white/50 sm:text-sm">
        {stat.label}
      </p>
    </div>
  ))}
</div>
             <p className="mt-5 max-w-2xl text-sm leading-6 text-white/50">
  UK-first scanner mapped against 270+ advertising, privacy, consumer,
  finance, dental, healthcare, legal and aesthetics risk checks. Verdicts
  are based only on submitted evidence. This is not legal advice and does
  not guarantee compliance.
</p>
            </div>



            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] border border-[#d8b66d]/20 bg-[#07101d]/80 p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-[#d8b66d]/15 p-3 text-[#d8b66d]">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Example verdict</p>
                    <h2 className="text-2xl font-semibold">Medium Risk</h2>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-white/60">Trust Score</span>
                    <span className="font-semibold text-[#f4dfaa]">64/100</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[64%] rounded-full bg-[#d8b66d]" />
                  </div>
                </div>

                <div className="space-y-3 text-sm text-white/72">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    Unsupported advertising claim detected
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    Pricing or offer terms may need clearer conditions
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    Sector-specific wording may require stronger evidence
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="how-it-works"
            className="mt-20 grid gap-5 md:grid-cols-3"
          >
            {[
              {
                icon: Upload,
                title: "Upload evidence",
                text: "Submit a screenshot, advert, social post, flyer, PDF, price list or claim.",
              },
              {
                icon: FileSearch,
                title: "Enter the page",
                text: "Add the exact page URL you want reviewed, such as a treatment, pricing or offer page.",
              },
              {
                icon: BadgeCheck,
                title: "Receive a verdict",
                text: "Get a score, risk level, mapped bodies, top issues and next steps.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <item.icon className="mb-5 h-8 w-8 text-[#d8b66d]" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/62">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
              Regulator-mapped risk areas
            </p>

            <div className="flex flex-wrap gap-3">
              {mappedBodies.map((body) => (
                <span
                  key={body}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/72"
                >
                  {body}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}