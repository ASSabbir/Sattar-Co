"use client";

import Link from "next/link";
import { BiLogoGmail } from "react-icons/bi";
import { MdLocalPhone } from "react-icons/md";
import { RiFacebookFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";

const SOCIAL_LINKS = [
  { href: "https://facebook.com/sattarandco", label:<RiFacebookFill /> },
  // { href: "https://linkedin.com/company/sattarandco", label: <BsLinkedin /> },
  { href: "https://linkedin.com/company/sattarandco", label: <FaLinkedinIn /> },
  { href: "https://linkedin.com/company/sattarandco", label: <MdLocalPhone /> },
  { href: "https://linkedin.com/company/sattarandco", label: <MdAlternateEmail /> },
  
];

export default function TopBar() {
  return (
    <div className="w-full bg-white border-b border-charcoal/10">
      <div className=" mx-auto px-6 md:px-14 h-11 flex items-center justify-end text-sm
       text-charcoal/80">
        {/* <div className="flex items-center gap-5">
          <a
            href="tel:+880288366629"
            className="hover:text-red-600 transition-colors duration-300"
          >
           <MdLocalPhone />
          </a>
          <span className="w-px h-3.5 bg-charcoal/" />
          <a
            href="mailto:info@sattarandco.com"
            className="hover:text-red-600 transition-colors duration-300"
          >
            <BiLogoGmail />
          </a>
          <span className="w-px h-3.5 bg-charcoal/ hidden sm:block" />
          
        </div> */}

        <div className="flex items-center gap-2 mt-[2px]">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="  text-charcoal text-xl  hover:text-red-600 transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}