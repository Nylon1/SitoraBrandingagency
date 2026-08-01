import type { Metadata } from "next";

import { HealthcarePostIdeasClient } from "@/components/tools/HealthcarePostIdeasClient";
import { dentalIdeaCount } from "@/lib/healthcare-post-ideas";

export const metadata: Metadata = {
  title: "Free Healthcare Social Media Ideas",
  description:
    "Browse 500 free social media content ideas for dentists across ten useful categories. Search, filter, save and copy ideas without signing up.",
  alternates: {
    canonical: "/tools/healthcare-post-ideas",
  },
  openGraph: {
    title: "Free Healthcare Social Media Ideas | Sitora",
    description:
      "Discover 500 patient-friendly social media ideas for dental practices. No signup required.",
    url: "/tools/healthcare-post-ideas",
    siteName: "Sitora",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Sitora Healthcare Post Ideas",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "A free, no-signup healthcare social media idea library with 500 ideas for dentists.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
  },
  featureList: [
    `${dentalIdeaCount} dentist social media ideas`,
    "Ten dental content categories",
    "Search and filtering",
    "Browser-only saved ideas",
    "Copyable content briefs",
  ],
};

export default function HealthcarePostIdeasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HealthcarePostIdeasClient />
    </>
  );
}
