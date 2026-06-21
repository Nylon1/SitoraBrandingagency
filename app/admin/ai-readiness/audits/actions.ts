"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function updateAIReadinessAudit(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const notes = formData.get("notes") as string;

  if (!id) {
    throw new Error("Missing audit ID");
  }

  const { error } = await supabase
    .from("ai_readiness_audits")
    .update({
      status,
      notes,
    })
    .eq("id", id);

  if (error) {
    console.error("AI audit update error:", error);
    throw new Error("Unable to update audit");
  }

  revalidatePath("/admin/ai-readiness/audits");
}