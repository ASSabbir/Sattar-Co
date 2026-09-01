"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import recognition from "@/data/recognition.json";

const AUTOPLAY_INTERVAL = 5500;

export default function TestimonialSpotlight() {
  const quotes = recognition.quotes;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % quotes.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, quotes.length]);

  return (
    <section
      className="grain  py-24 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-content mx-auto px-6 md:px-10 text-center">
        <Quote size={52} strokeWidth={1} className="text-red-600/50 mx-auto mb-10" />

        <div className="relative min-h-[180px] md:min-h-[150px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
              className="max-w-3xl mx-auto"
            >
              <p className="font-display italic text-2xl md:text-4xl leading-snug text-zinc-800/95 mb-8">
                &ldquo;{quotes[active].quote}&rdquo;
              </p>
              <p className="eyebrow text-red-600">{quotes[active].source}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-12">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === active ? "w-8 bg-red-600" : "w-1.5 bg-zinc-400/85 hover:bg-zinc-400/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}