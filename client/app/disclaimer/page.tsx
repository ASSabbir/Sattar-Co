import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description: "Legal disclaimer and privacy information for Sattar&Co.",
};

export default function DisclaimerPage() {
  return (
    <section className="bg-ivory pt-40 pb-24 md:pt-52 md:pb-36">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <SectionLabel label="Legal Disclaimer" className="mb-8" />
        <RevealText as="h1" immediate className="font-display text-display-md text-charcoal max-w-2xl mb-16">
          Legal Disclaimer &amp; Privacy
        </RevealText>

        <div className="max-w-2xl flex flex-col gap-10 text-charcoal/70 leading-relaxed">
          <div>
            <h2 className="font-display text-xl text-charcoal mb-3">No Legal Advice</h2>
            <p>
              This is placeholder disclaimer copy for the demo build. The final text should be
              supplied and approved by Sattar&amp;Co. before launch — content on this website is for
              general informational purposes only and does not constitute legal advice.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-charcoal mb-3">No Attorney–Client Relationship</h2>
            <p>
              Contacting the firm through this website does not, on its own, create an
              attorney–client relationship. Replace this section with the firm&rsquo;s approved
              language.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-charcoal mb-3">Privacy</h2>
            <p>
              Details on how enquiry-form and cookie data are collected and used will be added
              here once the firm&rsquo;s privacy policy is finalised.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
