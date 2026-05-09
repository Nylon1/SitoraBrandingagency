"use client";

import { useState, type ElementType } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Crown,
  Gem,
  MessageSquareText,
  Search,
  ShieldCheck,
  Target,
  UserRound,
  WandSparkles,
  Workflow,
} from "lucide-react";

const projectOptions = [
  "Corporate Website Design",
  "Premium Website Redesign",
  "Corporate Branding",
  "SEO & Lead Generation",
  "Industry Landing Pages",
  "Global / Location SEO",
  "Full Digital Presence",
  "Not sure yet",
];

const budgetOptions = [
  "Under £1,000",
  "£1,000 – £2,500",
  "£2,500 – £5,000",
  "£5,000 – £10,000",
  "£10,000+",
  "Not sure yet",
];

const timelineOptions = [
  "As soon as possible",
  "Within 2–4 weeks",
  "Within 1–2 months",
  "Within 3 months",
  "Planning ahead",
];

const goals = [
  "Look more premium online",
  "Generate better enquiries",
  "Improve Google visibility",
  "Launch a new brand",
  "Replace an outdated website",
  "Build a full digital presence",
];

const trustPoints = [
  "Premium corporate design direction",
  "SEO-led website architecture",
  "Mobile-first responsive build",
  "Brand positioning and messaging",
  "Conversion-focused enquiry journey",
  "Launch and growth support",
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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const steps = [
    "Your Details",
    "Project Type",
    "Goals",
    "Budget & Timeline",
    "Project Brief",
    "Review",
  ];

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
    if (step === 0) {
      return Boolean(form.name && form.business && form.email);
    }

    if (step === 1) {
      return Boolean(form.projectType);
    }

    if (step === 2) {
      return Boolean(form.goal);
    }

    if (step === 3) {
      return Boolean(form.budget && form.timeline);
    }

    if (step === 4) {
      return form.message.trim().length > 3;
    }

    return true;
  }

  async function submitBrief() {
    try {
      setStatus("sending");
      setErrorMessage("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your project brief.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your project brief."
      );
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#03050a] text-white">
      <section className="relative min-h-screen overflow-hidden px-5 pt-32 sm:px-8 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(216,182,109,0.28),transparent_31%),radial-gradient(circle_at_82%_18%,rgba(37,99,235,0.20),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,#03050a_0%,#07101f_48%,#03050a_100%)]" />

        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] bg-[size:72px_72px]" />
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

        <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-14 pb-20 lg:grid-cols-[.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/72 shadow-2xl shadow-black/20 backdrop-blur">
              <Crown className="h-4 w-4 text-[#d8b66d]" />
              Guided Sitora project application
            </div>

            <h1 className="max-w-5xl text-6xl font-semibold leading-[0.92] tracking-[-0.075em] text-white sm:text-7xl lg:text-8xl">
              Start with a clear project brief.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
              Answer a few guided questions and we’ll understand the right
              website, brand and SEO direction for your business.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                [
                  WandSparkles,
                  "Premium direction",
                  "We shape the right visual and brand approach.",
                ],
                [
                  Search,
                  "SEO structure",
                  "We think about visibility from the beginning.",
                ],
                [
                  Target,
                  "Better enquiries",
                  "The journey is designed around real business goals.",
                ],
                [
                  ShieldCheck,
                  "Serious process",
                  "A proper brief creates a stronger project.",
                ],
              ].map(([Icon, title, text]) => {
                const RealIcon = Icon as ElementType;

                return (
                  <div
                    key={title as string}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur"
                  >
                    <RealIcon className="mb-4 h-5 w-5 text-[#d8b66d]" />
                    <p className="font-semibold text-white">
                      {title as string}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/52">
                      {text as string}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            id="project-form"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.9 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-[3rem] bg-[#d8b66d]/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b111d] p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(216,182,109,0.15),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.13),transparent_35%)]" />

                <div className="relative">
                  <div className="mb-6 flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66d]">
                        Step {step + 1} of {steps.length}
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {steps[step]}
                      </h2>
                    </div>
                    <Gem className="h-10 w-10 shrink-0 text-white/35" />
                  </div>

                  <div className="mb-7 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-[#d8b66d]"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>

                  <div className="min-h-[470px]">
                    {step === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid gap-5 sm:grid-cols-2"
                      >
                        <Input
                          label="Your name"
                          value={form.name}
                          onChange={(value) => updateField("name", value)}
                          placeholder="Your full name"
                          required
                        />
                        <Input
                          label="Business name"
                          value={form.business}
                          onChange={(value) => updateField("business", value)}
                          placeholder="Your company name"
                          required
                        />
                        <Input
                          label="Email address"
                          type="email"
                          value={form.email}
                          onChange={(value) => updateField("email", value)}
                          placeholder="you@example.com"
                          required
                        />
                        <Input
                          label="Phone number"
                          value={form.phone}
                          onChange={(value) => updateField("phone", value)}
                          placeholder="Optional"
                        />
                        <div className="sm:col-span-2">
                          <Input
                            label="Current website"
                            value={form.website}
                            onChange={(value) => updateField("website", value)}
                            placeholder="https://yourwebsite.com or 'No website yet'"
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <ChoiceGrid
                        options={projectOptions}
                        selected={form.projectType}
                        onSelect={(value) => updateField("projectType", value)}
                      />
                    )}

                    {step === 2 && (
                      <ChoiceGrid
                        options={goals}
                        selected={form.goal}
                        onSelect={(value) => updateField("goal", value)}
                      />
                    )}

                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid gap-7"
                      >
                        <div>
                          <p className="mb-4 text-sm font-semibold text-white/78">
                            Budget range
                          </p>
                          <ChoiceGrid
                            options={budgetOptions}
                            selected={form.budget}
                            onSelect={(value) => updateField("budget", value)}
                            compact
                          />
                        </div>

                        <div>
                          <p className="mb-4 text-sm font-semibold text-white/78">
                            Timeline
                          </p>
                          <ChoiceGrid
                            options={timelineOptions}
                            selected={form.timeline}
                            onSelect={(value) =>
                              updateField("timeline", value)
                            }
                            compact
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid gap-4"
                      >
                        <label className="grid gap-3">
                          <span className="text-sm font-semibold text-white/78">
                            Tell us about the project
                          </span>
                          <textarea
                            value={form.message}
                            onChange={(event) =>
                              updateField("message", event.target.value)
                            }
                            rows={10}
                            placeholder="Describe your business, what you want to improve, the pages you need, your current problem and what a successful project would look like."
                            className="resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white outline-none transition placeholder:text-white/28 focus:border-[#d8b66d]/60"
                          />
                        </label>

                        <div className="rounded-2xl border border-[#d8b66d]/20 bg-[#d8b66d]/10 p-4">
                          <div className="flex gap-3">
                            <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
                            <p className="text-sm leading-7 text-white/66">
                              A stronger brief helps us recommend the right
                              website structure, brand direction and SEO plan.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 5 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid gap-4"
                      >
                        <ReviewRow label="Name" value={form.name} />
                        <ReviewRow label="Business" value={form.business} />
                        <ReviewRow label="Email" value={form.email} />
                        <ReviewRow label="Project" value={form.projectType} />
                        <ReviewRow label="Goal" value={form.goal} />
                        <ReviewRow label="Budget" value={form.budget} />
                        <ReviewRow label="Timeline" value={form.timeline} />

                        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/36">
                            Project details
                          </p>
                          <p className="mt-3 text-sm leading-7 text-white/66">
                            {form.message}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={previousStep}
                      disabled={step === 0 || status === "sending"}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 font-semibold text-white/70 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>

                    {step < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!canContinue()}
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-3.5 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={submitBrief}
                        disabled={status === "sending" || status === "success"}
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d8b66d] px-7 py-3.5 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {status === "sending"
                          ? "Sending..."
                          : status === "success"
                            ? "Brief Sent"
                            : "Send Project Brief"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {status === "success" && (
                    <div className="mt-5 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-100">
                      Your project brief has been received. Sitora will review
                      it and respond shortly.
                    </div>
                  )}

                  {status === "error" && (
                    <div className="mt-5 rounded-2xl border border-red-400/25 bg-red-400/10 p-4 text-sm leading-7 text-red-100">
                      {errorMessage}
                    </div>
                  )}
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
                <span>Corporate Website Design</span>
                <span className="text-[#d8b66d]">•</span>
                <span>Corporate Branding</span>
                <span className="text-[#d8b66d]">•</span>
                <span>SEO Architecture</span>
                <span className="text-[#d8b66d]">•</span>
                <span>Lead Generation</span>
                <span className="text-[#d8b66d]">•</span>
                <span>Premium Redesigns</span>
                <span className="text-[#d8b66d]">•</span>
                <span>Global Positioning</span>
                <span className="text-[#d8b66d]">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(216,182,109,0.14),rgba(255,255,255,0.04),rgba(37,99,235,0.12))] p-7 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
                Best Fit Projects
              </p>
              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                Sitora is built for businesses ready to look serious online.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/62">
                The best projects are with businesses that understand their
                website is not just a page online — it is a trust asset, sales
                tool and brand signal.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {trustPoints.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d8b66d]" />
                  <p className="text-sm leading-7 text-white/68">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 pt-10 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#d8b66d]">
            Direct Contact
          </p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">
            Prefer to keep it simple?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
            Email Sitora directly with your business name, website link and what
            you want to improve. A short message is enough to start.
          </p>
          <a
            href="mailto:hello@sitora.co.uk?subject=Sitora Project Enquiry"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8b66d] px-8 py-4 font-bold text-[#070910] shadow-2xl shadow-[#d8b66d]/20 transition hover:bg-[#f2cf83]"
          >
            Email hello@sitora.co.uk <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-white/78">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        placeholder={placeholder}
        className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white outline-none transition placeholder:text-white/28 focus:border-[#d8b66d]/60"
      />
    </label>
  );
}

function ChoiceGrid({
  options,
  selected,
  onSelect,
  compact = false,
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}
    >
      {options.map((option) => {
        const active = selected === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-2xl border p-4 text-left text-sm font-semibold transition ${
              active
                ? "border-[#d8b66d]/60 bg-[#d8b66d]/15 text-white"
                : "border-white/10 bg-black/25 text-white/64 hover:border-[#d8b66d]/30 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <span className="flex items-center justify-between gap-3">
              {option}
              {active && (
                <BadgeCheck className="h-4 w-4 shrink-0 text-[#d8b66d]" />
              )}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/36">
        {label}
      </p>
      <p className="mt-2 text-sm leading-7 text-white/70">
        {value || "Not provided"}
      </p>
    </div>
  );
}