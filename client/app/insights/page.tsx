import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import insights from "@/data/insights.json";
import heroImg from "../../public/images/2.webp";

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
      <section className="grain relative overflow-hidden bg-navy pt-40 pb-24 md:pt-52 md:pb-32">
        <Image
          src={heroImg}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-10">
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
              <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <p className="eyebrow text-red-600 mb-3">
                {item.category} · {formatDate(item.date)}
              </p>
              <h2 className="font-display text-xl text-charcoal mb-3 group-hover:text-red-600 transition-colors duration-300">
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