import Link from "next/link";

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

export default function AboutSection() {
  return (
    <section id="about" className="bg-char px-5 md:px-15 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-260 mx-auto mb-16 md:mb-20">
        <div>
          <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-5">
            <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
            About Luxora
          </div>
          <h2 className="font-serif text-[32px] md:text-[44px] font-light text-white leading-tight mb-6">
            Architectural Glazing
            <br />
            <em className="text-gold not-italic">Engineered for Modern Living</em>
          </h2>
          <p className="text-[14px] text-silver leading-[1.9] mb-4">
            Luxora Glaze System Limited is a premium architectural glazing
            and building-envelope company serving residential, commercial,
            hospitality, and architectural projects across Kenya and East
            Africa.
          </p>
          <p className="text-[14px] text-silver leading-[1.9] mb-8">
            We are a systems partner, not a product supplier, integrating
            precision engineering, quality materials, expert fabrication,
            and professional installation into every project.
          </p>
          <Link
            href="/about"
            className="bg-gold text-black px-8 py-3.5 text-[11px] font-bold tracking-[2px] uppercase inline-block transition-all duration-300 hover:bg-gold-lt"
          >
            Learn More About Us
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          <div className="bg-black p-7">
            <div className="text-[10px] font-semibold tracking-[3px] uppercase text-gold mb-3">
              Our Vision
            </div>
            <p className="text-[13px] text-silver leading-[1.8]">
              To become a leading architectural glazing and
              building-envelope company in East Africa, recognized for
              engineering excellence and innovation.
            </p>
          </div>
          <div className="bg-black p-7">
            <div className="text-[10px] font-semibold tracking-[3px] uppercase text-gold mb-3">
              Our Mission
            </div>
            <p className="text-[13px] text-silver leading-[1.8]">
              To deliver professionally engineered glazing solutions, with
              dependable service from design and consultation through
              installation and after-sales support.
            </p>
          </div>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="max-w-260 mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-3">
            <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
            Our Values
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {VALUES.map((value) => (
            <div key={value.title} className="bg-black p-7">
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
    </section>
  );
}
