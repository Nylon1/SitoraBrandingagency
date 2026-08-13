"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CircleDollarSign,
  Command,
  FileWarning,
  Gauge,
  GitCompareArrows,
  Sparkles,
  Target,
} from "lucide-react";
import { branchComparison, boardroomQuestions, decisionFeed, executiveChanges } from "@/lib/dental-control/deep-intelligence";

function formatValue(value: number, format: string) {
  if (format === "sar") return `SAR ${new Intl.NumberFormat("en-US").format(value)}`;
  if (format === "pct1") return `${value.toFixed(1)}%`;
  return `${value}%`;
}

export function ExecutiveBoardroom() {
  const [question, setQuestion] = useState(boardroomQuestions[0].q);
  const answer = useMemo(() => boardroomQuestions.find((item) => item.q === question) ?? boardroomQuestions[0], [question]);

  return <div className="min-h-screen bg-[#071310] text-white">
    <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_0%,rgba(42,168,154,0.13),transparent_30%),radial-gradient(circle_at_10%_100%,rgba(196,154,83,0.08),transparent_26%)]" />
    <header className="relative z-10 flex items-center justify-between border-b border-white/[0.06] px-5 py-4 md:px-8">
      <div className="flex items-center gap-4">
        <Link href="/tools/dental-control" className="rounded-xl border border-white/[0.08] p-2 text-white/45 transition hover:text-white"><ArrowLeft size={16}/></Link>
        <div><div className="text-[10px] uppercase tracking-[0.18em] text-[#6cc8bd]">Sitora Dental Control</div><div className="mt-1 text-[14px] font-semibold">Executive Boardroom</div></div>
      </div>
      <div className="hidden rounded-full border border-[#c49a53]/25 bg-[#c49a53]/8 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#e3c182] sm:block">VC demo intelligence</div>
    </header>

    <main className="relative z-10 mx-auto max-w-[1500px] px-5 py-7 md:px-8">
      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2aa89a]/20 bg-[#2aa89a]/8 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#79cfc5]"><Command size={11}/> Board-level operating intelligence</div>
          <h1 className="mt-4 max-w-4xl text-[31px] font-semibold tracking-[-0.04em] md:text-[43px]">Know what changed, why it changed, and what to do next.</h1>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-white/42">This is the layer above dashboards. Sitora turns operating signals into decisions, owners and measurable actions across the dental group.</p>
        </div>
        <div className="rounded-3xl border border-[#2aa89a]/18 bg-gradient-to-br from-[#0d2822] to-[#0a1a16] p-5">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#75cbc0]"><Sparkles size={13}/> Executive answer</div>
          <div className="mt-3 text-[15px] font-medium leading-6 text-white/90">{answer.a}</div>
          <div className="mt-4 flex flex-wrap gap-2">{boardroomQuestions.map((item) => <button key={item.q} onClick={() => setQuestion(item.q)} className={`rounded-full border px-3 py-1.5 text-[9px] transition ${question === item.q ? "border-[#2aa89a]/30 bg-[#2aa89a]/10 text-[#8bd8ce]" : "border-white/[0.07] bg-white/[0.025] text-white/40 hover:text-white/65"}`}>{item.q}</button>)}</div>
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {executiveChanges.map((item) => <div key={item.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"><div className="flex items-start justify-between gap-2"><div className="text-[10px] uppercase tracking-[0.12em] text-white/28">{item.label}</div><span className={`rounded-full px-2 py-0.5 text-[9px] ${item.tone === "good" ? "bg-emerald-400/10 text-emerald-200" : "bg-amber-400/10 text-amber-200"}`}>{item.delta}</span></div><div className="mt-3 text-[20px] font-semibold tracking-[-0.03em]">{item.current}</div><div className="mt-1 text-[9px] text-white/24">Yesterday: {item.previous}</div><p className="mt-3 text-[10px] leading-4 text-white/38">{item.reason}</p></div>)}
      </section>

      <section className="mt-6 grid gap-5 2xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4"><div><div className="flex items-center gap-2 text-[13px] font-semibold"><GitCompareArrows size={15} className="text-[#6cc8bd]"/> Riyadh North vs Jeddah Tahlia</div><div className="mt-1 text-[10px] text-white/28">Why the branches perform differently</div></div><Link href="/tools/dental-control/branch/jeddah-tahlia" className="text-[10px] text-[#78cfc4]">Open Jeddah <ArrowRight size={11} className="inline"/></Link></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="text-[9px] uppercase tracking-[0.13em] text-white/22"><tr><th className="px-5 py-3 font-medium">Metric</th><th className="px-4 py-3 font-medium">Riyadh North</th><th className="px-4 py-3 font-medium">Jeddah Tahlia</th><th className="px-4 py-3 font-medium">Sitora interpretation</th></tr></thead><tbody>{branchComparison.map((row) => <tr key={row.metric} className="border-t border-white/[0.05] text-[10px]"><td className="px-5 py-3.5 font-medium text-white/68">{row.metric}</td><td className="px-4 py-3.5 text-emerald-200/80">{formatValue(row.riyadh, row.format)}</td><td className="px-4 py-3.5 text-amber-200/80">{formatValue(row.jeddah, row.format)}</td><td className="px-4 py-3.5 text-white/38">{row.insight}</td></tr>)}</tbody></table></div>
          <div className="m-5 rounded-2xl border border-[#2aa89a]/15 bg-[#2aa89a]/[0.04] p-4"><div className="flex items-center gap-2 text-[10px] font-medium text-[#78cfc4]"><Bot size={13}/> Operating-system insight</div><p className="mt-2 text-[11px] leading-5 text-white/44">Riyadh North is not winning because of one star dentist. It performs better across utilisation, treatment acceptance, claims discipline and record completeness. Sitora can identify which operating behaviours are worth replicating in Jeddah.</p></div>
        </div>

        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025]">
          <div className="border-b border-white/[0.06] px-5 py-4"><div className="flex items-center gap-2 text-[13px] font-semibold"><Target size={15} className="text-[#cfae72]"/> Decision feed</div><div className="mt-1 text-[10px] text-white/28">Signals converted into owned actions</div></div>
          <div className="p-4 space-y-2.5">{decisionFeed.map((item) => <div key={`${item.time}-${item.action}`} className="rounded-2xl border border-white/[0.055] bg-white/[0.02] p-3.5"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><span className={`rounded-md px-1.5 py-0.5 text-[8px] font-semibold ${item.priority === "P1" ? "bg-rose-400/10 text-rose-200" : item.priority === "P2" ? "bg-amber-400/10 text-amber-200" : "bg-cyan-400/10 text-cyan-100"}`}>{item.priority}</span><span className="text-[9px] text-white/24">{item.time}</span></div><span className="text-[9px] text-[#7fcfc5]">{item.state}</span></div><div className="mt-2 text-[11px] font-medium text-white/72">{item.action}</div><div className="mt-1 text-[9px] text-white/30">Owner: {item.owner}</div><div className="mt-2 text-[10px] text-white/48">{item.impact}</div></div>)}</div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { icon: CircleDollarSign, title: "Protect earned revenue", copy: "Resolve claims exposure before submission windows create avoidable leakage." },
          { icon: Gauge, title: "Recover unused capacity", copy: "Convert spare chair hours into booked treatment using demand signals, not blanket targets." },
          { icon: FileWarning, title: "Reduce governance drag", copy: "Close incomplete records while context is still fresh and remediation is easy." },
        ].map(({icon: Icon,title,copy}) => <div key={title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><Icon size={16} className="text-[#6cc8bd]"/><div className="mt-3 text-[12px] font-medium">{title}</div><p className="mt-1 text-[10px] leading-5 text-white/35">{copy}</p></div>)}
      </section>
    </main>
  </div>;
}
