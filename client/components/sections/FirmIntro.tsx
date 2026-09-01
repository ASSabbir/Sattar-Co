import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import Plate from "@/components/ui/Plate";
import RevealText from "@/components/ui/RevealText";
import firm from "@/data/firm.json";
import img1 from '../../public/images/about.webp'

export default function FirmIntro() {
  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <SectionLabel label="Trusted Legal Counsel" index="01" className="mb-8" />
            <RevealText as="h2" className="font-display text-display-md text-charcoal mb-8">
              {firm.introStatement}
            </RevealText>
            <p className="text-charcoal/70 text-justify leading-relaxed max-w-lg mb-10">
              {firm.introBody}
            </p>
            <ArrowLink href="/firm">Explore the Firm</ArrowLink>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <img src={img1.src} alt="" />
            {/* <Plate label="Leadership — Barrister Sameer Sattar" className="aspect-[4/5] w-full" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
