"use client";

import { useState, useEffect } from "react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const CATEGORY_INTRO = {
  aluminium:
    "Premium aluminium windows, doors, and curtain wall systems. Engineered for performance with European hardware, thermal-break technology, and double tempered insulating glass units.",
  upvc: "Energy-efficient uPVC window and door systems for luxury residential, hospitality, and commercial projects. Superior thermal and acoustic performance, low maintenance, and long service life.",
  glass:
    "Large-scale glass solutions for facades, skylights, railings, and architectural feature glazing. IGU double glazing, tempered, laminated, Low-E, and custom architectural glass configurations.",
  specialty:
    "Complementary products completing the Luxora offering: premium shower enclosures and architectural garage doors for luxury residential and hospitality projects.",
};

// Aluminium and uPVC are each split into Windows and Doors, so the two categories are clear
// and the specific door types are listed under Doors.
const GROUPS = {
  aluminium: [
    {
      id: "windows",
      label: "Windows",
      blurb: "Casement, fixed, sliding and other architectural window formats.",
      slugs: ["aluminium-windows"],
    },
    {
      id: "doors",
      label: "Doors",
      blurb: "Entrance, sliding, lift and slide, folding and pivot door systems.",
      slugs: ["aluminium-doors", "sliding-doors", "lift-slide-doors", "folding-doors", "pivot-doors"],
    },
  ],
  upvc: [
    {
      id: "windows",
      label: "Windows",
      blurb: "Casement, fixed and sliding window formats.",
      slugs: ["upvc-windows"],
    },
    {
      id: "doors",
      label: "Doors",
      blurb: "Entrance, sliding and folding door systems for patios and balconies.",
      slugs: ["upvc-doors", "sliding-upvc-systems", "folding-upvc-doors"],
    },
  ],
};

export default function Products() {
  const [active, setActive] = useState("aluminium");
  const [groupByCategory, setGroupByCategory] = useState({ aluminium: "doors", upvc: "doors" });

  // Deep links like /#product-sliding-doors: switch to the product's category, then scroll to it
  useEffect(() => {
    const goToHashProduct = () => {
      const match = window.location.hash.match(/^#product-(.+)$/);
      const product = match && PRODUCTS.find((p) => p.slug === match[1]);
      if (!product) return;
      setActive(product.category);
      const owner = (GROUPS[product.category] || []).find((g) => g.slugs.includes(product.slug));
      if (owner) setGroupByCategory((current) => ({ ...current, [product.category]: owner.id }));
      setTimeout(() => {
        document
          .getElementById(`product-${product.slug}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    };
    goToHashProduct();
    window.addEventListener("hashchange", goToHashProduct);
    return () => window.removeEventListener("hashchange", goToHashProduct);
  }, []);

  const groups = GROUPS[active];
  const activeGroup = groups?.find((g) => g.id === groupByCategory[active]);
  const filtered = activeGroup
    ? activeGroup.slugs.map((slug) => PRODUCTS.find((p) => p.slug === slug))
    : PRODUCTS.filter((p) => p.category === active);
  const activeLabel = CATEGORIES.find((c) => c.id === active)?.label;

  return (
    <section id="products" className="scroll-mt-16 md:scroll-mt-19 bg-char px-5 md:px-15 py-16 md:py-24">
      {/* HEADER */}
      <div className="mb-10 md:mb-14">
        <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
          <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
          Our Products
        </div>
        <h2 className="font-serif text-[32px] md:text-[44px] font-light text-white leading-tight section-title">
          Complete Glazing &<br />
          <em>Fenestration Systems</em>
        </h2>
        <p className="text-[14px] text-silver max-w-140 leading-[1.85] mt-3">
          Three core systems covering every architectural glazing requirement,
          from luxury aluminium to energy-efficient uPVC and large-scale
          architectural glass.
        </p>
        <Link
          href="/product-list"
          className="bg-gold text-black text-[10px] font-bold tracking-[2px] uppercase inline-flex items-center justify-center gap-2 px-5 py-3 w-fit transition-all duration-300 hover:bg-gold-lt mt-4"
        >
          View Our Product Catalogue <span>→</span>
        </Link>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex gap-1 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActive(cat.id);
              // Opening a category always starts on Doors, until the visitor taps Windows
              setGroupByCategory((current) => ({ ...current, [cat.id]: "doors" }));
            }}
            className={`px-4 md:px-5.5 py-2.5 text-[11px] font-medium tracking-[1.5px] uppercase border transition-all duration-300 cursor-pointer ${
              active === cat.id
                ? "bg-gold border-gold text-black"
                : "bg-transparent border-border text-silver hover:bg-gold hover:border-gold hover:text-black"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* CATEGORY INTRO */}
      <div className="mb-8">
        <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-3">
          <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
          {activeLabel}
        </div>
        <p className="text-[14px] text-silver max-w-160 leading-[1.8]">
          {CATEGORY_INTRO[active]}
        </p>
      </div>

      {/* WINDOWS OR DOORS (Aluminium and uPVC) */}
      {groups && activeGroup && (
        <div className="mb-8 md:mb-10">
          <div className="flex gap-1.5">
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGroupByCategory((current) => ({ ...current, [active]: g.id }))}
                aria-pressed={activeGroup.id === g.id}
                className={`px-4 py-2 text-[10px] font-semibold tracking-[1.5px] uppercase border transition-all duration-300 cursor-pointer ${
                  activeGroup.id === g.id
                    ? "bg-gold border-gold text-black"
                    : "bg-transparent border-border text-silver hover:border-gold hover:text-gold"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
          <p className="text-[12px] text-dim leading-[1.7] mt-3 max-w-120">
            {activeGroup.blurb}
          </p>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
