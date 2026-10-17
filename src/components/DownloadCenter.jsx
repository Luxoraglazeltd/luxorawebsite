import { FileText } from "lucide-react";
import OpenMenuButton from "@/components/OpenMenuButton";
import { client } from "@/sanity/lib/client";
import DownloadConfirm from "@/components/DownloadConfirm";

const FEATURED_DOCS_QUERY = `*[_type == "downloadDocument" && category == "warranty" && defined(file.asset)] | order(coalesce(order, 999999) asc, _createdAt desc) [0...1] {
  _id,
  title,
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

  // No warranty document in the CMS: hide the whole block
  if (docs.length === 0) return null;

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

      <div className="mb-8">
        <OpenMenuButton>View All Catalogues & Documents</OpenMenuButton>
      </div>

      <div className="grid grid-cols-1 max-w-md gap-4">
          {docs.map((doc) => (
            <div
              key={doc._id}
              className="group bg-black p-7 md:p-8 transition-colors duration-300 hover:bg-[#161616] flex flex-col"
            >
              <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:border-gold">
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
    </section>
  );
}
