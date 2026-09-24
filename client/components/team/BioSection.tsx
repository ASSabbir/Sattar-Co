"use client";

interface Props {
  name: string;
  paragraphs: string[];
}

export default function BioSection({ name, paragraphs }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="eyebrow !tracking-[3px] !text-[14px] text-red-600 block mb-[clamp(0.35rem,1svh,0.75rem)]">
        <span aria-hidden>ˇ</span> <span className="leading-snug">BIOGRAPHY</span>
      </h2>

      <div className="space-y-4 text-xl text-charcoal leading-relaxed hyphens-auto">
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