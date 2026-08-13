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
  { id: "riyadh-north", name: "Riyadh North", city: "Riyadh", revenue: 942000, collections: 851000, utilisation: 87, claimsRisk: 12400, governance: 96, treatmentOpportunity: 68200, status: "excellent" },
  { id: "olaya", name: "Olaya", city: "Riyadh", revenue: 821000, collections: 746000, utilisation: 81, claimsRisk: 18100, governance: 93, treatmentOpportunity: 74200, status: "good" },
  { id: "riyadh-east", name: "Riyadh East", city: "Riyadh", revenue: 715000, collections: 641000, utilisation: 79, claimsRisk: 15900, governance: 94, treatmentOpportunity: 83100, status: "good" },
  { id: "jeddah-tahlia", name: "Jeddah Tahlia", city: "Jeddah", revenue: 708000, collections: 602000, utilisation: 69, claimsRisk: 46200, governance: 84, treatmentOpportunity: 137400, status: "attention" },
  { id: "jeddah-corniche", name: "Jeddah Corniche", city: "Jeddah", revenue: 612000, collections: 547000, utilisation: 74, claimsRisk: 20700, governance: 91, treatmentOpportunity: 91400, status: "good" },
  { id: "khobar", name: "Khobar", city: "Khobar", revenue: 579000, collections: 521000, utilisation: 76, claimsRisk: 21400, governance: 91, treatmentOpportunity: 86800, status: "good" },
  { id: "dammam", name: "Dammam", city: "Dammam", revenue: 487000, collections: 424000, utilisation: 73, claimsRisk: 5300, governance: 89, treatmentOpportunity: 74800, status: "good" },
  { id: "madinah", name: "Madinah", city: "Madinah", revenue: 376000, collections: 329000, utilisation: 70, claimsRisk: 3000, governance: 90, treatmentOpportunity: 67800, status: "good" },
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
  {
    title: "Jeddah Tahlia is below trend",
    detail: "Revenue is 13% below its four-week run rate. Lower chair utilisation explains most of the movement.",
    action: "Open branch analysis",
  },
  {
    title: "Claims exposure needs attention",
    detail: "SAR 46,200 of claims at Jeddah Tahlia require review, including 11 with the same supporting-information pattern.",
    action: "Review claims",
  },
  {
    title: "Accepted treatment is waiting",
    detail: "38 accepted treatment plans worth SAR 184,700 remain unbooked for more than seven days.",
    action: "Open opportunity queue",
  },
];

export const alerts: AlertItem[] = [
  { id: "a1", severity: "critical", title: "Claims approaching action window", detail: "19 claims require review before the next submission cycle.", value: "SAR 83k" },
  { id: "a2", severity: "high", title: "Jeddah chair utilisation down", detail: "Chair utilisation has fallen 17% versus the previous four-week average.", branch: "Jeddah Tahlia", value: "69%" },
  { id: "a3", severity: "opportunity", title: "Accepted treatment not scheduled", detail: "38 patients have accepted treatment but no future appointment.", value: "SAR 184.7k" },
  { id: "a4", severity: "governance", title: "Clinical records incomplete", detail: "17 records remain incomplete more than 48 hours after appointment completion.", value: "17 records" },
  { id: "a5", severity: "positive", title: "Riyadh North conversion high", detail: "Treatment acceptance is at its highest level in six months.", branch: "Riyadh North", value: "+11%" },
];

export const chairPerformance = [
  { chair: "Chair 1", utilisation: 87, revenueHour: 1080, contributionHour: 690 },
  { chair: "Chair 2", utilisation: 91, revenueHour: 880, contributionHour: 510 },
  { chair: "Chair 3", utilisation: 61, revenueHour: 420, contributionHour: 230 },
  { chair: "Chair 4", utilisation: 82, revenueHour: 940, contributionHour: 560 },
];

export const opportunityPipeline = [
  { label: "Accepted treatment not booked", value: 311000, count: 61 },
  { label: "Pending insurance approval", value: 173000, count: 34 },
  { label: "Treatment started but incomplete", value: 116000, count: 22 },
  { label: "Unresolved claims", value: 84300, count: 19 },
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
    return {
      headline: "Jeddah Tahlia is underperforming mainly because chair capacity is not being converted into treatment activity.",
      points: [
        "Chair utilisation is 69%, 9.4 points below the group average.",
        "The branch carries SAR 137,400 of treatment opportunity, the highest in the group.",
        "SAR 46,200 of claims require attention, also the highest branch-level exposure.",
      ],
      action: "Prioritise the unbooked treatment queue, review Chair 3 availability, and clear the repeated claim-support pattern.",
    };
  }

  if (normalized.includes("opportunity") || normalized.includes("recoverable") || normalized.includes("treatment")) {
    return {
      headline: "Jeddah Tahlia has the largest recoverable treatment opportunity.",
      points: [
        "SAR 137,400 is currently in the branch opportunity pipeline.",
        "Across the group, total treatment opportunity is SAR 683,700.",
        "38 accepted plans worth SAR 184,700 are more than seven days old without a booking.",
      ],
      action: "Start with accepted-but-unbooked plans because they have the strongest intent signal and shortest path to recovery.",
    };
  }

  if (normalized.includes("claim")) {
    return {
      headline: "Claims risk is concentrated in Jeddah Tahlia and Khobar.",
      points: [
        "Group-wide exposed claims value is SAR 143,000.",
        "Jeddah Tahlia represents SAR 46,200 of the exposure.",
        "11 Jeddah claims share the same supporting-information pattern and should be reviewed together.",
      ],
      action: "Create one work queue for the repeated Jeddah pattern before handling lower-value exceptions individually.",
    };
  }

  return {
    headline: "There are three priority actions across the group today.",
    points: [
      "17 clinical records remain incomplete after 48 hours.",
      "SAR 83,000 of claims are approaching the next action window.",
      "Jeddah Tahlia chair utilisation remains materially below the group average.",
    ],
    action: "Resolve time-sensitive claims first, then complete outstanding records and address the Jeddah utilisation gap.",
  };
}

export function sar(value: number) {
  return `SAR ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)}`;
}
