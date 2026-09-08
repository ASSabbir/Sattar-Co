// NEW FILE: components/team/TeamMemberScroller.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function TeamMemberScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const viewport = viewportRef.current;
    const track = trackRef.current;
    // Scroll length lives on the OUTER wrapper (sibling scope of the sticky
    // <main>), so the sticky element itself keeps its exact h-screen box.
    const wrapper = viewport?.closest<HTMLElement>("[data-profile-wrapper]");
    if (!viewport || !track || !wrapper) return;

    const mm = gsap.matchMedia();

    // Desktop: page scroll (Lenis-smoothed, identical feel to every other page)
    // scrubs the right column. Wheel anywhere on the page works because it is
    // the document that scrolls — no custom wheel handler, no pin-spacer.
    mm.add("(min-width: 1024px)", () => {
      const distance = () =>
        Math.max(0, track.scrollHeight - viewport.clientHeight);

      const resize = () => {
        wrapper.style.height = `${window.innerHeight + distance()}px`;
      };

      const anim = gsap.to(track, { y: () => -distance(), ease: "none" });

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        animation: anim,
        onRefresh: resize,
      });

      resize();
      ScrollTrigger.refresh();

      return () => {
        st.kill();
        anim.kill();
        gsap.set(track, { clearProps: "transform" });
        wrapper.style.height = "";
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <div
        ref={viewportRef}
        className="lg:col-span-7 z-10 lg:h-full lg:overflow-hidden no-scrollbar"
      >
        <div ref={trackRef} className="lg:will-change-transform">
          {children}
        </div>
      </div>
    </>
  );
}
