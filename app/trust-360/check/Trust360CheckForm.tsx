"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";

const sectors = [
  "Dental",
  "Healthcare",
  "Aesthetics",
  "Legal",
  "Finance",
  "Property",
  "Trades",
  "E-commerce",
  "AI company",
  "Education",
  "General business",
];

const regions = ["UK", ];

export default function Trust360CheckForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/trust-360/check", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      window.location.href = `/trust-360/result/${data.auditId}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#03050a] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/trust-360"
          className="mb-8 inline-flex items-center text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Trust 360
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-8">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
              Free Exposure Check
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Submit one page and one piece of evidence.
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-white/62">
              This first verdict is based only on the URL, uploaded file,
              selected sector and visible submitted evidence.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Your name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Hamza Malik"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 outline-none ring-[#d8b66d]/40 transition placeholder:text-white/28 focus:ring-4"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Email address *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 outline-none ring-[#d8b66d]/40 transition placeholder:text-white/28 focus:ring-4"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Business name
              </label>
              <input
                name="businessName"
                type="text"
                placeholder="Example Dental Clinic"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 outline-none ring-[#d8b66d]/40 transition placeholder:text-white/28 focus:ring-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Specific page URL *
              </label>
              <input
                name="websiteUrl"
                type="url"
                required
                placeholder="https://example.com/dental-implants"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 outline-none ring-[#d8b66d]/40 transition placeholder:text-white/28 focus:ring-4"
              />
              <p className="mt-2 text-xs text-white/42">
                Use the exact page you want checked — pricing, treatment, offer,
                finance, service page or landing page.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Sector *
                </label>
                <select
                  name="sector"
                  required
                  defaultValue="Dental"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none ring-[#d8b66d]/40 transition focus:ring-4"
                >
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Region *
                </label>
                <select
                  name="region"
                  required
                  defaultValue="UK"
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none ring-[#d8b66d]/40 transition focus:ring-4"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Upload image, screenshot or PDF *
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-[#d8b66d]/35 bg-[#d8b66d]/5 px-6 py-10 text-center transition hover:bg-[#d8b66d]/10">
                <UploadCloud className="mb-4 h-10 w-10 text-[#d8b66d]" />
                <span className="font-semibold">
                  Upload advert, social post, flyer, screenshot, PDF or price list
                </span>
                <span className="mt-2 text-sm text-white/50">
                  PNG, JPG, WEBP or PDF
                </span>
                <input
                  name="file"
                  type="file"
                  required
                  accept="image/*,.pdf"
                  className="hidden"
                />
              </label>
            </div>

            <label className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
              <input
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4"
              />
              <span>
                I understand this is a preliminary digital risk review based only
                on the submitted evidence. It is not legal advice and does not
                guarantee compliance.
              </span>
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#d8b66d] px-7 py-4 font-semibold text-[#07101d] transition hover:bg-[#f0ce7b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating verdict...
                </>
              ) : (
                "Run Free Exposure Check"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}