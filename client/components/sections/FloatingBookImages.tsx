"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const floatingImages = [
  { src: "/book/1.png", className: "top-[8%] left-[4%]", rotate: -8 },
  { src: "/book/2.png", className: "top-[15%] right-[8%]", rotate: 6 },
  { src: "/book/3.png", className: "top-[42%] left-[12%]", rotate: 10 },
  { src: "/book/4.png", className: "top-[55%] right-[4%]", rotate: -6 },
  { src: "/book/5.png", className: "bottom-[10%] left-[6%]", rotate: 4 },
  { src: "/book/6.png", className: "bottom-[6%] right-[14%]", rotate: -10 },
  { src: "/book/7.png", className: "top-[30%] right-[26%]", rotate: 3 },
];

export default function FloatingBookImages() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLDivElement>(".floating-book");
    const tweens: gsap.core.Tween[] = [];

    items.forEach((item, i) => {
      // give every image its own random drift loop so none of them sync up
      const runLoop = () => {
        const x = gsap.utils.random(-30, 30);
        const y = gsap.utils.random(-30, 30);
        const rotate = gsap.utils.random(-6, 6);
        const duration = gsap.utils.random(4, 7);

        const t = gsap.to(item, {
          x,
          y,
          rotation: `+=${rotate}`,
          duration,
          ease: "sine.inOut",
          onComplete: runLoop,
        });
        tweens.push(t);
      };

      // stagger the start slightly so they don't all move in unison
      gsap.delayedCall(i * 0.3, runLoop);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
    >
      {floatingImages.map((img, i) => (
        <div
          key={i}
          className={`floating-book absolute w-20 ${img.className}`}
          style={{ transform: `rotate(${img.rotate}deg)` }}
        >
          <Image
            src={img.src}
            alt=""
            width={200}
            height={280}
            className="w-full h-auto object-contain drop-shadow-lg"
          />
        </div>
      ))}
    </div>
  );
}