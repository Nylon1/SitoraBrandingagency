export const executiveChanges = [
  { label: "Revenue pace", current: "SAR 184k/day", previous: "SAR 171k/day", delta: "+7.6%", tone: "good", reason: "Riyadh North and Olaya are above run rate" },
  { label: "Chair utilisation", current: "78.4%", previous: "76.1%", delta: "+2.3 pts", tone: "good", reason: "Improved morning utilisation in Riyadh" },
  { label: "Claims exposure", current: "SAR 143k", previous: "SAR 119k", delta: "+20.2%", tone: "warn", reason: "Repeated Jeddah supporting-information pattern" },
  { label: "Unbooked accepted treatment", current: "SAR 311k", previous: "SAR 286k", delta: "+8.7%", tone: "warn", reason: "38 plans worth SAR 184.7k have crossed the seven-day threshold" },
  { label: "Record completeness", current: "97.7%", previous: "96.9%", delta: "+0.8 pts", tone: "good", reason: "1,157 of 1,184 reviewed records are complete" },
];

export const branchComparison = [
  { metric: "Revenue / chair", riyadh: 157000, jeddah: 118000, format: "sar", insight: "Riyadh North generates 33% more revenue per chair." },
  { metric: "Chair utilisation", riyadh: 87, jeddah: 69, format: "pct", insight: "Jeddah has materially more unused capacity." },
  { metric: "Treatment acceptance", riyadh: 74, jeddah: 61, format: "pct", insight: "The gap suggests both case mix and follow-up workflow differences." },
  { metric: "Claims rejection", riyadh: 2.4, jeddah: 7.3, format: "pct1", insight: "Jeddah rejection is more than 3x Riyadh North." },
  { metric: "Record completeness", riyadh: 96, jeddah: 84, format: "pct", insight: "Governance drag is concentrated in Jeddah." },
  { metric: "Patient return rate", riyadh: 82, jeddah: 71, format: "pct", insight: "Retention is another contributor to the branch gap." },
];

export const integrationHealth = [
  { name: "Dental PMS", vendor: "Simulated PMS A", status: "healthy", latency: "4 min", lastSync: "09:54", records: "18.4k", scope: "appointments, treatments, clinicians" },
  { name: "NPHIES", vendor: "Prototype connector", status: "attention", latency: "12 min", lastSync: "09:47", records: "482 claims", scope: "claim status + exception metadata" },
  { name: "Imaging", vendor: "DICOM metadata bridge", status: "healthy", latency: "7 min", lastSync: "09:51", records: "3.1k studies", scope: "metadata only in prototype" },
  { name: "Finance", vendor: "ERP sandbox", status: "healthy", latency: "18 min", lastSync: "09:38", records: "6.2k txns", scope: "payments, costs, collections" },
  { name: "Roster", vendor: "HR sandbox", status: "healthy", latency: "31 min", lastSync: "09:25", records: "96 users", scope: "shifts, clinician availability" },
  { name: "Messaging", vendor: "WhatsApp sandbox", status: "planned", latency: "—", lastSync: "—", records: "—", scope: "patient follow-up actions" },
];

export const platformModules = [
  { name: "Control Tower", category: "Core", state: "active", value: "Group-wide operating visibility", icon: "tower" },
  { name: "Revenue Intelligence", category: "Commercial", state: "active", value: "Recover unbooked treatment and capacity", icon: "revenue" },
  { name: "Claims Intelligence", category: "Insurance", state: "active", value: "Detect repeated claim patterns and exposed value", icon: "claims" },
  { name: "Record Guardian", category: "Governance", state: "active", value: "Continuous documentation completeness checks", icon: "shield" },
  { name: "AI Scribe", category: "Clinical workflow", state: "roadmap", value: "Structured draft notes for clinician approval", icon: "scribe" },
  { name: "Patient Recovery", category: "Growth", state: "roadmap", value: "Prioritised recalls and accepted-plan follow-up", icon: "patient" },
  { name: "Workforce Optimiser", category: "Operations", state: "roadmap", value: "Match demand, chairs and clinician availability", icon: "workforce" },
  { name: "Procurement Intelligence", category: "Finance", state: "roadmap", value: "Track material and laboratory margin leakage", icon: "procurement" },
  { name: "Group Benchmarking", category: "Network", state: "vision", value: "Anonymous peer benchmarking across the network", icon: "benchmark" },
  { name: "Radiology Integrations", category: "Clinical AI", state: "vision", value: "Connect third-party imaging AI rather than rebuild it", icon: "radiology" },
  { name: "Saudi Executive Reporting", category: "Enterprise", state: "roadmap", value: "Board-ready operational and governance reporting", icon: "report" },
  { name: "Multi-country Governance", category: "Expansion", state: "vision", value: "Country-specific rule packs on one core platform", icon: "globe" },
];

export const decisionFeed = [
  { time: "09:42", priority: "P1", owner: "Insurance team", action: "Resolve JED-SUP-01 claim cluster", impact: "SAR 41.6k protected", state: "Assigned" },
  { time: "09:31", priority: "P1", owner: "Jeddah manager", action: "Work 38 accepted plans over seven days", impact: "SAR 184.7k opportunity", state: "In progress" },
  { time: "09:18", priority: "P2", owner: "Clinical governance", action: "Review 17 records older than 48h", impact: "Governance risk reduced", state: "Assigned" },
  { time: "08:57", priority: "P2", owner: "Riyadh manager", action: "Protect Chair 1 high-value capacity", impact: "Maintain SAR 690 contribution/hr", state: "Watching" },
  { time: "08:34", priority: "P3", owner: "Commercial team", action: "Replicate Riyadh treatment follow-up workflow in Jeddah", impact: "+13 pt acceptance gap", state: "Proposed" },
];

export const boardroomQuestions = [
  {
    q: "What changed since yesterday?",
    a: "Revenue pace improved, but claims exposure and accepted-but-unbooked treatment both moved in the wrong direction. The most time-sensitive issue is the Jeddah claim cluster; the largest commercial opportunity remains the 38 accepted plans over seven days.",
  },
  {
    q: "What would I do first if I ran the group?",
    a: "First protect revenue already earned by resolving the repeated Jeddah claim cluster. Second work the accepted treatment queue. Third address Jeddah chair utilisation because that is the largest structural operating gap.",
  },
  {
    q: "Why is Riyadh North outperforming Jeddah Tahlia?",
    a: "Riyadh North combines higher utilisation, stronger treatment acceptance, lower claims rejection and better record completeness. The difference is not one metric; it is a reinforcing operating system.",
  },
];
