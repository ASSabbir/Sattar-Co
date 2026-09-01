"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import team from "@/data/team.json";
import img from "../../public/images/sattar.webp";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function Leadership() {
  const head = team.find((m) => m.group === "Head of Firm") ?? team[0];

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const textWrapRef = useRef<HTMLDivElement | null>(null);

  const durationRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  const [videoReady, setVideoReady] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleLoadedMetadata = () => {
      if (Number.isFinite(videoEl.duration) && videoEl.duration > 0) {
        durationRef.current = videoEl.duration;
        setVideoReady(true);
      }
    };

    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoEl.pause();

    return () => {
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const targetEl = imageWrapRef.current;
    if (!sectionEl || !targetEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoReady) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (prefersReducedMotion) {
      videoEl.currentTime = 0;
      return;
    }

    const updateVideoFrame = () => {
      tickingRef.current = false;

      const sectionEl = sectionRef.current;
      const el = videoRef.current;
      if (!sectionEl || !el || durationRef.current <= 0) return;

      const rect = sectionEl.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = clamp((viewportH - rect.top) / (viewportH + rect.height), 0, 1);

      const targetTime = progress * durationRef.current;
      if (Math.abs(el.currentTime - targetTime) > 0.02) {
        el.currentTime = targetTime;
      }
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafRef.current = requestAnimationFrame(updateVideoFrame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videoReady]);

  return (
    <section
      ref={sectionRef}
      className="grain relative overflow-hidden py-24 md:py-36"
    >
      {/* Background Video (scroll-scrubbed) */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/video2.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-content mx-auto px-6 md:px-10">
        <SectionLabel
          label="Leadership"
          index="04"
          light
          className="mb-8 text-ivory/50"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div
            ref={imageWrapRef}
            className="lg:col-span-5 order-2 lg:order-1 transition-all duration-700 ease-out"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(56px)",
            }}
          >
            <img src={img.src} alt="" className="w-full" />
          </div>

          <div
            ref={textWrapRef}
            className="lg:col-span-7 lg:col-start-6 order-1 lg:order-2 transition-all duration-700 ease-out delay-150"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(56px)",
            }}
          >
            <p className="font-display text-display-md text-ivory mb-4">
              {head.name}
            </p>

            <p className="eyebrow text-red-600 mb-8">
              {head.role}
            </p>

            <p className="text-ivory/65 leading-relaxed max-w-lg mb-10">
              {head.bio}
            </p>

            <ArrowLink href={`/team/${head.slug}`} light>
              View Profile
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
} 