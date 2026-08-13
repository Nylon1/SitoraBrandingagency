"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Database,
  Gauge,
  GitBranch,
  Lightbulb,
  Link2,
  PlayCircle,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  executivePrompts,
  getExecutiveAnswer,
  scenarios,
  type CopilotAnswer,
} from "@/lib/dental-control/executive-ai-data";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  answer?: CopilotAnswer;
};

const typeTone = {
  branch: "border-cyan-400/15 bg-cyan-400/[0.05] text-cyan-100/70",
  claim: "border-amber-400/15 bg-amber-400/[0.05] text-amber-100/70",
  clinician: "border-violet-400/15 bg-violet-400/[0.05] text-violet-100/70",
  patient: "border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-100/70",
  action: "border-rose-400/15 bg-rose-400/[0.05] text-rose-100/70",
  metric: "border-white/[0.08] bg-white/[0.03] text-white/55",
};

function Confidence({ value }: { value: number }) {
  return <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5"><Gauge size={11} className="text-[#75ccc1]"/><span className="text-[9px] text-white/32">Confidence</span><span className="text-[10px] font-semibold text-white/68">{value}%</span></div>;
}

function AnswerCard({ answer, onFollowUp }: { answer: CopilotAnswer; onFollowUp: (q: string) => void }) {
  return <div className="mt-3 rounded-3xl border border-[#2aa89a]/16 bg-gradient-to-br from-[#0d2822] to-[#0a1916] p-4 md:p-5">
    <div className="flex flex-wrap items-start justify-between gap-3"><div className="max-w-3xl"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#79cfc5]"><Sparkles size={12}/> Executive analysis</div><h3 className="mt-2 text-[16px] font-semibold leading-6 text-white/88">{answer.title}</h3></div><Confidence value={answer.confidence}/></div>
    <p className="mt-3 text-[11px] leading-6 text-white/45">{answer.summary}</p>
    <div className="mt-4 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-[10px] font-semibold text-white/60"><Link2 size={12} className="text-[#76cbbf]"/> Evidence trail</div><span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-2 py-1 text-[8px] uppercase tracking-[0.1em] text-emerald-100/55">source visible</span></div><div className="mt-3 space-y-2">{answer.evidence.map((item) => {
        const inner = <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 transition hover:bg-white/[0.035]"><div className="flex items-start justify-between gap-3"><div><div className="text-[10px] font-medium text-white/68">{item.label}</div><div className="mt-1"><span className={`rounded-full border px-2 py-0.5 text-[8px] uppercase tracking-[0.1em] ${typeTone[item.type]}`}>{item.type}</span></div></div><div className="flex items-center gap-2 text-[10px] text-white/45">{item.value}{item.href ? <ChevronRight size={11}/> : null}</div></div><div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.045] pt-2 text-[8px] text-white/24"><span className="inline-flex items-center gap-1"><Database size={9}/>{item.source}</span><span>{item.freshness}</span></div></div>;
        return item.href ? <Link key={item.label} href={item.href}>{inner}</Link> : <div key={item.label}>{inner}</div>;
      })}</div></div>
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"><div className="flex items-center gap-2 text-[10px] font-semibold text-white/60"><GitBranch size={12} className="text-[#76cbbf]"/> Drivers</div><div className="mt-3 space-y-2">{answer.drivers.map((driver) => <div key={driver.label} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"><div className="flex items-center gap-2"><CircleDot size={10} className={driver.direction === "positive" ? "text-emerald-300" : driver.direction === "negative" ? "text-amber-300" : "text-white/30"}/><span className="text-[9px] text-white/48">{driver.label}</span></div><span className="text-[9px] font-medium text-white/65">{driver.impact}</span></div>)}</div></div>
    </div>
    <div className="mt-3 grid gap-3 lg:grid-cols-2"><div className="rounded-2xl border border-[#c49a53]/15 bg-[#c49a53]/[0.04] p-4"><div className="flex items-center gap-2 text-[10px] font-semibold text-[#e4c286]"><Target size={12}/> Recommended action</div><p className="mt-2 text-[10px] leading-5 text-white/48">{answer.recommendation}</p></div>{answer.expectedImpact ? <div className="rounded-2xl border border-[#2aa89a]/15 bg-[#2aa89a]/[0.04] p-4"><div className="flex items-center gap-2 text-[10px] font-semibold text-[#78cfc4]"><TrendingUp size={12}/> Modeled impact</div><p className="mt-2 text-[10px] leading-5 text-white/48">{answer.expectedImpact}</p></div> : null}</div>
    <div className="mt-4"><div className="text-[9px] uppercase tracking-[0.14em] text-white/22">Continue the analysis</div><div className="mt-2 flex flex-wrap gap-2">{answer.followUps.map((q) => <button key={q} type="button" onClick={() => onFollowUp(q)} className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] text-white/43 transition hover:border-[#2aa89a]/25 hover:text-white/70">{q}</button>)}</div></div>
  </div>;
}

export function ExecutiveCopilot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", text: "I can interrogate the synthetic operating model, explain what changed, run executive what-if scenarios and take you directly to the evidence behind each answer." },
  ]);
  const nextMessageId = useRef(2);
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const selectedScenario = useMemo(() => scenarios.find((scenario) => scenario.id === scenarioId) ?? scenarios[0], [scenarioId]);

  function ask(question: string) {
    const q = question.trim();
    if (!q) return;
    const userId = nextMessageId.current;
    const assistantId = userId + 1;
    nextMessageId.current += 2;
    setMessages((current) => [...current, { id: userId, role: "user", text: q }, { id: assistantId, role: "assistant", text: "", answer: getExecutiveAnswer(q) }]);
    setInput("");
  }

  function reset() {
    nextMessageId.current = 2;
    setMessages([{ id: 1, role: "assistant", text: "I can interrogate the synthetic operating model, explain what changed, run executive what-if scenarios and take you directly to the evidence behind each answer." }]);
  }

  return <div className="min-h-screen bg-[#071310] text-white">
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#081713]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 md:px-7"><div className="flex items-center gap-3"><Link href="/tools/dental-control/index" className="rounded-xl border border-white/[0.08] p-2.5 text-white/45"><ArrowLeft size={16}/></Link><div><div className="text-[9px] uppercase tracking-[0.17em] text-[#75ccc1]">Executive intelligence</div><div className="mt-1 flex items-center gap-2 text-[15px] font-semibold"><BrainCircuit size={16} className="text-[#75ccc1]"/> Ask Sitora · Copilot</div></div></div><div className="flex items-center gap-2"><span className="hidden rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1.5 text-[9px] text-emerald-100/60 sm:inline-flex"><ShieldCheck size={11} className="mr-1.5"/> Synthetic data only</span><button onClick={reset} className="rounded-xl border border-white/[0.07] p-2.5 text-white/40"><RotateCcw size={15}/></button></div></div></header>
    <main className="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 md:px-7 lg:grid-cols-[1fr_340px]">
      <section className="min-w-0 rounded-3xl border border-white/[0.07] bg-white/[0.02]">
        <div className="border-b border-white/[0.06] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="flex items-center gap-2 text-[12px] font-semibold"><Bot size={15} className="text-[#75ccc1]"/> Evidence-grounded executive conversation</div><p className="mt-2 max-w-3xl text-[10px] leading-5 text-white/30">Every material answer exposes its evidence trail, source system, freshness, confidence, assumptions and recommended next action.</p></div><Link href="/tools/dental-control/trust" className="inline-flex items-center gap-2 rounded-xl border border-[#2aa89a]/15 bg-[#2aa89a]/[0.04] px-3 py-2 text-[9px] text-[#7fd0c6]">Open Trust Centre <ArrowRight size={10}/></Link></div><div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="rounded-xl border border-white/[0.055] bg-white/[0.02] px-3 py-2"><div className="text-[8px] uppercase tracking-[0.12em] text-white/22">PMS</div><div className="mt-1 text-[9px] text-emerald-100/55">refreshed 4 min ago</div></div><div className="rounded-xl border border-white/[0.055] bg-white/[0.02] px-3 py-2"><div className="text-[8px] uppercase tracking-[0.12em] text-white/22">Claims</div><div className="mt-1 text-[9px] text-amber-100/55">refreshed 12 min ago</div></div><div className="rounded-xl border border-white/[0.055] bg-white/[0.02] px-3 py-2"><div className="text-[8px] uppercase tracking-[0.12em] text-white/22">Finance</div><div className="mt-1 text-[9px] text-emerald-100/55">refreshed 18 min ago</div></div></div><div className="mt-4 flex flex-wrap gap-2">{executivePrompts.map((q) => <button key={q} type="button" onClick={() => ask(q)} className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] text-white/42 hover:border-[#2aa89a]/25 hover:text-white/70">{q}</button>)}</div></div>
        <div className="max-h-[68vh] min-h-[520px] overflow-y-auto p-4 md:p-5"><AnimatePresence initial={false}>{messages.map((message) => <motion.div key={message.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`mb-4 ${message.role === "user" ? "ml-auto max-w-[78%]" : "mr-auto max-w-[94%]"}`}>{message.role === "user" ? <div className="rounded-2xl rounded-br-md bg-[#2aa89a] px-4 py-3 text-[11px] font-medium text-[#04110f]">{message.text}</div> : message.answer ? <AnswerCard answer={message.answer} onFollowUp={ask}/> : <div className="rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-[11px] leading-5 text-white/45">{message.text}</div>}</motion.div>)}</AnimatePresence></div>
        <form onSubmit={(event) => { event.preventDefault(); ask(input); }} className="border-t border-white/[0.06] p-4"><div className="flex gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-2 focus-within:border-[#2aa89a]/30"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask Sitora about branches, claims, recovery, governance or a what-if scenario…" className="min-w-0 flex-1 bg-transparent px-2 text-[11px] text-white/72 outline-none placeholder:text-white/20"/><button type="submit" className="flex items-center gap-2 rounded-xl bg-[#2aa89a] px-4 py-2.5 text-[10px] font-semibold text-[#04110f]">Analyse <Send size={12}/></button></div></form>
      </section>
      <aside className="space-y-4">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[12px] font-semibold"><PlayCircle size={14} className="text-[#75ccc1]"/> Scenario Lab</div><p className="mt-2 text-[9px] leading-5 text-white/30">Show the VC that Sitora can move from descriptive BI to decision support without pretending a modeled scenario is guaranteed.</p><div className="mt-4 space-y-2">{scenarios.map((scenario) => <button key={scenario.id} onClick={() => setScenarioId(scenario.id)} className={`w-full rounded-2xl border p-3 text-left transition ${scenarioId === scenario.id ? "border-[#2aa89a]/25 bg-[#2aa89a]/[0.055]" : "border-white/[0.055] bg-white/[0.02]"}`}><div className="text-[10px] font-medium text-white/68">{scenario.title}</div><div className="mt-1 text-[9px] text-white/27">{scenario.current} → {scenario.target}</div></button>)}</div></div>
        <motion.div key={selectedScenario.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-[#c49a53]/15 bg-[#c49a53]/[0.035] p-5"><div className="text-[9px] uppercase tracking-[0.14em] text-[#dfbd7e]">Modeled outcome</div><div className="mt-2 text-[17px] font-semibold leading-6">{selectedScenario.effect}</div><div className="mt-3 flex items-center justify-between text-[9px] text-white/35"><span>Scenario confidence</span><span>{selectedScenario.confidence}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-[#c49a53]" style={{ width: `${selectedScenario.confidence}%` }}/></div><div className="mt-4 text-[9px] font-semibold text-white/45">Assumptions</div><div className="mt-2 space-y-2">{selectedScenario.assumptions.map((item) => <div key={item} className="flex gap-2 text-[9px] leading-4 text-white/34"><CheckCircle2 size={10} className="mt-0.5 shrink-0 text-white/20"/>{item}</div>)}</div><button onClick={() => ask(`What would happen in this scenario: ${selectedScenario.title}?`)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#c49a53]/18 bg-[#c49a53]/[0.06] py-2.5 text-[9px] font-medium text-[#e3c185]">Ask Sitora to explain <ArrowRight size={11}/></button></motion.div>
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[11px] font-semibold"><Lightbulb size={13} className="text-[#75ccc1]"/> Product principle</div><p className="mt-2 text-[9px] leading-5 text-white/32">The LLM should never be the source of truth. Sitora&apos;s production design should retrieve authorised data, calculate metrics through deterministic services, apply configured rules, and use AI to explain and prioritise the result.</p></div>
      </aside>
    </main>
  </div>;
}
