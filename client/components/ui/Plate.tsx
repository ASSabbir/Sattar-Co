import { cn } from "@/lib/utils";

interface PlateProps {
  label: string;
  light?: boolean;
  className?: string;
}

/**
 * Placeholder for photography. Renders a tasteful gradient "plate" with a
 * small caption noting what image belongs there, so the layout reads
 * intentionally even before real photography is dropped in.
 *
 * To swap in real photography later, replace this component's usage with
 * a Next.js <Image> pointed at the approved asset — the surrounding layout
 * (aspect ratio, rounded corners, etc.) can stay the same.
 */
export default function Plate({ label, light, className }: PlateProps) {
  return (
    <div
      data-label={label}
      className={cn("plate grain", light && "plate--light", className)}
    />
  );
}
