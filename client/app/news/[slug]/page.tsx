import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import Plate from "@/components/ui/Plate";
import news from "@/data/news.json";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = news.find((n) => n.slug === params.slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function NewsArticlePage({ params }: Props) {
  const item = news.find((n) => n.slug === params.slug);
  if (!item) notFound();

  return (
    <article className="bg-ivory pt-40 pb-24 md:pt-52 md:pb-32">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <SectionLabel label="News" className="mb-8" />
        <p className="eyebrow text-gold mb-6">
          {item.category} · {formatDate(item.date)}
        </p>
        <h1 className="font-display text-display-md text-charcoal max-w-3xl mb-14">
          {item.title}
        </h1>

        <Plate label={item.category} className="aspect-[16/9] w-full mb-14" />

        <div className="max-w-2xl">
          <p className="text-charcoal/75 text-lg leading-relaxed">{item.summary}</p>
        </div>

        <div className="mt-16">
          <ArrowLink href="/news">All News</ArrowLink>
        </div>
      </div>
    </article>
  );
}
