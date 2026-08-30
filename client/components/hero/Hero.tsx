"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import firm from "@/data/firm.json";
import { onLoaderComplete } from "@/lib/loaderEvents";

// ── Must match however many frames are actually in /public/frames ──
const FRAME_COUNT = 300;
const FRAME_PATH = (i: number) => `/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

// ── Easing / interpolation helpers (vanilla — no library) ──
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

// Wide windows — this is what makes the scale/blur feel gradual and
// scroll-controlled rather than "just appearing." Each number is a
// fraction of the full scroll track (0.15 = 15% scrolled).
const TEXT_1_RANGE: DepthRange = { enterStart: 0.15, enterEnd: 0.34, exitStart: 0.4, exitEnd: 0.58 };
const TEXT_2_RANGE: DepthRange = { enterStart: 0.58, enterEnd: 0.77, exitStart: 0.82, exitEnd: 0.98 };

interface DepthState {
  opacity: number;
  scale: number;
  blur: number;
  translateY: number;
}

/**
 * The core "depth" effect: text starts small, blurred and transparent (as
 * if far back in the scene), eases up to full size/clarity at its focal
 * point, holds, then continues scaling *up* and blurring back out as it
 * "passes" the viewer and dissolves into the background.
 */
function depthState(p: number, r: DepthRange): DepthState {
  if (p <= r.enterStart) return { opacity: 0, scale: 0.55, blur: 6, translateY: 26 };
  if (p >= r.exitEnd) return { opacity: 0, scale: 1.55, blur: 6, translateY: -20 };

  if (p < r.enterEnd) {
    const t = easeOutCubic((p - r.enterStart) / (r.enterEnd - r.enterStart));
    return {
      opacity: lerp(0, 1, t),
      scale: lerp(0.55, 1, t),
      blur: lerp(6, 0, t),
      translateY: lerp(26, 0, t),
    };
  }

  if (p < r.exitStart) {
    return { opacity: 1, scale: 1, blur: 0, translateY: 0 };
  }

  const t = easeInOutCubic((p - r.exitStart) / (r.exitEnd - r.exitStart));
  return {
    opacity: lerp(1, 0, t),
    scale: lerp(1, 1.4, t),
    blur: lerp(0, 5, t),
    translateY: lerp(0, -16, t),
  };
}

function applyDepth(el: HTMLElement | null, state: DepthState) {
  if (!el) return;
  el.style.opacity = String(state.opacity);
  el.style.filter = state.blur > 0.05 ? `blur(${state.blur}px)` : "none";
  el.style.transform = `translateY(${state.translateY}px) scale(${state.scale})`;
}

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introInnerRef = useRef<HTMLDivElement>(null);
  const text1InnerRef = useRef<HTMLDivElement>(null);
  const text2InnerRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const metricsRef = useRef({ top: 0, scrollable: 1 });
  const rafRef = useRef<number | null>(null);
  const scrollLoopActiveRef = useRef(false);

  // Only gates on frame 1 — the other 299 keep loading in the background
  // while the hero is already visible, instead of blocking on all of them.
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => onLoaderComplete(() => setLoaderDone(true)), []);

  // Load frame 1 immediately/specifically, then queue the rest in the
  // background — the browser fetches them in parallel regardless of when
  // we check on them, this just controls what we *wait* for.
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    const firstImg = new Image();
    firstImg.src = FRAME_PATH(1);
    images[0] = firstImg;
    const markFirstReady = () => {
      if (!cancelled) setFirstFrameLoaded(true);
    };
    firstImg.onload = markFirstReady;
    firstImg.onerror = markFirstReady; // don't block forever if frame 1 fails

    for (let i = 2; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      images[i - 1] = img;
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let renderW: number, renderH: number, offsetX: number, offsetY: number;
    if (imgRatio > canvasRatio) {
      renderH = ch;
      renderW = ch * imgRatio;
      offsetX = (cw - renderW) / 2;
      offsetY = 0;
    } else {
      renderW = cw;
      renderH = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - renderH) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !sticky) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = sticky.clientWidth;
    const height = sticky.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawFrame(Math.max(0, lastFrameRef.current));
  }

  function recomputeMetrics() {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    metricsRef.current = {
      top: wrapper.offsetTop,
      scrollable: Math.max(1, wrapper.offsetHeight - window.innerHeight),
    };
  }

  // Once frame 1 + the site's own intro loader are both ready: draw it,
  // then flip "ready". No waiting on the other 299 frames.
  useEffect(() => {
    if (!firstFrameLoaded || !loaderDone || ready) return;

    drawFrame(0);
    lastFrameRef.current = 0;

    // One frame of buffer so the canvas has actually painted frame 0
    // before the scroll loop takes over — avoids a blank flash.
    requestAnimationFrame(() => setReady(true));
  }, [firstFrameLoaded, loaderDone, ready]);

  // Main scroll-linked loop.
  useEffect(() => {
    if (!ready) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    recomputeMetrics();
    resizeCanvas();

    const handleResize = () => {
      recomputeMetrics();
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize);

    if (prefersReducedMotion) {
      applyDepth(text1InnerRef.current, { opacity: 1, scale: 1, blur: 0, translateY: 0 });
      applyDepth(text2InnerRef.current, { opacity: 1, scale: 1, blur: 0, translateY: 0 });
      return () => window.removeEventListener("resize", handleResize);
    }

    // Scroll handler only ever writes a target value — no DOM/canvas work here.
    const handleScroll = () => {
      const { top, scrollable } = metricsRef.current;
      targetProgressRef.current = clamp((window.scrollY - top) / scrollable, 0, 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    scrollLoopActiveRef.current = true;

    function loop() {
      if (!scrollLoopActiveRef.current) return;

      // Smoothed/inertial progress — subtle cinematic lag rather than a
      // 1:1 jump with the scrollbar. Lower = dreamier, higher = snappier.
      currentProgressRef.current = lerp(currentProgressRef.current, targetProgressRef.current, 0.08);
      const p = currentProgressRef.current;

      const frameIndex = clamp(Math.floor(p * (FRAME_COUNT - 1)), 0, FRAME_COUNT - 1);
      if (frameIndex !== lastFrameRef.current) {
        lastFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }

      applyDepth(text1InnerRef.current, depthState(p, TEXT_1_RANGE));
      applyDepth(text2InnerRef.current, depthState(p, TEXT_2_RANGE));

      // Intro copy + scroll cue dissolve as scrolling begins — this is
      // scroll-tied behaviour, not an entrance animation, so it stays.
      const introT = easeOutCubic(clamp(p / 0.12, 0, 1));
      if (introInnerRef.current) {
        introInnerRef.current.style.opacity = String(1 - introT);
        introInnerRef.current.style.filter = introT > 0.02 ? `blur(${introT * 5}px)` : "none";
        introInnerRef.current.style.transform = `translateY(${-introT * 18}px) scale(${1 + introT * 0.08})`;
      }
      if (scrollCueRef.current) {
        scrollCueRef.current.style.opacity = String(1 - easeOutCubic(clamp(p / 0.08, 0, 1)));
      }

      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      scrollLoopActiveRef.current = false;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready]);

  return (
    <section ref={wrapperRef} className="relative h-[400vh] bg-navy">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Black overlay for legibility over the sequence */}
        <div className="absolute inset-0 z-10 bg-navy/35 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy via-transparent to-navy/60 pointer-events-none" />

        {/* Intro copy — no entrance animation, just present. Only fades as scroll begins. */}
        <div className="relative z-20 h-full max-w-content mx-auto px-6 md:px-10 flex flex-col justify-end pb-20 md:pb-28">
          <div ref={introInnerRef}>
            <p className="eyebrow text-gold mb-6 md:mb-8">
              Dhaka, Bangladesh — Est. Corporate &amp; Commercial Practice
            </p>
            <h1 className="font-display text-display-xl text-ivory">Sattar&amp;Co.</h1>
            <p className="mt-4 md:mt-6 max-w-2xl text-ivory/70 text-base md:text-lg leading-relaxed">
              {firm.heroStatement}
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mt-10 md:mt-14">
              <Link href="/firm" className="link-underline text-ivory text-sm uppercase tracking-wide">
                Explore the Firm
              </Link>
              <Link
                href="/practice-areas"
                className="link-underline text-ivory/70 text-sm uppercase tracking-wide"
              >
                Our Practice Areas
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay 1 — depth animation, 15%→34% enter, 40%→58% exit */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
          <div ref={text1InnerRef} className="max-w-2xl text-center will-change-transform" style={{ opacity: 0 }}>
            <p className="eyebrow text-gold mb-6">A Practice Built On Trust</p>
            <h2 className="font-display text-display-md text-ivory">
              Placeholder copy — swap this for your own statement.
            </h2>
          </div>
        </div>

        {/* Overlay 2 — depth animation, 58%→77% enter, 82%→98% exit */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
          <div ref={text2InnerRef} className="max-w-2xl text-center will-change-transform" style={{ opacity: 0 }}>
            <p className="eyebrow text-gold mb-6">Recognised Internationally</p>
            <h2 className="font-display text-display-md text-ivory">
              Second placeholder statement — swap this one too.
            </h2>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-8 right-6 md:right-10 z-20 hidden sm:flex flex-col items-center gap-3 text-ivory/50"
        >
          <span className="eyebrow [writing-mode:vertical-rl]">Scroll</span>
          <ArrowDown size={16} strokeWidth={1.5} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}