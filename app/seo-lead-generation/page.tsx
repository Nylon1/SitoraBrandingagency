"use client";

import { motion } from "framer-motion"; import { ArrowRight, BadgeCheck, BarChart3, Building2, CheckCircle2, FileSearch, FileText, Funnel, Globe2, Layers3, LineChart, MapPin, MousePointerClick, Search, ShieldCheck, Sparkles, Target, TrendingUp, } from "lucide-react";

const outcomes = [ "Help your business appear for the services customers are already searching for", "Create area pages for high-value cities, regions and locations", "Build industry pages that target specific professional sectors", "Turn website visitors into enquiries with stronger call-to-actions", "Create a content structure that can grow over time", "Support long-term organic visibility instead of relying only on ads", ];

const seoServices = [ { icon: Search, title: "SEO Website Structure", text: "Page architecture, headings, internal links and content flow planned around what customers search for.", }, { icon: MapPin, title: "Location Landing Pages", text: "City and regional pages designed to target high-intent local searches across the UK and global markets.", }, { icon: Building2, title: "Industry SEO Pages", text: "Dedicated pages for corporate trades and sectors so your website can rank for specialist searches.", }, { icon: Funnel, title: "Lead Conversion Journeys", text: "Clear calls-to-action, enquiry routes and trust sections designed to turn attention into action.", }, ];

const growthSystem = [ { step: "01", title: "Search Intent Mapping", text: "We identify what potential customers are searching for and group keywords by service, location and industry intent.", }, { step: "02", title: "SEO Page Plan", text: "We map the key website pages needed to target those searches without creating weak or duplicated content.", }, { step: "03", title: "Content & Positioning", text: "We create page content that sounds credible, explains value and helps customers trust the business.", }, { step: "04", title: "Conversion Design", text: "We build clear journeys with calls, forms, consultation prompts, trust points and service clarity.", }, { step: "05", title: "Launch & Expand", text: "After the core site launches, more pages can be added strategically to grow search coverage over time.", }, ];

const pageTypes = [ "Core service pages", "Location pages", "Industry pages", "FAQ sections", "Case study pages", "Advice articles", "Comparison pages", "Landing pages", ];

const searchTargets = [ "Web Design London", "Website Design for Law Firms", "Corporate Branding Manchester", "SEO Website Design Dubai", "Website Design for Dental Clinics", "Lead Generation Website UK", ];

export default function SeoLeadGenerationPage() { return ( <main className="min-h-screen overflow-hidden bg-[#05070d] text-white"> 
      

  <section className="relative px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(216,182,109,0.22),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(34,197,94,0.13),transparent_30%),linear-gradient(180deg,#05070d_0%,#08141a_48%,#05070d_100%)]" />
    <motion.div
      animate={{ x: [0, 32, 0], y: [0, -18, 0], rotate: [0, 3, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-[-20%] top-[5%] h-[700px] w-[700px] rounded-full border border-[#d8b66d]/15 bg-[radial-gradient(circle,rgba(216,182,109,0.13),transparent_64%)]"
    />
    <motion.div
      animate={{ x: [0, -24, 0], y: [0, 18, 0], rotate: [0, -4, 0] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[-18%] bottom-[-20%] h-[620px] w-[620px] rounded-full border border-emerald-400/10 bg-[radial-gradient(circle,rgba(34,197,94,0.14),transparent_66%)]"
    />

    <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/70 backdrop-blur">
          <TrendingUp className="h-4 w-4 text-[#d8b66d]" />
          SEO & Lead Generation by Sitora
        </div>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          Build a website that gets found, trusted and contacted.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
          Sitora creates SEO-focused website structures, landing pages and conversion journeys that help ambitious businesses attract better enquiries online.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
          >
            Plan My Growth Website <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#system"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            View Growth System
          </a>
        </div>

        <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Rank", "Target real searches"],
            ["Trust", "Convert attention"],
            ["Grow", "Expand page coverage"],
          ].map(([top, bottom]) => (
            <div key={top} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
              <p className="text-lg font-semibold text-[#d8b66d]">{top}</p>
              <p className="mt-1 text-xs leading-5 text-white/50">{bottom}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.9 }}
        className="relative"
      >
        <div className="absolute -inset-10 rounded-[3rem] bg-[#d8b66d]/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="rounded-[1.7rem] border border-white/10 bg-[#0b111d] p-6">
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Growth Architecture</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Pages planned around searches, trust and enquiries.</h2>
              </div>
              <BarChart3 className="h-9 w-9 shrink-0 text-white/35" />
            </div>

            <div className="space-y-4">
              {[
                ["Search Visibility", "Service and location intent", "93%"],
                ["Page Depth", "More ranking opportunities", "88%"],
                ["Trust Sections", "Reduce customer doubt", "91%"],
                ["Lead Flow", "Calls, forms and CTAs", "95%"],
              ].map(([label, desc, percent]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">{label}</p>
                      <p className="mt-1 text-xs text-white/48">{desc}</p>
                    </div>
                    <span className="text-sm font-bold text-[#d8b66d]">{percent}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#d8b66d]" style={{ width: percent }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>

  <section className="px-5 py-20 sm:px-8">
    <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-7 sm:p-10 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Why SEO matters</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A premium website is stronger when customers can actually find it.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            Design creates trust. SEO creates visibility. Lead generation turns that attention into a business opportunity.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {outcomes.map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-[#05070d] p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
              <p className="text-sm leading-7 text-white/68">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section id="services" className="px-5 py-24 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">SEO Services</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Search strategy built into the website from day one.</h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
          We build SEO into the foundations: page structure, content hierarchy, internal links, local targeting, industry targeting and conversion sections.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {seoServices.map((service) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="group rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#d8b66d]/15 text-[#d8b66d] transition group-hover:bg-[#d8b66d] group-hover:text-[#070910]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">{service.text}</p>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>

  <section id="system" className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Growth System</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A proper SEO website is planned, not guessed.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          Sitora creates a structured page plan so every important service, location and sector has a clear purpose.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-5">
        {growthSystem.map((item) => (
          <div key={item.step} className="rounded-[1.6rem] border border-white/10 bg-[#05070d] p-6">
            <p className="text-sm font-bold text-[#d8b66d]">{item.step}</p>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/56">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="pages" className="px-5 py-24 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Page Strategy</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">More strategic pages. More opportunities to be found.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          Instead of relying on one homepage, we create a website structure with targeted pages that match customer search behaviour.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pageTypes.map((type) => (
          <div key={type} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <FileText className="h-5 w-5 shrink-0 text-[#d8b66d]" />
            <span className="font-medium">{type}</span>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="px-5 pb-24 sm:px-8">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(34,197,94,0.10))] p-7 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Search Targets</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Examples of the searches Sitora can target.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            We can create dedicated pages around services, sectors and locations to support long-term organic growth.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {searchTargets.map((target) => (
            <div key={target} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
              <FileSearch className="h-5 w-5 shrink-0 text-[#d8b66d]" />
              <span className="font-medium">{target}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Lead Generation</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Traffic is pointless if the page does not convert.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          Every SEO page should guide the visitor towards an action: call, enquire, book a consultation or request a quote.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          [Target, "Clear Intent", "Each page has a reason to exist and a specific customer search to target."],
          [MousePointerClick, "Strong CTA", "Visitors should always know what step to take next."],
          [ShieldCheck, "Trust Sections", "Reviews, process, FAQs and proof reduce hesitation."],
          [LineChart, "Growth Path", "The site can keep expanding with more targeted pages over time."],
        ].map(([Icon, title, text]) => {
          const RealIcon = Icon as typeof Target;
          return (
            <div key={title as string} className="rounded-[1.5rem] border border-white/10 bg-[#05070d] p-6">
              <RealIcon className="mb-5 h-6 w-6 text-[#d8b66d]" />
              <h3 className="text-lg font-semibold">{title as string}</h3>
              <p className="mt-3 text-sm leading-7 text-white/56">{text as string}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  <section id="contact" className="px-5 pb-28 pt-24 sm:px-8">
    <div className="mx-auto max-w-5xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Start Growing Online</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Ready for a website built around visibility, trust and enquiries?</h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
        Book a Sitora consultation and we’ll map out the SEO page structure, content strategy and lead generation journey your business needs.
      </p>
      <a
        href="mailto:hello@sitora.co.uk?subject=SEO and Lead Generation Website Enquiry"
        className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
      >
        Request a Growth Consultation <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
</main>

); }