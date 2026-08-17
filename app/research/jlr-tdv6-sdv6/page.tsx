import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileSearch,
  FolderOpen,
  Gauge,
  Globe2,
  Landmark,
  ShieldAlert,
  Users,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JLR 3.0 TDV6/SDV6 Engine Failures | Stage 1 Research",
  description:
    "Public-interest Stage 1 research into JLR 3.0 TDV6/SDV6 catastrophic engine failures, technical records, international recalls and the UK regulatory response.",
};

const metrics = [
  ["Thousands?", "UK failures described by specialists — scale to verify", Users],
  ["UK-wide", "specialist repair market and owner reports", Wrench],
  ["600+", "DVSA documents", FolderOpen],
  ["68,828", "China recall", Globe2],
  ["1,338", "China warranty / claim cases", Users],
  ["50→30 μm", "JLR tolerance change", Gauge],
] as const;

const findings = [
  [
    "JLR technical knowledge",
    "SSM72578 documents crankshaft/crankshaft-bearing failure, rotation of main-bearing shells, seizure, metallic debris and severe knocking in the 3.0 TDV6.",
    "Primary manufacturer evidence",
  ],
  [
    "A documented engineering change",
    "JLR recorded a reduction in maximum crankshaft main-bearing run-out tolerance from 50 microns to 30 microns from a specified engine number.",
    "Primary manufacturer evidence",
  ],
  [
    "China recalled 68,828 vehicles",
    "The official Chinese defect record refers to crankshaft assembly/manufacturing issues, insufficient bearing lubrication, premature wear and an improved-engine remedy where risk was identified.",
    "Primary regulator evidence",
  ],
  [
    "South Korea also intervened",
    "South Korean authorities undertook recall action and later re-recall activity involving JLR diesel vehicles. Direct technical comparison with the UK population remains necessary.",
    "Primary regulator evidence",
  ],
  [
    "DVSA holds a substantial evidence record",
    "DVSA confirmed that it identified more than 600 documents that may be relevant to the wider FOIA request, including customer communications and manufacturer information.",
    "Primary correspondence",
  ],
  [
    "Replacement-engine questions remain",
    "JLR confirmed in correspondence that a relevant replacement engine is remanufactured and that no brand-new complete assembly is available. The unresolved question is what corrective engineering changes are incorporated.",
    "Primary correspondence",
  ],
] as const;

const countries = [
  ["United Kingdom", "No equivalent crank-bearing recall identified", "DVSA holds 600+ potentially relevant documents"],
  ["China", "Recall", "68,828 vehicles; improved engine where risk identified"],
  ["South Korea", "Recall + re-recall", "JLR diesel vehicles; further technical comparison required"],
  ["United States", "No equivalent recall identified in Stage 1", "JLR technical communications preserved by NHTSA"],
  ["Canada", "Comparator only", "Separate seizure-related engine recall; not defect equivalence"],
] as const;

const questions = [
  "What is the confirmed UK failure population by engine code, production period and mileage?",
  "Can specialist garages and rebuilders provide de-duplicated job-level data to test claims of thousands of UK failures?",
  "What engineering analysis led to the 50 μm → 30 μm run-out tolerance change?",
  "What exactly was changed in the ‘improved engine’ used in China?",
  "Are the same changes present in UK service/remanufactured replacement engines?",
  "What did JLR tell DVSA about the Chinese and South Korean actions, and why did the UK response differ?",
  "How often have replacement/remanufactured engines subsequently suffered materially similar failures?",
];

export default function JlrResearchPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fa] text-[#0b1e36]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06192f]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-5 px-5 py-3 lg:px-8">
          <a href="#overview" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#d47b50]/50 bg-[#0b2949] text-[#f0a06f]"><Gauge className="h-5 w-5" /></div>
            <div><div className="text-sm font-black tracking-wide">JLR 3.0 TDV6/SDV6</div><div className="text-xs text-slate-300">Stage 1 Research</div></div>
          </a>
          <nav className="hidden gap-6 text-xs font-bold text-slate-200 lg:flex">
            <a href="#findings" className="hover:text-[#f0a06f]">Findings</a>
            <a href="#international" className="hover:text-[#f0a06f]">International</a>
            <a href="#questions" className="hover:text-[#f0a06f]">Open questions</a>
            <a href="#contribute" className="hover:text-[#f0a06f]">Contribute</a>
          </nav>
          <a href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#d47b50]/60 px-3 py-2 text-xs font-black"><BookOpen className="h-4 w-4" /> Open record</a>
        </div>
      </header>

      <section id="overview" className="relative overflow-hidden bg-[#06192f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(55,132,181,.24),transparent_27%),radial-gradient(circle_at_20%_8%,rgba(197,111,71,.15),transparent_25%)]" />
        <div className="absolute inset-0 opacity-[.08] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:58px_58px]" />
        <div className="relative mx-auto grid max-w-[1480px] gap-12 px-5 py-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-5 flex flex-wrap gap-2 text-[11px] font-black tracking-[.16em] uppercase">
              <span className="rounded-full border border-[#c56f47]/40 bg-[#c56f47]/10 px-3 py-1.5 text-[#f3b28c]">Stage 1</span>
              <span className="rounded-full border border-white/15 px-3 py-1.5 text-slate-300">Public-interest research</span>
              <span className="rounded-full border border-white/15 px-3 py-1.5 text-slate-300">Open call for evidence</span>
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[.97] tracking-[-.045em] sm:text-6xl lg:text-7xl">JLR 3.0 TDV6/SDV6<span className="block text-slate-200">catastrophic engine failures</span></h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 lg:text-xl">A UK-wide public-interest investigation into recurring crankshaft and main-bearing failures, manufacturer technical knowledge, replacement engines, consumer harm and international regulatory action.</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">Independent specialists consulted in this research describe failure volumes running into the thousands across the UK. That scale is a significant research signal, not yet an independently audited national count. Stage 2 is designed to test and quantify it.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#c56f47] px-5 py-3.5 text-sm font-black text-white shadow-[0_14px_40px_rgba(197,111,71,.28)]"><BookOpen className="h-4 w-4" /> Read Stage 1 record <ArrowRight className="h-4 w-4" /></a>
              <a href="/research/jlr-tdv6-sdv6/submit" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[.05] px-5 py-3.5 text-sm font-bold"><Users className="h-4 w-4" /> Submit evidence</a>
            </div>
          </div>
          <aside className="self-end rounded-3xl border border-white/10 bg-white/[.055] p-7 shadow-[0_30px_90px_rgba(0,0,0,.24)] backdrop-blur-md">
            <p className="text-xs font-black tracking-[.18em] text-[#f0a06f] uppercase">Core research question</p>
            <p className="mt-4 text-2xl font-extrabold leading-9">Was there a recurring catastrophic crankshaft/main-bearing failure mechanism within sections of this engine population, was it adequately corrected, and was the UK response proportionate when compared with overseas action?</p>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-slate-300">Stage 1 does not claim that every engine is defective, establish a national failure rate, or make a finding of legal liability or regulatory wrongdoing.</p>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1480px] gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-6">
          {metrics.map(([value,label,Icon]) => <div key={label} className="bg-white p-5"><Icon className="h-5 w-5 text-[#c56f47]" /><div className="mt-4 text-3xl font-black tracking-tight text-[#0b2746]">{value}</div><div className="mt-1 text-xs font-bold leading-5 text-slate-500">{label}</div></div>)}
        </div>
        <div className="mx-auto max-w-[1480px] px-5 py-3 text-[11px] leading-5 text-slate-500 lg:px-8">* “Thousands” is professional testimony/intelligence supplied to Stage 1 and is not presented as a verified UK prevalence figure. The research is actively seeking auditable garage, warranty and manufacturer data.</div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[[ShieldAlert,"Public safety","Sudden catastrophic engine failure can interrupt motive power."],[Gauge,"Replacement engines","The specification of remanufactured replacement engines is a central unanswered question."],[Landmark,"Regulatory scrutiny","Overseas recall actions create a legitimate UK comparison question."],[Wrench,"Potential scale","A mature UK specialist repair market and reports of large case volumes make national quantification necessary."]].map(([Icon,title,body]) => { const C=Icon as typeof ShieldAlert; return <div key={String(title)} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><C className="h-6 w-6 text-[#c56f47]" /><h2 className="mt-4 text-lg font-black">{String(title)}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{String(body)}</p></div> })}
        </div>
      </section>

      <section id="findings" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1480px] px-5 py-20 lg:px-8">
          <p className="text-xs font-black tracking-[.18em] text-[#c56f47] uppercase">Stage 1 findings</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight">What is established so far</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {findings.map(([title,body,status],i)=><article key={title} className="rounded-2xl border border-slate-200 bg-[#f9fbfd] p-6"><div className="flex gap-4"><span className="text-2xl font-black text-[#c56f47]">{String(i+1).padStart(2,"0")}</span><div><p className="text-[10px] font-black tracking-[.13em] text-slate-400 uppercase">{status}</p><h3 className="mt-2 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-slate-600">{body}</p></div></div></article>)}
          </div>
        </div>
      </section>

      <section id="international" className="mx-auto max-w-[1480px] px-5 py-20 lg:px-8">
        <p className="text-xs font-black tracking-[.18em] text-[#c56f47] uppercase">International comparison</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight">Different jurisdictions, different responses</h2>
        <div className="mt-9 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-[#0b2746] text-white"><tr><th className="p-4">Jurisdiction</th><th className="p-4">Regulatory position</th><th className="p-4">Stage 1 significance</th></tr></thead><tbody>{countries.map(([country,action,scope])=><tr key={country} className="border-t border-slate-100"><td className="p-4 font-black">{country}</td><td className="p-4 text-slate-700">{action}</td><td className="p-4 text-slate-600">{scope}</td></tr>)}</tbody></table>
        </div>
      </section>

      <section id="questions" className="bg-[#06192f] text-white">
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <div><p className="text-xs font-black tracking-[.18em] text-[#f0a06f] uppercase">Stage 2</p><h2 className="mt-3 text-4xl font-black tracking-tight">What now needs to be answered</h2><p className="mt-5 leading-7 text-slate-300">These questions are designed to be tested against engineering records, regulator correspondence, warranty data and structured case evidence.</p></div>
          <ol className="grid gap-3">{questions.map((q,i)=><li key={q} className="grid grid-cols-[2rem_1fr] gap-3 rounded-xl border border-white/10 bg-white/[.04] p-4"><span className="font-black text-[#f0a06f]">{i+1}</span><span className="leading-7 text-slate-100">{q}</span></li>)}</ol>
        </div>
      </section>

      <section id="contribute" className="mx-auto max-w-[1480px] px-5 py-20 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-black tracking-[.18em] text-[#c56f47] uppercase">Open research</p><h2 className="mt-3 text-4xl font-black tracking-tight">Help establish the true UK scale</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">Affected drivers, garages, engine rebuilders, engineers, warranty professionals, regulators, journalists and current or former industry personnel are invited to contribute. The aim is to move from large-scale professional reports and public signals to a de-duplicated, auditable UK evidence base. Contrary evidence is expressly welcome.</p></div><div className="flex flex-col gap-3"><a href="/research/jlr-tdv6-sdv6/submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c56f47] px-5 py-3 font-black text-white"><Users className="h-4 w-4" /> Contribute evidence</a><a href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-black"><FileSearch className="h-4 w-4" /> View source register</a></div></div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#06192f] text-white"><div className="mx-auto flex max-w-[1480px] flex-col gap-3 px-5 py-8 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8"><p>Stage 1 Public-Interest Research — preliminary evidence and call for contributions.</p><a href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-white"><Download className="h-4 w-4" /> Open research record</a></div></footer>
    </main>
  );
}
