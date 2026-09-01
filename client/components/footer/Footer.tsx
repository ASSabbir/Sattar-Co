import Link from "next/link";
import firm from "@/data/firm.json";

const FOOTER_LINKS = [
  {
    heading: "Firm",
    links: [
      { href: "/firm", label: "The Firm" },
      { href: "/practice-areas", label: "Practice Areas" },
      { href: "/team", label: "Team" },
    ],
  },
  {
    heading: "Read",
    links: [
      { href: "/insights", label: "Insights" },
      { href: "/publications", label: "News & Events" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { href: "/contact", label: "Start a cConversation" },
      { href: "/disclaimer", label: "Legal Disclaimer" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="grain bg-navy py-10 text-ivory">
      <div className="max-w-content mx-auto px-6 md:px-10 ">
        {/* <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 lg:gap-8 pb-16 border-b border-ivory/10">
          <div>
            <p className="font-display text-3xl mb-4">
              Sattar<span className="text-red-600">&amp;</span>Co.
            </p>
            <p className="text-ivory/55 text-sm leading-relaxed max-w-xs">
              {firm.heroStatement}
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <p className="eyebrow text-ivory/40 mb-5">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-ivory/80 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4  text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} Sattar&amp;Co. All rights reserved.</p>
          <p>{firm.location} · {firm.phone} · {firm.email}</p>
        </div>
      </div>
    </footer>
  );
}
