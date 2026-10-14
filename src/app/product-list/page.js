import Link from "next/link";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { webPageLd, breadcrumbLd } from "@/lib/jsonld";

export const metadata = {
  alternates: { canonical: "/product-list" },
  title: "Product Catalogue | Luxora Glaze System Limited",
  description:
    "A complete catalogue of all aluminium, uPVC, and glass products offered by Luxora Glaze System Limited.",
};

const CATEGORIES = [
  {
    title: "Windows",
    items: [
      "Premium aluminium windows",
      "Casement windows",
      "Tilt & turn windows",
      "Sliding windows",
      "Folding windows",
      "Hung windows",
      "Awning windows",
      "Fixed / picture windows",
      "Thermal-break windows",
      "Window-wall systems",
      "Aluminium-clad wood systems",
      "Passive / high-performance window options",
      "Vinyl / uPVC windows",
    ],
  },
  {
    title: "Doors",
    items: [
      "Sliding doors",
      "Lift & slide doors",
      "Multi-slide systems",
      "Bi-fold / folding doors",
      "Pivot and entrance doors",
      "French-style doors",
      "Interior aluminium/glass doors",
      "Garage and specialized custom door systems",
    ],
  },
  {
    title: "Glass & Architectural Glazing",
    items: [
      "Insulating Glass Units (IGUs)",
      "Low-E glazing",
      "Tempered safety glass",
      "Laminated safety glass",
      "Reflective glass",
      "Tinted and decorative glass",
      "Glass shower enclosures",
      "Glass office partitions",
      "Curtain walls and façades",
      "Skylights / rooflights",
      "Glass railings and custom glazing",
    ],
  },
  {
    title: "uPVC / Vinyl Product Family",
    items: [
      "Vinyl single-hung window",
      "Vinyl single-hung window with tilt",
      "Vinyl double-hung window",
      "Vinyl sliding window",
      "Vinyl crank window",
      "Vinyl patio sliding door",
    ],
  },
  {
    title: "Aluminium Product Family",
    items: [
      "Aluminium single-hung window",
      "Aluminium double-hung window",
      "Aluminium crank window",
      "Aluminium sliding window",
      "Aluminium sliding door",
      "Aluminium prehung commercial door",
      "Aluminium folding door",
    ],
  },
];

export default function ProductListPage() {
  return (
    <div>
      <Nav />
      <JsonLd data={[webPageLd({ type: "CollectionPage", name: metadata.title, description: metadata.description, path: "/product-list" }), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Product Catalogue", path: "/product-list" }])]} />
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
            <span>Product Catalogue</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.05] mb-4 text-[clamp(36px,5vw,64px)]">
            Product <em className="text-gold not-italic">Catalogue</em>
          </h1>
          <p className="text-[15px] text-silver max-w-140 leading-[1.85]">
            Every system Luxora offers, at a glance, organized by category
            for quick reference.
          </p>
        </div>
      </div>

      {/* CATEGORY LISTS */}
      <div className="px-5 md:px-15 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-260 mx-auto">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="bg-card p-6 md:p-7">
              <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[3px] uppercase text-gold mb-5">
                <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
                {cat.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-[14px] text-silver leading-[1.7] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gold/50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20 md:mt-24">
          <Link
            href="/downloads"
            className="bg-gold text-black px-10 py-4 text-[11px] font-bold tracking-[2.5px] uppercase inline-block transition-all duration-300 hover:bg-gold-lt"
          >
            Click Here for Our Product Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
