import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, ShieldAlert } from "lucide-react";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function verdictClasses(verdict?: string | null) {
  if (verdict === "Critical Risk") return "border-red-400/30 bg-red-500/10";
  if (verdict === "High Risk") return "border-orange-400/30 bg-orange-500/10";
  if (verdict === "Medium Risk") return "border-yellow-400/30 bg-yellow-500/10";
  return "border-emerald-400/30 bg-emerald-500/10";
}

export default async function Trust360ResultPage({ params }: PageProps) {
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

  const visibleIssues = (issues || []).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#03050a] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/trust-360"
          className="mb-8 inline-flex items-center text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Trust 360
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#d8b66d]">
              Digital Trust Verdict
            </p>

            <div
              className={`mb-6 rounded-3xl border p-6 ${verdictClasses(
                audit.verdict,
              )}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <ShieldAlert className="h-8 w-8 text-[#d8b66d]" />
                <div>
                  <p className="text-sm text-white/50">Verdict</p>
                  <h1 className="text-4xl font-semibold">{audit.verdict}</h1>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-white/60">Trust Score</span>
                  <span className="font-semibold text-[#f4dfaa]">
                    {audit.score}/100
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#d8b66d]"
                    style={{ width: `${audit.score || 0}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="text-lg leading-8 text-white/72">{audit.summary}</p>

            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">
                Top risk signals found
              </h2>

              <div className="space-y-4">
                {visibleIssues.map((issue) => (
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
                    </div>

                    <h3 className="text-xl font-semibold">{issue.title}</h3>
                    <p className="mt-3 leading-7 text-white/62">
                      {issue.description}
                    </p>

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
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[#d8b66d]/25 bg-[#d8b66d]/8 p-6">
              <div className="mb-3 flex items-center gap-3">
                <Lock className="h-5 w-5 text-[#d8b66d]" />
                <h2 className="text-xl font-semibold">
                  Unlock the full evidence report
                </h2>
              </div>

              <p className="leading-7 text-white/66">
                The free check shows the first risk signals. The paid report can
                include the full issue list, exact wording, screenshots,
                regulator mapping, replacement wording and a prioritised fix
                plan.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-full bg-[#d8b66d] px-6 py-3 font-semibold text-[#07101d] transition hover:bg-[#f0ce7b]"
              >
                Request full audit
              </Link>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="mb-4 text-xl font-semibold">Submitted evidence</h2>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-white/42">Page reviewed</p>
                  <a
                    href={audit.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-[#f4dfaa] hover:underline"
                  >
                    {audit.website_url}
                  </a>
                </div>

                <div>
                  <p className="text-white/42">Sector</p>
                  <p>{audit.sector}</p>
                </div>

                <div>
                  <p className="text-white/42">Region</p>
                  <p>{audit.region}</p>
                </div>

                <div>
                  <p className="text-white/42">Mapped bodies</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(audit.mapped_bodies || []).map((body: string) => (
                      <span
                        key={body}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/68"
                      >
                        {body}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {audit.uploaded_file_url ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
                <p className="mb-3 text-sm font-semibold text-white/72">
                  Uploaded file
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

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-sm leading-6 text-white/50">
              This verdict is based only on the submitted page, uploaded
              evidence, selected sector and visible content reviewed at the time
              of the scan. It is not legal advice and does not guarantee
              compliance.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}