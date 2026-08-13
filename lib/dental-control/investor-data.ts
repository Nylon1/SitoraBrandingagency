export const investorEconomics = {
  pricing: {
    starterMonthly: 3500,
    groupMonthly: 18000,
    enterpriseAnnual: 480000,
    blendedArrPerCustomer: 210000,
    grossMarginTarget: 0.84,
  },
  expansion: {
    baseModules: 3,
    matureModules: 7,
    year1Nrr: 1.06,
    year2Nrr: 1.14,
    year3Nrr: 1.22,
  },
  scenarios: [
    { groups: 10, arr: 2100000, grossProfit: 1764000, note: "Founder-led pilots + reference accounts" },
    { groups: 50, arr: 10500000, grossProfit: 8820000, note: "Repeatable Saudi enterprise sales motion" },
    { groups: 100, arr: 21000000, grossProfit: 17640000, note: "National category leadership" },
    { groups: 500, arr: 105000000, grossProfit: 88200000, note: "Regional multi-country platform" },
  ],
};

export const marketFrames = [
  { label: "TAM frame", value: "KSA + GCC dental groups and multi-site providers", detail: "Top-down market sizing should be validated with current provider counts and buyer budgets before investor use." },
  { label: "SAM frame", value: "Digitally mature multi-site dental operators", detail: "Initial serviceable market: groups with existing PMS/EMR, insurance workflows and executive reporting pain." },
  { label: "SOM frame", value: "First 25–50 Saudi groups", detail: "Focused wedge through pilots, measurable ROI and expansion into additional modules and branches." },
];

export const expansionModules = [
  { module: "Control Tower", stage: "Land", uplift: 0 },
  { module: "Revenue Intelligence", stage: "Land", uplift: 0.12 },
  { module: "Claims Intelligence", stage: "Expand", uplift: 0.16 },
  { module: "Record Guardian", stage: "Expand", uplift: 0.14 },
  { module: "Patient Recovery", stage: "Expand", uplift: 0.12 },
  { module: "Workforce Optimiser", stage: "Expand", uplift: 0.1 },
  { module: "Procurement Intelligence", stage: "Expand", uplift: 0.08 },
];

export const salesMotion = [
  { stage: "1", title: "Executive discovery", detail: "Quantify leakage, claims friction, chair under-utilisation and governance workload." },
  { stage: "2", title: "12-week pilot", detail: "Connect controlled data feeds across 1–3 branches and prove measurable operating value." },
  { stage: "3", title: "Group rollout", detail: "Expand to all branches after reconciliation and workflow acceptance." },
  { stage: "4", title: "Module expansion", detail: "Add claims, governance, patient recovery, workforce and procurement intelligence." },
  { stage: "5", title: "Regional expansion", detail: "Replicate the canonical data layer with country-specific compliance and payer packs." },
];

export const moatLayers = [
  { title: "Canonical dental operating model", detail: "Normalises fragmented PMS, claims, finance and clinical-workflow data into one reusable model." },
  { title: "Workflow intelligence", detail: "Insights become owned actions, outcomes and event history rather than passive dashboards." },
  { title: "Evidence-backed AI", detail: "Executive answers retain source lineage, role scope and deterministic metric calculations." },
  { title: "Saudi implementation knowledge", detail: "Connector patterns, claims workflows, bilingual UX and regulated-health deployment knowledge compound over time." },
  { title: "Expansion surface", detail: "Once integrated, additional modules can be activated without replacing the customer's core systems." },
];
