import { client } from "@/sanity/lib/client";
import { SITE_URL } from "@/lib/site";

// Re-check Sanity at most once an hour so new posts and projects get listed
export const revalidate = 3600;

const STATIC_PATHS = [
  "/",
  "/about",
  "/product-list",
  "/gallery",
  "/gallery/projects",
  "/gallery/photos",
  "/blog",
  "/downloads",
  "/contacts",
  "/privacy-policy",
];

const SLUGS_QUERY = `{
  "posts": *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "projects": *[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
}`;

export default async function sitemap() {
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
  }));

  // If Sanity can't be reached, still serve the static pages instead of failing
  let posts = [];
  let projects = [];
  try {
    ({ posts, projects } = await client.fetch(SLUGS_QUERY));
  } catch {}

  return [
    ...staticEntries,
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p._updatedAt,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/gallery/projects/${p.slug}`,
      lastModified: p._updatedAt,
    })),
  ];
}
