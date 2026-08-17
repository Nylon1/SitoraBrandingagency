import { ExternalLink, FileText } from "lucide-react";

const DOI = "10.5281/zenodo.21978373";

export default function JlrDoiPage() {
  return (
    <main className="min-h-screen bg-[#06192f] px-5 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl md:p-12">
        <p className="text-xs font-black tracking-[.2em] text-[#f0a06f] uppercase">Permanent research identifier</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Stage 1 publication DOI</h1>
        <p className="mt-5 font-mono text-lg font-bold text-slate-200">{DOI}</p>
        <p className="mt-6 leading-8 text-slate-300">This DOI identifies the frozen Version 1.0 publication of the JLR 3.0 TDV6/SDV6 catastrophic engine-failure Stage 1 research paper. Future substantive revisions should be issued as new versions rather than silently replacing this record.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`https://doi.org/${DOI}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#c56f47] px-5 py-3 font-black text-white"><ExternalLink className="h-4 w-4" /> Open Zenodo record</a>
          <a href="/research/jlr-tdv6-sdv6/report" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-black"><FileText className="h-4 w-4" /> Read web edition</a>
        </div>
      </div>
    </main>
  );
}
