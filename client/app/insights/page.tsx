import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Plate from "@/components/ui/Plate";
import insights from "@/data/insights.json";

export const metadata: Metadata = {
  title: "Insights",
  description: "Legal commentary and regulatory updates from Sattar&Co.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function InsightsPage() {
  return (
    <>
      <section className="grain bg-navy pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <SectionLabel label="Insights" light className="mb-8" />
          <RevealText as="h1" immediate className="font-display text-display-lg text-ivory max-w-3xl">
            Commentary from the firm
          </RevealText>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {insights.map((item) => (
            <Link key={item.slug} href={`/insights/${item.slug}`} className="group">
              <Plate label={item.category} className="aspect-[4/3] w-full mb-6" />
              <p className="eyebrow text-gold mb-3">
                {item.category} · {formatDate(item.date)}
              </p>
              <h2 className="font-display text-xl text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h2>
              <p className="text-charcoal/55 text-sm leading-relaxed">{item.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
