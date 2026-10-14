import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function CtaBanner() {
  return (
    <section
      id="cta"
      className="scroll-mt-16 md:scroll-mt-19 relative bg-black px-5 md:px-15 py-24 md:py-30 text-center overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(201,168,76,0.025) 59px, rgba(201,168,76,0.025) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(201,168,76,0.025) 59px, rgba(201,168,76,0.025) 60px)",
        }}
      />

      <div className="relative z-10">
        <div className="text-gold text-[18px] tracking-[5px] mb-8 whitespace-nowrap">★ ★ ★</div>

        <h2 className="font-serif font-light text-white leading-[1.05] mb-6 text-[clamp(40px,5vw,72px)]">
          Ready for a
          <br />
          <em className="text-gold not-italic">Professional Installation?</em>
        </h2>

        <p className="text-[14px] text-silver max-w-125 mx-auto mb-12 leading-[1.9]">
          Talk to our team today and receive a customised solution for your
          project, from luxury villas to commercial developments across
          Kenya and East Africa.
        </p>

        <div className="flex gap-3.5 justify-center flex-wrap">
          <a
            href="/contacts"
            className="bg-gold text-black px-9 py-4 text-[11px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-gold-lt"
          >
            Request a Free Quote
          </a>
          <a
            href="/contacts"
            className="bg-transparent text-white border border-white/25 px-9 py-3.75 text-[11px] font-medium tracking-[2px] uppercase transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Schedule a Site Visit
          </a>
          <a
            href="https://wa.me/254799928056"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-9 py-4 text-[11px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-[#20ba5a] inline-flex items-center gap-2"
          >
            <WhatsAppIcon className="w-4.5 h-4.5" />
            WhatsApp Us
          </a>
          <a
            href="tel:+254799928056"
            className="bg-transparent text-white border border-white/25 px-9 py-3.75 text-[11px] font-medium tracking-[2px] uppercase transition-all duration-300 hover:border-gold hover:text-gold inline-flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}