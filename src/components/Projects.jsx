const SHOWCASE_COUNT = 8;
const DURATION = SHOWCASE_COUNT * 4;

export default function Showcase() {
  return (
    <section className="bg-char py-16 md:py-24">
      <div className="px-4 md:px-[60px] mb-12">
        <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
          <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
          Signature Systems
        </div>
        <h2 className="font-serif text-[32px] md:text-[44px] font-light text-white leading-tight">
          Frameless Showers &
          <br />
          <em className="text-gold">Folding Door Systems</em>
        </h2>
      </div>

      <div className="relative w-full h-[320px] md:h-[560px] overflow-hidden px-4 md:px-[60px]">
        <div className="relative w-full h-full overflow-hidden">
          {Array.from({ length: SHOWCASE_COUNT }).map((_, i) => (
            <div
              key={i}
              className="prod-slide absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/showcase/showcase${i + 1}.jpg')`,
                animationDuration: `${DURATION}s`,
                animationDelay: `${i * 4}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}