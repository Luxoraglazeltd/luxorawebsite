import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/#products", label: "Products" },
  { href: "/product-list", label: "Product Catalogue" },
  { href: "/gallery", label: "Projects & Gallery" },
  { href: "/#installation", label: "Installation Process" },
  { href: "/downloads", label: "Download Centre" },
  { href: "/blog", label: "Blog / News & Insight" },
  { href: "/#cta", label: "Contact Us" },
];

const PRODUCT_LINKS = [
  { label: "Aluminium Windows", href: "/#product-aluminium-windows" },
  { label: "Sliding Doors", href: "/#product-sliding-doors" },
  { label: "Folding Doors", href: "/#product-folding-doors" },
  { label: "Curtain Wall Systems", href: "/#products" },
  { label: "Glass Facades", href: "/#products" },
  { label: "Shower Enclosures", href: "/#product-shower-enclosures" },
  { label: "Skylights & Rooflights", href: "/#product-skylights" },
  { label: "Glass Railings", href: "/#product-glass-railing" },
];

const SOCIALS = [
  { label: "Facebook", short: "f" },
  { label: "Instagram", short: "ig" },
  { label: "LinkedIn", short: "in" },
  { label: "TikTok", short: "tk" },
  { label: "YouTube", short: "yt" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] px-5 md:px-15 pt-16 md:pt-20 pb-8 md:pb-10 border-t border-gold/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr] gap-10 md:gap-14 mb-14 md:mb-16">
        {/* BRAND */}
        <div>
          <Image
            src="/images/brand/logo.png"
            alt="Luxora Glaze System Limited"
            height={60}
            width={120}
            className="h-9 w-auto object-contain mb-5"
          />
          <p className="font-serif italic text-[14px] text-silver leading-[1.8] mb-5">
            Delivering premium glazing solutions that combine innovation,
            precision, and lasting quality to transform every space.
          </p>
          <div className="text-[11px] text-white/50 tracking-wide leading-[2.2]">
            Aluminium Windows · Sliding Doors · Folding Doors
            <br />
            Curtain Walls · Glass Facades · Shower Systems
            <br />
            Skylights · Glass Railings · Custom Solutions
            <br />
            Serving Kenya & East Africa
          </div>
          <div className="flex gap-2.5 mt-5">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="w-8 h-8 border border-gold/25 flex items-center justify-center text-gold text-[11px] font-semibold lowercase transition-all duration-300 hover:bg-gold hover:text-black"
              >
                {social.short}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h5 className="text-[10px] font-semibold tracking-[2.5px] uppercase text-gold mb-5">
            Quick Links
          </h5>
          <ul className="list-none">
            {QUICK_LINKS.map((link) => (
              <li key={link.label} className="mb-2.5">
                <a
                  href={link.href}
                  className="text-[13px] text-silver no-underline transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* PRODUCTS */}
        <div>
          <h5 className="text-[10px] font-semibold tracking-[2.5px] uppercase text-gold mb-5">
            Our Products
          </h5>
          <ul className="list-none">
            {PRODUCT_LINKS.map(({ label, href }) => (
              <li key={label} className="mb-2.5">
                <a
                  href={href}
                  className="text-[13px] text-silver no-underline transition-colors duration-300 hover:text-gold"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h5 className="text-[10px] font-semibold tracking-[2.5px] uppercase text-gold mb-5">
            Contact Info
          </h5>
          <div className="flex flex-col gap-3.5">
            <div className="flex gap-2.5 items-start">
              <Phone className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="text-[12px] text-silver leading-[1.6]">
                +254 799 928 056
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <Mail className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="text-[12px] text-silver leading-[1.6]">
                info@luxoraglazesystem.com
                <br />
                sales@luxoraglazesystem.com
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <Globe className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="text-[12px] text-silver leading-[1.6]">
                www.luxoraglazesystem.com
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
              <div className="text-[12px] text-silver leading-[1.6]">
                Malindi, Kilifi County, Kenya
                <br />
                Serving Kenya & East Africa
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex justify-between items-center pt-8 border-t border-border flex-wrap gap-3">
        <p className="text-[11px] text-white/40">
          © 2026 Luxora Glaze System Limited. All Rights Reserved.
        </p>
        <a
          href="https://www.veritasdataservices.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-gold/40 hover:text-gold transition-colors duration-200"
        >
          Website by Veritas Data Services
        </a>
        <p className="text-[11px] text-white/40">
          <Link href="/privacy-policy" className="hover:text-gold transition-colors">
            Privacy Policy
          </Link>
          {" · "}
          Terms & Conditions
        </p>
      </div>
    </footer>
  );
}