"use client";

import Link from "next/link";

const SOCIAL_LINKS = [
  { href: "https://facebook.com/sattarandco", label: "Facebook" },
  { href: "https://linkedin.com/company/sattarandco", label: "LinkedIn" },
  { href: "https://instagram.com/sattarandco", label: "Instagram" },
];

export default function TopBar() {
  return (
    <div className="w-full bg-white border-b border-charcoal/10">
      <div className="max-w-content mx-auto px-6 md:px-10 h-11 flex items-center justify-between text-sm
       text-charcoal/80">
        <div className="flex items-center gap-5">
          <a
            href="tel:+880288366629"
            className="hover:text-red-600 transition-colors duration-300"
          >
            +88 (02) 883 6629
          </a>
          <span className="w-px h-3.5 bg-charcoal/" />
          <a
            href="mailto:info@sattarandco.com"
            className="hover:text-red-600 transition-colors duration-300"
          >
            info@sattarandco.com
          </a>
          <span className="w-px h-3.5 bg-charcoal/ hidden sm:block" />
          {/* <Link
            href="/contact"
            className="hidden sm:inline hover:text-red-600 transition-colors duration-300"
          >
            Contact Us
          </Link> */}
        </div>

        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/60 hover:text-red-600 transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}