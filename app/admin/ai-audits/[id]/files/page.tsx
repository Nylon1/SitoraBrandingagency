import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft } from "lucide-react";
import AiFileGeneratorPanel from "@/components/AiFileGeneratorPanel";

export const dynamic = "force-dynamic";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

export default async function AuditFilesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id || id === "undefined") {
    throw new Error("Missing audit ID.");
  }

  const supabase = getSupabaseAdmin();

  const { data: audit, error } = await supabase
    .from("ksa_ai_audit_intakes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !audit) {
    throw new Error(error?.message || "Audit not found.");
  }

  const { data: files, error: filesError } = await supabase
    .from("ksa_ai_generated_files")
    .select("*")
    .eq("audit_id", id)
    .order("category", { ascending: true })
    .order("title", { ascending: true });

  if (filesError) {
    console.error("Generated files fetch error:", filesError);
  }

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_35%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_35%),linear-gradient(180deg,#05070d_0%,#070b14_50%,#030407_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/admin/ai-audits/${id}`}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.1]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to audit
          </Link>

          <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
            {audit.company_name || "Unnamed company"}
          </div>
        </div>

        <AiFileGeneratorPanel
          auditId={id}
          initialFiles={(files || []) as any}
          companyName={audit.company_name}
          website={audit.website}
          email={audit.email}
          aiOwner={audit.internal_ai_owner}
        />
      </div>
    </main>
  );
}