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
        light ? "text-ivory/60" : "text-charcoal/50"
      } ${className}`}
    >
      {index && <span className="text-red-600">{index}</span>}
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{label}</span>
    </div>
  );
}
