"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

import s1 from "@/public/logo/s1.png";
import s2 from "@/public/logo/s2.png";
import s3 from "@/public/logo/s3.png";
import s4 from "@/public/logo/s4.png";
import s5 from "@/public/logo/s5.png";
import s6 from "@/public/logo/s6.png";
import s7 from "@/public/logo/s7.png";
import s8 from "@/public/logo/s8.png";

const logos = [
  { src: s1, alt: "WWL - Who's Who Legal" },
  { src: s2, alt: "asialaw" },
  { src: s3, alt: "IFLR1000" },
  { src: s4, alt: "Employment Law Alliance" },
  { src: s5, alt: "ID40 - India Business Law Journal" },
  { src: s6, alt: "The A List - Bangladesh's Top Lawyers" },
  { src: s7, alt: "The Legal 500 Asia Pacific" },
  { src: s8, alt: "Chambers Asia-Pacific 2024 - Sattar & Co." },
];

export default function RecognitionMarquee() {
  return (
    <section className="bg-white py-10  border-y border-charcoal/10">
      <div className="max-w-content mx-auto px-6 md:px-10 mb-10">
        <p className="eyebrow text-charcoal/40 !text-xl text-center">Recognised By</p>
      </div>

      <Marquee speed={38} gradient gradientColor="white" gradientWidth={120} pauseOnHover>
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="mx-4 md:mx-6 flex h-24 w-40 md:h-28 md:w-48 items-center justify-center rounded-xl bg-white p-4   transition-all duration-300 hover:shadow-md hover:ring-charcoal/10"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              className="h-full w-full object-contain  transition-all duration-300 "
              placeholder="blur"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}