import type { Metadata } from "next";

import { HealthcarePostIdeasClient } from "@/components/tools/HealthcarePostIdeasClient";
import {
  dentalIdeaCount,
  healthcareStartupIdeaCount,
  opticianIdeaCount,
  totalHealthcareIdeaCount,
} from "@/lib/healthcare-post-ideas";

export const metadata: Metadata = {
  title: "Free Healthcare Social Media Ideas",
  description:
    "Browse 1,500 free social media content ideas for dentists, opticians and healthcare startups. Search, filter, save and copy ideas without signing up.",
  alternates: {
    canonical: "/tools/healthcare-post-ideas",
  },
  openGraph: {
    title: "Free Healthcare Social Media Ideas | Sitora",
    description:
      "Discover 1,500 social media ideas for dentists, opticians and healthcare startups. No signup required.",
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
    "A free, no-signup healthcare social media library for dentists, opticians and healthcare startups.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
  },
  featureList: [
    `${totalHealthcareIdeaCount} healthcare social media ideas`,
    `${dentalIdeaCount} dentist ideas`,
    `${opticianIdeaCount} optician ideas`,
    `${healthcareStartupIdeaCount} healthcare startup ideas`,
    "Thirty content categories",
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
