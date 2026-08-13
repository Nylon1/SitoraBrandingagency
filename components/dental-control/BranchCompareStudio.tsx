"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BarChart3, Sparkles, TrendingUp } from "lucide-react";
import { branches, sar } from "@/lib/dental-control/demo-data";

const metrics = [
  { key: "revenue", label: "Revenue", format: (v: number) => sar(v), higher: true },
  { key: "utilisation", label: "Chair utilisation", format: (v: number) => `${v}%`, higher: true },
  { key: "claimsRisk", label: "Claims exposure", format: (v: number) => sar(v), higher: false },
  { key: "governance", label: "Record completeness", format: (v: number) => `${v}%`, higher: true },
  { key: "treatmentOpportunity", label: "Treatment opportunity", format: (v: number) => sar(v), higher: false },
] as const;

export function BranchCompareStudio() {
  const [leftId, setLeftId] = useState("riyadh-north");
  const [rightId, setRightId] = useState("jeddah-tahlia");
  const left = branches.find((branch) => branch.id === leftId) ?? branches[0];
  const right = branches.find((branch) => branch.id === rightId) ?? branches[3];

  const analysis = useMemo(() => {
    const utilGap = left.utilisation - right.utilisation;
    const revenueGap = left.revenue - right.revenue;
    const claimsGap = right.claimsRisk - left.claimsRisk;
    return {
      headline: utilGap > 5 ? `${left.name} converts available chair capacity more effectively than ${right.name}.` : `${left.name} and ${right.name} are operating with similar utilisation, so the commercial difference sits elsewhere.`,
      points: [
        `${left.name} generates ${sar(Math.abs(revenueGap))} ${revenueGap >= 0 ? "more" : "less"} monthly revenue in this demo dataset.`,
        `Chair utilisation differs by ${Math.abs(utilGap).toFixed(0)} percentage points.`,
        `${right.name} carries ${sar(Math.abs(claimsGap))} ${claimsGap >= 0 ? "more" : "less"} claims exposure than ${left.name}.`,
      ],
    };
  }, [left, right]);

  return <div className="min-h-screen bg-[#071310] text-white">
    <header className="border-b border-white/[0.06] bg-[#081713]/90"><div className="mx-auto flex max-w-[1380px] items-center gap-3 px-4 py-4 md:px-7"><Link href="/tools/dental-control" className="rounded-xl border border-white/[0.08] p-2.5 text-white/50"><ArrowLeft size={17}/></Link><div><div className="text-[10px] uppercase tracking-[0.17em] text-[#73cabf]">Comparison studio</div><div className="mt-1 text-[16px] font-semibold">Branch vs branch intelligence</div></div></div></header>
    <main className="mx-auto max-w-[1380px] px-4 py-7 md:px-7 md:py-9">
      <div className="max-w-3xl"><div className="text-[10px] uppercase tracking-[0.18em] text-[#6cc8bd]">Benchmarking</div><h1 className="mt-2 text-[31px] font-semibold tracking-[-0.04em] md:text-[40px]">Understand why one location outperforms another.</h1><p className="mt-3 text-[12px] leading-6 text-white/40">The comparison layer is designed to surface transferable operating practices, not just rank branches.</p></div>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <Selector label="Compare" value={leftId} onChange={setLeftId}/><div className="hidden pb-3 text-white/20 lg:block"><ArrowRight size={20}/></div><Selector label="Against" value={rightId} onChange={setRightId}/>
      </section>

      <section className="mt-5 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025]">
        <div className="grid grid-cols-[1.15fr_1fr_1fr] border-b border-white/[0.06] px-5 py-4 text-[11px] font-semibold"><div>Metric</div><div>{left.name}</div><div>{right.name}</div></div>
        {metrics.map((metric) => {
          const lv = left[metric.key] as number;
          const rv = right[metric.key] as number;
          const leftWins = metric.higher ? lv > rv : lv < rv;
          const rightWins = metric.higher ? rv > lv : rv < lv;
          return <div key={metric.key} className="grid grid-cols-[1.15fr_1fr_1fr] border-b border-white/[0.045] px-5 py-4 text-[10px]"><div className="text-white/35">{metric.label}</div><MetricValue value={metric.format(lv)} win={leftWins}/><MetricValue value={metric.format(rv)} win={rightWins}/></div>;
        })}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[13px] font-semibold"><BarChart3 size={15} className="text-[#73cabf]"/> Operating gaps</div><div className="mt-5 space-y-4">{metrics.map((metric) => { const lv=left[metric.key] as number; const rv=right[metric.key] as number; const max=Math.max(lv,rv,1); return <div key={metric.key}><div className="mb-2 flex items-center justify-between text-[10px]"><span className="text-white/40">{metric.label}</span><span className="text-white/25">relative scale</span></div><div className="grid gap-2"><Bar label={left.name} width={(lv/max)*100}/><Bar label={right.name} width={(rv/max)*100}/></div></div>; })}</div></div>
        <div className="rounded-3xl border border-[#2aa89a]/16 bg-gradient-to-br from-[#0d2822] to-[#0a1a16] p-5"><div className="flex items-center gap-2 text-[10px] text-[#79cfc5]"><Sparkles size={13}/> Sitora interpretation</div><div className="mt-3 text-[16px] font-medium leading-6">{analysis.headline}</div><div className="mt-4 space-y-3">{analysis.points.map((point)=><div key={point} className="flex gap-2 text-[10px] leading-5 text-white/40"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#73cabf]"/>{point}</div>)}</div><div className="mt-5 rounded-2xl border border-[#c49a53]/15 bg-[#c49a53]/[0.04] p-4 text-[10px] leading-5 text-white/42"><span className="font-semibold text-[#e4c386]">Management question:</span> Which workflows at the stronger branch can be copied without simply adding more staff or chairs?</div></div>
      </section>
    </main>
  </div>;
}

function Selector({ label, value, onChange }: { label: string; value: string; onChange: (value: string)=>void }) {
  return <label className="block"><span className="text-[9px] uppercase tracking-[0.14em] text-white/24">{label}</span><select value={value} onChange={(event)=>onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/[0.08] bg-[#0a1815] px-4 py-3 text-[12px] text-white/70 outline-none">{branches.map((branch)=><option key={branch.id} value={branch.id}>{branch.name}</option>)}</select></label>;
}

function MetricValue({ value, win }: { value: string; win: boolean }) {
  return <div className={`flex items-center gap-2 ${win ? "text-emerald-200" : "text-white/58"}`}>{value}{win ? <TrendingUp size={12}/> : null}</div>;
}

function Bar({ label, width }: { label: string; width: number }) {
  return <div className="grid grid-cols-[110px_1fr] items-center gap-3"><div className="truncate text-[9px] text-white/28">{label}</div><div className="h-2 overflow-hidden rounded-full bg-white/[0.05]"><div className="h-full rounded-full bg-[#2aa89a]" style={{width:`${Math.max(width,4)}%`}}/></div></div>;
}
