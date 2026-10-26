import type { Metadata } from "next";
import RevealText from "@/components/ui/RevealText";
import CareersInteractive from "@/components/sections/CareersInteractive";
import Image from "next/image";
import img1 from "../../public/images/banner-gown.jpg";
export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Sattar&Co. as a Junior Associate, Trainee, or Intern in Dhaka, Bangladesh.",
};
import PageHeader from "@/components/sections/PageHeader";

export default function CareersPage() {
  return (
    <>
      <PageHeader
  title="Where Careers Begin Well"
  description="We attract exceptional young lawyers and invest in their growth, with senior guidance from the first day, whether you join as an intern, trainee or associate."
  image={img1}
  
/>

      {/* <section className="bg-white pt-10 pb-4">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <p className="lg:col-span-6 text-jus text-charcoal text-xl md:text-2xl font-display leading-snug">
              Sattar&amp;Co. continually strives to attract and retain the best legal minds, in a
              friendly and welcoming environment essential to the professional growth of our firm.
            </p>
            <p className="lg:col-span-6 text-charcoal  leading-relaxed text-lg md:text-[22px]self-end">
              We value the growth of our members through a structured and disciplined approach to
              both professional and personal development — encouraging members to act fairly,
              respectfully and honestly with one another to build a healthy, stable atmosphere.
            </p>
          </div>
        </div>
      </section> */}

      <CareersInteractive />
    </>
  );
}