"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import Plate from "@/components/ui/Plate";
import practiceAreas from "@/data/practiceAreas.json";
import ArrowLink from "@/components/ui/ArrowLink";
import Image from "next/image";

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

    // Fixes trigger-position drift once images/fonts finish loading —
    // this is what causes the "last item" math to go slightly off.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 500);

    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);

  const current = practiceAreas[active];

  return (
    <section ref={rootRef} className="bg-white py-16">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="gap-10 lg:gap-16 items-start">
          <div className="w-full font-sans flex flex-col text-lg md:text-2xl font-thin space-y-4 text-charcoal">
            <span>Sattar&amp;Co. provides strategic, full-service legal counsel to the Bangladeshi business community, as well as the international investors and counsel who operate alongside it. Built upon specialized legal expertise and a sophisticated understanding of Bangladesh’s regulatory landscape, the firm delivers decisive, high-stakes judgment under pressure.</span>
            <span>Our practice spans a diverse array of industries and sectors, focusing primarily on complex corporate transactions, international disputes,and commercial litigation.</span>
            <span>Comprising highly experienced advocates, our legal team regularly appears before the Supreme Court of Bangladesh and prominent domestic and international arbitral tribunals.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-14 pt-14 border-t-2 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: scrolling list of categories */}
          <div className="lg:col-span-6">
            {practiceAreas.map((area, i) => (
              <div
                key={area.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="min-h-[38vh] lg:min-h-[40vh] flex items-center border-charcoal/10 last:border-b"
              >
                <button
                  onClick={() => setActive(i)}
                  className="text-left w-full py-6 group"
                >
                  <span className="eyebrow text-red-600 border-b-2 inline text-3xl px-2 pb-1 border-red-600">
                    {area.index}
                  </span>
                  <span
                    className={`font-display block mt-3 transition-all duration-500 ease-editorial ${
                      active === i
                        ? "text-5xl text-charcoal"
                        : "text-3xl text-charcoal/35 group-hover:text-charcoal/60"
                    }`}
                  >
                    {area.category}
                  </span>
                </button>
              </div>
            ))}

            {/* THE FIX: buffer space after the last item so the sticky
               pane has room to finish its dwell before it releases.
               Tune the height to taste — 40-50vh reads well. */}
            <div className="h-[45vh] lg:h-[50vh]" aria-hidden="true" />
          </div>

          {/* Right: sticky detail pane */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="w-full"
                  transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
                >
                  {/* Dynamic Image — slight scale-in for a premium reveal */}
                  <motion.div
                    className="mb-8 overflow-hidden"
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={current.imgs}
                      alt={current.category}
                      width={1200}
                      height={700}
                      className="w-full h-[280px] md:h-[360px] object-cover"
                    />
                  </motion.div>

                  <p className="text-charcoal/90 leading-relaxed mb-8  text-xl">
                    {current.description}
                  </p>

                  {/* Areas — staggered in instead of popping in all at once */}
                  <motion.ul
                    className="flex flex-wrap gap-x-6 gap-y-3 mb-8"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
                    }}
                  >
                    {current.areas.map((area: string) => (
                      <motion.li
                        key={area}
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          show: { opacity: 1, y: 0 },
                        }}
                        className="text-xl text-charcoal/80 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-red-600" />
                        <span className="text-charcoal/90">{area}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}