import type { Metadata } from "next";
import { CelebrityWebsitesPage } from "@/components/CelebrityWebsitesPage";

export const metadata: Metadata = {
  title: "Websites for Celebrities, Athletes & Public Figures",
  description:
    "Premium personal brand websites for celebrities, athletes, public figures, speakers and high-profile personalities who need an official digital presence for media, partnerships and serious enquiries.",
  openGraph: {
    title: "Websites for Celebrities, Athletes & Public Figures | Sitora",
    description:
      "A premium digital home for people with influence. Sitora builds official websites for celebrities, athletes, public figures and high-profile personalities.",
    url: "https://sitora.co.uk/websites-for-celebrities-athletes",
    siteName: "Sitora",
    type: "website",
    images: [
      {
        url: "/images/sitora-global-poster.jpg?v=4",
        width: 1200,
        height: 630,
        alt: "Sitora websites for celebrities athletes and public figures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites for Celebrities, Athletes & Public Figures | Sitora",
    description:
      "Premium personal brand websites for celebrities, athletes, public figures and high-profile personalities.",
    images: ["/images/sitora-global-poster.jpg?v=4"],
  },
};

export default function Page() {
  return <CelebrityWebsitesPage />;
}