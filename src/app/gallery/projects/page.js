import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { compressedImage } from "@/sanity/lib/imageHelpers";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { webPageLd, breadcrumbLd } from "@/lib/jsonld";

// Re-check Sanity at most once a minute so newly published projects appear without a redeploy
export const revalidate = 60;

export const metadata = {
  alternates: { canonical: "/gallery/projects" },
  title: "Projects | Luxora Glaze System Limited",
  description:
    "Completed project case studies from Luxora Glaze System Limited: aluminium, uPVC, and glass installations across Kenya.",
};

const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)] | order(completedAt desc) {
  _id,
  title,
  slug,
  location,
  projectType,
  mainImage,
  scope
}`;

const PROJECT_TYPE_LABELS = {
  residential: "Residential",
  commercial: "Commercial",
  hospitality: "Hospitality",
};

export default async function ProjectsPage() {
  // The page must still load if Sanity is slow or unreachable
  let projects = [];
  try {
    projects = await client.fetch(PROJECTS_QUERY);
  } catch (err) {
    console.error("Projects page: Sanity fetch failed", err);
  }

  return (
    <div>
      <Nav />
      <JsonLd data={[webPageLd({ type: "CollectionPage", name: metadata.title, description: metadata.description, path: "/gallery/projects" }), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Projects & Gallery", path: "/gallery" }, { name: "Projects", path: "/gallery/projects" }])]} />
      {/* PAGE HEADER */}
      <div className="relative bg-char px-5 md:px-15 pt-20 md:pt-24 pb-14 md:pb-16 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(201,168,76,0.03) 59px, rgba(201,168,76,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(201,168,76,0.03) 59px, rgba(201,168,76,0.03) 60px)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-gold mb-4">
            <Link href="/" className="text-dim hover:text-gold transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/gallery" className="text-dim hover:text-gold transition-colors">
              Projects & Gallery
            </Link>
            <span>›</span>
            <span>Projects</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.05] mb-4 text-[clamp(36px,5vw,64px)]">
            Our <em className="text-gold not-italic">Projects</em>
          </h1>
          <p className="text-[15px] text-silver max-w-140 leading-[1.85]">
            Detailed case studies of completed Luxora installations.
          </p>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="px-5 md:px-15 py-16 md:py-24">
        {projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-220 mx-auto items-stretch">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/gallery/projects/${project.slug.current}`}
                className="group bg-card overflow-hidden transition-colors duration-300 hover:bg-[#202020] flex flex-col h-full"
              >
                {project.mainImage ? (
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-black">
                    <img
                      src={compressedImage(project.mainImage, 600, 450)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-0.5 bg-gradient-to-r from-gold to-transparent" />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                    <h3 className="font-serif text-[20px] text-white">
                      {project.title}
                    </h3>
                    {project.projectType && (
                      <span className="text-[9px] tracking-wide text-gold bg-gold/[0.08] border border-gold/20 px-2 py-0.5">
                        {PROJECT_TYPE_LABELS[project.projectType] || project.projectType}
                      </span>
                    )}
                  </div>
                  {project.location && (
                    <p className="text-[12px] text-dim mb-3">{project.location}</p>
                  )}
                  {project.scope && (
                    <p className="text-[13px] text-silver leading-[1.8] mb-4 line-clamp-3 flex-1">
                      {project.scope}
                    </p>
                  )}
                  <span className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit mt-auto transition-all duration-300 group-hover:bg-gold-lt">
                    View Project <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
