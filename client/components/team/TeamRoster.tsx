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

const buildRows = (members: TeamMember[]): RosterRow[] => {
  const rows: RosterRow[] = [];
  GROUP_ORDER.forEach((groupName) => {
    const groupMembers = members.filter((m) => m.group === groupName);
    for (let i = 0; i < groupMembers.length; i += ROW_SIZE) {
      rows.push({ groupName, members: groupMembers.slice(i, i + ROW_SIZE) });
    }
  });
  return rows;
};

export default function TeamRoster() {
  const allMembers = team as TeamMember[];
  const leader = allMembers[0];
  const rosterRows = buildRows(allMembers.slice(1));

  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const activeGroupName = rosterRows[activeIndex]?.groupName ?? GROUP_ORDER[0];
  const isLastRow = activeIndex >= rosterRows.length - 1;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!rosterRows.length) return;

    const viewport = scrollerRef.current;
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!viewport || !track || !wrapper) return;

    const mm = gsap.matchMedia();

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

      let raf = 0;
      const sync = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          measure();
          ScrollTrigger.refresh();
        });
      };

      const ro = new ResizeObserver(sync);
      ro.observe(track);
      window.addEventListener("resize", sync);

      measure();
      ScrollTrigger.refresh();

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("resize", sync);
        st.kill();
        anim.kill();
        gsap.set(track, { clearProps: "transform" });
        wrapper.style.height = "";
      };
    });

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

  const handleRosterFocus = (index: number) => setActiveIndex(index);

  return (
    <div ref={wrapperRef} className="relative mt-28">
      <section
        ref={sectionRef as React.RefObject<HTMLElement>}
        aria-label="Our team"
        className="mt-20 relative bg-white text-charcoal pt-36 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans md:pt-[clamp(1.5rem,5svh,5rem)] md:pb-[clamp(1rem,3svh,2.5rem)] lg:sticky lg:top-0 lg:h-[100svh] lg:max-h-[100svh]"
      >
        {/* <div className="eyebrow hidden xl:block absolute right-6 top-2/3 -translate-y-1/2 rotate-90 origin-right text-charcoal/40 pointer-events-none select-none">
          COUNSEL • STRATEGY • REPRESENTATION
        </div> */}

        <div className="max-w-[1280px] mx-auto lg:h-full lg:flex lg:flex-col">
          <div className="mb-10 md:mb-[clamp(1.25rem,4svh,1rem)] lg:flex-shrink-0">
            <SectionLabel label="THE PEOPLE" className="mb-[clamp(0.5rem,1.2svh,1rem)] text-red-600" />
            <h1 className="font-display  text-3xl text-[clamp(1.5rem,3.2svh,2.25rem)] text-charcoal font-normal tracking-tight leading-[1.15]">
              Leadership with Perspective.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[clamp(1.5rem,3vw,3.5rem)] relative lg:flex-1 lg:min-h-0">
            <span
              aria-hidden
              className="absolute -left-8 top-10 font-display text-[180px] md:text-[260px] text-charcoal/[0.04] leading-none select-none pointer-events-none -z-0"
            >
              01
            </span>

            <div className="lg:col-span-5 relative z-10 lg:h-full">
              <div className="relative aspect-[3/5] w-full lg:h-full lg:aspect-auto overflow-hidden">
                <Image
                  src={leader?.image || "/Sameer-Sattar-2.jpg"}
                  alt={`Portrait of ${leader?.name || "Sameer Sattar"}, Head of Firm`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-7 z-10 lg:h-full lg:flex lg:flex-col lg:min-h-0">
              <div className="lg:flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-8 md:pb-[clamp(1rem,3svh,2rem)] border-b border-charcoal/15">
                  <div className="md:col-span-7 border-l-2 border-red-600 pl-4">
                    <span className="eyebrow !tracking-[3px] !text-[16px] text-red-600 block mb-[clamp(0.35rem,1svh,0.75rem)]">
                      HEAD OF FIRM
                    </span>
                    <h2 className="font-display text-3xl md:text-[clamp(1.5rem,3.2svh,2.25rem)] text-charcoal font-normal uppercase tracking-wide leading-[1.15]">
                      {leader?.name || "SAMEER SATTAR"}
                    </h2>
                  </div>

                  <div className="md:col-span-5 text-charcoal text-xl md:text-[clamp(0.95rem,2svh,1.25rem)] leading-relaxed space-y-2 md:space-y-[clamp(0.15rem,0.7svh,0.5rem)] pt-1">
                    {leader?.practiceAreas?.slice(0, 4).map((area) => (
                      <p key={area}>{area}</p>
                    )) || (
                      <>
                        <p>Corporate &amp; Commercial Law</p>
                        <p>Dispute Resolution</p>
                        <p>Banking &amp; Finance</p>
                      </>
                    )}

                    <div className="pt-6 md:pt-[clamp(0.75rem,2.5svh,1.5rem)]">
                      <Link
                        href={`/team/${leader?.slug ?? ""}`}
                        className="eyebrow inline-flex items-center text-charcoal hover:text-red-600 transition-colors gap-2"
                      >
                        VIEW FULL PROFILE <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:flex-shrink-0 pt-6 pb-2  lg:pt-[clamp(0.75rem,2.5svh,1.5rem)]">
                <span className="eyebrow !text-sm text-red-600 block">{activeGroupName}</span>
              </div>

              <div
                ref={scrollerRef}
                className="pt-4 lg:pt-[clamp(0.5rem,1.5svh,1rem)]  lg:flex-1 lg:min-h-0 lg:overflow-hidden no-scrollbar"
              >
                <div ref={trackRef} className="lg:will-change-transform ">
                  {rosterRows.map((row, rowIndex) => {
                    const isRowActive = activeIndex === rowIndex;
                    const isFirstOfGroup =
                      rowIndex === 0 ||
                      rosterRows[rowIndex - 1].groupName !== row.groupName;

                    return (
                      <div
                        key={`row-${row.groupName}-${rowIndex}`}
                        ref={(el) => {
                          itemRefs.current[rowIndex] = el;
                        }}
                        className={[
                          "min-h-[38vh] lg:min-h-[clamp(220px,40svh,440px)] flex flex-col justify-center border-b border-charcoal/15 last:border-b-0 py-[clamp(0.75rem,2svh,1.5rem)]",
                          isFirstOfGroup ? "pt-2" : "",
                        ].join(" ")}
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-[clamp(1rem,2vw,2rem)] w-full">
                          {row.members.map((member) => {
                            const isViewable =
                              member.group !== "Administration & Accounts";
                            const Wrapper = (isViewable
                              ? Link
                              : "div") as React.ElementType;
                            const wrapperProps = isViewable
                              ? {
                                  href: `/team/${member.slug}`,
                                  onClick: () => handleRosterFocus(rowIndex),
                                  onMouseEnter: () => handleRosterFocus(rowIndex),
                                  onFocus: () => handleRosterFocus(rowIndex),
                                }
                              : {
                                  onMouseEnter: () => handleRosterFocus(rowIndex),
                                };

                            return (
                              <Wrapper
                                key={member.slug}
                                {...(wrapperProps as Record<string, unknown>)}
                                className={[
                                  "group flex flex-col items-start gap-3 lg:gap-[clamp(0.35rem,1.2svh,0.75rem)]",
                                  isViewable ? "cursor-pointer" : "cursor-default",
                                ].join(" ")}
                              >
                                <div className="relative w-full aspect-[4/5] lg:max-h-[clamp(120px,24svh,260px)] bg-charcoal/10 overflow-hidden">
                                  <Image
                                    src={member.image || "/team/placeholder.jpg"}
                                    alt={`Portrait of ${member.name}${
                                      member.role ? `, ${member.role}` : ""
                                    }`}
                                    fill
                                    sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 18vw"
                                    className={[
                                      "object-cover object-top transition-all duration-500",
                                      
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
                                      isRowActive
                                        ? "text-charcoal/70"
                                        : "text-charcoal/35",
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

        <div
          aria-hidden
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