"use client";

import { usePathname } from "next/navigation";
import { FilePlus2 } from "lucide-react";

export default function ResearchSubmitCta() {
  const pathname = usePathname();

  if (
    pathname === "/research/jlr-tdv6-sdv6/submit" ||
    pathname?.startsWith("/research/jlr-tdv6-sdv6/admin")
  ) {
    return null;
  }

  return (
    <a
      href="/research/jlr-tdv6-sdv6/submit"
      className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full bg-[#c56f47] px-5 py-3 text-sm font-black text-white shadow-[0_14px_45px_rgba(11,30,54,.28)] transition hover:-translate-y-0.5 hover:bg-[#ad5f3d] focus:outline-none focus:ring-4 focus:ring-[#c56f47]/25"
      aria-label="Submit evidence to the JLR Stage 2 investigation"
    >
      <FilePlus2 className="h-4 w-4" />
      Submit evidence
    </a>
  );
}
