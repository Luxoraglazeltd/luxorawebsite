import Link from "next/link";
import { FileText, Download } from "lucide-react";
import { client } from "@/sanity/lib/client";

const CATEGORY_LABELS = {
  brochure: "Product Brochure",
  datasheet: "Technical Data Sheet",
  installation: "Installation Guide",
  warranty: "Warranty Information",
};

const FEATURED_DOCS_QUERY = `*[_type == "downloadDocument" && defined(file.asset)] | order(_createdAt desc) [0...3] {
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
        <Link
          href="/downloads"
          className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit transition-all duration-300 hover:bg-gold-lt"
        >
          View All Downloads <span>→</span>
        </Link>
      </div>

      {docs.length === 0 ? (
        <p className="text-[13px] italic tracking-wide text-dim text-center py-10">
          Documents coming soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {docs.map((doc) => (
            <Link
              key={doc._id}
              href="/downloads"
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
              <span className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit mt-auto transition-all duration-300 group-hover:bg-gold-lt">
                <Download className="w-3.5 h-3.5" strokeWidth={2} />
                View in Download Centre
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
