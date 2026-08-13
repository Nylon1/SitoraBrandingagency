import type { MetadataRoute } from "next";

const baseUrl = "https://sitora.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/home",
    "/corporate-website-design",
    "/corporate-branding",
    "/seo-lead-generation",
    "/work",
    "/process",
    "/contact",
    "/industries",
    "/industries/law-firms",
    "/industries/dental-clinics",
    "/industries/healthcare-clinics",
    "/industries/accountants",
    "/industries/estate-agents",
    "/industries/construction-companies",
    "/industries/consultants",
    "/industries/translation-companies",
    "/industries/recruitment-agencies",
    "/industries/training-providers",
    "/industries/finance-brokers",
    "/industries/corporate-services",
    "/websites-for-celebrities-athletes",
    "/deckstudio",
    "/tools/qr-code-generator",
    "/trust-360",
    "/qatar-trust-360",
    "/ai-readiness",
    "/ada-accessibility-scan-full",
    "/brand-identity-packages",
    "/dental-control",
    "/research",
    "/research/saudi-dental-software-landscape-2026",

    const staticPages = [
  "",
  "/home",
  "/corporate-website-design",
  "/corporate-branding",
  "/seo-lead-generation",
  "/work",
  "/process",
  "/contact",
  "/industries",
  "/industries/law-firms",
  "/industries/dental-clinics",
  "/industries/healthcare-clinics",
  "/industries/accountants",
  "/industries/estate-agents",
  "/industries/construction-companies",
  "/industries/consultants",
  "/industries/translation-companies",
  "/industries/recruitment-agencies",
  "/industries/training-providers",
  "/industries/finance-brokers",
  "/industries/corporate-services",
  "/websites-for-celebrities-athletes",
  "/deckstudio",
  "/tools/qr-code-generator",
  "/trust-360",
  "/qatar-trust-360",
  "/ai-readiness",
  "/ada-accessibility-scan-full",
  "/brand-identity-packages",
  "/dental-control",

  "/research",
  "/research/methodology",
  "/research/review-and-corrections",
  "/research/saudi-gulf-innovation",
  "/research/saudi-dental-software-landscape-2026",
  "/research/ai-as-the-nhs-front-door",
  "/research/closing-the-medication-loop",
  "/research/school-health-reform-2026",
  "/research/passenger-assurance-saudi",
];
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === "" || path === "/home" || path.startsWith("/research")
        ? "weekly"
        : "monthly",
    priority:
      path === "" || path === "/home"
        ? 1
        : path === "/contact"
          ? 0.9
          : path === "/research" || path === "/dental-control" || path.startsWith("/research/")
            ? 0.9
            : path.startsWith("/industries")
              ? 0.75
              : 0.85,
  }));
}
