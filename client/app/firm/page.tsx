import type { Metadata } from "next";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import StatCounter from "@/components/ui/StatCounter";
import TestimonialSpotlight from "@/components/sections/TestimonialSpotlight";
import RecognitionMarquee from "@/components/sections/RecognitionMarquee";
import ImageSlider from "@/components/sections/ImageSlider";
import firm from "@/data/firm.json";
import heroImg from "../../public/images/10.webp";
import founderImg from "../../public/images/sattar.webp";
import officeImg from "../../public/images/Firm-rotate-2.jpg";
// TIP: rename this file to firm-rotate-3.jpg (no spaces / brackets) — cleaner URLs.
import meetingRoomImg from "../../public/images/Firm-rotate-3 (1).jpg";
import teamImg from "../../public/images/about.webp";

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const SITE_NAME = "Sattar&Co.";

const FOUNDER = {
  prefix: "Barrister",
  name: "Sameer Sattar",
  title: "Head of Firm",
};

const FOUNDER_MESSAGE = [
  "I have always believed that exceptional legal counsel begins with understanding more than the law. It requires understanding the client, the realities they face, and the environment in which their decisions are made.",
  "At Sattar&Co., we bring together legal expertise, commercial perspective and sound judgment to address matters that demand precision and discretion. Our role is to understand what is at stake, anticipate what lies ahead, and help our clients move forward with confidence.",
  "We have built the firm on a simple principle: excellence is measured not only by the quality of our work, but by the trust we earn through it.",
];

const SLIDER_IMAGES = [
  { src: officeImg, label: "Sattar&Co. — Office" },
  { src: meetingRoomImg, label: "Sattar&Co. — Meeting Room" },
  { src: teamImg, label: "Sattar&Co. — Team" },
];

const APPROACH_ITEMS = [
  {
    title: "Collaborative by design",
    body: "Matters are led by senior counsel from first instruction through to resolution, working closely with in-house teams and foreign counsel alike.",
  },
  {
    title: "Practical, not theoretical",
    body: "Advice is built for how business actually operates in Bangladesh — grounded in the regulatory reality, not abstract legal principle alone.",
  },
  {
    title: "Commercially focused",
    body: "Clear advice focused on your objectives, risks and commercial priorities.",
  },
];

/* -------------------------------------------------------------------------- */
/*  SEO                                                                       */
/* -------------------------------------------------------------------------- */

/** Meta descriptions over ~160 chars get cut off in Google results. */
function truncate(text: string, max = 160) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

const PAGE_TITLE = "The Firm";
const PAGE_DESCRIPTION = truncate(firm.introBody);

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    type: "website",
    images: [{ url: heroImg.src, width: heroImg.width, height: heroImg.height, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  about: {
    "@type": "LegalService",
    name: SITE_NAME,
    employee: {
      "@type": "Person",
      honorificPrefix: FOUNDER.prefix,
      name: FOUNDER.name,
      jobTitle: FOUNDER.title,
    },
  },
};

// Escape "<" so the JSON can never break out of the <script> tag.
const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

/* -------------------------------------------------------------------------- */
/*  Shared layout                                                             */
/* -------------------------------------------------------------------------- */

const CONTAINER = "mx-auto max-w-content px-6 md:px-10";
const SECTION_Y = "py-14 sm:py-20 lg:py-24";

/* -------------------------------------------------------------------------- */
/*  Sections                                                                  */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="grain relative flex items-center justify-center overflow-hidden bg-navy pb-16 pt-32 sm:pb-24 md:pb-32 md:pt-36 2xl:pb-40 2xl:pt-44">
      <Image
        src={heroImg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className={`${CONTAINER} relative z-10 text-center`}>
        <RevealText as="h1" immediate className="font-display text-display-lg text-white">
          Trusted Excellence
        </RevealText>
      </div>
    </section>
  );
}

function FounderMessage() {
  return (
    <section
      aria-labelledby="about-heading"
      className="bg-white py-14 sm:py-20 lg:py-28 2xl:py-32"
    >
      <div className={CONTAINER}>
        <h2 id="about-heading" className="sr-only">
          About {SITE_NAME}
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="md:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden md:sticky md:top-28 md:max-h-[calc(100svh-9rem)] md:max-w-none lg:top-32 lg:max-h-[calc(100svh-10rem)]">
              <Image
                src={founderImg}
                alt={`Portrait of ${FOUNDER.prefix} ${FOUNDER.name}, ${FOUNDER.title} at ${SITE_NAME}`}
                fill
                sizes="(min-width: 768px) 40vw, (min-width: 640px) 448px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Message */}
          <figure className="flex flex-col gap-5 md:col-span-7 md:gap-6 lg:col-span-6 lg:col-start-7">
            <FaQuoteLeft
              aria-hidden="true"
              className="h-8 w-8 text-red-600/80 md:h-11 md:w-11 xl:-ml-12"
            />

            <blockquote className="flex flex-col gap-5 text-base leading-relaxed text-charcoal/70 sm:text-lg md:gap-6 lg:text-xl xl:text-2xl">
              {FOUNDER_MESSAGE.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </blockquote>

            <figcaption className="eyebrow mt-2 text-red-600 !text-base sm:!text-lg md:mt-4">
              {FOUNDER.prefix} {FOUNDER.name} — {FOUNDER.title}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section aria-labelledby="stats-heading" className="grain bg-charcoal py-14 sm:py-20 lg:py-28">
      <div className={CONTAINER}>
        <h2 id="stats-heading" className="sr-only">
          {SITE_NAME} in numbers
        </h2>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 md:gap-x-8">
          {firm.stats.map((stat) => (
            <div
              key={stat.label}
              // flex-col-reverse: number shows above the label, label stays first in the HTML.
              // last:odd:col-span-2 stops a lonely orphan card on 2-column mobile.
              className="flex flex-col-reverse items-center border-t border-white pt-6 text-center last:odd:col-span-2 md:last:odd:col-span-1"
            >
              <dt className="text-sm uppercase tracking-wide text-white sm:text-base md:text-lg lg:text-xl">
                {stat.label}
              </dt>
              <dd>
                {/* Counter animates from 0, so give crawlers / screen readers the final value. */}
                <span aria-hidden="true">
                  <StatCounter value={stat.value} />
                </span>
                <span className="sr-only">{stat.value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function LifeAtTheFirm() {
  return (
    <section aria-labelledby="life-heading" className={`bg-white ${SECTION_Y}`}>
      <div className={CONTAINER}>
        <SectionLabel label="Life At The Firm" className="mb-8" />
        <h2 id="life-heading" className="sr-only">
          Life at {SITE_NAME}
        </h2>
        <ImageSlider images={SLIDER_IMAGES} />
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section aria-labelledby="approach-heading" className="bg-white pb-14 sm:pb-20 lg:pb-24">
      <div className={CONTAINER}>
        <SectionLabel label="Approach" className="mb-8" />
        <h2 id="approach-heading" className="sr-only">
          Our approach
        </h2>

        <ul className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {APPROACH_ITEMS.map((item) => (
            <li key={item.title} className="border-t border-charcoal/15 pt-6">
              <h3 className="mb-4 font-display text-3xl text-charcoal [text-wrap:balance] sm:text-4xl md:mb-6 xl:text-5xl">
                {item.title}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-charcoal/90 sm:text-lg xl:text-xl">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function FirmPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />

      <Hero />
      <FounderMessage />
      <Stats />
      <TestimonialSpotlight />
      <RecognitionMarquee />
      <LifeAtTheFirm />
      <Approach />
    </>
  );
}