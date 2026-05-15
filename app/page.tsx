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
    text: "Premium websites, branding and SEO for all types of professions.",
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,182,109,0.22),transparent_32%),linear-gradient(180deg,rgba(3,5,10,0.58)_0%,rgba(3,5,10,0.84)_62%,#03050a_100%)]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.10]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:76px_76px]" />
      </div>

      {/* Soft glow */}
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d8b66d]/20 blur-[110px]" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-full max-w-6xl flex-col items-center text-center"
        >
          {/* Logo */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#d8b66d]/30 bg-[#05070d] shadow-2xl shadow-[#d8b66d]/20">
            <Image
              src="/android-chrome-192x192.png"
              alt="Sitora logo"
              width={64}
              height={64}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <p className="mx-auto max-w-2xl text-xs font-bold uppercase tracking-[0.38em] text-[#d8b66d] sm:text-sm sm:tracking-[0.45em]">
            Global Web & Corporate Branding Agency
          </p>

          <h1 className="mt-5 text-6xl font-semibold leading-none tracking-[-0.08em] text-white drop-shadow-2xl sm:text-8xl lg:text-9xl">
            Sitora
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-xl font-semibold leading-8 text-white/86 sm:text-2xl sm:leading-10">
            One digital house. Specialist branches. Global ambition.
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-white/55 sm:text-base">
            Premium websites, corporate branding, SEO-focused platforms and
            AI-powered systems for ambitious businesses.
          </p>

          {/* Branch cards */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-8 grid w-full max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-5"
          >
            {branches.map((branch, index) => {
              const Icon = branch.icon;

              return (
                <motion.div
                  key={branch.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.45 + index * 0.08,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
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

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/home"
              className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#d8b66d] px-10 py-4 text-xs font-bold uppercase tracking-[0.28em] text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:-translate-y-1 hover:bg-[#f2cf83] hover:shadow-[#d8b66d]/35 sm:px-12 sm:py-5 sm:text-sm sm:tracking-[0.32em]"
            >
              Enter Site
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1 sm:h-6 sm:w-6" />
            </Link>
          </div>

          <div className="mx-auto mt-8 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#d8b66d]/50 to-transparent" />

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/38 sm:text-sm sm:tracking-[0.35em]">
            Manchester · London · New York · Dubai
          </p>
        </motion.div>
      </section>
    </main>
  );
}