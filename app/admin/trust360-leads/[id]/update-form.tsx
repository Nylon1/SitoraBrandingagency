"use client";

import { useTransition } from "react";
import { updateTrust360LeadAction } from "./update-lead-action";

const statuses = [
  "New",
  "Contacted",
  "Consultation Booked",
  "Proposal Sent",
  "Won",
  "Lost",
  "Nurture",
];

export default function UpdateLeadForm({
  id,
  currentStatus,
  currentNotes,
}: {
  id: string;
  currentStatus: string;
  currentNotes: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await updateTrust360LeadAction(id, formData);
        });
      }}
      className="space-y-5"
    >
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-white">
          Lead status
        </span>

        <select
          name="lead_status"
          defaultValue={currentStatus || "New"}
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition focus:border-[#D4AF37]"
        >
          {statuses.map((status) => (
            <option key={status} value={status} className="bg-black">
              {status}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-bold text-white">
          Internal notes
        </span>

        <textarea
          name="internal_notes"
          defaultValue={currentNotes || ""}
          rows={7}
          placeholder="Add call notes, risk concerns, proposal plan, package recommendation or follow-up actions."
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#D4AF37]"
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-black text-black transition hover:bg-[#f0cf63] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save Lead Status"}
      </button>
    </form>
  );
}