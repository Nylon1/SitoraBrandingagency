import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type UploadedFile = {
  name: string;
  size: number;
  type: string;
  storagePath: string;
};

type EvidencePack = {
  id: string;
  company_name: string;
  trading_name: string | null;
  website: string;
  sector: string | null;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string | null;
  status: string;
  uploaded_files: UploadedFile[] | null;
  submitted_at: string;
};

export default async function Trust360EvidencePage() {
  const { data, error } = await supabaseAdmin
    .from("trust360_evidence_packs")
    .select(
      `
      id,
      company_name,
      trading_name,
      website,
      sector,
      primary_contact_name,
      primary_contact_email,
      primary_contact_phone,
      status,
      uploaded_files,
      submitted_at
    `
    )
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Trust 360 evidence dashboard error:", error);

    return (
      <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="/admin/trust360-leads"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Trust 360 Leads
          </a>

          <h1 className="mt-8 text-4xl font-black">
            Trust 360 Evidence Packs
          </h1>

          <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-200">
            Failed to load evidence packs. Check the Supabase table name:
            trust360_evidence_packs.
          </p>
        </div>
      </main>
    );
  }

  const evidencePacks = (data || []) as EvidencePack[];

  const total = evidencePacks.length;
  const received = evidencePacks.filter(
    (pack) => pack.status === "Received"
  ).length;
  const reviewing = evidencePacks.filter(
    (pack) => pack.status === "Reviewing"
  ).length;
  const moreInfoNeeded = evidencePacks.filter(
    (pack) => pack.status === "More Info Needed"
  ).length;
  const complete = evidencePacks.filter(
    (pack) => pack.status === "Complete"
  ).length;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="/admin/trust360-leads"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Trust 360 Leads
          </a>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Sitora Admin
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Trust 360 Evidence Packs
              </h1>

              <p className="mt-4 max-w-3xl text-white/60">
                Review submitted audit evidence, uploaded files, missing
                documents, priority areas and internal audit status.
              </p>
            </div>

            <a
              href="/qatar-trust-360/evidence-request"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-black text-black transition hover:bg-[#f0cf63]"
            >
              Open Evidence Form
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard label="Total packs" value={total} />
            <StatCard label="Received" value={received} />
            <StatCard label="Reviewing" value={reviewing} />
            <StatCard label="More info needed" value={moreInfoNeeded} />
            <StatCard label="Complete" value={complete} />
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.04] text-white/50">
                  <tr>
                    <th className="px-6 py-4 font-bold">Company</th>
                    <th className="px-6 py-4 font-bold">Sector</th>
                    <th className="px-6 py-4 font-bold">Contact</th>
                    <th className="px-6 py-4 font-bold">Files</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Submitted</th>
                    <th className="px-6 py-4 font-bold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {evidencePacks.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-12 text-center text-white/50"
                      >
                        No evidence packs submitted yet.
                      </td>
                    </tr>
                  ) : (
                    evidencePacks.map((pack) => {
                      const fileCount = pack.uploaded_files?.length || 0;

                      return (
                        <tr key={pack.id} className="align-top">
                          <td className="px-6 py-5">
                            <p className="font-black text-white">
                              {pack.company_name}
                            </p>

                            {pack.trading_name && (
                              <p className="mt-1 text-xs text-white/45">
                                Trading as: {pack.trading_name}
                              </p>
                            )}

                            <a
                              href={normaliseUrl(pack.website)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 block text-xs text-[#D4AF37] hover:underline"
                            >
                              {pack.website}
                            </a>
                          </td>

                          <td className="px-6 py-5 text-white/65">
                            {pack.sector || "—"}
                          </td>

                          <td className="px-6 py-5">
                            <p className="font-semibold text-white/80">
                              {pack.primary_contact_name}
                            </p>

                            <a
                              href={`mailto:${pack.primary_contact_email}`}
                              className="mt-1 block text-xs text-[#D4AF37] hover:underline"
                            >
                              {pack.primary_contact_email}
                            </a>

                            {pack.primary_contact_phone && (
                              <p className="mt-1 text-xs text-white/45">
                                {pack.primary_contact_phone}
                              </p>
                            )}
                          </td>

                          <td className="px-6 py-5 text-white/65">
                            {fileCount}
                          </td>

                          <td className="px-6 py-5">
                            <StatusBadge status={pack.status} />
                          </td>

                          <td className="px-6 py-5 text-white/50">
                            {formatDate(pack.submitted_at)}
                          </td>

                          <td className="px-6 py-5">
                            <a
                              href={`/admin/trust360-evidence/${pack.id}`}
                              className="rounded-full border border-white/15 px-4 py-2 text-xs font-black text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                            >
                              View Pack
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
      <p className="text-sm font-bold text-white/45">{label}</p>
      <p className="mt-3 text-4xl font-black text-[#D4AF37]">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Received: "border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]",
    Reviewing: "border-blue-400/35 bg-blue-400/10 text-blue-200",
    "More Info Needed":
      "border-orange-400/35 bg-orange-400/10 text-orange-200",
    Complete: "border-green-400/35 bg-green-400/10 text-green-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
        styles[status] || "border-white/15 bg-white/10 text-white/60"
      }`}
    >
      {status || "Received"}
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

function normaliseUrl(url: string) {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}