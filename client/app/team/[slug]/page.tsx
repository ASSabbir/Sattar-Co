import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import Plate from "@/components/ui/Plate";
import team from "@/data/team.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) return {};
  return {
    title: member.name,
    description: member.bio,
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <section className="bg-ivory pt-40 pb-24 md:pt-52 md:pb-32">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <SectionLabel label="Team" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <Plate label={member.name} className="aspect-[4/5] w-full" />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h1 className="font-display text-display-md text-charcoal mb-3">{member.name}</h1>
            <p className="eyebrow text-red-600 mb-8">{member.role}</p>
            <p className="text-charcoal/70 leading-relaxed text-lg mb-10">{member.bio}</p>

            <p className="eyebrow text-charcoal/40 mb-4">Practice Areas</p>
            <ul className="flex flex-wrap gap-3 mb-12">
              {member.practiceAreas.map((area) => (
                <li
                  key={area}
                  className="text-sm text-charcoal/70 border border-charcoal/15 rounded-full px-4 py-1.5"
                >
                  {area}
                </li>
              ))}
            </ul>

            <ArrowLink href="/team">Back to Team</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}