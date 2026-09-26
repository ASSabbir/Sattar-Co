import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import Plate from "@/components/ui/Plate";
import RevealText from "@/components/ui/RevealText";
import firm from "@/data/firm.json";
import img1 from '../../public/images/10.png'

export default function FirmIntro() {
  return (
    <section className="bg-white pt-10 md:pt-24 ">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-[78px]  items-start">
          <div className="lg:col-span-6 relative -mt-[5px] ">
            {/* <SectionLabel label="Trusted Legal Counsel" index="01" className="mb-8" /> */}
            <RevealText as="h2" className="font-display pb-2 bg text-4xl spay   md:text-6xl text-charcoal mb-8">
              Knowledgeable,<br/> <span className="">Diligent & Reliable</span>
            </RevealText>
            <p className="text-charcoal  leading-relaxed text-lg md:text-[22px] max-w-lg mb-10">
             Sattar&Co. serves as a trusted advisor to local enterprises, foreign law firms and global investors navigating the Bangladeshi market. Built upon a foundation of elite legal skills, substantial experience and deep regulatory insight, our firm delivers the calculated judgment required to resolve and close complex matters.
            </p>
            {/* <ArrowLink href="/firm">Explore the Firm</ArrowLink> */}
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
