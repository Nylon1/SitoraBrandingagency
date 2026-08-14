"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/home" },
  {
    label: "Services",
    href: "/corporate-website-design",
    children: [
      { label: "Web Design", href: "/corporate-website-design" },
      { label: "Branding", href: "/corporate-branding" },
      { label: "SEO & Leads", href: "/seo-lead-generation" },
      { label: "Packages", href: "/brand-identity-packages" },
      { label: "DeckStudio", href: "/deckstudio" },
      { label: "Accessibility Scans", href: "/ada-accessibility-scan-full" },
    ],
  },
  {
    label: "Intelligence",
    href: "/ai-readiness",
    children: [
      { label: "AI Readiness Audit", href: "/ai-readiness" },
      { label: "Trust 360", href: "/trust-360" },
      { label: "Qatar Trust 360", href: "/qatar-trust-360" },
      { label: "Dental Control", href: "/dental-control" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Research Hub", href: "/research" },
      { label: "Saudi Dental Software 2026", href: "/research/saudi-dental-software-landscape-2026" },
      { label: "AI as the NHS Front Door", href: "/research/ai-as-the-nhs-front-door" },
      { label: "Research Methodology", href: "/research/methodology" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "All Industries", href: "/industries" },
      { label: "Dental Clinics", href: "/industries/dental-clinics" },
      { label: "Healthcare Clinics", href: "/industries/healthcare-clinics" },
      { label: "Celebrities & Athletes", href: "/websites-for-celebrities-athletes" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto max-w-7xl rounded-[1.4rem] border border-white/[0.09] bg-[#05070d]/78 shadow-[0_16px_60px_rgba(0,0,0,.28)] backdrop-blur-2xl">
        <div className="flex min-h-[68px] items-center justify-between gap-4 px-4 sm:px-5">
          <Link href="/home" className="group flex shrink-0 items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#d8b66d]/25 bg-[#06080e] shadow-[0_0_30px_rgba(216,182,109,.08)] transition group-hover:border-[#d8b66d]/50">
              <Image
                src="/android-chrome-192x192.png"
                alt="Sitora logo"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-[-0.03em] text-white">Sitora</span>
              <span className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35 sm:block">Digital · Intelligence · Research</span>
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-1 text-[13px] font-medium text-white/68 xl:flex">
            {navItems.map((item) => (
              <div key={item.label} className="group relative">
                {item.children ? (
                  <>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-2 transition hover:bg-white/[0.055] hover:text-white"
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition duration-200 group-hover:rotate-180" />
                    </Link>
                    <div className="invisible absolute left-0 top-full z-50 mt-3 w-72 translate-y-2 rounded-2xl border border-white/10 bg-[#080b12]/96 p-2 opacity-0 shadow-2xl shadow-black/45 backdrop-blur-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="mb-1 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8b66d]">{item.label}</div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3 py-3 text-sm text-white/68 transition hover:bg-white/[0.06] hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-white/[0.055] hover:text-white"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden shrink-0 xl:flex">
            <Link
              href="/contact"
              className="sitora-button-primary px-5 py-2.5 text-sm"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white xl:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border-t border-white/[0.08] px-3 pb-3 pt-3 xl:hidden"
            >
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/[0.07] bg-white/[0.025]">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3.5 text-sm font-semibold text-white"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="grid grid-cols-1 gap-1 border-t border-white/[0.07] p-2 sm:grid-cols-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2.5 text-sm text-white/56 transition hover:bg-white/[0.05] hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="sitora-button-primary mt-1 px-5 py-3.5 text-sm"
                >
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
