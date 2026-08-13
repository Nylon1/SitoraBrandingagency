export type DentalRoute = {
  href: string;
  label: string;
  short: string;
  group: "Operate" | "Intelligence" | "Governance" | "Enterprise" | "Commercial";
  pitchOrder: number;
};

export const dentalRoutes: DentalRoute[] = [
  { href: "/tools/dental-control", label: "Control Tower", short: "Overview", group: "Operate", pitchOrder: 1 },
  { href: "/tools/dental-control/command", label: "Executive Command Centre", short: "Command", group: "Operate", pitchOrder: 2 },
  { href: "/tools/dental-control/management", label: "Management Operating Review", short: "Management", group: "Operate", pitchOrder: 3 },
  { href: "/tools/dental-control/live", label: "Live Operations", short: "Live", group: "Operate", pitchOrder: 4 },
  { href: "/tools/dental-control/recovery", label: "Patient Recovery Engine", short: "Recovery", group: "Operate", pitchOrder: 5 },
  { href: "/tools/dental-control/copilot", label: "Ask Sitora Copilot", short: "Copilot", group: "Intelligence", pitchOrder: 6 },
  { href: "/tools/dental-control/branch/jeddah-tahlia", label: "Jeddah Tahlia", short: "Jeddah", group: "Intelligence", pitchOrder: 7 },
  { href: "/tools/dental-control/compare", label: "Branch Comparison", short: "Compare", group: "Intelligence", pitchOrder: 8 },
  { href: "/tools/dental-control/actions-live", label: "Action Centre", short: "Actions", group: "Operate", pitchOrder: 9 },
  { href: "/tools/dental-control/boardroom", label: "Executive Boardroom", short: "Boardroom", group: "Intelligence", pitchOrder: 10 },
  { href: "/tools/dental-control/board-pack", label: "Board Pack", short: "Board Pack", group: "Intelligence", pitchOrder: 11 },
  { href: "/tools/dental-control/roles", label: "Role-based Workspaces", short: "Roles", group: "Enterprise", pitchOrder: 12 },
  { href: "/tools/dental-control/admin", label: "Enterprise Administration", short: "Admin", group: "Enterprise", pitchOrder: 13 },
  { href: "/tools/dental-control/trust", label: "Trust Centre", short: "Trust", group: "Governance", pitchOrder: 14 },
  { href: "/tools/dental-control/platform", label: "Platform & Integrations", short: "Platform", group: "Enterprise", pitchOrder: 15 },
  { href: "/tools/dental-control/onboarding", label: "Pilot Onboarding", short: "Onboarding", group: "Enterprise", pitchOrder: 16 },
  { href: "/tools/dental-control/commercial", label: "Commercial & ROI", short: "ROI", group: "Commercial", pitchOrder: 17 },
  { href: "/tools/dental-control/pilot", label: "Pilot Builder", short: "Pilot", group: "Commercial", pitchOrder: 18 },
  { href: "/tools/dental-control/investor", label: "Investor Economics", short: "Investor", group: "Commercial", pitchOrder: 19 },
  { href: "/tools/dental-control/demo", label: "VC Demo Mode", short: "Demo", group: "Commercial", pitchOrder: 20 },
  { href: "/tools/dental-control/index", label: "Prototype Map", short: "All screens", group: "Enterprise", pitchOrder: 21 },
];

export const orderedPitchRoutes = [...dentalRoutes].sort((a, b) => a.pitchOrder - b.pitchOrder);

export function matchDentalRoute(pathname: string) {
  return dentalRoutes.find((route) => route.href === pathname)
    ?? dentalRoutes.find((route) => route.href.includes("/branch/") && pathname.startsWith("/tools/dental-control/branch/"))
    ?? dentalRoutes.find((route) => route.href.includes("/clinician/") && pathname.startsWith("/tools/dental-control/clinician/"))
    ?? dentalRoutes.find((route) => route.href.includes("/patient/") && pathname.startsWith("/tools/dental-control/patient/"));
}
