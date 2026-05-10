"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/home" },
  { label: "Web Design", href: "/corporate-website-design" },
  { label: "Branding", href: "/corporate-branding" },
  { label: "Celebrities & Athletes", href: "/websites-for-celebrities-athletes" },
  { label: "SEO & Leads", href: "/seo-lead-generation" },
  { label: "Process", href: "/process" },
  { label: "Professions", href: "/industries" },
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

        <nav className="hidden items-center justify-center gap-7 text-sm font-medium text-white/62 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
  href="/contact"
  className="inline-flex items-center gap-2 rounded-full border border-[#d8b66d]/45 px-5 py-2.5 text-sm font-semibold text-[#d8b66d] transition hover:bg-[#d8b66d] hover:text-[#070910]"
>
  Start Project Brief <ArrowRight className="h-4 w-4" />
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="border-t border-white/10 bg-[#03050a]/95 px-5 py-5 backdrop-blur-2xl lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm font-semibold text-white/76 transition hover:bg-white/[0.07] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/contact"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d8b66d] px-5 py-4 text-sm font-bold text-[#070910] transition hover:bg-[#f2cf83]"
              >
                Start Project Brief <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}