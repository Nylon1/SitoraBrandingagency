"use client";

import { useState, type ElementType } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  Gem,
  Globe2,
  HeartPulse,
  Layers3,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  WandSparkles,
  Workflow,
} from "lucide-react";

const projectOptions = [
  "Corporate Website Design",
  "Premium Website Redesign",
  "Corporate Branding",
  "SEO & Lead Generation",
  "Healthcare Digital Project",
  "Dental Control / Dental Intelligence",
  "AI Readiness / Governance",
  "Custom Digital System",
  "Research / Strategic Collaboration",
  "Not sure yet",
];

const budgetOptions = [
  "Under £1,000",
  "£1,000 – £2,500",
  "£2,500 – £5,000",
  "£5,000 – £10,000",
  "£10,000 – £25,000",
  "£25,000+",
  "Not sure yet",
];

const timelineOptions = [
  "As soon as possible",
  "Within 2–4 weeks",
  "Within 1–2 months",
  "Within 3 months",
  "3–6 months",
  "Exploring / planning ahead",
];

const goals = [
  "Improve our digital presence",
  "Generate better enquiries",
  "Improve search visibility",
  "Launch or reposition a brand",
  "Build a healthcare or dental platform",
  "Improve operational intelligence",
  "Assess AI readiness or governance",
  "Develop a new digital concept",
  "Explore a research collaboration",
  "Not sure yet",
];

const capabilityCards = [
  [WandSparkles, "Digital", "Websites, branding, SEO and high-trust digital journeys."],
  [BrainCircuit, "Intelligence", "Operational intelligence, AI readiness and decision-support concepts."],
  [HeartPulse, "Healthcare", "Dental and healthcare systems designed around real workflows."],
  [Sparkles, "Research", "Independent research, policy work and strategic exploration."],
] as const;

const trustPoints = [
  "Clear problem definition before solution design",
  "Premium digital and product design direction",
  "Healthcare and dental workflow understanding",
  "Evidence-led research and strategic thinking",
  "AI governance and accountability built into the conversation",
  "A route from early concept to working prototype",
];

type FormData = {
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  projectType: string;
  goal: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  business: "",
  email: "",
  phone: "",
  website: "",
  projectType: "",
  goal: "",
  budget: "",
  timeline: "",
  message: "",
};

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const steps = ["Your Details", "Project Type", "Primary Goal", "Budget & Timing", "Project Brief", "Review"];
  const progress = ((step + 1) / steps.length) * 100;

  function updateField(field: keyof FormData, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function nextStep() {
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function canContinue() {
    if (step === 0) return Boolean(form.name && form.business && form.email);
    if (step === 1) return Boolean(form.projectType);
    if (step === 2) return Boolean(form.goal);
    if (step === 3) return Boolean(form.budget && form.timeline);
    if (step === 4) return form.message.trim().length > 3;
    return true;
  }

  async function submitBrief() {
    try {
      setStatus("sending");
      setErrorMessage("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your project brief.");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to send your project brief.");
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#03050a] text-white">
      <section className="relative px-5 pb-24 pt-32 sm:px-8 lg:pb-32 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(216,182,109,0.22),transparent_31%),radial-gradient(circle_at_84%_18%,rgba(37,99,235,0.16),transparent_34%),linear-gradient(180deg,#03050a_0%,#07101b_50%,#03050a_100%)]" />
        <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.88fr_1.12fr] lg:items-start">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="lg:sticky lg:top-32">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/68 backdrop-blur">
              <Workflow className="h-4 w-4 text-[#d8b66d]" />
              Start a Sitora project
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Tell us what you are trying to solve.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62">
              Sitora works across digital, healthcare, intelligence and research. Start with the problem, the opportunity or the idea. We can help shape what the right next step should be.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {capabilityCards.map(([Icon, title, text]) => {
                const RealIcon = Icon as ElementType;
                return (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur">
                    <RealIcon className="mb-4 h-5 w-5 text-[#d8b66d]" />
                    <p className="font-semibold">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/48">{text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/[0.07] p-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
                <p className="text-sm leading-7 text-white/60">
                  You do not need a finished specification. Early-stage ideas, complex operational problems and exploratory conversations are welcome.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div id="project-form" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.75 }} className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-[#d8b66d]/8 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-4">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0a0f18] p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(216,182,109,0.10),transparent_34%),radial-gradient(circle_at_15%_90%,rgba(59,130,246,0.09),transparent_38%)]" />
                <div className="relative">
                  <div className="mb-6 flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d8b66d]">Step {step + 1} of {steps.length}</p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{steps[step]}</h2>
                    </div>
                    <Gem className="h-9 w-9 shrink-0 text-white/28" />
                  </div>

                  <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-[#d8b66d]" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
                  </div>

                  <div className="min-h-[480px]">
                    {step === 0 && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5 sm:grid-cols-2">
                        <Input label="Your name" value={form.name} onChange={(value) => updateField("name", value)} placeholder="Your full name" required />
                        <Input label="Organisation / business" value={form.business} onChange={(value) => updateField("business", value)} placeholder="Company, clinic or organisation" required />
                        <Input label="Email address" type="email" value={form.email} onChange={(value) => updateField("email", value)} placeholder="you@example.com" required />
                        <Input label="Phone number" value={form.phone} onChange={(value) => updateField("phone", value)} placeholder="Optional" />
                        <div className="sm:col-span-2">
                          <Input label="Website or relevant link" value={form.website} onChange={(value) => updateField("website", value)} placeholder="Optional" />
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && <ChoiceGrid options={projectOptions} selected={form.projectType} onSelect={(value) => updateField("projectType", value)} />}
                    {step === 2 && <ChoiceGrid options={goals} selected={form.goal} onSelect={(value) => updateField("goal", value)} />}

                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-7">
                        <div>
                          <p className="mb-4 text-sm font-semibold text-white/74">Indicative budget</p>
                          <ChoiceGrid options={budgetOptions} selected={form.budget} onSelect={(value) => updateField("budget", value)} compact />
                        </div>
                        <div>
                          <p className="mb-4 text-sm font-semibold text-white/74">Timing</p>
                          <ChoiceGrid options={timelineOptions} selected={form.timeline} onSelect={(value) => updateField("timeline", value)} compact />
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
                        <label className="grid gap-3">
                          <span className="text-sm font-semibold text-white/74">Tell us what you are trying to achieve</span>
                          <textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} rows={11} placeholder="Describe the problem, opportunity or idea. Tell us what happens today, what you want to improve, who is involved and what a good outcome would look like." className="resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#d8b66d]/60" />
                        </label>
                        <div className="rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/[0.07] p-4">
                          <div className="flex gap-3">
                            <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
                            <p className="text-sm leading-7 text-white/60">You can keep this simple. We are more interested in understanding the real problem than receiving a polished brief.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 5 && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
                        <ReviewRow label="Name" value={form.name} />
                        <ReviewRow label="Organisation" value={form.business} />
                        <ReviewRow label="Email" value={form.email} />
                        <ReviewRow label="Project" value={form.projectType} />
                        <ReviewRow label="Primary goal" value={form.goal} />
                        <ReviewRow label="Budget" value={form.budget} />
                        <ReviewRow label="Timing" value={form.timeline} />
                        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/34">Project details</p>
                          <p className="mt-3 text-sm leading-7 text-white/66">{form.message}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button type="button" onClick={previousStep} disabled={step === 0 || status === "sending"} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 font-semibold text-white/66 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>

                    {step < steps.length - 1 ? (
                      <button type="button" onClick={nextStep} disabled={!canContinue()} className="sitora-button-primary px-7 py-3.5 disabled:cursor-not-allowed disabled:opacity-40">
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button type="button" onClick={submitBrief} disabled={status === "sending" || status === "success"} className="sitora-button-primary px-7 py-3.5 disabled:cursor-not-allowed disabled:opacity-50">
                        {status === "sending" ? "Sending..." : status === "success" ? "Brief Sent" : "Send Project Brief"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {status === "success" && <div className="mt-5 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-100">Your brief has been received. Sitora will review it and respond shortly.</div>}
                  {status === "error" && <div className="mt-5 rounded-2xl border border-red-400/25 bg-red-400/10 p-4 text-sm leading-7 text-red-100">{errorMessage}</div>}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8b66d]">How we think</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Start with the problem. Then design the right system.</h2>
              <p className="mt-6 text-lg leading-8 text-white/58">A website may be the answer. Sometimes the answer is a workflow, an intelligence layer, a prototype, an audit or a research programme. We do not force every problem into the same service.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {trustPoints.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-[#05070d] p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
                  <p className="text-sm leading-7 text-white/64">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.11),rgba(255,255,255,0.035),rgba(37,99,235,0.08))] p-7 sm:p-10 lg:p-12">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              [Globe2, "Digital", "Web, brand, SEO and conversion journeys."],
              [BrainCircuit, "Intelligence", "AI readiness, operational insight and custom systems."],
              [Layers3, "Research", "Evidence, policy, market analysis and strategic exploration."],
            ].map(([Icon, title, text]) => {
              const RealIcon = Icon as ElementType;
              return (
                <div key={title as string}>
                  <RealIcon className="h-6 w-6 text-[#d8b66d]" />
                  <h3 className="mt-5 text-2xl font-semibold">{title as string}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/54">{text as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d8b66d]">Direct contact</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Prefer to send a short message?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/58">Email Sitora with the problem, idea or opportunity. You do not need to know which service it belongs to.</p>
          <a href="mailto:hello@sitora.co.uk?subject=Sitora Project Enquiry" className="sitora-button-primary mt-9 px-8 py-4">Email hello@sitora.co.uk <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}

function Input({ label, value, onChange, placeholder, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; required?: boolean; }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-white/74">{label}{required ? " *" : ""}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} type={type} placeholder={placeholder} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#d8b66d]/60" />
    </label>
  );
}

function ChoiceGrid({ options, selected, onSelect, compact = false }: { options: string[]; selected: string; onSelect: (value: string) => void; compact?: boolean; }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
      {options.map((option) => {
        const active = selected === option;
        return (
          <button key={option} type="button" onClick={() => onSelect(option)} className={`rounded-2xl border p-4 text-left text-sm font-semibold transition ${active ? "border-[#d8b66d]/60 bg-[#d8b66d]/15 text-white" : "border-white/10 bg-black/25 text-white/62 hover:border-[#d8b66d]/30 hover:bg-white/[0.05] hover:text-white"}`}>
            <span className="flex items-center justify-between gap-3">{option}{active && <BadgeCheck className="h-4 w-4 shrink-0 text-[#d8b66d]" />}</span>
          </button>
        );
      })}
    </motion.div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/34">{label}</p>
      <p className="mt-2 text-sm leading-7 text-white/68">{value || "Not provided"}</p>
    </div>
  );
}
