import Link from "next/link";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

function badgeClass(verdict?: string | null) {
  if (verdict === "Critical Risk") return "bg-red-500/15 text-red-100";
  if (verdict === "High Risk") return "bg-orange-500/15 text-orange-100";
  if (verdict === "Medium Risk") return "bg-yellow-500/15 text-yellow-100";
  return "bg-emerald-500/15 text-emerald-100";
}

export default async function Trust360AdminPage() {
  const supabase = createSupabaseAdmin();

  const { data: audits } = await supabase
    .from("trust360_audits")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <main className="min-h-screen bg-[#03050a] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
            Admin
          </p>
          <h1 className="text-4xl font-semibold">Trust 360 Audits</h1>
          <p className="mt-3 text-white/58">
            Free exposure checks, AI verdicts and lead review.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.04] text-white/50">
                <tr>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Business</th>
                  <th className="px-5 py-4 font-medium">Email</th>
                  <th className="px-5 py-4 font-medium">Sector</th>
                  <th className="px-5 py-4 font-medium">Region</th>
                  <th className="px-5 py-4 font-medium">Score</th>
                  <th className="px-5 py-4 font-medium">Verdict</th>
                  <th className="px-5 py-4 font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {(audits || []).map((audit) => (
                  <tr key={audit.id} className="hover:bg-white/[0.03]">
                    <td className="px-5 py-4 text-white/56">
                      {new Date(audit.created_at).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium">
                        {audit.business_name || audit.name || "Unknown"}
                      </div>
                      <a
                        href={audit.website_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block max-w-[260px] truncate text-xs text-[#f4dfaa]"
                      >
                        {audit.website_url}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-white/66">{audit.email}</td>
                    <td className="px-5 py-4 text-white/66">{audit.sector}</td>
                    <td className="px-5 py-4 text-white/66">{audit.region}</td>
                    <td className="px-5 py-4 font-semibold">
                      {audit.score}/100
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(
                          audit.verdict,
                        )}`}
                      >
                        {audit.verdict}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/trust-360/${audit.id}`}
                        className="rounded-full bg-[#d8b66d] px-4 py-2 font-semibold text-[#07101d] transition hover:bg-[#f0ce7b]"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!audits?.length ? (
              <div className="p-8 text-center text-white/50">
                No Trust 360 audits yet.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}