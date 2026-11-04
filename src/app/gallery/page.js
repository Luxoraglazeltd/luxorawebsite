import Link from "next/link";
import { FolderOpen, Image as ImageIcon } from "lucide-react";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { webPageLd, breadcrumbLd } from "@/lib/jsonld";
import { client } from "@/sanity/lib/client";
import { compressedImage } from "@/sanity/lib/imageHelpers";

// Re-check Sanity at most once a minute so a newly added cover picture appears without a redeploy
export const revalidate = 60;

// The first picture of each section, in the same order as the pages behind the cards
const COVERS_QUERY = `{
  "project": *[_type == "project" && defined(slug.current) && defined(mainImage.asset)] | order(completedAt desc)[0].mainImage,
  "photo": *[_type == "galleryImage" && defined(image.asset)] | order(coalesce(order, 999999) asc, _createdAt desc)[0].image
}`;

export const metadata = {
  alternates: { canonical: "/gallery" },
  title: "Projects and Gallery: Luxora Glaze System Limited",
  description:
    "Explore completed projects by Luxora Glaze System Limited and browse our gallery of finished glazing installations across Kenya.",
};

// One of the two cards. With a cover picture it shows the picture on top; without one it keeps the icon.
function HubCard({ href, icon: Icon, title, text, cta, cover }) {
  return (
    <Link
      href={href}
      className={`group bg-card flex flex-col items-center text-center transition-colors duration-300 hover:bg-[#202020] ${
        cover ? "overflow-hidden" : "p-10 md:p-14"
      }`}
    >
      {cover ? (
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-black">
          <img
            src={compressedImage(cover, 800, 600)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <Icon className="w-10 h-10 text-gold mb-5" strokeWidth={1.2} />
      )}
      <div className={`flex flex-col items-center ${cover ? "p-8 md:p-10" : ""}`}>
        <h3 className="font-serif text-[26px] text-white mb-3">{title}</h3>
        <p className="text-[13px] text-silver leading-[1.8] mb-6">{text}</p>
        <span className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit transition-all duration-300 group-hover:bg-gold-lt">
          {cta} <span>→</span>
        </span>
      </div>
    </Link>
  );
}

export default async function GalleryHubPage() {
  // The page must still load if Sanity is slow or unreachable
  let covers = {};
  try {
    covers = (await client.fetch(COVERS_QUERY)) || {};
  } catch (err) {
    console.error("Gallery hub: Sanity fetch failed", err);
  }

  return (
    <div>
      <Nav />
      <JsonLd data={[webPageLd({ type: "CollectionPage", name: metadata.title, description: metadata.description, path: "/gallery" }), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Projects & Gallery", path: "/gallery" }])]} />
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
            <span>Projects & Gallery</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.05] mb-4 text-[clamp(36px,5vw,64px)]">
            Projects & <em className="text-gold not-italic">Gallery</em>
          </h1>
          <p className="text-[15px] text-silver max-w-140 leading-[1.85]">
            Explore our completed project case studies, or browse our
            visual gallery of finished installations.
          </p>
        </div>
      </div>

      {/* TWO-WAY SPLIT */}
      <div className="px-5 md:px-15 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-220 mx-auto">
          <HubCard
            href="/gallery/projects"
            icon={FolderOpen}
            title="Projects"
            text="Detailed case studies of completed installations, project type, location, scope, and products used."
            cta="View Projects"
            cover={covers.project}
          />
          <HubCard
            href="/gallery/photos"
            icon={ImageIcon}
            title="Gallery"
            text="A visual showcase of our finished work. Browse photos of completed installations."
            cta="View Gallery"
            cover={covers.photo}
          />
        </div>
      </div>
    </div>
  );
}
