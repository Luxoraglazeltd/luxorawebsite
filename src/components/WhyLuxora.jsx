export default function WhyLuxora() {
  return (
    <section
      id="why"
      className="scroll-mt-16 md:scroll-mt-19 relative px-5 md:px-15 py-24 md:py-32 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/why/about1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
          <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
          Why Choose Luxora
        </div>
        <h2 className="font-serif text-[32px] md:text-[44px] font-light text-white leading-tight">
          Not a Product Supplier
          <br />
          <em className="text-gold">A Systems Partner</em>
        </h2>

        <div className="max-w-170 mt-10 md:mt-14">
          <p className="font-serif text-[22px] md:text-[28px] text-white leading-[1.6] font-light italic">
            Unlike conventional suppliers, we think in systems. Every
            solution is engineered for performance in East Africa&apos;s
            climate, designed for architectural impact, and installed with
            precision for long-term durability. One partner, from design to
            after-sales.
          </p>
        </div>
      </div>
    </section>
  );
}
