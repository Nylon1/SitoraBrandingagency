import type { Metadata } from "next";
import { ExecutiveBoardroom } from "@/components/dental-control/ExecutiveBoardroom";

export const metadata: Metadata = {
  title: "Executive Boardroom | Sitora Dental Control",
  description: "Board-level operating intelligence for the Sitora Saudi dental prototype.",
  robots: { index: false, follow: false },
};

export default function BoardroomPage() {
  return <ExecutiveBoardroom />;
}
