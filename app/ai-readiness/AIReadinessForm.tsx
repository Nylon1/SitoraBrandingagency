"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const aiUseOptions = [
  "Website chatbot",
  "CRM",
  "Customer service",
  "Marketing/content",
  "Recruitment/HR",
  "Healthcare/patient support",
  "Finance/eligibility",
  "Internal admin",
  "Software/SaaS product",
  "Not sure",
];

const supportOptions = [
  "AI Readiness Audit",
  "AI Governance Pack",
  "Website/chatbot review",
  "Staff AI policy",
  "Full implementation",
  "Not sure yet",
];

export default function AIReadinessForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedUses, setSelectedUses] = useState<string[]>([]);
  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);
  const [error, setError] = useState("");

  function toggleValue(value: string, list: string[], setter: (v: string[]) => void) {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: formData.get("name"),
      businessName: formData.get("businessName"),
      email: formData.get("email"),
      website: formData.get("website"),
      industry: formData.get("industry"),
      currentlyUsesAI: formData.get("currentlyUsesAI"),
      aiUses: selectedUses,
      hasChatbot: formData.get("hasChatbot"),
      staffUseAI: formData.get("staffUseAI"),
      entersSensitiveData: formData.get("entersSensitiveData"),
      influencesDecisions: formData.get("influencesDecisions"),
      hasPolicy: formData.get("hasPolicy"),
      supportNeeded: selectedSupport,
      concerns: formData.get("concerns"),
    };

    try {
      const response = await fetch("/api/ai-readiness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      router.push("/ai-readiness/thank-you");
    } catch (err) {
      setError("Sorry, your enquiry could not be sent. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/70">Name</label>
          <input
            name="name"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">Business name</label>
          <input
            name="businessName"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">Email address</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">Website</label>
          <input
            name="website"
            placeholder="https://"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm text-white/70">Industry / sector</label>
          <input
            name="industry"
            required
            placeholder="Dental, recruitment, finance, ecommerce, SaaS..."
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Do you currently use AI?
          </label>
          <select
            name="currentlyUsesAI"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not sure</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Do you use an AI chatbot?
          </label>
          <select
            name="hasChatbot"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Planning to</option>
            <option>Not sure</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-3 block text-sm text-white/70">
          Where is AI being used? Select all that apply.
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {aiUseOptions.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => toggleValue(option, selectedUses, setSelectedUses)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                selectedUses.includes(option)
                  ? "border-[#d4af37] bg-[#d4af37]/15 text-[#f3d77b]"
                  : "border-white/10 bg-black/25 text-white/70 hover:bg-white/10"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/70">
            Do staff use ChatGPT, Copilot, Gemini, Claude or similar?
          </label>
          <select
            name="staffUseAI"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Some staff may use it</option>
            <option>Not sure</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Do you enter customer, patient, staff or client data into AI tools?
          </label>
          <select
            name="entersSensitiveData"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Possibly</option>
            <option>Not sure</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Does AI help make or influence decisions?
          </label>
          <select
            name="influencesDecisions"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Possibly</option>
            <option>Not sure</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Do you currently have an AI policy or AI tool register?
          </label>
          <select
            name="hasPolicy"
            required
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>In progress</option>
            <option>Not sure</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-3 block text-sm text-white/70">
          What support are you interested in?
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {supportOptions.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => toggleValue(option, selectedSupport, setSelectedSupport)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                selectedSupport.includes(option)
                  ? "border-[#d4af37] bg-[#d4af37]/15 text-[#f3d77b]"
                  : "border-white/10 bg-black/25 text-white/70 hover:bg-white/10"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm text-white/70">
          Any additional concerns?
        </label>
        <textarea
          name="concerns"
          rows={5}
          placeholder="Tell us about your current AI use, concerns, or planned AI tools..."
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#d4af37]"
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-[#d4af37] px-7 py-4 font-semibold text-black transition hover:bg-[#f0cf65] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Request AI Readiness Review"}
      </button>

      <p className="mt-4 text-xs leading-6 text-white/50">
        By submitting this form, you agree for Sitora to contact you about your
        AI readiness enquiry. Sitora does not provide legal advice.
      </p>
    </form>
  );
}