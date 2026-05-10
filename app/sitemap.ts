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
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === "" || path === "/home" ? "weekly" : "monthly",
    priority:
      path === "" || path === "/home"
        ? 1
        : path === "/contact"
          ? 0.9
          : path.startsWith("/industries")
            ? 0.75
            : 0.85,
  }));
}