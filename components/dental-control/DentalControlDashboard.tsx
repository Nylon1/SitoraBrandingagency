"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Command,
  FileWarning,
  LayoutDashboard,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";
import {
  ActionCentreView,
  ClaimsView,
  RecordGuardianView,
  RevenueIntelligenceView,
} from "@/components/dental-control/ModuleViews";
import {
  alerts,
  askSitoraPrompts,
  branches,
  chairPerformance,
  dailyBrief,
  getSitoraAnswer,
  group,
  groupTotals,
  opportunityPipeline,
  sar,
} from "@/lib/dental-control/demo-data";

type ViewName = "Control Tower" | "Revenue Intelligence" | "Claims" | "Record Guardian" | "Action Centre";

const nav: { label: ViewName; icon: typeof LayoutDashboard }[] = [
  { label: "Control Tower", icon: LayoutDashboard },
  { label: "Revenue Intelligence", icon: TrendingUp },
  { label: "Claims", icon: WalletCards },
  { label: "Record Guardian", icon: ShieldCheck },
  { label: "Action Centre", icon: ClipboardCheck },
];

const metricCards = [
  { label: "Revenue this month", value: sar(groupTotals.revenue), sub: `+${groupTotals.revenueChange}% vs last month`, icon: CircleDollarSign, tone: "positive" },
  { label: "Collections", value: sar(groupTotals.collections), sub: "88.1% collection rate", icon: WalletCards, tone: "neutral" },
  { label: "Chair utilisation", value: `${groupTotals.chairUtilisation}%`, sub: "+2.6 pts vs 4-week avg", icon: Activity, tone: "positive" },
  { label: "Treatment opportunity", value: sar(groupTotals.treatmentOpportunity), sub: "Recoverable pipeline", icon: TrendingUp, tone: "attention" },
  { label: "Claims at risk", value: sar(groupTotals.claimsRisk), sub: "39 claims need review", icon: FileWarning, tone: "attention" },
  { label: "Records to review", value: `${groupTotals.recordsToReview}`, sub: "17 older than 48h", icon: ShieldCheck, tone: "attention" },
];

const statusStyle = {
  excellent: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  good: "bg-cyan-500/10 text-cyan-200 border-cyan-400/20",
  attention: "bg-amber-500/10 text-amber-200 border-amber-400/20",
};

const severityStyle = {
  critical: "bg-rose-500/10 text-rose-200 border-rose-400/20",
  high: "bg-amber-500/10 text-amber-200 border-amber-400/20",
  opportunity: "bg-cyan-500/10 text-cyan-200 border-cyan-400/20",
  governance: "bg-violet-500/10 text-violet-200 border-violet-400/20",
  positive: "bg-emerald-500/10 text-emerald-200 border-emerald-400/20",
};

function MiniBars() {
  const points = [48, 55, 51, 62, 66, 70, 64, 77, 74, 82, 86, 92];
  return <div className="flex h-10 items-end gap-1" aria-label="Revenue trend rising">{points.map((height, index) => <div key={`${height}-${index}`} className="w-1.5 rounded-full bg-[#2aa89a]/70" style={{ height: `${height}%` }} />)}</div>;
}

function KpiCard({ item }: { item: (typeof metricCards)[number] }) {
  const Icon = item.icon;
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm transition hover:border-[#2aa89a]/30 hover:bg-white/[0.05]">
    <div className="mb-5 flex items-start justify-between gap-3"><div className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-2.5 text-[#78cfc4]"><Icon size={17} strokeWidth={1.7} /></div>{item.label === "Revenue this month" ? <MiniBars /> : null}</div>
    <div className="text-[12px] font-medium tracking-wide text-white/45">{item.label}</div><div className="mt-1.5 text-[23px] font-semibold tracking-[-0.03em] text-white">{item.value}</div><div className={`mt-1.5 text-[11px] ${item.tone === "positive" ? "text-emerald-300/80" : item.tone === "attention" ? "text-amber-200/70" : "text-white/35"}`}>{item.sub}</div>
  </motion.div>;
}

function Brand() {
  return <div className="flex items-center gap-3 px-2"><div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#2aa89a]/25 bg-[#2aa89a]/10 shadow-[inset_0_0_24px_rgba(42,168,154,0.05)]"><div className="h-3.5 w-3.5 rotate-45 rounded-[3px] border-2 border-[#6cc8bd]"/><div className="absolute h-1.5 w-1.5 rounded-full bg-[#c49a53]"/></div><div><div className="text-[14px] font-semibold tracking-[0.01em]">Sitora Dental Control</div><div className="mt-0.5 text-[9px] uppercase tracking-[0.19em] text-white/28">Saudi intelligence layer</div></div></div>;
}

function ControlTower({ openAsk, navigate }: { openAsk: () => void; navigate: (view: ViewName) => void }) {
  return <>
    <section className="grid gap-5 xl:grid-cols-[1.55fr_0.85fr]">
      <div><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#2aa89a]/20 bg-[#2aa89a]/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#79cfc5]"><Command size={11}/> Executive command view</div><h1 className="text-[28px] font-semibold tracking-[-0.035em] text-white md:text-[34px]">Good morning, Noura Group.</h1><p className="mt-1.5 max-w-2xl text-[13px] leading-6 text-white/42">One view across {group.branches} branches, {group.chairs} chairs and {group.clinicians} clinicians. Sitora has prioritised what needs executive attention today.</p><div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{metricCards.map((item) => <KpiCard key={item.label} item={item}/>)}</div></div>
      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl border border-[#2aa89a]/18 bg-gradient-to-br from-[#0d2822] to-[#0a1a16] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)]"><div className="flex items-center justify-between"><div className="flex items-center gap-2.5"><div className="rounded-xl bg-[#2aa89a]/14 p-2 text-[#68c7bc]"><Sparkles size={16}/></div><div><div className="text-[13px] font-semibold">Sitora Daily Brief</div><div className="text-[10px] text-white/30">Generated from group data</div></div></div><span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-white/35">Live demo</span></div><div className="mt-5 space-y-3">{dailyBrief.map((item, index) => <div key={item.title} className="rounded-2xl border border-white/[0.065] bg-white/[0.035] p-4"><div className="flex gap-3"><div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c49a53]/12 text-[10px] font-semibold text-[#e3c182]">{index+1}</div><div><div className="text-[12px] font-medium text-white/88">{item.title}</div><p className="mt-1.5 text-[11px] leading-5 text-white/42">{item.detail}</p><button onClick={() => index === 0 ? navigate("Revenue Intelligence") : index === 1 ? navigate("Claims") : navigate("Revenue Intelligence")} className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-medium text-[#73cabf]">{item.action}<ArrowRight size={11}/></button></div></div></div>)}</div><button onClick={openAsk} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#2aa89a]/20 bg-[#2aa89a]/8 py-2.5 text-[11px] font-medium text-[#82d2c8]"><Bot size={14}/> Ask Sitora what changed</button></motion.div>
    </section>

    <section className="mt-5 grid gap-5 2xl:grid-cols-[1.45fr_0.8fr]">
      <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025]"><div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4"><div><div className="flex items-center gap-2 text-[13px] font-semibold"><Building2 size={15} className="text-[#64c4b8]"/> Branch intelligence</div><div className="mt-1 text-[10px] text-white/30">Performance, risk and recoverable opportunity by location</div></div><button onClick={() => navigate("Revenue Intelligence")} className="rounded-lg border border-white/[0.07] px-3 py-1.5 text-[10px] text-white/45">Open revenue view</button></div><div className="overflow-x-auto"><table className="w-full min-w-[860px] text-left"><thead className="border-b border-white/[0.05] text-[9px] uppercase tracking-[0.14em] text-white/25"><tr><th className="px-5 py-3 font-medium">Branch</th><th className="px-4 py-3 font-medium">Revenue</th><th className="px-4 py-3 font-medium">Utilisation</th><th className="px-4 py-3 font-medium">Claims risk</th><th className="px-4 py-3 font-medium">Governance</th><th className="px-4 py-3 font-medium">Opportunity</th><th className="px-4 py-3 font-medium">Status</th></tr></thead><tbody>{branches.map((branch) => <tr key={branch.id} className="border-b border-white/[0.035] text-[11px] transition hover:bg-white/[0.025]"><td className="px-5 py-3.5"><div className="font-medium text-white/85">{branch.name}</div><div className="mt-0.5 text-[9px] text-white/28">{branch.clinicians} clinicians · {branch.chairs} chairs</div></td><td className="px-4 py-3.5 text-white/62">{sar(branch.revenue)}</td><td className="px-4 py-3.5"><div className="flex items-center gap-2"><span className={branch.utilisation < 72 ? "text-amber-200" : "text-white/62"}>{branch.utilisation}%</span><div className="h-1.5 w-14 overflow-hidden rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${branch.utilisation < 72 ? "bg-amber-300/70" : "bg-[#2aa89a]/75"}`} style={{ width: `${branch.utilisation}%` }}/></div></div></td><td className={`px-4 py-3.5 ${branch.claimsRisk > 30000 ? "text-amber-200" : "text-white/55"}`}>{sar(branch.claimsRisk)}</td><td className="px-4 py-3.5 text-white/62">{branch.governance}%</td><td className="px-4 py-3.5 text-[#7acdc3]">{sar(branch.treatmentOpportunity)}</td><td className="px-4 py-3.5"><span className={`inline-flex rounded-full border px-2 py-1 text-[9px] capitalize ${statusStyle[branch.status]}`}>{branch.status}</span></td></tr>)}</tbody></table></div></div>
      <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><div><div className="flex items-center gap-2 text-[13px] font-semibold"><AlertTriangle size={15} className="text-amber-200"/> Priority signals</div><div className="mt-1 text-[10px] text-white/30">Ranked by urgency and business impact</div></div><button onClick={() => navigate("Action Centre")} className="text-[10px] text-[#78cfc4]">Open actions</button></div><div className="mt-4 space-y-2.5">{alerts.map((alert) => <div key={alert.id} className="rounded-2xl border border-white/[0.055] bg-white/[0.025] p-3.5"><div className="flex items-start justify-between gap-3"><div><div className="flex items-center gap-2"><span className={`rounded-full border px-1.5 py-0.5 text-[8px] uppercase tracking-[0.1em] ${severityStyle[alert.severity]}`}>{alert.severity}</span>{alert.branch ? <span className="text-[9px] text-white/25">{alert.branch}</span> : null}</div><div className="mt-2 text-[11px] font-medium text-white/80">{alert.title}</div><div className="mt-1 text-[10px] leading-4 text-white/34">{alert.detail}</div></div><div className="shrink-0 text-[11px] font-semibold text-white/68">{alert.value}</div></div></div>)}</div></div>
    </section>

    <section className="mt-5 grid gap-5 xl:grid-cols-2">
      <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><div><div className="flex items-center gap-2 text-[13px] font-semibold"><BarChart3 size={15} className="text-[#64c4b8]"/> Revenue opportunity</div><div className="mt-1 text-[10px] text-white/30">Where recoverable value is currently sitting</div></div><button onClick={() => navigate("Revenue Intelligence")} className="text-[10px] text-[#79cfc5]">Explore</button></div><div className="mt-5 space-y-4">{opportunityPipeline.map((item) => { const max = Math.max(...opportunityPipeline.map((row) => row.value)); return <div key={item.label}><div className="mb-1.5 flex items-center justify-between text-[10px]"><span className="text-white/52">{item.label} <span className="text-white/22">· {item.count}</span></span><span className="font-medium text-white/72">{sar(item.value)}</span></div><div className="h-2 overflow-hidden rounded-full bg-white/[0.05]"><div className="h-full rounded-full bg-gradient-to-r from-[#2aa89a] to-[#72cfc3]" style={{ width: `${(item.value/max)*100}%` }}/></div></div>; })}</div></div>
      <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><div><div className="flex items-center gap-2 text-[13px] font-semibold"><Stethoscope size={15} className="text-[#64c4b8]"/> Chair intelligence</div><div className="mt-1 text-[10px] text-white/30">Riyadh North · contribution by clinical capacity</div></div><span className="rounded-full border border-white/[0.07] px-2 py-1 text-[9px] text-white/35">This month</span></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{chairPerformance.map((chair) => <div key={chair.chair} className={`rounded-2xl border p-3.5 ${chair.utilisation < 70 ? "border-amber-400/20 bg-amber-500/[0.045]" : "border-white/[0.055] bg-white/[0.025]"}`}><div className="flex items-center justify-between"><div className="text-[11px] font-medium text-white/75">{chair.chair}</div><div className={`text-[10px] ${chair.utilisation < 70 ? "text-amber-200" : "text-[#7dcec4]"}`}>{chair.utilisation}% utilised</div></div><div className="mt-1 text-[9px] text-white/24">{chair.clinician}</div><div className="mt-3 grid grid-cols-2 gap-3"><div><div className="text-[9px] text-white/25">Revenue / hr</div><div className="mt-1 text-[12px] font-semibold text-white/70">SAR {chair.revenueHour}</div></div><div><div className="text-[9px] text-white/25">Contribution / hr</div><div className="mt-1 text-[12px] font-semibold text-white/70">SAR {chair.contributionHour}</div></div></div></div>)}</div><div className="mt-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.035] p-3 text-[10px] leading-5 text-white/42"><span className="font-medium text-amber-200">Sitora insight:</span> Chair 3 has 29 unused clinical hours this month. Estimated recoverable monthly capacity: <span className="font-medium text-white/75">SAR 34,000</span>.</div></div>
    </section>
  </>;
}

export function DentalControlDashboard() {
  const [mobileNav, setMobileNav] = useState(false);
  const [activeNav, setActiveNav] = useState<ViewName>("Control Tower");
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState(askSitoraPrompts[0]);
  const [submittedQuestion, setSubmittedQuestion] = useState(askSitoraPrompts[0]);
  const [demoMode, setDemoMode] = useState(true);
  const answer = useMemo(() => getSitoraAnswer(submittedQuestion), [submittedQuestion]);

  function submitQuestion(nextQuestion?: string) { const q = nextQuestion ?? question; if (!q.trim()) return; setQuestion(q); setSubmittedQuestion(q); }
  function navigate(view: ViewName) { setActiveNav(view); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return <div className="min-h-screen bg-[#071310] text-white"><div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(42,168,154,0.12),transparent_32%),radial-gradient(circle_at_20%_100%,rgba(194,151,79,0.08),transparent_28%)]"/>
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-white/[0.06] bg-[#081713]/95 px-4 py-5 backdrop-blur-xl lg:block"><Brand/><div className="mt-8 px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">Intelligence</div><nav className="mt-3 space-y-1">{nav.map(({label,icon:Icon}) => { const active=activeNav===label; return <button key={label} onClick={() => navigate(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition ${active ? "bg-[#2aa89a]/12 text-white ring-1 ring-[#2aa89a]/20" : "text-white/48 hover:bg-white/[0.035] hover:text-white/75"}`}><Icon size={16} strokeWidth={1.7} className={active ? "text-[#64c4b8]" : "text-white/35"}/><span>{label}</span></button>})}</nav><div className="absolute inset-x-4 bottom-5 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3.5"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2aa89a] to-[#176359] text-[12px] font-bold">ND</div><div className="min-w-0 flex-1"><div className="truncate text-[12px] font-medium">Noura Dental Group</div><div className="mt-0.5 text-[10px] text-white/35">Executive workspace</div></div><ChevronDown size={14} className="text-white/30"/></div></div></aside>

    <AnimatePresence>{mobileNav ? <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-[#06100e]/95 p-5 backdrop-blur-xl lg:hidden"><div className="flex items-center justify-between"><Brand/><button onClick={() => setMobileNav(false)} className="rounded-xl border border-white/10 p-2 text-white/60"><X size={18}/></button></div><nav className="mt-10 space-y-2">{nav.map(({label,icon:Icon}) => <button key={label} onClick={() => { navigate(label); setMobileNav(false); }} className="flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3.5 text-sm text-white/70"><Icon size={18} className="text-[#64c4b8]"/>{label}</button>)}</nav></motion.div> : null}</AnimatePresence>

    <main className="relative lg:ml-[248px]"><header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-white/[0.06] bg-[#071310]/85 px-4 backdrop-blur-xl md:px-7"><div className="flex items-center gap-3"><button onClick={() => setMobileNav(true)} className="rounded-xl border border-white/[0.08] p-2 text-white/60 lg:hidden"><Menu size={18}/></button><div><div className="text-[11px] text-white/35">{group.month}</div><div className="text-[14px] font-medium tracking-tight text-white/90">{activeNav}</div></div></div><div className="flex items-center gap-2"><button onClick={() => setDemoMode((value)=>!value)} className={`hidden items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] sm:flex ${demoMode ? "border-[#c49a53]/30 bg-[#c49a53]/10 text-[#e7c98f]" : "border-white/10 bg-white/[0.03] text-white/40"}`}><Sparkles size={12}/> Demo {demoMode ? "On" : "Off"}</button><button className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5 text-white/45"><Search size={16}/></button><button className="relative rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5 text-white/45"><Bell size={16}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-300"/></button><button onClick={() => setAskOpen(true)} className="ml-1 flex items-center gap-2 rounded-xl bg-[#2aa89a] px-3.5 py-2.5 text-[12px] font-semibold text-[#04110f] shadow-[0_8px_24px_rgba(42,168,154,0.2)]"><Bot size={15}/><span className="hidden sm:inline">Ask Sitora</span></button></div></header>

    <div className="mx-auto max-w-[1540px] px-4 py-6 md:px-7 md:py-8"><AnimatePresence mode="wait"><motion.div key={activeNav} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:0.18}}>{activeNav === "Control Tower" ? <ControlTower openAsk={() => setAskOpen(true)} navigate={navigate}/> : activeNav === "Revenue Intelligence" ? <RevenueIntelligenceView/> : activeNav === "Claims" ? <ClaimsView/> : activeNav === "Record Guardian" ? <RecordGuardianView/> : <ActionCentreView/>}</motion.div></AnimatePresence></div></main>

    <AnimatePresence>{askOpen ? <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] flex items-end justify-end bg-black/55 p-3 backdrop-blur-sm md:p-5" onClick={() => setAskOpen(false)}><motion.div initial={{opacity:0,y:20,scale:0.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:0.98}} onClick={(event)=>event.stopPropagation()} className="flex max-h-[88vh] w-full max-w-[620px] flex-col overflow-hidden rounded-3xl border border-[#2aa89a]/20 bg-[#0a1a16] shadow-[0_30px_100px_rgba(0,0,0,0.5)]"><div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4"><div className="flex items-center gap-3"><div className="rounded-xl bg-[#2aa89a]/12 p-2.5 text-[#6fc9be]"><Bot size={18}/></div><div><div className="text-[13px] font-semibold">Ask Sitora</div><div className="text-[10px] text-white/30">Executive intelligence grounded in the demo dataset</div></div></div><button onClick={() => setAskOpen(false)} className="rounded-xl border border-white/[0.07] p-2 text-white/40"><X size={16}/></button></div><div className="overflow-y-auto p-5"><div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">Suggested questions</div><div className="mt-2 flex flex-wrap gap-2">{askSitoraPrompts.map((prompt)=><button key={prompt} onClick={() => submitQuestion(prompt)} className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] text-white/45">{prompt}</button>)}</div><div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="flex items-center gap-2 text-[10px] text-[#78cfc4]"><Sparkles size={12}/> Sitora analysis</div><div className="mt-3 text-[13px] font-medium leading-5 text-white/85">{answer.headline}</div><div className="mt-3 space-y-2">{answer.points.map((point)=><div key={point} className="flex gap-2.5 text-[11px] leading-5 text-white/45"><CheckCircle2 size={13} className="mt-1 shrink-0 text-[#63c1b6]"/>{point}</div>)}</div><div className="mt-4 rounded-xl border border-[#c49a53]/15 bg-[#c49a53]/[0.045] p-3 text-[10px] leading-5 text-white/46"><span className="font-semibold text-[#e4c386]">Recommended next action:</span> {answer.action}</div></div></div><div className="border-t border-white/[0.07] p-4"><form onSubmit={(event)=>{event.preventDefault();submitQuestion();}} className="flex gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2 focus-within:border-[#2aa89a]/35"><input value={question} onChange={(event)=>setQuestion(event.target.value)} className="min-w-0 flex-1 bg-transparent px-2 text-[11px] text-white/75 outline-none placeholder:text-white/20" placeholder="Ask about revenue, claims, governance or branches…"/><button type="submit" className="rounded-xl bg-[#2aa89a] px-3 py-2 text-[10px] font-semibold text-[#04110f]">Analyse</button></form><div className="mt-2 text-center text-[9px] text-white/20">Prototype intelligence · synthetic data · no live clinical or NPHIES connection</div></div></motion.div></motion.div> : null}</AnimatePresence>
  </div>;
}
