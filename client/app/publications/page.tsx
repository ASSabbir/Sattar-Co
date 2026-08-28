import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Plate from "@/components/ui/Plate";
import news from "@/data/news.json";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Firm news, client matters and announcements from Sattar&Co.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function NewsPage() {
  return (
    <>
      <section className="grain bg-navy pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <SectionLabel label="News & Events" light className="mb-8" />
          <RevealText as="h1" immediate className="font-display text-display-lg text-ivory max-w-3xl">
            Recent matters and firm announcements
          </RevealText>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="max-w-content mx-auto px-6 md:px-10 flex flex-col">
          {news.map((item) => (
            <Link
              key={item.slug}
              href={`/publications/${item.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center py-10 border-t border-charcoal/10 last:border-b"
            >
              <div className="lg:col-span-3">
                <p className="text-charcoal/40 text-sm">{formatDate(item.date)}</p>
              </div>
              <div className="lg:col-span-2">
                <p className="eyebrow text-red-600">{item.category}</p>
              </div>
              <div className="lg:col-span-6">
                <h2 className="font-display text-xl md:text-2xl text-charcoal group-hover:text-red-600 transition-colors duration-300">
                  {item.title}
                </h2>
              </div>
              <div className="lg:col-span-1 flex lg:justify-end">
                <span className="text-charcoal/40 text-sm uppercase tracking-wide link-underline">
                  Read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
