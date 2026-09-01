// NEW FILE: components/team/TeamMemberScroller.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function TeamMemberScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let targetScrollTop = scroller.scrollTop;
    let tween: gsap.core.Tween | null = null;

    const handleWheel = (e: WheelEvent) => {
      const { scrollHeight, clientHeight } = scroller;
      const maxScroll = scrollHeight - clientHeight;

      targetScrollTop = gsap.utils.clamp(0, maxScroll, targetScrollTop + e.deltaY);

      const atTop = scroller.scrollTop <= 0;
      const atBottom = scroller.scrollTop >= maxScroll - 1;

      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        e.preventDefault();
        tween?.kill();
        tween = gsap.to(scroller, {
          scrollTop: targetScrollTop,
          duration: 0.9,
          ease: "power3.out",
          overwrite: true,
        });
      }
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      scroller.removeEventListener("wheel", handleWheel);
      tween?.kill();
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      data-lenis-prevent
      className="lg:col-span-7 z-10 lg:h-full lg:overflow-y-auto lg:overscroll-contain no-scrollbar"
    >
      {children}
    </div>
  );
}