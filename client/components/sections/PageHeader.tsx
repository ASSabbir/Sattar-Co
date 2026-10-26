"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import RevealText from "@/components/ui/RevealText";

type PageHeaderProps = {
  title: ReactNode;
  description?: string;
  image: StaticImageData | string;
  imageAlt?: string;
  /** Put the image on the right instead of the left */
  reverse?: boolean;
};

export default function PageHeader({
  title,
  description,
  image,
  imageAlt = "",
  reverse = false,
}: PageHeaderProps) {
  return (
    <section className="bg-white pt-[109px]   ">
      <div className=" mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden ">
          {/* Image */}
          <div
            className={`relative lg:col-span-6 min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] ${
              reverse ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Text panel */}
          <div
            className={`grain relative lg:col-span-6 bg-zinc-800 text-white flex flex-col justify-center px-8 py-12 md:px-12 md:py-16 lg:px-14 ${
              reverse ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <span className="block w-12 h-[2px] bg-red-600 mb-8" />

            <RevealText
              as="h1"
              immediate
              className="font-display text-4xl md:text-5xl leading-[1.1] text-white"
            >
              {title}
            </RevealText>

            {description && (
              <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}