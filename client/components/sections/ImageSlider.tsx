"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

interface ImageSliderProps {
  images: { src: StaticImageData; label: string }[];
}

const AUTOPLAY_INTERVAL = 4500;

export default function ImageSlider({ images }: ImageSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, images.length]);

  return (
    <div
      className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[active].src}
            alt={images[active].label}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === active ? "w-8 bg-red-600" : "w-1.5 bg-ivory/50 hover:bg-ivory/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}