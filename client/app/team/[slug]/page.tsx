import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import teamData from "@/data/team.json";
import KeyMattersSection from "@/components/team/KeyMattersSection";
import BioSection from "@/components/team/BioSection";
import TeamMemberScroller from "@/components/team/TeamMemberScroller";

interface EducationEntry {
  date: string;
  description?: string;
  institution?: string;
  course?: string;
}

interface TeamMember {
  slug: string;
  name: string;
  role?: string;
  image?: string;
  group?: string;
  practiceAreas?: string[];
  bio: string | string[];
  email?: string;
  education?: EducationEntry[];
}

const SITE_URL = "https://www.sattarandco.com";
const team = teamData as unknown as TeamMember[];

interface Props {
  params: Promise<{ slug: string }>;
}

const toParagraphs = (bio: TeamMember["bio"]): string[] =>
  Array.isArray(bio) ? bio : typeof bio === "string" ? bio.split("\n\n") : [];

const clamp = (text: string, max = 160) =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

export function generateStaticParams() {
  return team
    .filter((member) => member.group !== "Administration & Accounts")
    .map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member || member.group === "Administration & Accounts") {
    return { title: "Profile Not Found", robots: { index: false, follow: false } };
  }

  const description = clamp(
    toParagraphs(member.bio)[0] ??
      `${member.name}${member.role ? `, ${member.role}` : ""} at Sattar&Co., Dhaka.`
  );
  const url = `${SITE_URL}/team/${member.slug}`;
  const image = member.image ?? "/Sameer-Sattar-2.jpg";

  return {
    title: member.name,
    description,
    keywords: [
      member.name,
      member.role ?? "Lawyer",
      "Sattar&Co.",
      "Dhaka law firm",
      ...(member.practiceAreas ?? []),
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      title: `${member.name} — Sattar&Co.`,
      description,
      url,
      siteName: "Sattar&Co.",
      images: [{ url: image, width: 1200, height: 630, alt: member.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${member.name} — Sattar&Co.`,
      description,
      images: [image],
    },
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member || member.group === "Administration & Accounts") notFound();

  const bioParagraphs = toParagraphs(member.bio);
  const memberIndex = team.findIndex((m) => m.slug === member.slug);
  const watermarkNumber = String(memberIndex + 1).padStart(2, "0");
  const isHeadOfFirm = member.slug === "sameer-sattar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    url: `${SITE_URL}/team/${member.slug}`,
    image: member.image ? `${SITE_URL}${member.image}` : undefined,
    email: member.email,
    description: clamp(bioParagraphs[0] ?? "", 300),
    knowsAbout: member.practiceAreas,
    worksFor: {
      "@type": "LegalService",
      name: "Sattar&Co.",
      url: SITE_URL,
      areaServed: "BD",
    },
    alumniOf: member.education
      ?.filter((e) => e.institution)
      .map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Wrapper owns the scroll length. Its height is set by the scroller so
          the sticky <main> stays pinned exactly as long as the right column
          has content left to reveal — then it releases. */}
      <div data-profile-wrapper className="relative">
        <main className="relative bg-white text-charcoal pt-28 pb-6 md:pt-32 md:pb-8 px-4 sm:px-8 lg:px-12 font-sans overflow-hidden lg:sticky lg:top-0 lg:h-screen">
          <div className="eyebrow hidden xl:block fixed right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right text-charcoal/40 pointer-events-none select-none z-20">
            COUNSEL • STRATEGY • REPRESENTATION
          </div>

          <div className="max-w-[1380px] mx-auto h-full flex flex-col lg:h-full">
            <nav aria-label="Breadcrumb" className="flex-shrink-0 mb-5 md:mb-6">
              <Link
                href="/team"
                className="eyebrow inline-flex items-center gap-2 text-charcoal hover:text-red-600 transition-colors"
              >
                <ArrowLeft size={14} strokeWidth={2} aria-hidden />
                Back to Team
              </Link>
            </nav>

            <div
              data-profile-grid
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-stretch relative flex-1 min-h-0 overflow-y-auto lg:overflow-hidden no-scrollbar"
            >
              <div className="lg:col-span-5 relative lg:h-full lg:sticky lg:top-0">
                <span
                  aria-hidden
                  className="absolute -left-16 -bottom-16 md:-left-24 md:-bottom-24 font-display text-[180px] md:text-[240px] text-charcoal/[0.06] leading-none pointer-events-none select-none -z-0"
                >
                  {watermarkNumber}
                </span>

                <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full w-full bg-charcoal/10 overflow-hidden border border-charcoal/10 z-10">
                  <Image
                    src={member.image || "/images/choyon.jpg"}
                    alt={`Portrait of ${member.name}${member.role ? `, ${member.role}` : ""}`}
                    fill
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    className="object-cover object-top"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-end text-white">
                    <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight mb-2">
                      {member.name}
                    </h1>
                    {member.role && (
                      <p className="eyebrow text-white/80">{member.role}</p>
                    )}
                  </div>
                </div>
              </div>

              <TeamMemberScroller>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-10">
                  <div className="md:col-span-7">
                    <BioSection name={member.name} paragraphs={bioParagraphs} />
                  </div>

                  <aside data-profile-aside className="md:col-span-5 space-y-8">
                    <section>
                      <h2 className="eyebrow flex items-start gap-2 text-red-600 border-b border-charcoal/15 pb-3 mb-6 min-h-[52px] md:min-h-[56px]">
                        <span aria-hidden>ˆ</span>
                        <span className="leading-snug">
                          PROFESSIONAL QUALIFICATION &amp; EDUCATION
                        </span>
                      </h2>

                      <div className="space-y-5 text-xl text-charcoal">
                        {member.education && member.education.length > 0 ? (
                          member.education.map((edu, idx) => (
                            <div key={`${edu.date}-${idx}`}>
                              <p className="font-display text-2xl md:text-3xl text-charcoal leading-tight mb-1">
                                {edu.date}
                              </p>
                              {edu.institution ? (
                                <>
                                  <p className="text-xl text-charcoal leading-relaxed text-justify">
                                    {edu.institution}
                                  </p>
                                  {edu.course && (
                                    <p className="text-xl text-charcoal/70 leading-relaxed text-justify">
                                      Course: {edu.course}
                                    </p>
                                  )}
                                </>
                              ) : (
                                edu.description && (
                                  <p className="text-xl text-charcoal leading-relaxed text-justify">
                                    {edu.description}
                                  </p>
                                )
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-xl text-charcoal/50 italic leading-relaxed">
                            No education details available.
                          </p>
                        )}
                      </div>
                    </section>

                    {member.email && (
                      <section>
                        <h2 className="eyebrow flex items-center gap-2 text-red-600 border-b border-charcoal/15 pb-3 mb-6">
                          <span aria-hidden>ˆ</span> CONTACT
                        </h2>
                        <a
                          href={`mailto:${encodeURIComponent(member.email)}`}
                          className="text-xl text-charcoal leading-relaxed break-all hover:text-red-600 transition-colors"
                        >
                          {member.email}
                        </a>
                      </section>
                    )}
                  </aside>
                </div>
              </TeamMemberScroller>
            </div>
          </div>
        </main>
      </div>

      {/* Head of Firm only — full-width, slides up after the sticky block releases */}
      {isHeadOfFirm && (
        <section className="relative z-10 bg-white px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1380px] mx-auto">
            <KeyMattersSection />
          </div>
        </section>
      )}
    </>
  );
}