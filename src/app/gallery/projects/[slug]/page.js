import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { compressedImage } from "@/sanity/lib/imageHelpers";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { absoluteUrl, breadcrumbLd } from "@/lib/jsonld";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/site";

// Re-check Sanity at most once a minute so edits to a project appear without a redeploy
export const revalidate = 60;

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  location,
  projectType,
  mainImage,
  gallery,
  scope,
  productsUsed,
  completedAt,
  videoUrl
}`;

const PROJECT_TYPE_LABELS = {
  residential: "Residential",
  commercial: "Commercial",
  hospitality: "Hospitality",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await client.fetch(PROJECT_QUERY, { slug });

  if (!project) return { title: "Project Not Found: Luxora Glaze System Limited" };

  return {
    title: `${project.title}: Luxora Glaze System Limited`,
    description: project.scope || "A completed project by Luxora Glaze System Limited.",
    alternates: { canonical: `/gallery/projects/${slug}` },
    openGraph: {
      type: "article",
      ...(project.mainImage && {
        images: [{ url: compressedImage(project.mainImage, 1200, 630), alt: project.title }],
      }),
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await client.fetch(PROJECT_QUERY, { slug });

  if (!project) notFound();

  const formattedDate = project.completedAt
    ? new Date(project.completedAt).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div>
      <Nav />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.scope || undefined,
            image: project.mainImage ? compressedImage(project.mainImage, 1200, 630) : undefined,
            dateCreated: project.completedAt || undefined,
            locationCreated: project.location
              ? { "@type": "Place", name: project.location }
              : undefined,
            keywords: project.productsUsed?.length ? project.productsUsed.join(", ") : undefined,
            url: absoluteUrl(`/gallery/projects/${slug}`),
            inLanguage: "en-KE",
            creator: { "@id": ORGANIZATION_ID },
            isPartOf: { "@id": WEBSITE_ID },
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Projects & Gallery", path: "/gallery" },
            { name: "Projects", path: "/gallery/projects" },
            { name: project.title, path: `/gallery/projects/${slug}` },
          ]),
        ]}
      />
      {/* PAGE HEADER */}
      <div className="relative bg-char px-5 md:px-15 pt-20 md:pt-24 pb-14 md:pb-16 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(201,168,76,0.03) 59px, rgba(201,168,76,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(201,168,76,0.03) 59px, rgba(201,168,76,0.03) 60px)",
          }}
        />
        <div className="relative z-10 max-w-160 mx-auto">
          <div className="flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-gold mb-4 flex-wrap">
            <Link href="/" className="text-dim hover:text-gold transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/gallery" className="text-dim hover:text-gold transition-colors">
              Projects & Gallery
            </Link>
            <span>›</span>
            <Link href="/gallery/projects" className="text-dim hover:text-gold transition-colors">
              Projects
            </Link>
            <span>›</span>
            <span>{project.title}</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.1] mb-4 text-[clamp(28px,4.5vw,48px)]">
            {project.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap text-[13px] text-silver">
            {project.location && <span>{project.location}</span>}
            {project.projectType && (
              <span className="text-[9px] tracking-wide text-gold bg-gold/[0.08] border border-gold/20 px-2.5 py-1">
                {PROJECT_TYPE_LABELS[project.projectType] || project.projectType}
              </span>
            )}
            {formattedDate && <span className="text-dim">{formattedDate}</span>}
          </div>
        </div>
      </div>

      {/* MAIN IMAGE */}
      {project.mainImage && (
        <div className="w-full max-h-[480px] overflow-hidden bg-black">
          <img
            src={compressedImage(project.mainImage, 1600, 900)}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="px-5 md:px-15 py-16 md:py-20">
        <div className="max-w-160 mx-auto">
          {project.scope && (
            <div className="mb-10">
              <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
                <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
                Project Scope
              </div>
              <p className="text-[15px] text-silver leading-[1.9]">{project.scope}</p>
            </div>
          )}

          {project.productsUsed && project.productsUsed.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
                <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
                Products Used
              </div>
              <div className="flex flex-wrap gap-2">
                {project.productsUsed.map((product, i) => (
                  <span
                    key={i}
                    className="text-[11px] tracking-wide text-gold bg-gold/[0.08] border border-gold/20 px-3 py-1.5"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PROJECT GALLERY */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
                <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
                Gallery
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5">
                {project.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden bg-black">
                    <img
                      src={compressedImage(img, 400, 300)}
                      alt={`${project.title}, photo ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <YouTubeEmbed url={project.videoUrl} title={project.title} />

          <div className="mt-14 pt-8 border-t border-border">
            <Link
              href="/gallery/projects"
              className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit transition-all duration-300 hover:bg-gold-lt"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
