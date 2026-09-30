"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import insights from "@/data/insights.json";
import img1 from "../../public/images/sa.jpeg";

function InsightsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Years derived from the data itself, newest first.
  const years = useMemo(() => {
    return Array.from(new Set(insights.map((i) => i.year))).sort((a, b) => b - a);
  }, []);

  // Active year URL theke ashe (?year=2023), na thakle sobcheye notun year
  const yearParam = Number(searchParams.get("year"));
  const active = years.includes(yearParam) ? yearParam : years[0];

  const handleSelect = (year: number) => {
    // replace: tab click e history te extra entry jomabe na
    router.replace(`${pathname}?year=${year}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    const items = insights.filter((i) => i.year === active);
    return [...items].sort((a, b) => {
      if (a.date && b.date) return a.date < b.date ? 1 : -1;
      return 0;
    });
  }, [active]);

  return (
    <>
      <section className="grain relative flex items-center justify-center overflow-hidden bg-navy pb-16 pt-32 sm:pb-24 md:pb-52 mt-24">
        <Image
          src={img1}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </section>

      <section className="bg-white">
        {/* Year tabs */}
        <div className="sticky top-14 z-30 bg-white backdrop-blur-sm border-b pt-4 border-charcoal/10">
          <div className="max-w-content mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between gap-8 md:gap-10 overflow-x-auto no-scrollbar py-6">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleSelect(year)}
                  className={`relative shrink-0 uppercase tracking-wide pb-3 duration-300 ${
                    active === year
                      ? "text-charcoal text-2xl"
                      : "text-charcoal/40 text-xl hover:text-charcoal/70"
                  }`}
                >
                  {year}

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
        <div className="max-w-content mx-auto bg-white px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              className="flex flex-col pb-14 sm:pb-20"
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
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-start lg:items-center py-5 border-t border-charcoal/10"
                  >
                    <div className="lg:col-span-4 order-1 lg:order-2">
                      <p className="eyebrow !text-sm">{item.category}</p>
                    </div>

                    <div className="lg:col-span-7 border-l-2 pl-10 order-3">
                      <h2 className="font-display text-lg md:text-2xl text-charcoal leading-snug group-hover:text-red-600 tracking-wider transition-colors duration-300">
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

export default function InsightsPage() {
  // useSearchParams er jonno Suspense boundary lagbe
  return (
    <Suspense fallback={null}>
      <InsightsContent />
    </Suspense>
  );
}