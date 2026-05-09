"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AutoBreadcrumbs } from "@/components/AutoBreadcrumbs";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideChrome = pathname === "/";

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <AutoBreadcrumbs />
      {children}
      <SiteFooter />
    </>
  );
}