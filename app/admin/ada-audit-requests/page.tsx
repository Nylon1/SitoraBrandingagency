"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminADAAuditRequestsPage() {
  const [practiceName, setPracticeName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [pagesRequested, setPagesRequested] = useState("10");

  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [resultId, setResultId] = useState("");

  async function runFullScan(e: React.FormEvent) {
    e.preventDefault();

    setStatus("running");
    setError("");
    setResultId("");

    try {
      const res = await fetch("/api/admin/ada-full-scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          practiceName,
          websiteUrl,
          email,
          pagesRequested: Number(pagesRequested),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to run full scan");
      }

      setResultId(data.id);
      setStatus("success");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 text-sm text-zinc-400">
          <Link href="/" className="hover:text-amber-400">
            Home
          </Link>{" "}
          / Admin / ADA Full Scan
        </div>

        <h1 className="mb-4 text-3xl font-semibold">
          Full ADA Audit Scanner
        </h1>

        <p className="mb-8 max-w-3xl leading-8 text-zinc-300">
          Run a private full ADA accessibility scan from the admin area. This
          scans multiple internal pages, saves the result, and creates a report
          record under free scan records.
        </p>

        <form
          onSubmit={runFullScan}
          className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="practiceName" className="mb-2 block text-sm">
                Practice name
              </label>
              <input
                id="practiceName"
                value={practiceName}
                onChange={(e) => setPracticeName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Lee Orthodontics"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm">
                Client email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="client@example.com"
              />
            </div>

            <div>
              <label htmlFor="websiteUrl" className="mb-2 block text-sm">
                Website URL
              </label>
              <input
                id="websiteUrl"
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="https://exampledental.com"
              />
            </div>

            <div>
              <label htmlFor="pagesRequested" className="mb-2 block text-sm">
                Pages to scan
              </label>
              <select
                id="pagesRequested"
                value={pagesRequested}
                onChange={(e) => setPagesRequested(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="5">5 pages</option>
                <option value="10">10 pages</option>
                <option value="15">15 pages</option>
                <option value="25">25 pages</option>
              </select>
            </div>
          </div>

          {status === "error" && (
            <p
              role="alert"
              className="mt-5 rounded-xl bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          {status === "success" && resultId && (
            <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="mb-3 text-sm text-emerald-200">
                Full ADA scan completed successfully.
              </p>

              <Link
                href={`/ada-accessibility-scan/results/${resultId}`}
                className="inline-flex rounded-xl bg-amber-400 px-5 py-3 font-semibold text-black"
              >
                View Full Scan Result
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "running"}
            className="mt-6 w-full rounded-xl bg-amber-400 px-6 py-4 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "running"
              ? "Running full ADA scan..."
              : "Run Full ADA Scan"}
          </button>

          <p className="mt-4 text-xs leading-6 text-zinc-500">
            This admin scan may take 1–3 minutes depending on the number of
            pages and the target website.
          </p>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Audit Records</h2>

          <p className="mb-6 text-zinc-300">
            Completed full scans are saved into the accessibility scan records.
          </p>

          <Link
            href="/admin/accessibility-scans"
            className="inline-flex rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:border-amber-400 hover:text-amber-400"
          >
            View scan records
          </Link>
        </div>
      </section>
    </main>
  );
}