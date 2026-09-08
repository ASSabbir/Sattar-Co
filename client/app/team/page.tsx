

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowDown } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import team from "@/data/team.json";

interface TeamMember {
  slug: string;
  name: string;
  role?: string;
  image?: string;
  group?: string;
  practiceAreas?: string[];
}

const GROUP_ORDER = ["Consultants", "Associates", "Administration & Accounts"];
const ROW_SIZE = 3;

interface RosterRow {
  groupName: string;
  members: TeamMember[];
}

export default function TeamPage() {
  const leader = (team as TeamMember[])[0];
  const remainingMembers = (team as TeamMember[]).slice(1);

  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const rosterRows: RosterRow[] = [];
  GROUP_ORDER.forEach((groupName) => {
    const groupMembers = remainingMembers.filter((m) => m.group === groupName);
    for (let i = 0; i < groupMembers.length; i += ROW_SIZE) {
      rosterRows.push({
        groupName,
        members: groupMembers.slice(i, i + ROW_SIZE),
      });
    }
  });

  const activeGroupName = rosterRows[activeIndex]?.groupName ?? GROUP_ORDER[0];
  const isLastRow = activeIndex >= rosterRows.length - 1;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!rosterRows.length) return;

    const section = sectionRef.current;
    const viewport = scrollerRef.current;
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !viewport || !track || !wrapper) return;

    const mm = gsap.matchMedia();

    // Desktop: CSS `position: sticky` holds the section (no GSAP pin-spacer, so
    // React never loses ownership of the DOM node on route change). Page scroll —
    // Lenis-smoothed like every other section — scrubs the roster track.
    mm.add("(min-width: 1024px)", () => {
      const offsets: number[] = [];

      const distance = () =>
        Math.max(0, track.scrollHeight - viewport.clientHeight);

      const measure = () => {
        wrapper.style.height = `${window.innerHeight + distance()}px`;
        const base = track.getBoundingClientRect().top;
        offsets.length = 0;
        itemRefs.current.forEach((el) => {
          offsets.push(el ? el.getBoundingClientRect().top - base : 0);
        });
      };

      const anim = gsap.to(track, { y: () => -distance(), ease: "none" });

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        animation: anim,
        onRefresh: measure,
        onUpdate: (self) => {
          const focus = distance() * self.progress + viewport.clientHeight * 0.45;
          let idx = 0;
          for (let i = 0; i < offsets.length; i++) {
            if (offsets[i] <= focus) idx = i;
          }
          setActiveIndex((prev) => (prev === idx ? prev : idx));
        },
      });

      measure();
      ScrollTrigger.refresh();

      return () => {
        st.kill();
        anim.kill();
        gsap.set(track, { clearProps: "transform" });
        wrapper.style.height = "";
      };
    });

    // Mobile / tablet: normal document flow, highlight rows as they pass.
    mm.add("(max-width: 1023px)", () => {
      const triggers: ScrollTrigger[] = [];
      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 60%",
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          })
        );
      });
      return () => triggers.forEach((t) => t.kill());
    });

    return () => mm.revert();
  }, [rosterRows.length]);



  const handleRosterClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div ref={wrapperRef} className="relative">
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-[#F4F1E8] text-[#1A1A1A] pt-36 pb-24 md:pt-17 md:pb-10 px-6 md:px-12 lg:px-20 overflow-hidden font-sans lg:sticky lg:top-0 lg:h-screen lg:max-h-screen lg:overflow-hidden"
    >
      <div className="hidden xl:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[10px] tracking-[0.3em] uppercase text-charcoal/40 font-medium pointer-events-none select-none">
        COUNSEL • STRATEGY • REPRESENTATION
      </div>

      <div className="max-w-[1280px] mx-auto lg:h-full lg:flex lg:flex-col">
        <div className="mb-12 md:mb-16 lg:flex-shrink-0">
          <SectionLabel label="THE PEOPLE" className="mb-4 text-[#C92B2B]" />
          <h1 className="font-display text-3xl md:text-4xl text-charcoal font-normal tracking-tight">
            Leadership with Perspective.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative lg:flex-1 lg:min-h-0">
          <span className="absolute -left-8 top-10 font-display text-[180px] md:text-[260px] text-charcoal/[0.04] leading-none select-none pointer-events-none -z-0">
            01
          </span>

          {/* Left Column: Leader Portrait (fully fixed on desktop) */}
          <div className="lg:col-span-5 relative z-10 lg:h-full">
            <div className="relative aspect-[3/5] w-full lg:h-full lg:aspect-auto  overflow-hidden">
              <Image
                src={leader?.image || "/Sameer-Sattar-2.jpg"}
                alt={leader?.name || "Head of Firm"}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 z-10 lg:h-full lg:flex lg:flex-col lg:min-h-0">

            {/* TOP FIXED BLOCK (never scrolls) */}
            <div className="lg:flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-8 border-b border-charcoal/15">
                <div className="md:col-span-7 border-l-2 border-[#C92B2B] pl-4">
                  <span className="eyebrow text-red-600 block mb-3">
                    HEAD OF FIRM
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl text-charcoal font-normal uppercase tracking-wide">
                    {leader?.name || "SAMEER SATTAR"}
                  </h2>
                  <p className="text-charcoal text-xl leading-relaxed mb-4">
                    {/* {leader?.role || "Founder & Head of Firm"} */}
                  </p>
                  {/* <p className="font-serif italic text-2xl text-charcoal/80 tracking-wider select-none">
                    Sameer Sattar
                  </p> */}
                </div>

                <div className="md:col-span-5 text-charcoal text-xl leading-relaxed space-y-2 pt-1">
                  {leader?.practiceAreas?.slice(0, 4).map((area) => (
                    <p key={area}>{area}</p>
                  )) || (
                    <>
                      <p>Corporate & Commercial Law</p>
                      <p>Dispute Resolution</p>
                      <p>Banking & Finance</p>
                    </>
                  )}

                  <div className="pt-6">
                    <Link
                      href={`/team/${leader?.slug ?? ""}`}
                      className="eyebrow inline-flex items-center text-charcoal hover:text-red-600 transition-colors gap-2"
                    >
                      VIEW FULL PROFILE <span className="text-sm">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky current-group label */}
            <div className="lg:flex-shrink-0 pt-6">
              <span className="eyebrow text-red-600 block">
                {activeGroupName}
              </span>
            </div>

            {/* BOTTOM: only this scrolls (internal scroll container) */}
            <div
              ref={scrollerRef}
              className="pt-4 lg:flex-1 lg:min-h-0 lg:overflow-hidden no-scrollbar"
            >
              <div ref={trackRef} className="lg:will-change-transform">
              {rosterRows.map((row, rowIndex) => {
                const isRowActive = activeIndex === rowIndex;
                const isFirstOfGroup =
                  rowIndex === 0 || rosterRows[rowIndex - 1].groupName !== row.groupName;

                return (
                  <div
                    key={`row-${rowIndex}`}
                    ref={(el) => {
                      itemRefs.current[rowIndex] = el;
                    }}
                    className={[
                      "min-h-[38vh] lg:min-h-[45vh] flex flex-col justify-center border-b border-charcoal/15 last:border-b-0",
                      isFirstOfGroup ? "pt-2" : "",
                    ].join(" ")}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 w-full">
                      {row.members.map((member) => {
                        const isViewable = member.group !== "Administration & Accounts";
                        const Wrapper = (isViewable ? Link : "div") as React.ElementType;
                        const wrapperProps = isViewable
                          ? {
                              href: `/team/${member.slug}`,
                              onClick: () => handleRosterClick(rowIndex),
                              onMouseEnter: () => handleRosterClick(rowIndex),
                            }
                          : {
                              onMouseEnter: () => handleRosterClick(rowIndex),
                            };
                        return (
                        <Wrapper
                          key={member.slug}
                          {...(wrapperProps as Record<string, unknown>)}
                          className={[
                            "group flex flex-col items-start gap-3",
                            isViewable ? "cursor-pointer" : "cursor-default",
                          ].join(" ")}
                        >
                          <div className="relative w-full aspect-[4/5] bg-charcoal/10 overflow-hidden">
                            <Image
                              src={member.image || "/team/placeholder.jpg"}
                              alt={member.name}
                              fill
                              className={[
                                "object-cover object-top transition-all duration-500",
                                isRowActive
                                  ? "grayscale-0"
                                  : "grayscale group-hover:grayscale-0",
                              ].join(" ")}
                            />
                          </div>
                          <div>
                            <span
                              className={[
                                "block uppercase tracking-wider transition-colors duration-300 text-sm md:text-base",
                                isRowActive
                                  ? "text-charcoal font-medium"
                                  : "text-charcoal/50 font-medium group-hover:text-charcoal",
                              ].join(" ")}
                            >
                              {member.name}
                            </span>
                            <span
                              className={[
                                "block text-xs uppercase tracking-wider transition-colors duration-300",
                                isRowActive ? "text-charcoal/70" : "text-charcoal/35",
                              ].join(" ")}
                            >
                              {member.role}
                            </span>
                          </div>
                        </Wrapper>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll cue — matches Hero */}
      <div
        className={[
          "absolute bottom-8 right-6 md:right-10 z-20 hidden sm:flex flex-col items-center gap-3 text-charcoal/50 transition-opacity duration-500",
          isLastRow ? "opacity-0 pointer-events-none" : "opacity-100",
        ].join(" ")}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
          Scroll
        </span>
        <ArrowDown size={16} strokeWidth={1.5} className="animate-bounce" />
      </div>
    </section>
    </div>
  );
}