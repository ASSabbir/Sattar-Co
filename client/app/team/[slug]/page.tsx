import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

const team = teamData as unknown as TeamMember[];

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return team
    .filter((member) => member.group !== "Administration & Accounts")
    .map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) return {};
  return {
    title: `${member.name} — Sattar&Co.`,
    description: Array.isArray(member.bio) ? member.bio[0] : member.bio,
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member || member.group === "Administration & Accounts") notFound();

  // Normalize bio to array of paragraphs
  const bioParagraphs: string[] = Array.isArray(member.bio)
    ? member.bio
    : typeof member.bio === "string"
    ? member.bio.split("\n\n")
    : [];

  const memberIndex = team.findIndex((m) => m.slug === member.slug);
  const watermarkNumber = String(memberIndex + 1).padStart(2, "0");

 // REPLACE WITH
  return (
    <main className="relative bg-[#F4F1E8] text-[#1A1A1A] pt-28 pb-6 md:pt-36 md:pb-8 px-4 sm:px-8 lg:px-12 font-sans select-none overflow-hidden lg:h-screen lg:fixed lg:inset-0">
      {/* Editorial Vertical Label on Right */}
      <div className="hidden xl:block fixed right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A]/40 font-medium pointer-events-none z-20">
        COUNSEL • STRATEGY • REPRESENTATION
      </div>

      <div className="max-w-[1380px] mx-auto h-full flex flex-col lg:h-full">

        {/* 3-Column Editorial Layout */}
        <div data-lenis-prevent className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative flex-1 min-h-0 overflow-y-auto lg:overflow-visible no-scrollbar">

          {/* COLUMN 1: Portrait Card with Info Overlay (fixed like head-of-firm image) */}
          <div className="lg:col-span-5 relative lg:h-full lg:sticky lg:top-0">
            {/* Background Watermark 01 */}
            <span className="absolute -left-16 -bottom-16 md:-left-24 md:-bottom-24 font-serif text-[180px] md:text-[240px] text-[#1A1A1A]/[0.06] leading-none pointer-events-none -z-0">
              {watermarkNumber}
            </span>

            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full w-full bg-[#1A1A1A]/10 overflow-hidden border border-[#1A1A1A]/10 z-10">
              <Image
                src={member.image || "/images/choyon.jpg"}
                alt={member.name}
                fill
                className="object-cover object-top"
                priority
              />

              {/* Text Overlay on Left Side of Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-end text-white">
                <h1 className="font-serif text-2xl md:text-3xl font-normal leading-tight mb-4">
                  {member.name}
                </h1>
              </div>
            </div>
          </div>

          {/* COLUMNS 2+3: only this side scrolls, includes Key Matters below the profile */}
          <TeamMemberScroller>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-10">

              {/* COLUMN 2: Full Biography */}
              <div className="md:col-span-7">
                <BioSection name={member.name} paragraphs={bioParagraphs} />
              </div>

              {/* COLUMN 3: Qualification, Education & Action */}
              <div className="md:col-span-5 space-y-8">
                <div>
                  <div className="flex items-start gap-2 text-[#C92B2B] font-semibold text-xs uppercase tracking-widest border-b border-[#1A1A1A]/15 pb-3 mb-6 min-h-[52px] md:min-h-[56px]">
                    <span>ˆ</span> <span className="leading-snug">PROFESSIONAL QUALIFICATION & EDUCATION</span>
                  </div>

                  {/* Timeline Items */}
                  <div className="space-y-5 text-xs text-[#1A1A1A]">
                    {member.education && member.education.length > 0 ? (
                      member.education.map((edu, idx) => (
                        <div key={`${edu.date}-${idx}`}>
                          <p className="font-bold text-sm text-[#1A1A1A] font-sans mb-0.5">
                            {edu.date}
                          </p>
                          {edu.institution ? (
                            <>
                              <p className="text-[#1A1A1A]/90 font-medium">
                                {edu.institution}
                              </p>
                              {edu.course && (
                                <p className="text-[#1A1A1A]/70 font-light">
                                  Course: {edu.course}
                                </p>
                              )}
                            </>
                          ) : (
                            edu.description && (
                              <p className="text-[#1A1A1A]/80 font-light leading-snug text-justify">
                                {edu.description}
                              </p>
                            )
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-[#1A1A1A]/50 font-light italic">
                        No education details available.
                      </p>
                    )}
                  </div>
                </div>

                {member.slug === "sameer-sattar" && member.email && (
                  <div>
                    <div className="flex items-center gap-2 text-[#C92B2B] font-semibold text-xs uppercase tracking-widest border-b border-[#1A1A1A]/15 pb-3 mb-6">
                      <span>ˆ</span> CONTACT
                    </div>
                    <a
                      href={`mailto:${encodeURIComponent(member.email)}`}
                      className="text-xs text-[#1A1A1A]/80 font-light break-all hover:text-[#C92B2B] transition-colors"
                    >
                      {member.email}
                    </a>
                  </div>
                )}
              </div>

            </div>

            {member.slug === "sameer-sattar" && (
              <div className="pb-10">
                <KeyMattersSection />
              </div>
            )}
          </TeamMemberScroller>

        </div>
      </div>
    </main>
  );
}