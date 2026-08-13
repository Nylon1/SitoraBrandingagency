import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Saudi & Gulf Innovation Research | Sitora",
  description:
    "Sitora research and strategic concepts focused on Saudi Arabia and the Gulf, including dental technology, digital infrastructure and journey intelligence.",
  alternates: { canonical: "/research/saudi-gulf-innovation" },
  robots: { index: true, follow: true },
};

const items = [
  {
    title: "Saudi Dental Software Landscape 2026",
    text: "A review of what existing dental systems already cover and where orchestration, NPHIES workflow and cross-system episode assurance may create the next opportunity.",
    href: "/research/saudi-dental-software-landscape-2026",
  },
  {
    title: "Passenger Assurance",
    text: "A Saudi sovereign journey-intelligence concept for airports, airlines, Hajj and Umrah that separates identity control from operational journey intelligence.",
    href: "/research/passenger-assurance-saudi",
  },
  {
    title: "Sitora Dental Control",
    text: "A public prototype demonstrating branch intelligence, chair economics, claims risk, governance and accountable actions using synthetic data.",
    href: "/dental-control",
  },
];

export default function SaudiGulfInnovationPage() {
  return (
    <main className="min-h-screen bg-[#06110f] text-white">
      <header className="border-b border-white/[0.07] bg-[radial-gradient(circle_at_78%_0%,rgba(196,154,83,0.12),transparent_34%)]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Link href="/research" className="text-sm font-medium text-[#7acdc3]">← Sitora Research</Link>
          <div className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-[#d9ba79]">Saudi & Gulf Innovation</div>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            Research into the operating layers that can connect complex Saudi systems.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/55 md:text-lg">
            These papers focus on opportunities where strong national infrastructure and capable incumbent systems already exist, but coordination, assurance and accountable action can still fragment across organisations and technology layers.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 transition hover:border-[#c49a53]/30 hover:bg-white/[0.04]">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] group-hover:text-[#e0c386]">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/50">{item.text}</p>
              <div className="mt-6 text-sm font-semibold text-[#d6b878]">Explore →</div>
            </Link>
          ))}
        </div>

        <section className="mt-14 border-t border-white/[0.07] pt-10">
          <h2 className="text-xl font-semibold">A consistent design principle</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/50">
            The recurring thesis is to connect before replacing. Where trusted infrastructure already exists, the first product should usually improve visibility, coordination and action across systems rather than recreate every underlying function.
          </p>
        </section>
      </section>
    </main>
  );
}
