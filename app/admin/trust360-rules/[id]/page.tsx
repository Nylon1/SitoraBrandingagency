import { supabaseAdmin } from "@/lib/supabase/admin";
import RuleForm from "./rule-form";

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
};

export default async function Trust360RuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("trust360_rules")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Trust 360 rule detail error:", error);

    return (
      <main className="min-h-screen bg-[#050505] px-6 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="/admin/trust360-rules"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Rules Library
          </a>

          <h1 className="mt-8 text-4xl font-black">Rule not found</h1>

          <p className="mt-4 text-white/60">
            This Trust 360 rule could not be loaded.
          </p>
        </div>
      </main>
    );
  }

  const rule = data as Trust360Rule;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <a
            href="/admin/trust360-rules"
            className="text-sm font-bold text-[#D4AF37] hover:underline"
          >
            ← Back to Rules Library
          </a>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Edit Trust 360 Rule
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {rule.rule_code}
          </h1>

          <p className="mt-4 max-w-3xl text-white/60">
            Edit trigger logic, legal mapping, evidence requirements, guidance,
            scoring and status for this rule.
          </p>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <RuleForm rule={rule} />
        </div>
      </section>
    </main>
  );
}