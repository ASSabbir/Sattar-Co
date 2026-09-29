import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description: "Legal disclaimer and privacy information for Sattar&Co.",
};

export default function DisclaimerPage() {
  return (
    <section className="bg-white pt-40 pb-24 md:pt-526">
      <div className=" mx-auto px-6 md:px-10">
        <SectionLabel label="Legal Disclaimer & Privacy" className="mb-8" />
        {/* <RevealText as="h1" immediate className="font-display py-6 text-display-md text-charcoal max-w-2xl mb-10">
          Legal Disclaimer &amp; Privacy
        </RevealText> */}

        <div className=" flex flex-col gap-10 text-charcoal/70 leading-relaxed">
          <div>
            
            <p className="text-charcoal  leading-relaxed text-lg md:text-[22px]">
              The information provided on this website is not a means for advertisement or for solicitation of client work. It is for general information purposes only. Sattar&Co. is not advertising for or soliciting clients through this website.
            </p>
          </div>
          <div>
            {/* <h2 className="text-charcoal font-semibold leading-relaxed text-lg md:text-[22px] mb-3">No Attorney–Client Relationship</h2> */}
            <p className="text-charcoal  leading-relaxed text-lg md:text-[22px]">
              You agree that any decision taken by you from the information provided in this website is your sole responsibility. Sattar&Co. shall not be liable for any decision you take relying on the information provided on this website or any other third party web-link referred to or contained in this website.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
