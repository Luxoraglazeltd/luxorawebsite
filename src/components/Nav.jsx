"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#installation", label: "Installation" },
  { href: "/gallery", label: "Projects" },
  { href: "#why", label: "Why Luxora" },
  { href: "/blog", label: "Blog / News & Insight" },
  { href: "/contacts", label: "Contact" },
];

const MOBILE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/#products", label: "Products & Services" },
  { href: "/product-list", label: "Product Catalogue" },
  { href: "/#installation", label: "Installation Process" },
  { href: "/gallery", label: "Projects & Gallery" },
  { href: "/contacts", label: "Request a Quote" },
  { href: "/downloads", label: "Download Centre" },
  { href: "/blog", label: "Blog / News & Insight" },
  { href: "/contacts", label: "Contact Us" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-gold px-5 md:px-[60px] py-1 md:py-2 flex justify-center md:justify-end items-center text-black tracking-wide overflow-hidden">
        <span className="whitespace-nowrap truncate text-[9px] md:text-[12px]">
          Engineered for Performance. Built for Kenya & East Africa.
        </span>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-[100] flex items-center justify-between px-5 md:px-[60px] h-16 md:h-[76px] bg-black/97 backdrop-blur-md border-b border-gold/10">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/images/brand/logo.png"
            alt="Luxora Glaze System Limited"
            height={64}
            width={128}
            className="h-9 w-auto object-contain md:h-12"
            priority
          />
        </Link>

        <ul className="hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative pb-1 text-[11px] font-medium tracking-[1.5px] uppercase text-silver transition-colors duration-300 hover:text-gold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gold after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="flex flex-col gap-[5px] cursor-pointer p-1 bg-transparent border-none z-[200] ml-4"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-[26px] h-[1.5px] bg-gold transition-all duration-300 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-[26px] h-[1.5px] bg-gold transition-all duration-300 ${
              open ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-[26px] h-[1.5px] bg-gold transition-all duration-300 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/60 z-[148] transition-opacity duration-350 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* MOBILE MENU PANEL */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-[#111111] border-l border-gold/15 z-[149] flex flex-col transition-transform duration-400 ${
          open ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center px-7 py-6 border-b border-gold/10">
          <div className="font-serif text-[22px] font-light text-gold tracking-wide">
            LUXORA
          </div>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="bg-transparent border border-gold/25 text-gold w-9 h-9 flex items-center justify-center text-lg transition-all duration-200 hover:bg-gold/10 hover:border-gold"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col py-4 overflow-y-auto flex-1">
          {MOBILE_LINKS.map((link) =>
            link.href.includes("#") ? (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center gap-3 px-7 py-[15px] text-[11px] font-medium tracking-[2px] uppercase text-silver border-b border-gold/[0.06] transition-all duration-200 hover:text-gold hover:bg-gold/[0.04] hover:pl-9"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center gap-3 px-7 py-[15px] text-[11px] font-medium tracking-[2px] uppercase text-silver border-b border-gold/[0.06] transition-all duration-200 hover:text-gold hover:bg-gold/[0.04] hover:pl-9"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="px-7 py-6 border-t border-gold/10 flex flex-col gap-2">
          <a href="tel:+254799928056" className="text-silver text-[13px] hover:text-gold">
            +254 799 928 056
          </a>
          <a
            href="mailto:info@luxoraglaze.co.ke"
            className="text-silver text-[13px] hover:text-gold"
          >
            info@luxoraglaze.co.ke
          </a>
        </div>
      </div>
    </>
  );
}