"use client";

import { motion } from "framer-motion"; import { ArrowRight, BadgeCheck, Building2, CalendarCheck, CheckCircle2, ClipboardList, FileText, Home, Image, KeyRound, MapPin, MessageSquareText, MousePointerClick, Search, ShieldCheck, Sparkles, Star, Target, UsersRound, } from "lucide-react";

const outcomes = [ "Build trust with homeowners, landlords, buyers and sellers", "Generate valuation enquiries through clear call-to-actions", "Present properties, services and local expertise professionally", "Support local SEO for estate agency searches in your area", "Create dedicated pages for sales, lettings, valuations and property management", "Make the agency feel modern, credible and easy to contact", ];

const features = [ { icon: Home, title: "Sales & Lettings Pages", text: "Dedicated pages for property sales, lettings, landlords, valuations, property management and area guides.", }, { icon: KeyRound, title: "Valuation Enquiry Journey", text: "Clear valuation buttons, enquiry forms, phone prompts and conversion-focused sections for sellers and landlords.", }, { icon: Search, title: "Estate Agent SEO Structure", text: "Local search-focused structure for towns, neighbourhoods, services, FAQs, property advice and valuation intent.", }, { icon: Image, title: "Premium Property Presentation", text: "Strong visual layouts for property imagery, featured listings, case studies, testimonials and local market authority.", }, ];

const servicePages = [ "Property Sales", "Lettings", "Free Valuations", "Landlord Services", "Property Management", "New Homes", "Area Guides", "Commercial Property", ];

const process = [ { step: "01", title: "Agency Positioning", text: "We understand your estate agency, local market, target clients, services and the type of instructions you want to win.", }, { step: "02", title: "Lead Journey Plan", text: "We map the routes for sellers, buyers, landlords and tenants so the website guides each visitor to the right action.", }, { step: "03", title: "Premium Property Design", text: "We create a polished, image-led design that makes your agency feel professional, modern and trusted locally.", }, { step: "04", title: "Local SEO Structure", text: "We organise pages around estate agency services, valuation searches, local areas, FAQs and property advice.", }, { step: "05", title: "Launch & Expand", text: "The website can grow with more area guides, market updates, advice articles and campaign landing pages.", }, ];

const trustSignals = [ "Google review highlights", "Featured property listings", "Free valuation CTA", "Local area guides", "Team profiles", "Recent success stories", "Landlord information", "Clear contact routes", ];

export default function EstateAgentsWebsiteDesignPage() { return ( <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
    
  <section className="relative px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(216,182,109,0.23),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(59,130,246,0.14),transparent_30%),linear-gradient(180deg,#05070d_0%,#0b101b_48%,#05070d_100%)]" />
    <motion.div
      animate={{ x: [0, 32, 0], y: [0, -18, 0], rotate: [0, 3, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-[-20%] top-[5%] h-[700px] w-[700px] rounded-full border border-[#d8b66d]/15 bg-[radial-gradient(circle,rgba(216,182,109,0.13),transparent_64%)]"
    />
    <motion.div
      animate={{ x: [0, -24, 0], y: [0, 18, 0], rotate: [0, -4, 0] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[-18%] bottom-[-20%] h-[620px] w-[620px] rounded-full border border-blue-400/10 bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_66%)]"
    />

    <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/70 backdrop-blur">
          <Home className="h-4 w-4 text-[#d8b66d]" />
          Website Design for Estate Agents
        </div>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          Premium estate agent websites built to win instructions and valuation enquiries.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
          Sitora designs modern, SEO-focused websites for estate agents that need stronger local visibility, better property presentation and more seller, landlord and buyer enquiries.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]">
            Build an Estate Agent Website <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#features" className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10">
            View Features
          </a>
        </div>

        <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Valuations", "Seller enquiry focus"],
            ["Local SEO", "Area search visibility"],
            ["Property", "Premium presentation"],
          ].map(([top, bottom]) => (
            <div key={top} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
              <p className="text-lg font-semibold text-[#d8b66d]">{top}</p>
              <p className="mt-1 text-xs leading-5 text-white/50">{bottom}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.9 }} className="relative">
        <div className="absolute -inset-10 rounded-[3rem] bg-[#d8b66d]/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="rounded-[1.7rem] border border-white/10 bg-[#0b111d] p-6">
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Property Website System</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Built around trust, local authority and valuation leads.</h2>
              </div>
              <Building2 className="h-9 w-9 shrink-0 text-white/35" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Valuation CTA", "Seller and landlord leads"],
                ["Property Listings", "Premium visual display"],
                ["Local SEO", "Town and area visibility"],
                ["Area Guides", "Local market authority"],
                ["Reviews", "Social proof"],
                ["Contact Routes", "Easy enquiry journey"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-white/48">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/10 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-[#d8b66d]" />
                <p className="text-sm leading-7 text-white/70">
                  Property clients move fast. Your website should make the agency feel trusted, local and easy to contact.
                </p>
              </div>
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
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Homeowners choose agents they believe can present and sell well.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            Your website is often the first test of your agency’s quality. If it looks dated or unclear, potential sellers and landlords may choose a competitor.
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
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Estate Agent Website Features</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Everything a modern estate agency website needs.</h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
          Estate agent websites need strong property presentation, local SEO, valuation lead capture, service clarity and clear routes for sellers, landlords, buyers and tenants.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.article key={feature.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }} className="group rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
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

  <section className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Service SEO</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Each property service should have its own clear page.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          Sellers, landlords, buyers and tenants are looking for different things. Dedicated pages help target each search and explain each service properly.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {servicePages.map((page) => (
          <div key={page} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#05070d] p-5">
            <FileText className="h-5 w-5 shrink-0 text-[#d8b66d]" />
            <span className="font-medium">{page}</span>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="process" className="px-5 py-24 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Our Process</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A structured process for estate agency websites.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          Sitora plans estate agent websites around the client journey: local trust, property presentation, valuation leads, service clarity and SEO growth.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-5">
        {process.map((item) => (
          <div key={item.step} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-bold text-[#d8b66d]">{item.step}</p>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/56">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="px-5 pb-24 sm:px-8">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(59,130,246,0.10))] p-7 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Agency Trust Signals</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Confidence-building elements for estate agent websites.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            Property clients want proof that the agency can market homes properly, understand the local area and handle enquiries professionally.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {trustSignals.map((item) => (
            <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
              <BadgeCheck className="h-5 w-5 shrink-0 text-[#d8b66d]" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Estate Agency Positioning</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">An estate agent website should feel local, premium and action-focused.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          Sellers and landlords need to feel that your agency will present their property well. Buyers and tenants need a simple path to listings and enquiries.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          [Target, "Valuation Focus", "The website should clearly guide sellers and landlords towards valuation enquiries."],
          [UsersRound, "Human Team Presence", "Team profiles and agency story make the business feel more approachable."],
          [MessageSquareText, "Clear Property Copy", "Service pages should explain why clients should choose your agency."],
          [MapPin, "Local Authority", "Town, city and area guides help show local expertise and support SEO."],
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
      <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Start an Estate Agent Website Project</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Ready to build an estate agent website that wins instructions and enquiries?</h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
        Book a Sitora consultation and we’ll map out the design, valuation journey, property presentation and SEO structure for your estate agency website.
      </p>
      <a href="mailto:hello@sitora.co.uk?subject=Estate Agent Website Design Enquiry" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]">
        Request an Estate Agent Website Consultation <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
</main>

); }