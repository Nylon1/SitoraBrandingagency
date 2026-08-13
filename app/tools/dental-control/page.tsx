import type { Metadata } from "next";
import { DentalControlDashboard } from "@/components/dental-control/DentalControlDashboard";

export const metadata: Metadata = {
  title: "Sitora Dental Control | Saudi Dental Intelligence Prototype",
  description:
    "A high-fidelity prototype of Sitora's operating intelligence layer for Saudi dental groups.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DentalControlPage() {
  return <DentalControlDashboard />;
}
