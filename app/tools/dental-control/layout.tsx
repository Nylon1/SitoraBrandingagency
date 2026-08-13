import type { ReactNode } from "react";
import { DentalControlShell } from "@/components/dental-control/DentalControlShell";

export default function DentalControlLayout({ children }: { children: ReactNode }) {
  return <DentalControlShell>{children}</DentalControlShell>;
}
