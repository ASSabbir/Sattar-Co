"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { markHeroIntroComplete } from "@/lib/heroEvents";
import wlogo from '../../public/blogo.png'

const VIDEO_SRC = "/videos/hero2.mp4";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

interface DepthRange {
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
}

interface DepthState {
  opacity: number;
  scale: number;
  blur: number;
  translateY: number;
}

// Timing for each text, as fractions of the video's total duration.
const TEXT_1_RANGE: DepthRange = { enterStart: 0.08, enterEnd: 0.2, exitStart: 0.32, exitEnd: 0.44 };
const TEXT_2_RANGE: DepthRange = { enterStart: 0.5, enterEnd: 0.62, exitStart: 0.74, exitEnd: 0.86 };
const LOGO_ENTER = { start: 0.88, end: 1.0 };

function textState(t: number, r: DepthRange): DepthState {
  if (t <= r.enterStart) return { opacity: 0, scale: 1, blur: 8, translateY: 24 };
  if (t >= r.exitEnd) return { opacity: 0, scale: 1, blur: 8, translateY: -16 };

  if (t < r.enterEnd) {
    const p = easeOutCubic((t - r.enterStart) / (r.enterEnd - r.enterStart));
    return { opacity: lerp(0, 1, p), scale: 1, blur: lerp(8, 0, p), translateY: lerp(24, 0, p) };
  }
  if (t < r.exitStart) return { opacity: 1, scale: 1, blur: 0, translateY: 0 };

  const p = easeInOutCubic((t - r.exitStart) / (r.exitEnd - r.exitStart));
  return { opacity: lerp(1, 0, p), scale: 1, blur: lerp(0, 6, p), translateY: lerp(0, -16, p) };
}

function logoState(t: number): DepthState {
  if (t <= LOGO_ENTER.start) return { opacity: 0, scale: 0.96, blur: 10, translateY: 20 };
  if (t >= LOGO_ENTER.end) return { opacity: 1, scale: 1, blur: 0, translateY: 0 };
  const p = easeOutCubic((t - LOGO_ENTER.start) / (LOGO_ENTER.end - LOGO_ENTER.start));
  return { opacity: lerp(0, 1, p), scale: lerp(0.96, 1, p), blur: lerp(10, 0, p), translateY: lerp(20, 0, p) };
}

function applyDepth(el: HTMLElement | null, state: DepthState) {
  if (!el) return;
  el.style.opacity = String(state.opacity);
  el.style.filter = state.blur > 0.05 ? `blur(${state.blur}px)` : "none";
  el.style.transform = `translateY(${state.translateY}px) scale(${state.scale})`;
}

type Phase = "intro" | "done";

/**
 * One-time intro: video plays once on load (scroll locked), two title
 * cards and the logo fade in/out in sync with the video's own timeline,
 * then scroll unlocks and the navbar reveals. No scroll-scrubbing here
 * anymore — the video plays exactly once, forward, like a normal video.
 * After it ends it simply holds on its final frame as the section's
 * background while the rest of the page scrolls normally beneath it.
 */
export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const introRafRef = useRef<number | null>(null);

  const [phase, setPhase] = useState<Phase>("intro");

  // Hide everything before first paint — no flash of the final state.
  useLayoutEffect(() => {
    applyDepth(logoRef.current, { opacity: 0, scale: 0.96, blur: 10, translateY: 20 });
    applyDepth(text1Ref.current, { opacity: 0, scale: 1, blur: 8, translateY: 24 });
    applyDepth(text2Ref.current, { opacity: 0, scale: 1, blur: 8, translateY: 24 });
    if (scrollCueRef.current) scrollCueRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      applyDepth(logoRef.current, { opacity: 1, scale: 1, blur: 0, translateY: 0 });
      applyDepth(text1Ref.current, { opacity: 1, scale: 1, blur: 0, translateY: 0 });
      applyDepth(text2Ref.current, { opacity: 1, scale: 1, blur: 0, translateY: 0 });
      if (scrollCueRef.current) scrollCueRef.current.style.opacity = "1";
      setPhase("done");
      markHeroIntroComplete();
      return;
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const video = videoRef.current;
    let ended = false;

    const finish = () => {
      if (ended) return;
      ended = true;
      document.documentElement.style.overflow = previousOverflow;
      setPhase("done");
      markHeroIntroComplete();
      if (scrollCueRef.current) {
        scrollCueRef.current.style.transition = "opacity 0.6s ease-out";
        scrollCueRef.current.style.opacity = "1";
      }
    };

    function tick() {
      if (ended || !video) return;
      const duration = video.duration;
      if (isFinite(duration) && duration > 0) {
        const t = clamp(video.currentTime / duration, 0, 1);
        applyDepth(text1Ref.current, textState(t, TEXT_1_RANGE));
        applyDepth(text2Ref.current, textState(t, TEXT_2_RANGE));
        applyDepth(logoRef.current, logoState(t));
      }
      introRafRef.current = requestAnimationFrame(tick);
    }

    if (video) {
      video.currentTime = 0;
      video
        .play()
        .then(() => {
          introRafRef.current = requestAnimationFrame(tick);
        })
        .catch(finish); // autoplay blocked — don't leave the visitor stuck

      video.addEventListener("ended", finish);
      video.addEventListener("error", finish);
    }

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      if (introRafRef.current) cancelAnimationFrame(introRafRef.current);
      video?.removeEventListener("ended", finish);
      video?.removeEventListener("error", finish);
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative h-screen w-full overflow-hidden bg-navy">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* <div className="absolute inset-0 z-10 bg-navy/25 pointer-events-none" /> */}

      <div className="relative z-20 h-full max-w-content mx-auto px-6 md:px-10 flex flex-col justify-end pb-20 md:pb-28">
        <div ref={logoRef}>
          <img src={wlogo.src} className="h-32" alt="Sattar&Co." />
        </div>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
        <div ref={text1Ref} className="inline-block text-center will-change-transform" style={{ opacity: 0 }}>
          <h2
            className="font-display text-[5vw] leading-tight inline-block px-10 py-6 md:px-14 md:py-8
                       bg-white/10 backdrop-blur-xl backdrop-saturate-150
                       border border-white/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]
                       rounded-3xl text-zinc-800 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
          >
            Your <span className="">Trusted</span> Advisor
          </h2>
        </div>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
        <div ref={text2Ref} className="inline-block text-center will-change-transform" style={{ opacity: 0 }}>
          <h2
            className="font-display text-[5vw] leading-tight inline-block px-10 py-6 md:px-14 md:py-8
                       bg-white/10 backdrop-blur-xl backdrop-saturate-150
                       border border-white/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]
                       rounded-3xl text-zinc-800 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
          >
            Counsel for <span className="">Complex</span> Matters
          </h2>
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-8 right-6 md:right-10 z-20 hidden sm:flex flex-col items-center gap-3 text-ivory/50"
      >
        <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
        <ArrowDown size={16} strokeWidth={1.5} className="animate-bounce" />
      </div>
    </section>
  );
}