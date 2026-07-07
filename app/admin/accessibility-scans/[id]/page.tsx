import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getImpactLabel(impact: string) {
  if (impact === "critical") return "Critical";
  if (impact === "serious") return "Serious";
  if (impact === "moderate") return "Moderate";
  return "Minor";
}

function getFixAdvice(issueId: string) {
  const fixes: Record<string, string> = {
    "image-alt":
      "Add meaningful alt text to informative images. Decorative images should use empty alt text.",
    label:
      "Add a visible label connected to the form field using htmlFor and id, or provide a clear accessible name.",
    "button-name":
      "Ensure every button has clear visible text or an aria-label that explains the action.",
    "link-name":
      "Replace vague link text with descriptive wording that explains where the link goes.",
    "color-contrast":
      "Increase contrast between text and background, especially for buttons, small text and text over images.",
    "aria-allowed-role":
      "Remove incorrect ARIA roles or replace them with roles that are valid for the element.",
    "aria-roles":
      "Use valid ARIA roles only where needed. Native HTML is usually better than unnecessary ARIA.",
    "aria-valid-attr":
      "Remove invalid ARIA attributes or replace them with supported attributes.",
    "aria-valid-attr-value":
      "Correct ARIA attribute values so they match allowed values.",
    "aria-required-attr":
      "Add required ARIA attributes for components that need them, or use native HTML elements instead.",
    "aria-hidden-focus":
      "Ensure hidden elements cannot receive keyboard focus. Remove focusable children or manage visibility correctly.",
    "nested-interactive":
      "Avoid putting clickable elements inside other clickable elements. Separate the controls.",
    region:
      "Place page content inside clear landmarks such as header, nav, main, footer or section with labels.",
    list:
      "Ensure lists use correct ul/ol/li structure and do not contain invalid direct children.",
    listitem:
      "Ensure list items are inside a parent ul or ol element.",
    "empty-heading":
      "Remove empty headings or add meaningful heading text.",
    "heading-order":
      "Use headings in logical order. Do not skip levels purely for visual styling.",
    "html-has-lang":
      "Add a lang attribute to the html element, for example <html lang='en'>.",
    "landmark-one-main":
      "Ensure the page has exactly one main landmark, usually a single <main> element.",
    "document-title":
      "Add a clear and unique page title.",
    "duplicate-id":
      "Ensure every id value on the page is unique.",
    "form-field-multiple-labels":
      "Use one clear label per form field and remove conflicting labels.",
    "select-name":
      "Add a clear label or accessible name for dropdown/select fields.",
    "input-button-name":
      "Add clear value text, aria-label or visible text for input buttons.",
    "frame-title":
      "Add meaningful title attributes to embedded iframes.",
  };

  return (
    fixes[issueId] ||
    "Review this issue manually and apply the WCAG recommendation shown in the technical details."
  );
}

function flattenIssues(scan: any) {
  const axeResults = scan.axe_results || [];

  return axeResults.flatMap((page: any) =>
    (page.violations || []).map((issue: any) => ({
      pageUrl: page.url,
      pageTitle: page.title || "Untitled page",
      ...issue,
    }))
  );
}

function groupIssuesByPage(scan: any) {
  const axeResults = scan.axe_results || [];

  return axeResults.map((page: any) => ({
    url: page.url,
    title: page.title || "Untitled page",
    issues: page.violations || [],
  }));
}

export default async function AdminAccessibilityScanDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const { data: scan, error } = await supabase
    .from("accessibility_scans")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !scan) {
    notFound();
  }

  const allIssues = flattenIssues(scan);
  const pages = groupIssuesByPage(scan);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 text-sm text-zinc-400">
          <Link href="/" className="hover:text-amber-400">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/admin/accessibility-scans" className="hover:text-amber-400">
            Accessibility Scans
          </Link>{" "}
          / Full Issue View
        </div>

        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-400">
            Admin Remediation View
          </p>

          <h1 className="mb-3 text-4xl font-semibold">
            ADA Accessibility Issues
          </h1>

          <p className="text-zinc-300">
            Website:{" "}
            <a
              href={scan.website_url}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400"
            >
              {scan.website_url}
            </a>
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Score</p>
            <p className="mt-2 text-4xl font-semibold text-amber-400">
              {scan.accessibility_score ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Risk</p>
            <p className="mt-2 text-2xl font-semibold">
              {scan.risk_level || "Unknown"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Pages</p>
            <p className="mt-2 text-4xl font-semibold">
              {scan.pages_scanned || 1}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Critical</p>
            <p className="mt-2 text-4xl font-semibold">
              {scan.critical_issues || 0}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Serious</p>
            <p className="mt-2 text-4xl font-semibold">
              {scan.serious_issues || 0}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-zinc-400">Total</p>
            <p className="mt-2 text-4xl font-semibold">
              {scan.total_issues || allIssues.length}
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Summary</h2>
          <p className="leading-8 text-zinc-300">{scan.summary}</p>
        </div>

        <div className="mb-8 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Remediation Workflow</h2>
          <p className="leading-8 text-zinc-200">
            Use this page internally to identify the exact issue, affected page,
            selector, HTML snippet and recommended fix. Public reports should
            only show a simplified summary.
          </p>
        </div>

        <div className="space-y-8">
          {pages.map((page: any, pageIndex: number) => (
            <div
              key={`${page.url}-${pageIndex}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-6">
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-amber-400">
                  Page {pageIndex + 1}
                </p>

                <h2 className="mb-2 text-2xl font-semibold">
                  {page.title || "Untitled page"}
                </h2>

                <a
                  href={page.url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-sm text-zinc-400 hover:text-amber-400"
                >
                  {page.url}
                </a>

                <p className="mt-4 text-zinc-300">
                  {page.issues.length} issue(s) found on this page.
                </p>
              </div>

              {page.issues.length === 0 ? (
                <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-200">
                  No automated axe issues found on this page.
                </p>
              ) : (
                <div className="space-y-5">
                  {page.issues.map((issue: any, issueIndex: number) => (
                    <div
                      key={`${issue.id}-${issueIndex}`}
                      className="rounded-2xl border border-white/10 bg-zinc-900 p-5"
                    >
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">
                          {getImpactLabel(issue.impact)}
                        </span>

                        <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                          {issue.id}
                        </span>

                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                          {issue.nodes?.length || 0} sample node(s)
                        </span>
                      </div>

                      <h3 className="mb-3 text-xl font-semibold">
                        {issue.plainEnglish || issue.help || issue.id}
                      </h3>

                      {issue.description && (
                        <p className="mb-4 leading-7 text-zinc-300">
                          {issue.description}
                        </p>
                      )}

                      <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="mb-2 text-sm font-semibold text-amber-400">
                          Recommended fix
                        </p>
                        <p className="leading-7 text-zinc-300">
                          {getFixAdvice(issue.id)}
                        </p>
                      </div>

                      {issue.helpUrl && (
                        <a
                          href={issue.helpUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mb-5 inline-block text-sm text-amber-400 hover:underline"
                        >
                          View axe guidance
                        </a>
                      )}

                      <div className="space-y-4">
                        {(issue.nodes || []).map((node: any, nodeIndex: number) => (
                          <div
                            key={`${issue.id}-${nodeIndex}`}
                            className="rounded-xl border border-white/10 bg-black/30 p-4"
                          >
                            <p className="mb-2 text-sm font-semibold text-zinc-300">
                              Affected element {nodeIndex + 1}
                            </p>

                            {node.target && (
                              <div className="mb-3">
                                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                                  Selector
                                </p>
                                <code className="block break-all rounded-lg bg-black p-3 text-xs text-zinc-300">
                                  {Array.isArray(node.target)
                                    ? node.target.join(", ")
                                    : node.target}
                                </code>
                              </div>
                            )}

                            {node.html && (
                              <div className="mb-3">
                                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                                  HTML snippet
                                </p>
                                <pre className="max-h-48 overflow-auto rounded-lg bg-black p-3 text-xs text-zinc-300">
                                  {node.html}
                                </pre>
                              </div>
                            )}

                            {node.failureSummary && (
                              <div>
                                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                                  Failure summary
                                </p>
                                <pre className="whitespace-pre-wrap rounded-lg bg-black p-3 text-xs text-zinc-300">
                                  {node.failureSummary}
                                </pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/ada-accessibility-scan/results/${scan.id}`}
            className="inline-flex rounded-xl bg-amber-400 px-6 py-4 font-semibold text-black"
          >
            View Client-Friendly Result
          </Link>

          <Link
            href="/admin/accessibility-scans"
            className="inline-flex rounded-xl border border-white/20 px-6 py-4 font-semibold text-white"
          >
            Back to Scan Records
          </Link>
        </div>
      </section>
    </main>
  );
}