"use client";

import { ArrowRight } from "lucide-react";

export default function OpenMenuButton({ children }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("luxora:open-downloads"))}
      className="bg-gold text-black px-4 py-2.5 text-[9px] md:px-6 md:py-3 md:text-[10px] font-bold tracking-[1.5px] uppercase inline-flex items-center gap-2 cursor-pointer transition-all duration-300 hover:bg-gold-lt"
    >
      {children}
      <ArrowRight className="w-3 h-3" strokeWidth={2} />
    </button>
  );
}
