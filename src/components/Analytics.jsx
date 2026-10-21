"use client";

import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";

// Google Analytics for the public website only. Skipped when no ID is set (local runs)
// and inside the Sanity Studio, so the team's CMS visits don't count as traffic.
export default function Analytics() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId || pathname?.startsWith("/studio")) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
