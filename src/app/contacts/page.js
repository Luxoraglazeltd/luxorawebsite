import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import { webPageLd, breadcrumbLd, faqLd } from "@/lib/jsonld";
import { FAQS } from "@/data/faqs";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export const metadata = {
  alternates: { canonical: "/contacts" },
  title: "Contact Us | Luxora Glaze System Limited",
  description:
    "Get in touch with Luxora Glaze System Limited for aluminium, uPVC, and architectural glass solutions in Malindi, Kenya.",
};

const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: "Phone",
    lines: [{ text: "+254 799 928 056", href: "tel:+254799928056" }],
  },
  {
    icon: Mail,
    label: "Email",
    lines: [
      { text: "info@luxoraglazesystemltd.com", href: "mailto:info@luxoraglazesystemltd.com" },
      { text: "sales@luxoraglazesystemltd.com", href: "mailto:sales@luxoraglazesystemltd.com" },
    ],
  },
  {
    icon: MapPin,
    label: "Location",
    lines: [
      { text: "Along Malindi-Mombasa Road" },
      { text: "Malindi Mall, Malindi, Kenya" },
    ],
  },
  {
    icon: Clock,
    label: "Working Hours",
    lines: [{ text: "Monday to Saturday" }, { text: "8:00 AM to 6:00 PM EAT" }],
  },
];

export default function ContactPage() {
  return (
    <div>
      <Nav />
      <JsonLd data={[webPageLd({ type: "ContactPage", name: metadata.title, description: metadata.description, path: "/contacts" }), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contacts" }]), faqLd(FAQS)]} />
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
            <span>Contact Us</span>
          </div>
          <h1 className="font-serif font-light text-white leading-[1.05] mb-4 text-[clamp(36px,5vw,64px)]">
            Get in <em className="text-gold not-italic">Touch</em>
          </h1>
          <p className="text-[15px] text-silver max-w-140 leading-[1.85]">
            Talk to our team about your project. We work with architects,
            property developers, hotels, resorts, and homeowners across
            Kenya and East Africa.
          </p>
        </div>
      </div>

      {/* CONTACT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        {/* FORM PANEL */}
        <ContactForm />

        {/* INFO PANEL */}
        <div className="bg-char p-8 md:p-15 border-l-0 md:border-l border-border">
          <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-7">
            <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
            Contact Information
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-10">
            {CONTACT_DETAILS.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.label} className="bg-card p-6">
                  <div className="w-11 h-11 border border-gold/25 flex items-center justify-center text-gold mb-4">
                    <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                  </div>
                  <div className="text-[10px] text-dim tracking-[1.5px] uppercase mb-1">
                    {detail.label}
                  </div>
                  <div className="text-[15px] text-white leading-[1.6]">
                    {detail.lines.map((line, i) =>
                      line.href ? (
                        <a
                          key={i}
                          href={line.href}
                          className="text-white no-underline hover:text-gold transition-colors block"
                        >
                          {line.text}
                        </a>
                      ) : (
                        <span key={i} className="block">
                          {line.text}
                        </span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
              <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
              WhatsApp
            </div>
            <a
              href="https://wa.me/254799928056"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 text-[11px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-[#20ba5a]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <Faq />
    </div>
  );
}
