import { branches, sar } from "@/lib/dental-control/demo-data";

export type EvidenceLink = {
  label: string;
  type: "branch" | "claim" | "clinician" | "patient" | "action" | "metric";
  href?: string;
  value?: string;
};

export type CopilotAnswer = {
  title: string;
  confidence: number;
  summary: string;
  evidence: EvidenceLink[];
  drivers: { label: string; impact: string; direction: "positive" | "negative" | "neutral" }[];
  recommendation: string;
  expectedImpact?: string;
  followUps: string[];
};

export const executivePrompts = [
  "What changed since yesterday?",
  "Why is Jeddah Tahlia underperforming?",
  "Where can we recover SAR 250k fastest?",
  "What would happen if Jeddah reached 78% chair utilisation?",
  "Which issue should the CEO address first?",
  "Show me the evidence behind the Jeddah claims risk.",
];

export const scenarios = [
  {
    id: "jeddah-utilisation",
    title: "Raise Jeddah chair utilisation",
    current: "69%",
    target: "78%",
    effect: "SAR 92k–128k monthly revenue upside",
    confidence: 82,
    assumptions: ["Current treatment mix remains stable", "No increase in clinician FTE", "Recovered hours convert at 62–74% of current revenue/hour"],
  },
  {
    id: "treatment-recovery",
    title: "Recover accepted treatment backlog",
    current: "SAR 184.7k",
    target: "45% recovered",
    effect: "~SAR 83k near-term booked value",
    confidence: 88,
    assumptions: ["Focus only on accepted plans older than 7 days", "No discount assumed", "Recovery rate benchmark is a demo assumption"],
  },
  {
    id: "claims-cluster",
    title: "Resolve repeated Jeddah claim pattern",
    current: "11 claims",
    target: "Single grouped workflow",
    effect: "SAR 41.6k exposure addressed",
    confidence: 94,
    assumptions: ["Claims share the same supporting-information exception", "Human insurance team validates every resubmission", "No automated code generation"],
  },
];

const jeddah = branches.find((branch) => branch.id === "jeddah-tahlia")!;
const riyadh = branches.find((branch) => branch.id === "riyadh-north")!;

export function getExecutiveAnswer(question: string): CopilotAnswer {
  const q = question.toLowerCase();

  if (q.includes("what changed") || q.includes("yesterday")) {
    return {
      title: "Three changes matter today",
      confidence: 91,
      summary: "The group remains commercially healthy, but Jeddah Tahlia is creating a disproportionate share of operational risk. Treatment backlog increased, its claims exception cluster persisted, and chair utilisation remains below the group threshold.",
      evidence: [
        { label: "Jeddah Tahlia", type: "branch", href: "/tools/dental-control/branch/jeddah-tahlia", value: "69% utilisation" },
        { label: "Treatment backlog", type: "metric", value: "SAR 184.7k >7 days" },
        { label: "Claims cluster JED-SUP-01", type: "claim", value: "11 claims / SAR 41.6k" },
      ],
      drivers: [
        { label: "Jeddah chair utilisation", impact: "-9.4 pts vs group", direction: "negative" },
        { label: "Accepted treatment backlog", impact: "+SAR 26.4k vs yesterday", direction: "negative" },
        { label: "Riyadh North conversion", impact: "+11% vs 6-month average", direction: "positive" },
      ],
      recommendation: "Give the Jeddah manager one recovery plan covering unbooked treatment, Chair 3 capacity and the repeated claims exception rather than three disconnected tasks.",
      expectedImpact: "Potential to protect or recover roughly SAR 120k–170k of near-term value in the demo model.",
      followUps: ["Why is Jeddah Tahlia underperforming?", "Where can we recover SAR 250k fastest?", "Show me the Jeddah action plan"],
    };
  }

  if (q.includes("250") || q.includes("recover") || q.includes("fastest")) {
    return {
      title: "The fastest path is a portfolio of three actions, not one bet",
      confidence: 86,
      summary: "The demo dataset does not support a credible single action worth SAR 250k. The strongest route combines accepted-treatment recovery, Jeddah capacity recovery and claims remediation.",
      evidence: [
        { label: "Accepted treatment >7 days", type: "metric", value: "SAR 184.7k" },
        { label: "Jeddah capacity scenario", type: "branch", href: "/tools/dental-control/branch/jeddah-tahlia", value: "SAR 92k–128k upside" },
        { label: "JED-SUP-01", type: "claim", value: "SAR 41.6k exposure" },
      ],
      drivers: [
        { label: "Treatment recovery at 45%", impact: "~SAR 83k", direction: "positive" },
        { label: "Jeddah utilisation to 78%", impact: "SAR 92k–128k", direction: "positive" },
        { label: "Repeated claims pattern", impact: "SAR 41.6k protected", direction: "positive" },
      ],
      recommendation: "Run all three as a 30-day recovery sprint with one executive owner and daily progress tracking in Action Centre.",
      expectedImpact: "Combined modeled value: approximately SAR 216k–253k, before overlap and execution risk.",
      followUps: ["Build the 30-day recovery sprint", "What assumptions drive the utilisation scenario?", "Which patients are highest priority?"],
    };
  }

  if (q.includes("what would happen") || q.includes("78%") || q.includes("scenario")) {
    return {
      title: "Moving Jeddah from 69% to 78% utilisation could materially change branch economics",
      confidence: 82,
      summary: "Using the current demo treatment mix and revenue-per-clinical-hour range, nine additional utilisation points translate to an estimated SAR 92k–128k monthly revenue opportunity. This is a modeled scenario, not a forecast guarantee.",
      evidence: [
        { label: "Jeddah current utilisation", type: "branch", href: "/tools/dental-control/branch/jeddah-tahlia", value: "69%" },
        { label: "Group utilisation", type: "metric", value: "78.4%" },
        { label: "Riyadh North comparator", type: "branch", value: `${riyadh.utilisation}%` },
      ],
      drivers: [
        { label: "Unused clinical capacity", impact: "Primary upside source", direction: "positive" },
        { label: "Accepted treatment backlog", impact: "Provides demand to fill capacity", direction: "positive" },
        { label: "Execution risk", impact: "Not every recovered hour converts", direction: "neutral" },
      ],
      recommendation: "Do not add chairs. First recover demand into existing capacity, concentrating on high-intent accepted plans and underused sessions.",
      expectedImpact: "Modeled monthly revenue upside: SAR 92k–128k. Contribution impact would be lower after clinician, material and lab costs.",
      followUps: ["Show the assumptions", "Which chair should we fix first?", "What if utilisation only reaches 74%?"],
    };
  }

  if (q.includes("claims") || q.includes("evidence")) {
    return {
      title: "Jeddah's claims risk is concentrated, not random",
      confidence: 94,
      summary: "Eleven claims share the same supporting-information exception pattern. That makes this more likely to be a workflow or documentation issue than eleven unrelated failures.",
      evidence: [
        { label: "JED-SUP-01 cluster", type: "claim", value: "11 claims" },
        { label: "Cluster value", type: "metric", value: "SAR 41.6k" },
        { label: "Jeddah total claims risk", type: "branch", href: "/tools/dental-control/branch/jeddah-tahlia", value: sar(jeddah.claimsRisk) },
      ],
      drivers: [
        { label: "Repeated exception signature", impact: "11 matching claims", direction: "negative" },
        { label: "Branch concentration", impact: "Highest group exposure", direction: "negative" },
        { label: "Grouped remediation", impact: "Efficient fix path", direction: "positive" },
      ],
      recommendation: "Have the insurance lead validate the shared exception, correct the underlying workflow, then review all eleven claims as one batch with human approval.",
      expectedImpact: "SAR 41.6k of identified exposure addressed, subject to payer review and claim validity.",
      followUps: ["Create a grouped action", "Which branch has the next highest claims exposure?", "What guardrails apply to claims AI?"],
    };
  }

  if (q.includes("first") || q.includes("ceo") || q.includes("priority")) {
    return {
      title: "The CEO should address the Jeddah operating system, not an individual symptom",
      confidence: 90,
      summary: "Jeddah combines the group's lowest utilisation, highest treatment opportunity and highest claims exposure. Those signals interact, so solving them through one accountable branch recovery plan has more leverage than chasing isolated alerts.",
      evidence: [
        { label: "Jeddah Tahlia", type: "branch", href: "/tools/dental-control/branch/jeddah-tahlia", value: `${jeddah.utilisation}% utilisation` },
        { label: "Treatment opportunity", type: "metric", value: sar(jeddah.treatmentOpportunity) },
        { label: "Claims risk", type: "metric", value: sar(jeddah.claimsRisk) },
      ],
      drivers: [
        { label: "Capacity gap", impact: "Largest operational drag", direction: "negative" },
        { label: "Demand already exists", impact: "High recovery potential", direction: "positive" },
        { label: "Claims concentration", impact: "Cash conversion risk", direction: "negative" },
      ],
      recommendation: "Assign one 30-day Jeddah recovery objective to the regional lead, with three measurable outcomes: utilisation >76%, accepted backlog reduced by 40%, repeated claim exception cleared.",
      expectedImpact: "Creates one accountable intervention around the branch with the highest modeled recoverable value.",
      followUps: ["Build the 30-day recovery sprint", "Who should own each workstream?", "Compare Jeddah with Riyadh North"],
    };
  }

  return {
    title: "Jeddah Tahlia is underperforming because capacity, conversion and claims risk are reinforcing each other",
    confidence: 92,
    summary: `Jeddah is at ${jeddah.utilisation}% chair utilisation while carrying ${sar(jeddah.treatmentOpportunity)} of treatment opportunity and ${sar(jeddah.claimsRisk)} of claims risk. The issue is not simply low demand: accepted treatment exists but is not consistently converting into booked chair time.`,
    evidence: [
      { label: "Open Jeddah command centre", type: "branch", href: "/tools/dental-control/branch/jeddah-tahlia", value: `${jeddah.utilisation}% utilisation` },
      { label: "Dr Faisal Al-Zahrani", type: "clinician", href: "/tools/dental-control/clinician/dr-faisal-al-zahrani", value: "Clinician drill-down" },
      { label: "Patient J-11307", type: "patient", href: "/tools/dental-control/patient/J-11307", value: "SAR 7.6k stranded plan" },
    ],
    drivers: [
      { label: "Low utilisation", impact: "9.4 pts below group", direction: "negative" },
      { label: "Unbooked accepted care", impact: "High-intent demand stranded", direction: "negative" },
      { label: "Claims exception cluster", impact: "SAR 41.6k exposure", direction: "negative" },
    ],
    recommendation: "Start with accepted treatment because it can fill existing capacity quickly, while the insurance team resolves the repeated claim exception in parallel.",
    expectedImpact: "A coordinated branch intervention has more modeled upside than adding capacity or increasing top-of-funnel marketing.",
    followUps: ["What would happen if Jeddah reached 78% chair utilisation?", "Where can we recover SAR 250k fastest?", "Show me the evidence behind the claims risk"],
  };
}
