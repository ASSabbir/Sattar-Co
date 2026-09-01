"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import insights from "@/data/insights.json";
import recognition from "@/data/recognition.json";

const AUTOPLAY_INTERVAL = 5000; // ms between testimonial slides

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function InsightsPreview() {
  const testimonials = recognition.quotes;
  const newsItems = insights.slice(0, 3);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, testimonials.length]);

  return (
    <section className="bg-ivory pb-24 md:pb-36">
      <div className="max-w-content mx-auto px-6 md:px-10">
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-stretch">
          {/* ── Left: autoplay testimonial card ── */}
          <div
            className="lg:col-span-5 relative grain  overflow-hidden rounded-sm min-h-[440px] md:min-h-[520px] flex flex-col justify-between p-10 md:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote
              size={44}
              strokeWidth={1}
              className="text-red-600/40 mb-8 shrink-0"
            />

            <div className="relative flex-1 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -32 }}
                  transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                  className="w-full"
                >
                  <p className="font-display italic text-xl md:text-2xl leading-relaxed text-gray-800 mb-6">
                    &ldquo;{testimonials[active].quote}&rdquo;
                  </p>
                  <p className="eyebrow text-red-600">{testimonials[active].source}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-2 mt-8 shrink-0">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className="relative h-[2px] flex-1 max-w-10 bg-ivory/15 overflow-hidden"
                >
                  {i === active && (
                    <motion.span
                      key={active}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={{
                        duration: paused ? 0.3 : AUTOPLAY_INTERVAL / 1000,
                        ease: "linear",
                      }}
                      style={{ originX: 0 }}
                      className="absolute inset-0 bg-red-600"
                    />
                  )}
                  {i < active && <span className="absolute inset-0 bg-ivory/40" />}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: three news items, flex column ── */}
          <div className="lg:col-span-7 flex flex-col h-full">
            {newsItems.map((item, i) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className={`group flex-1 flex items-center gap-6 md:gap-8 py-6 md:py-0 ${
                  i !== 0 ? "border-t border-charcoal/10" : ""
                }`}
              >
                <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
                    sizes="144px"
                  />
                </div>

                <div className="min-w-0">
                  <p className="eyebrow text-red-600 mb-2">
                    {item.category} · {formatDate(item.date)}
                  </p>
                  <h3 className="font-display text-lg md:text-xl text-charcoal leading-snug group-hover:text-red-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="ml-auto shrink-0 text-charcoal/30 transition-all duration-300 group-hover:text-red-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ))}
          </div>
        </div>

        <ArrowLink href="/insights" className="md: mt-12">
          All Insights
        </ArrowLink>
      </div>
    </section>
  );
}