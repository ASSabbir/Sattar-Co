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
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-10">
          <SectionLabel label="The Firm" light className="mb-8" />
          <RevealText as="h1" immediate className="font-display text-display-lg text-ivory max-w-3xl">
            {firm.introStatement}
          </RevealText>
        </div>
      </section>

      {/* About body */}
      <section className="bg-ivory py-24 md:py-32">
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
            <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-6">
              {firm.aboutBody.map((p, i) => (
                <p key={i} className="text-charcoal/70 leading-relaxed text-lg">
                  {p}
                </p>
              ))}
              <p className="eyebrow text-red-600 mt-4">{firm.founded}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — count up on scroll into view */}
      <section className="grain bg-charcoal py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {firm.stats.map((stat) => (
              <div key={stat.label} className="border-t border-ivory/15 pt-6">
                <StatCounter value={stat.value} />
                <p className="text-ivory/50 text-sm uppercase tracking-wide">{stat.label}</p>
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
      <section className="bg-ivory py-24 ">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <SectionLabel label="Life At The Firm" className="mb-8" />
          <ImageSlider
            images={[
              { src: img3, label: "Sattar&Co. — Office" },
              { src: img4, label: "Sattar&Co. — Meeting Room" },
              { src: img5, label: "Sattar&Co. — Team" },
            ]}
          />
        </div>
      </section>
       <section className="bg-ivory pb-24 ">
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
                title: "Discretion as standard",
                body: "Client matters, however high-profile, are handled with the confidentiality expected of a firm of this standing.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-charcoal/15 pt-6">
                <h3 className="font-display text-xl text-charcoal mb-4">{item.title}</h3>
                <p className="text-charcoal/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </>
  );
}