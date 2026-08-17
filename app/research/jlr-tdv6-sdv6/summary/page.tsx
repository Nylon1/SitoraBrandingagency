import type { Metadata } from "next";
import { ArrowLeft, BookOpen, ExternalLink, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "JLR TDV6/SDV6 Stage 1 Executive Summary | Sitora Research",
  description:
    "One-page web executive summary of Sitora Research's Stage 1 investigation into JLR 3.0 TDV6/SDV6 catastrophic engine failures.",
};

const doi = "10.5281/zenodo.21978373";
const zenodoRecord = "https://zenodo.org/records/21978373";

export default function JlrExecutiveSummaryPage() {
  return (
    <main className="min-h-screen bg-[#eef3f7] text-[#0b1e36]">
      <header className="border-b border-white/10 bg-[#06192f] text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <a href="/research/jlr-tdv6-sdv6" className="inline-flex items-center gap-2 text-sm font-bold text-slate-200 hover:text-white"><ArrowLeft className="h-4 w-4" /> Research home</a>
          <a href={zenodoRecord} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#c56f47]/60 px-3 py-2 text-xs font-black text-[#f6d1bd]">Zenodo · DOI {doi}<ExternalLink className="h-3.5 w-3.5" /></a>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10 lg:p-12">
          <p className="text-xs font-black tracking-[.18em] text-[#c56f47] uppercase">Executive summary · Version 1.0 · 17 August 2026</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-[-.035em] sm:text-5xl">JLR 3.0 TDV6/SDV6 catastrophic engine failures</h1>
          <p className="mt-4 text-lg font-bold text-slate-500">Stage 1 preliminary evidence review, international regulatory comparison and call for evidence.</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[["600+","DVSA documents potentially relevant"],["68,828","vehicles in the China recall"],["50→30 μm","documented JLR run-out tolerance change"]].map(([value,label]) => (
              <div key={label} className="rounded-2xl bg-[#f4f7fa] p-5"><div className="text-3xl font-black text-[#0b2746]">{value}</div><p className="mt-2 text-xs font-bold leading-5 text-slate-500">{label}</p></div>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-black">Why this investigation matters</h2>
            <p className="mt-3 leading-7 text-slate-700">Catastrophic crankshaft or main-bearing failure can result in engine seizure, loss of motive power and five-figure repair costs. Independent specialists consulted during the research describe a substantial UK repair burden, including claims of failure volumes running into the thousands. That scale is treated as professional testimony and an investigative signal, not as an independently audited national prevalence figure.</p>
          </section>

          <section className="mt-9">
            <h2 className="text-2xl font-black">What Stage 1 establishes</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li><strong>JLR technical records:</strong> SSM72578 documents crankshaft/crankshaft-bearing concerns, rotation of main-bearing shells, seizure, metallic debris and severe knocking in the 3.0 TDV6.</li>
              <li><strong>Engineering change:</strong> JLR recorded a reduction in maximum crankshaft main-bearing run-out tolerance from 50 microns to 30 microns from a specified engine number. The change is evidence of engineering revision, but does not by itself prove causation or defect in all earlier engines.</li>
              <li><strong>China:</strong> the official recall covered 68,828 vehicles and referred to crankshaft assembly/manufacturing issues, insufficient bearing lubrication, premature wear and an improved-engine remedy where risk was identified.</li>
              <li><strong>South Korea:</strong> authorities also undertook recall and later re-recall activity involving JLR diesel vehicles; direct technical equivalence with the UK population still requires verification.</li>
              <li><strong>United Kingdom:</strong> DVSA confirmed it had identified more than 600 documents that may be relevant to the wider FOIA request, including customer communications and manufacturer information. This is not the same as 600 confirmed bearing-failure cases.</li>
              <li><strong>Replacement engines:</strong> JLR correspondence confirms that a relevant replacement engine is remanufactured and that no brand-new complete assembly is available in that case. The key unresolved issue is which corrective engineering changes are incorporated into UK replacement/remanufactured engines.</li>
            </ul>
          </section>

          <section className="mt-9 rounded-2xl border border-[#e4c5b4] bg-[#fff7f2] p-6">
            <h2 className="text-xl font-black text-[#7e3f25]">What Stage 1 does not claim</h2>
            <p className="mt-3 leading-7 text-slate-700">It does not establish that every TDV6/SDV6 engine is defective, provide a verified UK failure rate, prove that international vehicle populations are technically identical, or make a final finding of legal liability, concealment or regulatory wrongdoing.</p>
          </section>

          <section className="mt-9">
            <h2 className="text-2xl font-black">Stage 2 priority</h2>
            <p className="mt-3 leading-7 text-slate-700">The next phase is to independently quantify the UK scale using structured owner submissions, garage/rebuilder case data, engineering evidence, warranty records, JLR technical material and targeted DVSA correspondence. Every case must be checked for duplication, relevance and evidence quality before being counted.</p>
          </section>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-200 pt-7">
            <a href="/research/jlr-tdv6-sdv6/report" className="inline-flex items-center gap-2 rounded-xl bg-[#0b2746] px-5 py-3 text-sm font-black text-white"><BookOpen className="h-4 w-4" /> Read full report</a>
            <a href={zenodoRecord} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#c56f47] px-5 py-3 text-sm font-black text-white"><FileText className="h-4 w-4" /> Open Zenodo publication</a>
            <a href={`https://doi.org/${doi}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-[#0b2746]">DOI link <ExternalLink className="h-4 w-4" /></a>
          </div>
        </div>
      </article>
    </main>
  );
}
