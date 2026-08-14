"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  HeartPulse,
  Microscope,
  Stethoscope,
} from "lucide-react";

const branches = [
  {
    name: "Sitora Digital",
    text: "Premium websites, corporate branding and SEO-led digital platforms.",
    icon: Building2,
    href: "/home",
  },
  {
    name: "Sitora Dental",
    text: "Digital systems, research and operating intelligence for dentistry.",
    icon: Stethoscope,
    href: "/dental-control",
  },
  {
    name: "Sitora Healthcare",
    text: "Trust, accessibility, patient experience and healthcare innovation.",
    icon: HeartPulse,
    href: "/industries/healthcare-clinics",
  },
  {
    name: "Sitora Intelligence",
    text: "AI governance, assurance, audits and decision-support concepts.",
    icon: BrainCircuit,
    href: "/ai-readiness",
  },
  {
    name: "Sitora Research",
    text: "Independent research across systems, policy and Saudi/Gulf innovation.",
    icon: Microscope,
    href: "/research",
  },
  {
    name: "Sitora Corporate",
    text: "Executive-grade positioning for organisations and public-facing leaders.",
    icon: BriefcaseBusiness,
    href: "/corporate-branding",
  },
];

export default function SitoraGateway() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020409] text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/sitora-global-poster.jpg"
      >
        <source src="/videos/sitora-global.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(216,182,109,.19),transparent_30%),radial-gradient(circle_at_82%_34%,rgba(65,105,225,.12),transparent_30%),linear-gradient(180deg,rgba(2,4,9,.68)_0%,rgba(2,4,9,.92)_56%,#020409_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:80px_80px]" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-10 pt-12 sm:px-8 lg:pb-16 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#d8b66d]/25 bg-[#06080e] shadow-[0_0_60px_rgba(216,182,109,.12)] sm:h-16 sm:w-16">
            <Image
              src="/android-chrome-192x192.png"
              alt="Sitora logo"
              width={64}
              height={64}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="mt-7 text-[10px] font-bold uppercase tracking-[0.28em] text-[#d8b66d] sm:text-xs sm:tracking-[0.34em]">
            Digital · Intelligence · Research
          </div>

          <h1 className="mt-5 text-6xl font-semibold leading-[.9] tracking-[-.075em] sm:text-8xl lg:text-[8.5rem]">
            Sitora
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-white/78 sm:text-2xl sm:leading-10">
            One digital house for ambitious organisations, high-trust systems and serious ideas.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/46 sm:text-base sm:leading-8">
            We combine premium digital design with systems thinking, healthcare innovation, AI governance and independent research.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/home" className="sitora-button-primary px-7 py-3.5 text-sm">
              Enter Sitora <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/research" className="sitora-button-secondary px-7 py-3.5 text-sm font-semibold">
              Explore research
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .16, duration: .7 }}
          className="mx-auto mt-12 grid w-full max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {branches.map((branch, index) => {
            const Icon = branch.icon;
            return (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .24 + index * .055, duration: .42 }}
              >
                <Link
                  href={branch.href}
                  className="group block h-full rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-5 shadow-[0_18px_55px_rgba(0,0,0,.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#d8b66d]/25 hover:bg-white/[0.055] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8b66d]/20 bg-[#d8b66d]/[0.08] text-[#d8b66d]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/20 transition group-hover:translate-x-1 group-hover:text-[#d8b66d]" />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold tracking-[-0.025em] text-white">{branch.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/43">{branch.text}</p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mx-auto mt-10 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#d8b66d]/30 to-transparent" />
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/28 sm:text-xs">
          <span>United Kingdom</span><span className="text-[#d8b66d]/45">·</span>
          <span>Saudi Arabia</span><span className="text-[#d8b66d]/45">·</span>
          <span>Gulf Region</span><span className="text-[#d8b66d]/45">·</span>
          <span>Global</span>
        </div>
      </section>
    </main>
  );
}
