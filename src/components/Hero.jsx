import { ShieldCheck } from "lucide-react";

const HERO_IMAGES = [
  "hero1.jpg",
  "hero2.jpg",
  "hero3.jpg",
  "hero4.jpg",
  "hero5.jpg",
  "hero6.jpg",
  "hero7.jpg",
  "hero8.jpg",
];
const DURATION = 5; // seconds each slide is visible before crossfading

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-start md:items-center overflow-hidden pt-16 pb-10 md:py-24">
      {/* SLIDESHOW */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_IMAGES.map((image, i) => (
          <div
            key={image}
            className="hero-slide absolute inset-0 bg-cover bg-center opacity-0"
            style={{
              backgroundImage: `url('/images/hero/${image}')`,
              animationDuration: `${HERO_IMAGES.length * DURATION}s`,
              animationDelay: `${i * DURATION}s`,
            }}
          />
        ))}
      </div>

      {/* GRADIENT OVERLAY */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to right, rgba(13,13,13,0.62) 0%, rgba(13,13,13,0.42) 45%, rgba(13,13,13,0.15) 100%), linear-gradient(to top, rgba(13,13,13,0.55) 0%, transparent 45%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-2 px-5 md:px-15 max-w-170">
        <div className="flex items-center gap-3.5 text-[9px] md:text-[10px] font-semibold tracking-[2px] md:tracking-[4px] uppercase text-gold mb-7 whitespace-nowrap">
          Architectural Glazing for Modern Living
        </div>

        <h1 className="font-serif font-light leading-[0.95] text-white mb-6 tracking-tight hero-title-shadow text-[clamp(38px,11vw,96px)]">
          Engineering
          <br />
          <em className="text-gold block">Light & Luxury</em>
        </h1>

        <p className="text-[13px] font-light text-[#D4D4D4] max-w-120 leading-[1.9] mb-12 tracking-wide hero-sub-shadow">
          Luxora Glaze System Limited delivers premium aluminium, uPVC/vinyl
          and architectural glass solutions for modern residential,
          hospitality and commercial projects across Kenya and East Africa.
          From consultation and specification to supply and professional
          installation, we combine refined architectural design, carefully
          selected systems and disciplined installation practices to help
          create spaces that are comfortable, functional, secure and
          visually exceptional.
        </p>

        <div className="flex gap-4 items-center flex-wrap mb-20 md:mb-0">
          <a
            href="/contacts"
            className="bg-gold text-black px-10 py-4 text-[11px] font-bold tracking-[2.5px] uppercase inline-block transition-all duration-300 hover:bg-gold-lt hover:-translate-y-px"
          >
            Request a Quote
          </a>
          <a
            href="/gallery"
            className="bg-transparent text-white border border-white/25 px-10 py-3.75 text-[11px] font-medium tracking-[2.5px] uppercase inline-block transition-all duration-300 hover:border-gold hover:text-gold"
          >
            View Our Projects
          </a>
        </div>
      </div>

      {/* FLOATING BADGE */}
      <div className="hidden md:flex absolute right-20 bottom-20 z-2 flex-col items-center gap-1.5">
        <div className="w-25 h-25 border border-gold/40 rounded-full flex items-center justify-center flex-col bg-black/80 backdrop-blur-sm px-2">
          <ShieldCheck className="w-6 h-6 text-gold" strokeWidth={1.5} />
          <div className="text-[7px] tracking-[1px] uppercase text-gold text-center leading-tight mt-1">
            Engineered
            <br />
            for Durability
          </div>
        </div>
      </div>
    </section>
  );
}