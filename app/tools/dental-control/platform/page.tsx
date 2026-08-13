import type { Metadata } from "next";
import { PlatformExpansion } from "@/components/dental-control/PlatformExpansion";

export const metadata: Metadata = {
  title: "Platform & Integrations | Sitora Dental Control",
  description: "Modular platform, connector and future-module view for the Sitora Saudi dental prototype.",
  robots: { index: false, follow: false },
};

export default function PlatformPage() {
  return <PlatformExpansion />;
}
