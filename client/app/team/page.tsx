

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
  const sectionRef = useRef<HTMLElement | null>(null);

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
    if (window.innerWidth < 1024) return;
    if (!rosterRows.length) return;
    if (!scrollerRef.current) return;

    const triggers: ScrollTrigger[] = [];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const trigger = ScrollTrigger.create({
        trigger: el,
        scroller: scrollerRef.current,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [rosterRows.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    const scroller = scrollerRef.current;
    if (!scroller) return;

    let targetScrollTop = scroller.scrollTop;
    let tween: gsap.core.Tween | null = null;

    const handleWheel = (e: WheelEvent) => {
      const { scrollHeight, clientHeight } = scroller;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) return;

      targetScrollTop = gsap.utils.clamp(
        0,
        maxScroll,
        targetScrollTop + e.deltaY
      );

      e.preventDefault();
      e.stopPropagation();

      tween?.kill();
      tween = gsap.to(scroller, {
        scrollTop: targetScrollTop,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      scroller.removeEventListener("wheel", handleWheel);
      tween?.kill();
    };
  }, []);



  const handleRosterClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-[#F4F1E8] text-[#1A1A1A] pt-36 pb-24 md:pt-17 md:pb-10 px-6 md:px-12 lg:px-20 overflow-hidden font-sans lg:h-screen lg:fixed lg:inset-0 lg:overflow-hidden"
    >
      <div className="hidden xl:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[10px] tracking-[0.3em] uppercase text-charcoal/40 font-medium pointer-events-none select-none">
        COUNSEL • STRATEGY • REPRESENTATION
      </div>

      <div className="max-w-[1280px] mx-auto lg:h-full lg:flex lg:flex-col">
        <div className="mb-12 md:mb-16 lg:flex-shrink-0">
          <SectionLabel label="THE PEOPLE" className="mb-4 text-[#C92B2B]" />
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-normal tracking-tight">
            Leadership with Perspective.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative lg:flex-1 lg:min-h-0">
          <span className="absolute -left-8 top-10 font-serif text-[180px] md:text-[260px] text-charcoal/[0.04] leading-none select-none pointer-events-none -z-0">
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
                  <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/50 block mb-1 font-semibold">
                    HEAD OF FIRM
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-normal uppercase tracking-wide">
                    {leader?.name || "SAMEER SATTAR"}
                  </h2>
                  <p className="text-sm text-charcoal/70 mb-4 font-light">
                    {/* {leader?.role || "Founder & Head of Firm"} */}
                  </p>
                  {/* <p className="font-serif italic text-2xl text-charcoal/80 tracking-wider select-none">
                    Sameer Sattar
                  </p> */}
                </div>

                <div className="md:col-span-5 text-sm text-charcoal/80 space-y-1 font-light pt-1">
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
                      className="inline-flex items-center text-xs uppercase tracking-widest text-charcoal font-medium hover:text-[#C92B2B] transition-colors gap-2"
                    >
                      VIEW FULL PROFILE <span className="text-sm">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky current-group label */}
            <div className="lg:flex-shrink-0 pt-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C92B2B] font-semibold block">
                {activeGroupName}
              </span>
            </div>

            {/* BOTTOM: only this scrolls (internal scroll container) */}
            <div
              ref={scrollerRef}
              data-lenis-prevent
              className="pt-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain will-change-scroll no-scrollbar"
            >
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
  );
}