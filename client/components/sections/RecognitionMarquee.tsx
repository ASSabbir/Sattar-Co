"use client";

import Marquee from "react-fast-marquee";
import recognition from "@/data/recognition.json";

/**
 * Currently renders directory names as styled wordmarks since no logo
 * image files were provided. To use real logos instead: drop the files in
 * /public/logos/ and replace the <span> below with:
 *   <Image src={`/logos/${name}.png`} alt={name} width={140} height={40} className="opacity-60 hover:opacity-100 transition-opacity" />
 */
export default function RecognitionMarquee() {
  return (
    <section className="bg-ivory py-16 md:py-20 border-y border-charcoal/10">
      <div className="max-w-content mx-auto px-6 md:px-10 mb-10">
        <p className="eyebrow text-charcoal/40 text-center">Recognised By</p>
      </div>

      <Marquee speed={38} gradient gradientColor="#F5F1E7" gradientWidth={120} pauseOnHover>
        {[...recognition.directories, ...recognition.directories].map((name, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-3xl text-charcoal/50 mx-12 md:mx-16 whitespace-nowrap"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}