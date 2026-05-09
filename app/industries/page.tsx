"use client";

import { motion } from "framer-motion"; import { ArrowRight, BadgeCheck, Banknote, BriefcaseBusiness, Building2, CheckCircle2, Factory, FileText, Gavel, Globe2, GraduationCap, HeartPulse, Home, Landmark, Languages, MapPin, Search, ShieldCheck, Sparkles, Stethoscope, Target, UsersRound, } from "lucide-react";

const industries = [ { icon: Gavel, title: "Law Firms", slug: "law-firms", text: "Authority-led websites for legal practices that need trust, professionalism and clear service pages.", }, { icon: Stethoscope, title: "Dental Clinics", slug: "dental-clinics", text: "Premium dental websites for clinics that want treatment pages, patient trust and stronger local visibility.", }, { icon: HeartPulse, title: "Healthcare Clinics", slug: "healthcare-clinics", text: "Clear, reassuring websites for private healthcare providers, wellbeing clinics and specialist practices.", }, { icon: Landmark, title: "Accountants", slug: "accountants", text: "Corporate websites for accountancy firms that need clarity, credibility and service-led SEO structure.", }, { icon: Home, title: "Estate Agents", slug: "estate-agents", text: "Sharp digital platforms for property businesses wanting stronger brand presence and better enquiries.", }, { icon: Factory, title: "Construction Companies", slug: "construction-companies", text: "Strong project-led websites for contractors, builders and construction firms that need to show capability.", }, { icon: BriefcaseBusiness, title: "Consultants", slug: "consultants", text: "Personal and corporate brand websites for consultants who sell expertise, trust and strategic value.", }, { icon: Languages, title: "Translation Companies", slug: "translation-companies", text: "Global-feeling websites for translation and interpreting firms serving professional and international clients.", }, { icon: UsersRound, title: "Recruitment Agencies", slug: "recruitment-agencies", text: "Modern recruitment websites designed to attract employers, candidates and serious business opportunities.", }, { icon: GraduationCap, title: "Training Providers", slug: "training-providers", text: "Professional websites for training organisations that need courses, trust signals and enquiry pathways.", }, { icon: Banknote, title: "Finance Brokers", slug: "finance-brokers", text: "Trust-first websites for finance, mortgage and advisory firms where credibility matters immediately.", }, { icon: Building2, title: "Corporate Services", slug: "corporate-services", text: "Premium websites for B2B service companies that need to look established and conversion-ready.", }, ];

const benefits = [ "Each industry page targets a specific high-value search market", "Copy is written around sector pain points, not generic web design language", "Pages can be linked from service pages, location pages and case studies", "Industry-specific FAQs help build trust and support SEO depth", "Sitora appears more specialist and credible to corporate clients", "The website gains more ranking opportunities over time", ];

const pageElements = [ "Industry-specific hero section", "Sector pain points", "Relevant website features", "SEO page strategy", "Trust and credibility sections", "FAQs for that industry", "Consultation CTA", "Internal links to related services", ];

export default function IndustriesHubPage() { return ( <main className="min-h-screen overflow-hidden bg-[#05070d] text-white"> 
  <section className="relative px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(216,182,109,0.23),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(37,99,235,0.15),transparent_30%),linear-gradient(180deg,#05070d_0%,#0b101b_48%,#05070d_100%)]" />
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
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/70 backdrop-blur">
          <BriefcaseBusiness className="h-4 w-4 text-[#d8b66d]" />
          Industry Website Design by Sitora
        </div>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          Corporate websites built around the industries that value trust.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
          Sitora creates specialist website pages for professional sectors, helping ambitious businesses look credible, explain their services clearly and target the searches their clients actually make.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#industries"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
          >
            Explore Industries <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#strategy"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            View Strategy
          </a>
        </div>

        <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Specialist", "Sector-focused pages"],
            ["SEO", "More ranking opportunities"],
            ["Trust", "Industry-specific credibility"],
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
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Industry SEO System</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">One agency. Multiple specialist markets.</h2>
              </div>
              <Globe2 className="h-9 w-9 shrink-0 text-white/35" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Law Firms", "Trust-led pages"],
                ["Dental Clinics", "Treatment SEO"],
                ["Accountants", "Service clarity"],
                ["Construction", "Project authority"],
                ["Healthcare", "Patient confidence"],
                ["Consultants", "Expert positioning"],
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
                  Industry pages make Sitora look more relevant to each type of client while creating powerful SEO entry points.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>

  <section id="industries" className="px-5 py-24 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Industries</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Website design for professional sectors.</h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
          Each sector needs different language, trust signals and page structure. Sitora can create dedicated pages that speak directly to those business owners.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => {
          const Icon = industry.icon;
          return (
            <motion.a
              href={`/industries/${industry.slug}`}
              key={industry.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="group rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d8b66d]/35 hover:bg-[#d8b66d]/10"
            >
              <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#d8b66d]/15 text-[#d8b66d] transition group-hover:bg-[#d8b66d] group-hover:text-[#070910]">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm text-white/42">Website Design for</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">{industry.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">{industry.text}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d8b66d]">
                View industry page <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  </section>

  <section id="strategy" className="border-y border-white/10 bg-white/[0.025] px-5 py-24 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Strategy</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Why industry pages are powerful for Sitora SEO.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          A business owner looking for “website design for law firms” is much warmer than someone casually searching “website designer”. Industry pages allow Sitora to target stronger commercial intent.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {benefits.map((item) => (
          <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-[#05070d] p-5">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
            <p className="text-sm leading-7 text-white/68">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="pages" className="px-5 py-24 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Page Structure</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Each industry page should feel specific, useful and conversion-focused.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          These pages should not be copied with only the industry name changed. Each one needs its own pain points, trust language, features, FAQs and internal links.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pageElements.map((type) => (
          <div key={type} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <FileText className="h-5 w-5 shrink-0 text-[#d8b66d]" />
            <span className="font-medium">{type}</span>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="px-5 pb-24 sm:px-8">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(37,99,235,0.10))] p-7 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Search Examples</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Target searches where clients already know what they need.</h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            These are the types of searches that industry pages can be built around for stronger commercial relevance.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Website design for law firms",
            "Dental clinic website design",
            "Accountant website design UK",
            "Construction company websites",
            "Website design for consultants",
            "Healthcare clinic website design",
          ].map((target) => (
            <div key={target} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
              <Search className="h-5 w-5 shrink-0 text-[#d8b66d]" />
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
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Industry Trust</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">The more relevant Sitora sounds, the easier it is to win better clients.</h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          A law firm, dental clinic, accountant and construction company all have different concerns. Industry pages allow Sitora to speak directly to each one.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          [Target, "Sharper Relevance", "Each page speaks to the business owner’s exact sector."],
          [BadgeCheck, "More Authority", "Sitora looks like it understands professional markets."],
          [ShieldCheck, "Better Trust", "Sector-specific language helps reduce hesitation."],
          [Globe2, "Stronger SEO", "More targeted pages create more entry points from Google."],
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
      <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Build Industry SEO Pages</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Ready to make Sitora visible across serious corporate sectors?</h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
        Plan a set of industry pages that help Sitora attract law firms, clinics, consultants, property companies, accountants and other high-value clients.
      </p>
      <a
        href="mailto:hello@sitora.co.uk?subject=Industry Website Pages Enquiry"
        className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
      >
        Plan Industry Pages <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
</main>

); }