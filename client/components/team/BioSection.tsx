// NEW FILE: components/team/BioSection.tsx
"use client";

import { useRef, useState } from "react";

interface Props {
  name: string;
  paragraphs: string[];
}

const COLLAPSED_HEIGHT = 280;

export default function BioSection({ name, paragraphs }: Props) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const contentHeight = contentRef.current?.scrollHeight ?? 0;
  const needsToggle = contentHeight > COLLAPSED_HEIGHT;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-2 text-[#C92B2B] font-semibold text-xs uppercase tracking-widest border-b border-[#1A1A1A]/15 pb-3 min-h-[52px] md:min-h-[56px]">
        <span>ˇ</span> <span className="leading-snug">BIOGRAPHY</span>
      </div>

      <div className="relative">
        <div
          ref={contentRef}
          style={{
            maxHeight: expanded || !needsToggle ? contentHeight || "none" : COLLAPSED_HEIGHT,
            transition: "max-height 0.6s cubic-bezier(0.65,0,0.35,1)",
            overflow: "hidden",
          }}
          className="space-y-4 text-xs md:text-sm text-[#1A1A1A]/85 leading-relaxed font-light text-justify"
        >
          {paragraphs.map((para, idx) => (
            <p key={idx}>
              {idx === 0 && (
                <strong className="font-semibold text-[#1A1A1A]">
                  {name}{" "}
                </strong>
              )}
              {idx === 0 ? para.replace(name, "").trim() : para}
            </p>
          ))}
        </div>

        {needsToggle && !expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F4F1E8] to-transparent" />
        )}
      </div>

      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[11px] uppercase tracking-widest font-semibold text-[#C92B2B] hover:text-[#1A1A1A] transition-colors"
        >
          {expanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}