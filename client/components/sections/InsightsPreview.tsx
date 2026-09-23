"use client";
import { RiChatQuoteLine } from "react-icons/ri";
import { FaQuoteLeft } from "react-icons/fa";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import insights from "@/data/insights.json";
import recognition from "@/data/recognition.json";
import { RiChatQuoteFill } from "react-icons/ri";

const AUTOPLAY_INTERVAL = 5000; // ms between testimonial slides

function formatDate(item: { date: string | null; year: number }) {
  if (!item.date) return String(item.year);
  return new Date(item.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Fisher-Yates shuffle — unbiased, better than sort(() => Math.random() - 0.5)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Truncate to a max word count, adding "…" if it was cut off
function truncateWords(text: string, maxWords: number) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

export default function InsightsPreview() {
  const testimonials = recognition.quotes;

  // Start with a deterministic slice for SSR, then randomize on mount.
  // This avoids a hydration mismatch (server renders one thing, client
  // would render another if we randomized directly in render).
  const [newsItems, setNewsItems] = useState(() => insights.slice(0, 3));

  useEffect(() => {
    setNewsItems(shuffleArray(insights).slice(0, 3));
  }, []); // empty deps → runs once per mount, i.e. once per reload

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
    <section className="bg-white pt-2 pb-24 md:pb-36">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-stretch">
          {/* ── Left: autoplay testimonial card ── */}
          <div
            className="lg:col-span-6 mt- relative grain overflow-hidden rounded-sm min-h-[400px]  flex flex-col  "
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <FaQuoteLeft size={44} strokeWidth={1} className="text-red-600/70 mt-4 mb-8 shrink-0" />

            <div className="relative mt- flex-1  flex  overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -32 }}
                  transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                  className="w-full"
                >
                  <p className="font-display italic text-xl md:text-4xl leading-relaxed text-gray-800 mb-6">
                    {testimonials[active].quote}
                  </p>
                  <p className="eyebrow !text-lg text-red-600">{testimonials[active].source}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center  gap-2 mt-8 shrink-0">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className="relative h-[2px] flex-1 max-w-10 bg-gray-900/10 overflow-hidden"
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
                  {i < active && <span className="absolute inset-0 bg-gray-700/40" />}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: three random news items, no images, flex column ── */}
          <div className="lg:col-span-6 flex  flex-col h-full">
            {newsItems.map((item, i) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className={`group flex-1 flex items-center gap-6  py-2 md:py-5 ${i !== 0 ? "border-t border-charcoal/30" : ""
                  }`}
              >
                <div className="min-w-0 group">
                  <p className=" !text-[16px] eyebrow  uppercase text-red-600 group-hover:text-black duration-300 mb-2">
                    {item.category} <span className="">·</span>
                  </p>
                  <h3 className="font-display text-lg t md:text-2xl text-charcoal leading-snug group-hover:text-red-600 transition-colors duration-300 trackin">
                    {truncateWords(item.title, 10)}
                  </h3>
                  <div className="flex  item-center flex-row   gap-2 h-full ">
                    <button className="mt-2  text-lg text-red-600 group-hover:text-gray-600 transition-colors duration-300">
                      Read more
                    </button>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className=" mt-4 text-charcoal/30 transition-all duration-300 group-hover:text-red-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>


              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}