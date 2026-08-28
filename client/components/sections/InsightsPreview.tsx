import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import Plate from "@/components/ui/Plate";
import insights from "@/data/insights.json";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function InsightsPreview() {
  const featured = insights.find((i) => i.featured) ?? insights[0];
  const rest = insights.filter((i) => i.slug !== featured.slug).slice(0, 3);

  return (
    <section className="bg-ivory py-24 md:py-36">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <SectionLabel label="Insights" index="05" className="mb-8" />
            <h2 className="font-display text-display-md text-charcoal max-w-xl">
              Commentary from the firm
            </h2>
          </div>
          <ArrowLink href="/insights" className="hidden md:inline-flex">
            All Insights
          </ArrowLink>
        </div>

        <Link href={`/insights/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 items-center">
          <div className="lg:col-span-7">
            <Plate label={featured.category} className="aspect-[16/10] w-full" />
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow text-gold mb-4">
              {featured.category} · {formatDate(featured.date)}
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-4 group-hover:text-gold transition-colors duration-300">
              {featured.title}
            </h3>
            <p className="text-charcoal/60 leading-relaxed mb-4">{featured.excerpt}</p>
            <p className="text-sm text-charcoal/40">By {featured.author}</p>
          </div>
        </Link>

        <div className="rule mb-12 text-charcoal" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {rest.map((item) => (
            <Link key={item.slug} href={`/insights/${item.slug}`} className="group">
              <Plate label={item.category} className="aspect-[4/3] w-full mb-6" />
              <p className="eyebrow text-gold mb-3">
                {item.category} · {formatDate(item.date)}
              </p>
              <h3 className="font-display text-xl text-charcoal group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>

        <ArrowLink href="/insights" className="md:hidden mt-12">
          All Insights
        </ArrowLink>
      </div>
    </section>
  );
}
