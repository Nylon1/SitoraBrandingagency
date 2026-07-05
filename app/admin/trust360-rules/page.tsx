import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type Trust360Rule = {
  id: string;
  country: string;
  jurisdiction_code: string;
  category: string;
  subcategory: string | null;
  rule_code: string;
  rule_title: string;
  rule_summary: string;
  legal_reference: string | null;
  regulator: string | null;
  penalty_reference: string | null;
  trigger_fields: string[] | null;
  trigger_keywords: string[] | null;
  evidence_required: string[] | null;
  guidance: string | null;
  client_guidance: string | null;
  internal_guidance: string | null;
  severity: string;
  score_impact: number;
  package_relevance: string[] | null;
  applies_to_sectors: string[] | null;
  is_active: boolean;
  needs_legal_review: boolean;
  created_at: string;
  updated_at: string | null;
};

export default async function Trust360RulesPage({
  searchParams,
}: {
  searchParams?: Promise<{
    country?: string;
    category?: string;
    status?: string;
  }>;
}) {
  const params = searchParams ? await searchParams : {};
  const selectedCountry = params.country || "All";
  const selectedCategory = params.category || "All";
  const selectedStatus = params.status || "All";

  let query = supabaseAdmin
    .from("trust360_rules")
    .select("*")
    .order("country", { ascending: true })
    .order("category", { ascending: true })
    .order("rule_code", { ascending: true });

  if (selectedCountry !== "All") {
    query = query.eq("country", selectedCountry);
  }

  if (selectedCategory !== "All") {
    query = query.eq("category", selectedCategory);
  }

  if (selectedStatus === "Active") {
    query = query.eq("is_active", true);
  }

  if (selectedStatus === "Inactive") {
    query = query.eq("is_active", false);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Trust 360 rules load error:", error);

    return (
      <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black">Trust 360 Rules</h1>
          <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-200">
            Failed to load rules. Check the `trust360_rules` table exists.
          </p>
        </div>
      </main>
    );
  }

  const rules = (data || []) as Trust360Rule[];

  const countries = unique(["Qatar", "Saudi Arabia", "UAE", ...rules.map((r) => r.country)]);
  const categories = unique(rules.map((r) => r.category)).sort();

  const total = rules.length;
  const active = rules.filter((rule) => rule.is_active).length;
  const inactive = rules.filter((rule) => !rule.is_active).length;
  const legalReview = rules.filter((rule) => rule.needs_legal_review).length;

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
                Trust 360 Rules Library
              </h1>

              <p className="mt-4 max-w-3xl text-white/60">
                Manage the saved country rules used by the Trust 360 exposure
                engine for Qatar, Saudi Arabia and UAE.
              </p>
            </div>

            <a
              href="/admin/trust360-rules/new"
              className="rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-black text-black transition hover:bg-[#f0cf63]"
            >
              Add New Rule
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Rules shown" value={total} />
            <StatCard label="Active" value={active} />
            <StatCard label="Inactive" value={inactive} />
            <StatCard label="Needs legal review" value={legalReview} />
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
            <form className="grid gap-4 md:grid-cols-4">
              <SelectFilter
                label="Country"
                name="country"
                value={selectedCountry}
                options={["All", ...countries]}
              />

              <SelectFilter
                label="Category"
                name="category"
                value={selectedCategory}
                options={["All", ...categories]}
              />

              <SelectFilter
                label="Status"
                name="status"
                value={selectedStatus}
                options={["All", "Active", "Inactive"]}
              />

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-4 text-sm font-black text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
                >
                  Filter Rules
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.04] text-white/50">
                  <tr>
                    <th className="px-6 py-4 font-bold">Rule</th>
                    <th className="px-6 py-4 font-bold">Country</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">Severity</th>
                    <th className="px-6 py-4 font-bold">Impact</th>
                    <th className="px-6 py-4 font-bold">Triggers</th>
                    <th className="px-6 py-4 font-bold">Evidence</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {rules.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-6 py-12 text-center text-white/50"
                      >
                        No rules found. Add rules or clear filters.
                      </td>
                    </tr>
                  ) : (
                    rules.map((rule) => (
                      <tr key={rule.id} className="align-top">
                        <td className="px-6 py-5">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                            {rule.rule_code}
                          </p>

                          <p className="mt-2 font-black text-white">
                            {rule.rule_title}
                          </p>

                          <p className="mt-2 line-clamp-2 max-w-[320px] text-xs leading-6 text-white/50">
                            {rule.rule_summary}
                          </p>

                          {rule.needs_legal_review && (
                            <span className="mt-3 inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-200">
                              Legal review
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-5 text-white/70">
                          {rule.country}
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-semibold text-white/80">
                            {rule.category}
                          </p>
                          {rule.subcategory && (
                            <p className="mt-1 text-xs text-white/45">
                              {rule.subcategory}
                            </p>
                          )}
                        </td>

                        <td className="px-6 py-5">
                          <SeverityBadge severity={rule.severity} />
                        </td>

                        <td className="px-6 py-5 text-white/70">
                          {rule.score_impact}
                        </td>

                        <td className="px-6 py-5">
                          <CompactList items={rule.trigger_keywords} />
                        </td>

                        <td className="px-6 py-5">
                          <CompactList items={rule.evidence_required} />
                        </td>

                        <td className="px-6 py-5">
                          <StatusBadge isActive={rule.is_active} />
                        </td>

                        <td className="px-6 py-5">
                          <a
                            href={`/admin/trust360-rules/${rule.id}`}
                            className="rounded-full border border-white/15 px-4 py-2 text-xs font-black text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                          >
                            Edit Rule
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#D4AF37]/25 bg-[#D4AF37]/10 p-6">
            <p className="font-black text-[#D4AF37]">Important</p>
            <p className="mt-3 text-sm leading-7 text-white/65">
              This rules library is an operational trust and compliance mapping
              tool. It does not replace legal advice. Rules marked “Legal
              review” should be reviewed by a qualified specialist before being
              used in formal legal or regulatory advice.
            </p>
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

function SelectFilter({
  label,
  name,
  value,
  options,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-white">{label}</span>
      <select
        name={name}
        defaultValue={value}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition focus:border-[#D4AF37]"
      >
        {options.map((option) => (
          <option key={`${name}-${option}`} value={option} className="bg-black">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    Low: "border-green-400/30 bg-green-400/10 text-green-200",
    Medium: "border-yellow-400/30 bg-yellow-400/10 text-yellow-200",
    High: "border-orange-400/30 bg-orange-400/10 text-orange-200",
    Urgent: "border-red-400/30 bg-red-400/10 text-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
        styles[severity] || "border-white/15 bg-white/10 text-white/60"
      }`}
    >
      {severity || "Medium"}
    </span>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
        isActive
          ? "border-green-400/30 bg-green-400/10 text-green-200"
          : "border-white/15 bg-white/10 text-white/50"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

function CompactList({ items }: { items: string[] | null }) {
  if (!items || items.length === 0) {
    return <p className="text-xs text-white/35">—</p>;
  }

  const visible = items.slice(0, 3);
  const remaining = items.length - visible.length;

  return (
    <div className="flex max-w-[260px] flex-wrap gap-2">
      {visible.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white/60"
        >
          {item}
        </span>
      ))}

      {remaining > 0 && (
        <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white/35">
          +{remaining}
        </span>
      )}
    </div>
  );
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}