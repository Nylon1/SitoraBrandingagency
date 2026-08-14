"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Fingerprint,
  Layers3,
  MessageSquareText,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const pillars = [
  { icon: Fingerprint, title: "Positioning", text: "Define what the business should stand for, who it is for and why it deserves attention." },
  { icon: MessageSquareText, title: "Messaging", text: "Turn strategy into language that is clear, credible and easy to carry across every touchpoint." },
  { icon: Palette, title: "Identity", text: "Build a visual system with typography, colour, hierarchy and direction that feels intentional." },
  { icon: Layers3, title: "Application", text: "Carry the brand into websites, decks, proposals, campaigns and future digital products." },
];

const process = [
  ["01", "Discover", "Business, audience, market, competitors and current perception."],
  ["02", "Position", "Core proposition, differentiation and the level of market you want to occupy."],
  ["03", "Design", "Visual language, typography, colour, layout and digital expression."],
  ["04", "Apply", "Website, sales materials and the repeatable system behind future assets."],
];

export default function CorporateBrandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03050a] text-white">
      <section className="relative border-b border-white/[0.07] px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(216,182,109,.17),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(124,92,255,.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="sitora-kicker"><Sparkles className="h-4 w-4" /> Corporate Branding</div>
            <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-7xl xl:text-[5.6rem]">Build a brand that feels as strong as the business behind it.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl sm:leading-9">Sitora combines positioning, messaging and visual identity into a practical digital brand system built for serious growth.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="sitora-button-primary px-6 py-3.5">Start a branding project <ArrowRight className="h-4 w-4" /></a>
              <a href="#system" className="sitora-button-secondary px-6 py-3.5">See the brand system</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12, duration: .7 }} className="sitora-panel relative overflow-hidden p-7 sm:p-9">
            <div className="absolute right-[-15%] top-[-20%] h-60 w-60 rounded-full bg-[#d8b66d]/10 blur-3xl" />
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-[.2em] text-[#d8b66d]">Brand architecture</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em]">From perception to system.</h2>
              <div className="mt-8 space-y-3">
                {["What do you stand for?", "Why should people believe you?", "What should the business feel like?", "How does that stay consistent as you grow?"].map((item, i) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8b66d]/25 text-xs font-semibold text-[#d8b66d]">0{i + 1}</span>
                    <span className="text-sm text-white/72">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/[0.06] p-5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
                <p className="text-sm leading-7 text-white/58">No invented brand scores or cosmetic theatre. The work is judged by clarity, consistency and how well the identity supports the business.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="system" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="sitora-kicker">The system</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Branding that goes beyond a logo.</h2>
            <p className="mt-5 text-lg leading-8 text-white/55">A strong identity connects what the company believes, what it says and what people experience.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="sitora-panel p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d8b66d]/20 bg-[#d8b66d]/[0.07] text-[#d8b66d]"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[.78fr_1.22fr]">
          <div>
            <div className="sitora-kicker">What changes</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em]">Better brands reduce doubt.</h2>
            <p className="mt-5 text-base leading-8 text-white/52">The aim is not decoration. It is to make the business easier to understand, easier to trust and harder to confuse with ordinary competitors.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Sharper corporate positioning", "Consistent digital identity", "Clearer service messaging", "More credible first impression", "Reusable visual language", "Stronger website and sales assets"].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/[0.08] bg-[#070a10] p-5">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
                <span className="text-sm leading-7 text-white/66">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="sitora-kicker">Process</div>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-.045em] sm:text-5xl">A disciplined route from strategy to expression.</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {process.map(([num, title, text]) => (
              <div key={num} className="sitora-panel p-6">
                <div className="text-sm font-semibold text-[#d8b66d]">{num}</div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#d8b66d]/20 bg-[linear-gradient(135deg,rgba(216,182,109,.12),rgba(255,255,255,.025))] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[.2em] text-[#d8b66d]">Build the next version of your company</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Your brand should make growth easier, not harder.</h2>
          </div>
          <a href="/contact" className="sitora-button-primary mt-6 px-6 py-3.5 lg:mt-0">Start a branding project <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}
