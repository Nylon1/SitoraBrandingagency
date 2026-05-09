"use client";

import { motion } from "framer-motion"; import { ArrowRight, BadgeCheck, BookOpenCheck, Brain, Building2, CheckCircle2, ClipboardList, Compass, Crown, FileText, Gem, Globe2, Layers3, LineChart, MonitorSmartphone, Rocket, Search, ShieldCheck, Sparkles, Target, WandSparkles, Workflow, } from "lucide-react";

const processSteps = [ { step: "01", icon: Compass, title: "Discovery & Direction", text: "We understand your business, market, ideal clients, current website problems and the level of perception you want to create.", outcome: "Clear project direction and commercial goals.", }, { step: "02", icon: Crown, title: "Brand Positioning", text: "We define how the business should feel online: premium, corporate, local authority, global, clinical, luxury, trusted or specialist.", outcome: "A sharper brand message and stronger market position.", }, { step: "03", icon: Layers3, title: "Website Architecture", text: "We plan the page structure, service pages, industry pages, location strategy, internal links and conversion routes before design begins.", outcome: "A website structure built for growth and SEO.", }, { step: "04", icon: WandSparkles, title: "Cinematic Design", text: "We design a premium visual experience with strong hierarchy, motion, dark corporate styling, trust sections and polished brand presentation.", outcome: "A website that feels more established from the first screen.", }, { step: "05", icon: MonitorSmartphone, title: "Responsive Development", text: "We build the website mobile-first with clean sections, fast loading, reusable components and a layout that works across screen sizes.", outcome: "A smooth, responsive website ready for real users.", }, { step: "06", icon: Search, title: "SEO Structure", text: "We add page titles, descriptions, headings, internal links, content depth and SEO-led page planning around commercial searches.", outcome: "A stronger foundation for search visibility.", }, { step: "07", icon: Rocket, title: "Launch & Testing", text: "We check core pages, mobile layout, links, forms, metadata, speed basics and deployment setup before taking the site live.", outcome: "A polished launch with fewer mistakes.", }, { step: "08", icon: LineChart, title: "Growth Support", text: "After launch, the site can grow with more service pages, industry pages, case studies, location pages and lead generation campaigns.", outcome: "A scalable platform, not a static brochure.", }, ];

const deliverables = [ "Premium website structure", "Corporate brand direction", "Mobile-first responsive design", "SEO-ready page architecture", "Service and industry page planning", "Trust-led content sections", "Clear enquiry journey", "Launch-ready digital presence", ];

const principles = [ { icon: ShieldCheck, title: "Trust Before Design", text: "Every design decision should help the business feel more credible, reliable and worth contacting.", }, { icon: Target, title: "Strategy Before Pages", text: "We do not build random pages. We build a structure around services, sectors, locations and client intent.", }, { icon: Globe2, title: "Bigger Brand Perception", text: "The website should make the company feel stronger, more established and ready for larger opportunities.", }, { icon: Workflow, title: "Conversion Pathways", text: "Visitors should always know what to do next: enquire, book, call, request a quote or explore a service.", }, ];

const timeline = [ ["Week 1", "Discovery, positioning and structure"], ["Week 2", "Homepage and core visual direction"], ["Week 3", "Service pages and internal content structure"], ["Week 4", "Responsive build, polish and launch preparation"], ];

export default function ProcessPage() { return ( <main className="min-h-screen overflow-hidden bg-[#03050a] text-white"> <section className="relative min-h-screen overflow-hidden px-5 pt-32 sm:px-8 lg:pt-40"> <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(216,182,109,0.28),transparent_31%),radial-gradient(circle_at_82%_18%,rgba(37,99,235,0.20),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,#03050a_0%,#07101f_48%,#03050a_100%)]" />

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
          <Workflow className="h-4 w-4 text-[#d8b66d]" />
          The Sitora process for premium digital presence
        </div>

        <h1 className="max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.075em] text-white sm:text-7xl lg:text-8xl xl:text-[8.2rem]">
          A serious process for serious business websites.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
          Sitora combines brand direction, website architecture, cinematic design, SEO structure and conversion planning to create websites that feel premium and work commercially.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#process"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/25 transition hover:bg-[#f2cf83]"
          >
            View The Process
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Start a Project
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
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Sitora Build System</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    From unclear website to premium digital asset.
                  </h2>
                </div>
                <Brain className="h-10 w-10 shrink-0 text-white/35" />
              </div>

              <div className="space-y-4">
                {[
                  ["01", "Understand the business", "Who you serve, what you sell and what perception needs to change."],
                  ["02", "Build the structure", "Services, industries, locations, SEO pages and enquiry routes."],
                  ["03", "Design the experience", "Cinematic visuals, premium sections, trust signals and hierarchy."],
                  ["04", "Launch and grow", "Deploy, test, improve and expand the site over time."],
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
                    The goal is not only a better-looking website. The goal is stronger trust, sharper positioning and a clearer route to enquiries.
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
            <span>Discovery</span><span className="text-[#d8b66d]">•</span>
            <span>Brand Direction</span><span className="text-[#d8b66d]">•</span>
            <span>Website Architecture</span><span className="text-[#d8b66d]">•</span>
            <span>Cinematic Design</span><span className="text-[#d8b66d]">•</span>
            <span>SEO Structure</span><span className="text-[#d8b66d]">•</span>
            <span>Launch</span><span className="text-[#d8b66d]">•</span>
            <span>Growth</span><span className="text-[#d8b66d]">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>

  <section id="process" className="px-5 py-28 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">The Process</p>
        <h2 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
          Eight stages from idea to premium launch.
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/62">
          A strong website needs more than design. It needs direction, structure, trust, SEO thinking and a clear commercial journey.
        </p>
      </div>

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        {processSteps.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.03 }}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-[#d8b66d]/35 hover:bg-[#d8b66d]/10"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#d8b66d] text-[#070910] shadow-lg shadow-[#d8b66d]/20">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Stage {item.step}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">{item.text}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/36">Outcome</p>
                <p className="mt-2 text-sm leading-7 text-white/70">{item.outcome}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>

  <section className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">What You Receive</p>
        <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
          A website system designed to support the next stage of your business.
        </h2>
        <p className="mt-6 text-lg leading-8 text-white/62">
          The deliverable is not just a set of pages. It is a digital presence that improves how your company is judged, found and contacted.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {deliverables.map((item) => (
          <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-[#05070d] p-5">
            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
            <p className="text-sm leading-7 text-white/68">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="px-5 py-28 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Our Principles</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            The thinking behind every Sitora build.
          </h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
          Every page, section and interaction should earn trust, improve perception and help visitors take the next step.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {principles.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
              <Icon className="mb-8 h-8 w-8 text-[#d8b66d]" />
              <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  <section className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(37,99,235,0.12))] p-7 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Typical Timeline</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            A focused four-week build for serious website projects.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/62">
            Timelines can vary by scope, content and approvals, but a focused corporate website can often follow this type of structure.
          </p>
        </div>

        <div className="grid gap-4">
          {timeline.map(([week, text]) => (
            <div key={week} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d8b66d] text-sm font-black text-[#070910]">
                {week.replace("Week ", "W")}
              </div>
              <div>
                <p className="font-semibold text-white">{week}</p>
                <p className="mt-1 text-sm leading-7 text-white/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section id="contact" className="px-5 pb-28 pt-24 sm:px-8">
    <div className="mx-auto max-w-5xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">Start The Process</p>
      <h2 className="mt-4 text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">
        Ready to build a website with real direction behind it?
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
        Book a Sitora consultation and we’ll map out the website, branding and SEO structure your business needs to look more established and attract better clients.
      </p>
      <a
        href="mailto:hello@sitora.co.uk?subject=Sitora Process Consultation"
        className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
      >
        Request a Process Consultation <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
</main>

); }