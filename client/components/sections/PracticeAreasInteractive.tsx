"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import Plate from "@/components/ui/Plate";
import practiceAreas from "@/data/practiceAreas.json";
import ArrowLink from "@/components/ui/ArrowLink";
/**
 * Signature interaction: a left-hand list of practice categories and a
 * sticky right-hand detail pane. As the visitor scrolls past each category
 * label, the pane content crossfades to match — this is the
 * "scroll -> typography -> content" language referenced across the site.
 */
export default function PracticeAreasInteractive() {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
      triggers.push(st);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const current = practiceAreas[active];

  return (
    <section ref={rootRef} className="bg-ivory py-24 md:py-36">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <SectionLabel label="Practice Areas" index="" className="mb-8" />
        <h2 className="font-display text-display-md text-charcoal mb-16 md:mb-24 max-w-2xl">
          Breadth across the matters that shape Bangladesh&rsquo;s economy
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: scrolling list of categories */}
          <div className="lg:col-span-5">
            {practiceAreas.map((area, i) => (
              <div
                key={area.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="min-h-[38vh] lg:min-h-[52vh] flex items-center border-t border-charcoal/10 last:border-b"
              >
                <button
                  onClick={() => setActive(i)}
                  className="text-left w-full py-6 group"
                >
                  <span className="eyebrow text-red-600 block mb-3">{area.index}</span>
                  <span
                    className={`font-display block transition-all duration-500 ease-editorial ${
                      active === i
                        ? "text-display-sm text-charcoal"
                        : "text-2xl text-charcoal/35 group-hover:text-charcoal/60"
                    }`}
                  >
                    {area.category}
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Right: sticky detail pane */}
          <div className="lg:col-span-7 ">
            <div className="lg:sticky lg:top-32">
              <div className="mb-8">
                <img src='https://sattarandco.com/wp-content/uploads/2021/06/Firm-rotate-4.jpg' className=" h-96" alt="" />
                {/* <Plate
                  label={`Practice — ${current.category}`}
                  className="aspect-[16/10] w-full"
                /> */}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                >
                  <p className="text-charcoal/70 leading-relaxed mb-8 max-w-lg">
                    {current.description}
                  </p>

                  <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
                    {current.areas.map((a: string) => (
                      <li key={a} className="text-sm text-charcoal/60 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-red-600" />
                        {a}
                      </li>
                    ))}
                  </ul>

                  
                  <ArrowLink href="/contact">Talk With Us</ArrowLink>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
