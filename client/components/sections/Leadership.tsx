import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import Plate from "@/components/ui/Plate";
import team from "@/data/team.json";

export default function Leadership() {
  const head = team.find((m) => m.group === "Head of Firm") ?? team[0];

  return (
    <section className="grain bg-charcoal py-24 md:py-36">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <SectionLabel label="Leadership" index="04" light className="mb-8 text-ivory/50" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <Plate label={head.name} className="aspect-[4/5] w-full" />
          </div>

          <div className="lg:col-span-7 lg:col-start-6 order-1 lg:order-2">
            <p className="font-display text-display-md text-ivory mb-4">
              {head.name}
            </p>
            <p className="eyebrow text-gold mb-8">{head.role}</p>
            <p className="text-ivory/65 leading-relaxed max-w-lg mb-10">{head.bio}</p>
            <ArrowLink href={`/team/${head.slug}`} light>
              View Profile
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
