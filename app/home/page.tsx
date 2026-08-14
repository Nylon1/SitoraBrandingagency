"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  HeartPulse,
  Landmark,
  Layers3,
  Network,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

const divisions = [
  {
    label: "Digital",
    title: "Premium digital presence",
    text: "Corporate websites, brand systems and search architecture built to make serious organisations look credible before the first conversation.",
    href: "/corporate-website-design",
    icon: Layers3,
  },
  {
    label: "Dental",
    title: "Dental growth & intelligence",
    text: "Digital platforms, research and operational intelligence for modern dental groups, clinics and healthcare operators.",
    href: "/industries/dental-clinics",
    icon: Stethoscope,
  },
  {
    label: "Healthcare",
    title: "High-trust healthcare systems",
    text: "Healthcare digital strategy, patient-facing experiences and system concepts shaped around trust, accessibility and accountable delivery.",
    href: "/industries/healthcare-clinics",
    icon: HeartPulse,
  },
  {
    label: "Intelligence",
    title: "Audits, AI & operating insight",
    text: "AI readiness, Trust 360 and emerging intelligence layers that expose risk, evidence and action across complex organisations.",
    href: "/ai-readiness",
    icon: Network,
  },
  {
    label: "Research",
    title: "Evidence-led systems research",
    text: "Independent research across healthcare systems, responsible AI, public policy and Saudi/Gulf innovation.",
    href: "/research",
    icon: Landmark,
  },
  {
    label: "Corporate",
    title: "Executive-level positioning",
    text: "Premium digital presence for founders, leaders and organisations that need authority, clarity and global positioning.",
    href: "/corporate-branding",
    icon: Building2,
  },
];

const research = [
  {
    tag: "Saudi Arabia",
    title: "Saudi Dental Software Landscape 2026",
    text: "Where existing systems stop, where workflow fragments and what the next layer of dental intelligence could become.",
    href: "/research/saudi-dental-software-landscape-2026",
  },
  {
    tag: "AI Governance",
    title: "AI as the NHS Front Door",
    text: "Safety, accountability and public trust when AI becomes part of patient access and triage.",
    href: "/research/ai-as-the-nhs-front-door",
  },
  {
    tag: "Healthcare Systems",
    title: "Closing the Medication Loop",
    text: "A signed, accountable medication-change workflow designed to sit above fragmented systems.",
    href: "/research/closing-the-medication-loop",
  },
];

const standards = [
  "Premium visual identity with disciplined restraint",
  "Clear commercial hierarchy and conversion pathways",
  "SEO architecture designed as infrastructure, not an afterthought",
  "Evidence, accessibility and trust designed into the experience",
];

export default function SitoraHomePage() {
  return (
    <main className="overflow-hidden bg-[#03050a] text-white">
      <section className="relative isolate min-h-[92vh] overflow-hidden border-b border-white/[0.08] px-5 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-44">
        <video
          className="absolute inset-0 -z-30 h-full w-full object-cover opacity-[0.14]"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/sitora-global-poster.jpg"
        >
          <source src="/videos/sitora-global2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(3,5,10,.50),#03050a_94%),radial-gradient(circle_at_72%_17%,rgba(216,182,109,.18),transparent_26%),radial-gradient(circle_at_15%_70%,rgba(24,90,82,.16),transparent_28%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.17] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8b66d]/25 bg-[#d8b66d]/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e4c988]">
              <Sparkles className="h-3.5 w-3.5" />
              Digital · Intelligence · Research
            </div>

            <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[6.8rem]">
              We design the layer that makes organisations look, think and work better.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/60 sm:text-lg sm:leading-9">
              Sitora brings together premium digital design, healthcare intelligence, AI governance and independent research for organisations operating in high-trust markets.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 text-sm font-bold text-[#070910] shadow-[0_16px_50px_rgba(216,182,109,.18)] transition hover:-translate-y-0.5 hover:bg-[#f0cf88]"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.035] px-7 py-4 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Explore Sitora Research <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/[0.08] pt-7 text-xs font-semibold uppercase tracking-[0.14em] text-white/35">
              <span>London</span><span>Manchester</span><span>Riyadh</span><span>Dubai</span><span>Global</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.85 }}
            className="relative"
          >
            <div className="absolute -inset-12 rounded-full bg-[#d8b66d]/10 blur-[100px]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-[#07100f]/80 p-5 shadow-[0_30px_120px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:p-7">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8b66d]">Sitora operating model</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">One house. Specialist capability.</h2>
                </div>
                <ShieldCheck className="h-7 w-7 text-[#d8b66d]" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {divisions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.label} href={item.href} className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-[#d8b66d]/25 hover:bg-white/[0.045]">
                      <div className="flex items-start justify-between gap-4">
                        <Icon className="h-5 w-5 text-[#d8b66d]" />
                        <ChevronRight className="h-4 w-4 text-white/20 transition group-hover:translate-x-0.5 group-hover:text-[#d8b66d]" />
                      </div>
                      <div className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-white/35">{item.label}</div>
                      <div className="mt-1 text-sm font-semibold text-white/85">{item.title}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/[0.08] bg-[#050908] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
          <span>Corporate websites</span>
          <span>Brand systems</span>
          <span>Healthcare intelligence</span>
          <span>AI governance</span>
          <span>Research & policy</span>
          <span>Saudi / Gulf innovation</span>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#d8b66d]">The Sitora model</div>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
                Different problems. One standard of thinking.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/52 lg:justify-self-end">
              Sitora is deliberately broader than a conventional agency. We combine design, systems thinking and research so the public-facing experience and the operating logic behind it can reinforce each other.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * 0.04 }}>
                  <Link href={item.href} className="group block h-full rounded-[1.7rem] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d8b66d]/25 hover:bg-white/[0.04]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/[0.08] text-[#d8b66d]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#d8b66d]/80">Sitora {item.label}</div>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/48">{item.text}</p>
                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition group-hover:text-[#e6c77f]">
                      Explore <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#07100f] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#75c8bd]">Sitora standard</div>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
              Premium should feel precise, not decorative.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/52">
              The strongest digital organisations are not the loudest. Their design, language, evidence and operating logic all feel coherent. That is the standard we build towards.
            </p>
            <Link href="/process" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#d8b66d]">
              See how we work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/[0.08] bg-black/20 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {standards.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d8b66d] text-[#07100f]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm leading-7 text-white/62">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#75c8bd]">Sitora Research</div>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Research that strengthens the product thinking.</h2>
            </div>
            <Link href="/research" className="inline-flex items-center gap-2 text-sm font-semibold text-[#d8b66d]">
              View all research <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {research.map((paper) => (
              <Link key={paper.href} href={paper.href} className="group rounded-[1.7rem] border border-white/[0.08] bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#74c9bd]/25 hover:bg-white/[0.04]">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#76cabe]">{paper.tag}</div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">{paper.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/48">{paper.text}</p>
                <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-white/55 transition group-hover:text-[#8dd9cf]">
                  Read research <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-[#d8b66d]/20 bg-[radial-gradient(circle_at_15%_20%,rgba(216,182,109,.12),transparent_32%),linear-gradient(135deg,#0a0d0c,#050706)] p-8 sm:p-12 lg:p-16">
          <div className="absolute right-[-10%] top-[-50%] h-96 w-96 rounded-full border border-[#d8b66d]/10" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#d8b66d]">Work with Sitora</div>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Build something that deserves to be taken seriously.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/52">
                From corporate presence to healthcare intelligence, we focus on work where design quality, trust and strategic clarity matter.
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 text-sm font-bold text-[#070910] transition hover:bg-[#f0cf88]">
              Discuss a project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
