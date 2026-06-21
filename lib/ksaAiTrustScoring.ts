type IntakeInput = {
  companyName?: string;
  contactName?: string;
  email?: string;
  website?: string;
  primaryMarket?: string;
  businessType?: string;
specialistSaudiFlags?: string[];
  aiProductName?: string;
  aiSystemType?: string;
  aiDescription?: string;
  aiUsers?: string;
  aiInfluences?: string[];

  riskLevel?: string;

  dataCollected?: string[];
  personalDataStored?: string;
  sensitiveDataInvolved?: string;
  retentionPeriod?: string;
  aiLogsAccess?: string;
  privacyConsentWording?: string;

  aiProvider?: string;
  cloudProvider?: string;
  hostingRegion?: string;
  dataLeavesKsa?: string;
  thirdPartyTools?: string;

  disclosuresPresent?: string[];
  aiDisclosureWording?: string;

  humanReviewAvailable?: string;
  aiOverrideAvailable?: string;
  internalAiOwner?: string;
  escalationRoute?: string;
  humanReviewProcess?: string;

  securityControls?: string[];
  adminDashboardAccess?: string;
  backupProcess?: string;

  testingCompleted?: string[];
  knownAiIssues?: string;

  healthcareFlags?: string[];
  financeFlags?: string[];
  hrFlags?: string[];
  educationFlags?: string[];

  availableEvidence?: string[];
};

function text(value?: string) {
  return value?.trim() || "";
}

function lower(value?: string) {
  return text(value).toLowerCase();
}

function arr(value?: string[]) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function hasText(value?: string) {
  return text(value).length > 0;
}

function includesAny(values: string[] | undefined, search: string[]) {
  const source = arr(values).map((item) => item.toLowerCase());

  return search.some((term) =>
    source.some((item) => item.includes(term.toLowerCase()))
  );
}

function clamp(score: number) {
  return Math.max(0, Math.min(5, score));
}

function getRating(score: number) {
  if (score <= 25) return "Critical Risk";
  if (score <= 45) return "Weak Governance";
  if (score <= 65) return "Developing Governance";
  if (score <= 80) return "Strong Governance";
  return "AI Trust Ready";
}

export function calculateKsaAiTrustScore(input: IntakeInput) {
  const sensitive = lower(input.sensitiveDataInvolved);
  const transfer = lower(input.dataLeavesKsa);
  const risk = lower(input.riskLevel);
  const personalStored = lower(input.personalDataStored);

  const sensitiveDataSelected = includesAny(input.dataCollected, [
    "health",
    "financial",
    "legal",
    "children",
    "photos",
    "voice",
    "id documents",
    "religious",
    "sensitive",
    "employment",
  ]);
const specialistFlags = arr(input.specialistSaudiFlags).filter(
  (item) =>
    !item.toLowerCase().includes("none") &&
    !item.toLowerCase().includes("not sure")
);

const highSectorFlag =
  arr(input.healthcareFlags).length > 0 ||
  arr(input.financeFlags).length > 0 ||
  arr(input.hrFlags).length > 0 ||
  arr(input.educationFlags).length > 0 ||
  specialistFlags.length > 0;

  const aiPurposeScore = clamp(
    (hasText(input.aiDescription) ? 2 : 0) +
      (hasText(input.aiUsers) ? 1 : 0) +
      (hasText(input.aiProductName) ? 1 : 0) +
      (arr(input.aiInfluences).length > 0 ? 1 : 0)
  );

  const riskClassificationScore = clamp(
    (hasText(input.riskLevel) ? 2 : 0) +
      (arr(input.aiInfluences).length > 0 ? 1 : 0) +
      (highSectorFlag ? 1 : 0) +
      (input.aiSystemType ? 1 : 0)
  );

  const dataFlowScore = clamp(
    (arr(input.dataCollected).length > 0 ? 1 : 0) +
      (hasText(input.aiProvider) ? 1 : 0) +
      (hasText(input.cloudProvider) ? 1 : 0) +
      (hasText(input.hostingRegion) ? 1 : 0) +
      (hasText(input.aiLogsAccess) ? 1 : 0)
  );

  const personalDataScore = clamp(
    (personalStored === "yes" || personalStored === "no" ? 1 : 0) +
      (hasText(input.privacyConsentWording) ? 1 : 0) +
      (hasText(input.retentionPeriod) ? 1 : 0) +
      (arr(input.disclosuresPresent).some((x) =>
        x.toLowerCase().includes("privacy")
      )
        ? 1
        : 0) +
      (arr(input.dataCollected).length > 0 ? 1 : 0)
  );

  const sensitiveDataScore = clamp(
    sensitive === "no"
      ? 4
      : (sensitive === "yes" || sensitive === "possibly" ? 1 : 0) +
          (sensitiveDataSelected ? 1 : 0) +
          (hasText(input.privacyConsentWording) ? 1 : 0) +
          (hasText(input.aiLogsAccess) ? 1 : 0)
  );

  const crossBorderScore = clamp(
    (transfer === "yes" || transfer === "no" || transfer === "possibly"
      ? 1
      : 0) +
      (hasText(input.aiProvider) ? 1 : 0) +
      (hasText(input.cloudProvider) ? 1 : 0) +
      (hasText(input.hostingRegion) ? 1 : 0) +
      (hasText(input.thirdPartyTools) ? 1 : 0)
  );

  const transparencyScore = clamp(
    (arr(input.disclosuresPresent).some((x) =>
      x.toLowerCase().includes("interacting with ai")
    )
      ? 2
      : 0) +
      (hasText(input.aiDisclosureWording) ? 1 : 0) +
      (arr(input.disclosuresPresent).some((x) =>
        x.toLowerCase().includes("human support")
      )
        ? 1
        : 0) +
      (arr(input.disclosuresPresent).some((x) =>
        x.toLowerCase().includes("professional advice")
      )
        ? 1
        : 0)
  );

  const humanOversightScore = clamp(
    (lower(input.humanReviewAvailable) === "yes" ? 2 : 0) +
      (lower(input.aiOverrideAvailable) === "yes" ||
      lower(input.aiOverrideAvailable) === "not applicable"
        ? 1
        : 0) +
      (hasText(input.internalAiOwner) ? 1 : 0) +
      (hasText(input.escalationRoute) || hasText(input.humanReviewProcess)
        ? 1
        : 0)
  );

  const outputSafetyScore = clamp(
    (arr(input.testingCompleted).some((x) =>
      x.toLowerCase().includes("normal")
    )
      ? 1
      : 0) +
      (arr(input.testingCompleted).some((x) =>
        x.toLowerCase().includes("wrong-answer")
      )
        ? 1
        : 0) +
      (arr(input.testingCompleted).some((x) =>
        x.toLowerCase().includes("hallucination")
      )
        ? 1
        : 0) +
      (arr(input.testingCompleted).some((x) =>
        x.toLowerCase().includes("prompt injection")
      )
        ? 1
        : 0) +
      (arr(input.testingCompleted).some((x) =>
        x.toLowerCase().includes("sensitive-topic")
      )
        ? 1
        : 0)
  );

  const biasFairnessScore = clamp(
    (arr(input.testingCompleted).some((x) =>
      x.toLowerCase().includes("bias")
    )
      ? 2
      : 0) +
      (lower(input.humanReviewAvailable) === "yes" ? 1 : 0) +
      (hasText(input.escalationRoute) ? 1 : 0) +
      (highSectorFlag ? 1 : 0)
  );

  const vendorGovernanceScore = clamp(
    (hasText(input.aiProvider) ? 1 : 0) +
      (hasText(input.cloudProvider) ? 1 : 0) +
      (hasText(input.thirdPartyTools) ? 1 : 0) +
      (arr(input.availableEvidence).some((x) =>
        x.toLowerCase().includes("vendor contracts")
      )
        ? 1
        : 0) +
      (arr(input.availableEvidence).some((x) =>
        x.toLowerCase().includes("ai provider")
      )
        ? 1
        : 0)
  );

  const cybersecurityScore = clamp(
    (arr(input.securityControls).some((x) => x.toLowerCase().includes("mfa"))
      ? 1
      : 0) +
      (arr(input.securityControls).some((x) =>
        x.toLowerCase().includes("role-based")
      )
        ? 1
        : 0) +
      (arr(input.securityControls).some((x) =>
        x.toLowerCase().includes("api keys")
      )
        ? 1
        : 0) +
      (arr(input.securityControls).some((x) =>
        x.toLowerCase().includes("audit logs")
      )
        ? 1
        : 0) +
      (hasText(input.adminDashboardAccess) ? 1 : 0)
  );

  const cloudHostingScore = clamp(
    (hasText(input.cloudProvider) ? 1 : 0) +
      (hasText(input.hostingRegion) ? 1 : 0) +
      (hasText(input.backupProcess) ? 1 : 0) +
      (arr(input.securityControls).some((x) =>
        x.toLowerCase().includes("backups")
      )
        ? 1
        : 0) +
      (arr(input.availableEvidence).some((x) =>
        x.toLowerCase().includes("hosting region")
      )
        ? 1
        : 0)
  );

  const incidentResponseScore = clamp(
    (arr(input.securityControls).some((x) =>
      x.toLowerCase().includes("incident response")
    )
      ? 2
      : 0) +
      (arr(input.availableEvidence).some((x) =>
        x.toLowerCase().includes("incident response")
      )
        ? 1
        : 0) +
      (hasText(input.escalationRoute) ? 1 : 0) +
      (hasText(input.internalAiOwner) ? 1 : 0)
  );

  const documentationScore = clamp(
    (arr(input.availableEvidence).some((x) =>
      x.toLowerCase().includes("ai system description")
    )
      ? 1
      : 0) +
      (arr(input.availableEvidence).some((x) =>
        x.toLowerCase().includes("privacy notice")
      )
        ? 1
        : 0) +
      (arr(input.availableEvidence).some((x) =>
        x.toLowerCase().includes("terms")
      )
        ? 1
        : 0) +
      (arr(input.availableEvidence).some((x) =>
        x.toLowerCase().includes("data flow")
      )
        ? 1
        : 0) +
      (arr(input.availableEvidence).some((x) =>
        x.toLowerCase().includes("testing logs")
      )
        ? 1
        : 0)
  );

  const reviewMonitoringScore = clamp(
    (arr(input.testingCompleted).length > 0 ? 1 : 0) +
      (arr(input.securityControls).some((x) =>
        x.toLowerCase().includes("audit logs")
      )
        ? 1
        : 0) +
      (hasText(input.knownAiIssues) ? 1 : 0) +
      (hasText(input.internalAiOwner) ? 1 : 0) +
      (hasText(input.humanReviewProcess) ? 1 : 0)
  );

  const userJourneyScore = clamp(
    (arr(input.disclosuresPresent).length > 0 ? 1 : 0) +
      (hasText(input.aiDisclosureWording) ? 1 : 0) +
      (arr(input.disclosuresPresent).some((x) =>
        x.toLowerCase().includes("human support")
      )
        ? 1
        : 0) +
      (arr(input.availableEvidence).some((x) =>
        x.toLowerCase().includes("user journey")
      )
        ? 1
        : 0) +
      (arr(input.availableEvidence).some((x) =>
        x.toLowerCase().includes("product screenshots")
      )
        ? 1
        : 0)
  );

  const sectorReadinessScore = clamp(
    highSectorFlag
      ? (lower(input.humanReviewAvailable) === "yes" ? 1 : 0) +
          (hasText(input.escalationRoute) ? 1 : 0) +
          (hasText(input.privacyConsentWording) ? 1 : 0) +
          (arr(input.testingCompleted).length > 0 ? 1 : 0) +
          (risk.includes("specialist") || risk.includes("high") ? 1 : 0)
      : 4
  );

  const domainScores = {
    ai_purpose_score: aiPurposeScore,
    risk_classification_score: riskClassificationScore,
    data_flow_score: dataFlowScore,
    personal_data_score: personalDataScore,
    sensitive_data_score: sensitiveDataScore,
    cross_border_score: crossBorderScore,
    transparency_score: transparencyScore,
    human_oversight_score: humanOversightScore,
    output_safety_score: outputSafetyScore,
    bias_fairness_score: biasFairnessScore,
    vendor_governance_score: vendorGovernanceScore,
    cybersecurity_score: cybersecurityScore,
    cloud_hosting_score: cloudHostingScore,
    incident_response_score: incidentResponseScore,
    documentation_score: documentationScore,
    review_monitoring_score: reviewMonitoringScore,
    user_journey_score: userJourneyScore,
    sector_readiness_score: sectorReadinessScore,
  };

  const totalScore = Object.values(domainScores).reduce(
    (sum, value) => sum + value,
    0
  );

  const notes: string[] = [];

  if (!hasText(input.aiDescription)) {
    notes.push("AI system purpose needs clearer documentation.");
  }

  if (transfer === "yes" || transfer === "possibly") {
    notes.push("Cross-border data transfer should be reviewed for KSA exposure.");
  }

  if (sensitive === "yes" || sensitive === "possibly" || sensitiveDataSelected) {
    notes.push("Sensitive data controls should be strengthened and documented.");
  }

  if (arr(input.testingCompleted).length === 0) {
    notes.push("No formal AI testing evidence provided.");
  }

  if (!hasText(input.privacyConsentWording)) {
    notes.push("Privacy and consent wording should be reviewed.");
  }

  if (!hasText(input.aiProvider)) {
    notes.push("AI provider/model details are missing.");
  }

  if (highSectorFlag || risk.includes("specialist")) {
    notes.push("Sector-specific regulatory review may be required.");
  }

  return {
    score: totalScore,
    rating: getRating(totalScore),
    score_type: "initial_estimate",
    scoring_notes: notes.join(" "),
    domainScores,
  };
}