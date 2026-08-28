"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowDown } from "lucide-react";
import firm from "@/data/firm.json";
import img from "../../public/images/hero.webp";

/**
 * Homepage hero section.
 *
 * Background:
 * - Uses the imported hero.webp image
 * - Includes a cinematic black overlay
 * - Includes an additional gradient for text readability
 * - Uses GSAP for the entrance animation
 * - Includes a subtle continuous background zoom/drift
 */

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      if (prefersReducedMotion) {
        gsap.set(
          [
            ".hero-mark",
            ".hero-line > span",
            ".hero-plate",
            ".hero-sub",
            ".hero-scroll",
          ],
          {
            opacity: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
          }
        );

        return;
      }

      // Initial background state
      tl.set(".hero-plate", {
        scale: 1.12,
        opacity: 0,
      })

        // Eyebrow animation
        .to(
          ".hero-mark",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          0.1
        )

        // Main heading animation
        .to(
          ".hero-line > span",
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.09,
          },
          0.25
        )

        // Background image animation
        .to(
          ".hero-plate",
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: "power3.out",
          },
          0.35
        )

        // Supporting content
        .to(
          ".hero-sub",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          "-=0.9"
        )

        // Scroll indicator
        .to(
          ".hero-scroll",
          {
            opacity: 1,
            duration: 0.8,
          },
          "-=0.4"
        );

      // Slow cinematic background movement
      gsap.to(".hero-image", {
        scale: 1.06,
        duration: 14,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy grain"
    >
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================== */}
      <div className="hero-plate absolute inset-0 overflow-hidden opacity-0">
        {/* Background image */}
        <div
          className="hero-image absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${img.src})`,
          }}
        />

        {/* Main black cinematic overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Bottom gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55" />

        {/* Subtle side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/20" />
      </div>

      {/* =========================================================
          HERO CONTENT
      ========================================================== */}
      <div className="relative z-10 mx-auto flex h-full max-w-content flex-col justify-end px-6 pb-20 md:px-10 md:pb-28">
        {/* Eyebrow */}
        <p className="hero-mark eyebrow mb-6 -translate-y-2 text-white opacity-0 md:mb-8">
          Dhaka, Bangladesh — Est. Corporate &amp; Commercial Practice
        </p>

        {/* Main heading */}
        <h1 className="font-display text-ivory">
          <span className="reveal-line hero-line">
            <span className="block text-display-xl">
              Sattar&amp;Co.
            </span>
          </span>
        </h1>

        {/* Hero statement */}
        <div className="mt-4 max-w-2xl md:mt-6">
          <p className="hero-sub translate-y-3 text-base leading-relaxed text-ivory/70 opacity-0 md:text-lg">
            {firm.heroStatement}
          </p>
        </div>

        {/* Navigation links */}
        <div className="hero-sub mt-10 flex translate-y-3 flex-wrap items-center gap-x-10 gap-y-4 opacity-0 md:mt-14">
          <Link
            href="/firm"
            className="link-underline text-sm uppercase tracking-wide text-ivory"
          >
            Explore the Firm
          </Link>

          <Link
            href="/practice-areas"
            className="link-underline text-sm uppercase tracking-wide text-ivory/70"
          >
            Our Practice Areas
          </Link>
        </div>
      </div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================== */}
      <div className="hero-scroll absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 text-ivory/50 opacity-0 sm:flex md:right-10">
        <span className="eyebrow [writing-mode:vertical-rl]">
          Scroll
        </span>

        <ArrowDown
          size={16}
          strokeWidth={1.5}
          className="animate-bounce"
        />
      </div>
    </section>
  );
}