import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import firm from "@/data/firm.json";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sattar&Co. in Dhaka, Bangladesh.",
};

export default function ContactPage() {
  return (
    <section className="grain bg-navy pt-40 pb-24 md:pt-52 md:pb-36">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <SectionLabel label="Contact" light className="mb-8" />
        <RevealText as="h1" immediate className="font-display text-display-lg text-ivory max-w-2xl mb-16 md:mb-20">
          Start a Conversation
        </RevealText>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div>
              <p className="eyebrow text-gold mb-3">Office</p>
              <p className="font-display text-2xl text-ivory mb-1">Sattar&amp;Co.</p>
              <p className="text-ivory/60">{firm.location}</p>
            </div>
            <div>
              <p className="eyebrow text-gold mb-3">Phone</p>
              <a href={`tel:${firm.phone.replace(/\s/g, "")}`} className="text-ivory/80 link-underline">
                {firm.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow text-gold mb-3">Email</p>
              <a href={`mailto:${firm.email}`} className="text-ivory/80 link-underline">
                {firm.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
