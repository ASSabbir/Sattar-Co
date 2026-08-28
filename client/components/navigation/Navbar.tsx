"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { onLoaderComplete } from "@/lib/loaderEvents";

const NAV_LINKS = [
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/firm", label: "The Firm" },
  { href: "/team", label: "Team" },
  { href: "/insights", label: "Insights" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  // Hide the navbar the instant it mounts — before the loader even starts
  // its slide — so there's nothing to "suddenly" reveal underneath it.
  useLayoutEffect(() => {
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 0, y: -16 });
    }
  }, []);

  // Fade it in only once the loader has finished.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    return onLoaderComplete(() => {
      gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: "power3.out",
      });
    });
  }, []);

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
          solid ? "bg-ivory/95 backdrop-blur-sm border-b border-charcoal/10" : "bg-transparent"
        )}
      >
        <nav className="max-w-content mx-auto flex items-center justify-between px-6 md:px-10 h-20 md:h-24">
          <Link
            href="/"
            className={cn(
              "font-display text-lg md:text-xl tracking-wide transition-colors duration-500",
              solid ? "text-charcoal" : "text-ivory"
            )}
          >
            Sattar<span className="text-red-600">&amp;Co.</span>
          </Link>

          <ul
            className={cn(
              "hidden lg:flex items-center gap-9 text-sm uppercase tracking-wide transition-colors duration-500",
              solid ? "text-charcoal/80" : "text-ivory/85"
            )}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "lg:hidden p-2 -mr-2 transition-colors duration-500",
              solid ? "text-charcoal" : "text-ivory"
            )}
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>

          <Link
            href="/contact"
            className={cn(
              "hidden lg:inline-block link-underline text-sm uppercase tracking-wide transition-colors duration-500",
              solid ? "text-charcoal" : "text-ivory"
            )}
          >
            Enquire
          </Link>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-ivory lg:hidden"
          >
            <div className="flex flex-col justify-center h-full px-8">
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="font-display text-4xl text-charcoal hover:text-red-600 transition-colors duration-300"
                    >
                      {link.label}
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