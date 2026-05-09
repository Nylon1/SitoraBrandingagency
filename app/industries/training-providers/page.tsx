"use client";

import { motion } from "framer-motion"; import { ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, CalendarCheck, CheckCircle2, ClipboardList, FileText, Filter, Globe2, Handshake, MapPin, MessageSquareText, MousePointerClick, Search, ShieldCheck, Sparkles, Target, UserSearch, UsersRound, } from "lucide-react";

const outcomes = [ "Build trust with employers looking for recruitment support", "Create a clear journey for candidates searching for roles", "Present specialist recruitment sectors and industries professionally", "Support SEO for recruitment searches in your target locations and sectors", "Guide employers towards consultation calls and hiring enquiries", "Make the agency feel established, active, credible and easy to contact", ];

const features = [ { icon: BriefcaseBusiness, title: "Employer Service Pages", text: "Dedicated pages for employers, hiring support, retained search, temporary recruitment, permanent placements and sector expertise.", }, { icon: UserSearch, title: "Candidate Journey", text: "Clear candidate pathways, role categories, application prompts and advice sections that make the agency feel active and useful.", }, { icon: Search, title: "Recruitment SEO Structure", text: "Search-focused pages for sectors, locations, job types, employer services and candidate-intent keywords.", }, { icon: MousePointerClick, title: "Client Enquiry Journey", text: "Strong hire-talent CTAs, employer contact forms and consultation prompts designed to generate commercial recruitment enquiries.", }, ];

const servicePages = [ "Permanent Recruitment", "Temporary Recruitment", "Executive Search", "Employer Services", "Candidate Support", "Sector Recruitment", "Job Listings", "Recruitment Consultancy", ];

const process = [ { step: "01", title: "Agency Positioning", text: "We understand your recruitment agency, sectors, locations, ideal employer clients, candidate market and key services.", }, { step: "02", title: "Employer & Candidate Journey", text: "We map separate website routes for companies hiring staff and candidates looking for opportunities.", }, { step: "03", title: "Premium Recruitment Design", text: "We create a polished, energetic and corporate design that makes the agency look credible and active.", }, { step: "04", title: "SEO & Sector Structure", text: "We organise content around recruitment sectors, location searches, job categories and employer hiring intent.", }, { step: "05", title: "Launch & Expand", text: "The website can grow with more sector pages, location pages, candidate resources, employer guides and job pages.", }, ];

const trustSignals = [ "Employer testimonials", "Candidate success stories", "Recruitment sectors served", "Current vacancies", "Team profiles", "Hiring process explanation", "Location and sector pages", "Clear employer enquiry form", ];

export default function RecruitmentAgenciesWebsiteDesignPage() { return ( <main className="min-h-screen overflow-hidden bg-[#05070d] text-white"> <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#05070d]/72 backdrop-blur-2xl"> <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"> <a href="/home" className="flex items-center gap-3"> <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d8b66d] text-[#070910] shadow-lg shadow-[#d8b66d]/20"> <Sparkles className="h-5 w-5" /> </span> <span className="text-xl font-semibold tracking-tight">Sitora</span> </a>

<nav className="hidden items-center gap-8 text-sm font-medium text-white/62 lg:flex">
        <a href="/home" className="transition hover:text-white">Home</a>
        <a href="/industries" className="transition hover:text-white">Industries</a>
        <a href="#features" className="transition hover:text-white">Features</a>
        <a href="#process" className="transition hover:text-white">Process</a>
        <a href="#contact" className="transition hover:text-white">Contact</a>
      </nav>

      <a
        href="#contact"
        className="rounded-full border border-[#d8b66d]/45 px-5 py-2.5 text-sm font-semibold text-[#d8b66d] transition hover:bg-[#d8b66d] hover:text-[#070910]"
      >
        Recruitment Website Enquiry
      </a>
    </div>
  </header>

  <section className="relative px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(216,182,109,0.23),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(16,185,129,0.14),transparent_30%),linear-gradient(180deg,#05070d_0%,#081410_48%,#05070d_100%)]" />
    <motion.div
      animate={{ x: [0, 32, 0], y: [0, -18, 0], rotate: [0, 3, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-[-20%] top-[5%] h-[700px] w-[700px] rounded-full border border-[#d8b66d]/15 bg-[radial-gradient(circle,rgba(216,182,109,0.13),transparent_64%)]"
    />
    <motion.div
      animate={{ x: [0, -24, 0], y: [0, 18, 0], rotate: [0, -4, 0] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[-18%] bottom-[-20%] h-[620px] w-[620px] rounded-full border border-emerald-400/10 bg-[radial-gradient(circle,rgba(16,185,129,0.14),transparent_66%)]"
    />

    <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/70 backdrop-blur">
          <UsersRound className="h-4 w-4 text-[#d8b66d]" />
          Website Design for Recruitment Agencies
        </div>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          Premium recruitment websites built to attract employers, candidates and better hiring enquiries.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
          Sitora designs modern, SEO-focused websites for recruitment agencies that need to look credible, present sectors clearly and generate stronger employer and candidate enquiries.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]">
            Build a Recruitment Website <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#features" className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10">
            View Features
          </a>
        </div>

        <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Employers", "Hiring enquiry focus"],
            ["Candidates", "Clear job journey"],
            ["Sectors", "Specialist SEO pages"],
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
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Recruitment Website System</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Built around employers, candidates, sectors and placements.</h2>
              </div>
              <Handshake className="h-9 w-9 shrink-0 text-white/35" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Employer Pages", "Hiring support and services"],
                ["Candidate Journey", "Jobs and applications"],
                ["Sector Pages", "Specialist recruitment SEO"],
                ["Job Listings", "Active role visibility"],
                ["Testimonials", "Employer and candidate proof"],
                ["Hire CTA", "Clear client enquiry route"],
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
                  Recruitment websites must serve two audiences at once: employers who need talent and candidates looking for opportunity.
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
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Employers and candidates judge recruitment agencies quickly.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            A weak website can make an agency look quiet or outdated. A strong recruitment website shows specialism, energy, market knowledge and clear next steps.
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
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Recruitment Website Features</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Everything a modern recruitment agency website needs.</h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
          Recruitment websites need to balance employer trust, candidate usability, job visibility, sector expertise and clear routes to hiring conversations.
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
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Recruitment agencies need pages for employers, candidates and sectors.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          Employers and candidates search differently. Dedicated pages help target the right searches and guide each audience towards the right action.
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
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A structured process for recruitment agency websites.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          Sitora plans recruitment websites around two core journeys: companies who need staff and candidates who need opportunities.
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
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(16,185,129,0.10))] p-7 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Recruitment Trust Signals</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Confidence-building elements for recruitment websites.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            Employers want to know you can find talent. Candidates want to know you are active, professional and worth applying through.
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
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Recruitment Positioning</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A recruitment website should feel active, specialist and commercially sharp.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          The best recruitment websites make it clear who the agency serves, what sectors it understands and how employers and candidates can take action quickly.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          [Target, "Clear Audience Routes", "Employers and candidates should have separate, obvious pathways."],
          [Filter, "Sector Specialism", "Industry pages help show expertise in specific markets."],
          [MessageSquareText, "Confident Messaging", "Recruitment copy should communicate speed, expertise and trust."],
          [MapPin, "Local & Regional SEO", "Location pages help target recruitment searches in key markets."],
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
      <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Start a Recruitment Website Project</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Ready to build a recruitment website that attracts employers and candidates?</h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
        Book a Sitora consultation and we’ll map out the design, employer journey, candidate journey, sector pages and SEO approach for your recruitment agency website.
      </p>
      <a href="mailto:hello@sitora.co.uk?subject=Recruitment Agency Website Design Enquiry" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]">
        Request a Recruitment Website Consultation <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
</main>

); }