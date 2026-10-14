"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/faqs";


export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="px-5 md:px-15 py-16 md:py-24 border-t border-border">
      <div className="max-w-160 mx-auto">
        <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
          <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
          FAQ
        </div>
        <h2 className="font-serif text-[28px] md:text-[36px] font-light text-white leading-tight mb-10">
          Frequently Asked <em className="text-gold not-italic">Questions</em>
        </h2>

        <div className="flex flex-col">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="border-b border-border">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                >
                  <span className="font-serif text-[17px] text-white font-normal">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
                {isOpen && (
                  <p className="text-[13px] text-silver leading-[1.8] pb-5 pr-8">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}