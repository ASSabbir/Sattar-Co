import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import insights from "@/data/insights.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = insights.find((i) => i.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.excerpt };
}

function formatDate(item: { date: string | null; year: number }) {
  if (!item.date) return String(item.year);
  return new Date(item.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = insights.find((i) => i.slug === slug);
  if (!item) notFound();

  return (
    <article className="bg-ivory pt-40 pb-24 md:pt-52 md:pb-32">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <SectionLabel label="Insights" className="mb-8" />
        <p className="eyebrow text-red-600 mb-6">
          {item.category} · {formatDate(item)}
        </p>
        <h1 className="font-display text-display-md text-charcoal max-w-3xl mb-10">
          {item.title}
        </h1>
        {item.author && <p className="text-charcoal/40 text-sm mb-14">By {item.author}</p>}

        <div className={item.author ? "max-w-2xl" : "max-w-2xl mt-14"}>
          <p className="text-charcoal/75 text-lg leading-relaxed mb-8">{item.excerpt}</p>
          <p className="text-charcoal/60 leading-relaxed mb-6">
            This is placeholder body copy for the demo build. Replace this section with the
            approved article content from the firm&rsquo;s editorial team.
          </p>
        </div>

        <div className="mt-16">
          <ArrowLink href="/insights">All Insights</ArrowLink>
        </div>
      </div>
    </article>
  );
}