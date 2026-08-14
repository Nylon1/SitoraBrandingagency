"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  Layers3,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const pillars = [
  {
    icon: Layers3,
    title: "Positioning before pixels",
    text: "We clarify what the business needs to communicate, who it needs to persuade and which services deserve the strongest emphasis before design begins.",
  },
  {
    icon: MonitorSmartphone,
    title: "Premium responsive design",
    text: "A disciplined visual system with strong typography, spacing, hierarchy and mobile behaviour rather than a collection of decorative sections.",
  },
  {
    icon: Search,
    title: "Search architecture",
    text: "Service, industry and location pages are planned around real search intent so the website can become a long-term acquisition asset.",
  },
  {
    icon: Target,
    title: "Conversion clarity",
    text: "Every major page has a purpose, a clear next action and a route from interest to enquiry without aggressive or repetitive calls to action.",
  },
];

const deliverables = [
  "Corporate homepage and visual system",
  "Service and capability pages",
  "Industry and sector landing pages",
  "Location and market pages where useful",
  "Case studies, insights and proof sections",
  "Contact and enquiry journeys",
  "Technical SEO foundations",
  "Responsive QA and launch support",
];

const process = [
  ["01", "Discover", "Business model, audience, competitors, proof, growth priorities and current weaknesses."],
  ["02", "Architect", "Page hierarchy, search structure, narrative, conversion routes and content responsibilities."],
  ["03", "Design", "A premium visual language with a consistent component system rather than one-off page decoration."],
  ["04", "Build", "Modern responsive development focused on speed, accessibility, search visibility and maintainability."],
  ["05", "Launch", "Cross-device QA, forms, analytics, redirects, metadata and a clean handover for future growth."],
];

export default function CorporateWebsiteDesignPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03050a] text-white">
      <section className="relative border-b border-white/[0.07] px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(216,182,109,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(58,127,255,0.10),transparent_31%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b66d]/40 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="sitora-kicker">Sitora Digital · Corporate Websites</div>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-[5.7rem]">
              Corporate websites built to make the business feel established before the first conversation.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/58 sm:text-xl sm:leading-9">
              Sitora combines positioning, premium design, SEO architecture and conversion thinking into one digital presence built for serious businesses.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="sitora-btn-primary">
                Discuss your website <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#process" className="sitora-btn-secondary">See the process</a>
            </div>

            <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                ["Strategy", "A clear commercial narrative"],
                ["Design", "A premium, disciplined system"],
                ["Growth", "SEO and conversion built in"],
              ].map(([title, body]) => (
                <div key={title} className="sitora-panel rounded-2xl p-5">
                  <div className="text-sm font-semibold text-[#e5c57e]">{title}</div>
                  <div className="mt-2 text-xs leading-5 text-white/42">{body}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.75 }}>
            <div className="sitora-panel-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d8b66d]/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d8b66d]">The Sitora standard</div>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">One system, four disciplines.</h2>
                  </div>
                  <Sparkles className="h-8 w-8 text-[#d8b66d]/70" />
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {pillars.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-2xl border border-white/[0.08] bg-black/20 p-5">
                        <Icon className="h-5 w-5 text-[#d8b66d]" />
                        <h3 className="mt-4 font-semibold text-white/88">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/45">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="sitora-kicker">What changes</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">The website stops behaving like a brochure.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/52">
                A strong corporate site should make the business easier to understand, easier to trust and easier to choose. That means the information architecture matters as much as the visual finish.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Clearer positioning for high-value prospects",
                "Stronger credibility before sales conversations",
                "Better explanation of services and expertise",
                "More search entry points beyond the homepage",
                "A calmer, more deliberate enquiry journey",
                "A design system that can scale as the company grows",
              ].map((item) => (
                <div key={item} className="sitora-panel rounded-2xl p-5">
                  <Check className="h-5 w-5 text-[#d8b66d]" />
                  <p className="mt-4 text-sm leading-7 text-white/62">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="sitora-kicker">What we build</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">The pages your business actually needs.</h2>
            <p className="mt-6 text-base leading-8 text-white/52">
              We prioritise page types that help prospects understand the company and help search engines understand the market you serve.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((item) => (
              <div key={item} className="group sitora-panel rounded-2xl p-5 transition hover:border-[#d8b66d]/25">
                <FileText className="h-5 w-5 text-[#d8b66d]/80" />
                <p className="mt-4 text-sm font-medium leading-6 text-white/72">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <div className="sitora-kicker">Process</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Structured enough to be reliable. Flexible enough to feel bespoke.</h2>
            </div>

            <div className="space-y-3">
              {process.map(([step, title, body]) => (
                <div key={step} className="grid gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:grid-cols-[64px_180px_1fr] sm:items-start sm:p-6">
                  <div className="text-sm font-semibold text-[#d8b66d]">{step}</div>
                  <div className="font-semibold text-white/86">{title}</div>
                  <div className="text-sm leading-7 text-white/48">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#d8b66d]/20 bg-[linear-gradient(135deg,rgba(216,182,109,0.11),rgba(255,255,255,0.025),rgba(42,168,154,0.06))] p-7 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d8b66d]">
                <ShieldCheck className="h-4 w-4" /> Built for serious first impressions
              </div>
              <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">If the business has outgrown its website, the website should catch up.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">We can review the current site, identify the biggest credibility and growth gaps, and recommend the right level of rebuild.</p>
            </div>
            <Link href="/contact" className="sitora-btn-primary whitespace-nowrap">
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
