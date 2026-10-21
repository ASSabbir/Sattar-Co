"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ImageSliderProps {
  images: { src: StaticImageData; label: string }[];
}

const AUTOPLAY_INTERVAL = 4500;

const variants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 48, scale: 1.03 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48, scale: 1.03 }),
};

export default function ImageSlider({ images }: ImageSliderProps) {
  // [activeIndex, direction] -> direction: 1 = next, -1 = prev
  const [[active, direction], setSlide] = useState<[number, number]>([0, 1]);

  const paginate = useCallback(
    (dir: number) => {
      setSlide(([i]) => [(i + dir + images.length) % images.length, dir]);
    },
    [images.length]
  );

  const goTo = (index: number) =>
    setSlide(([current]) => [index, index > current ? 1 : -1]);

  // Always autoplays. Depends on `active` so the timer resets after
  // a manual click (no instant double-jump).
  useEffect(() => {
    const timer = setInterval(() => paginate(1), AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [active, paginate]);

  return (
    <div className="relative aspect-[16/9] md:aspect-[18/9] w-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={active}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[active].src}
            alt={images[active].label}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* soft gradient so the controls stay readable on any photo */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Dots */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-8 bg-red-600" : "w-1.5 bg-ivory/50 hover:bg-ivory/70"
            }`}
          />
        ))}
      </div>

      {/* Counter + arrows */}
      <div className="absolute bottom-5 right-6 md:bottom-7 md:right-8 z-10 flex items-center gap-4">
        {/* <span className="hidden sm:block text-xs tracking-[0.2em] text-ivory/80 tabular-nums">
          {String(active + 1).padStart(2, "0")}
          <span className="mx-1.5 text-ivory/40">/</span>
          {String(images.length).padStart(2, "0")}
        </span> */}

        <div className="flex items-center gap-2">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous image"
            className="group grid h-11 w-11 place-items-center rounded-full border-2 border-red-400/30 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:border-red-400 hover:bg-white hover:text-black active:scale-95"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next image"
            className="group grid h-11 w-11 place-items-center rounded-full border-2 border-red-400/30 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:border-red-400 hover:bg-white hover:text-black active:scale-95"
          >
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}