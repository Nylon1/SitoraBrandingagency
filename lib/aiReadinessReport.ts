type AuditAnswers = Record<string, string | string[]>;

export type ReportFinding = {
  title: string;
  level: "Low" | "Medium" | "High";
  explanation: string;
  recommendation: string;
};

function getString(answers: AuditAnswers, key: string) {
  const value = answers[key];
  return typeof value === "string" ? value : "";
}

function getArray(answers: AuditAnswers, key: string) {
  const value = answers[key];
  return Array.isArray(value) ? value : [];
}

export function formatAnswer(answer: string | string[] | undefined) {
  if (!answer) return "Not answered";
  if (Array.isArray(answer)) {
    return answer.length > 0 ? answer.join(", ") : "Not answered";
  }
  return answer.trim().length > 0 ? answer : "Not answered";
}

export function generateAIReadinessFindings(answers: AuditAnswers) {
  const findings: ReportFinding[] = [];

  const currentlyUsesAI = getString(answers, "currently_uses_ai");
  const aiUsageAreas = getArray(answers, "ai_usage_areas");
  const personalDataAI = getString(answers, "personal_data_ai");
  const sensitiveDataAI = getString(answers, "sensitive_data_ai");
  const privacyPolicyAI = getString(answers, "privacy_policy_ai");
  const aiDecisionSupport = getString(answers, "ai_decision_support");
  const humanReview = getString(answers, "human_review");
  const highRiskUsage = getArray(answers, "high_risk_usage");
  const aiUsagePolicy = getString(answers, "ai_usage_policy");
  const staffAIPolicy = getString(answers, "staff_ai_policy");
  const toolRegister = getString(answers, "tool_register");
  const riskRegister = getString(answers, "risk_register");
  const supplierChecklist = getString(answers, "supplier_checklist");
  const customersToldAI = getString(answers, "customers_told_ai");
  const chatbotDisclosure = getString(answers, "chatbot_disclosure");
  const biasTesting = getString(answers, "bias_testing");
  const incidentResponse = getString(answers, "incident_response");

  if (currentlyUsesAI === "Yes" || aiUsageAreas.length > 0) {
    findings.push({
      title: "AI is already being used across the business",
      level: "Medium",
      explanation:
        "The business appears to be using AI across one or more operational areas. This may include website tools, internal software, customer support, marketing, admin, recruitment, healthcare, finance or other workflows.",
      recommendation:
        "Create a clear AI usage map showing which tools are used, who uses them, what data is entered, what outputs are produced, and who is responsible for oversight.",
    });
  }

  if (["Yes", "Possibly"].includes(personalDataAI)) {
    findings.push({
      title: "Personal data may be entered into AI tools",
      level: "High",
      explanation:
        "The business may be entering personal data into AI systems. This creates data protection, confidentiality and supplier-processing risks.",
      recommendation:
        "Review what personal data is being entered, update internal rules, check supplier terms, and consider whether a Data Protection Impact Assessment or privacy policy update is needed.",
    });
  }

  if (["Yes", "Possibly"].includes(sensitiveDataAI)) {
    findings.push({
      title: "Sensitive or higher-risk data may be used with AI",
      level: "High",
      explanation:
        "Sensitive data such as health, financial, staff, candidate, children’s or confidential business data creates higher exposure when used with AI tools.",
      recommendation:
        "Restrict sensitive data entry into unapproved AI tools, create a data handling checklist, and ensure staff understand what must not be copied into AI systems.",
    });
  }

  if (["No", "Partially", "Not sure"].includes(privacyPolicyAI)) {
    findings.push({
      title: "Privacy policy may not clearly explain AI use",
      level: "Medium",
      explanation:
        "If AI tools process personal data, the business should be transparent about how data is used, shared, stored or processed.",
      recommendation:
        "Update the privacy policy to explain relevant AI tools, data categories, third-party processors, user rights and any automated or AI-assisted processing where relevant.",
    });
  }

  if (["Yes", "Possibly"].includes(aiDecisionSupport)) {
    findings.push({
      title: "AI may influence business decisions",
      level: "High",
      explanation:
        "Where AI influences decisions about customers, patients, candidates, staff, eligibility, finance, complaints or service access, governance expectations become much stronger.",
      recommendation:
        "Define when AI may support a decision, when human review is required, who can override AI output, and how AI-assisted decisions are recorded.",
    });
  }

  if (["No", "Sometimes", "Not sure"].includes(humanReview)) {
    findings.push({
      title: "Human oversight may be unclear",
      level: "High",
      explanation:
        "AI outputs can be inaccurate, biased or misleading. Without a clear human review process, the business may rely on AI outputs without proper checks.",
      recommendation:
        "Create a human oversight procedure explaining who reviews AI outputs, what must be checked, and when AI output must not be used without senior approval.",
    });
  }

  const seriousAreas = [
    "Recruitment or HR",
    "Healthcare, dental or patient support",
    "Finance, lending, insurance or eligibility",
    "Education or assessment",
    "Employee monitoring",
    "Children or vulnerable people",
    "Biometric identification",
    "Fraud detection or risk scoring",
  ];

  if (highRiskUsage.some((item) => seriousAreas.includes(item))) {
    findings.push({
      title: "AI may be used in higher-risk areas",
      level: "High",
      explanation:
        "The business may be using AI in areas where people’s rights, money, job, health, education, safety or access to services could be affected.",
      recommendation:
        "Carry out a more detailed risk review for these uses, document human oversight, supplier checks, accuracy controls, bias risks and escalation routes.",
    });
  }

  if (["No", "In progress", "Not sure"].includes(aiUsagePolicy)) {
    findings.push({
      title: "AI usage policy is missing or incomplete",
      level: "Medium",
      explanation:
        "Without an AI usage policy, staff may use AI tools inconsistently or enter information that should not be shared.",
      recommendation:
        "Create an AI usage policy covering approved tools, banned uses, data restrictions, accuracy checks, disclosures, human oversight and escalation.",
    });
  }

  if (["No", "In progress", "Not sure"].includes(staffAIPolicy)) {
    findings.push({
      title: "Staff AI policy is missing or incomplete",
      level: "Medium",
      explanation:
        "Staff need clear guidance on how AI can and cannot be used in day-to-day work.",
      recommendation:
        "Prepare a staff AI policy explaining safe use, prohibited data entry, output checking, confidentiality, accountability and reporting concerns.",
    });
  }

  if (["No", "In progress", "Not sure"].includes(toolRegister)) {
    findings.push({
      title: "AI tool register is missing or incomplete",
      level: "Medium",
      explanation:
        "A business cannot manage AI properly if it does not know which AI tools are being used.",
      recommendation:
        "Create an AI tool register listing every AI tool, supplier, purpose, users, data entered, risk level, approval status and review date.",
    });
  }

  if (["No", "In progress", "Not sure"].includes(riskRegister)) {
    findings.push({
      title: "AI risk register is missing or incomplete",
      level: "Medium",
      explanation:
        "AI risks should be tracked in a structured way, especially where AI touches customers, staff, sensitive data or decisions.",
      recommendation:
        "Create an AI risk register recording each risk, likelihood, impact, controls, owner, review date and action status.",
    });
  }

  if (["No", "In progress", "Not sure"].includes(supplierChecklist)) {
    findings.push({
      title: "AI supplier checks may be missing",
      level: "Medium",
      explanation:
        "Third-party AI tools may process, store or use business data in ways the business has not reviewed.",
      recommendation:
        "Use an AI supplier checklist to review data processing terms, model training settings, data location, retention, security, support and contractual responsibilities.",
    });
  }

  if (["No", "Partially", "Not sure"].includes(customersToldAI)) {
    findings.push({
      title: "Customer AI transparency may be weak",
      level: "Medium",
      explanation:
        "Where customers interact with AI or are affected by AI-assisted processes, transparency becomes important for trust and compliance readiness.",
      recommendation:
        "Add clear customer-facing AI disclosures where relevant, including chatbot notices, limitations wording, and human escalation routes.",
    });
  }

  if (["No", "Not sure"].includes(chatbotDisclosure)) {
    findings.push({
      title: "Chatbot disclosure may be missing",
      level: "Medium",
      explanation:
        "If the business uses an AI chatbot, users should clearly understand when they are interacting with AI or automation.",
      recommendation:
        "Add a chatbot disclosure explaining that the assistant is automated, may make mistakes, does not replace professional advice, and offers a route to human support.",
    });
  }

  if (["No", "Partially", "Not sure"].includes(biasTesting)) {
    findings.push({
      title: "Bias and fairness testing may be limited",
      level: "Medium",
      explanation:
        "AI outputs can produce unfair or inconsistent results, especially in recruitment, HR, finance, healthcare, education or customer eligibility.",
      recommendation:
        "Introduce periodic testing for bias, fairness and consistency where AI affects people or supports business decisions.",
    });
  }

  if (["No", "In progress", "Not sure"].includes(incidentResponse)) {
    findings.push({
      title: "AI incident response process may be missing",
      level: "Medium",
      explanation:
        "Businesses need a clear process if AI produces harmful, inaccurate, biased, misleading or unsafe output.",
      recommendation:
        "Create an AI incident response process covering reporting, escalation, investigation, correction, customer communication and record keeping.",
    });
  }

  if (findings.length === 0) {
    findings.push({
      title: "No major readiness gaps identified from the answers provided",
      level: "Low",
      explanation:
        "Based on the submitted answers, no major AI readiness gap was detected. This does not mean there is no risk, but the current information suggests a lower-risk position.",
      recommendation:
        "Maintain an AI tool register, review AI use periodically, and update policies when new tools or processes are introduced.",
    });
  }

  return findings;
}

export function getRecommendedDocuments(findings: ReportFinding[]) {
  const docs = new Set<string>();

  findings.forEach((finding) => {
    const text = `${finding.title} ${finding.explanation} ${finding.recommendation}`.toLowerCase();

    if (text.includes("policy")) docs.add("AI Usage Policy");
    if (text.includes("staff")) docs.add("Staff AI Policy");
    if (text.includes("tool register")) docs.add("AI Tool Register");
    if (text.includes("risk register")) docs.add("AI Risk Register");
    if (text.includes("supplier")) docs.add("AI Supplier Checklist");
    if (text.includes("privacy")) docs.add("Privacy Policy AI Wording");
    if (text.includes("chatbot")) docs.add("AI Chatbot Disclosure");
    if (text.includes("human oversight") || text.includes("human review"))
      docs.add("Human Oversight Procedure");
    if (text.includes("incident")) docs.add("AI Incident Response Procedure");
    if (text.includes("data")) docs.add("AI Data Handling Checklist");
    if (text.includes("bias")) docs.add("Bias, Fairness and Accuracy Review");

    docs.add("AI Governance Action Plan");
  });

  return Array.from(docs);
}