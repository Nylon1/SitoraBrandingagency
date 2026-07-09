"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

type DeleteAuditButtonProps = {
  auditId: string;
};

export default function DeleteAuditButton({ auditId }: DeleteAuditButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Trust 360 audit? This will delete the audit, saved issues and uploaded file.",
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const response = await fetch("/api/trust-360/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ auditId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Delete failed.");
      }

      window.location.href = "/admin/trust-360";
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete audit
        </>
      )}
    </button>
  );
}