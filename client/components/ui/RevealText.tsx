"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface RevealTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  /** Delay before the reveal starts, in seconds */
  delay?: number;
  /** If true, animation runs immediately on mount instead of on scroll (use for hero) */
  immediate?: boolean;
}

/**
 * Wraps its children in a clipped line and animates it upward into view.
 * This is the site's core "typography reveal" building block — used for
 * headlines and statements throughout the page.
 */
export default function RevealText({
  children,
  as = "div",
  className = "",
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const wrapper = wrapperRef.current;
    if (!inner || !wrapper) return;

    const ctx = gsap.context(() => {
      gsap.set(inner, { yPercent: 110, opacity: 0 });

      if (immediate) {
        gsap.to(inner, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          delay,
          ease: "power4.out",
        });
      } else {
        gsap.to(inner, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, wrapper);

    return () => ctx.revert();
  }, [delay, immediate]);

  const Tag = as;

  return (
    <div ref={wrapperRef} className={`reveal-line ${className}`}>
      <div ref={innerRef}>
        <Tag className="block">{children}</Tag>
      </div>
    </div>
  );
}
