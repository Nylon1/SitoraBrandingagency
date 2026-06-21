"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { aiAuditSections, AuditQuestion } from "@/lib/aiAuditQuestions";

type Answers = Record<string, string | string[]>;

export default function AIReadinessAuditForm() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [sectionIndex, setSectionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentSection = aiAuditSections[sectionIndex];

  const totalQuestions = useMemo(() => {
    return aiAuditSections.reduce(
      (total, section) => total + section.questions.length,
      0
    );
  }, []);

  const answeredQuestions = useMemo(() => {
    return Object.values(answers).filter((value) => {
      if (Array.isArray(value)) return value.length > 0;
      return value && value.trim().length > 0;
    }).length;
  }, [answers]);

  function updateAnswer(questionId: string, value: string | string[]) {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }));
  }

  function toggleMultiSelect(questionId: string, option: string) {
    const current = answers[questionId];
    const list = Array.isArray(current) ? current : [];

    if (list.includes(option)) {
      updateAnswer(
        questionId,
        list.filter((item) => item !== option)
      );
    } else {
      updateAnswer(questionId, [...list, option]);
    }
  }

  function renderQuestion(question: AuditQuestion) {
    const value = answers[question.id];

    if (question.type === "textarea") {
      return (
        <textarea
          rows={5}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => updateAnswer(question.id, event.target.value)}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
        />
      );
    }

    if (question.type === "select") {
      return (
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(event) => updateAnswer(question.id, event.target.value)}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
        >
          <option value="">Select an option</option>
          {question.options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      );
    }

    if (question.type === "multiselect") {
      const selected = Array.isArray(value) ? value : [];

      return (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {question.options?.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleMultiSelect(question.id, option)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                selected.includes(option)
                  ? "border-[#d4af37] bg-[#d4af37]/15 text-[#f3d77b]"
                  : "border-white/10 bg-black/25 text-white/70 hover:bg-white/10"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }

    return (
      <input
        value={typeof value === "string" ? value : ""}
        onChange={(event) => updateAnswer(question.id, event.target.value)}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
      />
    );
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");

    const businessName = answers.business_name;
    const contactName = answers.contact_name;
    const email = answers.email;

    if (
      typeof businessName !== "string" ||
      typeof contactName !== "string" ||
      typeof email !== "string" ||
      !businessName ||
      !contactName ||
      !email
    ) {
      setError("Please complete business name, contact name and email.");
      setSectionIndex(0);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/ai-readiness/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit audit");
      }

      router.push("/ai-readiness/audit/thank-you");
    } catch {
      setError("Sorry, the questionnaire could not be submitted. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-8">
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-white/50">
              Section {sectionIndex + 1} of {aiAuditSections.length}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {currentSection.title}
            </h2>
            <p className="mt-2 text-white/60">{currentSection.description}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/70">
            {answeredQuestions} / {totalQuestions} answered
          </div>
        </div>

        <div className="mt-6 h-2 rounded-full bg-white/10">
          <div
            className="h-2 rounded-full bg-[#d4af37]"
            style={{
              width: `${((sectionIndex + 1) / aiAuditSections.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {currentSection.questions.map((question) => (
          <div
            key={question.id}
            className="rounded-2xl border border-white/10 bg-black/20 p-5"
          >
            <label className="block text-base font-medium text-white">
              {question.question}
            </label>
            {renderQuestion(question)}
          </div>
        ))}
      </div>

      {error && <p className="mt-6 text-sm text-red-300">{error}</p>}

      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row">
        <button
          type="button"
          disabled={sectionIndex === 0}
          onClick={() => setSectionIndex((index) => Math.max(index - 1, 0))}
          className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>

        {sectionIndex < aiAuditSections.length - 1 ? (
          <button
            type="button"
            onClick={() =>
              setSectionIndex((index) =>
                Math.min(index + 1, aiAuditSections.length - 1)
              )
            }
            className="rounded-full bg-[#d4af37] px-6 py-3 font-semibold text-black transition hover:bg-[#f0cf65]"
          >
            Next section
          </button>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-full bg-[#d4af37] px-6 py-3 font-semibold text-black transition hover:bg-[#f0cf65] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit questionnaire"}
          </button>
        )}
      </div>
    </div>
  );
}