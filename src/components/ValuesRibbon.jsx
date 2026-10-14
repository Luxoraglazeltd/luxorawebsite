const VALUES = [
  "Precision",
  "Integrity",
  "Quality",
  "Innovation",
  "Accountability",
  "Customer Service",
];

export default function ValuesRibbon() {
  const items = [...VALUES, ...VALUES];

  return (
    <div className="bg-black py-3.5 overflow-hidden whitespace-nowrap border-y border-gold/15">
      <div className="vr-track inline-flex">
        {items.map((item, i) => (
          <div
            key={i}
            className="text-[11px] font-bold tracking-[3px] uppercase text-gold px-8 border-r border-gold/20 whitespace-nowrap inline-block"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}