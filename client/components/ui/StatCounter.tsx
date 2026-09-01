"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: string; // e.g. "20+", "30+", "12"
  duration?: number; // ms
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a stat's numeric portion counting up from 0 once it scrolls
 * into view, then re-appends whatever suffix the original string had
 * ("+", "%", etc.) — so "20+" counts 0 → 20 and then shows "20+".
 */
export default function StatCounter({ value, duration = 1600 }: StatCounterProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState("0");
  const hasAnimatedRef = useRef(false);

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplay(String(target));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const start = performance.now();
        function tick(now: number) {
          const t = Math.min(1, (now - start) / duration);
          const eased = easeOutCubic(t);
          setDisplay(String(Math.round(eased * target)));
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <p ref={ref} className="font-display text-display-sm text-red-600 mb-2">
      {display}
      {suffix}
    </p>
  );
}