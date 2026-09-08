"use client";

interface Props {
  name: string;
  paragraphs: string[];
}

export default function BioSection({ name, paragraphs }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="eyebrow flex items-start gap-2 text-red-600 border-b border-charcoal/15 pb-3 min-h-[52px] md:min-h-[56px]">
        <span aria-hidden>ˇ</span> <span className="leading-snug">BIOGRAPHY</span>
      </h2>

      <div className="space-y-4 text-xl text-charcoal leading-relaxed text-justify hyphens-auto">
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
    </div>
  );
}