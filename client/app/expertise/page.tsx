import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import practiceAreas from "@/data/practiceAreas.json";
import img1 from "../../public/images/banner-practice-area.jpg";

import PracticeAreasInteractive from "@/components/sections/PracticeAreasInteractive";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Corporate, commercial, dispute resolution and regulatory practice areas at Sattar&Co., Dhaka.",
};
import PageHeader from "@/components/sections/PageHeader";

export default function PracticeAreasPage() {
  return (
    <section className="">
      {/* Page hero */}
      <PageHeader
        title="Expertise & Experience"
        description="Corporate, commercial and dispute resolution counsel across industries in Bangladesh."
        image={img1}
      />
      <PracticeAreasInteractive />
    </section>
  );
}