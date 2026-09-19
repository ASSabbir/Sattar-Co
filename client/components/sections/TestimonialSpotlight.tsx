"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import recognition from "@/data/recognition.json";

const AUTOPLAY_INTERVAL = 5500;
const quotes = recognition.quotes;

export default function TestimonialSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [interacting, setInteracting] = useState(false); // hover or keyboard focus

  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.3 });

  // Autoplay only while the section is on screen, not being used, and the
  // visitor hasn't asked for reduced motion.
  const isAutoplaying = quotes.length > 1 && inView && !interacting && !reduceMotion;

  // setTimeout keyed on `active` → clicking a dot also restarts the countdown.
  useEffect(() => {
    if (!isAutoplaying) return;
    const timer = setTimeout(
      () => setActive((i) => (i + 1) % quotes.length),
      AUTOPLAY_INTERVAL,
    );
    return () => clearTimeout(timer);
  }, [active, isAutoplaying]);

  if (quotes.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
      className="grain bg-white py-12 sm:py-16 lg:py-20"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
    >
      <div className="mx-auto max-w-content px-6 text-center md:px-10">
        <h2 id="testimonials-heading" className="sr-only">
          Testimonials
        </h2>

        <FaQuoteLeft
          aria-hidden="true"
          className="mx-auto mb-6 h-8 w-8 text-red-600/80 md:mb-10 md:h-11 md:w-11"
        />

        {/*
          All quotes live in the DOM (good for SEO) and are stacked in ONE grid
          cell, so the box is always as tall as the tallest quote — no layout
          jump when slides change, no hard-coded min-height.
        */}
        <div
          aria-live={interacting ? "polite" : "off"}
          className="mx-auto grid max-w-5xl"
        >
          {quotes.map((item, i) => {
            const isActive = i === active;
            const state = isActive
              ? "translate-y-0 opacity-100 delay-300 duration-700"
              : `pointer-events-none opacity-0 duration-300 ${
                  i < active ? "-translate-y-6" : "translate-y-6"
                }`;

            return (
              <figure
                key={`${item.source}-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${quotes.length}`}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 flex flex-col items-center justify-center transition-[opacity,transform] ease-editorial motion-reduce:transition-none ${state}`}
              >
                <blockquote>
                  <p className="mb-6 font-display text-2xl italic leading-snug text-zinc-800/95 [text-wrap:balance] sm:text-3xl md:mb-10 md:text-4xl xl:text-5xl 2xl:text-6xl">
                    {item.quote}
                  </p>
                </blockquote>
                <figcaption className="eyebrow text-red-600 !text-base sm:!text-lg">
                  {item.source}
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Dots — visible dot is small, tap area is not */}
        <div className="mt-8 flex items-center justify-center sm:mt-10 lg:mt-12">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="group flex h-9 min-w-[1.5rem] items-center justify-center px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  i === active
                    ? "w-8 bg-red-600"
                    : "w-1.5 bg-zinc-400/85 group-hover:bg-zinc-500"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}