"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Keep the cinematic entry page clean
  const hideHeaderAndFooter = pathname === "/";

  if (hideHeaderAndFooter) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}