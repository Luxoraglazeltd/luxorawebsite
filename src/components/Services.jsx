import {
  ClipboardList,
  Package,
  Ruler,
  Wrench,
  Layers,
  Building2,
  Users,
  LifeBuoy,
} from "lucide-react";

const SERVICES = [
  {
    icon: ClipboardList,
    title: "Product Selection & Specification",
    desc: "Support choosing the right system based on application, performance requirements, and project design.",
  },
  {
    icon: Package,
    title: "Supply of Systems",
    desc: "Aluminium, uPVC/vinyl, glass and architectural glazing systems supplied to project specification.",
  },
  {
    icon: Ruler,
    title: "Site Measurement & Assessment",
    desc: "Accurate on-site measurement and project assessment before fabrication begins.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    desc: "Certified installation teams following our 10-step process, referencing AAMA/ASTM practices where applicable.",
  },
  {
    icon: Layers,
    title: "IGU & Safety-Glass Solutions",
    desc: "Insulated glass units and safety glazing specified to the project's performance and safety requirements.",
  },
  {
    icon: Building2,
    title: "Large-Opening & Glazing Coordination",
    desc: "Coordination of large-opening and architectural glazing for complex residential and commercial projects.",
  },
  {
    icon: Users,
    title: "Technical Support",
    desc: "Ongoing technical support for homeowners, architects, developers, and contractors.",
  },
  {
    icon: LifeBuoy,
    title: "After-Sales & Maintenance",
    desc: "After-sales and maintenance guidance, subject to the applicable product and warranty terms.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-black px-5 md:px-15 py-16 md:py-24">
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
          <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
          What We Offer
        </div>
        <h2 className="font-serif text-[32px] md:text-[44px] font-light text-white leading-tight">
          End-to-End
          <br />
          <em className="text-gold">Glazing Services</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="group bg-card p-7 md:p-8 transition-colors duration-300 hover:bg-[#202020]"
            >
              <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:border-gold">
                <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-[20px] font-normal text-white mb-3">
                {service.title}
              </h4>
              <p className="text-[13px] text-silver leading-[1.8]">
                {service.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
