import { ShieldCheck } from "lucide-react";

const STATS = [
  { num: "150+", label: "Projects Completed" },
  { num: "100+", label: "Happy Clients" },
  { num: "8+", label: "Years Experience" },
  { num: "5+", label: "Counties Served" },
  { icon: ShieldCheck, label: "Warranty Support" },
];

export default function TrustBar() {
  return (
    <div className="bg-gold grid grid-cols-2 md:grid-cols-5 gap-0 px-4 md:px-[60px] py-7">
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`text-center px-5 py-2 ${
            i !== STATS.length - 1 ? "border-r border-black/15" : ""
          }`}
        >
          {stat.icon ? (
            <stat.icon className="w-8 h-8 text-black mx-auto" strokeWidth={1.5} />
          ) : (
            <div className="font-display text-[38px] text-black tracking-wide leading-none">
              {stat.num}
            </div>
          )}
          <div className="text-[10px] tracking-[2px] uppercase text-black/70 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
