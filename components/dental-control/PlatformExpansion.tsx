"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  CircleDashed,
  CloudCog,
  Database,
  Globe2,
  Layers3,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { integrationHealth, platformModules } from "@/lib/dental-control/deep-intelligence";

const stateStyle = {
  active: "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-200",
  roadmap: "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-100",
  vision: "border-violet-400/20 bg-violet-400/[0.06] text-violet-100",
};

const integrationStyle = {
  healthy: "bg-emerald-400/10 text-emerald-200",
  attention: "bg-amber-400/10 text-amber-200",
  planned: "bg-white/[0.05] text-white/40",
};

export function PlatformExpansion() {
  return <div className="min-h-screen bg-[#071310] text-white">
    <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_0%,rgba(42,168,154,0.11),transparent_32%),radial-gradient(circle_at_10%_100%,rgba(126,90,214,0.07),transparent_27%)]" />
    <header className="relative z-10 flex items-center justify-between border-b border-white/[0.06] px-5 py-4 md:px-8">
      <div className="flex items-center gap-4"><Link href="/tools/dental-control" className="rounded-xl border border-white/[0.08] p-2 text-white/45"><ArrowLeft size={16}/></Link><div><div className="text-[10px] uppercase tracking-[0.18em] text-[#6cc8bd]">Sitora platform</div><div className="mt-1 text-[14px] font-semibold">Integration & Module Centre</div></div></div>
      <div className="hidden items-center gap-2 rounded-full border border-[#2aa89a]/20 bg-[#2aa89a]/8 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#7ed0c6] sm:flex"><Layers3 size={11}/> Built to expand</div>
    </header>

    <main className="relative z-10 mx-auto max-w-[1500px] px-5 py-7 md:px-8">
      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div><div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] text-white/38"><Boxes size={11}/> Modular SaaS architecture</div><h1 className="mt-4 max-w-4xl text-[31px] font-semibold tracking-[-0.04em] md:text-[42px]">Add capability without rebuilding the core.</h1><p className="mt-3 max-w-3xl text-[13px] leading-6 text-white/42">Sitora separates connectors, a canonical dental data model, event fabric, intelligence services and customer-facing modules. New products can plug into the same foundation.</p></div>
        <div className="rounded-3xl border border-[#2aa89a]/15 bg-[#0b211c] p-5"><div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#7fcfc5]"><Workflow size={13}/> Product principle</div><div className="mt-3 text-[17px] font-medium leading-7">Connect once. Normalise once. Let every authorised module reuse the same trusted operating data.</div><p className="mt-2 text-[10px] leading-5 text-white/35">That is what turns the prototype into a platform rather than a collection of dashboards.</p></div>
      </section>

      <section className="mt-6 grid gap-3 lg:grid-cols-5">
        {[
          { icon: PlugZap, label: "Connectors", copy: "PMS, NPHIES, imaging, finance, HR" },
          { icon: Database, label: "Canonical data", copy: "One consistent dental operating model" },
          { icon: Workflow, label: "Event fabric", copy: "Treatment, claim, record and payment events" },
          { icon: Sparkles, label: "Intelligence", copy: "Rules, analytics, AI and forecasting" },
          { icon: Layers3, label: "Modules", copy: "Commercial, governance and future products" },
        ].map(({icon: Icon,label,copy}, index) => <div key={label} className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2aa89a]/10 text-[#75cbc0]"><Icon size={15}/></div><div className="mt-3 text-[11px] font-medium">{index+1}. {label}</div><p className="mt-1 text-[9px] leading-4 text-white/30">{copy}</p>{index < 4 ? <div className="absolute -right-2.5 top-1/2 hidden h-px w-5 bg-white/10 lg:block"/> : null}</div>)}
      </section>

      <section className="mt-6 rounded-3xl border border-white/[0.07] bg-white/[0.025]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4"><div><div className="flex items-center gap-2 text-[13px] font-semibold"><CloudCog size={15} className="text-[#6cc8bd]"/> Integration health</div><div className="mt-1 text-[10px] text-white/28">Simulated prototype connectors today; replace each adapter with production integrations later</div></div><span className="rounded-full border border-white/[0.07] px-2 py-1 text-[9px] text-white/35">6 connectors</span></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[940px] text-left"><thead className="text-[9px] uppercase tracking-[0.13em] text-white/22"><tr><th className="px-5 py-3 font-medium">Source</th><th className="px-4 py-3 font-medium">Adapter</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Latency</th><th className="px-4 py-3 font-medium">Last sync</th><th className="px-4 py-3 font-medium">Volume</th><th className="px-4 py-3 font-medium">Prototype scope</th></tr></thead><tbody>{integrationHealth.map((row) => <tr key={row.name} className="border-t border-white/[0.05] text-[10px]"><td className="px-5 py-3.5 font-medium text-white/70">{row.name}</td><td className="px-4 py-3.5 text-white/42">{row.vendor}</td><td className="px-4 py-3.5"><span className={`rounded-full px-2 py-1 text-[9px] capitalize ${integrationStyle[row.status as keyof typeof integrationStyle]}`}>{row.status}</span></td><td className="px-4 py-3.5 text-white/42">{row.latency}</td><td className="px-4 py-3.5 text-white/42">{row.lastSync}</td><td className="px-4 py-3.5 text-white/48">{row.records}</td><td className="px-4 py-3.5 text-white/32">{row.scope}</td></tr>)}</tbody></table></div>
      </section>

      <section className="mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><div className="text-[10px] uppercase tracking-[0.16em] text-[#6cc8bd]">Module catalogue</div><h2 className="mt-2 text-[25px] font-semibold tracking-[-0.03em]">One core. Many products.</h2></div><div className="text-[10px] text-white/30">Active now · roadmap next · platform vision later</div></div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{platformModules.map((module) => <div key={module.name} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-[#2aa89a]/20 hover:bg-white/[0.035]"><div className="flex items-start justify-between gap-3"><div><div className="text-[10px] text-white/28">{module.category}</div><div className="mt-1 text-[13px] font-medium text-white/82">{module.name}</div></div><span className={`rounded-full border px-2 py-1 text-[8px] uppercase tracking-[0.1em] ${stateStyle[module.state as keyof typeof stateStyle]}`}>{module.state}</span></div><p className="mt-3 text-[10px] leading-5 text-white/36">{module.value}</p></div>)}</div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><ShieldCheck size={16} className="text-[#70c9be]"/><div className="mt-3 text-[12px] font-medium">Tenant and permission aware</div><p className="mt-1 text-[10px] leading-5 text-white/34">Every module is enabled per organisation and constrained by role, branch and data permissions.</p></div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><CircleDashed size={16} className="text-[#70c9be]"/><div className="mt-3 text-[12px] font-medium">Feature flagged</div><p className="mt-1 text-[10px] leading-5 text-white/34">Pilot new modules with one customer before exposing them across the wider network.</p></div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><Globe2 size={16} className="text-[#70c9be]"/><div className="mt-3 text-[12px] font-medium">Saudi first, not Saudi only</div><p className="mt-1 text-[10px] leading-5 text-white/34">Country-specific connectors and governance packs can sit above the same reusable platform core.</p></div>
      </section>
    </main>
  </div>;
}
