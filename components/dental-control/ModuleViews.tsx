"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileWarning,
  Sparkles,
  Target,
  UserRoundCheck,
} from "lucide-react";
import {
  actions,
  claims,
  claimsSummary,
  clinicians,
  governanceChecklist,
  governanceRecords,
  governanceSummary,
  integrations,
  opportunityPipeline,
  sar,
  treatmentOpportunities,
} from "@/lib/dental-control/demo-data";

function PageIntro({ eyebrow, title, copy, right }: { eyebrow: string; title: string; copy: string; right?: React.ReactNode }) {
  return <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6cc8bd]">{eyebrow}</div><h1 className="mt-2 text-[29px] font-semibold tracking-[-0.035em] md:text-[35px]">{title}</h1><p className="mt-2 max-w-3xl text-[12px] leading-6 text-white/40">{copy}</p></div>{right}</div>;
}

function Stat({ label, value, sub, tone = "default" }: { label: string; value: string; sub: string; tone?: "default" | "good" | "warn" }) {
  return <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"><div className="text-[10px] uppercase tracking-[0.12em] text-white/28">{label}</div><div className={`mt-2 text-[23px] font-semibold tracking-[-0.03em] ${tone === "good" ? "text-emerald-200" : tone === "warn" ? "text-amber-200" : "text-white"}`}>{value}</div><div className="mt-1 text-[10px] text-white/30">{sub}</div></div>;
}

function Panel({ title, subtitle, children, action }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return <section className="rounded-3xl border border-white/[0.07] bg-white/[0.025]"><div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4"><div><div className="text-[13px] font-semibold text-white/90">{title}</div>{subtitle ? <div className="mt-1 text-[10px] text-white/28">{subtitle}</div> : null}</div>{action}</div><div className="p-5">{children}</div></section>;
}

export function RevenueIntelligenceView() {
  return <div>
    <PageIntro eyebrow="Revenue intelligence" title="Find the value already inside the group." copy="Sitora separates booked production from recoverable opportunity so leaders can see where revenue is waiting, why it is stuck and what should happen next." right={<div className="rounded-2xl border border-[#2aa89a]/20 bg-[#2aa89a]/8 px-4 py-3 text-right"><div className="text-[9px] uppercase tracking-[0.15em] text-[#80d1c7]">Recoverable pipeline</div><div className="mt-1 text-[20px] font-semibold">SAR 684.3k</div></div>} />
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{opportunityPipeline.map((item, index) => <Stat key={item.label} label={item.label} value={sar(item.value)} sub={`${item.count} cases`} tone={index === 0 ? "good" : "default"} />)}</div>

    <div className="mt-5 grid gap-5 2xl:grid-cols-[1.4fr_0.8fr]">
      <Panel title="Opportunity queue" subtitle="Prioritised by value, age and likelihood of recovery" action={<button className="rounded-lg border border-white/[0.07] px-3 py-1.5 text-[10px] text-white/45">Export queue</button>}>
        <div className="overflow-x-auto"><table className="w-full min-w-[830px] text-left"><thead className="text-[9px] uppercase tracking-[0.13em] text-white/24"><tr><th className="pb-3 font-medium">Case</th><th className="pb-3 font-medium">Branch</th><th className="pb-3 font-medium">Treatment</th><th className="pb-3 font-medium">Value</th><th className="pb-3 font-medium">Age</th><th className="pb-3 font-medium">Signal</th><th className="pb-3 font-medium">Recovery score</th></tr></thead><tbody>{treatmentOpportunities.map((row) => <tr key={row.id} className="border-t border-white/[0.05] text-[10px]"><td className="py-3.5"><div className="font-medium text-white/80">{row.patient}</div><div className="mt-0.5 text-[9px] text-white/25">{row.id}</div></td><td className="py-3.5 text-white/48">{row.branch}</td><td className="py-3.5 text-white/62">{row.treatment}</td><td className="py-3.5 font-medium text-[#79cfc5]">{sar(row.value)}</td><td className="py-3.5 text-white/48">{row.ageDays}d</td><td className="py-3.5"><span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-2 py-1 text-[9px] text-cyan-100/70">{row.status}</span></td><td className="py-3.5"><div className="flex items-center gap-2"><div className="h-1.5 w-16 rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-[#2aa89a]" style={{ width: `${row.confidence}%` }} /></div><span className="text-white/55">{row.confidence}%</span></div></td></tr>)}</tbody></table></div>
      </Panel>

      <Panel title="Sitora recovery brief" subtitle="What the commercial team should do first">
        <div className="rounded-2xl border border-[#2aa89a]/16 bg-[#2aa89a]/[0.045] p-4"><div className="flex items-center gap-2 text-[10px] font-medium text-[#79cfc5]"><Sparkles size={13}/>Highest-impact move</div><div className="mt-2 text-[15px] font-medium leading-6">Work the accepted-but-unbooked queue before broad recall activity.</div><p className="mt-2 text-[11px] leading-5 text-white/40">These patients have already accepted care, making them the strongest near-term recovery signal. Jeddah Tahlia should be prioritised first.</p></div>
        <div className="mt-3 space-y-2">{[
          ["Jeddah Tahlia", "SAR 137.4k", "Highest branch opportunity"],
          ["Accepted >7 days", "SAR 184.7k", "38 plans require follow-up"],
          ["Chair 3 capacity", "SAR 34k", "Estimated monthly recovery"],
        ].map(([a,b,c]) => <div key={a} className="rounded-xl border border-white/[0.055] bg-white/[0.025] p-3"><div className="flex items-center justify-between text-[11px]"><span className="text-white/60">{a}</span><span className="font-semibold text-white/80">{b}</span></div><div className="mt-1 text-[9px] text-white/25">{c}</div></div>)}</div>
      </Panel>
    </div>

    <div className="mt-5"><Panel title="Clinician intelligence" subtitle="Balanced commercial and care-quality indicators — not a crude revenue league table"><div className="grid gap-3 xl:grid-cols-5">{clinicians.map((clinician) => <div key={clinician.id} className="rounded-2xl border border-white/[0.055] bg-white/[0.025] p-4"><div className="text-[11px] font-medium text-white/80">{clinician.name}</div><div className="mt-1 text-[9px] text-white/28">{clinician.specialty} · {clinician.branch}</div><div className="mt-4 grid grid-cols-2 gap-3 text-[10px]"><div><div className="text-white/24">Revenue/hr</div><div className="mt-1 text-white/70">SAR {clinician.revenueHour}</div></div><div><div className="text-white/24">Utilisation</div><div className="mt-1 text-white/70">{clinician.utilisation}%</div></div><div><div className="text-white/24">Acceptance</div><div className="mt-1 text-white/70">{clinician.treatmentAcceptance}%</div></div><div><div className="text-white/24">Records</div><div className="mt-1 text-white/70">{clinician.recordCompleteness}%</div></div></div></div>)}</div></Panel></div>
  </div>;
}

export function ClaimsView() {
  return <div>
    <PageIntro eyebrow="Insurance intelligence" title="See claims risk before it becomes revenue leakage." copy="The prototype simulates a NPHIES-aware intelligence layer: Sitora groups exceptions, detects recurring patterns and creates work queues. It does not submit or adjudicate live claims." />
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><Stat label="Submitted" value={`${claimsSummary.submitted}`} sub="This month"/><Stat label="Accepted" value={`${claimsSummary.accepted}`} sub={`${claimsSummary.acceptanceRate}% acceptance`} tone="good"/><Stat label="Requires action" value={`${claimsSummary.requiresAction}`} sub="Open work queue" tone="warn"/><Stat label="Rejected" value={`${claimsSummary.rejected}`} sub="Needs investigation" tone="warn"/><Stat label="Exposed value" value={sar(claimsSummary.exposedValue)} sub="Across current exceptions" tone="warn"/></div>
    <div className="mt-5 grid gap-5 2xl:grid-cols-[1.4fr_0.8fr]">
      <Panel title="Claims work queue" subtitle="Exceptions prioritised by value, age and repeated pattern"><div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left"><thead className="text-[9px] uppercase tracking-[0.13em] text-white/24"><tr><th className="pb-3 font-medium">Claim</th><th className="pb-3 font-medium">Branch</th><th className="pb-3 font-medium">Procedure</th><th className="pb-3 font-medium">Value</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Reason</th><th className="pb-3 font-medium">Age</th></tr></thead><tbody>{claims.map((claim) => <tr key={claim.id} className="border-t border-white/[0.05] text-[10px]"><td className="py-3.5"><div className="text-white/78">{claim.id}</div><div className="mt-0.5 text-[9px] text-white/24">{claim.patient}</div></td><td className="py-3.5 text-white/48">{claim.branch}</td><td className="py-3.5 text-white/55">{claim.procedure}</td><td className="py-3.5 text-white/70">{sar(claim.value)}</td><td className="py-3.5"><span className={`rounded-full border px-2 py-1 text-[9px] ${claim.status === "Rejected" ? "border-rose-400/20 bg-rose-400/[0.06] text-rose-200" : "border-amber-400/20 bg-amber-400/[0.06] text-amber-200"}`}>{claim.status}</span></td><td className="py-3.5 text-white/42">{claim.reason}</td><td className="py-3.5 text-white/40">{claim.ageHours}h</td></tr>)}</tbody></table></div></Panel>
      <Panel title="Pattern detected" subtitle="Repeated exception clusters"><div className="rounded-2xl border border-amber-400/18 bg-amber-400/[0.045] p-4"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-amber-200"><AlertTriangle size={13}/>JED-SUP-01</div><div className="mt-3 text-[15px] font-medium">11 Jeddah claims share the same supporting-information pattern.</div><p className="mt-2 text-[11px] leading-5 text-white/40">Handle this as one workflow issue rather than 11 unrelated claim failures. Estimated exposed value: SAR 41,600.</p><button className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium text-amber-100">Create grouped action <ArrowRight size={11}/></button></div><div className="mt-3 rounded-2xl border border-white/[0.055] bg-white/[0.025] p-4"><div className="text-[10px] text-white/28">Prototype guardrail</div><p className="mt-2 text-[10px] leading-5 text-white/42">Rules validate coded workflows. AI can explain patterns and prioritise actions, but it does not invent dental codes or submit claims in this prototype.</p></div></Panel>
    </div>
  </div>;
}

export function RecordGuardianView() {
  const [selectedId, setSelectedId] = useState(governanceRecords[0].id);
  const selected = governanceRecords.find((record) => record.id === selectedId) ?? governanceRecords[0];
  return <div>
    <PageIntro eyebrow="Continuous governance" title="Catch incomplete records while they are still easy to fix." copy="Record Guardian checks documentation completeness against configured governance rules. It flags missing evidence for human review; it does not diagnose negligence or judge clinical quality." />
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><Stat label="Records reviewed" value={`${governanceSummary.reviewed}`} sub="This month"/><Stat label="Complete" value={`${governanceSummary.complete}`} sub="No action detected" tone="good"/><Stat label="Needs review" value={`${governanceSummary.needsReview}`} sub="Open queue" tone="warn"/><Stat label="Older than 48h" value={`${governanceSummary.olderThan48h}`} sub="Priority follow-up" tone="warn"/><Stat label="Completion rate" value={`${governanceSummary.completionRate}%`} sub="Group-wide" tone="good"/></div>
    <div className="mt-5 grid gap-5 2xl:grid-cols-[0.9fr_1.1fr]">
      <Panel title="Review queue" subtitle="Select a record to inspect"><div className="space-y-2">{governanceRecords.map((record) => <button key={record.id} onClick={() => setSelectedId(record.id)} className={`w-full rounded-2xl border p-3.5 text-left transition ${selectedId === record.id ? "border-[#2aa89a]/25 bg-[#2aa89a]/[0.055]" : "border-white/[0.055] bg-white/[0.02] hover:bg-white/[0.035]"}`}><div className="flex items-start justify-between gap-3"><div><div className="text-[11px] font-medium text-white/78">{record.procedure}</div><div className="mt-1 text-[9px] text-white/28">{record.patient} · {record.clinician}</div><div className="mt-1 text-[9px] text-white/24">{record.branch} · {record.ageHours}h old</div></div><div className={`text-[12px] font-semibold ${record.completeness < 85 ? "text-amber-200" : "text-[#79cfc5]"}`}>{record.completeness}%</div></div></button>)}</div></Panel>
      <Panel title={`${selected.procedure} · ${selected.id}`} subtitle={`${selected.patient} · ${selected.branch} · ${selected.clinician}`} action={<span className="rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-2 py-1 text-[9px] text-amber-200">Human review required</span>}>
        <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr]"><div className="space-y-2">{governanceChecklist.map((item) => <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"><div className="flex items-center gap-2.5 text-[10px] text-white/55">{item.status === "complete" ? <CheckCircle2 size={14} className="text-emerald-300"/> : <FileWarning size={14} className="text-amber-200"/>}{item.label}</div><span className={`text-[9px] ${item.status === "complete" ? "text-emerald-300/70" : "text-amber-200"}`}>{item.status === "complete" ? "Present" : "Review"}</span></div>)}</div><div><div className="rounded-2xl border border-[#2aa89a]/15 bg-[#2aa89a]/[0.04] p-4"><div className="text-[10px] text-[#7bcec4]">Record completeness</div><div className="mt-2 text-[33px] font-semibold tracking-[-0.04em]">{selected.completeness}%</div><div className="mt-3 h-2 rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-[#2aa89a]" style={{ width: `${selected.completeness}%` }}/></div><p className="mt-3 text-[10px] leading-5 text-white/38">Detected issue: {selected.missing.join(", ")}.</p></div><button className="mt-3 w-full rounded-xl bg-[#2aa89a] py-2.5 text-[10px] font-semibold text-[#04110f]">Assign review</button><button className="mt-2 w-full rounded-xl border border-white/[0.08] py-2.5 text-[10px] text-white/45">Mark reviewed</button></div></div>
      </Panel>
    </div>
  </div>;
}

export function ActionCentreView() {
  return <div>
    <PageIntro eyebrow="Action centre" title="Turn intelligence into accountable work." copy="Every useful insight should end in an owner, a due date and a resolution state. This is what moves Sitora beyond business intelligence into an operating layer." right={<button className="rounded-xl bg-[#2aa89a] px-4 py-2.5 text-[11px] font-semibold text-[#04110f]">Create action</button>} />
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Open actions" value="31" sub="Across all modules" tone="warn"/><Stat label="Due today" value="19" sub="12 high priority" tone="warn"/><Stat label="Resolved this week" value="47" sub="+18% vs prior week" tone="good"/><Stat label="Value under action" value="SAR 343k" sub="Revenue + claims workflows"/></div>
    <div className="mt-5 grid gap-5 2xl:grid-cols-[1.35fr_0.65fr]">
      <Panel title="Executive action queue" subtitle="One queue across revenue, claims, operations and governance"><div className="space-y-2.5">{actions.map((action) => <div key={action.id} className="rounded-2xl border border-white/[0.055] bg-white/[0.025] p-4"><div className="flex flex-wrap items-center gap-3"><span className={`rounded-full border px-2 py-1 text-[9px] ${action.priority === "Critical" ? "border-rose-400/20 bg-rose-400/[0.06] text-rose-200" : action.priority === "High" ? "border-amber-400/20 bg-amber-400/[0.06] text-amber-200" : "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-200"}`}>{action.priority}</span><span className="text-[9px] text-white/25">{action.type}</span><span className="text-[9px] text-white/20">{action.id}</span></div><div className="mt-3 flex flex-wrap items-end justify-between gap-3"><div><div className="text-[12px] font-medium text-white/80">{action.title}</div><div className="mt-1 text-[9px] text-white/28">{action.branch} · Owner: {action.owner} · Due {action.due}</div></div><div className="flex items-center gap-4"><div className="text-right"><div className="text-[11px] font-semibold text-white/75">{action.value}</div><div className="text-[8px] text-white/20">{action.count} item{action.count === 1 ? "" : "s"}</div></div><span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[9px] text-white/44">{action.status}</span><ChevronRight size={14} className="text-white/25"/></div></div></div>)}</div></Panel>
      <Panel title="Operating loop" subtitle="How Sitora closes the gap between insight and action"><div className="space-y-3">{[
        [Target, "Detect", "Find material changes, risks and opportunities."],
        [Sparkles, "Explain", "Show the evidence and likely drivers."],
        [UserRoundCheck, "Assign", "Send the action to the right accountable owner."],
        [CheckCircle2, "Resolve", "Track outcome and feed the result back into intelligence."],
      ].map(([Icon, title, copy], index) => { const I = Icon as typeof Target; return <div key={title as string} className="flex gap-3 rounded-2xl border border-white/[0.055] bg-white/[0.02] p-3.5"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#2aa89a]/10 text-[#72cbbf]"><I size={15}/></div><div><div className="text-[11px] font-medium text-white/72">{index + 1}. {title as string}</div><div className="mt-1 text-[9px] leading-4 text-white/30">{copy as string}</div></div></div> })}</div></Panel>
    </div>
    <div className="mt-5"><Panel title="Prototype integration layer" subtitle="These connectors are simulated now; the architecture is designed so production connectors can replace them later"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">{integrations.map((integration) => <div key={integration.name} className="rounded-2xl border border-white/[0.055] bg-white/[0.02] p-4"><div className="flex items-center gap-2 text-[10px] font-medium text-white/70"><span className="h-2 w-2 rounded-full bg-emerald-300"/>{integration.name}</div><div className="mt-2 text-[9px] text-white/27">{integration.category}</div><div className="mt-4 text-[10px] text-[#77cabf]">{integration.state}</div><div className="mt-1 text-[9px] text-white/24">{integration.records}</div></div>)}</div></Panel></div>
  </div>;
}
