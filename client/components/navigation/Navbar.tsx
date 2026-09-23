"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { onHeroIntroComplete } from "@/lib/heroEvents";
import wlogo from '../../public/wlogo.png'
import blogo from '../../public/blogo.png'
import TopBar from "../layout/TopBar";


const NAV_LINKS = [
  { href: "/team", label: "People" },
  { href: "/practice-areas", label: "Expertise" },
  { href: "/firm", label: "The Firm" },
  { href: "/insights", label: "Work Done" },
  { href: "/publications", label: "Publications" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: " Contact Us" },
];

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useLayoutEffect(() => {
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 0, y: -16 });
    }
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isHome) {
      gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: prefersReducedMotion ? 0.01 : 0.5,
        ease: "power3.out",
      });
      return;
    }

    return onHeroIntroComplete(() => {
      gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: "power3.out",
      });
    });
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = scrolled || !isHome || menuOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ease-editorial",
          solid ? "bg-white backdrop-blur-sm border-b border-charcoal/10" : "bg-transparent"
        )}
      >
        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-500 ease-editorial",
            scrolled || menuOpen ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          )}
        >
          <TopBar />
        </div>

        <nav className="max-w-content font-bold mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 h-16 sm:h-[4.75rem] lg:h-19 py-3 sm:py-4">
          <Link
            href="/"
            className={cn(
              "font-display text-lg md:text-xl tracking-wide shrink-0 transition-colors duration-500",
              solid ? "text-black" : "text-black "
            )}
          >
            {/* {solid?<img src={blogo.src} alt="" className="w-24 sm:w-28 lg:w-30" /> : <img src={wlogo.src} alt="" className="w-24 sm:w-28 lg:w-32 opacity-0" />} */}
            <img src={blogo.src} alt="" className="w-24 sm:w-28 lg:w-36 mb-1" /> 
          </Link>

          <ul
            className={cn(
              "hidden lg:flex items-center pr-5 gap-6 xl:gap-10 text-base xl:text-lg uppercase tracking-wide transition-colors duration-500",
              solid ? "text-charcoal/80" : "text-charcoal/85"
            )}
          >
            {NAV_LINKS.map((link) => {
              const isActive = normalizePath(pathname) === normalizePath(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn("link-underline", isActive && "text-red-600")}
                  >
                    {link.label && link.label=="Careers" ? <span className="text-[19px] ">Careers</span> : link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "lg:hidden p-2 -mr-2 shrink-0 transition-colors duration-500",
              solid ? "text-charcoal" : "text-charcoal"
            )}
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-ivory lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col justify-center min-h-full px-6 sm:px-8 py-24">
              <ul className="flex flex-col gap-5 sm:gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="font-display text-3xl sm:text-4xl text-charcoal hover:text-red-600 transition-colors duration-300"
                    >
                      {link.label=="Contact Us"&&<span className="text-[30px]">Contact Us</span>}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}