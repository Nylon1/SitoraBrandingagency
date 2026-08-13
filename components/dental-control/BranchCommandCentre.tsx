"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Bot, Building2, CircleDollarSign, FileWarning, Gauge, ShieldCheck, Sparkles, TrendingDown, WalletCards } from "lucide-react";
import { findBranch } from "@/lib/dental-control/deep-data";
import { sar } from "@/lib/dental-control/demo-data";

export function BranchCommandCentre({ branchId }: { branchId: string }) {
  const branch = findBranch(branchId);
  const [tab, setTab] = useState<"overview" | "chairs" | "clinicians" | "opportunity" | "claims" | "records">("overview");

  const tabs = [
    ["overview", "Overview"],
    ["chairs", "Chairs"],
    ["clinicians", "Clinicians"],
    ["opportunity", "Opportunity"],
    ["claims", "Claims"],
    ["records", "Records"],
  ] as const;

  return (
    <div className="min-h-screen bg-[#071310] text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_0%,rgba(42,168,154,0.11),transparent_28%),radial-gradient(circle_at_12%_92%,rgba(196,154,83,0.08),transparent_25%)]" />
      <header className="relative border-b border-white/[0.06] bg-[#081713]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 md:px-7">
          <div className="flex items-center gap-3">
            <Link href="/tools/dental-control" className="rounded-xl border border-white/[0.08] p-2.5 text-white/50 transition hover:text-white"><ArrowLeft size={17} /></Link>
            <div>
              <div className="text-[10px] uppercase tracking-[0.17em] text-[#73cabf]">Branch command centre</div>
              <div className="mt-1 text-[18px] font-semibold tracking-[-0.02em]">{branch.name}</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-[#c49a53]/25 bg-[#c49a53]/8 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#e3c182] sm:flex"><Sparkles size={11}/> VC demo dataset</div>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1500px] px-4 py-6 md:px-7 md:py-8">
        <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/15 bg-rose-400/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-rose-200"><TrendingDown size={11}/> {Math.abs(branch.fourWeekRevenueChange)}% below 4-week trend</div>
                <h1 className="mt-3 text-[30px] font-semibold tracking-[-0.04em] md:text-[40px]">Why is {branch.name} underperforming?</h1>
                <p className="mt-3 max-w-3xl text-[12px] leading-6 text-white/42">{branch.executiveSummary}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Metric icon={CircleDollarSign} label="Revenue" value={sar(branch.revenue)} sub={`${branch.fourWeekRevenueChange}% vs trend`} warn />
              <Metric icon={Gauge} label="Chair utilisation" value={`${branch.utilisation}%`} sub="Group average 78.4%" warn />
              <Metric icon={WalletCards} label="Claims risk" value={sar(branch.claimsRisk)} sub={`${branch.claimExceptionCount} exceptions`} warn />
              <Metric icon={ShieldCheck} label="Governance" value={`${branch.governance}%`} sub={`${branch.recordReviewCount} records need review`} warn />
            </div>
          </div>

          <div className="rounded-3xl border border-[#2aa89a]/18 bg-gradient-to-br from-[#0d2822] to-[#0a1a16] p-5">
            <div className="flex items-center gap-2.5 text-[12px] font-semibold"><Bot size={16} className="text-[#70c9be]"/> Sitora branch diagnosis</div>
            <div className="mt-4 space-y-3">
              {branch.drivers.map((driver, index) => (
                <div key={driver.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div><div className="text-[10px] text-white/28">Driver {index + 1}</div><div className="mt-1 text-[11px] font-medium text-white/82">{driver.label}</div></div>
                    <div className="text-[11px] font-semibold text-amber-100">{driver.impact}</div>
                  </div>
                  <div className="mt-2 text-[10px] leading-4 text-white/36">{driver.detail}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-[#c49a53]/16 bg-[#c49a53]/[0.045] p-3 text-[10px] leading-5 text-white/45"><span className="font-semibold text-[#e5c68c]">Recommended sequence:</span> recover accepted treatment first, then address Chair 3 capacity and grouped claim exceptions.</div>
          </div>
        </section>

        <div className="mt-6 overflow-x-auto border-b border-white/[0.06]">
          <div className="flex min-w-max gap-1">
            {tabs.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`border-b-2 px-4 py-3 text-[11px] transition ${tab === id ? "border-[#55bdb0] text-white" : "border-transparent text-white/35 hover:text-white/60"}`}>{label}</button>)}
          </div>
        </div>

        <div className="mt-5">
          {tab === "overview" ? <Overview branch={branch} /> : null}
          {tab === "chairs" ? <Chairs branch={branch} /> : null}
          {tab === "clinicians" ? <Clinicians branch={branch} /> : null}
          {tab === "opportunity" ? <Opportunities branch={branch} /> : null}
          {tab === "claims" ? <Claims branch={branch} /> : null}
          {tab === "records" ? <Records branch={branch} /> : null}
        </div>
      </main>
    </div>
  );
}

function Metric({ icon: Icon, label, value, sub, warn }: { icon: typeof Building2; label: string; value: string; sub: string; warn?: boolean }) {
  return <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"><div className="flex items-center justify-between"><div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 text-[#74cbbf]"><Icon size={15}/></div>{warn ? <span className="h-2 w-2 rounded-full bg-amber-300/80"/> : null}</div><div className="mt-4 text-[10px] uppercase tracking-[0.12em] text-white/25">{label}</div><div className="mt-1 text-[21px] font-semibold">{value}</div><div className="mt-1 text-[9px] text-white/28">{sub}</div></div>;
}

function Overview({ branch }: { branch: ReturnType<typeof findBranch> }) {
  return <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
    <Panel title="Operating funnel" subtitle="From available capacity to collected revenue">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Funnel label="Clinical hours" value={`${branch.clinicalHours}`} sub="Available this month" />
        <Funnel label="Completed visits" value={`${branch.completedVisits}`} sub="Across all chairs" />
        <Funnel label="Cancellations + no-shows" value={`${branch.cancellations + branch.noShows}`} sub="Capacity lost" warn />
        <Funnel label="Collections" value={sar(branch.collections)} sub={`${Math.round((branch.collections / branch.revenue) * 100)}% of production`} />
      </div>
      <div className="mt-5 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
        <div className="text-[10px] uppercase tracking-[0.14em] text-white/24">Sitora causal view</div>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          {[['Capacity','47 unused hrs'],['Conversion','SAR 81.2k unbooked'],['Claims','SAR 46.2k at risk'],['Governance','9 records']].map(([a,b],i)=><div key={a} className="relative rounded-xl border border-white/[0.05] bg-white/[0.025] p-3"><div className="text-[9px] text-white/25">{a}</div><div className="mt-1 text-[11px] font-medium text-white/70">{b}</div>{i<3?<ArrowRight size={12} className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-white/15 md:block"/>:null}</div>)}
        </div>
      </div>
    </Panel>
    <Panel title="Executive action plan" subtitle="Ordered by value and time-to-impact">
      <div className="space-y-3">{[
        ['1','Recover accepted treatment','SAR 81.2k','Patient coordination','Today'],
        ['2','Fix grouped claim exception','SAR 41.6k','Insurance team','Today'],
        ['3','Rebalance Chair 3 sessions','SAR 34k/mo','Branch manager','48h'],
        ['4','Complete record queue','9 records','Clinical lead','48h'],
      ].map(([n,a,v,o,t])=><div key={n} className="rounded-2xl border border-white/[0.055] bg-white/[0.025] p-3.5"><div className="flex items-start gap-3"><div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2aa89a]/12 text-[9px] font-semibold text-[#75cbbf]">{n}</div><div className="flex-1"><div className="flex items-center justify-between gap-3"><div className="text-[11px] font-medium text-white/78">{a}</div><div className="text-[10px] font-semibold text-white/65">{v}</div></div><div className="mt-1 text-[9px] text-white/25">Owner: {o} · target {t}</div></div></div></div>)}</div>
    </Panel>
  </div>;
}

function Chairs({ branch }: { branch: ReturnType<typeof findBranch> }) {
  return <Panel title="Chair economics" subtitle="Capacity, revenue and contribution reconciled at chair level"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{branch.chairs.map(chair=><div key={chair.id} className={`rounded-2xl border p-4 ${chair.signal==='attention'?'border-amber-400/18 bg-amber-400/[0.04]':'border-white/[0.06] bg-white/[0.025]'}`}><div className="flex items-center justify-between"><div><div className="text-[12px] font-medium">{chair.name}</div><div className="mt-1 text-[9px] text-white/28">{chair.clinician}</div></div><span className={`rounded-full px-2 py-1 text-[8px] uppercase tracking-[0.12em] ${chair.signal==='attention'?'bg-amber-400/10 text-amber-200':'bg-emerald-400/8 text-emerald-200'}`}>{chair.signal}</span></div><div className="mt-4 grid grid-cols-2 gap-3"><Small label="Utilisation" value={`${chair.utilisation}%`} /><Small label="Unused hours" value={`${chair.unusedHours}`} /><Small label="Revenue/hr" value={`SAR ${chair.revenueHour}`} /><Small label="Contribution/hr" value={`SAR ${chair.contributionHour}`} /></div>{chair.id==='JED-T-03'?<div className="mt-4 rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-3 text-[9px] leading-4 text-white/38">31 unused hours. This is the single largest chair-level capacity gap in the branch.</div>:null}</div>)}</div></Panel>;
}

function Clinicians({ branch }: { branch: ReturnType<typeof findBranch> }) {
  return <Panel title="Clinician intelligence" subtitle="Commercial, operational and governance signals combined"><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left"><thead className="text-[9px] uppercase tracking-[0.12em] text-white/22"><tr><th className="pb-3">Clinician</th><th className="pb-3">Revenue</th><th className="pb-3">Revenue/hr</th><th className="pb-3">Utilisation</th><th className="pb-3">Acceptance</th><th className="pb-3">Records</th><th className="pb-3">Claims reject</th><th className="pb-3">Profile</th></tr></thead><tbody>{branch.clinicians.map(c=><tr key={c.id} className="border-t border-white/[0.05] text-[10px]"><td className="py-3.5"><div className="text-white/80">{c.name}</div><div className="mt-0.5 text-[9px] text-white/25">{c.specialty}</div></td><td className="py-3.5 text-white/55">{sar(c.revenue)}</td><td className="py-3.5 text-white/55">SAR {c.revenueHour}</td><td className={`py-3.5 ${c.utilisation<65?'text-amber-200':'text-white/55'}`}>{c.utilisation}%</td><td className="py-3.5 text-white/55">{c.acceptance}%</td><td className="py-3.5 text-white/55">{c.recordCompleteness}%</td><td className={`py-3.5 ${c.claimsRejection>7?'text-amber-200':'text-white/55'}`}>{c.claimsRejection}%</td><td className="py-3.5"><Link href={`/tools/dental-control/clinician/${c.id}`} className="inline-flex items-center gap-1 text-[#72c9be]">Open <ArrowRight size={10}/></Link></td></tr>)}</tbody></table></div></Panel>;
}

function Opportunities({ branch }: { branch: ReturnType<typeof findBranch> }) {
  return <Panel title="Accepted treatment recovery" subtitle={`${branch.acceptedUnbooked} accepted plans · ${sar(branch.acceptedUnbookedValue)} without a future booking`}><div className="grid gap-3 lg:grid-cols-2">{branch.opportunities.map((o,i)=><div key={o.patient} className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"><div className="flex items-start justify-between gap-3"><div><div className="text-[11px] font-medium text-white/80">{o.patient}</div><div className="mt-1 text-[10px] text-white/38">{o.treatment}</div></div><div className="text-[12px] font-semibold text-[#78cfc4]">{sar(o.value)}</div></div><div className="mt-4 grid grid-cols-3 gap-2"><Small label="Waiting" value={`${o.ageDays} days`}/><Small label="Recovery" value={`${o.confidence}%`}/><Small label="Accepted" value={o.accepted}/></div><div className="mt-3 rounded-xl border border-[#2aa89a]/12 bg-[#2aa89a]/[0.035] p-3 text-[9px] text-white/42">Next: {o.nextAction} · owner {o.owner}</div>{i===3?<Link href="/tools/dental-control/patient/J-11307" className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-[#79cfc5]">Open full patient story <ArrowRight size={10}/></Link>:null}</div>)}</div></Panel>;
}

function Claims({ branch }: { branch: ReturnType<typeof findBranch> }) {
  return <Panel title="Claims exception cluster" subtitle="Jeddah claim risk decomposed into workflows"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="text-[9px] uppercase tracking-[0.12em] text-white/22"><tr><th className="pb-3">Claim</th><th className="pb-3">Patient</th><th className="pb-3">Procedure</th><th className="pb-3">Value</th><th className="pb-3">Reason</th><th className="pb-3">Cluster</th><th className="pb-3">Age</th></tr></thead><tbody>{branch.claims.map(c=><tr key={c.id} className="border-t border-white/[0.05] text-[10px]"><td className="py-3.5 text-white/70">{c.id}</td><td className="py-3.5 text-white/45">{c.patient}</td><td className="py-3.5 text-white/55">{c.procedure}</td><td className="py-3.5 text-white/60">{sar(c.value)}</td><td className="py-3.5 text-white/40">{c.reason}</td><td className="py-3.5"><span className="rounded-full border border-amber-400/15 bg-amber-400/[0.05] px-2 py-1 text-[8px] text-amber-200">{c.cluster}</span></td><td className="py-3.5 text-white/38">{c.ageHours}h</td></tr>)}</tbody></table></div></Panel>;
}

function Records({ branch }: { branch: ReturnType<typeof findBranch> }) {
  return <Panel title="Record Guardian queue" subtitle="Documentation completeness only · human review remains required"><div className="grid gap-3 lg:grid-cols-3">{branch.records.map(r=><div key={r.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"><div className="flex items-start justify-between"><div><div className="text-[11px] font-medium text-white/80">{r.procedure}</div><div className="mt-1 text-[9px] text-white/28">{r.patient} · {r.clinician}</div></div><div className="text-[13px] font-semibold text-amber-200">{r.completeness}%</div></div><div className="mt-4 text-[9px] uppercase tracking-[0.13em] text-white/24">Missing evidence</div><div className="mt-2 space-y-1.5">{r.missing.map(m=><div key={m} className="flex items-center gap-2 rounded-lg bg-amber-400/[0.04] px-2.5 py-2 text-[9px] text-white/45"><FileWarning size={11} className="text-amber-200"/>{m}</div>)}</div><div className="mt-3 text-[9px] text-white/24">{r.ageHours} hours since appointment completion</div></div>)}</div></Panel>;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) { return <section className="rounded-3xl border border-white/[0.07] bg-white/[0.025]"><div className="border-b border-white/[0.06] px-5 py-4"><div className="text-[13px] font-semibold">{title}</div>{subtitle?<div className="mt-1 text-[10px] text-white/28">{subtitle}</div>:null}</div><div className="p-5">{children}</div></section>; }
function Funnel({ label, value, sub, warn }: { label:string; value:string; sub:string; warn?:boolean }) { return <div className={`rounded-2xl border p-4 ${warn?'border-amber-400/15 bg-amber-400/[0.035]':'border-white/[0.055] bg-white/[0.025]'}`}><div className="text-[9px] uppercase tracking-[0.12em] text-white/24">{label}</div><div className={`mt-2 text-[20px] font-semibold ${warn?'text-amber-200':''}`}>{value}</div><div className="mt-1 text-[9px] text-white/27">{sub}</div></div>; }
function Small({ label, value }: { label:string; value:string }) { return <div><div className="text-[8px] uppercase tracking-[0.11em] text-white/22">{label}</div><div className="mt-1 text-[10px] font-medium text-white/65">{value}</div></div>; }
