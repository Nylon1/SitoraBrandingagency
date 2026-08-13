export const pricingTiers = [
  { name: "Clinic", monthly: 3500, branches: "1", users: "Up to 15", modules: ["Control Tower", "Revenue Intelligence", "Record Guardian"], note: "For single-site private clinics" },
  { name: "Group", monthly: 18000, branches: "2–10", users: "Up to 100", modules: ["All core modules", "Claims Intelligence", "Ask Sitora", "Branch Benchmarking"], note: "For multi-site dental groups" },
  { name: "Enterprise", monthly: 0, branches: "10+", users: "Custom", modules: ["All modules", "Advanced integrations", "Executive intelligence", "Custom governance"], note: "Annual enterprise contract" },
];

export const roiModel = {
  currentMonthlyRevenue: 5240000,
  treatmentOpportunity: 683700,
  claimsRisk: 143000,
  unusedChairCapacity: 312000,
  adminHoursPerMonth: 620,
  adminHourlyCost: 95,
  assumedTreatmentRecoveryRate: 0.22,
  assumedClaimsRecoveryRate: 0.35,
  assumedCapacityRecoveryRate: 0.18,
  assumedAdminReductionRate: 0.12,
};

export function calculateRoi(monthlyFee = 18000) {
  const treatment = roiModel.treatmentOpportunity * roiModel.assumedTreatmentRecoveryRate;
  const claims = roiModel.claimsRisk * roiModel.assumedClaimsRecoveryRate;
  const capacity = roiModel.unusedChairCapacity * roiModel.assumedCapacityRecoveryRate;
  const admin = roiModel.adminHoursPerMonth * roiModel.adminHourlyCost * roiModel.assumedAdminReductionRate;
  const grossMonthlyBenefit = treatment + claims + capacity + admin;
  const netMonthlyBenefit = grossMonthlyBenefit - monthlyFee;
  const roiMultiple = grossMonthlyBenefit / monthlyFee;
  const paybackDays = Math.max(1, Math.round((monthlyFee / grossMonthlyBenefit) * 30));
  return { treatment, claims, capacity, admin, grossMonthlyBenefit, netMonthlyBenefit, roiMultiple, paybackDays };
}

export const branchPnL = [
  { branch: "Riyadh North", revenue: 942000, clinicianCost: 282600, labCost: 74800, materials: 56500, supportCost: 89300, occupancy: 76000, contribution: 362800 },
  { branch: "Olaya", revenue: 821000, clinicianCost: 254500, labCost: 66300, materials: 51200, supportCost: 81700, occupancy: 71500, contribution: 295800 },
  { branch: "Jeddah Tahlia", revenue: 708000, clinicianCost: 237100, labCost: 63500, materials: 49700, supportCost: 84400, occupancy: 78300, contribution: 195000 },
  { branch: "Khobar", revenue: 579000, clinicianCost: 188000, labCost: 44700, materials: 40100, supportCost: 64100, occupancy: 58600, contribution: 183500 },
];

export const valueCase = [
  { area: "Accepted treatment", before: "Tracked manually across branch teams", after: "One prioritised recovery queue", impact: "Faster conversion of high-intent patients" },
  { area: "Claims", before: "Exceptions reviewed one by one", after: "Repeated patterns grouped and prioritised", impact: "Lower avoidable revenue leakage" },
  { area: "Chair capacity", before: "Utilisation visible after the fact", after: "Unused capacity quantified with commercial impact", impact: "Better deployment of clinicians and sessions" },
  { area: "Clinical records", before: "Issues found during later audit", after: "Incomplete documentation surfaced quickly", impact: "Earlier governance intervention" },
  { area: "Leadership", before: "Multiple systems and spreadsheets", after: "One operating intelligence layer", impact: "Faster, evidence-backed decisions" },
];

export const pilotProposal = {
  durationWeeks: 12,
  branches: ["Riyadh North", "Jeddah Tahlia"],
  modules: ["Control Tower", "Revenue Intelligence", "Claims Intelligence", "Record Guardian", "Ask Sitora"],
  successMeasures: [
    "Recover at least 8% of accepted-but-unbooked treatment in the pilot branches",
    "Reduce unresolved claims older than 72 hours by at least 20%",
    "Increase completeness of targeted clinical records to at least 95%",
    "Demonstrate daily executive use by branch and group leadership",
    "Reconcile all pilot KPI totals back to source-system extracts",
  ],
  stages: [
    { week: "1–2", title: "Connect & reconcile", detail: "Map source systems, ingest minimum required data and validate metric lineage." },
    { week: "3–4", title: "Baseline", detail: "Measure treatment leakage, claim exceptions, utilisation and governance backlog before interventions." },
    { week: "5–10", title: "Operate", detail: "Run Sitora work queues, executive briefings and action tracking with branch teams." },
    { week: "11–12", title: "Prove value", detail: "Compare baseline vs pilot outcomes and produce an enterprise rollout case." },
  ],
};
