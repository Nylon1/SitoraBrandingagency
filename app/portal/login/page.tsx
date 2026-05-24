"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";

export default function PortalLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginClient() {
    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setMessage("Signing in...");

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/portal");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
          Sitora Healthcare
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          Client Report Portal
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-300">
          Sign in securely to view and download your Sitora Healthcare audit
          reports.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Email address
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="client@example.co.uk"
            className="mb-4 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-amber-300/40 placeholder:text-slate-500 focus:ring-4"
          />

          <label className="mb-2 block text-sm font-medium text-slate-200">
            Password
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            className="mb-5 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-amber-300/40 placeholder:text-slate-500 focus:ring-4"
          />

          <button
            onClick={loginClient}
            disabled={loading}
            className="w-full rounded-2xl bg-amber-300 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-200 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {message && (
            <p className="mt-4 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-200">
              {message}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}