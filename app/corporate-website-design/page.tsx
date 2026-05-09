"use client";

import { motion } from "framer-motion"; import { ArrowRight, BadgeCheck, Building2, CheckCircle2, FileText, Globe2, Layers3, LineChart, MonitorSmartphone, MousePointerClick, Search, ShieldCheck, Sparkles, Target, WandSparkles, } from "lucide-react";

const outcomes = [ "Look more established and credible from the first visit", "Explain your services clearly so customers understand your value", "Generate better enquiries through stronger call-to-actions", "Support Google visibility with proper SEO page structure", "Create a premium brand impression across desktop and mobile", "Give your business a digital presence that feels corporate, not basic", ];

const features = [ { icon: MonitorSmartphone, title: "Mobile-First Premium Design", text: "Every page is designed to look sharp, fast and professional on mobile, tablet and desktop.", }, { icon: Search, title: "SEO-Ready Structure", text: "Service pages, headings, metadata, internal links and content structure built with search visibility in mind.", }, { icon: Layers3, title: "Brand-Led Layouts", text: "A website style that reflects your positioning, sector, audience and business ambition.", }, { icon: MousePointerClick, title: "Conversion Journey", text: "Clear user pathways that guide visitors towards calls, forms, consultations and enquiries.", }, ];

const process = [ { step: "01", title: "Brand & Business Review", text: "We understand your business, market, services, competitors and the type of customer you want to attract.", }, { step: "02", title: "Website Strategy", text: "We plan the key pages, SEO structure, user journey, calls-to-action and content direction before design begins.", }, { step: "03", title: "Premium Design System", text: "We create a visual direction with strong typography, colours, layout, spacing and a corporate first impression.", }, { step: "04", title: "Next.js Development", text: "We build a fast, responsive website using modern technology designed for performance, SEO and scalability.", }, { step: "05", title: "Launch & Improve", text: "We prepare the site for launch, connect forms, check responsiveness and support ongoing improvements after go-live.", }, ];

const pageTypes = [ "Homepage", "About / Company Profile", "Service Pages", "Industry Pages", "Location Pages", "Case Studies", "Contact Page", "Blog / Insights", ];

export default function CorporateWebsiteDesignPage() { return ( <main className="min-h-screen overflow-hidden bg-[#05070d] text-white"> 
   

  <section className="relative px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(216,182,109,0.22),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(37,99,235,0.16),transparent_30%),linear-gradient(180deg,#05070d_0%,#09101c_48%,#05070d_100%)]" />
    <motion.div
      animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-[-20%] top-[5%] h-[700px] w-[700px] rounded-full border border-[#d8b66d]/15 bg-[radial-gradient(circle,rgba(216,182,109,0.13),transparent_64%)]"
    />
    <motion.div
      animate={{ x: [0, -22, 0], y: [0, 18, 0] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[-18%] bottom-[-20%] h-[620px] w-[620px] rounded-full border border-blue-400/10 bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_66%)]"
    />

    <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/70 backdrop-blur">
          <Building2 className="h-4 w-4 text-[#d8b66d]" />
          Corporate Website Design by Sitora
        </div>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          Premium websites for businesses that need to be taken seriously.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
          Sitora designs and builds corporate websites that create trust, sharpen your brand image and help turn visitors into real business enquiries.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
          >
            Build My Corporate Website <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#process"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            View Process
          </a>
        </div>

        <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Next.js", "Fast modern build"],
            ["SEO", "Search-ready pages"],
            ["Premium", "Corporate design feel"],
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
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Website Impact System</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Designed to build trust before the first call.</h2>
              </div>
              <WandSparkles className="h-9 w-9 shrink-0 text-white/35" />
            </div>

            <div className="space-y-4">
              {[
                ["First Impression", "Premium visual authority", "96%"],
                ["Clarity", "Clear services and value", "91%"],
                ["Conversion", "Enquiry-led journey", "89%"],
                ["Search", "SEO-ready structure", "86%"],
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
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Why it matters</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A weak website quietly costs you better clients.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            Serious customers judge quickly. If your website looks basic, old or unclear, they may assume your business is less professional than it really is.
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

  <section id="features" className="px-5 py-24 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">What We Build In</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Not just attractive. Strategically built.</h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
          A corporate website must look premium, but it also needs clear content, smooth navigation, strong performance and a proper route to enquiry.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="group rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#d8b66d]/15 text-[#d8b66d] transition group-hover:bg-[#d8b66d] group-hover:text-[#070910]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">{feature.text}</p>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>

  <section id="process" className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Our Process</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A clear build process from strategy to launch.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          Sitora follows a structured approach so the final website looks premium, communicates clearly and supports your business goals.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-5">
        {process.map((item) => (
          <div key={item.step} className="rounded-[1.6rem] border border-white/10 bg-[#05070d] p-6">
            <p className="text-sm font-bold text-[#d8b66d]">{item.step}</p>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/56">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="seo" className="px-5 py-24 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">SEO Page Structure</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Built with the pages your business needs to grow.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          A beautiful homepage is not enough. Strong websites need proper service pages, area pages, industry pages and content designed around what customers search for.
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

  <section className="px-5 pb-10 sm:px-8">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(37,99,235,0.12))] p-7 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Best For</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Ideal for businesses ready to move beyond a basic website.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Established local businesses",
            "Professional service firms",
            "Clinics and healthcare brands",
            "Property and construction companies",
            "Consultants and B2B companies",
            "Startups needing investor-ready presence",
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-5">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
              <p className="text-sm leading-7 text-white/68">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section id="contact" className="px-5 pb-28 pt-16 sm:px-8">
    <div className="mx-auto max-w-5xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Start Your Corporate Website</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Ready for a website that reflects where your business is going?</h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
        Book a Sitora consultation and we’ll map out the design direction, page structure and SEO approach for your new corporate website.
      </p>
      <a
        href="mailto:hello@sitora.co.uk?subject=Corporate Website Design Enquiry"
        className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
      >
        Request a Website Consultation <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
</main>

); }