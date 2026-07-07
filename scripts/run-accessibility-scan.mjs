import { chromium } from "playwright";
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const axeSource = fs.readFileSync(axePath, "utf8");

const targetUrl = process.argv[2];
const maxPages = Number(process.argv[3] || 10);

if (!targetUrl) {
  console.error(JSON.stringify({ error: "Missing URL" }));
  process.exit(1);
}

function summariseIssue(id) {
  const map = {
    "image-alt": "Some images may be missing useful alternative text.",
    label: "Some form fields may not have accessible labels.",
    "button-name": "Some buttons may not have clear accessible names.",
    "link-name": "Some links may not clearly describe their destination.",
    "color-contrast": "Some text or buttons may have poor colour contrast.",
    "aria-valid-attr": "Some ARIA attributes may be invalid.",
    "aria-required-attr": "Some required accessibility attributes may be missing.",
    "aria-allowed-role":
      "Some elements may use accessibility roles incorrectly, which can confuse screen-reader users.",
    "aria-roles": "Some page elements may use invalid accessibility roles.",
    "aria-valid-attr-value":
      "Some accessibility attributes may have invalid values.",
    "aria-prohibited-attr":
      "Some elements may include accessibility attributes that should not be used there.",
    "aria-hidden-focus":
      "Some hidden elements may still receive keyboard focus.",
    "nested-interactive":
      "Some clickable elements may be nested inside other clickable elements, which can confuse keyboard and screen-reader users.",
    region:
      "Some page content may not be contained within clear landmark regions, making navigation harder for screen-reader users.",
    list: "Some list items may not be structured correctly for assistive technologies.",
    listitem:
      "Some list content may not be correctly marked up for screen readers.",
    "empty-heading":
      "Some headings may be empty, which can make the page structure confusing.",
    "heading-order":
      "The page heading order may be confusing or out of sequence.",
    "html-has-lang": "The page may be missing a language attribute.",
    "landmark-one-main": "The page may not have a clear main content area.",
    "document-title": "The page may be missing a clear browser title.",
    "meta-viewport": "The page may have mobile scaling/accessibility issues.",
    "duplicate-id": "The page may contain duplicate element IDs.",
    "form-field-multiple-labels":
      "Some form fields may have confusing or multiple labels.",
    "select-name": "Some dropdown fields may not have accessible names.",
    "input-button-name": "Some input buttons may not have accessible names.",
    "frame-title": "Some embedded frames may not have clear titles.",
    "link-in-text-block":
      "Some links may not be visually clear enough within surrounding text.",
  };

  return map[id] || `Accessibility issue detected: ${id}`;
}

function normaliseStartUrl(input) {
  const trimmed = input.trim();

  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  const url = new URL(withProtocol);
  url.hash = "";

  return url.toString();
}

function normaliseInternalUrl(href, baseUrl) {
  try {
    if (!href) return null;

    const lowerHref = href.toLowerCase();

    if (
      lowerHref.startsWith("mailto:") ||
      lowerHref.startsWith("tel:") ||
      lowerHref.startsWith("sms:") ||
      lowerHref.startsWith("javascript:")
    ) {
      return null;
    }

    const url = new URL(href, baseUrl);
    const base = new URL(baseUrl);

    if (url.origin !== base.origin) return null;

    url.hash = "";
    url.search = "";

    const blockedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif",
      ".svg",
      ".ico",
      ".pdf",
      ".zip",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
      ".mp4",
      ".mov",
      ".mp3",
      ".wav",
    ];

    if (
      blockedExtensions.some((ext) =>
        url.pathname.toLowerCase().endsWith(ext)
      )
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function scorePagePriority(url) {
  const lower = url.toLowerCase();

  let score = 0;

  if (lower.endsWith("/")) score += 100;

  if (lower.includes("contact")) score += 95;
  if (lower.includes("book")) score += 90;
  if (lower.includes("appointment")) score += 90;
  if (lower.includes("request")) score += 75;

  if (lower.includes("emergency")) score += 85;
  if (lower.includes("urgent")) score += 80;
  if (lower.includes("out-of-hours")) score += 80;

  if (lower.includes("fees")) score += 75;
  if (lower.includes("price")) score += 75;
  if (lower.includes("finance")) score += 65;

  if (lower.includes("treatment")) score += 70;
  if (lower.includes("services")) score += 70;
  if (lower.includes("implant")) score += 65;
  if (lower.includes("invisalign")) score += 65;
  if (lower.includes("orthodont")) score += 65;
  if (lower.includes("whitening")) score += 60;
  if (lower.includes("cosmetic")) score += 55;

  if (lower.includes("patient")) score += 60;
  if (lower.includes("form")) score += 60;
  if (lower.includes("privacy")) score += 35;
  if (lower.includes("accessibility")) score += 55;
  if (lower.includes("about")) score += 40;
  if (lower.includes("team")) score += 35;
  if (lower.includes("reviews")) score += 30;

  // De-prioritise likely low-value pages
  if (lower.includes("blog")) score -= 20;
  if (lower.includes("news")) score -= 20;
  if (lower.includes("tag/")) score -= 40;
  if (lower.includes("category/")) score -= 40;
  if (lower.includes("author/")) score -= 40;

  return score;
}

async function collectLinksFromPage(page, baseUrl) {
  const hrefs = await page.$$eval("a", (anchors) =>
    anchors
      .map((a) => a.getAttribute("href"))
      .filter(Boolean)
  );

  const urls = [];

  for (const href of hrefs) {
    const internal = normaliseInternalUrl(href, baseUrl);
    if (internal) urls.push(internal);
  }

  return urls;
}

async function discoverInternalPages(browser, startUrl, maxPages) {
  const discovered = new Set();
  const toVisit = [];

  discovered.add(startUrl);
  toVisit.push(startUrl);

  const page = await browser.newPage();

  try {
    // First pass: homepage
    await page.goto(startUrl, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    // Give JS menus/nav time to render
    await page.waitForTimeout(4000);

    const homepageLinks = await collectLinksFromPage(page, startUrl);

    for (const link of homepageLinks) {
      discovered.add(link);
    }

    // Second pass: crawl top internal links lightly to discover more pages
    const firstBatch = Array.from(discovered)
      .sort((a, b) => scorePagePriority(b) - scorePagePriority(a))
      .slice(0, Math.min(6, discovered.size));

    for (const url of firstBatch) {
      if (discovered.size >= maxPages * 3) break;

      try {
        await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });

        await page.waitForTimeout(1500);

        const links = await collectLinksFromPage(page, startUrl);

        for (const link of links) {
          discovered.add(link);
        }
      } catch {
        // Ignore crawl failures and continue
      }
    }

    const finalUrls = Array.from(discovered)
      .sort((a, b) => scorePagePriority(b) - scorePagePriority(a))
      .slice(0, maxPages);

    return finalUrls.length > 0 ? finalUrls : [startUrl];
  } finally {
    await page.close();
  }
}

async function scanSinglePage(browser, url) {
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    await page.waitForTimeout(2500);

    await page.addScriptTag({ content: axeSource });

    const axeResult = await page.evaluate(async () => {
      return await window.axe.run(document, {
        resultTypes: ["violations"],
      });
    });

    const title = await page.title();
    const pageText = ((await page.textContent("body")) || "").toLowerCase();

    const links = await page.$$eval("a", (anchors) =>
      anchors.map((a) => ({
        text: a.textContent?.trim().toLowerCase() || "",
        href: a.getAttribute("href") || "",
      }))
    );

    const formsCount = await page.locator("form").count();

    const pdfLinks = links.filter((link) =>
      link.href.toLowerCase().includes(".pdf")
    );

    const vagueLinks = links.filter((link) =>
      ["click here", "read more", "learn more", "more"].includes(link.text)
    );

    const hasContact =
      pageText.includes("contact") ||
      pageText.includes("call us") ||
      pageText.includes("email") ||
      links.some((link) => link.href.includes("contact"));

    const hasBooking =
      pageText.includes("book") ||
      pageText.includes("appointment") ||
      pageText.includes("consultation") ||
      links.some(
        (link) =>
          link.href.includes("book") ||
          link.href.includes("appointment") ||
          link.text.includes("book") ||
          link.text.includes("appointment")
      );

    const hasAccessibilityStatement =
      pageText.includes("accessibility") ||
      links.some(
        (link) =>
          link.href.includes("accessibility") ||
          link.text.includes("accessibility")
      );

    const hasEmergencyInfo =
      pageText.includes("emergency") ||
      pageText.includes("urgent dental") ||
      pageText.includes("out of hours") ||
      pageText.includes("out-of-hours");

    const violations = axeResult.violations.map((v) => ({
      id: v.id,
      impact: v.impact || "minor",
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl,
      plainEnglish: summariseIssue(v.id),
      nodes: v.nodes.slice(0, 5).map((node) => ({
        html: node.html,
        target: node.target,
        failureSummary: node.failureSummary,
      })),
    }));

    const customChecks = [
      {
        id: "contact-access",
        label: "Contact access",
        passed: hasContact,
        severity: "high",
        message: hasContact
          ? "Contact information appears to be present."
          : "Contact information was not clearly detected.",
      },
      {
        id: "booking-access",
        label: "Booking or appointment access",
        passed: hasBooking,
        severity: "high",
        message: hasBooking
          ? "Booking or appointment access appears to be present."
          : "Booking or appointment access was not clearly detected.",
      },
      {
        id: "accessibility-statement",
        label: "Accessibility statement",
        passed: hasAccessibilityStatement,
        severity: "medium",
        message: hasAccessibilityStatement
          ? "Accessibility statement or accessibility link appears to be present."
          : "No accessibility statement was detected.",
      },
      {
        id: "forms-detected",
        label: "Forms detected",
        passed: formsCount > 0,
        severity: "medium",
        message:
          formsCount > 0
            ? `${formsCount} form(s) detected. Forms should be manually reviewed for labels, keyboard use and error messages.`
            : "No forms were detected on this page.",
      },
      {
        id: "pdf-links",
        label: "PDF/download risk",
        passed: pdfLinks.length === 0,
        severity: "medium",
        message:
          pdfLinks.length > 0
            ? `${pdfLinks.length} PDF link(s) detected. PDFs may need accessibility review.`
            : "No PDF links detected on this page.",
      },
      {
        id: "vague-links",
        label: "Vague link text",
        passed: vagueLinks.length === 0,
        severity: "low",
        message:
          vagueLinks.length > 0
            ? `${vagueLinks.length} vague link(s) detected, such as “click here” or “read more”.`
            : "No obvious vague link text detected.",
      },
      {
        id: "emergency-info",
        label: "Emergency dental information",
        passed: hasEmergencyInfo,
        severity: "low",
        message: hasEmergencyInfo
          ? "Emergency or urgent dental information appears to be present."
          : "Emergency dental information was not clearly detected.",
      },
    ];

    return {
      url,
      title,
      axe: {
        url,
        title,
        violations,
      },
      custom: {
        url,
        title,
        formsCount,
        pdfLinks,
        vagueLinks,
        checks: customChecks,
      },
      error: null,
    };
  } catch (error) {
    return {
      url,
      title: "",
      axe: {
        url,
        title: "",
        violations: [],
      },
      custom: {
        url,
        title: "",
        formsCount: 0,
        pdfLinks: [],
        vagueLinks: [],
        checks: [],
      },
      error: error.message || "Failed to scan page",
    };
  } finally {
    await page.close();
  }
}

async function main() {
  const startUrl = normaliseStartUrl(targetUrl);

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const pagesToScan = await discoverInternalPages(
      browser,
      startUrl,
      maxPages
    );

    const axeResults = [];
    const customResults = [];
    const pageErrors = [];

    for (const url of pagesToScan) {
      const result = await scanSinglePage(browser, url);

      axeResults.push(result.axe);
      customResults.push(result.custom);

      if (result.error) {
        pageErrors.push({
          url,
          error: result.error,
        });
      }
    }

    console.log(
      JSON.stringify({
        url: startUrl,
        pagesScanned: pagesToScan.length,
        pages: pagesToScan,
        axeResults,
        customResults,
        pageErrors,
      })
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        error: error.message || "Scanner failed",
      })
    );
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();