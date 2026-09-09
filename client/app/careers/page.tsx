import type { Metadata } from "next";
import RevealText from "@/components/ui/RevealText";
import CareersInteractive from "@/components/sections/CareersInteractive";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Sattar&Co. as a Junior Associate, Trainee, or Intern in Dhaka, Bangladesh.",
};

export default function CareersPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-navy pt-40 pb-20 md:pt-52 md:pb-24">
        <video
          src="/videos/video3.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-10">
          <RevealText as="h1" immediate className="font-display text-display-lg text-ivory max-w-3xl">
           Start Your Practice With Us
          </RevealText>
        </div>
      </section>

      <section className="bg-white pt-10 pb-4">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <p className="lg:col-span-6 text-jus text-charcoal text-xl md:text-2xl font-display leading-snug">
              Sattar&amp;Co. continually strives to attract and retain the best legal minds, in a
              friendly and welcoming environment essential to the professional growth of our firm.
            </p>
            <p className="lg:col-span-6 text-charcoal/70 text-base leading-relaxed self-end">
              We value the growth of our members through a structured and disciplined approach to
              both professional and personal development — encouraging members to act fairly,
              respectfully and honestly with one another to build a healthy, stable atmosphere.
            </p>
          </div>
        </div>
      </section>

      <CareersInteractive />
    </>
  );
}