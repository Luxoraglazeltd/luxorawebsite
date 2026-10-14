"use client";

import { usePathname } from "next/navigation";

// Hides public-site chrome (footer, WhatsApp button) on the Sanity Studio route
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return children;
}
