import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Passenger Assurance | Saudi Journey Intelligence",
  description: "A strategic concept for Saudi sovereign journey intelligence across airports, airlines, Hajj and Umrah operations.",
  alternates: { canonical: "/research/passenger-assurance-saudi" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07100f] text-white">
      <div className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
        <Link href="/research" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7acdc3]">← Sitora Research</Link>
        <div className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#d7b978]">Saudi & Gulf innovation · Strategic concept</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Passenger Assurance</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-white/55">Saudi sovereign journey intelligence for airports, airlines, Hajj and Umrah.</p>

        <section className="mt-12 rounded-3xl border border-[#2aa89a]/20 bg-[#2aa89a]/[0.05] p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-[#82d0c6]">Core principle</div>
          <p className="mt-3 text-2xl font-semibold leading-9 tracking-[-0.025em]">Saudi controls identity. Passenger Assurance controls journey intelligence.</p>
        </section>

        <section className="py-12 text-sm leading-8 text-white/55">
          <h2 className="mb-5 text-3xl font-semibold tracking-[-0.03em] text-white">The operating problem</h2>
          <p>Airports and airlines can know that a passenger has checked in, checked baggage or cleared a checkpoint while still lacking one continuously updated view of whether that passenger will reach the aircraft on time. The concept proposes a common journey model that combines authorised airport and airline events into a live operational state.</p>
        </section>

        <section className="border-t border-white/[0.07] py-12">
          <h2 className="text-3xl font-semibold tracking-[-0.03em]">What the proposed layer does</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">

            <a
  href="/downloads/Passenger_Assurance_Sovereign_Biometric_Report_Comms_Update.pdf"
  target="_blank"
  rel="noreferrer"
  className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.08] hover:text-white"
>
  Download full PDF
</a>

            {[
              ["Journey state", "Track where the passenger is against where they need to be in the airport journey."],
              ["Timing intelligence", "Estimate whether enough time remains to complete the journey before gate closure."],
              ["Intervention", "Turn risk into an operational action for staff rather than discovering failure at final boarding."],
              ["Common event model", "Normalise airline and airport events into one internal journey language."],
              ["Sovereign identity separation", "Use authorised journey events without requiring the journey layer to own biometric templates."],
              ["Multichannel communication", "Drive consistent passenger and staff instructions across approved channels."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                <h3 className="font-semibold text-white/85">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/48">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/[0.07] py-12 text-sm leading-8 text-white/55">
          <h2 className="mb-5 text-3xl font-semibold tracking-[-0.03em] text-white">Why Jeddah, Hajj and Umrah are a distinctive use case</h2>
          <p>High passenger volumes, multilingual journeys, group travel, elderly travellers, reduced-mobility needs and unfamiliar airport environments make early intervention particularly valuable. The concept is designed to support those operating conditions while keeping identity control with Saudi-approved infrastructure.</p>
        </section>

        <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d9bc7d]">Status and limitation</div>
          <p className="mt-3 text-sm leading-7 text-white/50">Passenger Assurance is a strategic system concept using illustrative and simulated examples. It is not presented as an existing live airport deployment or as a biometric identity provider.</p>
        </section>
      </div>
    </main>
  );
}
