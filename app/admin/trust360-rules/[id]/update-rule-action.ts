"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

function splitLines(value: FormDataEntryValue | null) {
  if (!value) return [];

  return String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringOrNull(value: FormDataEntryValue | null) {
  if (!value) return null;

  const text = String(value).trim();

  return text.length ? text : null;
}

function numberOrZero(value: FormDataEntryValue | null) {
  const number = Number(value);

  if (Number.isNaN(number)) return 0;

  return number;
}

export async function updateTrust360RuleAction(id: string, formData: FormData) {
  const isActive = formData.get("is_active") === "on";
  const needsLegalReview = formData.get("needs_legal_review") === "on";

  const payload = {
    country: String(formData.get("country") || "Qatar"),
    jurisdiction_code: String(formData.get("jurisdiction_code") || "QA"),
    category: String(formData.get("category") || "Documentation & Governance"),
    subcategory: stringOrNull(formData.get("subcategory")),

    rule_code: String(formData.get("rule_code") || "").trim(),
    rule_title: String(formData.get("rule_title") || "").trim(),
    rule_summary: String(formData.get("rule_summary") || "").trim(),

    legal_reference: stringOrNull(formData.get("legal_reference")),
    regulator: stringOrNull(formData.get("regulator")),
    penalty_reference: stringOrNull(formData.get("penalty_reference")),

    trigger_fields: splitLines(formData.get("trigger_fields")),
    trigger_keywords: splitLines(formData.get("trigger_keywords")),

    evidence_required: splitLines(formData.get("evidence_required")),
    guidance: String(formData.get("guidance") || "").trim(),
    client_guidance: stringOrNull(formData.get("client_guidance")),
    internal_guidance: stringOrNull(formData.get("internal_guidance")),

    severity: String(formData.get("severity") || "Medium"),
    score_impact: numberOrZero(formData.get("score_impact")),

    package_relevance: splitLines(formData.get("package_relevance")),
    applies_to_sectors: splitLines(formData.get("applies_to_sectors")),

    is_active: isActive,
    needs_legal_review: needsLegalReview,
    updated_at: new Date().toISOString(),
  };

  if (!payload.rule_code || !payload.rule_title || !payload.rule_summary) {
    throw new Error("Rule code, title and summary are required.");
  }

  const { error } = await supabaseAdmin
    .from("trust360_rules")
    .update(payload)
    .eq("id", id);

  if (error) {
    console.error("Trust 360 rule update error:", error);
    throw new Error("Failed to update rule.");
  }

  revalidatePath("/admin/trust360-rules");
  revalidatePath(`/admin/trust360-rules/${id}`);
}