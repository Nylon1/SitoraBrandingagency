"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  FileText,
  HeartPulse,
  Search,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
} from "lucide-react";

const pillars = [
  { icon: HeartPulse, title: "Service clarity", text: "Explain what the clinic offers in language patients can understand without losing clinical credibility." },
  { icon: UserRoundCheck, title: "Practitioner trust", text: "Show who delivers care, their role and the evidence patients need to feel confident taking the next step." },
  { icon: Search, title: "Local discovery", text: "Structure service and location pages around the ways patients actually search for private healthcare." },
  { icon: CalendarCheck, title: "Simple action", text: "Make booking, calling and asking a question obvious across the entire patient journey." },
];

const journey = [
  ["01", "Discover", "A patient finds the clinic through search, referral or campaign."],
  ["02", "Understand", "The page explains the service, who it is for and what happens next."],
  ["03", "Trust", "Practitioner details, evidence, reviews and clear information reduce uncertainty."],
  ["04", "Act", "The patient can book, call or enquire without hunting for the next step."],
];

export default function HealthcareClinicsWebsiteDesignPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03050a] text-white">
      <section className="relative border-b border-white/[0.07] px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(216,182,109,.14),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(56,189,248,.10),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.06fr_.94fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="sitora-kicker"><HeartPulse className="h-4 w-4" /> Healthcare Clinics</div>
            <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-7xl xl:text-[5.45rem]">Healthcare websites should make patients feel informed before they feel sold to.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl sm:leading-9">Sitora creates calm, credible digital experiences for private clinics and healthcare providers, combining service clarity, practitioner trust and simple patient journeys.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="sitora-button-primary px-6 py-3.5">Discuss a clinic website <ArrowRight className="h-4 w-4" /></a>
              <a href="#patient-journey" className="sitora-button-secondary px-6 py-3.5">See the patient journey</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12, duration: .7 }} className="sitora-panel relative overflow-hidden p-7 sm:p-9">
            <div className="absolute right-[-15%] top-[-18%] h-60 w-60 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[.2em] text-[#d8b66d]">Patient confidence system</div>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em]">Clear enough to understand. Serious enough to trust.</h2>
                </div>
                <Stethoscope className="hidden h-9 w-9 text-white/25 sm:block" />
              </div>
              <div className="mt-8 space-y-3">
                {["What does this clinic actually help with?", "Who will I see?", "Can I trust the information?", "What will happen if I contact you?"].map((item, i) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sky-300/20 text-xs font-semibold text-sky-200">0{i + 1}</span>
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-sky-300/15 bg-sky-300/[0.04] p-5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-200" />
                <p className="text-sm leading-7 text-white/55">Healthcare pages should avoid hype. Credibility comes from accurate information, clear scope, visible professionals and realistic next steps.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="sitora-kicker">What matters</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">A healthcare website is part of the care experience.</h2>
            <p className="mt-5 text-lg leading-8 text-white/55">Before anyone walks through the door, the website can already reduce uncertainty, explain choices and make access easier.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="sitora-panel p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-300/15 bg-sky-300/[0.04] text-sky-200"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="patient-journey" className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="sitora-kicker">Patient journey</div>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Design around the questions patients actually have.</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {journey.map(([num, title, text]) => (
              <div key={num} className="rounded-2xl border border-white/[0.08] bg-[#070a10] p-6">
                <div className="text-sm font-semibold text-sky-200">{num}</div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <div className="sitora-kicker">Site architecture</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em]">Every important service deserves a proper page.</h2>
            <p className="mt-5 text-base leading-8 text-white/52">Patients rarely search for a generic “healthcare clinic”. They search for a problem, service, specialist or location.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Private GP services", "Physiotherapy", "Mental health support", "Health assessments", "Specialist consultations", "Therapy services", "Wellbeing services", "Condition and advice guides"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <FileText className="h-5 w-5 shrink-0 text-sky-200" />
                <span className="text-sm text-white/68">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-sky-300/15 bg-[linear-gradient(135deg,rgba(56,189,248,.07),rgba(216,182,109,.07))] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[.2em] text-sky-200">Healthcare digital experience</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Make the first patient interaction feel clear, calm and credible.</h2>
          </div>
          <a href="/contact" className="sitora-button-primary mt-6 px-6 py-3.5 lg:mt-0">Discuss your clinic <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}
