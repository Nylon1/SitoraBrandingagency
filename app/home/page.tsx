"use client";

import { type ElementType } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Crown,
  Gem,
  Globe2,
  Landmark,
  Layers3,
  LineChart,
  MapPin,
  MonitorSmartphone,
  MousePointerClick,
  Network,
  Orbit,
  PanelTop,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  WandSparkles,
  Workflow,
} from "lucide-react";

const services = [
  {
    icon: MonitorSmartphone,
    title: "Corporate Website Design",
    text: "Premium websites engineered to make ambitious businesses look established, trusted and ready for serious clients.",
    href: "/corporate-website-design",
  },
  {
    icon: Layers3,
    title: "Corporate Branding",
    text: "Identity, positioning, messaging and visual direction that transforms how your company is perceived online.",
    href: "/corporate-branding",
  },
  {
    icon: Search,
    title: "SEO Market Architecture",
    text: "Service, industry and location pages planned around search intent, authority and long-term discoverability.",
    href: "/seo-lead-generation",
  },
  {
    icon: LineChart,
    title: "Lead Generation Systems",
    text: "Conversion-led journeys, trust sections and enquiry pathways designed to turn attention into opportunity.",
    href: "/seo-lead-generation",
  },
];

const sectors = [
  "Law Firms",
  "Dental Clinics",
  "Healthcare Clinics",
  "Accountants",
  "Estate Agents",
  "Construction Companies",
  "Consultants",
  "Translation Companies",
  "Recruitment Agencies",
  "Training Providers",
  "Finance Brokers",
  "Corporate Services",
];

const locations = [
  "London",
  "New York",
  "Dubai",
  "Singapore",
  "Riyadh",
  "Doha",
  "Abu Dhabi",
  "Manchester",
  "Birmingham",
  "Lancashire",
];

const signature = [
  [
    "01",
    "Cinematic Entry",
    "A powerful first screen that instantly separates your business from ordinary competitors.",
  ],
  [
    "02",
    "Corporate Authority",
    "A polished identity system with trust, messaging, typography, colour and layout discipline.",
  ],
  [
    "03",
    "Market Architecture",
    "SEO pages built around services, locations, industries and commercial search behaviour.",
  ],
  [
    "04",
    "Conversion Journey",
    "Every section guides visitors towards calls, enquiries, consultations or quote requests.",
  ],
];

function slugify(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export default function SitoraHomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03050a] text-white">
      <section className="relative min-h-screen overflow-hidden px-5 pt-32 sm:px-8 lg:pt-40">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/sitora-global-poster.jpg"
        >
          <source src="/videos/sitora-global2.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(216,182,109,0.30),transparent_31%),radial-gradient(circle_at_82%_18%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(3,5,10,0.62)_0%,rgba(7,16,31,0.76)_48%,#03050a_100%)]" />

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

        <motion.div
          animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[19%] h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-sm"
        />

        <div className="absolute left-5 top-28 hidden border-l border-[#d8b66d]/40 pl-5 text-[10px] font-bold uppercase leading-6 tracking-[0.32em] text-white/42 sm:block lg:left-10 lg:top-36">
          Strategy
          <br />
          Branding
          <br />
          Web Design
          <br />
          SEO
        </div>

        <div className="absolute right-5 top-28 hidden text-right text-[10px] font-bold uppercase leading-6 tracking-[0.32em] text-white/42 sm:block lg:right-10 lg:top-36">
          London
          <br />
          New York
          <br />
          Dubai
          <br />
          Worldwide
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-14 pb-20 lg:grid-cols-[1.04fr_.96fr]">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/72 shadow-2xl shadow-black/20 backdrop-blur">
              <Crown className="h-4 w-4 text-[#d8b66d]" />
              Global web, corporate branding & digital presence agency
            </div>

            <h1 className="max-w-6xl text-6xl font-semibold leading-[0.92] tracking-[-0.075em] text-white sm:text-7xl lg:text-8xl xl:text-[8.7rem]">
              Build a brand that looks impossible to ignore.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
              Sitora creates cinematic websites, premium corporate brands and
              SEO-led digital platforms for ambitious businesses ready to look
              bigger, sharper and more trusted online.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/25 transition hover:bg-[#f2cf83]"
              >
                Start Project Brief
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>

              <a
                href="#vision"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                See The Sitora Standard
              </a>
            </div>

            <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Global", "Corporate positioning"],
                ["Premium", "Brand-led websites"],
                ["SEO", "Built for visibility"],
                ["Leads", "Designed to convert"],
              ].map(([top, bottom]) => (
                <div
                  key={top}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur"
                >
                  <p className="text-lg font-semibold text-[#d8b66d]">
                    {top}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/48">
                    {bottom}
                  </p>
                </div>
              ))}
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
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">
                        Sitora Global Command
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Digital presence built like an asset.
                      </h2>
                    </div>
                    <Orbit className="h-10 w-10 shrink-0 text-white/35" />
                  </div>

                  <div className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-5">
                    <motion.div
                      animate={{ x: ["-20%", "120%"] }}
                      transition={{
                        duration: 4.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(216,182,109,0.18),transparent)]"
                    />

                    <div className="relative grid gap-3 sm:grid-cols-3">
                      {[
                        [Globe2, "Global"],
                        [Gem, "Premium"],
                        [Network, "Scalable"],
                      ].map(([Icon, label]) => {
                        const RealIcon = Icon as ElementType;

                        return (
                          <div
                            key={label as string}
                            className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-center"
                          >
                            <RealIcon className="mx-auto mb-3 h-6 w-6 text-[#d8b66d]" />
                            <p className="text-sm font-semibold">
                              {label as string}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {signature.map(([num, title, text]) => (
                      <motion.div
                        key={num}
                        whileHover={{ x: 4 }}
                        className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition hover:bg-white/[0.07]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8b66d] text-sm font-black text-[#070910]">
                          {num}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{title}</p>
                          <p className="mt-1 text-sm leading-6 text-white/50">
                            {text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/10 p-5">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 text-[#d8b66d]" />
                      <p className="text-sm leading-7 text-white/70">
                        Designed for businesses that need to be believed before
                        the first conversation.
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
                <span>Cinematic Corporate Websites</span>
                <span className="text-[#d8b66d]">•</span>
                <span>Brand Identity</span>
                <span className="text-[#d8b66d]">•</span>
                <span>SEO Architecture</span>
                <span className="text-[#d8b66d]">•</span>
                <span>Lead Generation</span>
                <span className="text-[#d8b66d]">•</span>
                <span>Global Positioning</span>
                <span className="text-[#d8b66d]">•</span>
                <span>Digital Headquarters</span>
                <span className="text-[#d8b66d]">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="vision" className="relative px-5 py-28 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,182,109,0.10),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
              The Sitora Standard
            </p>
            <h2 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
              We do not build “just websites”. We build corporate perception.
            </h2>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/62">
              A Sitora website is designed to make a business feel established,
              trusted and valuable. The goal is not only to look good. The goal
              is to change how clients judge the company.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {[
              [
                PanelTop,
                "First Impression",
                "The opening screen, layout, motion and visual rhythm should immediately make the business feel premium.",
              ],
              [
                Workflow,
                "Strategic Direction",
                "Every page should have a purpose: build trust, explain value, rank on Google or create enquiries.",
              ],
              [
                ScanLine,
                "Conversion Detail",
                "Trust signals, calls-to-action, page structure and copy are designed to move visitors towards action.",
              ],
            ].map(([Icon, title, text], index) => {
              const RealIcon = Icon as ElementType;

              return (
                <motion.div
                  key={title as string}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 transition hover:border-[#d8b66d]/30 hover:bg-white/[0.065]"
                >
                  <RealIcon className="mb-8 h-8 w-8 text-[#d8b66d]" />
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {title as string}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {text as string}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(37,99,235,0.12))] p-7 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75 }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
                Before / After
              </p>
              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                From ordinary online presence to serious corporate image.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/62">
                Sitora helps businesses move away from basic websites and
                towards premium digital identities that support growth,
                authority and better clients.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65 }}
                className="rounded-[2rem] border border-white/10 bg-black/25 p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                  Before
                </p>
                <h3 className="mt-4 text-2xl font-semibold">
                  Looks small and forgettable
                </h3>
                <div className="mt-6 space-y-3 text-sm text-white/55">
                  <p>• Generic design</p>
                  <p>• Weak positioning</p>
                  <p>• Thin service pages</p>
                  <p>• Poor enquiry journey</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="rounded-[2rem] border border-[#d8b66d]/30 bg-[#d8b66d]/10 p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d8b66d]">
                  After Sitora
                </p>
                <h3 className="mt-4 text-2xl font-semibold">
                  Feels premium and trusted
                </h3>
                <div className="mt-6 space-y-3 text-sm text-white/70">
                  <p>• Cinematic corporate design</p>
                  <p>• Strong brand authority</p>
                  <p>• SEO-led page structure</p>
                  <p>• Clear conversion journey</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="border-y border-white/10 bg-white/[0.025] px-5 py-28 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
                Services
              </p>
              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                Corporate websites with brand power and SEO depth.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto"
            >
              We build digital platforms that make businesses look credible,
              explain their value clearly and support growth through strategic
              content structure.
            </motion.p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.a
                  href={service.href}
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  whileHover={{ y: -8 }}
                  className="group rounded-[1.8rem] border border-white/10 bg-[#05070d] p-7 transition duration-300 hover:border-[#d8b66d]/35 hover:bg-white/[0.06]"
                >
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d8b66d]/15 text-[#d8b66d] transition group-hover:bg-[#d8b66d] group-hover:text-[#070910]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {service.text}
                  </p>
                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#d8b66d]">
                    Explore service{" "}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="industries" className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
                Industry SEO
              </p>
              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                Pages for sectors where trust decides the sale.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto"
            >
              Sitora targets specific professional sectors with dedicated
              landing pages that speak to their needs, build relevance and
              create stronger Google entry points.
            </motion.p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector, index) => (
              <motion.a
                href={`/industries/${slugify(sector)}`}
                key={sector}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.025 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#d8b66d]/40 hover:bg-[#d8b66d]/10"
              >
                <BriefcaseBusiness className="mb-5 h-5 w-5 text-[#d8b66d]" />
                <p className="text-sm text-white/45">Website Design for</p>
                <p className="mt-1 font-semibold">{sector}</p>
                <ArrowRight className="mt-5 h-4 w-4 text-[#d8b66d] transition group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="px-5 pb-28 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(37,99,235,0.12))] p-7 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75 }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
                Global Location Positioning
              </p>
              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                Built for global business hubs and high-value markets.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/62">
                Sitora creates premium corporate websites and brand platforms
                for ambitious businesses in London, New York, Dubai and other
                global commercial centres.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((location, index) => (
                <motion.div
                  key={location}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.035 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:bg-black/30"
                >
                  <MapPin className="mb-4 h-5 w-5 text-[#d8b66d]" />
                  <p className="font-semibold">
                    Corporate Website Design {location}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 pb-28 pt-6 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
              Start The Conversation
            </p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">
              Ready to look like the business you are becoming?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Start the guided project brief and we’ll understand the website,
              branding and SEO structure your business needs to attract better
              clients.
            </p>
            <a
              href="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
            >
              Start Project Brief <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}