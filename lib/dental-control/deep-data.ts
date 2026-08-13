import { branches, sar } from "@/lib/dental-control/demo-data";

export const branchDrilldowns = {
  "jeddah-tahlia": {
    id: "jeddah-tahlia",
    name: "Jeddah Tahlia",
    city: "Jeddah",
    revenue: 708000,
    collections: 602000,
    utilisation: 69,
    governance: 84,
    claimsRisk: 46200,
    treatmentOpportunity: 137400,
    fourWeekRevenueChange: -13,
    clinicalHours: 812,
    completedVisits: 1194,
    cancellations: 86,
    noShows: 39,
    acceptedUnbooked: 19,
    acceptedUnbookedValue: 81200,
    claimExceptionCount: 14,
    recordReviewCount: 9,
    executiveSummary:
      "Jeddah Tahlia is underperforming because available clinical capacity is not converting into completed treatment. The largest controllable issues are Chair 3 under-utilisation, accepted treatment not being scheduled quickly enough, and a repeated claim-support workflow problem.",
    drivers: [
      { label: "Chair capacity gap", impact: "-SAR 52k", detail: "Chair 3 and Chair 5 together carry 47 unused clinical hours versus branch plan.", severity: "high" },
      { label: "Accepted treatment delay", impact: "SAR 81.2k", detail: "19 accepted plans have no future appointment, 11 of them older than seven days.", severity: "opportunity" },
      { label: "Claims workflow", impact: "SAR 41.6k", detail: "11 claims share the same supporting-information exception pattern.", severity: "high" },
      { label: "Record completion", impact: "9 records", detail: "Documentation completion is 84%; nine records currently require human review.", severity: "governance" },
    ],
    chairs: [
      { id: "JED-T-01", name: "Chair 1", clinician: "Dr Sara Al-Qahtani", utilisation: 82, revenueHour: 930, contributionHour: 550, unusedHours: 11, signal: "stable" },
      { id: "JED-T-02", name: "Chair 2", clinician: "Dr Omar Al-Harbi", utilisation: 77, revenueHour: 790, contributionHour: 445, unusedHours: 15, signal: "stable" },
      { id: "JED-T-03", name: "Chair 3", clinician: "Dr Faisal Al-Zahrani", utilisation: 54, revenueHour: 410, contributionHour: 205, unusedHours: 31, signal: "attention" },
      { id: "JED-T-04", name: "Chair 4", clinician: "Dr Lina Al-Mutairi", utilisation: 73, revenueHour: 840, contributionHour: 480, unusedHours: 17, signal: "watch" },
      { id: "JED-T-05", name: "Chair 5", clinician: "Mixed roster", utilisation: 61, revenueHour: 510, contributionHour: 260, unusedHours: 16, signal: "attention" },
    ],
    clinicians: [
      { id: "dr-sara-al-qahtani", name: "Dr Sara Al-Qahtani", specialty: "Restorative & Cosmetic", revenue: 184000, revenueHour: 1015, utilisation: 86, acceptance: 74, recordCompleteness: 97, claimsRejection: 2.1, patientReturn: 82, clinicalHours: 181, contribution: 109000, signal: "strong" },
      { id: "dr-omar-al-harbi", name: "Dr Omar Al-Harbi", specialty: "General Dentistry", revenue: 148000, revenueHour: 810, utilisation: 78, acceptance: 67, recordCompleteness: 94, claimsRejection: 3.6, patientReturn: 77, clinicalHours: 183, contribution: 79000, signal: "stable" },
      { id: "dr-faisal-al-zahrani", name: "Dr Faisal Al-Zahrani", specialty: "Endodontics", revenue: 121000, revenueHour: 655, utilisation: 58, acceptance: 69, recordCompleteness: 88, claimsRejection: 8.4, patientReturn: 74, clinicalHours: 185, contribution: 54000, signal: "attention" },
      { id: "dr-lina-al-mutairi", name: "Dr Lina Al-Mutairi", specialty: "Prosthodontics", revenue: 164000, revenueHour: 925, utilisation: 79, acceptance: 71, recordCompleteness: 92, claimsRejection: 4.2, patientReturn: 80, clinicalHours: 177, contribution: 92000, signal: "strong" },
      { id: "dr-yousef-al-shammari", name: "Dr Yousef Al-Shammari", specialty: "General Dentistry", revenue: 91000, revenueHour: 615, utilisation: 65, acceptance: 59, recordCompleteness: 86, claimsRejection: 6.7, patientReturn: 69, clinicalHours: 148, contribution: 41000, signal: "watch" },
    ],
    opportunities: [
      { patient: "Patient J-10482", treatment: "Implant + crown", value: 13800, accepted: "01 Aug", ageDays: 12, owner: "Patient coordinator", confidence: 91, nextAction: "Call and offer surgical slot" },
      { patient: "Patient J-10991", treatment: "Aligner plan", value: 11200, accepted: "03 Aug", ageDays: 10, owner: "Treatment coordinator", confidence: 88, nextAction: "WhatsApp follow-up" },
      { patient: "Patient J-10811", treatment: "3-unit bridge", value: 9400, accepted: "04 Aug", ageDays: 9, owner: "Patient coordinator", confidence: 83, nextAction: "Confirm finance option" },
      { patient: "Patient J-11307", treatment: "Endodontic + crown", value: 7600, accepted: "06 Aug", ageDays: 7, owner: "Front desk", confidence: 78, nextAction: "Schedule treatment start" },
    ],
    claims: [
      { id: "NPH-JED-8831", patient: "Patient J-11982", value: 5200, procedure: "Crown", reason: "Supporting document missing", ageHours: 31, cluster: "JED-SUP-01" },
      { id: "NPH-JED-8827", patient: "Patient J-11410", value: 4600, procedure: "Endodontic treatment", reason: "Supporting document missing", ageHours: 34, cluster: "JED-SUP-01" },
      { id: "NPH-JED-8813", patient: "Patient J-11084", value: 3900, procedure: "Surgical extraction", reason: "Supporting document missing", ageHours: 42, cluster: "JED-SUP-01" },
      { id: "NPH-JED-8796", patient: "Patient J-10627", value: 7100, procedure: "Implant stage", reason: "Pre-authorisation reference", ageHours: 53, cluster: "JED-AUTH-02" },
    ],
    records: [
      { id: "REC-J-4518", patient: "Patient J-11810", procedure: "Root canal treatment", clinician: "Dr Faisal Al-Zahrani", completeness: 76, missing: ["Consent reference", "Post-op instructions"], ageHours: 54 },
      { id: "REC-J-4489", patient: "Patient J-11592", procedure: "Crown preparation", clinician: "Dr Lina Al-Mutairi", completeness: 84, missing: ["Shade record"], ageHours: 49 },
      { id: "REC-J-4462", patient: "Patient J-11108", procedure: "Extraction", clinician: "Dr Yousef Al-Shammari", completeness: 82, missing: ["Post-op advice acknowledgement"], ageHours: 45 },
    ],
  },
};

export type DeepBranch = (typeof branchDrilldowns)["jeddah-tahlia"];

export const clinicianProfiles = {
  "dr-faisal-al-zahrani": {
    id: "dr-faisal-al-zahrani",
    name: "Dr Faisal Al-Zahrani",
    specialty: "Endodontics",
    branch: "Jeddah Tahlia",
    avatar: "FZ",
    clinicalHours: 185,
    completedVisits: 208,
    revenue: 121000,
    contribution: 54000,
    revenueHour: 655,
    utilisation: 58,
    treatmentAcceptance: 69,
    recordCompleteness: 88,
    claimsRejection: 8.4,
    patientReturn: 74,
    trend: -7.8,
    sitoraSummary:
      "Dr Faisal is clinically busy when booked, but his available chair time is under-filled. His treatment acceptance is healthy, while claims rejection and documentation completeness create avoidable friction. The immediate opportunity is operational rather than purely commercial.",
    strengths: [
      "Treatment acceptance remains above branch median.",
      "Patient return rate is stable at 74%.",
      "Endodontic case value is strong when chair capacity is filled.",
    ],
    watchouts: [
      "Chair utilisation is 58%, 11 points below branch average.",
      "Claims rejection is 8.4%, highest among core branch clinicians.",
      "Three records currently require documentation review.",
    ],
    recentCases: [
      { patient: "Patient J-11810", procedure: "Root canal treatment", value: 4100, status: "Record review", time: "Yesterday 15:40" },
      { patient: "Patient J-11772", procedure: "Endodontic retreatment", value: 5200, status: "Completed", time: "Yesterday 12:10" },
      { patient: "Patient J-11410", procedure: "Root canal + core", value: 4600, status: "Claim action", time: "12 Aug 10:20" },
      { patient: "Patient J-11307", procedure: "Endodontic + crown", value: 7600, status: "Accepted · unbooked", time: "06 Aug" },
    ],
    weekly: [
      { week: "W1", utilisation: 67, revenue: 31800 },
      { week: "W2", utilisation: 63, revenue: 30200 },
      { week: "W3", utilisation: 57, revenue: 28400 },
      { week: "W4", utilisation: 58, revenue: 30600 },
    ],
  },
};

export const patientStory = {
  id: "J-11307",
  displayName: "Patient J-11307",
  branch: "Jeddah Tahlia",
  clinician: "Dr Faisal Al-Zahrani",
  treatment: "Endodontic treatment + crown",
  planValue: 7600,
  acceptedOn: "06 Aug 2026",
  status: "Accepted · not booked",
  daysWaiting: 7,
  insurer: "Demo insurer A",
  events: [
    { time: "06 Aug · 11:42", event: "Treatment plan created", detail: "Root canal treatment and definitive crown recommended." },
    { time: "06 Aug · 11:48", event: "Plan accepted", detail: "Patient accepted proposed treatment. No booking created." },
    { time: "08 Aug · 09:00", event: "Recovery rule triggered", detail: "No future appointment 48 hours after acceptance." },
    { time: "11 Aug · 10:15", event: "Coordinator reminder", detail: "Follow-up task remained open." },
    { time: "13 Aug · 08:05", event: "Sitora priority raised", detail: "Case reached seven-day threshold and entered executive opportunity queue." },
  ],
  recommendation:
    "Contact the patient today and offer one of the open endodontic slots this week. If insurance approval is required, create that workflow at the same time rather than waiting for a second hand-off.",
};

export const demoJourney = [
  { step: 1, title: "Spot the signal", screen: "Control Tower", narrative: "The CEO sees Jeddah Tahlia below trend, with claims exposure and unbooked treatment highlighted before opening another system.", proof: "13% below four-week revenue trend" },
  { step: 2, title: "Understand why", screen: "Branch Command Centre", narrative: "Sitora decomposes the branch problem into capacity, treatment conversion, claims and governance drivers.", proof: "47 unused clinical hours + SAR 81.2k accepted treatment" },
  { step: 3, title: "Find the operational cause", screen: "Clinician & Chair", narrative: "Chair 3 and its clinician profile show under-utilisation alongside healthy treatment acceptance, pointing to scheduling and workflow rather than demand alone.", proof: "58% clinician utilisation" },
  { step: 4, title: "Trace money to a real workflow", screen: "Patient Opportunity", narrative: "A high-intent accepted treatment plan has been waiting seven days without a booking. Sitora reconstructs the timeline and recommends the next action.", proof: "SAR 7,600 recoverable case" },
  { step: 5, title: "Close the loop", screen: "Action Centre", narrative: "The insight becomes an assigned action with owner, urgency and resolution tracking. Management can verify whether value was recovered.", proof: "Insight → task → outcome" },
];

export const platformLayers = [
  { layer: "Experience", items: ["Control Tower", "Branch Command", "Clinician View", "Action Centre", "Ask Sitora"] },
  { layer: "Intelligence", items: ["Rules engine", "Revenue models", "Anomaly detection", "LLM explanation", "Forecasting"] },
  { layer: "Canonical data", items: ["Patient", "Appointment", "Treatment", "Claim", "Payment", "Clinical record", "Chair", "Provider"] },
  { layer: "Event fabric", items: ["appointment.completed", "treatment.accepted", "claim.rejected", "record.updated", "payment.received"] },
  { layer: "Connectors", items: ["PMS / EMR", "NPHIES", "Imaging", "Accounting", "Payments", "HR / roster"] },
];

export function findBranch(id: string) {
  if (id === "jeddah-tahlia") return branchDrilldowns["jeddah-tahlia"];
  const base = branches.find((branch) => branch.id === id);
  if (!base) return branchDrilldowns["jeddah-tahlia"];
  return {
    ...branchDrilldowns["jeddah-tahlia"],
    ...base,
    id: base.id,
    name: base.name,
    city: base.city,
    executiveSummary: `${base.name} is shown using the deep-demo operating model. This branch view is ready for branch-specific synthetic data expansion.`,
  };
}

export function formatImpact(value: number) {
  return sar(value);
}
