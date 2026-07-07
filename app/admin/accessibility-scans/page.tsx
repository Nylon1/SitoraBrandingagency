import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default async function AdminAccessibilityScansPage() {
  const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

  const { data: scans } = await supabase
    .from("accessibility_scans")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-semibold">
          Accessibility Scans
        </h1>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10 text-zinc-300">
              <tr>
                <th className="p-4">Practice</th>
                <th className="p-4">Website</th>
                <th className="p-4">Score</th>
                <th className="p-4">Risk</th>
                <th className="p-4">Issues</th>
                <th className="p-4">Created</th>
                <th className="p-4">View</th>
              </tr>
            </thead>

            <tbody>
              {(scans || []).map((scan) => (
                <tr key={scan.id} className="border-t border-white/10">
                  <td className="p-4">
                    {scan.practice_name || "Unknown"}
                  </td>
                  <td className="p-4 text-zinc-300">
                    {scan.website_url}
                  </td>
                  <td className="p-4">
                    {scan.accessibility_score}
                  </td>
                  <td className="p-4">
                    {scan.risk_level}
                  </td>
                  <td className="p-4">
                    {scan.total_issues}
                  </td>
                  <td className="p-4 text-zinc-400">
                    {new Date(scan.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                <Link
  href={`/admin/accessibility-scans/${scan.id}`}
  className="text-amber-400"
>
  Full issues
</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}