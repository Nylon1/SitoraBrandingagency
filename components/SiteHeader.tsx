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
    label: "AI Audit",
    href: "/ai-readiness",
    children: [
      { label: "AI Readiness Audit", href: "/ai-readiness" },
      { label: "NHS AI Trust Report", href: "/nhs-ai-trust-report" },
    ],
  },

  {
    label: "Trust 360",
    href: "/trust-360",
    children: [
      { label: "UK Trust 360", href: "/trust-360" },
      { label: "Run Free Exposure Check", href: "/trust-360/check" },
      { label: "Qatar Trust 360", href: "/qatar-trust-360" },
    ],
  },
{
  label: "Free Tools",
  href: "/tools",
  children: [
    {
      label: "QR Code Generator",
      href: "/tools/qr-code-generator",
    },
 
    {
      label: "LinkedIn Coach (HumanSignal)",
      href: "/tools/human-signal",
    },
  ],
},

  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Professions", href: "/industries" },
      {
        label: "Celebrities & Athletes",
        href: "/websites-for-celebrities-athletes",
      },
    ],
  },

  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#03050a]/75 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
        <Link href="/home" className="flex shrink-0 items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-[#d8b66d]/30 bg-[#05070d] shadow-lg shadow-[#d8b66d]/20">
            <Image
              src="/android-chrome-192x192.png"
              alt="Sitora logo"
              width={44}
              height={44}
              className="h-full w-full object-cover"
              priority
            />
          </span>

          <span className="text-xl font-semibold tracking-tight text-white">
            Sitora
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center justify-center gap-2 text-sm font-medium text-white/70 lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              {item.children ? (
                <>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 rounded-full px-4 py-2 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                  </Link>

                  <div className="invisible absolute left-0 top-full z-50 mt-3 w-72 translate-y-2 rounded-2xl border border-white/10 bg-[#05070d]/95 p-2 opacity-0 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.07] hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-4 py-2 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/trust-360/check"
            className="inline-flex items-center gap-2 rounded-full border border-[#d8b66d]/45 px-5 py-2.5 text-sm font-semibold text-[#d8b66d] transition hover:bg-[#d8b66d] hover:text-[#070910]"
          >
            Book Discovery Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="border-t border-white/10 bg-[#03050a]/95 px-5 py-5 backdrop-blur-2xl lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-3">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035]"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-5 py-4 text-sm font-semibold text-white transition hover:text-[#d8b66d]"
                  >
                    {item.label}
                  </Link>

                  {item.children && (
                    <div className="border-t border-white/10 px-3 pb-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-xl px-4 py-3 text-sm font-medium text-white/65 transition hover:bg-white/[0.06] hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/trust-360/check"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d8b66d] px-5 py-4 text-sm font-bold text-[#070910] transition hover:bg-[#f2cf83]"
              >
                Run Free Exposure Check <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}