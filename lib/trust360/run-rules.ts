import { supabaseAdmin } from "@/lib/supabase/admin";

export type Trust360Country = "Qatar" | "Saudi Arabia" | "UAE";

export type Trust360Rule = {
  id: string;
  country: Trust360Country;
  jurisdiction_code: string;
  category: string;
  subcategory: string | null;
  rule_code: string;
  rule_title: string;
  rule_summary: string;
  legal_reference: string | null;
  regulator: string | null;
  penalty_reference: string | null;
  trigger_fields: string[];
  trigger_keywords: string[];
  trigger_conditions: Record<string, unknown> | null;
  evidence_required: string[];
  guidance: string;
  client_guidance: string | null;
  internal_guidance: string | null;
  severity: "Low" | "Medium" | "High" | "Urgent" | string;
  score_impact: number;
  package_relevance: string[];
  applies_to_sectors: string[];
  applies_to_company_sizes: string[];
  is_active: boolean;
  needs_legal_review: boolean;
};

export type Trust360LeadInput = {
  country?: string | null;
  sector?: string | null;
  companySize?: string | null;
  company_size?: string | null;
  digitalChannels?: string[] | null;
  digital_channels?: string[] | null;
  dataTypes?: string[] | null;
  data_types?: string[] | null;
  marketingUses?: string[] | null;
  marketing_uses?: string[] | null;
  aiUses?: string[] | null;
  ai_uses?: string[] | null;
  systemAccess?: string[] | null;
  system_access?: string[] | null;
  cyberControls?: string[] | null;
  cyber_controls?: string[] | null;
  existingDocuments?: string[] | null;
  existing_documents?: string[] | null;
  concerns?: string[] | null;
  trigger?: string | null;
  trigger_note?: string | null;
  website?: string | null;
  qatarPresence?: string | null;
};

export type MatchedTrust360Rule = {
  id: string;
  country: string;
  jurisdictionCode: string;
  category: string;
  subcategory: string | null;
  ruleCode: string;
  ruleTitle: string;
  ruleSummary: string;
  legalReference: string | null;
  regulator: string | null;
  penaltyReference: string | null;
  severity: string;
  scoreImpact: number;
  evidenceRequired: string[];
  guidance: string;
  clientGuidance: string | null;
  internalGuidance: string | null;
  needsLegalReview: boolean;
  matchedBy: string[];
};

export type Trust360RulesResult = {
  country: Trust360Country;
  matchedRules: MatchedTrust360Rule[];
  recommendedEvidence: string[];
  clientGuidance: string[];
  internalGuidance: string[];
  priorityCategories: string[];
  rulesScoreImpact: number;
  highestSeverity: string;
};

const supportedCountries: Trust360Country[] = ["Qatar", "Saudi Arabia", "UAE"];

const severityRank: Record<string, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Urgent: 4,
};

function normaliseCountry(country?: string | null): Trust360Country {
  const value = String(country || "").trim().toLowerCase();

  if (["saudi", "saudi arabia", "ksa", "kingdom of saudi arabia"].includes(value)) {
    return "Saudi Arabia";
  }

  if (["uae", "united arab emirates", "emirates", "dubai", "abu dhabi"].includes(value)) {
    return "UAE";
  }

  if (["qatar", "qa", "doha", ""].includes(value)) {
    return "Qatar";
  }

  return "Qatar";
}

function asArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  return [String(value)];
}

function lowerArray(value: unknown): string[] {
  return asArray(value).map((item) => item.toLowerCase());
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function getLeadFieldValues(lead: Trust360LeadInput, field: string): string[] {
  const camelValue = (lead as Record<string, unknown>)[field];
  const snakeField = field.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  const snakeValue = (lead as Record<string, unknown>)[snakeField];

  return lowerArray(camelValue ?? snakeValue);
}

function getAllLeadText(lead: Trust360LeadInput): string {
  const values: string[] = [];

  for (const value of Object.values(lead)) {
    if (Array.isArray(value)) {
      values.push(...value.map(String));
    } else if (value) {
      values.push(String(value));
    }
  }

  return values.join(" ").toLowerCase();
}

function fieldMatches(rule: Trust360Rule, lead: Trust360LeadInput): string[] {
  const matched: string[] = [];

  for (const field of rule.trigger_fields || []) {
    const leadValues = getLeadFieldValues(lead, field);

    if (!leadValues.length) continue;

    const keywords = lowerArray(rule.trigger_keywords);

    const hasKeywordMatch = keywords.some((keyword) =>
      leadValues.some((value) => value.includes(keyword))
    );

    if (hasKeywordMatch) {
      matched.push(`field:${field}`);
    }
  }

  return matched;
}

function keywordMatches(rule: Trust360Rule, lead: Trust360LeadInput): string[] {
  const allLeadText = getAllLeadText(lead);
  const matched: string[] = [];

  for (const keyword of lowerArray(rule.trigger_keywords)) {
    if (allLeadText.includes(keyword)) {
      matched.push(`keyword:${keyword}`);
    }
  }

  return matched;
}

function conditionMatches(rule: Trust360Rule, lead: Trust360LeadInput): string[] {
  const conditions = rule.trigger_conditions || {};
  const matched: string[] = [];

  const anySelected = Array.isArray(conditions.anySelected)
    ? conditions.anySelected.map(String).map((item) => item.toLowerCase())
    : [];

  if (anySelected.length) {
    const allLeadValues = getAllLeadText(lead);

    const hits = anySelected.filter((item) => allLeadValues.includes(item));

    if (hits.length) {
      matched.push(`condition:anySelected:${hits.join(",")}`);
    }
  }

  const requiredSector = Array.isArray(conditions.sectors)
    ? conditions.sectors.map(String).map((item) => item.toLowerCase())
    : [];

  if (requiredSector.length && lead.sector) {
    const sector = lead.sector.toLowerCase();

    if (requiredSector.some((item) => sector.includes(item))) {
      matched.push("condition:sector");
    }
  }

  return matched;
}

function sectorApplies(rule: Trust360Rule, lead: Trust360LeadInput): boolean {
  if (!rule.applies_to_sectors || rule.applies_to_sectors.length === 0) {
    return true;
  }

  if (!lead.sector) return true;

  const sector = lead.sector.toLowerCase();

  return rule.applies_to_sectors.some((allowedSector) =>
    sector.includes(allowedSector.toLowerCase())
  );
}

function companySizeApplies(rule: Trust360Rule, lead: Trust360LeadInput): boolean {
  if (!rule.applies_to_company_sizes || rule.applies_to_company_sizes.length === 0) {
    return true;
  }

  const size = String(lead.companySize || lead.company_size || "").toLowerCase();

  if (!size) return true;

  return rule.applies_to_company_sizes.some((allowedSize) =>
    size.includes(allowedSize.toLowerCase())
  );
}

function mapMatchedRule(rule: Trust360Rule, matchedBy: string[]): MatchedTrust360Rule {
  return {
    id: rule.id,
    country: rule.country,
    jurisdictionCode: rule.jurisdiction_code,
    category: rule.category,
    subcategory: rule.subcategory,
    ruleCode: rule.rule_code,
    ruleTitle: rule.rule_title,
    ruleSummary: rule.rule_summary,
    legalReference: rule.legal_reference,
    regulator: rule.regulator,
    penaltyReference: rule.penalty_reference,
    severity: rule.severity,
    scoreImpact: rule.score_impact || 0,
    evidenceRequired: rule.evidence_required || [],
    guidance: rule.guidance,
    clientGuidance: rule.client_guidance,
    internalGuidance: rule.internal_guidance,
    needsLegalReview: rule.needs_legal_review,
    matchedBy,
  };
}

export async function runTrust360Rules(
  lead: Trust360LeadInput
): Promise<Trust360RulesResult> {
  const country = normaliseCountry(lead.country);

  const { data, error } = await supabaseAdmin
    .from("trust360_rules")
    .select("*")
    .eq("country", country)
    .eq("is_active", true);

  if (error) {
    console.error("Trust 360 rules load error:", error);
    throw new Error("Failed to load Trust 360 rules.");
  }

  const rules = (data || []) as Trust360Rule[];

  const matchedRules: MatchedTrust360Rule[] = [];

  for (const rule of rules) {
    if (!sectorApplies(rule, lead)) continue;
    if (!companySizeApplies(rule, lead)) continue;

    const matchedBy = unique([
      ...fieldMatches(rule, lead),
      ...keywordMatches(rule, lead),
      ...conditionMatches(rule, lead),
    ]);

    if (matchedBy.length > 0) {
      matchedRules.push(mapMatchedRule(rule, matchedBy));
    }
  }

  matchedRules.sort((a, b) => {
    const severityDiff =
      (severityRank[b.severity] || 0) - (severityRank[a.severity] || 0);

    if (severityDiff !== 0) return severityDiff;

    return b.scoreImpact - a.scoreImpact;
  });

  const recommendedEvidence = unique(
    matchedRules.flatMap((rule) => rule.evidenceRequired)
  );

  const clientGuidance = unique(
    matchedRules
      .map((rule) => rule.clientGuidance || rule.guidance)
      .filter(Boolean)
  );

  const internalGuidance = unique(
    matchedRules
      .map((rule) => rule.internalGuidance)
      .filter(Boolean) as string[]
  );

  const priorityCategories = unique(matchedRules.map((rule) => rule.category));

  const rulesScoreImpact = matchedRules.reduce(
    (total, rule) => total + (rule.scoreImpact || 0),
    0
  );

  const highestSeverity =
    matchedRules.length > 0
      ? matchedRules.reduce((highest, rule) => {
          const currentRank = severityRank[rule.severity] || 0;
          const highestRank = severityRank[highest] || 0;
          return currentRank > highestRank ? rule.severity : highest;
        }, matchedRules[0].severity)
      : "Low";

  return {
    country,
    matchedRules,
    recommendedEvidence,
    clientGuidance,
    internalGuidance,
    priorityCategories,
    rulesScoreImpact,
    highestSeverity,
  };
}

export function getSupportedTrust360Countries() {
  return supportedCountries;
}