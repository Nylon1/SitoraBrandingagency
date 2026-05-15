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
  Stethoscope,
} from "lucide-react";

const branches = [
  {
    name: "Sitora Digital",
    text: "Premium websites, branding and SEO.",
    icon: Building2,
  },
  {
    name: "Sitora Dental",
    text: "Growth websites for dental practices.",
    icon: Stethoscope,
  },
  {
    name: "Sitora Healthcare",
    text: "Digital presence for clinics and healthcare brands.",
    icon: HeartPulse,
  },
  {
    name: "Sitora Corporate",
    text: "Executive websites for CEOs and high-profile people.",
    icon: BriefcaseBusiness,
  },
  {
    name: "Sitora AI",
    text: "AI assistants, automation and smart lead systems.",
    icon: BrainCircuit,
  },
];

const tickerItems = [
  "Sitora Digital",
  "Sitora Dental",
  "Sitora Healthcare",
  "Sitora Corporate",
  "Sitora AI",
];

export default function SitoraGateway() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03050a] text-white">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/sitora-global-poster.jpg"
      >
        <source src="/videos/sitora-global.mp4" type="video/mp4" />
      </video>

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(216,182,109,0.24),transparent_30%),linear-gradient(180deg,rgba(3,5,10,0.62)_0%,rgba(3,5,10,0.88)_62%,#03050a_100%)]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.09]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:58px_58px] sm:bg-[size:76px_76px]" />
      </div>

      {/* Soft glow */}
      <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-[#d8b66d]/20 blur-[90px] sm:top-20 sm:h-72 sm:w-72 sm:blur-[110px]" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-full max-w-6xl flex-col items-center text-center"
        >
          {/* Logo */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#d8b66d]/30 bg-[#05070d] shadow-2xl shadow-[#d8b66d]/20 sm:h-16 sm:w-16">
            <Image
              src="/android-chrome-192x192.png"
              alt="Sitora logo"
              width={64}
              height={64}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <p className="mx-auto max-w-2xl text-[10px] font-bold uppercase tracking-[0.28em] text-[#d8b66d] sm:text-sm sm:tracking-[0.45em]">
            Global Web & Corporate Branding Agency
          </p>

          <h1 className="mt-3 text-5xl font-semibold leading-none tracking-[-0.08em] text-white drop-shadow-2xl sm:mt-5 sm:text-8xl lg:text-9xl">
            Sitora
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-base font-semibold leading-7 text-white/88 sm:mt-5 sm:max-w-3xl sm:text-2xl sm:leading-10">
            One digital house. Specialist branches. Global ambition.
          </p>

          <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-white/56 sm:mt-3 sm:max-w-2xl sm:text-base sm:leading-7">
            Premium websites, branding, SEO platforms and AI-powered systems
            for ambitious businesses.
          </p>

          {/* Mobile branch ticker */}
          <div className="mt-6 w-full max-w-sm overflow-hidden border-y border-white/10 py-3 sm:hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex w-max items-center gap-5 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.24em] text-[#d8b66d]"
            >
              {[...tickerItems, ...tickerItems, ...tickerItems].map(
                (item, index) => (
                  <div key={`${item}-${index}`} className="flex items-center gap-5">
                    <span>{item}</span>
                    <span className="text-white/28">·</span>
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* Desktop branch cards */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-8 hidden w-full max-w-5xl gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-5"
          >
            {branches.map((branch, index) => {
              const Icon = branch.icon;

              return (
                <motion.div
                  key={branch.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.35 + index * 0.06,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-4 text-left shadow-2xl backdrop-blur-xl transition duration-300 hover:border-[#d8b66d]/45 hover:bg-white/[0.075]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b66d]/70 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8b66d]/25 bg-[#d8b66d]/10 text-[#d8b66d] shadow-[0_0_30px_rgba(216,182,109,0.14)]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2 className="text-sm font-semibold tracking-tight text-white">
                    {branch.name}
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-white/52">
                    {branch.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/42 sm:mt-7 sm:gap-2 sm:text-xs sm:tracking-[0.22em]">
            <span>Websites</span>
            <span className="text-[#d8b66d]/60">·</span>
            <span>Branding</span>
            <span className="text-[#d8b66d]/60">·</span>
            <span>SEO</span>
            <span className="text-[#d8b66d]/60">·</span>
            <span>AI Systems</span>
          </div>

          {/* CTA */}
          <div className="mt-5 flex justify-center sm:mt-6">
            <Link
              href="/home"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 text-xs font-bold uppercase tracking-[0.24em] text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:-translate-y-1 hover:bg-[#f2cf83] hover:shadow-[#d8b66d]/35 sm:gap-4 sm:px-12 sm:py-5 sm:text-sm sm:tracking-[0.32em]"
            >
              Enter Site
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1 sm:h-6 sm:w-6" />
            </Link>
          </div>

          <div className="mx-auto mt-5 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#d8b66d]/50 to-transparent sm:mt-8" />

          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/38 sm:mt-5 sm:text-sm sm:tracking-[0.35em]">
            Manchester · London · New York · Dubai
          </p>
        </motion.div>
      </section>
    </main>
  );
}