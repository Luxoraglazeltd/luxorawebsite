"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WHATSAPP_NUMBER = "254799928056";

export default function FloatingWhatsApp() {
  return (
    <div className="wa-enter fixed bottom-10 right-6 z-50 md:bottom-6">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7 fill-white" />
      </a>
    </div>
  );
}
