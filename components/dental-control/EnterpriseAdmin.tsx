"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronRight, CircleDot, Flag, KeyRound, LockKeyhole, Settings2, ShieldCheck, SlidersHorizontal, UserCog, UsersRound } from "lucide-react";

type UserRow = { id: string; name: string; email: string; role: string; branches: string[]; status: "Active" | "Invited"; lastSeen: string };
type AuditRow = { time: string; actor: string; action: string; target: string; result: string };

const initialUsers: UserRow[] = [
  { id: "u1", name: "Dr Lina Al-Harbi", email: "lina@noura.demo", role: "CEO", branches: ["All branches"], status: "Active", lastSeen: "2 min ago" },
  { id: "u2", name: "Omar Al-Qahtani", email: "omar@noura.demo", role: "Branch Manager", branches: ["Jeddah Tahlia"], status: "Active", lastSeen: "18 min ago" },
  { id: "u3", name: "Maha Al-Zahrani", email: "maha@noura.demo", role: "Insurance Team", branches: ["Jeddah Tahlia", "Jeddah Corniche"], status: "Active", lastSeen: "7 min ago" },
  { id: "u4", name: "Dr Reem Al-Salem", email: "reem@noura.demo", role: "Clinical Director", branches: ["All branches"], status: "Active", lastSeen: "42 min ago" },
  { id: "u5", name: "Dr Faisal Al-Zahrani", email: "faisal@noura.demo", role: "Dentist", branches: ["Jeddah Tahlia"], status: "Active", lastSeen: "1 h ago" },
  { id: "u6", name: "Sara Al-Mutairi", email: "sara@noura.demo", role: "Finance", branches: ["All branches"], status: "Invited", lastSeen: "Never" },
];

const roles = [
  { role: "CEO", scope: "Group", permissions: ["Executive metrics", "Board pack", "Actions", "Ask Sitora", "Commercial"] },
  { role: "Branch Manager", scope: "Assigned branches", permissions: ["Branch metrics", "Team actions", "Recovery", "Local claims summary"] },
  { role: "Insurance Team", scope: "Assigned branches", permissions: ["Claims", "Payer data", "Claim actions", "Minimum patient identifiers"] },
  { role: "Clinical Director", scope: "Group clinical", permissions: ["Record Guardian", "Governance", "Clinician context", "Review actions"] },
  { role: "Dentist", scope: "Self", permissions: ["Own tasks", "Own records", "Own performance context"] },
];

const modules = [
  { id: "control", name: "Control Tower", enabled: true, tier: "Core" },
  { id: "revenue", name: "Revenue Intelligence", enabled: true, tier: "Core" },
  { id: "claims", name: "Claims Intelligence", enabled: true, tier: "Core" },
  { id: "guardian", name: "Record Guardian", enabled: true, tier: "Core" },
  { id: "copilot", name: "Ask Sitora", enabled: true, tier: "Intelligence" },
  { id: "recovery", name: "Patient Recovery", enabled: true, tier: "Growth" },
  { id: "scribe", name: "AI Scribe", enabled: false, tier: "Future" },
  { id: "procurement", name: "Procurement Intelligence", enabled: false, tier: "Future" },
];

const initialAudit: AuditRow[] = [
  { time: "10:42", actor: "System", action: "Role policy evaluated", target: "u5 · Dentist", result: "Allowed own-record scope" },
  { time: "10:31", actor: "Dr Lina Al-Harbi", action: "Opened board pack", target: "Group · August 2026", result: "Allowed" },
  { time: "10:21", actor: "Maha Al-Zahrani", action: "Viewed claim exception", target: "CLM-24018", result: "Allowed · assigned branch" },
  { time: "10:14", actor: "Omar Al-Qahtani", action: "Attempted group comparison", target: "All branches", result: "Blocked · branch scope" },
  { time: "09:58", actor: "Dr Reem Al-Salem", action: "Resolved governance check", target: "REC-JED-481", result: "Allowed" },
];

export function EnterpriseAdmin() {
  const [tab, setTab] = useState<"users" | "roles" | "modules" | "audit" | "org">("users");
  const [users, setUsers] = useState(initialUsers);
  const [moduleState, setModuleState] = useState(modules);
  const [audit, setAudit] = useState(initialAudit);
  const [selectedUser, setSelectedUser] = useState("u2");
  const activeUser = useMemo(() => users.find((u) => u.id === selectedUser) ?? users[0], [users, selectedUser]);

  const assignRole = (role: string) => {
    setUsers((rows) => rows.map((u) => u.id === activeUser.id ? { ...u, role } : u));
    setAudit((rows) => [{ time: "Now", actor: "Demo Admin", action: "Changed role", target: `${activeUser.name} → ${role}`, result: "Saved in demo state" }, ...rows]);
  };

  const toggleModule = (id: string) => {
    setModuleState((rows) => rows.map((m) => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const tabs = [
    ["users", "Users & scope", UsersRound],
    ["roles", "Roles & permissions", KeyRound],
    ["modules", "Modules", Flag],
    ["audit", "Audit log", ShieldCheck],
    ["org", "Organisation", Settings2],
  ] as const;

  return <div className="min-h-screen bg-[#071310] text-white">
    <header className="border-b border-white/[0.06] bg-[#081713]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 md:px-7"><div className="flex items-center gap-3"><Link href="/tools/dental-control/index" className="rounded-xl border border-white/[0.08] p-2.5 text-white/50"><ArrowLeft size={17}/></Link><div><div className="text-[10px] uppercase tracking-[0.17em] text-[#73cabf]">Enterprise administration</div><div className="mt-1 text-[17px] font-semibold">Noura Dental Group · Access & Configuration</div></div></div><div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1.5 text-[9px] text-emerald-200 sm:flex"><LockKeyhole size={11}/> Tenant isolated · demo</div></div></header>

    <main className="mx-auto max-w-[1440px] px-4 py-7 md:px-7">
      <div className="grid gap-5 xl:grid-cols-[250px_1fr]">
        <aside className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-3 h-fit">
          <div className="px-3 py-3"><div className="text-[9px] uppercase tracking-[0.15em] text-white/25">Administration</div><div className="mt-1 text-[13px] font-semibold">Enterprise controls</div></div>
          <div className="space-y-1">{tabs.map(([id,label,Icon]) => <button key={id} onClick={() => setTab(id)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[10px] transition ${tab===id ? "bg-[#2aa89a]/12 text-[#8dd8cf]" : "text-white/42 hover:bg-white/[0.035]"}`}><span className="flex items-center gap-2"><Icon size={13}/>{label}</span><ChevronRight size={11}/></button>)}</div>
          <div className="mt-5 rounded-2xl border border-[#c49a53]/13 bg-[#c49a53]/[0.03] p-3 text-[9px] leading-5 text-white/34">Prototype controls are local UI state only. Production writes require authenticated admin permissions, audit logging and server-side policy enforcement.</div>
        </aside>

        <section>
          <div className="mb-5"><div className="inline-flex items-center gap-2 rounded-full border border-[#2aa89a]/16 bg-[#2aa89a]/[0.045] px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-[#78cfc4]"><UserCog size={12}/> Governance plane</div><h1 className="mt-3 text-[30px] font-semibold tracking-[-0.04em] md:text-[38px]">Configure who can see what, where, and why.</h1><p className="mt-2 max-w-3xl text-[11px] leading-6 text-white/38">Enterprise administration sits above every Sitora module. Roles define capability, memberships define branch scope, feature flags define product access, and audit events create accountability.</p></div>

          {tab === "users" ? <div className="grid gap-5 2xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] overflow-hidden"><div className="border-b border-white/[0.06] px-5 py-4"><div className="text-[13px] font-semibold">Users and branch scope</div><div className="mt-1 text-[9px] text-white/28">Synthetic enterprise identities</div></div><div className="divide-y divide-white/[0.045]">{users.map((u) => <button key={u.id} onClick={() => setSelectedUser(u.id)} className={`grid w-full grid-cols-[1fr_auto] gap-4 px-5 py-4 text-left transition ${selectedUser===u.id ? "bg-[#2aa89a]/[0.055]" : "hover:bg-white/[0.025]"}`}><div><div className="text-[11px] font-medium text-white/80">{u.name}</div><div className="mt-1 text-[9px] text-white/28">{u.email}</div><div className="mt-2 flex flex-wrap gap-1.5">{u.branches.map(b=><span key={b} className="rounded-full border border-white/[0.06] px-2 py-0.5 text-[8px] text-white/35">{b}</span>)}</div></div><div className="text-right"><div className="text-[10px] text-[#78cfc4]">{u.role}</div><div className="mt-1 text-[8px] text-white/25">{u.status} · {u.lastSeen}</div></div></button>)}</div></div>
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="text-[10px] uppercase tracking-[0.15em] text-white/25">Selected identity</div><div className="mt-2 text-[17px] font-semibold">{activeUser.name}</div><div className="mt-1 text-[10px] text-white/32">{activeUser.email}</div><div className="mt-5 text-[9px] uppercase tracking-[0.13em] text-white/25">Role</div><div className="mt-2 grid gap-2">{["CEO","Branch Manager","Insurance Team","Clinical Director","Dentist"].map(role=><button key={role} onClick={()=>assignRole(role)} className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-[10px] ${activeUser.role===role ? "border-[#2aa89a]/25 bg-[#2aa89a]/[0.07] text-[#86d5cb]" : "border-white/[0.06] text-white/38"}`}><span>{role}</span>{activeUser.role===role?<Check size={12}/>:null}</button>)}</div><div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"><div className="text-[9px] text-white/25">Effective scope</div><div className="mt-2 text-[11px] text-white/65">{activeUser.branches.join(", ")}</div><div className="mt-2 text-[9px] leading-5 text-white/30">Production policy = role permissions ∩ organisation membership ∩ branch assignment ∩ module entitlement.</div></div></div>
          </div> : null}

          {tab === "roles" ? <div className="grid gap-4 xl:grid-cols-2">{roles.map(r=><div key={r.role} className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><div><div className="text-[14px] font-semibold">{r.role}</div><div className="mt-1 text-[9px] text-white/28">Default scope · {r.scope}</div></div><div className="rounded-xl border border-white/[0.06] p-2 text-[#78cfc4]"><KeyRound size={15}/></div></div><div className="mt-4 flex flex-wrap gap-2">{r.permissions.map(p=><span key={p} className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[8px] text-white/38">{p}</span>)}</div></div>)}</div> : null}

          {tab === "modules" ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{moduleState.map(m=><div key={m.id} className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-start justify-between gap-4"><div><div className="text-[13px] font-semibold">{m.name}</div><div className="mt-1 text-[9px] text-white/27">{m.tier} module</div></div><button onClick={()=>toggleModule(m.id)} className={`relative h-6 w-11 rounded-full transition ${m.enabled ? "bg-[#2aa89a]" : "bg-white/[0.08]"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${m.enabled ? "left-6" : "left-1"}`}/></button></div><div className={`mt-5 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[8px] ${m.enabled ? "border-emerald-400/15 bg-emerald-400/[0.04] text-emerald-200" : "border-white/[0.06] text-white/25"}`}><CircleDot size={9}/>{m.enabled?"Enabled for tenant":"Not enabled"}</div></div>)}</div> : null}

          {tab === "audit" ? <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] overflow-hidden"><div className="border-b border-white/[0.06] px-5 py-4"><div className="text-[13px] font-semibold">Access and configuration audit</div><div className="mt-1 text-[9px] text-white/28">Demo event trail</div></div><div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left"><thead className="text-[8px] uppercase tracking-[0.13em] text-white/22"><tr><th className="px-5 py-3 font-medium">Time</th><th className="px-4 py-3 font-medium">Actor</th><th className="px-4 py-3 font-medium">Action</th><th className="px-4 py-3 font-medium">Target</th><th className="px-4 py-3 font-medium">Result</th></tr></thead><tbody>{audit.map((row,i)=><tr key={`${row.time}-${i}`} className="border-t border-white/[0.045] text-[9px]"><td className="px-5 py-3 text-white/30">{row.time}</td><td className="px-4 py-3 text-white/58">{row.actor}</td><td className="px-4 py-3 text-white/45">{row.action}</td><td className="px-4 py-3 text-white/42">{row.target}</td><td className={`px-4 py-3 ${row.result.startsWith("Blocked") ? "text-amber-200" : "text-emerald-200/70"}`}>{row.result}</td></tr>)}</tbody></table></div></div> : null}

          {tab === "org" ? <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]"><div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="flex items-center gap-2 text-[13px] font-semibold"><Settings2 size={15} className="text-[#78cfc4]"/> Organisation settings</div><div className="mt-5 grid gap-3 md:grid-cols-2">{[["Organisation","Noura Dental Group"],["Tenant ID","noura-sa-demo"],["Home market","Saudi Arabia"],["Currency","SAR"],["Language framework","English / العربية"],["Data mode","Synthetic prototype"]].map(([a,b])=><div key={a} className="rounded-2xl border border-white/[0.055] bg-white/[0.02] p-4"><div className="text-[8px] uppercase tracking-[0.12em] text-white/22">{a}</div><div className="mt-2 text-[11px] text-white/65">{b}</div></div>)}</div></div><div className="rounded-3xl border border-[#2aa89a]/16 bg-[#2aa89a]/[0.035] p-5"><div className="flex items-center gap-2 text-[12px] font-semibold text-[#84d4ca]"><SlidersHorizontal size={14}/> Production control plane</div><div className="mt-4 space-y-3">{["Supabase Auth / enterprise SSO", "Organisation memberships", "Row-level security", "Module entitlements", "Feature flags", "Immutable audit events"].map(x=><div key={x} className="flex items-center gap-2 text-[10px] text-white/42"><Check size={11} className="text-[#73cabf]"/>{x}</div>)}</div><p className="mt-5 text-[9px] leading-5 text-white/28">These are the intended production controls. The prototype does not claim certified deployment or live Saudi health-data integration.</p></div></div> : null}
        </section>
      </div>
    </main>
  </div>;
}
