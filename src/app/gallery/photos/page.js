import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { compressedImage } from "@/sanity/lib/imageHelpers";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { webPageLd, breadcrumbLd } from "@/lib/jsonld";

// Re-check Sanity at most once a minute so newly published photos appear without a redeploy
export const revalidate = 60;

export const metadata = {
  alternates: { canonical: "/gallery/photos" },
  title: "Gallery | Luxora Glaze System Limited",
  description:
    "Photo gallery of completed installations from Luxora Glaze System Limited.",
};

// Images with a Display Order come first (lowest number first); the rest follow, newest upload first.
// coalesce() is needed because GROQ sorts missing values before numbers.
const GALLERY_QUERY = `*[_type == "galleryImage" && defined(image.asset)] | order(coalesce(order, 999999) asc, _createdAt desc) {
  _id,
  image,
  caption
}`;

export default async function PhotosPage() {
  const images = await client.fetch(GALLERY_QUERY);

  return (
    <div>
      <Nav />
      <JsonLd data={[webPageLd({ type: "CollectionPage", name: metadata.title, description: metadata.description, path: "/gallery/photos" }), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Projects & Gallery", path: "/gallery" }, { name: "Gallery", path: "/gallery/photos" }])]} />
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
            <span>Gallery</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.05] mb-4 text-[clamp(36px,5vw,64px)]">
            Photo <em className="text-gold not-italic">Gallery</em>
          </h1>
          <p className="text-[15px] text-silver max-w-140 leading-[1.85]">
            A visual showcase of completed Luxora installations.
          </p>
        </div>
      </div>

      {/* PHOTO GRID */}
      <div className="px-5 md:px-15 py-16 md:py-24">
        {images.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <ImageIcon className="w-8 h-8 text-gold/30" strokeWidth={1.2} />
            <p className="text-[13px] italic tracking-wide text-center text-dim">
              Photos coming soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-260 mx-auto">
            {images.map((item) => (
              <div
                key={item._id}
                className="group relative aspect-[4/3] overflow-hidden bg-card"
              >
                <img
                  src={compressedImage(item.image, 600, 450)}
                  alt={item.caption || "Luxora installation"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.caption && (
                  // Always visible on touch screens (no hover); fades in on hover from md up
                  <div className="absolute inset-0 flex items-end p-5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 to-transparent">
                    <span className="text-[13px] text-white">{item.caption}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
