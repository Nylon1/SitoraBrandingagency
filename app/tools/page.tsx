import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Lightbulb,
  QrCode,
  Sparkles,
  UserRoundSearch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Business Tools | Sitora",
  description:
    "Explore Sitora's free digital tools for healthcare content, LinkedIn writing, branded QR codes and practical business assets.",
  alternates: { canonical: "/tools" },
  robots: { index: true, follow: true },
};

const tools = [
  {
    title: "LinkedIn Coach",
    description:
      "Use HumanSignal to sharpen LinkedIn posts, improve clarity and make professional content sound more natural and credible.",
    href: "/tools/human-signal",
    status: "Live",
    action: "Open HumanSignal",
    icon: UserRoundSearch,
  },
  {
    title: "Healthcare Post Ideas",
    description:
      "Browse 1,500 social media ideas for dentists, opticians and healthcare startups. Search, filter, save and copy ideas without signing up.",
    href: "/tools/healthcare-post-ideas",
    status: "Live",
    action: "Explore ideas",
    icon: Lightbulb,
  },
  {
    title: "QR Code Generator",
    description:
      "Create branded, high-resolution QR codes with custom colours, patterns, corners, frames and your logo.",
    href: "/tools/qr-code-generator",
    status: "Live",
    action: "Open generator",
    icon: QrCode,
  },
  {
    title: "Appointment Card Generator",
    description:
      "Create professional appointment reminder cards for dental practices, clinics and service businesses.",
    href: "/tools/appointment-card-generator",
    status: "Coming soon",
    action: "Coming soon",
    icon: CalendarDays,
  },
  {
    title: "Business Card Generator",
    description:
      "Design clean, branded business cards with your contact details, logo and QR code.",
    href: "/tools/business-card-generator",
    status: "Coming soon",
    action: "Coming soon",
    icon: BriefcaseBusiness,
  },
];

export default function ToolsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03050a] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#d8b66d]/12 blur-[140px]" />
        <div className="absolute bottom-[-10rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-blue-500/[0.07] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <section className="relative z-10 px-5 pb-28 pt-36 sm:px-8 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8b66d]/20 bg-[#d8b66d]/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#e9ca82]">
              <Sparkles className="h-4 w-4" />
              Sitora Tools
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Useful digital tools. No unnecessary friction.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/52 sm:text-lg">
              Practical tools for content, communication and branded business assets. Built to be useful first, with no complicated setup.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const live = tool.status === "Live";

              return (
                <article
                  key={tool.title}
                  className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d8b66d]/25 hover:bg-white/[0.05] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/[0.08] text-[#d8b66d]">
                      <Icon className="h-5 w-5" />
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${
                        live
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-white/[0.05] text-white/32"
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>

                  <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">
                    {tool.title}
                  </h2>

                  <p className="mt-4 min-h-24 text-sm leading-7 text-white/45">
                    {tool.description}
                  </p>

                  {live ? (
                    <Link
                      href={tool.href}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#e5c47c] transition group-hover:text-[#f4d996]"
                    >
                      {tool.action}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <span className="mt-7 inline-flex text-sm font-medium text-white/30">
                      In development
                    </span>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-16 grid gap-8 rounded-[30px] border border-white/[0.08] bg-white/[0.03] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">
                Built by Sitora
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Need something more specific?
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/48">
                Sitora designs digital platforms, workflow tools and customer journeys for organisations that need something beyond an off-the-shelf product.
              </p>
            </div>

            <Link href="/contact" className="sitora-button-primary px-6 py-3.5 text-sm">
              Discuss a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
