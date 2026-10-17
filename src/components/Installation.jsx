import { Shield, Waves, Droplet, CheckCircle2, Award } from "lucide-react";

const STEPS = [
  {
    num: "01",
    name: "Project Review & Site Assessment",
    desc: "Review drawings, openings, access, exposure and project requirements.",
  },
  {
    num: "02",
    name: "Site Measurement",
    desc: "Verify opening dimensions and site conditions before fabrication.",
  },
  {
    num: "03",
    name: "Opening Preparation",
    desc: "Ensure the opening is correctly sized, sound, clean, aligned and suitable for the selected system.",
  },
  {
    num: "04",
    name: "Sill & Water-Management Prep",
    desc: "Provide appropriate sloping, sill protection, flashing or compatible water-management details where required.",
  },
  {
    num: "05",
    name: "Frame Positioning",
    desc: "Set the frame accurately, plumb, level and square it.",
  },
  {
    num: "06",
    name: "Mechanical Fixing",
    desc: "Use appropriate anchors/fasteners and fixing locations for the system and substrate.",
  },
  {
    num: "07",
    name: "Insulation & Perimeter Sealing",
    desc: "Use compatible backer materials, insulation and sealants as specified.",
  },
  {
    num: "08",
    name: "Drainage & Weep-Path Check",
    desc: "Ensure designed drainage paths remain open and functional.",
  },
  {
    num: "09",
    name: "Glass & Hardware Installation",
    desc: "Install glazing, gaskets, beads and hardware according to the selected system.",
  },
  {
    num: "10",
    name: "Final Inspection & QC",
    desc: "Check operation, alignment, seals, drainage and agreed testing before handover.",
  },
];

const BADGES = [
  { icon: Shield, text: "Documented", sub: "Performance Data" },
  { icon: Waves, text: "Coastal Durability", sub: "Material Protection Focus" },
  { icon: Droplet, text: "Drainage &", sub: "Water Management" },
  { icon: CheckCircle2, text: "Quality Control", sub: "Every Installation" },
  { icon: Award, text: "Systems", sub: "Not Just Products" },
];

export default function Installation() {
  return (
    <section
      id="installation"
      className="scroll-mt-16 md:scroll-mt-19 px-5 md:px-15 py-16 md:py-24"
      style={{
        background:
          "linear-gradient(160deg, #14100a 0%, #0D0D0D 55%, #1a1408 100%)",
      }}
    >
      {/* HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-end mb-12 md:mb-16">
        <div>
          <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[4px] uppercase text-gold mb-4">
            <span className="text-gold text-[13px] tracking-[2px] leading-none whitespace-nowrap shrink-0">★ ★ ★</span>
            Professional Installation
          </div>
          <h2 className="font-serif text-[32px] md:text-[44px] font-light text-white leading-tight">
            Installation Is Part
            <br />
            <em className="text-gold">of the Product</em>
          </h2>
        </div>
        <p className="text-[14px] text-silver leading-[1.8]">
          Luxora Glaze System Limited is committed to high-performance
          fenestration, using quality materials and professional installation
          practices. Performance requirements are confirmed for each project,
          and values are stated only where supported by the supplier’s
          technical documentation or tested performance reports.
        </p>
      </div>

      {/* STEPS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="group bg-white/[0.03] px-5 py-8 border-t-2 border-transparent transition-all duration-300 cursor-pointer hover:bg-gold/5 hover:border-gold"
          >
            <div className="font-display text-[44px] text-gold/15 leading-none mb-3.5 transition-colors duration-300 group-hover:text-gold/40">
              {step.num}
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-white mb-2 leading-snug">
              {step.name}
            </div>
            <div className="text-[12px] text-silver leading-[1.7]">
              {step.desc}
            </div>
          </div>
        ))}
      </div>

      {/* BADGES */}
      <div className="flex gap-8 md:gap-10 mt-12 md:mt-14 pt-8 md:pt-10 border-t border-gold/15 flex-wrap">
        {BADGES.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.text} className="flex items-center gap-3">
              <div className="w-[38px] h-[38px] border border-gold/40 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
              </div>
              <div className="text-[11px] font-semibold text-white tracking-wide leading-tight">
                {badge.text}
                <br />
                {badge.sub}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
