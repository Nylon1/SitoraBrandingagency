import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getScoreLabel(score: number) {
  if (score >= 90) return "Low Risk";
  if (score >= 75) return "Moderate Risk";
  if (score >= 50) return "High Risk";
  return "Severe Risk";
}

function getMainIssues(scan: any) {
  const issues: string[] = [];

  const axeResults = scan.axe_results || [];
  const customChecks = scan.custom_checks || [];

  for (const page of axeResults) {
    for (const violation of page.violations || []) {
      if (violation.plainEnglish) {
        issues.push(violation.plainEnglish);
      }
    }
  }

  for (const page of customChecks) {
    for (const check of page.checks || []) {
      if (!check.passed) {
        issues.push(check.message);
      }
    }
  }

  return [...new Set(issues)].slice(0, 8);
}

export default async function ADAAccessibilityScanResultsPage({
  params,
}: PageProps) {
  const { id } = await params;
  const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

  const { data: scan, error } = await supabase
    .from("accessibility_scans")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !scan) {
    notFound();
  }

  const score = scan.accessibility_score || 0;
  const mainIssues = getMainIssues(scan);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/ada-accessibility-scan"
          className="mb-8 inline-block text-sm text-amber-400"
        >
          ← Run another scan
        </Link>

        <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-400">
            Sitora Accessibility Result
          </p>

          <h1 className="mb-4 text-4xl font-semibold">
            ADA Website Accessibility Risk Scan
          </h1>

          <p className="text-zinc-300">
            Website scanned:{" "}
            <span className="text-white">{scan.website_url}</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">Accessibility Score</p>
            <p className="mt-3 text-6xl font-semibold text-amber-400">
              {score}
            </p>
            <p className="mt-2 text-zinc-300">out of 100</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">Risk Level</p>
            <p className="mt-3 text-3xl font-semibold">
              {getScoreLabel(score)}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">Issues Found</p>
            <p className="mt-3 text-5xl font-semibold">
              {scan.total_issues || 0}
            </p>
            <p className="mt-2 text-zinc-300">
              automated accessibility issues
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-4 text-2xl font-semibold">Summary</h2>
          <p className="leading-8 text-zinc-300">{scan.summary}</p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-6 text-2xl font-semibold">Main Issues Found</h2>

          {mainIssues.length > 0 ? (
            <ul className="space-y-4">
              {mainIssues.map((issue, index) => (
                <li
                  key={`${issue}-${index}`}
                  className="rounded-2xl border border-white/10 bg-zinc-900 p-4 text-zinc-200"
                >
                  {issue}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-300">
              No major automated issues were detected. Manual review is still
              recommended.
            </p>
          )}
        </div>

        <div className="mt-8 rounded-3xl border border-amber-400/30 bg-amber-400/10 p-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Recommended Next Step
          </h2>

          <p className="mb-6 leading-8 text-zinc-200">
            This free scan checks common automated accessibility issues. A full
            Sitora audit includes manual keyboard testing, booking journey
            review, contact form review, PDF/video risk checks, accessibility
            statement review and a prioritised remediation plan.
          </p>

          <Link href="/ada-accessibility-scan-full/request"
            className="inline-flex rounded-xl bg-amber-400 px-6 py-4 font-semibold text-black"
          >
            Request Full Accessibility Audit
          </Link>
        </div>

        <p className="mt-8 text-sm leading-7 text-zinc-500">
          This scan is not legal advice and does not guarantee ADA compliance.
          It identifies common WCAG-related accessibility issues and patient
          access risks that may require review.
        </p>
      </section>
    </main>
  );
}