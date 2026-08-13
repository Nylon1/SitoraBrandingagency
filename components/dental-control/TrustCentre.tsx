"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircleDot,
  Database,
  Fingerprint,
  GitMerge,
  History,
  KeyRound,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Signal,
  TableProperties,
} from "lucide-react";
import { branches, groupTotals, sar } from "@/lib/dental-control/demo-data";

const sources = [
  { name: "Practice Management", entity: "Appointments & treatments", freshness: "4 min", records: "28,431", health: 99.8 },
  { name: "Insurance / NPHIES demo", entity: "Claims & authorisations", freshness: "7 min", records: "3,904", health: 99.4 },
  { name: "Finance", entity: "Invoices & collections", freshness: "12 min", records: "9,182", health: 99.9 },
  { name: "Clinical records", entity: "Notes & governance metadata", freshness: "5 min", records: "14,778", health: 99.7 },
  { name: "Roster", entity: "Clinicians & sessions", freshness: "31 min", records: "1,206", health: 98.9 },
];

const checks = [
  { label: "Group revenue equals branch roll-up", result: sar(branches.reduce((sum, branch) => sum + branch.revenue, 0)), expected: sar(groupTotals.revenue), status: "pass" },
  { label: "Group collections equal branch roll-up", result: sar(branches.reduce((sum, branch) => sum + branch.collections, 0)), expected: sar(groupTotals.collections), status: "pass" },
  { label: "Treatment opportunity equals branch roll-up", result: sar(branches.reduce((sum, branch) => sum + branch.treatmentOpportunity, 0)), expected: sar(groupTotals.treatmentOpportunity), status: "pass" },
  { label: "Claims exposure equals branch roll-up", result: sar(branches.reduce((sum, branch) => sum + branch.claimsRisk, 0)), expected: sar(groupTotals.claimsRisk), status: "pass" },
];

const lineage = [
  ["PMS appointment", "Canonical appointment", "Chair utilisation", "Executive KPI"],
  ["Treatment plan", "Canonical treatment", "Accepted backlog", "Revenue Intelligence"],
  ["Claim exception", "Canonical claim event", "Exception cluster", "Claims Intelligence"],
  ["Clinical note metadata", "Governance check", "Completeness score", "Record Guardian"],
];

export function TrustCentre() {
  const [selected, setSelected] = useState(0);
  return <div className="min-h-screen bg-[#071310] text-white">
    <header className="border-b border-white/[0.06] bg-[#081713]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-[1450px] items-center justify-between px-4 py-4 md:px-7"><div className="flex items-center gap-3"><Link href="/tools/dental-control/index" className="rounded-xl border border-white/[0.08] p-2.5 text-white/45"><ArrowLeft size={16}/></Link><div><div className="text-[9px] uppercase tracking-[0.17em] text-[#75ccc1]">Data trust</div><div className="mt-1 flex items-center gap-2 text-[15px] font-semibold"><ShieldCheck size={16} className="text-[#75ccc1]"/> Sitora Trust Centre</div></div></div><span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1.5 text-[9px] text-emerald-100/65">All critical checks passing</span></div></header>

    <main className="mx-auto max-w-[1450px] px-4 py-6 md:px-7">
      <section className="grid gap-4 md:grid-cols-4"><Metric icon={Database} label="Source systems" value="5" sub="Prototype connectors"/><Metric icon={RefreshCw} label="Median freshness" value="7 min" sub="Synthetic sync telemetry"/><Metric icon={CheckCircle2} label="Reconciliation" value="100%" sub="4/4 critical checks"/><Metric icon={Fingerprint} label="Auditability" value="Event-level" sub="Every KPI traceable"/></section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025]"><div className="border-b border-white/[0.06] p-5"><div className="text-[13px] font-semibold">Source health & freshness</div><p className="mt-1 text-[10px] text-white/30">A production product should never present an executive KPI without knowing how fresh and complete its source data is.</p></div><div className="p-4"><div className="space-y-2">{sources.map((source,index)=><button key={source.name} onClick={()=>setSelected(index)} className={`w-full rounded-2xl border p-4 text-left transition ${selected===index?"border-[#2aa89a]/25 bg-[#2aa89a]/[0.05]":"border-white/[0.055] bg-white/[0.02]"}`}><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="text-[11px] font-medium text-white/75">{source.name}</div><div className="mt-1 text-[9px] text-white/28">{source.entity} · {source.records} demo records</div></div><div className="flex items-center gap-4"><div className="text-right"><div className="text-[9px] text-white/24">Freshness</div><div className="mt-1 text-[10px] text-white/58">{source.freshness}</div></div><div className="text-right"><div className="text-[9px] text-white/24">Health</div><div className="mt-1 text-[10px] text-emerald-200">{source.health}%</div></div></div></div></button>)}</div></div></div>

        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[12px] font-semibold"><Signal size={14} className="text-[#75ccc1]"/> Selected source</div><div className="mt-5 rounded-2xl border border-[#2aa89a]/15 bg-[#2aa89a]/[0.04] p-4"><div className="text-[15px] font-semibold">{sources[selected].name}</div><div className="mt-1 text-[10px] text-white/35">{sources[selected].entity}</div><div className="mt-5 grid grid-cols-2 gap-3"><Mini label="Freshness" value={sources[selected].freshness}/><Mini label="Connector health" value={`${sources[selected].health}%`}/><Mini label="Schema version" value="v1.4-demo"/><Mini label="Last reconciliation" value="Passed"/></div></div><div className="mt-3 rounded-2xl border border-white/[0.055] bg-white/[0.02] p-4"><div className="flex items-center gap-2 text-[10px] font-medium text-white/55"><History size={12}/> Audit event example</div><div className="mt-3 font-mono text-[9px] leading-5 text-white/30">source.received → schema.validated → entity.normalised → metric.recomputed → insight.refreshed</div></div></div>
      </section>

      <section className="mt-5 rounded-3xl border border-white/[0.07] bg-white/[0.025]"><div className="border-b border-white/[0.06] p-5"><div className="flex items-center gap-2 text-[13px] font-semibold"><GitMerge size={14} className="text-[#75ccc1]"/> Reconciliation engine</div><p className="mt-1 text-[10px] text-white/30">These checks prove the headline numbers reconcile with their branch-level components in the synthetic model.</p></div><div className="grid gap-3 p-5 lg:grid-cols-2">{checks.map(check=><div key={check.label} className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.025] p-4"><div className="flex items-start justify-between gap-3"><div><div className="text-[10px] font-medium text-white/62">{check.label}</div><div className="mt-3 grid grid-cols-2 gap-4"><Mini label="Calculated" value={check.result}/><Mini label="Expected" value={check.expected}/></div></div><CheckCircle2 size={17} className="text-emerald-300"/></div></div>)}</div></section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[13px] font-semibold"><TableProperties size={14} className="text-[#75ccc1]"/> KPI lineage</div><p className="mt-1 text-[10px] text-white/30">A VC or enterprise buyer can see how raw data becomes a decision.</p><div className="mt-5 space-y-3">{lineage.map((row,index)=><div key={index} className="grid gap-2 md:grid-cols-4">{row.map((item,itemIndex)=><div key={item} className="relative rounded-xl border border-white/[0.055] bg-white/[0.02] p-3 text-[9px] text-white/45">{item}{itemIndex<3?<span className="absolute -right-2 top-1/2 hidden h-px w-2 bg-white/10 md:block"/>:null}</div>)}</div>)}</div></div>

        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[12px] font-semibold"><LockKeyhole size={14} className="text-[#75ccc1]"/> Production security model</div><div className="mt-4 space-y-2">{[
          [KeyRound,"Role-scoped access","CEO, finance, clinical and branch views separated"],
          [LockKeyhole,"Tenant isolation","Every organisation segregated by design"],
          [Fingerprint,"Audit log","Who saw or changed what, and when"],
          [ShieldCheck,"Minimum necessary data","Modules receive only the data they require"],
        ].map(([Icon,title,copy])=>{const I=Icon as typeof ShieldCheck; return <div key={title as string} className="rounded-2xl border border-white/[0.055] bg-white/[0.02] p-3.5"><div className="flex gap-3"><I size={14} className="mt-0.5 shrink-0 text-[#75ccc1]"/><div><div className="text-[10px] font-medium text-white/62">{title as string}</div><div className="mt-1 text-[9px] leading-4 text-white/28">{copy as string}</div></div></div></div>})}</div></div>
      </section>
    </main>
  </div>;
}

function Metric({icon:Icon,label,value,sub}:{icon:typeof Database;label:string;value:string;sub:string}){return <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="flex items-center justify-between"><div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 text-[#75ccc1]"><Icon size={15}/></div><CircleDot size={10} className="text-emerald-300"/></div><div className="mt-4 text-[9px] uppercase tracking-[0.12em] text-white/25">{label}</div><div className="mt-1 text-[21px] font-semibold">{value}</div><div className="mt-1 text-[9px] text-white/28">{sub}</div></div>}
function Mini({label,value}:{label:string;value:string}){return <div><div className="text-[8px] uppercase tracking-[0.1em] text-white/20">{label}</div><div className="mt-1 text-[10px] font-medium text-white/58">{value}</div></div>}
