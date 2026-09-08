interface SectionLabelProps {
  label: string;
  index?: string;
  light?: boolean;
  className?: string;
}

/**
 * Small uppercase kicker used above section headings, e.g. "— THE FIRM".
 */
export default function SectionLabel({ label, index, light, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`eyebrow flex items-center gap-3 ${
        light ? "text-ivory/80" : "text-charcoal/50"
      } ${className}`}
    >
      {index && <span className="text-red-600 font-bold text-xl">{index}</span>}
      <span className="h-2 w-8 bg-red-600 " />
      <span className="text-2xl text-black">{label}</span>
    </div>
  );
}
