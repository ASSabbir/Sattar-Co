"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  name: string;
  paragraphs: string[];
}

const MIN_COLLAPSED = 220;
const MAX_COLLAPSED = 560;

export default function BioSection({ name, paragraphs }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const [collapsedHeight, setCollapsedHeight] = useState(MIN_COLLAPSED);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Measured with getBoundingClientRect on a NON-animated element only, and
  // never inside a ResizeObserver — observing our own collapsible box would
  // feed its height back into itself and produce the scroll jitter.
  const measure = useCallback(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    const header = headerRef.current;
    if (!root || !content || !header) return;

    const full = content.scrollHeight;

    const aside = root
      .closest("[data-profile-grid]")
      ?.querySelector<HTMLElement>("[data-profile-aside]");

    const asideH = aside?.offsetHeight ?? 0;
    const TOGGLE_ROW = 56;
    const target = asideH - header.offsetHeight - TOGGLE_ROW;

    const next = Math.min(
      MAX_COLLAPSED,
      Math.max(MIN_COLLAPSED, Math.round(target || MIN_COLLAPSED))
    );

    setFullHeight((p) => (Math.abs(p - full) > 2 ? full : p));
    setCollapsedHeight((p) => (Math.abs(p - next) > 2 ? next : p));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    schedule();
    const t1 = window.setTimeout(measure, 200);
    const t2 = window.setTimeout(measure, 800); // webfont settle
    window.addEventListener("resize", schedule);

    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", schedule);
    };
  }, [measure, paragraphs]);

  const needsToggle = fullHeight > collapsedHeight + 24;
  const maxHeight = !needsToggle || expanded ? "none" : `${collapsedHeight}px`;

  return (
    <div ref={rootRef} className="space-y-6">
      <div
        ref={headerRef}
        className="eyebrow flex items-start gap-2 text-red-600 border-b border-charcoal/15 pb-3 min-h-[52px] md:min-h-[56px]"
      >
        <span aria-hidden>ˇ</span> <span className="leading-snug">BIOGRAPHY</span>
      </div>

      <div className="relative">
        <div
          ref={contentRef}
          id="bio-content"
          style={{ maxHeight, overflow: "hidden" }}
          className="space-y-4 text-xl text-charcoal leading-relaxed text-justify hyphens-auto"
        >
          {paragraphs.map((para, idx) => (
            <p key={idx}>
              {idx === 0 && (
                <strong className="font-display text-2xl md:text-3xl text-charcoal">
                  {name}{" "}
                </strong>
              )}
              {idx === 0 ? para.replace(name, "").trim() : para}
            </p>
          ))}
        </div>

        {needsToggle && !expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="bio-content"
          className="eyebrow text-red-600 hover:text-charcoal transition-colors"
        >
          {expanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}