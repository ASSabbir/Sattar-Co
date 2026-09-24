"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import practiceAreas from "@/data/practiceAreas.json";

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

type PracticeArea = (typeof practiceAreas)[number];

/** Must match Tailwind's `lg` breakpoint. Below this, the section is a plain
 *  stacked list of cards (no scroll-spy, no sticky pane). */
const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** An item becomes active while this line of the viewport is inside it. */
const SPY_START = "top 55%";
const SPY_END = "bottom 55%";

const INTRO_PARAGRAPHS = [
  "Sattar&Co. provides strategic, full-service legal counsel to the Bangladeshi business community, as well as international investors and foreign law firms. Built upon specialized legal expertise and a sophisticated understanding of local regulatory landscape, the firm delivers decisive, high-stakes judgment under pressure.",
  "Our practice spans a diverse array of industries and sectors, focusing primarily on complex corporate transactions, international disputes and commercial litigation.",
  "Comprising highly experienced advocates, our legal team regularly appears before the Supreme Court of Bangladesh and prominent domestic and international arbitral tribunals.",
];

/* -------------------------------------------------------------------------- */
/*  SEO: structured data                                                      */
/* -------------------------------------------------------------------------- */

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Sattar&Co.",
  areaServed: { "@type": "Country", name: "Bangladesh" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Practice Areas",
    itemListElement: practiceAreas.map((area) => ({
      "@type": "OfferCatalog",
      name: area.category,
      itemListElement: area.areas.map((service: string) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service },
      })),
    })),
  },
};

// Escape "<" so the JSON can never break out of the <script> tag.
const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

/* -------------------------------------------------------------------------- */
/*  Hook: scroll-spy (desktop only)                                           */
/* -------------------------------------------------------------------------- */

function usePracticeScrollSpy() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Everything created inside is killed automatically when the viewport
    // drops below `lg` or the component unmounts.
    mm.add(DESKTOP_QUERY, () => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: SPY_START,
          end: SPY_END,
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });

      // Fonts / late layout can shift trigger positions slightly.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);

      return () => window.removeEventListener("load", refresh);
    });

    return () => mm.revert();
  }, []);

  const setItemRef = (i: number) => (el: HTMLDivElement | null) => {
    itemRefs.current[i] = el;
  };

  // Clicking a title scrolls its item into the middle of the screen; the
  // scroll-spy then activates it. (Setting state directly here would get
  // overridden by the next scroll event.)
  const scrollToItem = (i: number) => {
    if (!window.matchMedia(DESKTOP_QUERY).matches) return;
    const reduceMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    itemRefs.current[i]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return { active, setItemRef, scrollToItem };
}

/* -------------------------------------------------------------------------- */
/*  Title block (left column on desktop, card header on mobile/tablet)        */
/* -------------------------------------------------------------------------- */

type HeaderProps = {
  area: PracticeArea;
  isActive: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  onSelect: () => void;
};

function PracticeAreaHeader({ area, isActive, setRef, onSelect }: HeaderProps) {
  return (
    <div
      id={`practice-${area.id}`}
      ref={setRef}
      className="scroll-mt-24 lg:col-span-6 lg:col-start-1 lg:flex lg:min-h-[40vh] lg:items-center"
    >
      <div className="w-full">
        <span className="eyebrow inline-block border-b-2 border-red-600 px-2 pb-1 text-red-600 !text-base sm:!text-lg">
          {area.index}
        </span>

        <h3 className="mt-3">
          <button
            type="button"
            onClick={onSelect}
            className={`block w-full cursor-default text-left font-display text-3xl text-charcoal transition-[font-size,color] duration-500 ease-editorial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 motion-reduce:transition-none sm:text-4xl lg:cursor-pointer ${
              isActive
                ? "lg:text-5xl 2xl:text-6xl"
                : "lg:text-3xl lg:text-charcoal/35 lg:hover:text-charcoal/60 2xl:text-4xl"
            }`}
          >
            {area.category}
          </button>
        </h3>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Detail block (right sticky pane on desktop, card body on mobile/tablet)   */
/* -------------------------------------------------------------------------- */

type PanelProps = {
  area: PracticeArea;
  isActive: boolean;
};

function PracticeAreaPanel({ area, isActive }: PanelProps) {
  // Only applies at `lg`+. Below that, every panel is always visible.
  const visibility = isActive
    ? "lg:translate-y-0 lg:opacity-100 lg:delay-200 lg:duration-500"
    : "lg:pointer-events-none lg:translate-y-4 lg:opacity-0 lg:duration-300";

  return (
    <div
      className={`mt-8 grid gap-6 sm:gap-8 md:mt-10 md:grid-cols-2 md:items-center lg:sticky lg:top-24 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:block lg:self-start lg:row-start-1 lg:[grid-row-end:span_var(--pa-rows)] lg:transition-[opacity,transform] lg:ease-editorial lg:motion-reduce:transition-none ${visibility}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[4/3] lg:mb-8 lg:aspect-[22/10] lg:max-h-[55vh]">
        <Image
          src={area.imgs}
          alt={`${area.category} — Sattar&Co. practice area`}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className={`object-cover lg:transition-transform lg:duration-[900ms] lg:ease-editorial lg:motion-reduce:transition-none ${
            isActive ? "lg:scale-100" : "lg:scale-[1.06]"
          }`}
        />
      </div>

      <ul className="flex flex-row flex-wrap gap-x-6 gap-y-3">
        {area.areas.map((item: string, j: number) => (
          <li
            key={item}
            style={{ transitionDelay: isActive ? `${150 + Math.min(j, 8) * 50}ms` : "0ms" }}
            className={`flex items-center gap-2 text-base text-charcoal/90 sm:text-lg lg:text-xl lg:transition-[opacity,transform] lg:duration-500 lg:motion-reduce:transition-none 2xl:text-2xl ${
              isActive ? "lg:translate-y-0 lg:opacity-100" : "lg:translate-y-2 lg:opacity-0"
            }`}
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function PracticeAreasInteractive() {
  const { active, setItemRef, scrollToItem } = usePracticeScrollSpy();

  // Sticky panels span every row of the desktop grid (+1 for the end spacer).
  const gridVars = { "--pa-rows": practiceAreas.length + 1 } as CSSProperties;

  return (
    <section
      id="practice-areas"
      aria-labelledby="practice-areas-heading"
      className="bg-white   sm:pb-16 lg:pb-20 "
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />

      <div className="mx-auto  max-w-content px-5 sm:px-6 md:px-10">
        <h2 id="practice-areas-heading" className="sr-only">
          Practice Areas
        </h2>

        {/* Intro */}
        <div className=" space-y-4 py-10 font-sans  font-light  sm:text-xl md:space-y-6 md:text-2xl md:font-thin text-charcoal  leading-relaxed text-lg md:text-[22px]">
          {INTRO_PARAGRAPHS.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>

        {/* Mobile/tablet: stacked cards. Desktop: 2-col grid, sticky pane. */}
        <div
          style={gridVars}
          className=" border-t-2  lg:grid lg:grid-cols-12 lg:gap-x-16 lg:pt-14 2xl:gap-x-24"
        >
          {practiceAreas.map((area, i) => (
            <article
              key={area.id}
              className="border-t border-charcoal/10 py-10 first:border-t-0 sm:py-12 lg:contents"
            >
              <PracticeAreaHeader
                area={area}
                isActive={active === i}
                setRef={setItemRef(i)}
                onSelect={() => scrollToItem(i)}
              />
              <PracticeAreaPanel area={area} isActive={active === i} />
            </article>
          ))}

          {/* Desktop-only spacer: lets the last panel dwell before it releases */}
          <div aria-hidden="true" className="hidden lg:col-span-6 lg:col-start-1 lg:block lg:h-[45vh]" />
        </div>
      </div>
    </section>
  );
}