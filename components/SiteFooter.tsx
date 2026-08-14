import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { InstallAppButton } from "@/components/InstallAppButton";

const footerGroups = [
  {
    title: "Company",
    links: [
      ["Home", "/home"],
      ["Industries", "/industries"],
      ["Research", "/research"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Services",
    links: [
      ["Corporate Website Design", "/corporate-website-design"],
      ["Corporate Branding", "/corporate-branding"],
      ["SEO & Lead Generation", "/seo-lead-generation"],
      ["AI Readiness", "/ai-readiness"],
    ],
  },
  {
    title: "Intelligence",
    links: [
      ["Dental Control", "/dental-control"],
      ["Trust 360", "/trust-360"],
      ["Qatar Trust 360", "/qatar-trust-360"],
      ["Saudi & Gulf Innovation", "/research/saudi-gulf-innovation"],
    ],
  },
  {
    title: "Research",
    links: [
      ["Research Hub", "/research"],
      ["Saudi Dental Software 2026", "/research/saudi-dental-software-landscape-2026"],
      ["AI as the NHS Front Door", "/research/ai-as-the-nhs-front-door"],
      ["Methodology", "/research/methodology"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#020409] px-5 pb-8 pt-16 text-white sm:px-8 md:pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-[#d8b66d]/[0.06] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.018))] shadow-[0_30px_100px_rgba(0,0,0,.28)]">
          <div className="grid gap-10 p-7 sm:p-9 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:p-11">
            <div>
              <div className="sitora-eyebrow">
                <Sparkles className="h-4 w-4" />
                Sitora
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                Digital presence, intelligence and research built to carry authority.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/52 sm:text-base sm:leading-8">
                Sitora combines premium digital design with systems thinking, AI governance and independent research across healthcare, public policy and Saudi/Gulf innovation.
              </p>
            </div>

            <div className="lg:text-right">
              <p className="text-sm leading-7 text-white/42">Have a serious project, system problem or research challenge?</p>
              <Link href="/contact" className="sitora-button-primary mt-5 px-6 py-3.5 text-sm">
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid gap-9 p-7 sm:grid-cols-2 sm:p-9 lg:grid-cols-4 lg:p-11">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d8b66d]">{group.title}</h3>
                <div className="mt-5 grid gap-3">
                  {group.links.map(([label, href]) => (
                    <Link key={href} href={href} className="text-sm text-white/48 transition hover:text-white">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/[0.07] pt-7 text-sm text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>© {new Date().getFullYear()} Sitora. All rights reserved.</p>
            <a href="mailto:hello@sitora.co.uk" className="mt-2 inline-flex items-center gap-2 transition hover:text-white/70">
              <Mail className="h-3.5 w-3.5 text-[#d8b66d]" />
              hello@sitora.co.uk
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden text-xs uppercase tracking-[0.18em] text-white/22 sm:inline">United Kingdom · Saudi & Gulf focus</span>
            <InstallAppButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
