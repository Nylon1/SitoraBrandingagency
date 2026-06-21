"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Brain,
  FileCheck2,
  LockKeyhole,
  Globe2,
  CheckCircle2,
  AlertTriangle,
  Layers3,
  Building2,
  ClipboardCheck,
  Sparkles,
  Cpu,
  Scale,
  SearchCheck,
  Users,
  Mail,
  ExternalLink,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const reviewItems = [
  "AI system purpose and user impact",
  "Personal and sensitive data risks",
  "User transparency and AI disclosure",
  "Consent, privacy and data handling",
  "Human oversight and escalation flow",
  "Vendor, API and third-party AI risks",
  "Bias, unfair outcomes and harmful output risk",
  "Cybersecurity, access and incident handling",
];

const sectors = [
  "AI Startups",
  "SaaS Platforms",
  "Healthcare AI",
  "Fintech",
  "LegalTech",
  "EdTech",
  "Software Agencies",
  "Internal AI Tools",
];

const packages = [
  {
    name: "AI Risk Snapshot",
    price: "From £750",
    description:
      "For early-stage AI tools, prototypes or businesses starting to use AI internally.",
    features: [
      "AI use-case review",
      "Basic data and privacy check",
      "User disclosure review",
      "Key risk summary",
      "Priority action list",
    ],
  },
  {
    name: "AI Governance & Launch Review",
    price: "From £2,500",
    description:
      "For businesses preparing to launch customer-facing AI software or AI-powered workflows.",
    featured: true,
    features: [
      "AI system audit",
      "Data flow review",
      "AI risk register",
      "Vendor/API review",
      "Human oversight recommendations",
      "Privacy and disclosure wording",
      "Launch readiness report",
    ],
  },
  {
    name: "AI Trust Framework",
    price: "From £8,000",
    description:
      "For serious AI products, regulated sectors and businesses selling into corporate or international markets.",
    features: [
      "Full AI governance framework",
      "AI system register",
      "Product risk assessment",
      "Policy suite",
      "Software UX trust review",
      "Incident response process",
      "Board/investor-ready report",
    ],
  },
];

export default function AITrustFrameworkPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_35%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_35%),linear-gradient(180deg,#05070d_0%,#070b14_45%,#030407_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
          <a href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/30 bg-white/5 shadow-[0_0_30px_rgba(212,175,55,0.18)]">
              <Sparkles className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide">Sitora</p>
              <p className="text-xs text-white/50">AI Trust Framework</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/65 md:flex">
            <a href="#review" className="transition hover:text-white">
              What We Review
            </a>
            <a href="#packages" className="transition hover:text-white">
              Packages
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2.5 text-sm font-medium text-amber-100 shadow-[0_0_30px_rgba(212,175,55,0.12)] transition hover:bg-amber-300/20 sm:inline-flex"
          >
            Book Review
          </a>
        </header>

        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
            >
              <ShieldCheck className="h-4 w-4" />
              AI Governance • Software Compliance • Trust Systems
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-balance text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
            >
              AI Governance for{" "}
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 bg-clip-text text-transparent">
                Software That People Trust.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/68 sm:text-xl"
            >
              Sitora helps businesses, startups and software companies review,
              structure and launch AI systems with stronger safeguards, clearer
              user journeys and professional compliance-ready documentation.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 px-7 py-4 text-sm font-semibold text-black shadow-[0_0_40px_rgba(250,204,21,0.24)] transition hover:scale-[1.02]"
              >
                Book an AI Trust Review
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </a>

              <a
                href="#review"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10"
              >
                View What We Check
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {["AI Risk", "Data Flow", "Policies", "Launch Ready"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-white/70"
                  >
                    {item}
                  </div>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-amber-300/20 via-cyan-300/10 to-transparent blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/50">AI Trust Score</p>
                  <p className="mt-1 text-3xl font-semibold">Launch Review</p>
                </div>
                <div className="rounded-2xl border border-amber-300/25 bg-amber-300/10 p-3">
                  <Brain className="h-7 w-7 text-amber-200" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "User Transparency",
                    value: "Strong",
                    icon: SearchCheck,
                  },
                  {
                    label: "Data Handling",
                    value: "Needs Review",
                    icon: LockKeyhole,
                    warning: true,
                  },
                  {
                    label: "Human Oversight",
                    value: "Required",
                    icon: Users,
                    warning: true,
                  },
                  {
                    label: "Governance Docs",
                    value: "Missing",
                    icon: FileCheck2,
                    warning: true,
                  },
                ].map((row) => {
                  const Icon = row.icon;

                  return (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-xl p-2 ${
                            row.warning
                              ? "bg-amber-300/10 text-amber-200"
                              : "bg-emerald-300/10 text-emerald-200"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="font-medium">{row.label}</p>
                      </div>
                      <p
                        className={`text-sm ${
                          row.warning ? "text-amber-200" : "text-emerald-200"
                        }`}
                      >
                        {row.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
                  <p className="text-sm leading-6 text-white/72">
                    AI products need more than code. They need disclosure,
                    oversight, data controls, risk records and clear user
                    journeys before launch.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Logos / Sectors */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <p className="mb-5 text-sm uppercase tracking-[0.3em] text-white/40">
              Built for AI software across serious sectors
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {sectors.map((sector) => (
                <div
                  key={sector}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-center text-sm text-white/70"
                >
                  {sector}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100"
              >
                <Scale className="h-4 w-4" />
                The Problem
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
              >
                Most AI tools are being launched without enough governance.
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="space-y-6 text-lg leading-8 text-white/68"
            >
              <motion.p variants={fadeUp}>
                AI is no longer just a feature. It can collect personal data,
                influence decisions, generate advice, handle customer enquiries,
                process documents and create business-critical outputs.
              </motion.p>

              <motion.p variants={fadeUp}>
                The risk is that many businesses treat AI like a normal software
                plugin. They launch first, then worry about transparency,
                privacy, accuracy, human oversight and documentation later.
              </motion.p>

              <motion.p variants={fadeUp}>
                Sitora helps businesses build trust into the AI system before
                problems appear — through practical audits, clearer user
                journeys, risk controls, documentation and governance support.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Review Section */}
        <section id="review" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mb-12 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <ClipboardCheck className="h-4 w-4" />
              What Sitora Reviews
            </div>

            <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              We review the full AI software journey, not just the website.
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/65">
              From data collection and model behaviour to policies, user
              disclosure, escalation routes and launch readiness.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {reviewItems.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur transition hover:border-amber-300/30 hover:bg-white/[0.07]"
              >
                <CheckCircle2 className="mb-5 h-6 w-6 text-amber-200" />
                <p className="leading-7 text-white/75">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Offer Blocks */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Cpu,
                title: "AI Software Risk Audit",
                text: "A practical review of how your AI system works, what it affects, where the data goes and where risks may appear before launch.",
              },
              {
                icon: Layers3,
                title: "Governance & Policy Pack",
                text: "Clear documentation including AI usage policies, risk registers, transparency notices, vendor checks and incident processes.",
              },
              {
                icon: Globe2,
                title: "KSA & GCC Trust Positioning",
                text: "Support for companies preparing to sell, operate or position AI systems in Saudi Arabia, the UAE and fast-moving international markets.",
              },
            ].map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.075] to-white/[0.035] p-7 shadow-2xl backdrop-blur"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
                    <Icon className="h-7 w-7 text-amber-200" />
                  </div>
                  <h3 className="text-2xl font-semibold">{card.title}</h3>
                  <p className="mt-4 leading-7 text-white/62">{card.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* KSA Section */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/12 via-white/[0.04] to-cyan-300/10 p-7 shadow-2xl sm:p-10 lg:p-14">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-black/20 px-4 py-2 text-sm text-amber-100">
                  <Building2 className="h-4 w-4" />
                  Saudi Arabia & GCC AI Growth
                </div>

                <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  A trust advantage for businesses entering AI-led markets.
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-8 text-white/68">
                <p>
                  Saudi Arabia and the wider GCC are moving quickly towards AI,
                  data and digital transformation. For software companies and
                  professional businesses, responsible AI governance will become
                  a serious commercial advantage.
                </p>

                <p>
                  Sitora helps businesses prepare stronger AI documentation,
                  user disclosures, data-flow understanding, policy systems and
                  trust signals before selling into regulated, corporate or
                  high-growth markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mb-12 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              <FileCheck2 className="h-4 w-4" />
              Packages
            </div>

            <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Practical AI governance packages for different launch stages.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-[2rem] border p-7 shadow-2xl backdrop-blur ${
                  pkg.featured
                    ? "border-amber-300/35 bg-amber-300/[0.08]"
                    : "border-white/10 bg-white/[0.045]"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-black">
                    Most Popular
                  </div>
                )}

                <h3 className="pr-24 text-2xl font-semibold">{pkg.name}</h3>
                <p className="mt-4 text-3xl font-semibold text-amber-200">
                  {pkg.price}
                </p>
                <p className="mt-4 min-h-[84px] leading-7 text-white/62">
                  {pkg.description}
                </p>

                <div className="my-7 h-px bg-white/10" />

                <ul className="space-y-4">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-white/72">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold transition ${
                    pkg.featured
                      ? "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 text-black hover:scale-[1.02]"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Enquire About This Package
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Report Outcome */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur sm:p-10">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                What you receive
              </h2>

              <p className="mt-5 leading-8 text-white/65">
                Your AI Trust Report gives you a clear view of what needs
                improving, what documentation is missing and what could expose
                the business to risk.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Risk summary",
                  "Data flow review",
                  "Transparency check",
                  "Policy gaps",
                  "UX trust improvements",
                  "Launch readiness rating",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/72"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-7 backdrop-blur sm:p-10">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                This is not just compliance.
              </h2>

              <p className="mt-5 leading-8 text-white/65">
                It is product trust. Good AI governance makes the software feel
                safer, more professional and more credible to customers,
                investors, partners and enterprise buyers.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-5">
                <p className="text-lg font-medium text-white">
                  “Launch AI with confidence — not guesswork.”
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
                <Mail className="h-4 w-4" />
                Book an AI Trust Review
              </div>

              <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Launching AI software? Get the risks reviewed first.
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/65">
                Tell us what you are building or using. Sitora will review the
                AI system, data use, user journey and governance gaps, then
                recommend a practical next step.
              </p>

              <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
                <p className="text-sm leading-6 text-amber-50/85">
                  Ideal for AI SaaS, chatbots, digital receptionists, internal
                  AI tools, healthcare software, fintech, legaltech, edtech and
                  companies entering KSA or GCC markets.
                </p>
              </div>
            </div>

            <form className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-amber-300/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-amber-300/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-amber-300/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Website / Software Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://"
                    className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-amber-300/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Type of AI System
                  </label>
                  <select className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none transition focus:border-amber-300/50">
                    <option>AI SaaS Product</option>
                    <option>AI Chatbot</option>
                    <option>Internal AI Tool</option>
                    <option>Healthcare AI</option>
                    <option>Fintech / Insurance AI</option>
                    <option>Legal / Document AI</option>
                    <option>Education AI</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Target Market
                  </label>
                  <select className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none transition focus:border-amber-300/50">
                    <option>United Kingdom</option>
                    <option>Saudi Arabia</option>
                    <option>UAE / GCC</option>
                    <option>Europe</option>
                    <option>International</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm text-white/60">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us what your AI system does, what stage it is at, and what support you need."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-amber-300/50"
                />
              </div>

              <button
                type="button"
                className="group mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 px-7 py-4 text-sm font-semibold text-black shadow-[0_0_40px_rgba(250,204,21,0.2)] transition hover:scale-[1.01]"
              >
                Submit Enquiry
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-white/40">
                This form is currently front-end only. Connect it to Resend,
                Supabase or your preferred CRM when ready.
              </p>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-lg font-semibold">Sitora</p>
              <p className="mt-1 text-sm text-white/45">
                AI Governance • Software Compliance • Digital Trust
              </p>
            </div>

            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
            >
              Back to Sitora
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}