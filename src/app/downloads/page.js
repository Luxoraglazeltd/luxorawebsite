import Link from "next/link";
import { FileText } from "lucide-react";
import { client } from "@/sanity/lib/client";
import DownloadConfirm from "@/components/DownloadConfirm";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { webPageLd, breadcrumbLd } from "@/lib/jsonld";

// Re-check Sanity at most once a minute so newly published documents appear without a redeploy
export const revalidate = 60;

export const metadata = {
  alternates: { canonical: "/downloads" },
  title: "Download Centre | Luxora Glaze System Limited",
  description:
    "Product brochures, technical data sheets, installation guides, and warranty information from Luxora Glaze System Limited.",
};

const DOWNLOADS_QUERY = `*[_type == "downloadDocument" && defined(file.asset)] | order(_createdAt desc) {
  _id,
  title,
  category,
  description
}`;

const CATEGORY_LABELS = {
  brochure: "Product Brochure",
  datasheet: "Technical Data Sheet",
  installation: "Installation Guide",
  warranty: "Warranty Information",
};

const CATEGORY_ORDER = ["brochure", "datasheet", "installation", "warranty"];

export default async function DownloadsPage() {
  // The page must still load if Sanity is slow or unreachable
  let docs = [];
  try {
    docs = await client.fetch(DOWNLOADS_QUERY);
  } catch (err) {
    console.error("Downloads page: Sanity fetch failed", err);
  }

  const grouped = CATEGORY_ORDER.map((key) => ({
    key,
    label: CATEGORY_LABELS[key],
    items: docs.filter((d) => d.category === key),
  })).filter((group) => group.items.length > 0);

  return (
    <div>
      <Nav />
      <JsonLd data={[webPageLd({ type: "CollectionPage", name: metadata.title, description: metadata.description, path: "/downloads" }), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Download Centre", path: "/downloads" }])]} />
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
            <span>Download Centre</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.05] mb-4 text-[clamp(36px,5vw,64px)]">
            Download <em className="text-gold not-italic">Centre</em>
          </h1>
          <p className="text-[15px] text-silver max-w-140 leading-[1.85]">
            Product brochures, technical data sheets, installation guides, and
            warranty information, ready to download.
          </p>
        </div>
      </div>

      {/* DOWNLOADS BY CATEGORY */}
      <div className="px-5 md:px-15 py-16 md:py-24">
        {grouped.length > 0 && (
          <div className="max-w-260 mx-auto flex flex-col gap-14">
            {grouped.map((group) => (
              <div key={group.key}>
                <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-6">
                  <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
                  {group.label}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                  {group.items.map((doc) => (
                    <div
                      key={doc._id}
                      className="bg-card p-7 md:p-8 flex flex-col"
                    >
                      <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6">
                        <FileText className="w-5 h-5 text-gold" strokeWidth={1.5} />
                      </div>
                      <h4 className="font-serif text-[20px] font-normal text-white mb-3">
                        {doc.title}
                      </h4>
                      {doc.description && (
                        <p className="text-[13px] text-silver leading-[1.8] mb-6 flex-1">
                          {doc.description}
                        </p>
                      )}
                      <div className="mt-auto">
                        <DownloadConfirm
                          title={doc.title}
                          fileUrl={`/api/download?id=${encodeURIComponent(doc._id)}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
