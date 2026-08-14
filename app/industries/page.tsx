"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Factory,
  Gavel,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Languages,
  Stethoscope,
  UsersRound,
} from "lucide-react";

const industries = [
  { icon: Gavel, title: "Law Firms", slug: "law-firms", text: "Authority-led digital presence for firms selling judgement, trust and specialist expertise." },
  { icon: Stethoscope, title: "Dental Clinics", slug: "dental-clinics", text: "Patient-first websites built around treatment clarity, confidence, local visibility and booking." },
  { icon: HeartPulse, title: "Healthcare Clinics", slug: "healthcare-clinics", text: "Calm, credible digital experiences for specialist clinics and private healthcare providers." },
  { icon: Landmark, title: "Accountants", slug: "accountants", text: "Clear corporate sites for firms that need to explain services, sectors and advisory value." },
  { icon: Home, title: "Estate Agents", slug: "estate-agents", text: "Polished property brands with stronger local presence and clearer routes to valuation and enquiry." },
  { icon: Factory, title: "Construction Companies", slug: "construction-companies", text: "Project-led websites that communicate scale, capability, sectors, accreditations and delivery confidence." },
  { icon: BriefcaseBusiness, title: "Consultants", slug: "consultants", text: "Expert-led websites for advisors whose credibility, thinking and track record are the product." },
  { icon: Languages, title: "Translation Companies", slug: "translation-companies", text: "International-facing websites built around sectors, languages, trust and procurement confidence." },
  { icon: UsersRound, title: "Recruitment Agencies", slug: "recruitment-agencies", text: "Dual-audience experiences designed for employers, candidates and specialist market positioning." },
  { icon: GraduationCap, title: "Training Providers", slug: "training-providers", text: "Structured sites for organisations that need to present courses, outcomes, accreditation and enrolment clearly." },
  { icon: Banknote, title: "Finance Brokers", slug: "finance-brokers", text: "Trust-led digital presence for financial businesses where clarity, credibility and compliance-aware design matter." },
  { icon: Building2, title: "Corporate Services", slug: "corporate-services", text: "Premium B2B websites for firms selling complex services to decision-makers and professional buyers." },
];

const principles = [
  ["Sector language", "The page should sound like it understands the buyer, not like generic agency copy with an industry name inserted."],
  ["Relevant proof", "Trust signals, case studies, accreditation and reassurance should match the way that sector makes decisions."],
  ["Search intent", "Service and topic architecture should reflect what prospective clients or patients actually search for."],
  ["Clear action", "Each sector needs a conversion route that fits its buying journey, from consultation to booking, valuation or enquiry."],
];

export default function IndustriesHubPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03050a] text-white">
      <section className="relative border-b border-white/[0.07] px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(216,182,109,0.15),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(42,168,154,0.10),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-5xl">
            <div className="sitora-kicker">Sector expertise</div>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-[5.8rem]">
              Digital presence designed around how your market actually decides.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58 sm:text-xl sm:leading-9">
              Different sectors need different proof, language, search architecture and conversion journeys. Sitora adapts the system around the market rather than forcing every client into the same template.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#industries" className="sitora-btn-primary">Explore sectors <ArrowRight className="h-4 w-4" /></a>
              <Link href="/contact" className="sitora-btn-secondary">Discuss your sector</Link>
            </div>
          </motion.div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(([title, body]) => (
              <div key={title} className="sitora-panel rounded-2xl p-5">
                <div className="text-sm font-semibold text-[#e5c57e]">{title}</div>
                <p className="mt-3 text-sm leading-6 text-white/44">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <div className="sitora-kicker">Industries</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Specialist pages without the specialist-agency cliché.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/50 lg:ml-auto">
              Each sector page is built around its own commercial or patient journey. The visual language remains recognisably Sitora, but the priorities change with the audience.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.025, 0.18) }}
                >
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group block h-full rounded-[1.6rem] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d8b66d]/25 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/10 text-[#d8b66d]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-[#d8b66d]" />
                    </div>
                    <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">{industry.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/48">{industry.text}</p>
                    <div className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#d8b66d]/80">View sector approach</div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div>
            <div className="sitora-kicker">The difference</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Same design discipline. Different commercial logic.</h2>
            <p className="mt-6 text-base leading-8 text-white/50">
              A dental patient, a legal client and a procurement director do not make decisions in the same way. The website should reflect that.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Healthcare", "Reassurance, accessibility, service clarity, patient confidence and low-friction booking."],
              ["Professional services", "Authority, expertise, sectors served, proof, people and a credible consultation route."],
              ["Property & construction", "Projects, geography, scale, capability, accreditations and visible delivery experience."],
              ["Corporate B2B", "Complex services simplified for time-poor decision-makers with clear proof and commercial next steps."],
            ].map(([title, body]) => (
              <div key={title} className="sitora-panel rounded-2xl p-6">
                <h3 className="font-semibold text-white/86">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/46">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#d8b66d]/20 bg-[linear-gradient(135deg,rgba(216,182,109,0.10),rgba(255,255,255,0.025),rgba(42,168,154,0.06))] p-7 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="sitora-kicker">Your market</div>
              <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">If your sector is not listed, the method still applies.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">We can map the buying journey, search demand, credibility requirements and page architecture for specialist sectors beyond the current collection.</p>
            </div>
            <Link href="/contact" className="sitora-btn-primary whitespace-nowrap">Discuss your market <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
