import { PDFDocument } from "pdf-lib";
import { client } from "@/sanity/lib/client";

// The whole PDF is held in memory while it is optimized, so very large files are handed
// straight to Sanity's CDN instead. Nothing is ever written to the server's disk.
const MAX_PROXY_BYTES = 25 * 1024 * 1024;

const DOC_QUERY = `*[_type == "downloadDocument" && _id == $id && defined(file.asset)][0] {
  title,
  "url": file.asset->url
}`;

function safeFileName(title) {
  const name = (title || "luxora-document")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${name || "luxora-document"}.pdf`;
}

// Re-saves the PDF with compressed object streams and no editing-tool metadata.
// This trims structural overhead; it cannot downsample images inside the PDF.
async function optimizePdf(bytes) {
  const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
  pdf.setProducer("Luxora Glaze System Limited");
  pdf.setCreator("Luxora Glaze System Limited");
  return pdf.save({ useObjectStreams: true });
}

export async function GET(request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return new Response("Missing document id", { status: 400 });

  const doc = await client.fetch(DOC_QUERY, { id });
  if (!doc?.url) return new Response("Document not found", { status: 404 });

  const fileName = safeFileName(doc.title);
  const fallback = () => Response.redirect(`${doc.url}?dl=${fileName}`, 302);

  try {
    const original = new Uint8Array(await (await fetch(doc.url)).arrayBuffer());

    let body = original;
    try {
      const optimized = await optimizePdf(original);
      if (optimized.length < original.length) body = optimized;
    } catch {
      // Encrypted or unusual PDFs can't be re-saved; serve the original untouched.
    }

    if (body.length > MAX_PROXY_BYTES) return fallback();

    return new Response(body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": String(body.length),
        // Only a hint to browsers/CDNs. No server-side cache exists, so without a CDN
        // each download is optimized fresh, which stays correct on an ephemeral filesystem.
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return fallback();
  }
}
