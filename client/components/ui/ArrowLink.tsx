import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

/**
 * A restrained text link with an arrow that shifts on hover — the site's
 * standard call-to-action pattern (no filled buttons, per the design brief).
 */
export default function ArrowLink({ href, children, light, className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm tracking-wide uppercase",
        light ? "text-ivory" : "text-charcoal",
        className
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowUpRight
        size={16}
        strokeWidth={1.5}
        className="transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </Link>
  );
}
