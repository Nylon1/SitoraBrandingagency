"use server";

import { redirect } from "next/navigation";
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

export async function createTrust360RuleAction(formData: FormData) {
  const isActive = formData.get("is_active") === "on";
  const needsLegalReview = formData.get("needs_legal_review") === "on";

  const country = String(formData.get("country") || "Qatar");
  const ruleCode = String(formData.get("rule_code") || "").trim();
  const ruleTitle = String(formData.get("rule_title") || "").trim();
  const ruleSummary = String(formData.get("rule_summary") || "").trim();

  if (!ruleCode || !ruleTitle || !ruleSummary) {
    throw new Error("Rule code, title and summary are required.");
  }

  const payload = {
    country,
    jurisdiction_code: String(formData.get("jurisdiction_code") || "QA"),
    category: String(formData.get("category") || "Documentation & Governance"),
    subcategory: stringOrNull(formData.get("subcategory")),

    rule_code: ruleCode,
    rule_title: ruleTitle,
    rule_summary: ruleSummary,

    legal_reference: stringOrNull(formData.get("legal_reference")),
    regulator: stringOrNull(formData.get("regulator")),
    penalty_reference: stringOrNull(formData.get("penalty_reference")),

    trigger_fields: splitLines(formData.get("trigger_fields")),
    trigger_keywords: splitLines(formData.get("trigger_keywords")),

    trigger_conditions: {
      anySelected: splitLines(formData.get("condition_any_selected")),
    },

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
  };

  const { data, error } = await supabaseAdmin
    .from("trust360_rules")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    console.error("Trust 360 rule create error:", error);
    throw new Error("Failed to create rule.");
  }

  redirect(`/admin/trust360-rules/${data.id}`);
}