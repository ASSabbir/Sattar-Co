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
    <section ref={rootRef} className="bg-white py-14">
      <div className="max-w-content mx-auto px-6 md:px-10">
        {/* <SectionLabel label="Practice Areas" index="" className="mb-8" /> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image */}
          <div className="w-full">
            <img
              src="https://sattarandco.com/wp-content/uploads/2021/06/Firm-rotate-4.jpg"
              alt="Sattar&Co."
              className="w-full h-[320px] md:h-[420px]  object-cover"
            />
          </div>

          {/* Content */}
          <div className="w-full font-sans text-lg md:text-xl font-thin leading-relaxed text-charcoal space-y-6 lg:space-y-8">
            <p>
              Sattar&Co. provides a comprehensive range of legal services to its
              clients.
            </p>

            <p>
              Sattar&Co.’s work is varied but is essentially concerned with corporate
              and commercial matters, international disputes, litigation between, and
              providing legal advice for, companies and businesses. Clients come from
              a wide range of industries and public sectors.
            </p>

            <p>
              Lawyers at Sattar&Co. are very experienced in advisory work and
              litigation and regularly appear as advocates in the Bangladesh Supreme
              Court as well as before arbitral tribunals, both in Bangladesh and
              abroad.
            </p>
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
                className="min-h-[38vh] lg:min-h-[40vh] flex items-center  border-charcoal/10 last:border-b"
              >
                <button
                  onClick={() => setActive(i)}
                  className="text-left w-full py-6 group"
                >
                  <span className="eyebrow text-red-600 border-b-2   inline text-3xl  px-2 pb-1 border-red-600 ">{area.index}</span>
                  <span
                    className={`font-display block mt-3 transition-all duration-500 ease-editorial ${active === i
                      ? "text-5xl text-charcoal"
                      : "text-3xl text-charcoal/35 group-hover:text-charcoal/60"
                      }`}
                  >
                    {area.category}
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Right: sticky detail pane */}
          {/* Right: sticky detail pane */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-20">

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className=" w-full"
                  transition={{
                    duration: 0.5,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                >
                  {/* Dynamic Image */}
                  <div className="mb-8  overflow-hidden">
                    <Image
                      src={current.imgs}
                      alt={current.category}
                      width={1200}
                      height={700}
                      className="w-full h-[280px] md:h-[360px] object-cover"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-charcoal/70  leading-relaxed mb-8 \ text-justify text-xl">
                    {current.description}
                  </p>

                  {/* Areas */}
                  <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
                    {current.areas.map((area: string) => (
                      <li
                        key={area}
                        className="text-xl text-charcoal/60 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-red-600" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
