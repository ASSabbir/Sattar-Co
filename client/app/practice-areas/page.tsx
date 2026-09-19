import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import practiceAreas from "@/data/practiceAreas.json";
import img1 from "../../public/images/10.webp";

import PracticeAreasInteractive from "@/components/sections/PracticeAreasInteractive";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Corporate, commercial, dispute resolution and regulatory practice areas at Sattar&Co., Dhaka.",
};

export default function PracticeAreasPage() {
  return (
    <section className="">
      {/* Page hero */}
      <section className="grain relative overflow-hidden bg-navy flex justify-center item-center pt-36 pb-24  md:pb-32">
        <Image
          src={img1}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-content mx-auto  px-6 md:px-10">
          {/* <SectionLabel label="The Firm" light className="mb-8" /> */}
          <RevealText as="h1" immediate className="font-display text-display-lg text-white ">
           Trusted Excellence
          </RevealText>
        </div>
      </section>
      <PracticeAreasInteractive />
    </section>
  );
}