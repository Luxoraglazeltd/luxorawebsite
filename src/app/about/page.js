import Link from "next/link";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { webPageLd, breadcrumbLd } from "@/lib/jsonld";

export const metadata = {
  alternates: { canonical: "/about" },
  title: "About Us: Luxora Glaze System Limited",
  description:
    "Learn about Luxora Glaze System Limited, a Malindi glazing company built on precision, integrity and quality, with a systems approach to every project.",
};

const VALUES = [
  {
    title: "Precision",
    desc: "Accurate measurement, engineering, fabrication, and installation are fundamental to quality.",
  },
  {
    title: "Integrity",
    desc: "We communicate honestly and stand behind our commitments.",
  },
  {
    title: "Quality",
    desc: "We pursue high standards in materials, workmanship, installation, and service.",
  },
  {
    title: "Innovation",
    desc: "We continuously explore better technologies, designs, and building solutions.",
  },
  {
    title: "Accountability",
    desc: "We take responsibility for our work, our commitments, and the results we deliver.",
  },
  {
    title: "Customer Service",
    desc: "We build long-term relationships by listening, responding, and delivering professionally.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <Nav />
      <JsonLd data={[webPageLd({ type: "AboutPage", name: metadata.title, description: metadata.description, path: "/about" }), breadcrumbLd([{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }])]} />
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
            <span>About Us</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.05] mb-4 text-[clamp(36px,5vw,64px)]">
            About <em className="text-gold not-italic">Luxora</em>
          </h1>
          <p className="text-[15px] text-silver max-w-140 leading-[1.85]">
            Architectural glazing engineered for modern living.
          </p>
        </div>
      </div>

      {/* ABOUT */}
      <div className="px-5 md:px-15 py-16 md:py-24">
        <div className="max-w-170 mx-auto">
          <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-5">
            <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
            Who We Are
          </div>
          <p className="text-[15px] text-silver leading-[1.9] mb-6">
            Luxora Glaze System Limited is a premium architectural glazing
            and building-envelope company serving residential, commercial,
            hospitality, and architectural projects across Kenya and East
            Africa.
          </p>
          <p className="text-[15px] text-silver leading-[1.9] mb-6">
            We specialize in aluminium windows and doors, advanced glazing
            systems, IGU solutions, glass facades, curtain walls, sliding
            and folding doors, skylights, glass railings, shower
            enclosures, uPVC systems, and customized architectural
            solutions.
          </p>
          <p className="text-[15px] text-silver leading-[1.9]">
            We are a systems partner, not a product supplier. Our approach
            integrates precision engineering, quality materials, expert
            fabrication, professional installation, and responsive customer
            service to deliver glazing systems that enhance the
            performance, comfort, security, and appearance of modern
            buildings.
          </p>
        </div>
      </div>

      {/* VISION / MISSION */}
      <div className="bg-char px-5 md:px-15 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-170 mx-auto">
          <div className="bg-card p-6 md:p-7">
            <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-5">
              <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
              Our Vision
            </div>
            <p className="font-serif text-[20px] text-white leading-[1.6] font-light">
              To become a leading architectural glazing and
              building-envelope company in East Africa, recognized for{" "}
              <em className="text-gold not-italic">
                engineering excellence, quality, innovation
              </em>
              , and exceptional customer experience.
            </p>
          </div>
          <div className="bg-card p-6 md:p-7">
            <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-5">
              <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
              Our Mission
            </div>
            <p className="font-serif text-[20px] text-white leading-[1.6] font-light">
              To deliver professionally engineered glazing solutions that
              combine architectural beauty, performance, durability, and
              value, delivered through{" "}
              <em className="text-gold not-italic">
                dependable service from design to after-sales support
              </em>
              .
            </p>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="px-5 md:px-15 py-16 md:py-24">
        <div className="max-w-170 mx-auto mb-12">
          <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-5">
            <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
            Our Values
          </div>
          <h2 className="font-serif text-[28px] md:text-[36px] font-light text-white leading-tight">
            What Guides <em className="text-gold not-italic">Every Project</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-260 mx-auto">
          {VALUES.map((value) => (
            <div key={value.title} className="bg-card p-7">
              <h4 className="font-serif text-[19px] font-normal text-gold mb-2.5">
                {value.title}
              </h4>
              <p className="text-[13px] text-silver leading-[1.8]">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY LUXORA STATEMENT */}
      <div className="bg-char px-5 md:px-15 py-16 md:py-24 text-center">
        <div className="max-w-160 mx-auto">
          <div className="flex items-center justify-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-5">
            <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
            Why Luxora
            <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
          </div>
          <p className="font-serif text-[22px] md:text-[26px] text-white leading-[1.6] font-light italic">
            Unlike conventional suppliers, we think in systems. Every
            solution is engineered for performance in East Africa&apos;s
            climate, designed for architectural impact, and installed with
            precision for long-term durability. One partner, from design to
            after-sales.
          </p>
        </div>
      </div>
    </div>
  );
}
