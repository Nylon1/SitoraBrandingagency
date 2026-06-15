"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deckQuestions } from "@/lib/deckQuestions";
import { useRouter } from "next/navigation";

type FormData = Record<string, string>;

export default function GuidedDeckBuilder() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [submitting, setSubmitting] = useState(false);

  const currentStep = deckQuestions[step];
  const progress = Math.round(((step + 1) / deckQuestions.length) * 100);

  const updateField = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (step < deckQuestions.length - 1) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const submitDeck = async () => {
    setSubmitting(true);

    try {
      const response = await fetch("/api/deckstudio/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      router.push("/deckstudio/success");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#05070d] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#9f7a2f33,transparent_35%),radial-gradient(circle_at_bottom_right,#1d4ed833,transparent_30%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-8">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm text-white/60">
            <span>Sitora DeckStudio</span>
            <span>{progress}% complete</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#c9a44c] to-[#f5d77a]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-10"
            >
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
                Step {step + 1} of {deckQuestions.length}
              </p>

              <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
                {currentStep.title}
              </h1>

              <p className="mb-8 max-w-2xl text-base leading-7 text-white/65">
                {currentStep.subtitle}
              </p>

              <div className="space-y-5">
                {currentStep.fields.map((field: any) => (
                  <div key={field.name}>
                    <label className="mb-2 block text-sm font-medium text-white/80">
                      {field.label}
                      {field.required && <span className="text-[#d7b35a]"> *</span>}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        value={formData[field.name] || ""}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        rows={5}
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#d7b35a]/70"
                        placeholder="Write your answer here..."
                      />
                    ) : field.type === "select" ? (
                      <select
                        value={formData[field.name] || ""}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#d7b35a]/70"
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option: string) => (
                          <option key={option} value={option} className="bg-[#05070d]">
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.name] || ""}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#d7b35a]/70"
                        placeholder="Type here..."
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={previousStep}
                  disabled={step === 0}
                  className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/70 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Back
                </button>

                {step === deckQuestions.length - 1 ? (
                  <button
                    onClick={submitDeck}
                    disabled={submitting}
                    className="rounded-full bg-gradient-to-r from-[#c9a44c] to-[#f5d77a] px-8 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:opacity-60"
                  >
                    {submitting ? "Generating Deck..." : "Generate My Pitch Deck"}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="rounded-full bg-gradient-to-r from-[#c9a44c] to-[#f5d77a] px-8 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                  >
                    Continue
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}