import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import RevealText from "@/components/ui/RevealText";
import StatCounter from "@/components/ui/StatCounter";
import TestimonialSpotlight from "@/components/sections/TestimonialSpotlight";
import RecognitionMarquee from "@/components/sections/RecognitionMarquee";
import ImageSlider from "@/components/sections/ImageSlider";
import firm from "@/data/firm.json";
import img1 from "../../public/images/5.webp";
import img2 from "../../public/images/sattar.webp";
import img3 from "../../public/images/Firm-rotate-2.jpg";
import img4 from "../../public/images/Firm-rotate-3 (1).jpg";
import img5 from "../../public/images/about.webp";
import { FaQuoteLeft } from "react-icons/fa";
export const metadata: Metadata = {
  title: "The Firm",
  description: firm.introBody,
};

export default function FirmPage() {
  return (
    <>
      {/* Page hero */}
      <section className="grain relative overflow-hidden bg-navy pt-40 pb-24 md:pt-52 md:pb-32">
        <Image
          src={img1}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-10">
          {/* <SectionLabel label="The Firm" light className="mb-8" /> */}
          <RevealText as="h1" immediate className="font-display text-display-lg text-white ">
           Trusted Excellence
          </RevealText>
        </div>
      </section>

      {/* About body */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full lg:sticky lg:top-32 overflow-hidden">
                <Image
                  src={img2}
                  alt="Sattar&Co."
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-6 relative">
              {/* Opening Quote */}
             <div className="">
               <FaQuoteLeft size={44} strokeWidth={1} className="text-red-600/80 bg- relative -top-5 -left-10" />
             </div>

              <p className="text-charcoal/70 leading-relaxed text-2xl text-justify relative z-10">
                I have always believed that exceptional legal counsel begins with
                understanding more than the law. It requires understanding the client,
                the realities they face, and the environment in which their decisions
                are made.
              </p>

              <p className="text-charcoal/70 leading-relaxed text-2xl text-justify relative z-10">
                At Sattar&Co., we bring together legal expertise, commercial perspective
                and sound judgment to address matters that demand precision and
                discretion. Our role is to understand what is at stake, anticipate what
                lies ahead, and help our clients move forward with confidence.
              </p>

              <div className="relative">
                <p className="text-charcoal/70 leading-relaxed text-2xl text-justify relative z-10">
                  We have built the firm on a simple principle: excellence is measured
                  not only by the quality of our work, but by the trust we earn through it.
                </p>

                
              </div>

              <p className="eyebrow text-red-600 ita !text-lg mt-4">
                Barrister Sameer Sattar — Head of Firm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — count up on scroll into view */}
      <section className="grain bg-charcoal py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
            {firm.stats.map((stat) => (
              <div key={stat.label} className="border-t flex flex-col items-center border-white pt-6">
                <StatCounter value={stat.value} />
                <p className="text-white text-xl uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial spotlight */}
      <TestimonialSpotlight />

      {/* Recognised by — logo marquee */}
      <RecognitionMarquee />

      {/* Values */}


      {/* Image slider */}
      <section className="bg-white py-24 ">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <SectionLabel label="Life At The Firm" className="mb-8 " />
          <ImageSlider
            images={[
              { src: img3, label: "Sattar&Co. — Office" },
              { src: img4, label: "Sattar&Co. — Meeting Room" },
              { src: img5, label: "Sattar&Co. — Team" },
            ]}
          />
        </div>
      </section>
      <section className="bg-white pb-24 ">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <SectionLabel label="Approach" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {[
              {
                title: "Collaborative by design",
                body: "Matters are led by senior counsel from first instruction through to resolution, working closely with in-house teams and foreign counsel alike.",
              },
              {
                title: "Practical, not theoretical",
                body: "Advice is built for how business actually operates in Bangladesh — grounded in the regulatory reality, not abstract legal principle alone.",
              },
              {
                title: "Commercially focused",
                body: "Clear advice focused on your objectives, risks and commercial priorities.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-charcoal/15 pt-6">
                <h3 className="font-display text-5xl text-charcoal mb-6">{item.title}</h3>
                <p className="text-charcoal/90 text-xl leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}