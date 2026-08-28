import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Plate from "@/components/ui/Plate";
import team from "@/data/team.json";

export const metadata: Metadata = {
  title: "Team",
  description: "Barristers, advocates and consultants at Sattar&Co., Dhaka.",
};

const GROUP_ORDER = ["Head of Firm", "Consultants", "Associates"];

export default function TeamPage() {
  return (
    <>
      <section className="grain bg-navy pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <SectionLabel label="Team" light className="mb-8" />
          <RevealText as="h1" immediate className="font-display text-display-lg text-ivory max-w-3xl">
            Counsel shaped by depth, not headcount
          </RevealText>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10 flex flex-col gap-24">
          {GROUP_ORDER.map((group) => {
            const members = team.filter((m) => m.group === group);
            if (members.length === 0) return null;

            return (
              <div key={group}>
                <p className="eyebrow text-red-600 mb-10">{group}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                  {members.map((member) => (
                    <Link
                      key={member.slug}
                      href={`/team/${member.slug}`}
                      className="group block"
                    >
                      <Plate label={member.name} className="aspect-[4/5] w-full mb-5" />
                      <h3 className="font-display text-xl text-charcoal group-hover:text-red-600 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-charcoal/50 text-sm mt-1">{member.role}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
