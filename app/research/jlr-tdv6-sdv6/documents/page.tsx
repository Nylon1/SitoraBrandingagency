import type { Metadata } from "next";
import { ArrowLeft, BookOpen, ExternalLink, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "JLR Research Documents | Sitora Research",
  description: "Read the full Stage 1 JLR TDV6/SDV6 report and executive summary directly on the Sitora research website.",
};

const doi = "10.5281/zenodo.21978373";
const zenodoRecord = "https://zenodo.org/records/21978373";

export default function JlrDocumentsPage() {
  return (
    <main className="min-h-screen bg-[#eef3f7] text-[#0b1e36]">
      <header className="bg-[#06192f] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <a href="/research/jlr-tdv6-sdv6" className="inline-flex items-center gap-2 text-sm font-bold text-slate-200 hover:text-white"><ArrowLeft className="h-4 w-4" /> Research home</a>
          <a href={zenodoRecord} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#c56f47]/60 px-3 py-2 text-xs font-black text-[#f6d1bd]">Zenodo · DOI {doi}<ExternalLink className="h-3.5 w-3.5" /></a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <p className="text-xs font-black tracking-[.18em] text-[#c56f47] uppercase">Research library</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-.035em] sm:text-5xl">Read the Stage 1 research directly on the website</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">These web editions avoid download problems on mobile devices. The Zenodo record is the permanent publication record for Version 1.0 and carries DOI {doi}.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0b2746] text-white"><BookOpen className="h-6 w-6" /></div>
            <p className="mt-6 text-xs font-black tracking-[.14em] text-[#c56f47] uppercase">Full publication · Version 1.0</p>
            <h2 className="mt-2 text-2xl font-black">Stage 1 Research Paper</h2>
            <p className="mt-3 leading-7 text-slate-600">The complete web edition: methodology, technical evidence, international regulatory comparison, DVSA record, replacement-engine questions, limitations, references and Stage 2 programme.</p>
            <a href="/research/jlr-tdv6-sdv6/report" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0b2746] px-5 py-3 text-sm font-black text-white"><BookOpen className="h-4 w-4" /> Read full report</a>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c56f47] text-white"><FileText className="h-6 w-6" /></div>
            <p className="mt-6 text-xs font-black tracking-[.14em] text-[#c56f47] uppercase">Concise publication</p>
            <h2 className="mt-2 text-2xl font-black">Executive Summary</h2>
            <p className="mt-3 leading-7 text-slate-600">A concise web version of the key evidence, what Stage 1 establishes, what it does not claim, and the priorities for Stage 2.</p>
            <a href="/research/jlr-tdv6-sdv6/summary" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#c56f47] px-5 py-3 text-sm font-black text-white"><FileText className="h-4 w-4" /> Read summary</a>
          </article>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-black">Permanent research record</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">The canonical publication record is hosted by Zenodo at record 21978373. DOI: <strong>{doi}</strong>. Use the DOI when citing the paper; use the Zenodo record to view the publication metadata and files.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <a href={zenodoRecord} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-black text-[#a95835]">Open Zenodo record <ExternalLink className="h-4 w-4" /></a>
            <a href={`https://doi.org/${doi}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-black text-[#0b2746]">Open DOI <ExternalLink className="h-4 w-4" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
