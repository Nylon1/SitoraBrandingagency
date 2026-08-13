"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, CircleAlert, Clock3, Goal, ListChecks, Sparkles, UsersRound } from "lucide-react";

const managers = [
  { branch: "Riyadh North", manager: "Maha Al-Qahtani", target: 980000, forecast: 968000, utilisation: 87, claims: 12400, actions: 2, status: "On track" },
  { branch: "Olaya", manager: "Khalid Al-Mutairi", target: 850000, forecast: 834000, utilisation: 81, claims: 18100, actions: 3, status: "Watch" },
  { branch: "Riyadh East", manager: "Noor Al-Hassan", target: 750000, forecast: 728000, utilisation: 79, claims: 15900, actions: 2, status: "Watch" },
  { branch: "Jeddah Tahlia", manager: "Rania Al-Salem", target: 840000, forecast: 742000, utilisation: 69, claims: 46200, actions: 5, status: "Intervention" },
  { branch: "Jeddah Corniche", manager: "Ahmed Al-Zahrani", target: 650000, forecast: 628000, utilisation: 74, claims: 20700, actions: 2, status: "Watch" },
  { branch: "Khobar", manager: "Sara Al-Dossary", target: 610000, forecast: 596000, utilisation: 76, claims: 21400, actions: 2, status: "Watch" },
  { branch: "Dammam", manager: "Yousef Al-Shammari", target: 510000, forecast: 502000, utilisation: 73, claims: 5300, actions: 1, status: "On track" },
  { branch: "Madinah", manager: "Lama Al-Harbi", target: 400000, forecast: 391000, utilisation: 70, claims: 3000, actions: 1, status: "On track" },
];

const initialHuddle = [
  { id: "h1", item: "Review Jeddah Tahlia utilisation gap and today’s open-chair recovery plan", owner: "COO + Jeddah Manager", due: "09:15", done: false },
  { id: "h2", item: "Confirm grouped workflow for 11 repeated claim-support exceptions", owner: "Insurance Lead", due: "10:00", done: false },
  { id: "h3", item: "Check yesterday’s accepted-but-unbooked recovery conversions", owner: "Commercial Lead", due: "10:15", done: true },
  { id: "h4", item: "Close clinical records older than 48 hours or escalate blockers", owner: "Clinical Director", due: "11:00", done: false },
];

const weeklyReview = [
  { label: "Revenue vs target", current: "96.1%", trend: "+1.7 pts", note: "Recovery interventions improving run-rate" },
  { label: "Chair utilisation", current: "78.4%", trend: "+2.6 pts", note: "Jeddah remains the material gap" },
  { label: "Claims exposure", current: "SAR 143k", trend: "-SAR 18k", note: "Grouped exception handling reducing backlog" },
  { label: "Accepted treatment recovery", current: "SAR 61k", trend: "+SAR 22k", note: "Recovered into future appointments this week" },
  { label: "Record completion", current: "92.7%", trend: "+1.9 pts", note: "17 records remain >48h" },
];

export function ManagementOperatingReview() {
  const [huddle, setHuddle] = useState(initialHuddle);
  const completed = huddle.filter((item) => item.done).length;
  const groupTarget = useMemo(() => managers.reduce((sum, row) => sum + row.target, 0), []);
  const groupForecast = useMemo(() => managers.reduce((sum, row) => sum + row.forecast, 0), []);
  const attainment = ((groupForecast / groupTarget) * 100).toFixed(1);

  function toggleHuddle(id: string) {
    setHuddle((items) => items.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  }

  return <div className="min-h-screen bg-[#071310] text-white">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(42,168,154,0.11),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(196,154,83,0.07),transparent_24%)]" />
    <header className="relative border-b border-white/[0.06] bg-[#081713]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-[1480px] items-center justify-between px-4 py-4 md:px-7"><div className="flex items-center gap-3"><Link href="/tools/dental-control/index" className="rounded-xl border border-white/[0.08] p-2.5 text-white/45"><ArrowLeft size={17}/></Link><div><div className="text-[9px] uppercase tracking-[0.17em] text-[#76cabf]">Management operating system</div><div className="mt-1 text-[17px] font-semibold">Daily Huddle & Weekly Operating Review</div></div></div><Link href="/tools/dental-control/command" className="hidden items-center gap-2 rounded-xl border border-[#2aa89a]/20 bg-[#2aa89a]/8 px-3.5 py-2.5 text-[10px] font-medium text-[#7ed1c6] sm:flex">Command Centre <ArrowRight size={12}/></Link></div></header>

    <main className="relative mx-auto max-w-[1480px] px-4 py-7 md:px-7 md:py-9">
      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div><div className="inline-flex items-center gap-2 rounded-full border border-[#2aa89a]/18 bg-[#2aa89a]/[0.05] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#77cbbf]"><Sparkles size={11}/> Today’s management rhythm</div><h1 className="mt-4 text-[31px] font-semibold tracking-[-0.04em] md:text-[43px]">Turn executive insight into management accountability.</h1><p className="mt-3 max-w-3xl text-[12px] leading-6 text-white/40">Sitora gives every operating review the same source of truth: branch target, forecast, intervention, owner, deadline and outcome. The prototype keeps the workflow human-led while making drift visible early.</p></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
          {[["Group forecast", `SAR ${(groupForecast/1000000).toFixed(2)}m`, `${attainment}% of target`],["Huddle completion", `${completed}/${huddle.length}`, "Today’s priorities"],["Branches on track", "3 / 8", "3 watch · 1 intervention"],["Open interventions", "18", "Across branch teams"]].map(([a,b,c])=><div key={a} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"><div className="text-[9px] uppercase tracking-[0.12em] text-white/27">{a}</div><div className="mt-2 text-[22px] font-semibold">{b}</div><div className="mt-1 text-[9px] text-white/28">{c}</div></div>)}
        </div>
      </section>

      <section className="mt-6 grid gap-5 2xl:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><div><div className="flex items-center gap-2 text-[13px] font-semibold"><ListChecks size={15} className="text-[#74c9be]"/> Morning huddle</div><div className="mt-1 text-[10px] text-white/29">Tap each item as the leadership team closes it.</div></div><span className="text-[10px] text-white/35">{completed}/{huddle.length} complete</span></div><div className="mt-4 space-y-2.5">{huddle.map((item)=><button key={item.id} onClick={()=>toggleHuddle(item.id)} className={`w-full rounded-2xl border p-4 text-left transition ${item.done ? "border-emerald-400/15 bg-emerald-400/[0.04]" : "border-white/[0.055] bg-white/[0.02] hover:bg-white/[0.035]"}`}><div className="flex items-start gap-3">{item.done?<CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-300"/>:<CircleAlert size={16} className="mt-0.5 shrink-0 text-amber-200"/>}<div className="min-w-0 flex-1"><div className={`text-[11px] font-medium ${item.done?"text-white/45 line-through":"text-white/78"}`}>{item.item}</div><div className="mt-2 flex flex-wrap gap-3 text-[9px] text-white/27"><span className="flex items-center gap-1"><UsersRound size={10}/>{item.owner}</span><span className="flex items-center gap-1"><Clock3 size={10}/>{item.due}</span></div></div></div></button>)}</div></div>

        <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025]"><div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4"><div><div className="flex items-center gap-2 text-[13px] font-semibold"><Goal size={15} className="text-[#74c9be]"/> Branch manager scorecards</div><div className="mt-1 text-[10px] text-white/28">Forecast accountability by branch</div></div><span className="text-[9px] uppercase tracking-[0.12em] text-white/24">August 2026</span></div><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left"><thead className="border-b border-white/[0.05] text-[9px] uppercase tracking-[0.12em] text-white/24"><tr><th className="px-5 py-3 font-medium">Branch / manager</th><th className="px-4 py-3 font-medium">Target</th><th className="px-4 py-3 font-medium">Forecast</th><th className="px-4 py-3 font-medium">Attainment</th><th className="px-4 py-3 font-medium">Utilisation</th><th className="px-4 py-3 font-medium">Claims risk</th><th className="px-4 py-3 font-medium">Actions</th><th className="px-4 py-3 font-medium">Status</th></tr></thead><tbody>{managers.map((row)=>{const pct=((row.forecast/row.target)*100).toFixed(1);return <tr key={row.branch} className="border-b border-white/[0.04] text-[10px]"><td className="px-5 py-3.5"><div className="font-medium text-white/78">{row.branch}</div><div className="mt-0.5 text-[9px] text-white/25">{row.manager}</div></td><td className="px-4 py-3.5 text-white/45">SAR {(row.target/1000).toFixed(0)}k</td><td className="px-4 py-3.5 text-white/66">SAR {(row.forecast/1000).toFixed(0)}k</td><td className={`px-4 py-3.5 font-medium ${Number(pct)<90?"text-amber-200":Number(pct)>=98?"text-emerald-200":"text-white/62"}`}>{pct}%</td><td className="px-4 py-3.5 text-white/52">{row.utilisation}%</td><td className="px-4 py-3.5 text-white/52">SAR {(row.claims/1000).toFixed(1)}k</td><td className="px-4 py-3.5 text-white/52">{row.actions}</td><td className="px-4 py-3.5"><span className={`rounded-full border px-2 py-1 text-[9px] ${row.status==="On track"?"border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-200":row.status==="Intervention"?"border-amber-400/20 bg-amber-400/[0.06] text-amber-100":"border-white/[0.08] bg-white/[0.03] text-white/45"}`}>{row.status}</span></td></tr>})}</tbody></table></div></div>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[13px] font-semibold"><CalendarDays size={15} className="text-[#74c9be]"/> Weekly operating review</div><div className="mt-4 grid gap-3 md:grid-cols-5">{weeklyReview.map((item)=><div key={item.label} className="rounded-2xl border border-white/[0.055] bg-white/[0.02] p-4"><div className="text-[9px] uppercase tracking-[0.1em] text-white/25">{item.label}</div><div className="mt-2 text-[18px] font-semibold text-white/82">{item.current}</div><div className="mt-1 text-[9px] text-[#7acdc2]">{item.trend}</div><p className="mt-3 text-[9px] leading-4 text-white/28">{item.note}</p></div>)}</div></div>
        <div className="rounded-3xl border border-[#c49a53]/15 bg-[#c49a53]/[0.035] p-5"><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e4c384]">Management rule</div><div className="mt-3 text-[17px] font-medium leading-7">No branch leaves the review with an unexplained variance.</div><p className="mt-3 text-[11px] leading-5 text-white/40">Every gap must have either a known driver, an owner and intervention, or a clearly documented data-quality issue. Sitora then carries that accountability into the next huddle automatically.</p><Link href="/tools/dental-control/actions-live" className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium text-[#e5c58a]">Open intervention accountability <ArrowRight size={11}/></Link></div>
      </section>
    </main>
  </div>;
}
