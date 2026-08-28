import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import practiceAreas from "@/data/practiceAreas.json";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Corporate, commercial, dispute resolution and regulatory practice areas at Sattar&Co., Dhaka.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <section className="grain bg-navy pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <SectionLabel label="Practice Areas" light className="mb-8" />
          <RevealText as="h1" immediate className="font-display text-display-lg text-ivory max-w-3xl">
            Comprehensive counsel across Bangladesh&rsquo;s principal industries
          </RevealText>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10 flex flex-col gap-20 md:gap-28">
          {practiceAreas.map((area) => (
            <div
              key={area.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-12 border-t border-charcoal/10"
            >
              <div className="lg:col-span-4">
                <span className="eyebrow text-red-600 block mb-4">{area.index}</span>
                <h2 className="font-display text-3xl md:text-4xl text-charcoal">
                  {area.category}
                </h2>
              </div>

              <div className="lg:col-span-4">
                <p className="text-charcoal/65 leading-relaxed">{area.description}</p>
              </div>

              <div className="lg:col-span-4">
                <ul className="flex flex-col gap-3">
                  {area.areas.map((a) => (
                    <li key={a} className="text-charcoal/70 text-sm flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
