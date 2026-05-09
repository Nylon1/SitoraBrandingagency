"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SitoraGateway() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03050a] text-white">
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,182,109,0.22),transparent_32%),linear-gradient(180deg,rgba(3,5,10,0.58)_0%,rgba(3,5,10,0.84)_62%,#03050a_100%)]" />

      <div className="absolute inset-0 opacity-[0.10]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:76px_76px]" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
       <motion.div
  initial={{ opacity: 0, y: 24, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  className="mx-auto max-w-5xl text-center"
>
  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#d8b66d]/30 bg-[#05070d] shadow-2xl shadow-[#d8b66d]/20">
    <Image
      src="/android-chrome-192x192.png"
      alt="Sitora logo"
      width={64}
      height={64}
      className="h-full w-full object-cover"
      priority
    />
  </div>

  <p className="mx-auto max-w-2xl text-xs font-bold uppercase tracking-[0.45em] text-[#d8b66d] sm:text-sm">
    Global Web & Corporate Branding Agency
  </p>

          <h1 className="mt-6 text-7xl font-semibold leading-none tracking-[-0.08em] text-white drop-shadow-2xl sm:text-8xl lg:text-9xl">
            Sitora
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-white/72 sm:text-2xl sm:leading-10">
            Premium websites, corporate branding and SEO-focused digital
            platforms for ambitious businesses.
          </p>

          <div className="mt-12 flex justify-center">
            <Link
              href="/home"
              className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#d8b66d] px-12 py-5 text-sm font-bold uppercase tracking-[0.32em] text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83] sm:text-base"
            >
              Enter Site
              <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mx-auto mt-12 h-px max-w-xs bg-gradient-to-r from-transparent via-[#d8b66d]/50 to-transparent" />

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/38 sm:text-sm">
            London · New York · Dubai · Worldwide
          </p>
        </motion.div>
      </section>
    </main>
  );
}