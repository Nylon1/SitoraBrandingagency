"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, MessageCircle, ShieldCheck, Sparkles, TrendingUp, UserRoundCheck } from "lucide-react";

const candidates = [
  { id: "P-22018", name: "Maha A.", treatment: "Crown", value: 4200, confidence: 94, reason: "Accepted 6d ago · prefers evenings", channel: "WhatsApp" },
  { id: "P-19384", name: "Omar K.", treatment: "Implant consult", value: 6800, confidence: 91, reason: "High intent · no future booking", channel: "WhatsApp" },
  { id: "P-23891", name: "Sara N.", treatment: "Root canal", value: 3100, confidence: 86, reason: "Incomplete treatment · branch nearby", channel: "SMS" },
  { id: "P-20117", name: "Fahad R.", treatment: "Aligner review", value: 5100, confidence: 82, reason: "Recent cancellation · flexible schedule", channel: "WhatsApp" },
];

const slots = [
  { id: "S-1", branch: "Jeddah Tahlia", chair: "Chair 3", clinician: "Dr Faisal Al-Zahrani", time: "Today · 17:30", duration: "60 min", value: 4200 },
  { id: "S-2", branch: "Jeddah Tahlia", chair: "Chair 5", clinician: "Dr Reem Al-Salem", time: "Tomorrow · 18:00", duration: "45 min", value: 3100 },
];

export function PatientRecoveryEngine() {
  const [slotId, setSlotId] = useState("S-1");
  const [candidateId, setCandidateId] = useState("P-22018");
  const [approved, setApproved] = useState(false);
  const [sent, setSent] = useState(false);
  const [booked, setBooked] = useState(false);

  const slot = useMemo(() => slots.find((item) => item.id === slotId) ?? slots[0], [slotId]);
  const candidate = useMemo(() => candidates.find((item) => item.id === candidateId) ?? candidates[0], [candidateId]);

  function resetFlow() {
    setApproved(false);
    setSent(false);
    setBooked(false);
  }

  return <div className="min-h-screen bg-[#071310] text-white">
    <header className="border-b border-white/[0.06] bg-[#081713]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-4 py-4 md:px-7">
        <div className="flex items-center gap-3"><Link href="/tools/dental-control/index" className="rounded-xl border border-white/[0.08] p-2.5 text-white/50"><ArrowLeft size={17}/></Link><div><div className="text-[9px] uppercase tracking-[0.17em] text-[#73cabf]">Closed-loop operations</div><div className="mt-1 text-[17px] font-semibold">Patient Recovery Engine</div></div></div>
        <span className="rounded-full border border-[#c49a53]/20 bg-[#c49a53]/8 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#e3c183]">Human approval required</span>
      </div>
    </header>

    <main className="mx-auto max-w-[1380px] px-4 py-7 md:px-7 md:py-9">
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div><div className="inline-flex items-center gap-2 rounded-full border border-[#2aa89a]/18 bg-[#2aa89a]/[0.05] px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-[#78cfc4]"><Sparkles size={12}/> Recovery intelligence</div><h1 className="mt-4 max-w-4xl text-[32px] font-semibold tracking-[-0.04em] md:text-[45px]">Turn a cancelled chair slot into a ranked recovery workflow.</h1><p className="mt-4 max-w-3xl text-[12px] leading-6 text-white/42">Sitora detects unused capacity, finds patients with legitimate treatment intent, ranks likely matches and prepares outreach. A human still approves the contact and booking workflow.</p></div>
        <div className="rounded-3xl border border-[#2aa89a]/16 bg-gradient-to-br from-[#0d2822] to-[#0a1a16] p-5"><div className="text-[10px] uppercase tracking-[0.14em] text-white/28">Modeled monthly impact</div><div className="mt-2 text-[30px] font-semibold text-[#85d8cd]">SAR 96k</div><div className="mt-1 text-[10px] text-white/34">Illustrative recovered production from refill + accepted-treatment recovery</div><div className="mt-4 grid grid-cols-3 gap-2">{[["Open slots","14"],["Matched patients","46"],["Predicted fill","63%"]].map(([a,b])=><div key={a} className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3"><div className="text-[9px] text-white/25">{a}</div><div className="mt-1 text-[15px] font-semibold">{b}</div></div>)}</div></div>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[13px] font-semibold"><Clock3 size={15} className="text-amber-200"/> Capacity signal</div><div className="mt-4 space-y-2">{slots.map((item)=><button key={item.id} onClick={()=>{setSlotId(item.id);resetFlow();}} className={`w-full rounded-2xl border p-4 text-left ${slotId===item.id?"border-[#2aa89a]/30 bg-[#2aa89a]/[0.06]":"border-white/[0.06] bg-white/[0.02]"}`}><div className="flex items-center justify-between"><div className="text-[11px] font-medium text-white/80">{item.time}</div><div className="text-[10px] font-semibold text-[#7dd1c6]">{item.duration}</div></div><div className="mt-2 text-[10px] text-white/38">{item.branch} · {item.chair}</div><div className="mt-1 text-[9px] text-white/25">{item.clinician}</div></button>)}</div></div>

          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[13px] font-semibold"><ShieldCheck size={15} className="text-[#73cabf]"/> Guardrails</div><div className="mt-4 space-y-2 text-[10px] leading-5 text-white/40">{["Only patients with an existing care relationship or valid operational basis enter the queue.","Clinical urgency is never inferred by the LLM.","Contact preferences and channel permissions are respected.","No outbound message is sent without human approval in this prototype."].map((item)=><div key={item} className="flex gap-2"><CheckCircle2 size={12} className="mt-1 shrink-0 text-[#6fc9be]"/>{item}</div>)}</div></div>
        </div>

        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5">
          <div className="flex items-center justify-between"><div><div className="text-[13px] font-semibold">Ranked patient matches</div><div className="mt-1 text-[10px] text-white/28">For {slot.time} · {slot.chair}</div></div><span className="rounded-full border border-white/[0.07] px-2 py-1 text-[9px] text-white/35">Synthetic demo</span></div>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">{candidates.map((item)=><button key={item.id} onClick={()=>{setCandidateId(item.id);resetFlow();}} className={`rounded-2xl border p-4 text-left ${candidateId===item.id?"border-[#2aa89a]/30 bg-[#2aa89a]/[0.055]":"border-white/[0.055] bg-white/[0.02]"}`}><div className="flex items-start justify-between"><div><div className="text-[11px] font-medium text-white/80">{item.name}</div><div className="mt-1 text-[9px] text-white/28">{item.id} · {item.treatment}</div></div><div className="text-[12px] font-semibold text-[#7dd1c6]">{item.confidence}%</div></div><div className="mt-3 text-[10px] leading-5 text-white/38">{item.reason}</div><div className="mt-3 flex items-center justify-between"><span className="rounded-full border border-white/[0.06] px-2 py-1 text-[8px] text-white/30">{item.channel}</span><span className="text-[10px] font-medium text-white/65">SAR {item.value.toLocaleString()}</span></div></button>)}</div>

          <div className="mt-5 rounded-3xl border border-[#c49a53]/16 bg-[#c49a53]/[0.035] p-5"><div className="flex items-center justify-between"><div><div className="text-[10px] uppercase tracking-[0.14em] text-[#e3c183]">Prepared workflow</div><div className="mt-1 text-[13px] font-semibold">{candidate.name} · {candidate.treatment}</div></div><TrendingUp size={18} className="text-[#e3c183]"/></div><div className="mt-4 rounded-2xl border border-white/[0.06] bg-[#071310]/55 p-4"><div className="flex items-center gap-2 text-[10px] text-[#79cfc5]"><MessageCircle size={13}/> Message preview</div><p className="mt-3 text-[11px] leading-6 text-white/52">Hello {candidate.name.split(" ")[0]}, Noura Dental Group has an appointment available with your care team at {slot.time.toLowerCase()}. If you would like us to reserve it for you, please reply YES. No clinical information is included in this message.</p></div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <button onClick={()=>setApproved(true)} className={`rounded-xl border px-3 py-2.5 text-[10px] font-semibold ${approved?"border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-200":"border-white/[0.07] bg-white/[0.03] text-white/60"}`}><UserRoundCheck size={13} className="mr-1.5 inline"/>{approved?"Approved":"Approve outreach"}</button>
              <button disabled={!approved} onClick={()=>setSent(true)} className={`rounded-xl px-3 py-2.5 text-[10px] font-semibold ${approved?"bg-[#2aa89a] text-[#04110f]":"cursor-not-allowed bg-white/[0.05] text-white/20"}`}>{sent?"Message sent":"Send message"}</button>
              <button disabled={!sent} onClick={()=>setBooked(true)} className={`rounded-xl border px-3 py-2.5 text-[10px] font-semibold ${sent?"border-[#c49a53]/25 bg-[#c49a53]/[0.07] text-[#e3c183]":"cursor-not-allowed border-white/[0.05] text-white/20"}`}>{booked?"Slot recovered":"Simulate YES + book"}</button>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.055] bg-white/[0.02] p-3"><div><div className="text-[9px] text-white/24">Workflow status</div><div className="mt-1 text-[11px] font-medium text-white/70">{booked?"Recovered and booked":sent?"Awaiting patient response":approved?"Approved for outreach":"Awaiting human approval"}</div></div><div className={`h-2.5 w-2.5 rounded-full ${booked?"bg-emerald-300":sent?"bg-cyan-300":approved?"bg-amber-300":"bg-white/20"}`}/></div>
          </div>
        </div>
      </section>
    </main>
  </div>;
}
