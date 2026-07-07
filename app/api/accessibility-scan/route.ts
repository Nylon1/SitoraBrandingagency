import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

type ScanRequest = {
  practiceName?: string;
  websiteUrl: string;
  email?: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function normaliseUrl(input: string): string {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error("Website URL is required");
  }

  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  const url = new URL(withProtocol);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http and https website URLs are allowed");
  }

  return url.toString();
}

function getRiskLevel(score: number) {
  if (score >= 90) return "Low";
  if (score >= 75) return "Moderate";
  if (score >= 50) return "High";
  return "Severe";
}

function calculateScore({
  critical,
  serious,
  moderate,
  minor,
  customPenalty,
}: {
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
  customPenalty: number;
}) {
  const score =
    100 -
    critical * 10 -
    serious * 5 -
    moderate * 2 -
    minor * 1 -
    customPenalty;

  return Math.max(0, Math.min(100, score));
}

function countAxeImpacts(axeResults: any[]) {
  let critical = 0;
  let serious = 0;
  let moderate = 0;
  let minor = 0;

  for (const page of axeResults) {
    for (const violation of page.violations || []) {
      if (violation.impact === "critical") critical += 1;
      else if (violation.impact === "serious") serious += 1;
      else if (violation.impact === "moderate") moderate += 1;
      else minor += 1;
    }
  }

  return { critical, serious, moderate, minor };
}

function getCustomPenalty(customChecks: any[]) {
  let penalty = 0;

  for (const page of customChecks) {
    for (const check of page.checks || []) {
      if (check.passed) continue;

      if (check.severity === "high") penalty += 10;
      else if (check.severity === "medium") penalty += 5;
      else penalty += 2;
    }
  }

  return penalty;
}

function buildSummary(riskLevel: string, totalIssues: number) {
  if (riskLevel === "Low") {
    return `The scan found ${totalIssues} automated accessibility issue(s). The website appears lower risk, but manual review is still recommended.`;
  }

  if (riskLevel === "Moderate") {
    return `The scan found ${totalIssues} automated accessibility issue(s). Some disabled users may experience barriers, especially around navigation, forms, links, images or contrast.`;
  }

  if (riskLevel === "High") {
    return `The scan found ${totalIssues} automated accessibility issue(s). These may affect disabled patients using screen readers, keyboard navigation or visual assistance tools.`;
  }

  return `The scan found ${totalIssues} automated accessibility issue(s) and significant accessibility concerns. This website should be prioritised for review and remediation.`;
}

async function runScannerScript(url: string) {
  const scriptPath = path.join(process.cwd(), "scripts", "run-accessibility-scan.mjs");

  const { stdout, stderr } = await execFileAsync(
    "node",
    [scriptPath, url],
    {
      timeout: 70000,
      maxBuffer: 1024 * 1024 * 10,
    }
  );

  if (stderr && !stdout) {
    throw new Error(stderr);
  }

  return JSON.parse(stdout);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ScanRequest;
    const websiteUrl = normaliseUrl(body.websiteUrl);

    const scanResult = await runScannerScript(websiteUrl);

    if (scanResult.error) {
      throw new Error(scanResult.error);
    }

    const axeResults = [scanResult.axe];
    const customChecks = [scanResult.custom];

    const impactCounts = countAxeImpacts(axeResults);
    const penalty = getCustomPenalty(customChecks);

    const totalIssues =
      impactCounts.critical +
      impactCounts.serious +
      impactCounts.moderate +
      impactCounts.minor;

    const score = calculateScore({
      ...impactCounts,
      customPenalty: penalty,
    });

    const riskLevel = getRiskLevel(score);
    const summary = buildSummary(riskLevel, totalIssues);

    const { data, error } = await supabase
      .from("accessibility_scans")
      .insert({
        practice_name: body.practiceName || null,
        website_url: websiteUrl,
        email: body.email || null,

        pages_scanned: 1,

        axe_results: axeResults,
        pa11y_results: null,
        lighthouse_results: null,
        custom_checks: customChecks,

        total_issues: totalIssues,
        critical_issues: impactCounts.critical,
        serious_issues: impactCounts.serious,
        moderate_issues: impactCounts.moderate,
        minor_issues: impactCounts.minor,

        accessibility_score: score,
        risk_level: riskLevel,
        summary,
      })
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      id: data.id,
      score,
      riskLevel,
    });
  } catch (error: any) {
    console.error("Accessibility scan error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to run accessibility scan",
      },
      {
        status: 500,
      }
    );
  }
}