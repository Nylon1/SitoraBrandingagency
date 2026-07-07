"use client";

import { useState } from "react";
import Link from "next/link";
export default function FullADAAuditRequestPage() {
  const [form, setForm] = useState({
    practiceName: "",
    websiteUrl: "",
    contactName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/ada-audit-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request");
      }

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  if (status === "sent") {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
        <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="mb-4 text-3xl font-semibold">
            Full ADA audit request received
          </h1>
          <p className="leading-8 text-zinc-300">
            Thank you. Sitora will review the website details and follow up with
            the next steps for the full ADA accessibility audit.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-400">
          Request Full ADA Audit
        </p>

        <h1 className="mb-6 text-4xl font-semibold">
          Full ADA Website Accessibility Audit
        </h1>

        <p className="mb-10 leading-8 text-zinc-300">
          Complete this form to request a deeper accessibility audit covering
          key website pages, forms, booking journeys, PDFs, navigation and
          patient-access risks.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <div>
            <label htmlFor="practiceName" className="mb-2 block text-sm">
              Practice name
            </label>
            <input
              id="practiceName"
              required
              value={form.practiceName}
              onChange={(e) => updateField("practiceName", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label htmlFor="websiteUrl" className="mb-2 block text-sm">
              Website URL
            </label>
            <input
              id="websiteUrl"
              required
              value={form.websiteUrl}
              onChange={(e) => updateField("websiteUrl", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="https://exampledental.com"
            />
          </div>

          <div>
            <label htmlFor="contactName" className="mb-2 block text-sm">
              Contact name
            </label>
            <input
              id="contactName"
              value={form.contactName}
              onChange={(e) => updateField("contactName", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm">
              Phone number
            </label>
            <input
              id="phone"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label htmlFor="notes" className="mb-2 block text-sm">
              Notes
            </label>
            <textarea
              id="notes"
              rows={5}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Tell us if you have booking forms, patient PDFs, videos or specific pages you want reviewed."
            />
          </div>

        

         <a
  href={`mailto:enquiries@sitora.co.uk?subject=${encodeURIComponent(
    "Full ADA Website Accessibility Audit Enquiry"
  )}&body=${encodeURIComponent(
    `Hi Sitora,

I would like to enquire about the Full ADA Website Accessibility Audit.

Practice name:
Website URL:
Contact name:
Phone number:

I am interested in a deeper accessibility audit covering key website pages, forms, booking journeys, PDFs, navigation and patient-access risks.

Please send me more information about the audit process, pricing and next steps.

Kind regards,`
  )}`}
  className="block w-full rounded-xl bg-amber-400 px-6 py-4 text-center font-semibold text-black"
>
  Request Full ADA Audit
</a>

          <p className="text-xs leading-6 text-zinc-500">
            This is an audit request, not legal advice. Sitora identifies
            practical accessibility issues and WCAG-related patient-access risks.
          </p>
        </form>
      </section>
    </main>
  );
}