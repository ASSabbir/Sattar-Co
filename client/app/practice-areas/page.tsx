import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import practiceAreas from "@/data/practiceAreas.json";

import PracticeAreasInteractive from "@/components/sections/PracticeAreasInteractive";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Corporate, commercial, dispute resolution and regulatory practice areas at Sattar&Co., Dhaka.",
};

export default function PracticeAreasPage() {
  return (
<section className="">
      <section className="grain relative isolate w-full overflow-hidden bg-navy h-[clamp(240px,52svh,620px)] min-h-[240px]">

        <Image
          src="/images/9.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="pointer-events-none -z-10 block object-cover object-[center_20%] md:hidden"
        />
        <video
          src="/videos/video2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full max-w-none object-cover object-[center_19%] md:block"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-black/15" />

        <div className="relative z-10 mx-auto flex h-full  my-auto max-w-content items-center px-[clamp(1rem,4vw,2.5rem)]">
          <RevealText
            as="h1"
            immediate
            className="font-display text-display-lg text-zinc-800 max-w-[min(100%,64rem)] leading-[1] [text-wrap:balance] [&>*]:leading-[1] [&_*]:align-middle"
          >
            Expertise &amp; Experience
          </RevealText>
        </div>
      </section>
      <PracticeAreasInteractive />
    </section>
  );
}