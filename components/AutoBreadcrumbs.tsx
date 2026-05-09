"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const labelMap: Record<string, string> = {
  home: "Home",
  "corporate-website-design": "Corporate Website Design",
  "corporate-branding": "Corporate Branding",
  "seo-lead-generation": "SEO & Lead Generation",
  work: "Work",
  process: "Process",
  contact: "Contact",
  industries: "Industries",
  "law-firms": "Law Firms",
  "dental-clinics": "Dental Clinics",
  "healthcare-clinics": "Healthcare Clinics",
  accountants: "Accountants",
  "estate-agents": "Estate Agents",
  "construction-companies": "Construction Companies",
  consultants: "Consultants",
  "translation-companies": "Translation Companies",
  "recruitment-agencies": "Recruitment Agencies",
  "training-providers": "Training Providers",
  "finance-brokers": "Finance Brokers",
  "corporate-services": "Corporate Services",
};

function formatLabel(segment: string) {
  return (
    labelMap[segment] ||
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function AutoBreadcrumbs() {
  const pathname = usePathname();

  const hiddenPaths = ["/", "/home"];

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="relative z-30 mx-auto max-w-7xl px-5 pt-28 sm:px-8 lg:pt-32"
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm text-white/50">
        <li>
          <Link
            href="/home"
            className="inline-flex items-center gap-2 transition hover:text-[#d8b66d]"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-white/24" />

              {isLast ? (
                <span className="font-medium text-white/72">
                  {formatLabel(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="transition hover:text-[#d8b66d]"
                >
                  {formatLabel(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}