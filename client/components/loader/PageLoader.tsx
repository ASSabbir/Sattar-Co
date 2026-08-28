"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markLoaderComplete } from "@/lib/loaderEvents";

/**
 * Fullscreen four-panel loader — plays once when the app first mounts.
 * Same "opening windows" concept as the two-panel version, just four
 * narrower panels, staggered left to right for a wave-like reveal.
 *
 * On completion it calls markLoaderComplete() so Navbar and Hero can time
 * their own entrance animations to start only once this is fully done —
 * see lib/loaderEvents.ts. This is also what fixes the "navbar suddenly
 * appears" bug: the navbar now waits for this same signal instead of
 * sitting there fully-formed underneath the panels the whole time.
 */
export default function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    const title = titleRef.current;
    if (!container || panels.length === 0 || !title) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Skip the whole sequence, but still tell the rest of the site the
      // loader is "done" — otherwise Navbar/Hero would wait forever.
      markLoaderComplete();
      setVisible(false);
      return;
    }

    // Lock scroll while the loader is up.
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = previousOverflow;
          markLoaderComplete();
          setVisible(false);
        },
      });

      // Subtle title flicker during the hold — restrained, not a strobe.
      const blink = gsap.to(title, {
        opacity: 0.4,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      tl
        // Phase 1 — hold. Nothing moves; the title just flickers quietly.
        .to({}, { duration: 1.7 })

        // Settle the title fully visible before anything starts moving —
        // flickering while sliding would look cheap.
        .call(() => {
          blink.kill();
          gsap.set(title, { opacity: 1 });
        })

        // Phase 2 — all four panels open upward in a left-to-right wave.
        // The title rides along with panel[0] since it's a child of it.
         .to(panels, {
          yPercent: -100,
          duration: 1.15,
          ease: "power4.inOut",
          stagger: { each: 0.12, from: "end" },
        });
    }, container);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      ctx.revert();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex"
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
          className={`relative h-full w-1/4 bg-ivory ${
            i < 3 ? "" : ""
          }`}
        >
          {i === 0 && (
            <div
              ref={titleRef}
              className="absolute bottom-8 left-6 md:bottom-12 md:left-12"
            >
              <p className="font-display text-xl sm:text-2xl md:text-4xl text-charcoal tracking-tight whitespace-nowrap">
                Sattar<span className="text-red-600">&amp;</span>Co.
              </p>
              <p className="eyebrow text-charcoal/40 mt-2 whitespace-nowrap">
                Corporate &amp; Commercial Law
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}