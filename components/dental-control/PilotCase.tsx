"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ClipboardList, Flag, Sparkles, Timer, Users } from "lucide-react";
import { pilotProposal } from "@/lib/dental-control/commercial-data";

export function PilotCase() {
  const [selectedBranches, setSelectedBranches] = useState<string[]>(pilotProposal.branches);
  const [selectedModules, setSelectedModules] = useState<string[]>(pilotProposal.modules);
  const [duration, setDuration] = useState(pilotProposal.durationWeeks);
  const scopeScore = useMemo(() => Math.round((selectedBranches.length * selectedModules.length * duration) / 4), [selectedBranches, selectedModules, duration]);

  function toggle(list: string[], value: string, setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter(item => item !== value) : [...list, value]);
  }

  return <div className="min-h-screen bg-[#071310] text-white">
    <header className="border-b border-white/[0.06] bg-[#081713]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 md:px-7"><div className="flex items-center gap-3"><Link href="/tools/dental-control/commercial" className="rounded-xl border border-white/[0.08] p-2.5 text-white/50"><ArrowLeft size={17}/></Link><div><div className="text-[10px] uppercase tracking-[0.17em] text-[#73cabf]">Design-partner proposal</div><div className="mt-1 text-[17px] font-semibold">Saudi Dental Pilot Builder</div></div></div><span className="rounded-full border border-[#c49a53]/20 bg-[#c49a53]/8 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#e3c183]">Synthetic prototype</span></div></header>

    <main className="mx-auto max-w-[1320px] px-4 py-8 md:px-7 md:py-10">
      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div><div className="inline-flex items-center gap-2 rounded-full border border-[#2aa89a]/18 bg-[#2aa89a]/[0.05] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#78cfc4]"><Sparkles size={12}/> From demo to design partnership</div><h1 className="mt-4 text-[34px] font-semibold tracking-[-0.045em] md:text-[46px]">Make the first pilot small enough to move fast, but strong enough to prove value.</h1><p className="mt-4 max-w-3xl text-[12px] leading-6 text-white/40">The goal is not to deploy every feature. The goal is to prove data reconciliation, executive usefulness and measurable operating improvement across a controlled set of branches.</p></div>
        <div className="rounded-3xl border border-[#2aa89a]/18 bg-gradient-to-br from-[#0d2822] to-[#0a1a16] p-5"><div className="text-[10px] uppercase tracking-[0.13em] text-[#7bcfc5]">Configured pilot</div><div className="mt-3 grid grid-cols-3 gap-3"><div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 text-center"><Users size={14} className="mx-auto text-[#73cabf]"/><div className="mt-2 text-[19px] font-semibold">{selectedBranches.length}</div><div className="mt-1 text-[8px] text-white/25">branches</div></div><div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 text-center"><ClipboardList size={14} className="mx-auto text-[#73cabf]"/><div className="mt-2 text-[19px] font-semibold">{selectedModules.length}</div><div className="mt-1 text-[8px] text-white/25">modules</div></div><div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 text-center"><Timer size={14} className="mx-auto text-[#73cabf]"/><div className="mt-2 text-[19px] font-semibold">{duration}</div><div className="mt-1 text-[8px] text-white/25">weeks</div></div></div><div className="mt-4 rounded-2xl border border-[#c49a53]/14 bg-[#c49a53]/[0.035] p-3 text-[9px] leading-5 text-white/38">Scope index: <span className="font-semibold text-[#e3c183]">{scopeScore}</span>. Lower is easier to launch; higher gives broader proof but creates more integration and change-management load.</div></div>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-3">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="text-[11px] font-semibold">1. Select branches</div><div className="mt-4 space-y-2">{["Riyadh North","Jeddah Tahlia","Olaya","Khobar"].map(branch=><button key={branch} onClick={()=>toggle(selectedBranches,branch,setSelectedBranches)} className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-[10px] ${selectedBranches.includes(branch)?"border-[#2aa89a]/24 bg-[#2aa89a]/[0.05] text-white/70":"border-white/[0.055] bg-white/[0.02] text-white/40"}`}><span>{branch}</span>{selectedBranches.includes(branch)?<CheckCircle2 size={13} className="text-[#73cabf]"/>:null}</button>)}</div></div>
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="text-[11px] font-semibold">2. Select modules</div><div className="mt-4 space-y-2">{pilotProposal.modules.map(module=><button key={module} onClick={()=>toggle(selectedModules,module,setSelectedModules)} className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-[10px] ${selectedModules.includes(module)?"border-[#2aa89a]/24 bg-[#2aa89a]/[0.05] text-white/70":"border-white/[0.055] bg-white/[0.02] text-white/40"}`}><span>{module}</span>{selectedModules.includes(module)?<CheckCircle2 size={13} className="text-[#73cabf]"/>:null}</button>)}</div></div>
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="text-[11px] font-semibold">3. Set duration</div><div className="mt-5 text-[26px] font-semibold">{duration} weeks</div><input type="range" min="6" max="20" step="2" value={duration} onChange={e=>setDuration(Number(e.target.value))} className="mt-4 w-full"/><div className="mt-5 rounded-2xl border border-white/[0.055] bg-white/[0.02] p-3"><div className="text-[9px] text-white/24">Recommended</div><div className="mt-1 text-[11px] text-white/65">10–12 weeks</div><div className="mt-2 text-[9px] leading-4 text-white/30">Enough time to baseline, operate and compare outcomes without turning the pilot into a full rollout.</div></div></div>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[12px] font-semibold"><Flag size={14} className="text-[#73cabf]"/> Success measures</div><div className="mt-4 space-y-2.5">{pilotProposal.successMeasures.map(item=><div key={item} className="flex gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-[10px] leading-5 text-white/42"><CheckCircle2 size={13} className="mt-1 shrink-0 text-[#73cabf]"/>{item}</div>)}</div></div>
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="text-[12px] font-semibold">Pilot operating plan</div><div className="mt-5 grid gap-3 sm:grid-cols-2">{pilotProposal.stages.map(stage=><div key={stage.week} className="rounded-2xl border border-white/[0.055] bg-white/[0.02] p-4"><div className="text-[9px] uppercase tracking-[0.12em] text-[#73cabf]">Weeks {stage.week}</div><div className="mt-2 text-[12px] font-semibold text-white/75">{stage.title}</div><div className="mt-2 text-[10px] leading-5 text-white/34">{stage.detail}</div></div>)}</div></div>
      </section>

      <section className="mt-6 rounded-3xl border border-[#2aa89a]/16 bg-gradient-to-r from-[#0b201b] to-[#0a1815] p-5 md:p-6"><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7bcfc5]">Pilot proposition</div><div className="mt-3 max-w-5xl text-[17px] font-medium leading-7 text-white/76">“Keep your current dental systems. Give Sitora a controlled feed from {selectedBranches.length || 0} branches. For {duration} weeks we will prove whether one intelligence layer can reduce revenue leakage, surface governance issues earlier and give leadership a reliable daily operating view.”</div></section>
    </main>
  </div>;
}
