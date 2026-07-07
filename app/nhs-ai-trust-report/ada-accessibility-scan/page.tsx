"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ADAAccessibilityScanPage() {
  const router = useRouter();

  const [practiceName, setPracticeName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsScanning(true);

    try {
      const res = await fetch("/api/accessibility-scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          practiceName,
          websiteUrl,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Scan failed");
      }

      router.push(`/ada-accessibility-scan/results/${data.id}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsScanning(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-400">
          Sitora ADA Accessibility Risk Scan
        </p>

        <h1 className="mb-6 text-4xl font-semibold tracking-tight md:text-6xl">
          Could disabled patients use your dental website?
        </h1>

        <p className="mb-10 text-lg leading-8 text-zinc-300">
          Run a WCAG-based accessibility risk scan to identify common issues
          affecting screen-reader users, keyboard navigation, forms, images,
          contrast, links and patient access.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="practiceName" className="mb-2 block text-sm">
                Practice name
              </label>
              <input
                id="practiceName"
                value={practiceName}
                onChange={(e) => setPracticeName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Example Dental Practice"
              />
            </div>

            <div>
              <label htmlFor="websiteUrl" className="mb-2 block text-sm">
                Website URL
              </label>
              <input
                id="websiteUrl"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="https://exampledental.com"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="you@example.com"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isScanning}
              className="w-full rounded-xl bg-amber-400 px-5 py-4 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isScanning ? "Scanning..." : "Run Free Accessibility Scan"}
            </button>

            <p className="text-xs leading-6 text-zinc-400">
              This automated scan identifies common accessibility issues. It
              does not guarantee ADA compliance or replace legal advice.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}