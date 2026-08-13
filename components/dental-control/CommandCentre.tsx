"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Activity, AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Clock3, Gauge, LineChart, ShieldAlert, Sparkles, Target, TrendingDown, TrendingUp, Users } from "lucide-react";

const branches = [
  { name: "Riyadh North", target: 980000, forecast: 1012000, pace: 103, utilisation: 87, risk: "Low" },
  { name: "Olaya", target: 860000, forecast: 842000, pace: 98, utilisation: 81, risk: "Low" },
  { name: "Riyadh East", target: 760000, forecast: 731000, pace: 96, utilisation: 79, risk: "Medium" },
  { name: "Jeddah Tahlia", target: 810000, forecast: 742000, pace: 92, utilisation: 69, risk: "High" },
  { name: "Jeddah Corniche", target: 650000, forecast: 628000, pace: 97, utilisation: 74, risk: "Medium" },
  { name: "Khobar", target: 610000, forecast: 594000, pace: 97, utilisation: 76, risk: "Medium" },
  { name: "Dammam", target: 510000, forecast: 499000, pace: 98, utilisation: 73, risk: "Low" },
  { name: "Madinah", target: 400000, forecast: 386000, pace: 97, utilisation: 70, risk: "Medium" },
];

const interventions = [
  { title: "Jeddah accepted-treatment recovery", owner: "Branch Manager", status: "In progress", impact: 81000, confidence: 76 },
  { title: "Jeddah claims pattern remediation", owner: "Insurance Team", status: "Assigned", impact: 41600, confidence: 84 },
  { title: "Chair 3 capacity refill", owner: "Operations", status: "In progress", impact: 34000, confidence: 71 },
  { title: "17 overdue record completions", owner: "Clinical Director", status: "Assigned", impact: 0, confidence: 93 },
];

export function CommandCentre() {
  const [scenario, setScenario] = useState<"base" | "intervene" | "do-nothing">("base");
  const totals = useMemo(() => branches.reduce((acc, b) => ({ target: acc.target + b.target, forecast: acc.forecast + b.forecast }), { target: 0, forecast: 0 }), []);
  const interventionImpact = interventions.reduce((sum, item) => sum + item.impact, 0);
  const scenarioForecast = scenario === "intervene" ? totals.forecast + interventionImpact : scenario === "do-nothing" ? totals.forecast - 96000 : totals.forecast;
  const gap = scenarioForecast - totals.target;

  return <div className="min-h-screen bg-[#071310] text-white">
    <header className="border-b border-white/[0.06] bg-[#081713]/90"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 md:px-7"><div className="flex items-center gap-3"><Link href="/tools/dental-control/index" className="rounded-xl border border-white/[0.08] p-2.5 text-white/45"><ArrowLeft size={17}/></Link><div><div className="text-[9px] uppercase tracking-[0.16em] text-[#73cabf]">Operating system</div><div className="mt-1 text-[17px] font-semibold">Executive Command Centre</div></div></div><div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1.5 text-[9px] text-emerald-200 sm:flex"><Activity size={11}/> Morning huddle · 10:43</div></div></header>

    <main className="mx-auto max-w-[1440px] px-4 py-7 md:px-7">
      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div><div className="inline-flex items-center gap-2 rounded-full border border-[#2aa89a]/18 bg-[#2aa89a]/[0.05] px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-[#78cfc4]"><Gauge size={12}/> Today’s operating position</div><h1 className="mt-4 text-[32px] font-semibold tracking-[-0.04em] md:text-[44px]">Run the group from one place.</h1><p className="mt-3 max-w-3xl text-[12px] leading-6 text-white/40">Targets, end-of-month forecast, interventions already underway and the consequence of doing nothing are brought into one operating view.</p></div>
        <div className="rounded-3xl border border-[#2aa89a]/16 bg-gradient-to-br from-[#0d2822] to-[#0a1a16] p-5"><div className="flex items-center gap-2 text-[10px] text-[#78cfc4]"><Sparkles size={13}/> Sitora morning brief</div><div className="mt-3 text-[16px] font-medium leading-6">The group is close to target, but Jeddah Tahlia is the main source of downside risk.</div><p className="mt-2 text-[11px] leading-5 text-white/38">Current interventions can close most of the forecast gap if executed this week. Without intervention, unused capacity and treatment leakage are likely to widen the shortfall.</p></div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Monthly target" value={`SAR ${(totals.target/1_000_000).toFixed(2)}m`} sub="Group plan" icon={Target}/>
        <Metric label="Current forecast" value={`SAR ${(scenarioForecast/1_000_000).toFixed(2)}m`} sub={gap >= 0 ? `SAR ${Math.round(gap/1000)}k above target` : `SAR ${Math.abs(Math.round(gap/1000))}k below target`} icon={LineChart} tone={gap >= 0 ? "good" : "warn"}/>
        <Metric label="Interventions underway" value={`${interventions.length}`} sub={`SAR ${Math.round(interventionImpact/1000)}k modeled upside`} icon={CheckCircle2} tone="good"/>
        <Metric label="Branches at risk" value="3" sub="1 high · 2 medium" icon={ShieldAlert} tone="warn"/>
      </section>

      <section className="mt-5 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><div className="text-[13px] font-semibold">Forecast scenario</div><div className="mt-1 text-[10px] text-white/28">Switch between operating assumptions</div></div><div className="flex gap-2">{(["base","intervene","do-nothing"] as const).map(value=><button key={value} onClick={()=>setScenario(value)} className={`rounded-full border px-3 py-1.5 text-[9px] capitalize ${scenario===value?"border-[#2aa89a]/30 bg-[#2aa89a]/10 text-[#85d6cc]":"border-white/[0.07] text-white/35"}`}>{value.replace("-"," ")}</button>)}</div></div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]"><div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"><div className="flex h-40 items-end gap-2">{[66,71,69,73,75,78,80,82,84,86,89,92].map((v,i)=><div key={i} className="flex-1 rounded-t-md bg-[#2aa89a]/55" style={{height:`${v}%`}}/>)}</div><div className="mt-3 flex justify-between text-[9px] text-white/22"><span>Month start</span><span>Today</span><span>Month end</span></div></div><div className="rounded-2xl border border-[#c49a53]/14 bg-[#c49a53]/[0.03] p-4"><div className="text-[10px] uppercase tracking-[0.13em] text-[#e1bf80]">Scenario interpretation</div><div className="mt-3 text-[14px] font-medium">{scenario === "intervene" ? "Executing current interventions puts the group approximately on plan." : scenario === "do-nothing" ? "Doing nothing materially increases the projected shortfall." : "Base forecast remains slightly below target."}</div><p className="mt-2 text-[10px] leading-5 text-white/36">Modeled forecasts are decision-support estimates, not guarantees. Assumptions remain visible to the operator.</p></div></div>
      </section>

      <section className="mt-5 grid gap-5 2xl:grid-cols-[1.25fr_0.75fr]">
        <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025]"><div className="border-b border-white/[0.06] px-5 py-4"><div className="text-[13px] font-semibold">Branch target board</div><div className="mt-1 text-[10px] text-white/28">Forecast pace and intervention priority</div></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="text-[9px] uppercase tracking-[0.13em] text-white/23"><tr><th className="px-5 py-3">Branch</th><th className="px-4 py-3">Target</th><th className="px-4 py-3">Forecast</th><th className="px-4 py-3">Pace</th><th className="px-4 py-3">Utilisation</th><th className="px-4 py-3">Risk</th></tr></thead><tbody>{branches.map(b=><tr key={b.name} className="border-t border-white/[0.04] text-[10px]"><td className="px-5 py-3.5 font-medium text-white/76">{b.name}</td><td className="px-4 py-3.5 text-white/44">SAR {Math.round(b.target/1000)}k</td><td className="px-4 py-3.5 text-white/65">SAR {Math.round(b.forecast/1000)}k</td><td className={`px-4 py-3.5 ${b.pace<95?"text-amber-200":"text-white/55"}`}>{b.pace}%</td><td className="px-4 py-3.5 text-white/55">{b.utilisation}%</td><td className="px-4 py-3.5"><span className={`rounded-full border px-2 py-1 text-[8px] ${b.risk==="High"?"border-rose-400/20 bg-rose-400/[0.05] text-rose-200":b.risk==="Medium"?"border-amber-400/20 bg-amber-400/[0.05] text-amber-200":"border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-200"}`}>{b.risk}</span></td></tr>)}</tbody></table></div></div>
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[13px] font-semibold"><Clock3 size={14} className="text-[#73cabf]"/> Interventions underway</div><div className="mt-4 space-y-3">{interventions.map(item=><div key={item.title} className="rounded-2xl border border-white/[0.055] bg-white/[0.02] p-3.5"><div className="flex items-start justify-between gap-3"><div><div className="text-[10px] font-medium text-white/72">{item.title}</div><div className="mt-1 text-[9px] text-white/25">{item.owner} · {item.status}</div></div><div className="text-right"><div className="text-[10px] font-semibold text-[#78cfc4]">{item.impact ? `SAR ${Math.round(item.impact/1000)}k` : "Governance"}</div><div className="mt-1 text-[8px] text-white/22">{item.confidence}% confidence</div></div></div></div>)}</div><Link href="/tools/dental-control/actions-live" className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium text-[#78cfc4]">Open Action Centre <ArrowRight size={11}/></Link></div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-3"><Insight icon={TrendingDown} title="If we do nothing" copy="Jeddah’s under-utilisation, unbooked accepted treatment and claim exceptions compound into an estimated additional SAR 96k downside by month end."/><Insight icon={Users} title="Morning huddle" copy="Branch managers can see exactly which interventions are owned, which are unassigned and where expected impact is concentrated."/><Insight icon={TrendingUp} title="Operating loop" copy="Measure → forecast → intervene → assign → track → reforecast. This is the layer that turns Sitora from analytics into an operating system."/></section>
    </main>
  </div>;
}

function Metric({label,value,sub,icon:Icon,tone="default"}:{label:string;value:string;sub:string;icon:any;tone?:"default"|"good"|"warn"}) { return <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"><div className="flex items-center justify-between"><div className="text-[9px] uppercase tracking-[0.12em] text-white/27">{label}</div><Icon size={14} className={tone==="good"?"text-emerald-300":tone==="warn"?"text-amber-200":"text-[#73cabf]"}/></div><div className="mt-3 text-[22px] font-semibold">{value}</div><div className="mt-1 text-[9px] text-white/28">{sub}</div></div> }
function Insight({icon:Icon,title,copy}:{icon:any;title:string;copy:string}) { return <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="flex items-center gap-2 text-[11px] font-semibold text-white/78"><Icon size={14} className="text-[#73cabf]"/>{title}</div><p className="mt-2 text-[10px] leading-5 text-white/34">{copy}</p></div> }
