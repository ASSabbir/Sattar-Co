"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import recognition from "@/data/recognition.json";
import img from "../../public/images/2.webp";

export default function Recognition() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".directory-name").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.15, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".rec-quote").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden py-24 md:py-36"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${img.src})`,
        }}
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Optional darker gradient for cinematic look */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto px-6 md:px-10">
        <SectionLabel
          label="Recognition"
          index="02"
          light
          className="mb-8"
        />

        <h2 className="font-display text-display-md text-ivory mb-16 md:mb-20 max-w-2xl">
          Recognised by leading legal directories
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Directories */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {recognition.directories.map((name) => (
              <p
                key={name}
                className="directory-name font-display text-2xl md:text-3xl text-ivory/90"
              >
                {name}
              </p>
            ))}
          </div>

          {/* Quotes */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {recognition.quotes.map((q, i) => (
              <div
                key={i}
                className="rec-quote border-l border-red-600/40 pl-6 md:pl-8"
              >
                <p className="text-ivory/75 text-lg md:text-xl leading-relaxed font-display italic">
                  &ldquo;{q.quote}&rdquo;
                </p>

                <p className="eyebrow text-red-600 mt-4">
                  {q.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}