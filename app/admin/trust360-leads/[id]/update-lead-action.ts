"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function updateTrust360LeadAction(id: string, formData: FormData) {
  const leadStatus = String(formData.get("lead_status") || "New");
  const internalNotes = String(formData.get("internal_notes") || "");

  const allowedStatuses = [
    "New",
    "Contacted",
    "Consultation Booked",
    "Proposal Sent",
    "Won",
    "Lost",
    "Nurture",
  ];

  if (!allowedStatuses.includes(leadStatus)) {
    throw new Error("Invalid lead status.");
  }

  const { error } = await supabaseAdmin
    .from("trust360_exposure_leads")
    .update({
      lead_status: leadStatus,
      internal_notes: internalNotes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Trust 360 lead update error:", error);
    throw new Error("Failed to update Trust 360 lead.");
  }

  revalidatePath("/admin/trust360-leads");
  revalidatePath(`/admin/trust360-leads/${id}`);
}