"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";

type Client = {
  id: string;
  practice_name: string;
  contact_name: string | null;
  email: string;
  website: string | null;
};

type Profile = {
  role: string;
  email: string;
};

export default function AdminReportsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [clients, setClients] = useState<Client[]>([]);

  const [selectedClientId, setSelectedClientId] = useState("");
  const [newPracticeName, setNewPracticeName] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  const [reportType, setReportType] = useState("Compliance Audit");
  const [reportTitle, setReportTitle] = useState("");
  const [reportSummary, setReportSummary] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loginCreating, setLoginCreating] = useState(false);
  const [clientLoginEmail, setClientLoginEmail] = useState("");
  const [clientLoginPassword, setClientLoginPassword] = useState("");

  useEffect(() => {
    loadAdmin();
  }, []);

  async function loadAdmin() {
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
      .select("email, role")
      .eq("id", user.id)
      .single();

    if (profileError || !profileData) {
      setMessage("Admin profile not found.");
      setLoading(false);
      return;
    }

    setProfile(profileData);

    if (profileData.role !== "admin") {
      setMessage("Access denied. This page is for Sitora admins only.");
      setLoading(false);
      return;
    }

    await loadClients();
    setLoading(false);
  }

  async function loadClients() {
    const { data, error } = await supabaseBrowser
      .from("clients")
      .select("id, practice_name, contact_name, email, website")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setClients(data || []);
    }
  }

  function makeSafeFileName(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  async function createClientIfNeeded() {
    if (selectedClientId) {
      return selectedClientId;
    }

    if (!newPracticeName.trim() || !newEmail.trim()) {
      throw new Error(
        "Add a practice name and email, or select an existing client."
      );
    }

    const { data, error } = await supabaseBrowser
      .from("clients")
      .insert({
        practice_name: newPracticeName.trim(),
        contact_name: newContactName.trim() || null,
        email: newEmail.trim(),
        website: newWebsite.trim() || null
      })
      .select("id")
      .single();

    if (error || !data) {
      throw new Error(error?.message || "Could not create client.");
    }

    await loadClients();

    return data.id;
  }

  async function uploadReport() {
    if (!selectedFile) {
      setMessage("Please select a PDF file.");
      return;
    }

    if (!reportTitle.trim()) {
      setMessage("Please enter a report title.");
      return;
    }

    setUploading(true);
    setMessage("Uploading report...");

    try {
      const clientId = await createClientIfNeeded();

      const client =
        clients.find((item) => item.id === clientId) ||
        ({
          practice_name: newPracticeName
        } as Client);

      const folder = makeSafeFileName(client.practice_name || "client");
      const rawName = selectedFile.name.replace(/\.pdf$/i, "");
      const fileName =
        Date.now() + "-" + makeSafeFileName(rawName) + ".pdf";
      const storagePath = folder + "/" + fileName;

      const { error: uploadError } = await supabaseBrowser.storage
        .from("client-reports")
        .upload(storagePath, selectedFile, {
          contentType: "application/pdf",
          upsert: false
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { error: reportError } = await supabaseBrowser
        .from("reports")
        .insert({
          client_id: clientId,
          report_type: reportType,
          title: reportTitle.trim(),
          summary:
            reportSummary.trim() ||
            "Your Sitora Healthcare audit report is ready to download securely.",
          status: "ready",
          storage_path: storagePath
        });

      if (reportError) {
        throw new Error(reportError.message);
      }

      setMessage("Report uploaded and assigned successfully.");

      setSelectedClientId(clientId);
      setReportTitle("");
      setReportSummary("");
      setSelectedFile(null);
      setNewPracticeName("");
      setNewContactName("");
      setNewEmail("");
      setNewWebsite("");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown upload error";

      setMessage("Upload failed: " + errorMessage);
    }

    setUploading(false);
  }

  async function createClientLogin() {
    const clientId = selectedClientId;

    if (!clientId) {
      setMessage("Select an existing client first before creating a login.");
      return;
    }

    const client = clients.find((item) => item.id === clientId);

    if (!client?.email) {
      setMessage("Selected client does not have an email address.");
      return;
    }

    setLoginCreating(true);
    setMessage("Creating client login...");

    try {
      const {
        data: { session }
      } = await supabaseBrowser.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Admin session not found. Please sign in again.");
      }

      const response = await fetch("/api/admin/create-client-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.access_token
        },
        body: JSON.stringify({
          clientId,
          email: client.email
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not create client login.");
      }

      setClientLoginEmail(result.email);
      setClientLoginPassword(result.tempPassword);
      setMessage("Client login created successfully.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown login creation error";

      setMessage("Login creation failed: " + errorMessage);
    }

    setLoginCreating(false);
  }

  async function logout() {
    await supabaseBrowser.auth.signOut();
    router.push("/portal/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <p className="text-slate-300">Loading admin...</p>
      </main>
    );
  }

  if (profile?.role !== "admin") {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <section className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold">Access denied</h1>
          <p className="mt-4 text-slate-300">{message}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Sitora Admin
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Upload Client Reports
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              Add clients, create client logins, upload final PDF reports, and
              assign them securely to the client portal.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-2xl border border-white/10 px-5 py-3 font-semibold text-white hover:bg-white/10"
          >
            Sign Out
          </button>
        </div>

        {message && (
          <p className="mb-6 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-200">
            {message}
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Client</h2>

            <label className="mb-2 mt-5 block text-sm font-medium text-slate-200">
              Select existing client
            </label>

            <select
              value={selectedClientId}
              onChange={(e) => {
                setSelectedClientId(e.target.value);
                setClientLoginEmail("");
                setClientLoginPassword("");
              }}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-amber-300/40 focus:ring-4"
            >
              <option value="">Create new client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.practice_name} — {client.email}
                </option>
              ))}
            </select>

            {selectedClientId && (
              <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4">
                <p className="text-sm font-semibold text-amber-100">
                  Client Portal Login
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  Create a secure login for this client so they can access their
                  reports.
                </p>

                <button
                  onClick={createClientLogin}
                  disabled={loginCreating}
                  className="mt-4 rounded-2xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-200 disabled:opacity-50"
                >
                  {loginCreating ? "Creating Login..." : "Create Client Login"}
                </button>

                {clientLoginEmail && clientLoginPassword && (
                  <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/5 p-4">
                    <p className="text-sm font-semibold text-emerald-100">
                      Login details created
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      Email:{" "}
                      <span className="font-semibold text-white">
                        {clientLoginEmail}
                      </span>
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Temporary password:{" "}
                      <span className="font-semibold text-white">
                        {clientLoginPassword}
                      </span>
                    </p>

                    <p className="mt-3 text-xs leading-5 text-slate-400">
                      Send these details to the client securely and ask them to
                      keep them private.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!selectedClientId && (
              <div className="mt-6 grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Practice name
                  </label>
                  <input
                    value={newPracticeName}
                    onChange={(e) => setNewPracticeName(e.target.value)}
                    placeholder="Worsthorne Dental Practice"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-amber-300/40 placeholder:text-slate-500 focus:ring-4"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Contact name
                  </label>
                  <input
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder="Dr Mazhar Iqbal"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-amber-300/40 placeholder:text-slate-500 focus:ring-4"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Client email
                  </label>
                  <input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="client@example.co.uk"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-amber-300/40 placeholder:text-slate-500 focus:ring-4"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Website
                  </label>
                  <input
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder="https://example.co.uk"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-amber-300/40 placeholder:text-slate-500 focus:ring-4"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Report</h2>

            <label className="mb-2 mt-5 block text-sm font-medium text-slate-200">
              Report type
            </label>

            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-amber-300/40 focus:ring-4"
            >
              <option>Compliance Audit</option>
              <option>Local Competitor Audit</option>
              <option>Price & Services Audit</option>
              <option>Healthcare Digital Audit</option>
            </select>

            <label className="mb-2 mt-5 block text-sm font-medium text-slate-200">
              Report title
            </label>

            <input
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              placeholder="Digital Compliance & Trust Audit"
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-amber-300/40 placeholder:text-slate-500 focus:ring-4"
            />

            <label className="mb-2 mt-5 block text-sm font-medium text-slate-200">
              Summary
            </label>

            <textarea
              value={reportSummary}
              onChange={(e) => setReportSummary(e.target.value)}
              placeholder="Your Sitora Healthcare audit report is ready to download securely."
              className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-amber-300/40 placeholder:text-slate-500 focus:ring-4"
            />

            <label className="mb-2 mt-5 block text-sm font-medium text-slate-200">
              PDF file
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-200"
            />

            <button
              onClick={uploadReport}
              disabled={uploading}
              className="mt-6 w-full rounded-2xl bg-amber-300 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-200 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload & Assign Report"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}