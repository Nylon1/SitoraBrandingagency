"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";

type Report = {
  id: string;
  report_type: string;
  title: string;
  summary: string | null;
  status: string;
  storage_path: string;
  created_at: string;
  published_at: string | null;
};

type Profile = {
  email: string;
  role: string;
  client_id: string | null;
};

type Client = {
  practice_name: string;
  contact_name: string | null;
  email: string;
  website: string | null;
};

export default function PortalDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    loadPortal();
  }, []);

  async function loadPortal() {
    setLoading(true);

    const {
      data: { user }
    } = await supabaseBrowser.auth.getUser();

    if (!user) {
      router.push("/portal/login");
      return;
    }

    const { data: profileData, error: profileError } = await supabaseBrowser
      .from("profiles")
      .select("email, role, client_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profileData) {
      setMessage("Your portal profile could not be found.");
      setLoading(false);
      return;
    }

    setProfile(profileData);

    if (profileData.client_id) {
      const { data: clientData } = await supabaseBrowser
        .from("clients")
        .select("practice_name, contact_name, email, website")
        .eq("id", profileData.client_id)
        .single();

      setClient(clientData || null);

      const { data: reportData, error: reportError } = await supabaseBrowser
        .from("reports")
        .select(
          "id, report_type, title, summary, status, storage_path, created_at, published_at"
        )
        .eq("client_id", profileData.client_id)
        .order("created_at", { ascending: false });

      if (reportError) {
        setMessage(reportError.message);
      } else {
        setReports(reportData || []);
      }
    }

    setLoading(false);
  }

  async function logout() {
    await supabaseBrowser.auth.signOut();
    router.push("/portal/login");
  }

  async function downloadReport(reportId: string) {
  setMessage("Preparing secure download...");

  try {
    const {
      data: { session }
    } = await supabaseBrowser.auth.getSession();

    const response = await fetch("/api/portal/download-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.access_token
      },
      body: JSON.stringify({
        reportId
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Download failed");
    }

    window.open(result.signedUrl, "_blank");
    setMessage("");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown download error";

    setMessage("Download failed: " + errorMessage);
  }
}

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <p className="text-slate-300">Loading your portal...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Sitora Healthcare
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Client Report Portal
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              Securely view and download your Sitora Healthcare audit reports.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-2xl border border-white/10 px-5 py-3 font-semibold text-white hover:bg-white/10"
          >
            Sign Out
          </button>
        </div>

        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Logged in as</p>
          <p className="mt-1 font-semibold text-white">{profile?.email}</p>

          {client && (
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Practice
                </p>
                <p className="mt-2 font-semibold text-white">
                  {client.practice_name}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Contact
                </p>
                <p className="mt-2 font-semibold text-white">
                  {client.contact_name || "Not added"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Website
                </p>
                <p className="mt-2 break-words font-semibold text-white">
                  {client.website || "Not added"}
                </p>
              </div>
            </div>
          )}
        </div>

        {message && (
          <p className="mb-6 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-200">
            {message}
          </p>
        )}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Your Reports</h2>

          {reports.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">
              No reports are currently available.
            </p>
          ) : (
            <div className="mt-6 grid gap-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
                      {report.report_type}
                    </span>

                    <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      {report.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {report.title}
                  </h3>

                  {report.summary && (
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {report.summary}
                    </p>
                  )}
<div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/5 p-4">
  <p className="text-sm font-semibold text-emerald-100">
    Available for secure download
  </p>
  <p className="mt-1 text-xs leading-5 text-slate-400">
    This download link is generated securely and expires shortly after opening.
  </p>
</div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => downloadReport(report.id)}
                      className="rounded-2xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-200"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}