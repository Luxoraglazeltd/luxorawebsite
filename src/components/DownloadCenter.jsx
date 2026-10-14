import Link from "next/link";
import { FileText } from "lucide-react";
import { client } from "@/sanity/lib/client";
import DownloadConfirm from "@/components/DownloadConfirm";

const CATEGORY_LABELS = {
  brochure: "Product Brochure",
  datasheet: "Technical Data Sheet",
  installation: "Installation Guide",
  warranty: "Warranty Information",
};

const FEATURED_DOCS_QUERY = `*[_type == "downloadDocument" && category == "warranty" && defined(file.asset)] | order(_createdAt desc) [0...1] {
  _id,
  title,
  category,
  description
}`;

export default async function DownloadCenter() {
  // The home page must still load if Sanity is slow or unreachable
  let docs = [];
  try {
    docs = await client.fetch(FEATURED_DOCS_QUERY);
  } catch (err) {
    console.error("Download Centre teaser: Sanity fetch failed", err);
  }

  return (
    <section className="bg-char px-5 md:px-15 py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
            <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
            Download Centre
          </div>
          <h2 className="font-serif text-[32px] md:text-[44px] font-light text-white leading-tight">
            Catalogues &
            <br />
            <em className="text-gold not-italic">Company Documents</em>
          </h2>
        </div>
      </div>

      {docs.length > 0 && (
        <div className="grid grid-cols-1 max-w-md gap-4">
          {docs.map((doc) => (
            <div
              key={doc._id}
              className="group bg-black p-7 md:p-8 transition-colors duration-300 hover:bg-[#161616] flex flex-col"
            >
              <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:border-gold">
                <FileText className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              {doc.category && (
                <span className="text-[9px] tracking-wide text-gold/70 uppercase mb-2">
                  {CATEGORY_LABELS[doc.category] || doc.category}
                </span>
              )}
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
      )}

      <Link
        href="/downloads"
        className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit mt-8 transition-all duration-300 hover:bg-gold-lt"
      >
        View All Downloads <span>→</span>
      </Link>
    </section>
  );
}
