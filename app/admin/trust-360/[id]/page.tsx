import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import DeleteAuditButton from "./DeleteAuditButton";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Trust360AdminDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = createSupabaseAdmin();

  const { data: audit } = await supabase
    .from("trust360_audits")
    .select("*")
    .eq("id", id)
    .single();

  if (!audit) notFound();

  const { data: issues } = await supabase
    .from("trust360_issues")
    .select("*")
    .eq("audit_id", id)
    .order("created_at", { ascending: true });

  return (
    <main className="min-h-screen bg-[#03050a] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin/trust-360"
          className="mb-8 inline-flex items-center text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to audits
        </Link>

        <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
            Audit Review
          </p>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr]">
            <div>
              <h1 className="text-4xl font-semibold">
                {audit.business_name || audit.name || "Trust 360 Audit"}
              </h1>
              <p className="mt-3 leading-7 text-white/62">{audit.summary}</p>
            </div>

            <div className="rounded-3xl border border-[#d8b66d]/25 bg-[#d8b66d]/8 p-5">
              <p className="text-sm text-white/50">Verdict</p>
              <p className="mt-1 text-3xl font-semibold">{audit.verdict}</p>
              <p className="mt-2 text-[#f4dfaa]">{audit.score}/100</p>
              <div className="mt-5">
    <DeleteAuditButton auditId={audit.id} />
  </div>

            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr]">
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="mb-4 text-xl font-semibold">Lead details</h2>

              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-white/42">Name</dt>
                  <dd>{audit.name || "—"}</dd>
                </div>

                <div>
                  <dt className="text-white/42">Email</dt>
                  <dd>{audit.email}</dd>
                </div>

                <div>
                  <dt className="text-white/42">Business</dt>
                  <dd>{audit.business_name || "—"}</dd>
                </div>

                <div>
                  <dt className="text-white/42">Website URL</dt>
                  <dd>
                    <a
                      href={audit.website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-[#f4dfaa] hover:underline"
                    >
                      {audit.website_url}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-white/42">Sector</dt>
                  <dd>{audit.sector}</dd>
                </div>

                <div>
                  <dt className="text-white/42">Region</dt>
                  <dd>{audit.region}</dd>
                </div>

                <div>
                  <dt className="text-white/42">Created</dt>
                  <dd>
                    {new Date(audit.created_at).toLocaleString("en-GB")}
                  </dd>
                </div>
              </dl>
            </div>

            {audit.uploaded_file_url ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
                <p className="mb-3 text-sm font-semibold text-white/72">
                  Uploaded evidence
                </p>

                {audit.uploaded_file_type?.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={audit.uploaded_file_url}
                    alt="Uploaded evidence"
                    className="w-full rounded-2xl border border-white/10"
                  />
                ) : (
                  <a
                    href={audit.uploaded_file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[#f4dfaa] hover:underline"
                  >
                    Open uploaded file
                  </a>
                )}
              </div>
            ) : null}
          </aside>

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="mb-5 text-2xl font-semibold">Issues found</h2>

              <div className="space-y-4">
                {(issues || []).map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-3xl border border-white/10 bg-[#07101d] p-5"
                  >
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#d8b66d]/15 px-3 py-1 text-xs font-semibold text-[#f4dfaa]">
                        {issue.risk_level}
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                        {issue.regulator_body}
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                        {issue.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold">{issue.title}</h3>

                    <p className="mt-3 leading-7 text-white/62">
                      {issue.description}
                    </p>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="mb-1 text-sm font-semibold text-white/80">
                        Where found
                      </p>
                      <p className="text-sm text-white/58">
                        {issue.where_found}
                      </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="mb-1 text-sm font-semibold text-white/80">
                        Suggested fix
                      </p>
                      <p className="text-sm leading-6 text-white/58">
                        {issue.suggested_fix}
                      </p>
                    </div>
                  </div>
                ))}

                {!issues?.length ? (
                  <p className="text-white/50">No issues saved.</p>
                ) : null}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="mb-4 text-2xl font-semibold">
                Extracted page text
              </h2>

              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-6 text-white/54">
                {audit.page_text || "No page text extracted."}
              </pre>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="mb-4 text-2xl font-semibold">Raw AI JSON</h2>

              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-6 text-white/54">
                {JSON.stringify(audit.ai_result_json, null, 2)}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}