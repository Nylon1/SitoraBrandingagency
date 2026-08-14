"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Funnel,
  Layers3,
  MapPin,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";

const services = [
  { icon: Search, title: "Search architecture", text: "Plan the site around real service, location and industry intent instead of adding SEO after launch." },
  { icon: Layers3, title: "Page systems", text: "Build a scalable structure for service pages, locations, sectors, guides and high-intent landing pages." },
  { icon: Funnel, title: "Conversion journeys", text: "Move visitors from search result to proof, clarity and a simple next action without unnecessary friction." },
  { icon: TrendingUp, title: "Measured growth", text: "Expand coverage deliberately, using search performance and enquiry quality to decide what to build next." },
];

const steps = [
  ["01", "Map demand", "Identify the searches that matter commercially, not just the terms with volume."],
  ["02", "Build the architecture", "Give every important service, market and location a clear role in the site."],
  ["03", "Create useful pages", "Write for people first while keeping intent, hierarchy and internal links explicit."],
  ["04", "Convert attention", "Use evidence, trust, clear offers and strong calls to action to turn visits into enquiries."],
  ["05", "Expand intelligently", "Add new pages where there is a real search or commercial case, not for page count alone."],
];

export default function SeoLeadGenerationPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03050a] text-white">
      <section className="relative border-b border-white/[0.07] px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(216,182,109,.15),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(34,197,94,.10),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="sitora-kicker"><TrendingUp className="h-4 w-4" /> SEO & Lead Generation</div>
            <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">Build a search presence that compounds instead of disappearing when the ads stop.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl sm:leading-9">Sitora designs websites around search demand, specialist pages and clear conversion journeys so visibility can turn into qualified opportunity.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="sitora-button-primary px-6 py-3.5">Plan a growth site <ArrowRight className="h-4 w-4" /></a>
              <a href="#framework" className="sitora-button-secondary px-6 py-3.5">See the framework</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12, duration: .7 }} className="sitora-panel relative overflow-hidden p-7 sm:p-9">
            <div className="absolute right-[-15%] top-[-20%] h-60 w-60 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-[.2em] text-[#d8b66d]">Growth architecture</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em]">Search intent becomes site structure.</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  [Search, "Service intent", "What customers want"],
                  [MapPin, "Location intent", "Where they want it"],
                  [Target, "Industry intent", "Who needs it"],
                  [Funnel, "Conversion intent", "What happens next"],
                ].map(([Icon, title, text]) => {
                  const RealIcon = Icon as typeof Search;
                  return <div key={title as string} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><RealIcon className="h-5 w-5 text-[#d8b66d]" /><div className="mt-4 font-semibold">{title as string}</div><div className="mt-1 text-xs leading-5 text-white/45">{text as string}</div></div>;
                })}
              </div>
              <p className="mt-5 text-sm leading-7 text-white/50">We do not promise rankings or fabricate performance percentages. The focus is on sound architecture, useful pages and measurable enquiry paths.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="sitora-kicker">What we build</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">SEO built into the product, not bolted on afterwards.</h2>
            <p className="mt-5 text-lg leading-8 text-white/55">The strongest growth sites connect search, content, proof and conversion from the start.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, text }) => (
              <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="sitora-panel p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d8b66d]/20 bg-[#d8b66d]/[0.07] text-[#d8b66d]"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="framework" className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="sitora-kicker">The framework</div>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-.045em] sm:text-5xl">A growth system that knows why every page exists.</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-5">
            {steps.map(([num, title, text]) => (
              <div key={num} className="rounded-2xl border border-white/[0.08] bg-[#070a10] p-6">
                <div className="text-sm font-semibold text-[#d8b66d]">{num}</div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <div className="sitora-kicker">Page portfolio</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em]">One homepage cannot carry an entire market.</h2>
            <p className="mt-5 text-base leading-8 text-white/52">Growth comes from a useful network of pages that each answer a distinct need and reinforce the wider site.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Core service pages", "Location landing pages", "Industry pages", "Case studies", "Guides and insights", "Comparison pages", "FAQ-led resources", "Campaign landing pages"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <FileText className="h-5 w-5 shrink-0 text-[#d8b66d]" />
                <span className="text-sm text-white/68">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#d8b66d]/20 bg-[linear-gradient(135deg,rgba(216,182,109,.12),rgba(34,197,94,.035))] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[.2em] text-[#d8b66d]">Search with a commercial purpose</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Build the pages your future customers are already looking for.</h2>
          </div>
          <a href="/contact" className="sitora-button-primary mt-6 px-6 py-3.5 lg:mt-0">Plan the site <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}
