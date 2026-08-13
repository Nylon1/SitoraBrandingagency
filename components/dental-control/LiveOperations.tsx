"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, AlertTriangle, ArrowLeft, ArrowRight, BellRing, CheckCircle2, Clock3, FileWarning, Radio, Sparkles } from "lucide-react";

const eventSeed = [
  { id:"evt-01", type:"appointment.cancelled", age:1, branch:"Jeddah Tahlia", title:"Tomorrow 11:30 implant review cancelled", detail:"Patient J-11307 cancelled by SMS. Chair 3 now has a 60-minute gap.", impact:"SAR 2,600 capacity", tone:"warn" as const, action:"Open recovery workflow" },
  { id:"evt-02", type:"claim.requires_action", age:3, branch:"Jeddah Tahlia", title:"Claim CLM-88421 requires supporting information", detail:"Pattern JED-SUP-01 detected. 10 similar claims already grouped.", impact:"SAR 4,800 exposed", tone:"warn" as const, action:"Open claim cluster" },
  { id:"evt-03", type:"treatment.accepted", age:4, branch:"Riyadh North", title:"Implant treatment plan accepted", detail:"Patient R-20417 accepted a SAR 12,400 plan. No follow-up booking exists yet.", impact:"SAR 12,400 opportunity", tone:"good" as const, action:"Create booking action" },
  { id:"evt-04", type:"record.incomplete", age:7, branch:"Jeddah Tahlia", title:"Clinical record incomplete after procedure", detail:"Post-operative instructions are missing from record REC-19311.", impact:"Governance", tone:"info" as const, action:"Assign clinician review" },
  { id:"evt-05", type:"payment.received", age:9, branch:"Olaya", title:"Insurance payment reconciled", detail:"SAR 18,700 payment matched to 6 accepted claims automatically.", impact:"SAR 18,700 collected", tone:"good" as const, action:"View reconciliation" },
];

const simulatedNewEvents = [
  { id:"evt-live-1", type:"appointment.cancelled", branch:"Jeddah Tahlia", title:"Cancellation detected on Chair 5", detail:"Today 15:00 hygiene appointment cancelled. Recall list contains 6 eligible patients.", impact:"45 min recoverable", tone:"warn" as const, action:"Launch fill-gap workflow" },
  { id:"evt-live-2", type:"claim.rejected", branch:"Khobar", title:"Claim rejected by payer", detail:"Crown claim rejected with documentation reason. Sitora matched it to an existing exception rule.", impact:"SAR 3,900 exposed", tone:"warn" as const, action:"Open claim" },
  { id:"evt-live-3", type:"record.completed", branch:"Jeddah Tahlia", title:"Governance task resolved", detail:"Dr Faisal completed the missing consent documentation for REC-19281.", impact:"Risk reduced", tone:"good" as const, action:"View audit trail" },
];

type EventTone = "warn" | "good" | "info";
type LiveEvent = {
  id: string;
  type: string;
  branch: string;
  title: string;
  detail: string;
  impact: string;
  tone: EventTone;
  action: string;
  ageMinutes: number;
};

const toneClass: Record<EventTone,string> = {
  warn:"border-amber-400/20 bg-amber-400/[0.045] text-amber-100",
  good:"border-emerald-400/20 bg-emerald-400/[0.045] text-emerald-100",
  info:"border-violet-400/20 bg-violet-400/[0.045] text-violet-100",
};

export function LiveOperations() {
  const [events,setEvents] = useState<LiveEvent[]>(() => eventSeed.map(({age,...event}) => ({...event,ageMinutes:age})));
  const [running,setRunning] = useState(true);
  const [liveIndex,setLiveIndex] = useState(0);
  const [tasks,setTasks] = useState<string[]>([]);

  useEffect(() => {
    if (!running || liveIndex >= simulatedNewEvents.length) return;
    const timer = window.setTimeout(() => {
      const next = simulatedNewEvents[liveIndex];
      setEvents(current => [{...next,ageMinutes:0},...current]);
      setLiveIndex(value => value+1);
    },7000);
    return () => window.clearTimeout(timer);
  },[running,liveIndex]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setEvents(current => current.map(event => ({ ...event, ageMinutes: event.ageMinutes + 1 })));
    }, 60000);
    return () => window.clearInterval(timer);
  }, [running]);

  const metrics = useMemo(() => ({events:events.length,actionNeeded:events.filter(e=>e.tone==="warn").length,autoMatched:14,tasks:tasks.length+6}),[events,tasks]);
  const createTask = (id:string) => setTasks(current => current.includes(id) ? current : [...current,id]);

  return <div className="min-h-screen bg-[#071310] text-white">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_75%_5%,rgba(42,168,154,0.12),transparent_28%),radial-gradient(circle_at_15%_90%,rgba(196,154,83,0.07),transparent_24%)]"/>
    <header className="relative border-b border-white/[0.06] bg-[#081713]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-[1380px] items-center justify-between px-4 py-4 md:px-7"><div className="flex items-center gap-3"><Link href="/tools/dental-control/index" className="rounded-xl border border-white/[0.08] p-2.5 text-white/50"><ArrowLeft size={17}/></Link><div><div className="text-[10px] uppercase tracking-[0.16em] text-[#73cabf]">Event intelligence</div><div className="mt-1 text-[17px] font-semibold">Live Operations</div></div></div><button onClick={()=>setRunning(v=>!v)} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${running?"border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-200":"border-white/10 bg-white/[0.03] text-white/35"}`}><Radio size={11}/>{running?"Simulation live":"Paused"}</button></div></header>

    <main className="relative mx-auto max-w-[1380px] px-4 py-7 md:px-7 md:py-9">
      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]"><div><div className="inline-flex items-center gap-2 rounded-full border border-[#2aa89a]/18 bg-[#2aa89a]/[0.05] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#78cfc4]"><Activity size={12}/> Event fabric in motion</div><h1 className="mt-4 max-w-4xl text-[34px] font-semibold tracking-[-0.045em] md:text-[48px]">Sitora reacts to the business as events happen.</h1><p className="mt-4 max-w-3xl text-[12px] leading-6 text-white/40">This simulation shows normalized operational events flowing through rules and pattern detection into actions. Production would use connected PMS, insurer, payment and workforce systems.</p></div><div className="rounded-3xl border border-[#2aa89a]/16 bg-gradient-to-br from-[#0d2822] to-[#0a1a16] p-5"><div className="flex items-center gap-2 text-[11px] font-semibold"><Sparkles size={14} className="text-[#73cabf]"/> Sitora pulse</div><div className="mt-4 text-[15px] font-medium leading-6">Jeddah remains the highest-priority operating area in the last 10 minutes.</div><p className="mt-2 text-[10px] leading-5 text-white/38">Capacity, claims and governance events are concentrated there. Suggested response: recover same-day capacity first, then clear the grouped claim pattern.</p><Link href="/tools/dental-control/branch/jeddah-tahlia" className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium text-[#78cfc4]">Open Jeddah command centre <ArrowRight size={11}/></Link></div></section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Events received" value={metrics.events} sub="Since session start" icon={<Radio size={15}/>}/>
        <Metric label="Need action" value={metrics.actionNeeded} sub="Rules or thresholds triggered" icon={<AlertTriangle size={15}/>}/>
        <Metric label="Auto-matched" value={metrics.autoMatched} sub="To known patterns" icon={<CheckCircle2 size={15}/>}/>
        <Metric label="Open tasks" value={metrics.tasks} sub="Across connected workflows" icon={<BellRing size={15}/>}/>
      </section>

      <section className="mt-5 grid gap-5 2xl:grid-cols-[1.35fr_0.65fr]"><div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025]"><div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4"><div><div className="text-[13px] font-semibold">Live event stream</div><div className="mt-1 text-[10px] text-white/28">Newest normalized events appear at the top</div></div><div className="flex items-center gap-2 text-[9px] text-emerald-200"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300"/> ingesting</div></div><div className="p-4 md:p-5"><AnimatePresence initial={false}>{events.map(event=><motion.div key={event.id} initial={{opacity:0,y:-12,scale:.99}} animate={{opacity:1,y:0,scale:1}} className="mb-3 rounded-2xl border border-white/[0.055] bg-white/[0.025] p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full border px-2 py-1 text-[8px] uppercase tracking-[0.11em] ${toneClass[event.tone]}`}>{event.type}</span><span className="text-[9px] text-white/24">{event.branch}</span><span className="inline-flex items-center gap-1 text-[9px] text-white/22"><Clock3 size={10}/>{event.ageMinutes}m ago</span></div><div className="mt-2 text-[12px] font-medium text-white/82">{event.title}</div><p className="mt-1 text-[10px] leading-5 text-white/38">{event.detail}</p></div><div className="text-right"><div className="text-[10px] font-medium text-white/65">{event.impact}</div><button onClick={()=>createTask(event.id)} className={`mt-2 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[9px] ${tasks.includes(event.id)?"border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-200":"border-white/[0.07] text-[#78cfc4]"}`}>{tasks.includes(event.id)?<><CheckCircle2 size={10}/>Task created</>:<>{event.action}<ArrowRight size={10}/></>}</button></div></div></motion.div>)}</AnimatePresence></div></div>

      <div className="space-y-5"><div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="text-[13px] font-semibold">Event → intelligence → action</div><div className="mt-4 space-y-3">{[["1","Source event","appointment.cancelled arrives from PMS"],["2","Normalize","Mapped into Sitora canonical event"],["3","Evaluate","Capacity recovery rule is triggered"],["4","Enrich","Eligible recall patients and chair economics added"],["5","Act","Action created for branch team"]].map(([n,title,copy])=><div key={n} className="flex gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"><div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2aa89a]/12 text-[9px] text-[#79cfc5]">{n}</div><div><div className="text-[10px] font-medium text-white/70">{title}</div><div className="mt-1 text-[9px] leading-4 text-white/28">{copy}</div></div></div>)}</div></div><div className="rounded-3xl border border-amber-400/14 bg-amber-400/[0.035] p-5"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200"><FileWarning size={12}/> Demo boundary</div><p className="mt-3 text-[10px] leading-5 text-white/38">This screen simulates real-time events. No real patient, NPHIES or payer data is connected. Production ingestion would require validated interfaces, security controls and Saudi deployment architecture.</p></div></div></section>
    </main>
  </div>;
}

function Metric({label,value,sub,icon}:{label:string;value:number;sub:string;icon:React.ReactNode}) {
  return <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"><div className="flex items-center justify-between"><div className="text-[10px] uppercase tracking-[0.12em] text-white/28">{label}</div><div className="text-[#73cabf]">{icon}</div></div><div className="mt-2 text-[25px] font-semibold">{value}</div><div className="mt-1 text-[10px] text-white/28">{sub}</div></div>;
}