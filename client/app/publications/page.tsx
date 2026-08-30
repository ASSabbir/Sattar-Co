"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import publications from "@/data/publications.json";
import img1 from "../../public/images/4.webp";

// Fixed order rather than deriving from the data, so the tab order never
// shuffles if entries get added/removed later.
const CATEGORIES = [
  "All",
  "Local",
  "International",
  "Interview",
  "Feature",
] as const;

type Category = (typeof CATEGORIES)[number];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PublicationsPage() {
  const [active, setActive] = useState<Category>("All");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: publications.length };

    for (const item of publications) {
      map[item.category] = (map[item.category] ?? 0) + 1;
    }

    return map;
  }, []);

  const filtered = useMemo(() => {
    const items =
      active === "All"
        ? publications
        : publications.filter((p) => p.category === active);

    // Most recent first
    return [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [active]);

  return (
    <>
      {/* =========================================================
          PUBLICATIONS HERO
      ========================================================== */}
      <section className="grain relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-24">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${img1.src})`,
          }}
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/55" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-content mx-auto px-6 md:px-10">
          <SectionLabel label="Publications" light className="mb-8" />

          <RevealText
            as="h1"
            immediate
            className="font-display text-display-lg text-ivory max-w-3xl"
          >
            Publications &amp; Commentary
          </RevealText>
        </div>
      </section>

      {/* =========================================================
          PUBLICATIONS CONTENT
      ========================================================== */}
      <section className="bg-ivory">
        {/* Tabs */}
        <div className="sticky top-20 md:top-24 z-30 bg-ivory/95 backdrop-blur-sm border-b border-charcoal/10">
          <div className="max-w-content mx-auto px-6 md:px-10">
            <div className="flex items-center gap-8 md:gap-10 overflow-x-auto no-scrollbar py-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative shrink-0 text-sm uppercase tracking-wide pb-3 transition-colors duration-300 ${
                    active === cat
                      ? "text-charcoal"
                      : "text-charcoal/40 hover:text-charcoal/70"
                  }`}
                >
                  {cat}

                  <span className="ml-2 text-xs text-charcoal/35">
                    {counts[cat] ?? 0}
                  </span>

                  {active === cat && (
                    <motion.span
                      layoutId="publications-tab-underline"
                      className="absolute left-0 right-0 -bottom-px h-[2px] bg-red-600"
                      transition={{
                        duration: 0.35,
                        ease: [0.65, 0, 0.35, 1],
                      }}
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
              transition={{
                duration: 0.4,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="flex flex-col"
            >
              {filtered.length === 0 && (
                <p className="text-charcoal/50 py-16 text-center">
                  Nothing in this category yet.
                </p>
              )}

              {filtered.map((item, i) => {
                const clickable = Boolean(item.link);
                const Wrapper = clickable ? "a" : "div";

                return (
                  <motion.div
                    key={item.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i, 8) * 0.04,
                      ease: "easeOut",
                    }}
                  >
                    <Wrapper
                      {...(clickable
                        ? {
                            href: item.link!,
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      className={`group grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 items-start lg:items-center py-7 border-t border-charcoal/10 ${
                        clickable
                          ? "cursor-pointer"
                          : "cursor-default opacity-60"
                      }`}
                    >
                      <div className="lg:col-span-2 order-2 lg:order-1">
                        <p className="text-charcoal/40 text-sm">
                          {formatDate(item.date)}
                        </p>
                      </div>

                      {active === "All" && (
                        <div className="lg:col-span-2 order-1 lg:order-2">
                          <p className="eyebrow text-red-600">
                            {item.category}
                          </p>
                        </div>
                      )}

                      <div
                        className={`order-3 ${
                          active === "All"
                            ? "lg:col-span-7"
                            : "lg:col-span-9"
                        }`}
                      >
                        <h2
                          className={`font-display text-lg md:text-xl text-charcoal leading-snug ${
                            clickable
                              ? "group-hover:text-red-600 transition-colors duration-300"
                              : ""
                          }`}
                        >
                          {item.title}
                        </h2>

                        <p className="text-charcoal/50 text-sm mt-2 max-w-xl leading-relaxed">
                          {item.summary}
                        </p>
                      </div>

                      <div className="lg:col-span-1 order-4 flex lg:justify-end">
                        {clickable ? (
                          <span className="inline-flex items-center gap-1.5 text-charcoal/40 text-xs uppercase tracking-wide group-hover:text-red-600 transition-colors duration-300">
                            Read

                            <ArrowUpRight
                              size={14}
                              strokeWidth={1.5}
                              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </span>
                        ) : (
                          <span className="text-charcoal/30 text-xs uppercase tracking-wide">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}