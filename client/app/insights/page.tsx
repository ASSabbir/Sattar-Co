"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import insights from "@/data/insights.json";
import img1 from '../../public/images/3.webp'

function formatDate(item: { date: string | null; year: number }) {
  if (!item.date) return String(item.year);
  return new Date(item.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function InsightsPage() {
  // Years derived from the data itself, newest first.
  const years = useMemo(() => {
    return Array.from(new Set(insights.map((i) => i.year))).sort((a, b) => b - a);
  }, []);

  const [active, setActive] = useState<number>(years[0]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of insights) {
      map[item.year] = (map[item.year] ?? 0) + 1;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const items = insights.filter((i) => i.year === active);
    return [...items].sort((a, b) => {
      if (a.date && b.date) return a.date < b.date ? 1 : -1;
      return 0;
    });
  }, [active]);

  return (
    <>
      <section className="grain relative overflow-hidden bg-navy pt-40 pb-20 md:pt-52 md:pb-24">
        <Image
          src={img1}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-10">
          <SectionLabel label="Insights" light className="mb-8" />
          <RevealText as="h1" immediate className="font-display text-display-lg text-ivory max-w-3xl">
            Commentary from the firm
          </RevealText>
        </div>
      </section>

      <section className="bg-ivory">
        {/* Year tabs */}
        <div className="sticky top-20 md:top-24 z-30 bg-ivory/95 backdrop-blur-sm border-b border-charcoal/10">
          <div className="max-w-content mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between gap-8 md:gap-10 overflow-x-auto no-scrollbar py-6">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActive(year)}
                  className={`relative shrink-0 text-sm uppercase tracking-wide pb-3 transition-colors duration-300 ${
                    active === year ? "text-charcoal" : "text-charcoal/40 hover:text-charcoal/70"
                  }`}
                >
                  {year}
                  <span className="ml-2 text-xs text-charcoal/35">({counts[year] ?? 0})</span>
                  {active === year && (
                    <motion.span
                      layoutId="insights-tab-underline"
                      className="absolute left-0 right-0 -bottom-px h-[2px] bg-red-600"
                      transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              className="flex flex-col"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04, ease: "easeOut" }}
                >
                  <Link
                    href={`/insights/${item.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-start lg:items-center py-7 border-t border-charcoal/10"
                  >
                    <div className="lg:col-span-2 order-2 lg:order-1">
                      <p className="text-charcoal/40 text-sm">{formatDate(item)}</p>
                    </div>

                    <div className="lg:col-span-2 order-1 lg:order-2">
                      <p className="eyebrow text-red-600">{item.category}</p>
                    </div>

                    <div className="lg:col-span-7 order-3">
                      <h2 className="font-display text-lg md:text-xl text-charcoal leading-snug group-hover:text-red-600 transition-colors duration-300">
                        {item.title}
                      </h2>
                    </div>

                    <div className="lg:col-span-1 order-4 flex lg:justify-end">
                      <span className="inline-flex items-center gap-1.5 text-charcoal/40 text-xs uppercase tracking-wide group-hover:text-red-600 transition-colors duration-300">
                        Read
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.5}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}