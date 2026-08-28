import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import Plate from "@/components/ui/Plate";
import insights from "@/data/insights.json";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = insights.find((i) => i.slug === params.slug);
  if (!item) return {};
  return { title: item.title, description: item.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function InsightArticlePage({ params }: Props) {
  const item = insights.find((i) => i.slug === params.slug);
  if (!item) notFound();

  return (
    <article className="bg-ivory pt-40 pb-24 md:pt-52 md:pb-32">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <SectionLabel label="Insights" className="mb-8" />
        <p className="eyebrow text-gold mb-6">
          {item.category} · {formatDate(item.date)}
        </p>
        <h1 className="font-display text-display-md text-charcoal max-w-3xl mb-10">
          {item.title}
        </h1>
        <p className="text-charcoal/40 text-sm mb-14">By {item.author}</p>

        <Plate label={item.category} className="aspect-[16/9] w-full mb-14" />

        <div className="max-w-2xl">
          <p className="text-charcoal/75 text-lg leading-relaxed mb-8">{item.excerpt}</p>
          <p className="text-charcoal/60 leading-relaxed mb-6">
            This is placeholder body copy for the demo build. Replace this section with the
            approved article content from the firm&rsquo;s editorial team — the layout, rich-text
            styling and image placement are already wired up for a long-form legal article.
          </p>
        </div>

        <div className="mt-16">
          <ArrowLink href="/insights">All Insights</ArrowLink>
        </div>
      </div>
    </article>
  );
}
