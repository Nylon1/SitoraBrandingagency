"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import { patientStory } from "@/lib/dental-control/deep-data";
import { sar } from "@/lib/dental-control/demo-data";

export function PatientOpportunityStory() {
  const patient = patientStory;
  return <div className="min-h-screen bg-[#071310] text-white">
    <header className="border-b border-white/[0.06] bg-[#081713]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-7"><div className="flex items-center gap-3"><Link href="/tools/dental-control/branch/jeddah-tahlia" className="rounded-xl border border-white/[0.08] p-2.5 text-white/50"><ArrowLeft size={17}/></Link><div><div className="text-[10px] uppercase tracking-[0.17em] text-[#73cabf]">Opportunity story</div><div className="mt-1 text-[17px] font-semibold">{patient.displayName}</div></div></div><span className="rounded-full border border-amber-400/15 bg-amber-400/[0.05] px-3 py-1.5 text-[9px] uppercase tracking-[0.13em] text-amber-200">Synthetic patient</span></div></header>
    <main className="mx-auto max-w-[1280px] px-4 py-6 md:px-7 md:py-8">
      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 md:p-6">
          <div className="flex items-start justify-between gap-4"><div><div className="text-[10px] uppercase tracking-[0.14em] text-white/25">Accepted treatment</div><h1 className="mt-2 text-[28px] font-semibold tracking-[-0.035em]">{patient.treatment}</h1><div className="mt-2 text-[11px] text-white/34">{patient.branch} · {patient.clinician}</div></div><div className="text-right"><div className="text-[9px] uppercase tracking-[0.13em] text-white/24">Plan value</div><div className="mt-1 text-[24px] font-semibold text-[#79cfc5]">{sar(patient.planValue)}</div></div></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-4"><Mini label="Status" value={patient.status}/><Mini label="Accepted" value={patient.acceptedOn}/><Mini label="Waiting" value={`${patient.daysWaiting} days`}/><Mini label="Insurer" value={patient.insurer}/></div>
          <div className="mt-6 rounded-2xl border border-[#2aa89a]/15 bg-[#2aa89a]/[0.04] p-4"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#7acfc4]"><Sparkles size={13}/> Sitora recommendation</div><p className="mt-3 text-[12px] leading-6 text-white/50">{patient.recommendation}</p></div>
        </div>
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[12px] font-semibold"><Clock3 size={15} className="text-[#73cabf]"/> Event timeline</div><div className="mt-5 space-y-0">{patient.events.map((event,index)=><div key={event.time} className="relative flex gap-4 pb-5"><div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#2aa89a]/25 bg-[#0b201b] text-[#72c9be]">{index===patient.events.length-1?<CheckCircle2 size={12}/>:<div className="h-1.5 w-1.5 rounded-full bg-[#72c9be]"/>}</div>{index<patient.events.length-1?<div className="absolute left-[11px] top-6 h-[calc(100%-8px)] w-px bg-white/[0.08]"/>:null}<div><div className="text-[9px] text-white/25">{event.time}</div><div className="mt-1 text-[11px] font-medium text-white/76">{event.event}</div><div className="mt-1 text-[10px] leading-5 text-white/35">{event.detail}</div></div></div>)}</div></div>
      </section>
      <section className="mt-5 grid gap-3 md:grid-cols-3"><Action title="Patient coordination" owner="Treatment coordinator" status="Open" detail="Offer one of two open treatment slots this week."/><Action title="Insurance readiness" owner="Insurance team" status="Ready" detail="Prepare approval workflow in parallel if required."/><Action title="Executive visibility" owner="Branch manager" status="Escalated" detail="Case is now included in the branch recovery queue."/></section>
    </main>
  </div>;
}

function Mini({label,value}:{label:string;value:string}){return <div className="rounded-xl border border-white/[0.055] bg-white/[0.025] p-3"><div className="text-[8px] uppercase tracking-[0.12em] text-white/22">{label}</div><div className="mt-1 text-[10px] font-medium text-white/65">{value}</div></div>}
function Action({title,owner,status,detail}:{title:string;owner:string;status:string;detail:string}){return <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"><div className="flex items-start justify-between gap-3"><div className="text-[11px] font-medium text-white/78">{title}</div><span className="rounded-full border border-[#2aa89a]/15 bg-[#2aa89a]/[0.04] px-2 py-1 text-[8px] text-[#77cbbf]">{status}</span></div><div className="mt-2 text-[9px] text-white/25">Owner: {owner}</div><p className="mt-3 text-[10px] leading-5 text-white/38">{detail}</p></div>}
