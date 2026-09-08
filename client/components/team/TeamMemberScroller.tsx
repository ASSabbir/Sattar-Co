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
    const wrapper = viewport?.closest<HTMLElement>("[data-profile-wrapper]");
    if (!viewport || !track || !wrapper) return;

    const mm = gsap.matchMedia();

    // Desktop: the sticky <main> holds portrait + right column on screen while
    // the page scroll scrubs the right column upward. When the right column
    // runs out, the wrapper ends, sticky releases, and everything below
    // (Key Matters for the Head of Firm) slides up naturally.
    mm.add("(min-width: 1024px)", () => {
      let distance = 0;

      const compute = () => {
        wrapper.style.height = "";
        distance = Math.max(0, track.scrollHeight - viewport.clientHeight);
        wrapper.style.height = `${window.innerHeight + distance}px`;
      };

      // Proxy is scrubbed 0 -> 1; the y is resolved from the LIVE distance on
      // every tick. A tween with a baked-in end value goes stale whenever the
      // content measures short on first paint (images/fonts not settled yet),
      // which left short bios pinned at y = 0 while the page still scrolled.
      const proxy = { p: 0 };

      const anim = gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate: () => gsap.set(track, { y: -distance * proxy.p }),
      });

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        animation: anim,
        onRefreshInit: compute,
        onRefresh: () => gsap.set(track, { y: -distance * proxy.p }),
      });

      compute();
      ScrollTrigger.refresh();

      let raf = 0;
      let lastH = track.scrollHeight;

      const relayout = (preserve: boolean) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const offsetBefore = -(gsap.getProperty(track, "y") as number);

          ScrollTrigger.refresh();
          lastH = track.scrollHeight;

          if (!preserve || distance <= 0) return;

          // Keep the same pixel offset on screen after a content-height change
          // (accordion open/close), so there is no jump or snap-back.
          const target = gsap.utils.clamp(0, distance, offsetBefore);
          const progress = target / distance;
          const scrollTo = Math.round(st.start + progress * (st.end - st.start));

          st.scroll(scrollTo);
          gsap.killTweensOf(anim);
          proxy.p = progress;
          anim.progress(progress);
          gsap.set(track, { y: -target });
        });
      };

      const ro = new ResizeObserver(() => {
        if (Math.abs(track.scrollHeight - lastH) < 4) return;
        relayout(true);
      });
      ro.observe(track);

      const onResize = () => relayout(false);
      window.addEventListener("resize", onResize);
      window.addEventListener("load", onResize);
      if (document.fonts?.ready)
        document.fonts.ready.then(() => relayout(false)).catch(() => {});

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", onResize);
        st.kill();
        anim.kill();
        gsap.set(track, { clearProps: "transform" });
        wrapper.style.height = "";
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={viewportRef}
      className="lg:col-span-7 z-10 lg:h-full lg:overflow-hidden no-scrollbar"
    >
      <div ref={trackRef} className="lg:will-change-transform">
        {children}
      </div>
    </div>
  );
}