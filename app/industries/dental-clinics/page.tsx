"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  FileText,
  Search,
  ShieldCheck,
  Smile,
  Star,
  Stethoscope,
  UsersRound,
} from "lucide-react";

const patientJourney = [
  ["Discover", "Local search, referrals, social proof and treatment-specific entry pages."],
  ["Understand", "Clear treatment explanations, realistic expectations, fees guidance and FAQs."],
  ["Trust", "Team profiles, reviews, credentials, clinic environment and visible patient reassurance."],
  ["Act", "Simple booking, consultation and contact routes with no unnecessary friction."],
];

const treatmentPages = [
  "Dental implants",
  "Invisalign and clear aligners",
  "Teeth whitening",
  "Cosmetic dentistry",
  "Emergency dentistry",
  "Hygiene and prevention",
  "Family dentistry",
  "Facial aesthetics",
];

const essentials = [
  { icon: Smile, title: "Treatment clarity", text: "Dedicated pages that explain options in plain language and answer the questions patients ask before they call." },
  { icon: Star, title: "Trust architecture", text: "Reviews, team profiles, credentials, imagery and reassurance designed into the journey rather than bolted on at the bottom." },
  { icon: Search, title: "Dental search structure", text: "Treatment, local and advice pages planned around patient intent so the site can rank for more than the practice name." },
  { icon: CalendarCheck, title: "Booking flow", text: "Clear routes to call, enquire or book from every important treatment page, especially on mobile." },
];

export default function DentalClinicsWebsiteDesignPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03050a] text-white">
      <section className="relative border-b border-white/[0.07] px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(216,182,109,0.14),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(42,168,154,0.14),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.04fr_.96fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="sitora-kicker">Sitora Dental · Digital presence</div>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
              Dental websites that make patients feel confident before they ever enter the clinic.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/58 sm:text-xl sm:leading-9">
              We design dental websites around the real patient journey: finding the practice, understanding treatment, building trust and taking the next step.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="sitora-btn-primary">Discuss your practice <ArrowRight className="h-4 w-4" /></Link>
              <a href="#journey" className="sitora-btn-secondary">See the patient journey</a>
            </div>

            <div className="mt-12 flex flex-wrap gap-2">
              {["Treatments", "Local SEO", "Reviews", "Fees", "Team", "Booking"].map((item) => (
                <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-xs font-medium text-white/50">{item}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.75 }}>
            <div className="sitora-panel-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#2aa89a]/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#78d0c4]">Patient confidence system</div>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">What patients need to see.</h2>
                  </div>
                  <Stethoscope className="h-8 w-8 text-[#78d0c4]/70" />
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    ["Who will treat me?", "Visible clinicians, roles and credible profiles."],
                    ["What does treatment involve?", "Clear, calm explanation without jargon overload."],
                    ["What will it cost?", "Fees or guidance that reduces uncertainty where appropriate."],
                    ["Can I trust this clinic?", "Reviews, evidence, environment and professional reassurance."],
                    ["How do I book?", "A clear next step on every important page."],
                  ].map(([title, body]) => (
                    <div key={title} className="rounded-2xl border border-white/[0.08] bg-black/20 p-5">
                      <div className="font-semibold text-white/86">{title}</div>
                      <div className="mt-2 text-sm leading-6 text-white/44">{body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="journey" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <div>
              <div className="sitora-kicker">Patient journey</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">The site should answer the next question before the patient has to ask it.</h2>
              <p className="mt-6 text-base leading-8 text-white/50">A dental website is strongest when each stage naturally leads into the next instead of presenting a pile of disconnected pages.</p>
            </div>

            <div className="space-y-3">
              {patientJourney.map(([title, body], index) => (
                <div key={title} className="grid gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:grid-cols-[60px_150px_1fr] sm:p-6">
                  <div className="text-sm font-semibold text-[#78d0c4]">0{index + 1}</div>
                  <div className="font-semibold text-white/86">{title}</div>
                  <div className="text-sm leading-7 text-white/46">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <div className="sitora-kicker">Core system</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Built for reassurance and growth.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/50 lg:ml-auto">The design should feel calm and premium. The structure underneath should work much harder: helping patients understand, search engines discover and reception teams receive better enquiries.</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {essentials.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="sitora-panel rounded-[1.5rem] p-6">
                  <Icon className="h-5 w-5 text-[#78d0c4]" />
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/46">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.76fr_1.24fr] lg:items-start">
          <div>
            <div className="sitora-kicker">Treatment architecture</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">One treatment, one clear destination.</h2>
            <p className="mt-6 text-base leading-8 text-white/50">Patients usually search for a need or treatment, not a generic practice homepage. Dedicated pages improve clarity and create more useful search entry points.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {treatmentPages.map((page) => (
              <div key={page} className="sitora-panel flex items-center gap-4 rounded-2xl p-5">
                <FileText className="h-5 w-5 shrink-0 text-[#78d0c4]" />
                <span className="text-sm font-medium text-white/72">{page}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="sitora-kicker">Trust details</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Small uncertainties stop bookings.</h2>
              <p className="mt-6 text-base leading-8 text-white/50">The site should make the clinic feel transparent without overwhelming the patient. The strongest trust signals are often simple and specific.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Dentist and team profiles",
                "Independent review highlights",
                "Fees and finance information",
                "Before-and-after galleries where appropriate",
                "Opening hours and location clarity",
                "Accessible contact and booking options",
              ].map((item) => (
                <div key={item} className="sitora-panel rounded-2xl p-5">
                  <Check className="h-5 w-5 text-[#78d0c4]" />
                  <div className="mt-4 text-sm leading-7 text-white/62">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl grid gap-4 lg:grid-cols-2">
          <Link href="/research/saudi-dental-software-landscape-2026" className="group rounded-[1.7rem] border border-white/[0.08] bg-white/[0.025] p-7 transition hover:border-[#78d0c4]/25 hover:bg-white/[0.04]">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#78d0c4]">Sitora Research</div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">Saudi Dental Software Landscape 2026</h2>
            <p className="mt-3 text-sm leading-7 text-white/46">Our research on existing dental systems, workflow fragmentation and the next layer of dental technology.</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#78d0c4]">Read the research <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
          </Link>

          <Link href="/dental-control" className="group rounded-[1.7rem] border border-[#d8b66d]/18 bg-[#d8b66d]/[0.045] p-7 transition hover:border-[#d8b66d]/30 hover:bg-[#d8b66d]/[0.065]">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d8b66d]">Sitora Intelligence</div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">Dental Control</h2>
            <p className="mt-3 text-sm leading-7 text-white/46">See how Sitora is exploring the operational layer above existing dental practice systems.</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d8b66d]">Explore Dental Control <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
          </Link>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#78d0c4]/18 bg-[linear-gradient(135deg,rgba(42,168,154,0.10),rgba(255,255,255,0.025),rgba(216,182,109,0.06))] p-7 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#78d0c4]"><ShieldCheck className="h-4 w-4" /> Patient trust starts online</div>
              <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Your clinic may already feel premium in person. The website should make that obvious before they arrive.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">We can review the current site and identify where treatment clarity, trust, search visibility and booking flow can be improved.</p>
            </div>
            <Link href="/contact" className="sitora-btn-primary whitespace-nowrap">Discuss your clinic <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
