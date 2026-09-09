import type { Metadata } from "next";
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
    <>
      <section className="grain relative overflow-hidden bg-navy pt-40 pb-24 md:pt-52 md:pb-32">
        <video
          src="/videos/video2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-10">
          
          <RevealText as="h1" immediate className="font-display text-display-lg text-ivory max-w-5xl">
            Expertise Across Industries
          </RevealText>
          
        </div>
      </section>
      <PracticeAreasInteractive />
      

      
    </>
  );
}