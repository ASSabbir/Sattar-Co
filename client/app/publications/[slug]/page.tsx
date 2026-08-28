import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import Plate from "@/components/ui/Plate";
import news from "@/data/publications.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
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

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <article className="bg-ivory pt-40 pb-24 md:pt-52 md:pb-32">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <SectionLabel label="News" className="mb-8" />
        <p className="eyebrow text-red-600 mb-6">
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
          <ArrowLink href="/publications">All News</ArrowLink>
        </div>
      </div>
    </article>
  );
}