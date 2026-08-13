"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, ChevronDown, Command, Grid3X3, Menu, Play, ShieldCheck, Sparkles, UserRound, X } from "lucide-react";
import { dentalRoutes, orderedPitchRoutes } from "@/lib/dental-control/routes";

type DemoRole = "CEO" | "Branch Manager" | "Clinical Director" | "Insurance Team";

const roles: DemoRole[] = ["CEO", "Branch Manager", "Clinical Director", "Insurance Team"];
const groups = ["Operate", "Intelligence", "Governance", "Enterprise", "Commercial"] as const;

export function DentalControlShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<DemoRole>("CEO");
  const [demo, setDemo] = useState(true);
  const [roleOpen, setRoleOpen] = useState(false);

  useEffect(() => {
    const savedRole = window.localStorage.getItem("sitora-demo-role") as DemoRole | null;
    const savedDemo = window.localStorage.getItem("sitora-demo-mode");
    if (savedRole && roles.includes(savedRole)) setRole(savedRole);
    if (savedDemo !== null) setDemo(savedDemo === "true");
  }, []);

  function changeRole(next: DemoRole) {
    setRole(next);
    setRoleOpen(false);
    window.localStorage.setItem("sitora-demo-role", next);
  }

  function toggleDemo() {
    const next = !demo;
    setDemo(next);
    window.localStorage.setItem("sitora-demo-mode", String(next));
  }

  const pitchIndex = useMemo(() => orderedPitchRoutes.findIndex((route) => route.href === pathname), [pathname]);
  const previous = pitchIndex > 0 ? orderedPitchRoutes[pitchIndex - 1] : null;
  const next = pitchIndex >= 0 && pitchIndex < orderedPitchRoutes.length - 1 ? orderedPitchRoutes[pitchIndex + 1] : null;
  const current = dentalRoutes.find((route) => route.href === pathname);
  const isDetail = pathname.startsWith("/tools/dental-control/branch/") || pathname.startsWith("/tools/dental-control/clinician/") || pathname.startsWith("/tools/dental-control/patient/");

  return <div className="min-h-screen bg-[#071310] text-white">
    <header className="sticky top-0 z-[80] border-b border-white/[0.06] bg-[#071310]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-3 px-3 md:px-5">
        <button onClick={() => setOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/60 transition hover:bg-white/[0.06]" aria-label="Open product navigation"><Menu size={16}/></button>
        <Link href="/tools/dental-control" className="flex min-w-0 items-center gap-2.5">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#2aa89a]/25 bg-[#2aa89a]/10"><div className="h-3 w-3 rotate-45 rounded-[3px] border-2 border-[#6cc8bd]"/><div className="absolute h-1.5 w-1.5 rounded-full bg-[#c49a53]"/></div>
          <div className="hidden min-w-0 sm:block"><div className="truncate text-[12px] font-semibold">Sitora Dental Control</div><div className="truncate text-[8px] uppercase tracking-[0.17em] text-white/25">Noura Dental Group · synthetic demo</div></div>
        </Link>
        <div className="hidden h-5 w-px bg-white/[0.07] md:block"/>
        <div className="hidden min-w-0 md:block"><div className="text-[8px] uppercase tracking-[0.14em] text-white/22">Current workspace</div><div className="mt-0.5 truncate text-[10px] text-white/55">{current?.label ?? (isDetail ? "Operational drill-down" : "Sitora workspace")}</div></div>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/tools/dental-control/index" className="hidden items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[9px] text-white/45 transition hover:text-white/75 lg:flex"><Grid3X3 size={12}/> All screens</Link>
          <div className="relative hidden sm:block">
            <button onClick={() => setRoleOpen(!roleOpen)} className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[9px] text-white/55"><UserRound size={12} className="text-[#6cc8bd]"/>{role}<ChevronDown size={11}/></button>
            {roleOpen ? <div className="absolute right-0 top-11 w-44 rounded-2xl border border-white/[0.08] bg-[#0b1b17] p-1.5 shadow-2xl">{roles.map((item)=><button key={item} onClick={() => changeRole(item)} className={`w-full rounded-xl px-3 py-2 text-left text-[9px] transition ${role === item ? "bg-[#2aa89a]/12 text-[#7bd1c6]" : "text-white/45 hover:bg-white/[0.04]"}`}>{item}</button>)}</div> : null}
          </div>
          <button onClick={toggleDemo} className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[9px] font-medium transition ${demo ? "border-[#c49a53]/20 bg-[#c49a53]/[0.07] text-[#e5c88b]" : "border-white/[0.07] bg-white/[0.02] text-white/35"}`}><Play size={11}/>{demo ? "Demo on" : "Demo off"}</button>
        </div>
      </div>
    </header>

    <div className="relative">{children}</div>

    {pathname !== "/tools/dental-control/index" ? <div className="pointer-events-none fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 px-3"><div className="pointer-events-auto flex items-center gap-1 rounded-2xl border border-white/[0.08] bg-[#091813]/95 p-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">{previous ? <Link href={previous.href} className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[9px] text-white/42 transition hover:bg-white/[0.04] hover:text-white/70"><ArrowLeft size={11}/><span className="hidden sm:inline">{previous.short}</span></Link> : <div className="w-1"/>}<Link href="/tools/dental-control/demo" className="flex items-center gap-1.5 rounded-xl bg-[#2aa89a]/10 px-3 py-2 text-[9px] font-medium text-[#78cfc4]"><Sparkles size={11}/> Demo journey</Link>{next ? <Link href={next.href} className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[9px] text-white/42 transition hover:bg-white/[0.04] hover:text-white/70"><span className="hidden sm:inline">{next.short}</span><ArrowRight size={11}/></Link> : null}</div></div> : null}

    {open ? <div className="fixed inset-0 z-[100]">
      <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close navigation"/>
      <aside className="absolute inset-y-0 left-0 w-[min(92vw,390px)] overflow-y-auto border-r border-white/[0.08] bg-[#081713] p-4 shadow-2xl">
        <div className="flex items-center justify-between"><div><div className="flex items-center gap-2 text-[12px] font-semibold"><Command size={14} className="text-[#6cc8bd]"/> Product navigator</div><div className="mt-1 text-[9px] text-white/28">Everything is connected from here.</div></div><button onClick={() => setOpen(false)} className="rounded-xl border border-white/[0.07] p-2 text-white/45"><X size={15}/></button></div>
        <Link href="/tools/dental-control/index" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-between rounded-2xl border border-[#2aa89a]/16 bg-[#2aa89a]/[0.05] p-3.5"><div className="flex items-center gap-2 text-[10px] font-medium text-[#7ad0c5]"><Grid3X3 size={13}/> Open complete prototype map</div><ArrowRight size={12} className="text-[#7ad0c5]"/></Link>
        <div className="mt-5 space-y-5">{groups.map((group) => <section key={group}><div className="mb-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/22">{group}</div><div className="space-y-1">{dentalRoutes.filter((route) => route.group === group && route.href !== "/tools/dental-control/index").map((route) => <Link key={route.href} href={route.href} onClick={() => setOpen(false)} className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-[10px] transition ${pathname === route.href ? "bg-[#2aa89a]/10 text-[#7bd1c6]" : "text-white/43 hover:bg-white/[0.035] hover:text-white/70"}`}><span>{route.label}</span>{pathname === route.href ? <span className="h-1.5 w-1.5 rounded-full bg-[#6cc8bd]"/> : <ArrowRight size={10} className="text-white/16"/>}</Link>)}</div></section>)}</div>
        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5"><div className="flex items-center gap-2 text-[9px] font-medium text-white/55"><ShieldCheck size={12} className="text-[#6cc8bd]"/> Prototype controls persist</div><p className="mt-2 text-[9px] leading-5 text-white/28">Demo role and Demo Mode are stored locally so context carries between screens. Production would enforce role, tenant, branch and module scope server-side.</p></div>
      </aside>
    </div> : null}
  </div>;
}
