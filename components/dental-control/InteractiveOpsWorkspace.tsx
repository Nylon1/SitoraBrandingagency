"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Clock3,
  Languages,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";

type TaskStatus = "Open" | "Assigned" | "In progress" | "Resolved";
type Priority = "Critical" | "High" | "Medium";

type Task = {
  id: string;
  title: string;
  category: string;
  branch: string;
  impact: string;
  priority: Priority;
  owner: string;
  status: TaskStatus;
  due: string;
};

const initialTasks: Task[] = [
  { id: "ACT-201", title: "Resolve repeated Jeddah claim-support pattern", category: "Claims", branch: "Jeddah Tahlia", impact: "SAR 41,600", priority: "Critical", owner: "Insurance Team", status: "Assigned", due: "Today" },
  { id: "ACT-202", title: "Recover accepted treatment not yet booked", category: "Revenue", branch: "Jeddah Tahlia", impact: "SAR 137,400", priority: "High", owner: "Patient Coordinator", status: "In progress", due: "Today" },
  { id: "ACT-203", title: "Review Chair 3 under-utilisation", category: "Operations", branch: "Jeddah Tahlia", impact: "SAR 34,000/mo", priority: "High", owner: "Branch Manager", status: "Open", due: "24h" },
  { id: "ACT-204", title: "Complete 17 overdue clinical records", category: "Governance", branch: "Group", impact: "17 records", priority: "High", owner: "Clinical Leads", status: "Assigned", due: "Today" },
  { id: "ACT-205", title: "Review Riyadh North high-conversion workflow", category: "Benchmarking", branch: "Riyadh North", impact: "+11% acceptance", priority: "Medium", owner: "COO", status: "Open", due: "This week" },
];

const owners = ["Insurance Team", "Patient Coordinator", "Branch Manager", "Clinical Leads", "COO", "Regional Director"];
const statuses: TaskStatus[] = ["Open", "Assigned", "In progress", "Resolved"];

const copy = {
  en: {
    eyebrow: "Action centre",
    title: "Turn intelligence into accountable action.",
    body: "This prototype keeps the workflow visible after Sitora detects a problem. Every signal can be owned, progressed and closed so leadership can see whether insight actually changed the outcome.",
    open: "Open work",
    resolved: "Resolved",
    risk: "Impact in motion",
    activity: "Decision activity",
  },
  ar: {
    eyebrow: "مركز الإجراءات",
    title: "حوّل الذكاء إلى إجراءات قابلة للمساءلة.",
    body: "يُبقي هذا النموذج سير العمل واضحاً بعد اكتشاف المشكلة. يمكن تعيين كل إشارة ومتابعتها وإغلاقها حتى ترى الإدارة ما إذا كانت الرؤية قد غيّرت النتيجة فعلاً.",
    open: "العمل المفتوح",
    resolved: "مكتمل",
    risk: "الأثر قيد المعالجة",
    activity: "نشاط القرارات",
  },
};

const priorityClass: Record<Priority, string> = {
  Critical: "border-rose-400/20 bg-rose-400/[0.06] text-rose-200",
  High: "border-amber-400/20 bg-amber-400/[0.06] text-amber-200",
  Medium: "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-100",
};

export function InteractiveOpsWorkspace() {
  const [tasks, setTasks] = useState(initialTasks);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [selected, setSelected] = useState(initialTasks[0].id);
  const selectedTask = tasks.find((task) => task.id === selected) ?? tasks[0];
  const t = copy[language];
  const rtl = language === "ar";

  const stats = useMemo(() => ({
    open: tasks.filter((task) => task.status !== "Resolved").length,
    resolved: tasks.filter((task) => task.status === "Resolved").length,
    critical: tasks.filter((task) => task.priority === "Critical" && task.status !== "Resolved").length,
  }), [tasks]);

  function updateTask(id: string, patch: Partial<Task>) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, ...patch } : task));
  }

  return (
    <div className="min-h-screen bg-[#071310] text-white" dir={rtl ? "rtl" : "ltr"}>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(42,168,154,0.10),transparent_30%),radial-gradient(circle_at_15%_90%,rgba(196,154,83,0.07),transparent_24%)]" />
      <header className="relative border-b border-white/[0.06] bg-[#081713]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 md:px-7">
          <div className="flex items-center gap-3">
            <Link href="/tools/dental-control" className="rounded-xl border border-white/[0.08] p-2.5 text-white/50"><ArrowLeft size={17}/></Link>
            <div><div className="text-[10px] uppercase tracking-[0.17em] text-[#73cabf]">{t.eyebrow}</div><div className="mt-1 text-[16px] font-semibold">Sitora Dental Control</div></div>
          </div>
          <button onClick={() => setLanguage((value) => value === "en" ? "ar" : "en")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] text-white/60"><Languages size={14}/>{language === "en" ? "العربية" : "English"}</button>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1440px] px-4 py-7 md:px-7 md:py-9">
        <section className="flex flex-wrap items-end justify-between gap-5">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6cc8bd]">{t.eyebrow}</div><h1 className="mt-2 max-w-4xl text-[30px] font-semibold tracking-[-0.04em] md:text-[40px]">{t.title}</h1><p className="mt-3 max-w-3xl text-[12px] leading-6 text-white/40">{t.body}</p></div>
          <div className="rounded-2xl border border-[#2aa89a]/18 bg-[#2aa89a]/[0.05] px-4 py-3"><div className="flex items-center gap-2 text-[10px] text-[#7acdc3]"><Sparkles size={13}/> Live prototype state</div><div className="mt-1 text-[18px] font-semibold">{stats.open} active actions</div></div>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label={t.open} value={`${stats.open}`} sub="Across claims, revenue, governance and operations" icon={<CircleDot size={16}/>} />
          <Stat label={t.resolved} value={`${stats.resolved}`} sub="Closed during this demo session" icon={<CheckCircle2 size={16}/>} />
          <Stat label={t.risk} value={`${stats.critical} critical`} sub="Highest urgency remains claims-related" icon={<ShieldCheck size={16}/>} />
        </section>

        <section className="mt-5 grid gap-5 2xl:grid-cols-[1.25fr_0.75fr]">
          <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025]">
            <div className="border-b border-white/[0.06] px-5 py-4"><div className="text-[13px] font-semibold">Action work queue</div><div className="mt-1 text-[10px] text-white/28">Click a task, change owner and move the workflow through states.</div></div>
            <div className="divide-y divide-white/[0.045]">
              {tasks.map((task) => (
                <button key={task.id} onClick={() => setSelected(task.id)} className={`grid w-full gap-3 px-5 py-4 text-left transition lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.55fr] ${selected === task.id ? "bg-[#2aa89a]/[0.045]" : "hover:bg-white/[0.025]"}`}>
                  <div><div className="flex items-center gap-2"><span className={`rounded-full border px-2 py-1 text-[8px] uppercase tracking-[0.11em] ${priorityClass[task.priority]}`}>{task.priority}</span><span className="text-[9px] text-white/24">{task.id}</span></div><div className="mt-2 text-[11px] font-medium text-white/80">{task.title}</div><div className="mt-1 text-[9px] text-white/27">{task.category} · {task.branch}</div></div>
                  <div><div className="text-[9px] text-white/24">Owner</div><div className="mt-1 text-[10px] text-white/55">{task.owner}</div></div>
                  <div><div className="text-[9px] text-white/24">Status</div><div className="mt-1 text-[10px] text-white/55">{task.status}</div></div>
                  <div><div className="text-[9px] text-white/24">Impact</div><div className="mt-1 text-[10px] font-medium text-[#79cfc5]">{task.impact}</div></div>
                </button>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-[#2aa89a]/16 bg-gradient-to-br from-[#0d2822] to-[#0a1a16] p-5">
            <div className="flex items-center justify-between"><div><div className="text-[10px] uppercase tracking-[0.14em] text-[#76cabf]">Selected action</div><div className="mt-2 text-[16px] font-semibold">{selectedTask.id}</div></div><span className={`rounded-full border px-2 py-1 text-[8px] uppercase tracking-[0.11em] ${priorityClass[selectedTask.priority]}`}>{selectedTask.priority}</span></div>
            <div className="mt-4 text-[14px] font-medium leading-6 text-white/86">{selectedTask.title}</div>
            <div className="mt-5 grid grid-cols-2 gap-3"><Meta label="Branch" value={selectedTask.branch}/><Meta label="Due" value={selectedTask.due}/><Meta label="Impact" value={selectedTask.impact}/><Meta label="Category" value={selectedTask.category}/></div>

            <div className="mt-5"><label className="text-[9px] uppercase tracking-[0.13em] text-white/25">Assign owner</label><div className="relative mt-2"><select value={selectedTask.owner} onChange={(event) => updateTask(selectedTask.id, { owner: event.target.value, status: selectedTask.status === "Open" ? "Assigned" : selectedTask.status })} className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#0a1815] px-3 py-2.5 pr-8 text-[10px] text-white/70 outline-none"><>{owners.map((owner) => <option key={owner} value={owner}>{owner}</option>)}</></select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-3 text-white/30"/></div></div>

            <div className="mt-4"><label className="text-[9px] uppercase tracking-[0.13em] text-white/25">Workflow status</label><div className="mt-2 grid grid-cols-2 gap-2">{statuses.map((status) => <button key={status} onClick={() => updateTask(selectedTask.id, { status })} className={`rounded-xl border px-3 py-2 text-[9px] transition ${selectedTask.status === status ? "border-[#2aa89a]/30 bg-[#2aa89a]/10 text-[#82d2c8]" : "border-white/[0.06] bg-white/[0.02] text-white/35"}`}>{status}</button>)}</div></div>

            <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"><div className="flex items-center gap-2 text-[10px] text-white/45"><Clock3 size={13}/> What Sitora records</div><p className="mt-2 text-[10px] leading-5 text-white/34">Owner changes, status transitions, timestamps and eventual outcome would be written to the audit/event layer in production.</p></div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function Stat({ label, value, sub, icon }: { label: string; value: string; sub: string; icon: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"><div className="flex items-center justify-between"><div className="text-[9px] uppercase tracking-[0.13em] text-white/25">{label}</div><div className="text-[#73cabf]">{icon}</div></div><div className="mt-3 text-[24px] font-semibold tracking-[-0.03em]">{value}</div><div className="mt-1 text-[10px] text-white/28">{sub}</div></div>;
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-white/[0.055] bg-white/[0.025] p-3"><div className="text-[8px] uppercase tracking-[0.11em] text-white/22">{label}</div><div className="mt-1 text-[10px] text-white/58">{value}</div></div>;
}
