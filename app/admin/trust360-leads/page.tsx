import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type Trust360Lead = {
  id: string;
  company_name: string;
  website: string | null;
  sector: string;
  company_size: string;
  qatar_presence: string;
  contact_name: string;
  role: string | null;
  email: string;
  phone: string | null;
  digital_channels: string[];
  data_types: string[];
  marketing_uses: string[];
  ai_uses: string[];
  system_access: string[];
  cyber_controls: string[];
  existing_documents: string[];
  concerns: string[];
  trigger_note: string | null;
  risk_score: number;
  exposure_level: string;
  lead_status: string;
  internal_notes: string | null;
  submitted_at: string;
  created_at: string;
};

export default async function Trust360LeadsPage() {
  const { data, error } = await supabaseAdmin
    .from("trust360_exposure_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Trust 360 leads error:", error);

    return (
      <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black">Trust 360 Leads</h1>
          <p className="mt-4 text-red-300">Failed to load leads.</p>
        </div>
      </main>
    );
  }

  const leads = (data || []) as Trust360Lead[];

  const urgentCount = leads.filter((lead) =>
    lead.exposure_level.toLowerCase().includes("urgent")
  ).length;

  const highCount = leads.filter((lead) =>
    lead.exposure_level.toLowerCase().includes("high")
  ).length;

  const newCount = leads.filter((lead) => lead.lead_status === "New").length;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 bg-white/[0.03] px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            Sitora Admin
          </p>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                Trust 360 Leads
              </h1>
              <p className="mt-4 max-w-3xl text-white/60">
                View and manage Qatar Trust 360 Exposure Assessment submissions.
              </p>
            </div>

            <a
              href="/qatar-trust-360/exposure-check"
              className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
            >
              Open Exposure Form
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-4">
            <AdminStat label="Total Leads" value={String(leads.length)} />
            <AdminStat label="New Leads" value={String(newCount)} />
            <AdminStat label="High Exposure" value={String(highCount)} />
            <AdminStat label="Urgent Exposure" value={String(urgentCount)} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="border-b border-white/10 bg-black/40 text-white/50">
                <tr>
                  <th className="px-5 py-4 font-semibold">Company</th>
                  <th className="px-5 py-4 font-semibold">Sector</th>
                  <th className="px-5 py-4 font-semibold">Exposure</th>
                  <th className="px-5 py-4 font-semibold">Score</th>
                  <th className="px-5 py-4 font-semibold">Contact</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Submitted</th>
                  <th className="px-5 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-white/10 transition hover:bg-[#D4AF37]/5"
                  >
                    <td className="px-5 py-5">
                      <p className="font-bold text-white">{lead.company_name}</p>
                      {lead.website && (
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block text-xs text-[#D4AF37] hover:underline"
                        >
                          {lead.website}
                        </a>
                      )}
                    </td>

                    <td className="px-5 py-5 text-white/65">
                      {lead.sector}
                    </td>

                    <td className="px-5 py-5">
                      <ExposureBadge level={lead.exposure_level} />
                    </td>

                    <td className="px-5 py-5">
                      <span className="text-lg font-black text-white">
                        {lead.risk_score}
                      </span>
                      <span className="text-white/40">/100</span>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-semibold text-white">
                        {lead.contact_name}
                      </p>
                      <a
                        href={`mailto:${lead.email}`}
                        className="mt-1 block text-xs text-white/50 hover:text-[#D4AF37]"
                      >
                        {lead.email}
                      </a>
                      {lead.phone && (
                        <p className="mt-1 text-xs text-white/50">
                          {lead.phone}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-5">
                      <StatusBadge status={lead.lead_status} />
                    </td>

                    <td className="px-5 py-5 text-white/50">
                      {formatDate(lead.created_at)}
                    </td>

                    <td className="px-5 py-5">
                      <a
                        href={`/admin/trust360-leads/${lead.id}`}
                        className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}

                {leads.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-white/50">
                      No Trust 360 leads yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function AdminStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <p className="text-3xl font-black text-[#D4AF37]">{value}</p>
      <p className="mt-1 text-sm text-white/50">{label}</p>
    </div>
  );
}

function ExposureBadge({ level }: { level: string }) {
  const lower = level.toLowerCase();

  let classes = "border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]";

  if (lower.includes("urgent")) {
    classes = "border-red-500/30 bg-red-500/10 text-red-200";
  } else if (lower.includes("high")) {
    classes = "border-orange-400/30 bg-orange-400/10 text-orange-200";
  } else if (lower.includes("low")) {
    classes = "border-green-400/30 bg-green-400/10 text-green-200";
  }

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${classes}`}>
      {level}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-white/70">
      {status}
    </span>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}