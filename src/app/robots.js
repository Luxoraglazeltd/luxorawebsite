import { SITE_URL } from "@/lib/site";

// Everything public is open to search engines and AI crawlers.
// The Studio (CMS) and the internal API routes are kept out.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
