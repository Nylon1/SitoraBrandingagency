export type BranchMetric = {
  id: string;
  name: string;
  city: string;
  revenue: number;
  collections: number;
  utilisation: number;
  claimsRisk: number;
  governance: number;
  treatmentOpportunity: number;
  clinicians: number;
  chairs: number;
  status: "excellent" | "good" | "attention";
};

export type AlertItem = {
  id: string;
  severity: "critical" | "high" | "opportunity" | "governance" | "positive";
  title: string;
  detail: string;
  branch?: string;
  value?: string;
};

export const group = {
  name: "Noura Dental Group",
  branches: 8,
  clinicians: 54,
  chairs: 38,
  activePatients: 11284,
  month: "August 2026",
};

export const branches: BranchMetric[] = [
  { id: "riyadh-north", name: "Riyadh North", city: "Riyadh", revenue: 942000, collections: 851000, utilisation: 87, claimsRisk: 12400, governance: 96, treatmentOpportunity: 68200, clinicians: 8, chairs: 6, status: "excellent" },
  { id: "olaya", name: "Olaya", city: "Riyadh", revenue: 821000, collections: 746000, utilisation: 81, claimsRisk: 18100, governance: 93, treatmentOpportunity: 74200, clinicians: 7, chairs: 5, status: "good" },
  { id: "riyadh-east", name: "Riyadh East", city: "Riyadh", revenue: 715000, collections: 641000, utilisation: 79, claimsRisk: 15900, governance: 94, treatmentOpportunity: 83100, clinicians: 7, chairs: 5, status: "good" },
  { id: "jeddah-tahlia", name: "Jeddah Tahlia", city: "Jeddah", revenue: 708000, collections: 602000, utilisation: 69, claimsRisk: 46200, governance: 84, treatmentOpportunity: 137400, clinicians: 8, chairs: 6, status: "attention" },
  { id: "jeddah-corniche", name: "Jeddah Corniche", city: "Jeddah", revenue: 612000, collections: 547000, utilisation: 74, claimsRisk: 20700, governance: 91, treatmentOpportunity: 91400, clinicians: 7, chairs: 5, status: "good" },
  { id: "khobar", name: "Khobar", city: "Khobar", revenue: 579000, collections: 521000, utilisation: 76, claimsRisk: 21400, governance: 91, treatmentOpportunity: 86800, clinicians: 6, chairs: 4, status: "good" },
  { id: "dammam", name: "Dammam", city: "Dammam", revenue: 487000, collections: 424000, utilisation: 73, claimsRisk: 5300, governance: 89, treatmentOpportunity: 74800, clinicians: 6, chairs: 4, status: "good" },
  { id: "madinah", name: "Madinah", city: "Madinah", revenue: 376000, collections: 329000, utilisation: 70, claimsRisk: 3000, governance: 90, treatmentOpportunity: 67800, clinicians: 5, chairs: 3, status: "good" },
];

export const groupTotals = {
  revenue: branches.reduce((sum, branch) => sum + branch.revenue, 0),
  collections: branches.reduce((sum, branch) => sum + branch.collections, 0),
  chairUtilisation: 78.4,
  treatmentOpportunity: branches.reduce((sum, branch) => sum + branch.treatmentOpportunity, 0),
  claimsRisk: branches.reduce((sum, branch) => sum + branch.claimsRisk, 0),
  recordsToReview: 27,
  revenueChange: 8.2,
};

export const dailyBrief = [
  { title: "Jeddah Tahlia is below trend", detail: "Revenue is 13% below its four-week run rate. Lower chair utilisation explains most of the movement.", action: "Open branch analysis" },
  { title: "Claims exposure needs attention", detail: "SAR 46,200 of claims at Jeddah Tahlia require review, including 11 with the same supporting-information pattern.", action: "Review claims" },
  { title: "Accepted treatment is waiting", detail: "38 accepted treatment plans worth SAR 184,700 remain unbooked for more than seven days.", action: "Open opportunity queue" },
];

export const alerts: AlertItem[] = [
  { id: "a1", severity: "critical", title: "Claims approaching action window", detail: "19 claims require review before the next submission cycle.", value: "SAR 83k" },
  { id: "a2", severity: "high", title: "Jeddah chair utilisation down", detail: "Chair utilisation has fallen 17% versus the previous four-week average.", branch: "Jeddah Tahlia", value: "69%" },
  { id: "a3", severity: "opportunity", title: "Accepted treatment not scheduled", detail: "38 patients have accepted treatment but no future appointment.", value: "SAR 184.7k" },
  { id: "a4", severity: "governance", title: "Clinical records incomplete", detail: "17 records remain incomplete more than 48 hours after appointment completion.", value: "17 records" },
  { id: "a5", severity: "positive", title: "Riyadh North conversion high", detail: "Treatment acceptance is at its highest level in six months.", branch: "Riyadh North", value: "+11%" },
];

export const chairPerformance = [
  { chair: "Chair 1", branch: "Riyadh North", clinician: "Dr Sara Al-Qahtani", utilisation: 87, revenueHour: 1080, contributionHour: 690, unusedHours: 8 },
  { chair: "Chair 2", branch: "Riyadh North", clinician: "Dr Omar Al-Harbi", utilisation: 91, revenueHour: 880, contributionHour: 510, unusedHours: 5 },
  { chair: "Chair 3", branch: "Riyadh North", clinician: "Dr Layla Haddad", utilisation: 61, revenueHour: 420, contributionHour: 230, unusedHours: 29 },
  { chair: "Chair 4", branch: "Riyadh North", clinician: "Dr Faisal Khan", utilisation: 82, revenueHour: 940, contributionHour: 560, unusedHours: 11 },
];

export const clinicians = [
  { id: "c1", name: "Dr Sara Al-Qahtani", specialty: "Restorative", branch: "Riyadh North", clinicalHours: 126, utilisation: 86, revenueHour: 1040, treatmentAcceptance: 72, recordCompleteness: 97, claimRejection: 2.1, returnRate: 81 },
  { id: "c2", name: "Dr Omar Al-Harbi", specialty: "Implantology", branch: "Riyadh North", clinicalHours: 118, utilisation: 91, revenueHour: 1280, treatmentAcceptance: 69, recordCompleteness: 94, claimRejection: 3.4, returnRate: 79 },
  { id: "c3", name: "Dr Layla Haddad", specialty: "General Dentistry", branch: "Riyadh North", clinicalHours: 121, utilisation: 63, revenueHour: 610, treatmentAcceptance: 58, recordCompleteness: 92, claimRejection: 4.6, returnRate: 72 },
  { id: "c4", name: "Dr Reem Al-Salem", specialty: "Endodontics", branch: "Jeddah Tahlia", clinicalHours: 124, utilisation: 71, revenueHour: 820, treatmentAcceptance: 62, recordCompleteness: 88, claimRejection: 8.9, returnRate: 75 },
  { id: "c5", name: "Dr Khalid Mansour", specialty: "Prosthodontics", branch: "Jeddah Tahlia", clinicalHours: 109, utilisation: 68, revenueHour: 780, treatmentAcceptance: 55, recordCompleteness: 83, claimRejection: 9.7, returnRate: 70 },
];

export const opportunityPipeline = [
  { label: "Accepted treatment not booked", value: 311000, count: 61 },
  { label: "Pending insurance approval", value: 173000, count: 34 },
  { label: "Treatment started but incomplete", value: 116000, count: 22 },
  { label: "Unresolved claims", value: 84300, count: 19 },
];

export const treatmentOpportunities = [
  { id: "T-43891", patient: "Patient 43891", branch: "Jeddah Tahlia", clinician: "Dr Reem Al-Salem", treatment: "Implant + crown", value: 9800, ageDays: 11, status: "Accepted · not booked", confidence: 92 },
  { id: "T-44712", patient: "Patient 44712", branch: "Riyadh East", clinician: "Dr Noura Al-Qahtani", treatment: "Aligner plan", value: 14200, ageDays: 8, status: "Accepted · not booked", confidence: 89 },
  { id: "T-44108", patient: "Patient 44108", branch: "Khobar", clinician: "Dr Abdulrahman Saeed", treatment: "Bridge + crowns", value: 11750, ageDays: 15, status: "Follow-up overdue", confidence: 87 },
  { id: "T-45201", patient: "Patient 45201", branch: "Jeddah Tahlia", clinician: "Dr Khalid Mansour", treatment: "Full-mouth restorative phase", value: 18600, ageDays: 9, status: "Accepted · not booked", confidence: 95 },
  { id: "T-44987", patient: "Patient 44987", branch: "Olaya", clinician: "Dr Mariam Al-Zahrani", treatment: "Root canal + crown", value: 5200, ageDays: 13, status: "Insurance approved", confidence: 84 },
];

export const claimsSummary = { submitted: 482, accepted: 427, requiresAction: 39, rejected: 16, exposedValue: 143000, acceptanceRate: 88.6 };

export const claims = [
  { id: "CLM-20831", patient: "Patient 38182", branch: "Jeddah Tahlia", insurer: "Insurer A", procedure: "Crown", value: 7200, status: "Requires action", reason: "Supporting information incomplete", ageHours: 31, pattern: "JED-SUP-01" },
  { id: "CLM-20827", patient: "Patient 42018", branch: "Jeddah Tahlia", insurer: "Insurer A", procedure: "Root canal", value: 4900, status: "Requires action", reason: "Supporting information incomplete", ageHours: 29, pattern: "JED-SUP-01" },
  { id: "CLM-20799", patient: "Patient 40442", branch: "Jeddah Tahlia", insurer: "Insurer B", procedure: "Bridge", value: 12600, status: "Rejected", reason: "Authorisation mismatch", ageHours: 45, pattern: "AUTH-02" },
  { id: "CLM-20782", patient: "Patient 39887", branch: "Khobar", insurer: "Insurer C", procedure: "Implant", value: 15400, status: "Requires action", reason: "Clinical attachment requested", ageHours: 37, pattern: "ATT-04" },
  { id: "CLM-20755", patient: "Patient 39201", branch: "Olaya", insurer: "Insurer A", procedure: "Crown", value: 6800, status: "Rejected", reason: "Benefit rule exception", ageHours: 61, pattern: "BEN-03" },
];

export const governanceSummary = { reviewed: 1184, complete: 1157, needsReview: 27, olderThan48h: 17, completionRate: 97.7 };

export const governanceRecords = [
  { id: "REC-7714", patient: "Patient 43891", branch: "Jeddah Tahlia", clinician: "Dr Reem Al-Salem", procedure: "Root canal treatment", completedAt: "12 Aug · 15:42", completeness: 91, missing: ["Consent reference"], ageHours: 18, severity: "medium" },
  { id: "REC-7688", patient: "Patient 43207", branch: "Jeddah Tahlia", clinician: "Dr Khalid Mansour", procedure: "Crown preparation", completedAt: "11 Aug · 10:08", completeness: 78, missing: ["Pre-op radiograph reference", "Material batch field"], ageHours: 49, severity: "high" },
  { id: "REC-7662", patient: "Patient 42901", branch: "Dammam", clinician: "Dr Aisha Al-Rashid", procedure: "Extraction", completedAt: "10 Aug · 16:31", completeness: 84, missing: ["Post-op instructions acknowledgement"], ageHours: 67, severity: "high" },
  { id: "REC-7728", patient: "Patient 44102", branch: "Riyadh North", clinician: "Dr Sara Al-Qahtani", procedure: "Composite restoration", completedAt: "12 Aug · 17:05", completeness: 96, missing: ["Shade field"], ageHours: 16, severity: "low" },
];

export const governanceChecklist = [
  { label: "Medical history reviewed", status: "complete" },
  { label: "Diagnosis recorded", status: "complete" },
  { label: "Radiograph linked", status: "complete" },
  { label: "Treatment discussion documented", status: "complete" },
  { label: "Consent reference", status: "missing" },
  { label: "Anaesthetic recorded", status: "complete" },
  { label: "Procedure documented", status: "complete" },
  { label: "Post-operative instructions", status: "complete" },
];

export const actions = [
  { id: "ACT-101", title: "Recover accepted treatment", type: "Revenue", owner: "Patient coordination", branch: "Group", count: 38, value: "SAR 184.7k", priority: "High", status: "Open", due: "Today" },
  { id: "ACT-102", title: "Resolve repeated Jeddah claim pattern", type: "Claims", owner: "Insurance team", branch: "Jeddah Tahlia", count: 11, value: "SAR 41.6k", priority: "Critical", status: "In progress", due: "Today" },
  { id: "ACT-103", title: "Complete >48h clinical records", type: "Governance", owner: "Clinical leads", branch: "Group", count: 17, value: "17 records", priority: "High", status: "Open", due: "Today" },
  { id: "ACT-104", title: "Review Chair 3 capacity", type: "Operations", owner: "Riyadh manager", branch: "Riyadh North", count: 1, value: "SAR 34k capacity", priority: "Medium", status: "Assigned", due: "14 Aug" },
  { id: "ACT-105", title: "Review Jeddah utilisation recovery plan", type: "Operations", owner: "Regional operations", branch: "Jeddah Tahlia", count: 1, value: "+9 pts target", priority: "High", status: "In progress", due: "15 Aug" },
];

export const integrations = [
  { name: "Practice Management System", category: "Clinical + appointments", state: "Simulated connected", records: "11,284 patients" },
  { name: "NPHIES", category: "Insurance workflow", state: "Simulated connected", records: "482 claims" },
  { name: "Imaging", category: "Radiograph metadata", state: "Simulated connected", records: "7,420 studies" },
  { name: "Finance", category: "Payments + collections", state: "Simulated connected", records: "SAR 4.66m" },
  { name: "Roster", category: "Clinician availability", state: "Simulated connected", records: "54 clinicians" },
];

export const askSitoraPrompts = [
  "Why did Jeddah Tahlia revenue fall?",
  "Which branch has the biggest recoverable revenue opportunity?",
  "Where are our claims risks concentrated?",
  "Which governance issues need attention today?",
];

export function getSitoraAnswer(question: string) {
  const normalized = question.toLowerCase();
  if (normalized.includes("jeddah") && (normalized.includes("fall") || normalized.includes("revenue") || normalized.includes("why"))) {
    return { headline: "Jeddah Tahlia is underperforming mainly because chair capacity is not being converted into treatment activity.", points: ["Chair utilisation is 69%, 9.4 points below the group average.", "The branch carries SAR 137,400 of treatment opportunity, the highest in the group.", "SAR 46,200 of claims require attention, also the highest branch-level exposure."], action: "Prioritise the unbooked treatment queue, review the low-utilisation chair sessions, and clear the repeated claim-support pattern." };
  }
  if (normalized.includes("opportunity") || normalized.includes("recoverable") || normalized.includes("treatment")) {
    return { headline: "Jeddah Tahlia has the largest recoverable treatment opportunity.", points: ["SAR 137,400 is currently in the branch opportunity pipeline.", "Across the group, total treatment opportunity is SAR 683,700.", "38 accepted plans worth SAR 184,700 are more than seven days old without a booking."], action: "Start with accepted-but-unbooked plans because they have the strongest intent signal and shortest path to recovery." };
  }
  if (normalized.includes("claim")) {
    return { headline: "Claims risk is concentrated in Jeddah Tahlia and Khobar.", points: ["Group-wide exposed claims value is SAR 143,000.", "Jeddah Tahlia represents SAR 46,200 of the exposure.", "11 Jeddah claims share the same supporting-information pattern and should be reviewed together."], action: "Create one work queue for the repeated Jeddah pattern before handling lower-value exceptions individually." };
  }
  return { headline: "There are three priority actions across the group today.", points: ["17 clinical records remain incomplete after 48 hours.", "SAR 83,000 of claims are approaching the next action window.", "Jeddah Tahlia chair utilisation remains materially below the group average."], action: "Resolve time-sensitive claims first, then complete outstanding records and address the Jeddah utilisation gap." };
}

export function sar(value: number) {
  return `SAR ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)}`;
}
