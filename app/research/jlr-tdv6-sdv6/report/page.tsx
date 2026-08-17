import type { Metadata } from "next";
import { ArrowLeft, BookOpen, ExternalLink, FileSearch, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Stage 1 Report | JLR 3.0 TDV6/SDV6 Engine Failures",
  description:
    "Full web edition of the Stage 1 public-interest research paper on JLR 3.0 TDV6/SDV6 catastrophic engine failures, international regulatory action and open research questions.",
};

const sections = [
  ["Abstract", "abstract"],
  ["Research questions", "questions"],
  ["Methodology", "methodology"],
  ["Manufacturer technical record", "technical"],
  ["International comparison", "international"],
  ["UK regulatory record", "uk"],
  ["Replacement engines", "replacement"],
  ["Open-source signals", "signals"],
  ["Preliminary findings", "findings"],
  ["Limitations", "limitations"],
  ["Stage 2", "stage2"],
  ["References", "references"],
] as const;

function Heading({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-black tracking-[.18em] text-[#c56f47] uppercase">{kicker}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0b2746] md:text-4xl">{children}</h2>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <div className="my-7 rounded-2xl border border-[#e5c5b4] bg-[#fff7f2] p-5 text-sm leading-7 text-[#6f432f]">{children}</div>;
}

export default function JlrStage1ReportPage() {
  return (
    <main className="min-h-screen bg-[#eef3f7] text-[#14263b]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06192f]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <a href="/research/jlr-tdv6-sdv6" className="inline-flex items-center gap-2 text-sm font-bold text-slate-200 hover:text-white"><ArrowLeft className="h-4 w-4" /> Research overview</a>
          <div className="hidden text-center sm:block"><p className="text-xs font-black tracking-[.16em] text-[#f0a06f] uppercase">Stage 1 · Web edition</p><p className="text-sm font-bold">JLR 3.0 TDV6/SDV6 Engine Failures</p></div>
          <a href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-black"><BookOpen className="h-4 w-4" /> Open record</a>
        </div>
      </header>

      <section className="bg-[#06192f] text-white">
        <div className="mx-auto max-w-[1500px] px-5 py-16 lg:px-8 lg:py-24">
          <div className="max-w-5xl">
            <p className="text-xs font-black tracking-[.2em] text-[#f0a06f] uppercase">Stage 1 public-interest research paper</p>
            <h1 className="mt-5 text-5xl font-black leading-[1.02] tracking-[-.045em] md:text-7xl">JLR 3.0 TDV6/SDV6 catastrophic engine failures</h1>
            <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">Preliminary evidence, international regulatory comparison and call for evidence.</p>
            <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold text-slate-300"><span className="rounded-full border border-white/15 px-3 py-1.5">Version 1.0</span><span className="rounded-full border border-white/15 px-3 py-1.5">17 August 2026</span><span className="rounded-full border border-white/15 px-3 py-1.5">Open research</span><span className="rounded-full border border-white/15 px-3 py-1.5">Not final findings</span></div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black tracking-[.15em] text-slate-400 uppercase">Contents</p>
            <nav className="mt-4 space-y-1">{sections.map(([label,id]) => <a key={id} href={`#${id}`} className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#0b2746]">{label}</a>)}</nav>
          </div>
          <div className="mt-4 rounded-2xl border border-[#e5c5b4] bg-[#fff7f2] p-5"><p className="text-xs font-black tracking-[.15em] text-[#a95835] uppercase">Evidence standard</p><p className="mt-3 text-sm leading-6 text-[#6f432f]">Primary documents carry greater weight than professional testimony, owner reports or online material. Open-source repetition is not treated as proof.</p></div>
        </aside>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="px-6 py-10 md:px-10 lg:px-14">
            <section id="abstract" className="scroll-mt-28">
              <Heading kicker="Abstract">Purpose and scope</Heading>
              <p className="text-lg leading-8 text-slate-700">This Stage 1 paper examines whether publicly available and supplied material is sufficient to justify deeper investigation into recurring catastrophic crankshaft and main-bearing failures affecting sections of the Jaguar Land Rover 3.0 TDV6/SDV6 diesel engine population. It brings together manufacturer technical communications, overseas regulatory action, UK regulatory correspondence, replacement-engine information, professional repair-market intelligence and structured open-source research leads.</p>
              <p className="mt-5 leading-8 text-slate-600">The paper does not establish a national UK failure rate, determine legal liability or conclude that every engine is defective. Its purpose is narrower: to identify what is already documented, where apparently different regulatory responses occurred, what engineering questions remain unanswered and what evidence is needed for a stronger Stage 2 analysis.</p>
              <Note><strong>Central distinction:</strong> the existence of many owner reports or specialist repair businesses may indicate a pattern worth investigating, but it does not by itself establish prevalence, causation or wrongdoing.</Note>
            </section>

            <section id="questions" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="Research questions">What this paper asks</Heading>
              <ol className="grid gap-3">{[
                "Was there a recurring catastrophic crankshaft or main-bearing failure mechanism within sections of the JLR 3.0 TDV6/SDV6 population?",
                "What engineering revisions were introduced, when were they introduced, and what problem were they intended to address?",
                "Why did China and South Korea take recall action while no directly equivalent UK crank-bearing recall has been identified in Stage 1?",
                "What is the specification of UK service/remanufactured replacement engines, and which corrective design changes are incorporated?",
              ].map((q,i)=><li key={q} className="grid grid-cols-[2rem_1fr] gap-3 rounded-xl bg-[#f6f8fb] p-4"><span className="font-black text-[#c56f47]">{i+1}</span><span className="leading-7 text-slate-700">{q}</span></li>)}</ol>
            </section>

            <section id="methodology" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="Methodology">How the evidence is treated</Heading>
              <p className="leading-8 text-slate-600">Stage 1 uses an evidence hierarchy rather than treating all sources equally. Primary manufacturer and regulator documents are the strongest category. Supplied warranty and manufacturer correspondence are treated as primary documentary evidence for the specific cases to which they relate. Professional repair-market material is used to identify recurring technical themes and potential witnesses. Structured owner reports are useful for chronology and hypothesis generation. Forums, buying guides and online discussions are treated only as open-source signals.</p>
              <div className="mt-7 grid gap-4 md:grid-cols-2">{[
                ["A · Primary / verified", "Manufacturer technical documents, regulator notices, official correspondence, invoices, engineering records."],
                ["B · Corroborated professional", "Independent garages, rebuilders or engineers where claims can be supported by records or repeat observations."],
                ["C · Structured owner evidence", "Vehicle-specific cases with mileage, diagnosis, invoices, warranty records or photographs."],
                ["D · Indicative / open source", "Forums, social media, buying guides and unverified claims used to raise questions, not prove them."],
              ].map(([t,b])=><div key={t} className="rounded-xl border border-slate-200 p-5"><h3 className="font-black text-[#0b2746]">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{b}</p></div>)}</div>
              <p className="mt-6 leading-8 text-slate-600">Cross-jurisdiction comparisons are made cautiously. A recall in another country does not establish technical equivalence with UK vehicles. The correct question is whether the affected engine populations, part numbers, production periods and failure mechanisms were materially equivalent and, if not, what engineering distinction justified different treatment.</p>
            </section>

            <section id="technical" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="Manufacturer record">JLR technical communications</Heading>
              <h3 className="text-xl font-black text-[#0b2746]">SSM72578: crankshaft / crankshaft-bearing concerns</h3>
              <p className="mt-4 leading-8 text-slate-600">JLR Special Service Message SSM72578, archived in the US NHTSA technical-service-bulletin system and last modified in January 2016, specifically addresses “Crankshaft/Crankshaft Bearing Concerns - 3.0 TDV6 Diesel Engine”. The communication describes crankshaft and crankshaft-bearing failure and identifies rotation of the main bearing shells as a cause within the diagnostic guidance.</p>
              <p className="mt-4 leading-8 text-slate-600">The documented symptom set includes a seized crankshaft, severe rumbling or knocking, oil-pressure warnings, metallic contamination and, in severe cases, damage to the sump or cylinder block. Of particular relevance, the document records an engineering change from a specified engine number: maximum crankshaft main-bearing run-out tolerance was reduced from <strong>50 μm to 30 μm</strong>.</p>
              <Note>The 50 μm → 30 μm change is evidence that the engineering specification changed. Stage 1 does <strong>not</strong> treat the change alone as proof that the earlier tolerance caused the failures or that every earlier engine was defective.</Note>
              <h3 className="mt-8 text-xl font-black text-[#0b2746]">SSM71816 and the earlier technical trail</h3>
              <p className="mt-4 leading-8 text-slate-600">An earlier communication identified as SSM71816, dated to 2014 in contemporary reproductions, also concerns crankshaft/crankshaft-bearing issues. Stage 1 has not yet obtained an authenticated original JLR/TOPIx copy, so its precise wording is not relied upon as a primary source. Its relevance is increased, however, because supplied warranty-review material independently refers to an “inherent issue referenced as SSM71816”. Authentication of the original communication is a Stage 2 priority.</p>
            </section>

            <section id="international" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="International comparison">China, South Korea and safety comparators</Heading>
              <h3 className="text-xl font-black text-[#0b2746]">China</h3>
              <p className="mt-4 leading-8 text-slate-600">China's official State Administration for Market Regulation notice records a recall involving <strong>68,828</strong> Jaguar Land Rover vehicles equipped with 3.0-litre diesel engines. The official notice links the action to crankshaft assembly/manufacturing-process issues that could result in insufficient bearing lubrication, premature wear and, in extreme circumstances, crankshaft fracture and interruption of power.</p>
              <p className="mt-4 leading-8 text-slate-600">The notice describes engine-health inspection and, where risk was identified, free replacement with an <strong>“improved engine”</strong>. It also records 223 defect reports/complaints and 1,338 warranty/claim cases. Stage 1 treats these figures as evidence of the Chinese regulatory record, not as evidence of the UK failure rate.</p>
              <h3 className="mt-8 text-xl font-black text-[#0b2746]">South Korea</h3>
              <p className="mt-4 leading-8 text-slate-600">South Korea's Ministry of Land, Infrastructure and Transport published recall activity involving more than 16,000 JLR diesel vehicles in 2018 and later reported re-recall activity in 2019. Direct VIN, engine-code and remedy equivalence with UK vehicles remains to be established.</p>
              <h3 className="mt-8 text-xl font-black text-[#0b2746]">United Kingdom and Canada comparators</h3>
              <p className="mt-4 leading-8 text-slate-600">UK recall references R/2019/013 and R/2019/014 concern crankshaft-pulley retaining-bolt issues and should not be conflated with the internal main-bearing mechanism examined in this paper. A Transport Canada engine-seizure recall is also used only as a safety comparator because it concerns a different connecting-rod-bearing-cap-bolt defect.</p>
              <Note>The key Stage 2 comparison is not simply “China recalled and the UK did not”. It is: <strong>were the UK and overseas engines materially equivalent, and if not, what engineering difference justified different regulatory action?</strong></Note>
            </section>

            <section id="uk" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="UK record">DVSA and the scale question</Heading>
              <p className="leading-8 text-slate-600">In supplied Freedom of Information correspondence, DVSA confirmed that it holds responsive information and identified <strong>more than 600 documents that may be relevant</strong> to the wider request. DVSA stated that the material includes customer communications and manufacturer information, while also explaining that some material may engage personal-data exemptions and manufacturer information tied to specific recall files.</p>
              <Note><strong>Important:</strong> “600+ documents” does not mean 600 confirmed bearing-failure cases. It means that the regulator identified a substantial body of potentially relevant material that now warrants disciplined refinement and review.</Note>
              <p className="leading-8 text-slate-600">The DVSA Vehicle Safety Defects and Recalls Code expects producers and the regulator to consider root cause, recurrence and international information when assessing potential safety defects. This makes the overseas comparison, failure mechanism and recurrence data directly relevant research questions.</p>
              <p className="mt-5 leading-8 text-slate-600">Independent JLR/engine specialists consulted for this project describe failure volumes running into the thousands across the UK. Stage 1 presents that as professional intelligence, not an audited national count. A core Stage 2 objective is to establish a defensible minimum case population using de-duplicated garage records, engine serials, warranty data and regulator/manufacturer records.</p>
            </section>

            <section id="replacement" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="Remedy question">Replacement and remanufactured engines</Heading>
              <p className="leading-8 text-slate-600">Supplied JLR correspondence confirms that a relevant replacement engine was a remanufactured engine and states that no brand-new engine was available as a complete assembly in that case. This is significant because the effectiveness of a replacement remedy depends not merely on whether an engine is “new” or “remanufactured”, but on the exact internal engineering specification applied.</p>
              <p className="mt-5 leading-8 text-slate-600">Land Rover UK states generally that remanufactured genuine parts are disassembled, inspected and rebuilt to the same specifications and tolerances as new genuine parts, with the latest design improvements incorporated “wherever possible”. Remanufacturing is therefore not treated as inherently inferior in this paper.</p>
              <div className="mt-7 rounded-2xl bg-[#0b2746] p-6 text-white"><p className="text-xs font-black tracking-[.15em] text-[#f0a06f] uppercase">Unresolved engineering question</p><p className="mt-3 text-xl font-bold leading-8">Which crankshaft, bearing, lubrication and assembly improvements are actually present in the relevant UK service/remanufactured engine, and how do they compare with the “improved engine” used in the Chinese recall remedy?</p></div>
            </section>

            <section id="signals" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="Hypothesis generation">Open-source signals and research leads</Heading>
              <p className="leading-8 text-slate-600">Stage 1 deliberately examines the wider online footprint while keeping it outside the primary evidence layer. Owner forums, specialist repair websites and buying guides repeatedly describe sudden seizure, bottom-end knocking, metallic debris, crankshaft failure and, in some cases, failure of replacement engines.</p>
              <div className="mt-7 space-y-4">{[
                ["Failures at widely differing mileages", "Raises the question whether the mechanism clusters by production period, engine serial, servicing pattern or another factor rather than simple age."],
                ["Repeat failures after engine replacement", "Raises the question whether some replacement engines reproduce materially similar failure signatures and what specification they contain."],
                ["A dedicated UK specialist repair market", "Raises the possibility of a substantial minimum case population that could be quantified using anonymised work orders rather than internet anecdotes."],
                ["Competing technical explanations", "Bearing-shell movement, crankshaft geometry, lubrication loss, oil-system issues and DPF/oil-dilution theories suggest the final failure may have more than one initiating pathway."],
                ["Lion-family engineering comparisons", "Ford's later 3.0 Power Stroke derivative used a forged-steel crankshaft, changed bearing materials and a two-stage oil pump for its truck duty cycle, creating useful comparative engineering questions without proving a JLR defect."],
                ["Mainstream used-car warnings", "The risk appears in established buying guides as well as forums, raising a timing question about when the issue became widely recognised in the repair and ownership markets."],
              ].map(([t,b])=><div key={t} className="rounded-xl border border-slate-200 p-5"><h3 className="font-black text-[#0b2746]">{t}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{b}</p></div>)}</div>
              <Note>Online repetition is not proof. The value of these sources is that they identify mechanisms, witnesses, time periods and questions that can be tested against stronger evidence.</Note>
            </section>

            <section id="findings" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="Preliminary findings">What Stage 1 can responsibly say</Heading>
              <div className="space-y-4">{[
                "JLR's own technical communication documents a recognised 3.0 TDV6 crankshaft/crankshaft-bearing failure concern and records rotation of main-bearing shells within the diagnostic material.",
                "JLR recorded an engineering change reducing maximum crankshaft main-bearing run-out tolerance from 50 μm to 30 μm from a specified engine number.",
                "China undertook a large official recall involving 68,828 vehicles, described crankshaft/manufacturing and bearing-lubrication concerns, and used an ‘improved engine’ remedy where risk was identified.",
                "South Korea also undertook recall and later re-recall activity involving JLR diesel vehicles, although direct technical equivalence remains to be established.",
                "DVSA has identified more than 600 potentially relevant documents in response to a wider FOIA request, demonstrating that a substantial UK regulatory record exists for further examination.",
                "The specification and corrective engineering content of UK remanufactured/service replacement engines remains an important unresolved question.",
                "The UK specialist repair market and long-running owner reports provide a strong signal for systematic case collection, but they do not yet establish a verified national prevalence rate.",
              ].map((f,i)=><div key={f} className="grid grid-cols-[2.4rem_1fr] gap-3 rounded-xl bg-[#f6f8fb] p-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#0b2746] text-sm font-black text-white">{i+1}</span><p className="leading-7 text-slate-700">{f}</p></div>)}</div>
            </section>

            <section id="limitations" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="Limitations">What Stage 1 does not establish</Heading>
              <ul className="grid gap-3 text-slate-700">{[
                "It does not establish that every 3.0 TDV6/SDV6 engine is defective.",
                "It does not establish a UK population failure rate or convert online reports into a prevalence estimate.",
                "It does not establish that all replacement/remanufactured engines lack corrective engineering changes.",
                "It does not conclude that JLR concealed a defect or that DVSA knowingly ignored a safety defect.",
                "It does not assume that Chinese, Korean and UK engine populations are technically identical.",
                "It does not treat remanufacturing itself as evidence of poor quality.",
                "It does not treat a design revision, by itself, as proof of causation or prior defectiveness.",
              ].map(x=><li key={x} className="flex gap-3 rounded-xl border border-slate-200 p-4"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c56f47]" /><span className="leading-7">{x}</span></li>)}</ul>
            </section>

            <section id="stage2" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="Next phase">Stage 2 evidence programme</Heading>
              <p className="leading-8 text-slate-600">Stage 2 should move from signals to quantification and technical verification. The priority is not to accumulate more anecdotes; it is to build a dataset that can withstand scrutiny.</p>
              <div className="mt-7 grid gap-4 md:grid-cols-2">{[
                ["Engineering-change matrix", "Obtain or reconstruct changes to crankshaft, bearings, lubrication system, assembly tolerances and service-engine specifications by engine number and production period."],
                ["UK failure population", "Seek JLR warranty/field data, DVSA records and de-duplicated specialist-garage case counts with vehicle and engine identifiers."],
                ["International equivalence", "Compare VIN ranges, engine codes, part numbers and remedies in China, South Korea and the UK."],
                ["Replacement-engine recurrence", "Identify repeat failures after service/remanufactured engine replacement and compare forensic failure signatures."],
                ["Independent engineering review", "Commission teardown, metallurgy, bearing, crankshaft and lubrication analysis on representative failed units."],
                ["Regulatory chronology", "Build a dated record of SSMs, engineering revisions, complaints, warranty trends, overseas recalls and UK regulator/manufacturer communications."],
              ].map(([t,b])=><div key={t} className="rounded-xl border border-slate-200 p-5"><h3 className="font-black text-[#0b2746]">{t}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{b}</p></div>)}</div>
              <div className="mt-8 flex flex-wrap gap-3"><a href="https://github.com/Nylon1/Sitora/issues/6" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#c56f47] px-5 py-3 font-black text-white"><Users className="h-4 w-4" /> Contribute evidence</a><a href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-black text-[#0b2746]"><FileSearch className="h-4 w-4" /> Open source register</a></div>
            </section>

            <section id="references" className="mt-16 scroll-mt-28 border-t border-slate-200 pt-12">
              <Heading kicker="References">Core public sources</Heading>
              <div className="space-y-4 text-sm leading-7 text-slate-600">
                <p><strong>Driver and Vehicle Standards Agency (2024)</strong> Vehicle safety defects and recalls: code of practice.</p>
                <p><strong>Honest John (2016)</strong> Owner case concerning bearing-shell movement, oil starvation and engine seizure.</p>
                <p><strong>Honest John (n.d.)</strong> Land Rover Discovery 4 owner/fault chronology.</p>
                <p><strong>Jaguar Land Rover (2016)</strong> SSM72578, “Crankshaft/Crankshaft Bearing Concerns - 3.0 TDV6 Diesel Engine”, archived by NHTSA.</p>
                <p><strong>Land Rover UK (n.d.)</strong> Remanufactured Genuine Parts.</p>
                <p><strong>Ministry of Land, Infrastructure and Transport, Republic of Korea (2018; 2019)</strong> JLR diesel recall and re-recall notices.</p>
                <p><strong>State Administration for Market Regulation, China (2018)</strong> JLR 3.0 diesel recall notice covering 68,828 vehicles.</p>
                <p><strong>Transport Canada (2015)</strong> Recall 2015072, used as a different-defect safety comparator.</p>
                <p><strong>Dieselheads (n.d.)</strong> Engine Failures &amp; Faults - Reports. Commercial specialist evidence used for hypothesis generation.</p>
                <p><strong>JLR Engine Specialists (n.d.)</strong> TDV6/SDV6 crankshaft repair material. Commercial specialist evidence used for hypothesis generation.</p>
                <p><strong>Ford Motor Company (2018)</strong> Technical information on the 3.0-litre Power Stroke Lion-family derivative.</p>
                <p><strong>PistonHeads (2021)</strong> Range Rover Sport L494 used buying guide.</p>
              </div>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-[#f7f9fb] p-5"><p className="font-black text-[#0b2746]">Primary documentary material supplied for Stage 1</p><p className="mt-2 text-sm leading-7 text-slate-600">Car Care Plan warranty review material; JLR replacement-engine correspondence; and DVSA FOIA correspondence. Personal information should be redacted before publication of source exhibits.</p></div>
              <p className="mt-8 text-xs leading-6 text-slate-400">This web edition is designed for public accessibility. The version-controlled research record remains on GitHub so corrections, challenges and additional evidence can be tracked transparently.</p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
