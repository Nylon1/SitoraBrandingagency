"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Database, FileCheck2, LockKeyhole, Network, PlugZap, ShieldCheck, Sparkles } from "lucide-react";

const steps = [
  { id: 1, title: "Organisation", copy: "Confirm group and branches" },
  { id: 2, title: "Systems", copy: "Select source systems" },
  { id: 3, title: "Data scope", copy: "Choose minimum fields" },
  { id: 4, title: "Validation", copy: "Map and reconcile" },
  { id: 5, title: "Go live", copy: "Enable intelligence modules" },
];

const systems = [
  { id: "pms", name: "Dental PMS / EMR", detail: "Appointments, treatments, clinicians, patient identifiers", icon: Database },
  { id: "nphies", name: "NPHIES workflow", detail: "Claims and authorisation status feed", icon: Network },
  { id: "imaging", name: "Imaging metadata", detail: "Study references and availability only for this prototype", icon: FileCheck2 },
  { id: "finance", name: "Finance / payments", detail: "Collections, invoices and settlement references", icon: PlugZap },
];

const fields = [
  "Branch and chair identifiers",
  "Appointment status and duration",
  "Treatment-plan status and value",
  "Claims status and exception reason",
  "Payment / collection status",
  "Clinical-record completeness signals",
];

export function IntegrationOnboarding() {
  const [step, setStep] = useState(1);
  const [selectedSystems, setSelectedSystems] = useState(["pms", "nphies", "finance"]);
  const [enabledModules, setEnabledModules] = useState(["Control Tower", "Revenue Intelligence", "Claims Intelligence", "Record Guardian"]);

  function toggleSystem(id: string) {
    setSelectedSystems((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return <div className="min-h-screen bg-[#071310] text-white">
    <header className="border-b border-white/[0.06] bg-[#081713]/90"><div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-4 md:px-7"><Link href="/tools/dental-control/platform" className="rounded-xl border border-white/[0.08] p-2.5 text-white/50"><ArrowLeft size={17}/></Link><div><div className="text-[10px] uppercase tracking-[0.17em] text-[#73cabf]">Pilot setup simulator</div><div className="mt-1 text-[16px] font-semibold">Connect a Saudi dental group</div></div></div></header>

    <main className="mx-auto max-w-[1280px] px-4 py-7 md:px-7 md:py-9">
      <section className="max-w-3xl"><div className="text-[10px] uppercase tracking-[0.18em] text-[#6cc8bd]">Implementation experience</div><h1 className="mt-2 text-[31px] font-semibold tracking-[-0.04em] md:text-[40px]">Make deployment feel controlled, modular and low disruption.</h1><p className="mt-3 text-[12px] leading-6 text-white/40">This simulated onboarding flow shows a prospective customer how Sitora would connect to existing systems without forcing a PMS replacement.</p></section>

      <div className="mt-7 grid gap-2 md:grid-cols-5">{steps.map((item)=><button key={item.id} onClick={()=>setStep(item.id)} className={`rounded-2xl border p-3 text-left transition ${step===item.id?"border-[#2aa89a]/25 bg-[#2aa89a]/[0.06]":"border-white/[0.06] bg-white/[0.02]"}`}><div className="flex items-center gap-2"><div className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold ${step>=item.id?"bg-[#2aa89a]/15 text-[#7bd0c5]":"bg-white/[0.04] text-white/25"}`}>{step>item.id?<CheckCircle2 size={12}/>:item.id}</div><div className="text-[10px] font-medium text-white/65">{item.title}</div></div><div className="mt-2 text-[9px] text-white/24">{item.copy}</div></button>)}</div>

      <section className="mt-5 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 md:p-6">
        {step===1?<OrganisationStep/>:null}
        {step===2?<SystemsStep selected={selectedSystems} toggle={toggleSystem}/>:null}
        {step===3?<DataScopeStep/>:null}
        {step===4?<ValidationStep/>:null}
        {step===5?<GoLiveStep enabled={enabledModules} setEnabled={setEnabledModules}/>:null}

        <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5"><button disabled={step===1} onClick={()=>setStep((value)=>Math.max(1,value-1))} className="rounded-xl border border-white/[0.07] px-4 py-2.5 text-[10px] text-white/45 disabled:opacity-25">Back</button><button disabled={step===5} onClick={()=>setStep((value)=>Math.min(5,value+1))} className="flex items-center gap-2 rounded-xl bg-[#2aa89a] px-4 py-2.5 text-[10px] font-semibold text-[#04110f] disabled:opacity-35">Continue <ArrowRight size={12}/></button></div>
      </section>

      <section className="mt-5 grid gap-3 md:grid-cols-3"><Trust icon={<LockKeyhole size={15}/>} title="Data minimisation" copy="Only the fields required for enabled modules are mapped into the canonical layer."/><Trust icon={<ShieldCheck size={15}/>} title="Role-based access" copy="Finance, clinical and executive users receive different views and permissions."/><Trust icon={<Sparkles size={15}/>} title="Prototype disclosure" copy="All connectors and patient records shown here are simulated; production integration requires formal validation."/></section>
    </main>
  </div>;
}

function OrganisationStep(){return <div><StepTitle number="01" title="Confirm the operating footprint" copy="The organisation and branch model becomes the tenant boundary for reporting, permissions and later benchmarking."/><div className="mt-5 grid gap-3 md:grid-cols-3"><Card title="Noura Dental Group" sub="Enterprise tenant"/><Card title="8 branches" sub="Riyadh · Jeddah · Eastern Province · Madinah"/><Card title="54 clinicians / 38 chairs" sub="Synthetic pilot footprint"/></div></div>}

function SystemsStep({selected,toggle}:{selected:string[];toggle:(id:string)=>void}){return <div><StepTitle number="02" title="Choose the systems Sitora will listen to" copy="Each connector publishes normalised events into Sitora rather than forcing every module to integrate independently."/><div className="mt-5 grid gap-3 md:grid-cols-2">{systems.map(({id,name,detail,icon:Icon})=><button key={id} onClick={()=>toggle(id)} className={`rounded-2xl border p-4 text-left transition ${selected.includes(id)?"border-[#2aa89a]/25 bg-[#2aa89a]/[0.05]":"border-white/[0.06] bg-white/[0.02]"}`}><div className="flex items-start gap-3"><div className="rounded-xl bg-white/[0.04] p-2 text-[#73cabf]"><Icon size={16}/></div><div className="flex-1"><div className="flex items-center justify-between"><div className="text-[11px] font-medium text-white/75">{name}</div>{selected.includes(id)?<CheckCircle2 size={14} className="text-[#79cfc5]"/>:null}</div><div className="mt-1 text-[9px] leading-4 text-white/30">{detail}</div></div></div></button>)}</div></div>}

function DataScopeStep(){return <div><StepTitle number="03" title="Map the minimum useful data" copy="This is intentionally narrow. Sitora should not ingest full clinical content where the module only needs an event or completeness signal."/><div className="mt-5 grid gap-2 md:grid-cols-2">{fields.map((field)=><div key={field} className="flex items-center gap-3 rounded-xl border border-white/[0.055] bg-white/[0.02] p-3 text-[10px] text-white/48"><CheckCircle2 size={13} className="text-[#72c9be]"/>{field}</div>)}</div></div>}

function ValidationStep(){const checks=["Branch IDs reconcile with tenant structure","Clinicians map to branch and role","Treatment totals reconcile to dashboard values","Claims exception counts reconcile to exposure","No production patient data used in prototype"];return <div><StepTitle number="04" title="Validate before intelligence is switched on" copy="Production connectors need reconciliation tests and an exception queue before the group can trust executive outputs."/><div className="mt-5 space-y-2">{checks.map((check)=><div key={check} className="flex items-center justify-between rounded-xl border border-white/[0.055] bg-white/[0.02] p-3"><div className="flex items-center gap-3 text-[10px] text-white/50"><CheckCircle2 size={13} className="text-emerald-300"/>{check}</div><span className="text-[9px] text-emerald-200/70">Passed</span></div>)}</div></div>}

function GoLiveStep({enabled,setEnabled}:{enabled:string[];setEnabled:(items:string[])=>void}){const modules=["Control Tower","Revenue Intelligence","Claims Intelligence","Record Guardian","Action Centre","Ask Sitora"];function toggle(name:string){setEnabled(enabled.includes(name)?enabled.filter(item=>item!==name):[...enabled,name])}return <div><StepTitle number="05" title="Enable modules by customer need" copy="The same platform can launch with four modules and add the rest later without rebuilding connector plumbing."/><div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{modules.map(name=><button key={name} onClick={()=>toggle(name)} className={`rounded-2xl border p-4 text-left ${enabled.includes(name)?"border-[#2aa89a]/25 bg-[#2aa89a]/[0.05]":"border-white/[0.06] bg-white/[0.02]"}`}><div className="flex items-center justify-between"><div className="text-[11px] font-medium text-white/70">{name}</div>{enabled.includes(name)?<CheckCircle2 size={14} className="text-[#79cfc5]"/>:null}</div><div className="mt-2 text-[9px] text-white/25">{enabled.includes(name)?"Enabled for pilot":"Available to add later"}</div></button>)}</div><div className="mt-5 rounded-2xl border border-[#c49a53]/14 bg-[#c49a53]/[0.035] p-4 text-[10px] leading-5 text-white/42"><span className="font-semibold text-[#e4c386]">Pilot principle:</span> start with the modules that prove commercial and governance value, then expand once data quality and user adoption are proven.</div></div>}

function StepTitle({number,title,copy}:{number:string;title:string;copy:string}){return <div><div className="text-[9px] uppercase tracking-[0.15em] text-[#73cabf]">Step {number}</div><div className="mt-2 text-[20px] font-semibold tracking-[-0.025em]">{title}</div><p className="mt-2 max-w-3xl text-[10px] leading-5 text-white/34">{copy}</p></div>}
function Card({title,sub}:{title:string;sub:string}){return <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"><div className="text-[12px] font-medium text-white/70">{title}</div><div className="mt-1 text-[9px] text-white/26">{sub}</div></div>}
function Trust({icon,title,copy}:{icon:React.ReactNode;title:string;copy:string}){return <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"><div className="flex items-center gap-2 text-[10px] font-medium text-white/60"><span className="text-[#73cabf]">{icon}</span>{title}</div><p className="mt-2 text-[9px] leading-4 text-white/27">{copy}</p></div>}
