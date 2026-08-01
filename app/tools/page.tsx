import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Lightbulb,
  QrCode,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Business Tools | Sitora",
  description:
    "Explore Sitora's free digital tools for healthcare content, branded QR codes and practical business assets.",
};

const tools = [
  {
    title: "Healthcare Post Ideas",
    description:
      "Browse 500 social media content ideas for dentists across ten categories. Search, filter, save and copy ideas without signing up.",
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
        <div className="absolute left-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#d8b66d]/15 blur-[140px]" />
        <div className="absolute bottom-[-10rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <section className="relative z-10 px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8b66d]/25 bg-[#d8b66d]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#e9ca82]">
              <Sparkles className="h-4 w-4" />
              Sitora Free Tools
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Useful tools for{" "}
              <span className="bg-gradient-to-r from-[#f2d395] via-[#d8b66d] to-[#fff0c5] bg-clip-text text-transparent">
                ambitious businesses.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/52 sm:text-lg">
              Find content ideas and create polished digital assets without
              needing specialist software.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const live = tool.status === "Live";

              return (
                <article
                  key={tool.title}
                  className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#d8b66d]/35 hover:bg-white/[0.065] sm:p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b66d]/70 to-transparent opacity-0 transition group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[#d8b66d]/25 bg-[#d8b66d]/10 text-[#d8b66d]">
                      <Icon className="h-6 w-6" />
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${
                        live
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-white/[0.06] text-white/35"
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>

                  <h2 className="mt-8 text-2xl font-semibold tracking-tight">
                    {tool.title}
                  </h2>

                  <p className="mt-4 min-h-28 text-sm leading-7 text-white/45">
                    {tool.description}
                  </p>

                  {live ? (
                    <Link
                      href={tool.href}
                      className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-6 py-3 text-sm font-bold text-[#080a0f] transition hover:bg-[#f1cf86]"
                    >
                      {tool.action}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="mt-8 inline-flex items-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/35">
                      {tool.action}
                    </span>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-16 rounded-[30px] border border-[#d8b66d]/20 bg-[#d8b66d]/[0.07] px-6 py-10 text-center sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">
              Built by Sitora
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Need something more bespoke?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/50">
              Sitora creates websites, booking systems, customer journeys and
              custom software for ambitious organisations.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#d8b66d]/30 bg-[#d8b66d]/10 px-7 py-4 text-sm font-bold text-[#e9ca82] transition hover:bg-[#d8b66d]/16"
            >
              Discuss a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
