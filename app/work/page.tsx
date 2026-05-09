"use client";

import { motion } from "framer-motion"; import { ArrowRight, BadgeCheck, Briefcase, Building2, Crown, FileText, Gem, Globe2, Layers3, LineChart, MonitorSmartphone, Search, ShieldCheck, Sparkles, Target, WandSparkles, Workflow, } from "lucide-react";

const featuredWork = [ { title: "Premium Dental Clinic Website", sector: "Healthcare / Dental", type: "Website, SEO Structure & Patient Journey", summary: "A premium clinic website concept designed to build patient confidence, present treatments clearly and guide visitors towards booking an appointment.", results: ["Treatment page structure", "Patient trust sections", "Premium clinical design", "Booking-led journey"], }, { title: "Global Translation Company Website", sector: "Professional Services", type: "Corporate Website, Branding & International SEO", summary: "A global-facing language services website designed for certified translations, court interpreting, subtitle work and international business enquiries.", results: ["Certified translation pages", "Language service SEO", "Corporate trust positioning", "Quote enquiry pathway"], }, { title: "Corporate Law Firm Website", sector: "Legal Services", type: "Authority Website & Practice Area Pages", summary: "A professional legal website system built around authority, practice area clarity, solicitor credibility and local legal SEO.", results: ["Practice area pages", "Solicitor trust signals", "Legal FAQ structure", "Consultation CTA journey"], }, ];

const transformations = [ { icon: MonitorSmartphone, title: "Website Presence", before: "Generic pages with weak structure and no clear journey.", after: "Premium digital headquarters with strong sections, motion, hierarchy and conversion pathways.", }, { icon: Crown, title: "Brand Perception", before: "The company looks smaller or less established than it really is.", after: "The business feels premium, confident and ready for higher-value clients.", }, { icon: Search, title: "SEO Architecture", before: "Few pages, limited keywords and no sector/location strategy.", after: "Service, industry and location pages planned around commercial search intent.", }, { icon: Target, title: "Lead Journey", before: "Visitors are left to work out what to do next.", after: "Clear CTAs, trust blocks and enquiry routes guide users towards action.", }, ];

const projectTypes = [ "Corporate website redesigns", "Premium landing pages", "Industry SEO page systems", "Brand identity upgrades", "Global location SEO structures", "Service page architecture", "Lead generation journeys", "Cinematic entry screens", ];

const sectors = [ "Law Firms", "Dental Clinics", "Healthcare Clinics", "Accountants", "Estate Agents", "Construction Companies", "Consultants", "Translation Companies", "Recruitment Agencies", "Training Providers", "Finance Brokers", "Corporate Services", ];

export default function WorkPage() { return ( <main className="min-h-screen overflow-hidden bg-[#03050a] text-white"> <section className="relative min-h-screen overflow-hidden px-5 pt-32 sm:px-8 lg:pt-40"> <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(216,182,109,0.28),transparent_31%),radial-gradient(circle_at_82%_18%,rgba(37,99,235,0.20),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,#03050a_0%,#07101f_48%,#03050a_100%)]" />

<div className="absolute inset-0 opacity-[0.15]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] bg-[size:72px_72px]" />
    </div>

    <div className="absolute inset-0 opacity-[0.18]">
      <div className="absolute bottom-0 left-0 right-0 h-[48vh] bg-[linear-gradient(to_top,rgba(255,255,255,0.22),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-[48vh] bg-[repeating-linear-gradient(90deg,transparent_0_46px,rgba(255,255,255,.30)_47px_48px)]" />
      <div className="absolute bottom-0 left-0 right-0 h-[31vh] bg-[repeating-linear-gradient(0deg,transparent_0_30px,rgba(255,255,255,.16)_31px_32px)]" />
    </div>

    <motion.div
      animate={{ x: [0, 40, 0], y: [0, -22, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-[-18%] top-[4%] h-[760px] w-[760px] rounded-full border border-[#d8b66d]/20 bg-[radial-gradient(circle,rgba(216,182,109,0.16),transparent_62%)]"
    />

    <motion.div
      animate={{ x: [0, -32, 0], y: [0, 26, 0], rotate: [0, -4, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-24%] left-[-20%] h-[720px] w-[720px] rounded-full border border-blue-400/10 bg-[radial-gradient(circle,rgba(59,130,246,0.19),transparent_66%)]"
    />

    <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-14 pb-20 lg:grid-cols-[1.05fr_.95fr]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85 }}
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/72 shadow-2xl shadow-black/20 backdrop-blur">
          <Gem className="h-4 w-4 text-[#d8b66d]" />
          Work, transformations and corporate digital presence
        </div>

        <h1 className="max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.075em] text-white sm:text-7xl lg:text-8xl xl:text-[8.2rem]">
          Work designed to change how businesses are perceived.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
          Sitora creates premium websites, brand systems and SEO-led digital platforms that help businesses look more established, trusted and ready for serious clients.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#featured-work"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/25 transition hover:bg-[#f2cf83]"
          >
            View Featured Work
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#transformation"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            See Transformation
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.9 }}
        className="relative"
      >
        <div className="absolute -inset-10 rounded-[3rem] bg-[#d8b66d]/10 blur-3xl" />

        <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b111d] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(216,182,109,0.17),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_35%)]" />

            <div className="relative">
              <div className="mb-7 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Project Impact</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Built around perception, visibility and enquiries.
                  </h2>
                </div>
                <WandSparkles className="h-10 w-10 shrink-0 text-white/35" />
              </div>

              <div className="space-y-4">
                {[
                  ["01", "Premium first impression", "A stronger opening experience that makes the business feel established."],
                  ["02", "Clear service structure", "Pages explain what the company does and why clients should care."],
                  ["03", "SEO-ready architecture", "Services, sectors and locations are planned for search coverage."],
                  ["04", "Enquiry-focused journey", "Each section moves the visitor closer to a serious conversation."],
                ].map(([num, title, text]) => (
                  <div key={num} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8b66d] text-sm font-black text-[#070910]">
                      {num}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/50">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/10 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-[#d8b66d]" />
                  <p className="text-sm leading-7 text-white/70">
                    Sitora projects are built to make businesses feel credible before the first enquiry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>

  <section className="border-y border-white/10 bg-[#070b13] py-5">
    <div className="flex overflow-hidden whitespace-nowrap text-sm font-bold uppercase tracking-[0.28em] text-white/45">
      <motion.div
        animate={{ x: [0, -980] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="flex min-w-max gap-8 px-8"
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-8">
            <span>Corporate Websites</span><span className="text-[#d8b66d]">•</span>
            <span>Brand Identity</span><span className="text-[#d8b66d]">•</span>
            <span>SEO Architecture</span><span className="text-[#d8b66d]">•</span>
            <span>Industry Pages</span><span className="text-[#d8b66d]">•</span>
            <span>Lead Generation</span><span className="text-[#d8b66d]">•</span>
            <span>Digital Headquarters</span><span className="text-[#d8b66d]">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>

  <section id="featured-work" className="px-5 py-28 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Featured Work</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            Example project systems for serious business sectors.
          </h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
          These project styles show the type of premium digital presence Sitora builds for professional firms, clinics and corporate service companies.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {featuredWork.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-[#d8b66d]/35 hover:bg-[#d8b66d]/10"
          >
            <div className="relative h-52 border-b border-white/10 bg-[radial-gradient(circle_at_25%_20%,rgba(216,182,109,0.20),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(59,130,246,0.14),transparent_35%),linear-gradient(135deg,#0b111d,#05070d)] p-6">
              <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:42px_42px]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[#d8b66d]/30 bg-[#d8b66d]/10 px-3 py-1 text-xs font-semibold text-[#d8b66d]">
                    {item.sector}
                  </span>
                  <Building2 className="h-6 w-6 text-white/36" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/42">Concept {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.title}</h3>
                </div>
              </div>
            </div>

            <div className="p-7">
              <p className="text-sm font-semibold text-[#d8b66d]">{item.type}</p>
              <p className="mt-4 text-sm leading-7 text-white/60">{item.summary}</p>

              <div className="mt-6 grid gap-3">
                {item.results.map((result) => (
                  <div key={result} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#d8b66d]" />
                    <p className="text-sm text-white/66">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>

  <section id="transformation" className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Before / After</p>
        <h2 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
          From ordinary website to premium corporate presence.
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/62">
          Sitora focuses on the shift that matters: making a business look more credible, more valuable and more ready for high-value clients.
        </p>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {transformations.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-[#05070d] p-7">
              <Icon className="mb-7 h-8 w-8 text-[#d8b66d]" />
              <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/36">Before</p>
                <p className="mt-3 text-sm leading-7 text-white/52">{item.before}</p>
              </div>
              <div className="mt-3 rounded-2xl border border-[#d8b66d]/25 bg-[#d8b66d]/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">After</p>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.after}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  <section className="px-5 py-28 sm:px-8">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(37,99,235,0.12))] p-7 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Project Types</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            Work that supports brand perception, Google visibility and business growth.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            Sitora can build complete websites or focused project systems depending on where the business needs the biggest upgrade.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {projectTypes.map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-5">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
              <p className="text-sm leading-7 text-white/68">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Sector Experience</p>
        <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
          Designed for high-trust sectors where credibility matters.
        </h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          The strongest Sitora projects are built for businesses where visitors need confidence before they enquire: legal, healthcare, finance, corporate services, property and professional firms.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-[#05070d] p-5">
            <Briefcase className="mb-4 h-5 w-5 text-[#d8b66d]" />
            <p className="font-semibold">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="contact" className="px-5 pb-28 pt-24 sm:px-8">
    <div className="mx-auto max-w-5xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Start a Project</p>
      <h2 className="mt-4 text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">
        Ready to turn your website into a premium business asset?
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
        Book a Sitora consultation and we’ll map out the website, branding and SEO structure your business needs to look more established and attract better clients.
      </p>
      <a
        href="mailto:hello@sitora.co.uk?subject=Sitora Work Project Enquiry"
        className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
      >
        Request a Project Consultation <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
</main>

); }