"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Save, AlertTriangle } from "lucide-react";

const statuses = [
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "needs_more_info", label: "Needs More Info" },
  { value: "report_in_progress", label: "Report In Progress" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "converted", label: "Converted" },
  { value: "closed", label: "Closed" },
];

export default function AuditStatusPanel({
  auditId,
  initialStatus,
  initialNotes,
}: {
  auditId: string;
  initialStatus?: string | null;
  initialNotes?: string | null;
}) {
  const [status, setStatus] = useState(initialStatus || "new");
  const [sitoraNotes, setSitoraNotes] = useState(initialNotes || "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");

  async function handleSave() {
    try {
      setIsSaving(true);
      setMessage("");
      setResult("idle");

      const response = await fetch(`/api/admin/ai-audits/${auditId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          sitoraNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not save changes.");
      }

      setResult("success");
      setMessage("Audit status and notes saved.");
    } catch (error) {
      setResult("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.08] p-6 shadow-2xl backdrop-blur">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-100/55">
          Internal Pipeline
        </p>
        <h2 className="mt-3 text-2xl font-semibold">Status & Sitora Notes</h2>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Use this to manage the audit through review, proposal and conversion.
        </p>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm text-white/60">Status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition focus:border-amber-300/50"
          >
            {statuses.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-white/60">
            Sitora internal notes
          </span>
          <textarea
            rows={7}
            value={sitoraNotes}
            onChange={(event) => setSitoraNotes(event.target.value)}
            placeholder="Add internal notes, missing evidence, package recommendation, follow-up plan or proposal details."
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-amber-300/50"
          />
        </label>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 px-6 py-4 text-sm font-semibold text-black shadow-[0_0_35px_rgba(250,204,21,0.2)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Status & Notes
            </>
          )}
        </button>

        {result !== "idle" && (
          <div
            className={`rounded-2xl border p-4 ${
              result === "success"
                ? "border-emerald-300/25 bg-emerald-300/10"
                : "border-red-300/25 bg-red-300/10"
            }`}
          >
            <div className="flex gap-3">
              {result === "success" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-200" />
              ) : (
                <AlertTriangle className="mt-0.5 h-5 w-5 text-red-200" />
              )}

              <p className="text-sm text-white/75">{message}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}