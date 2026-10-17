import { client } from "@/sanity/lib/client";
import NavMenu from "@/components/NavMenu";

const CATEGORY_LABELS = {
  brochure: "Product Brochure",
  datasheet: "Technical Data Sheet",
  installation: "Installation Guide",
  warranty: "Warranty Information",
};

const CATEGORY_ORDER = ["brochure", "datasheet", "installation", "warranty"];

const MENU_DOWNLOADS_QUERY = `*[_type == "downloadDocument" && defined(file.asset)] | order(coalesce(order, 999999) asc, _createdAt desc) {
  _id,
  title,
  category
}`;

// Server wrapper: fetches the CMS downloads and hands them to the client-side menu
export default async function Nav() {
  // The menu must still render if Sanity is slow or unreachable
  let docs = [];
  try {
    docs = await client.fetch(MENU_DOWNLOADS_QUERY);
  } catch (err) {
    console.error("Menu downloads: Sanity fetch failed", err);
  }

  const downloadGroups = CATEGORY_ORDER.map((key) => ({
    key,
    label: CATEGORY_LABELS[key],
    items: docs.filter((d) => d.category === key),
  })).filter((group) => group.items.length > 0);

  return <NavMenu downloadGroups={downloadGroups} />;
}
