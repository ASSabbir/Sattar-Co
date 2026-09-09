"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

type Position = {
  id: string;
  title: string;
  eligibility: string;
  role: string;
  extra?: string;
};

const positions: Position[] = [
  {
    id: "junior-associate",
    title: "Junior Associate",
    eligibility:
      "Enrolled with the Bar Council in Bangladesh, with a first or upper second class (or equivalent) undergraduate degree from a reputed University.",
    role:
      "Primarily involved in providing legal opinions, and drafting pleadings and commercial documents. Should be confident handling their own cases, with initial support and assistance from a senior lawyer always available when required.",
  },
  {
    id: "trainee",
    title: "Trainee",
    eligibility:
      "A first or upper second class (or equivalent) undergraduate degree from a reputed University.",
    role:
      "Primarily assisting senior lawyers with case loads through legal research and drafting exercises. A good command of both English and Bengali is required, with continuous support and assistance from senior lawyers made available throughout.",
  },
  {
    id: "internship",
    title: "Internship",
    eligibility: "Applicants in their final year of an LLB degree are encouraged to apply.",
    role:
      "Primarily involved in assisting members of the firm with legal research. A good command of both English and Bengali is required.",
    extra:
      "The internship generally lasts 3 months. Applicants wishing to move to a Trainee position will need to go through an interview with the Practice Manager.",
  },
];

const TO_EMAIL = "practicemanager@sattarandcobd.com";
const CC_EMAIL = "ssattar@sattarandco.com";

export function buildGmailLink(position: string): string {
  const subject = "Application for " + position + " — Sattar&Co.";
  const body =
    "Dear Practice Manager,\n\n" +
    "I am writing to apply for the position of " + position + " at Sattar&Co.\n\n" +
    "Please find attached my CV, covering letter, and a letter of recommendation from my University professor / previous employer.\n\n" +
    "I look forward to hearing from you.\n\n" +
    "Kind regards,\n";

  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: TO_EMAIL,
    cc: CC_EMAIL,
    su: subject,
    body: body,
  });

  return "https://mail.google.com/mail/?" + params.toString();
}

function ApplyButton(props: { position: string; variant?: "dark" | "light" }) {
  const variant = props.variant || "dark";
  const linkClasses =
    variant === "dark"
      ? "bg-charcoal text-ivory hover:bg-red-600"
      : "border border-charcoal/20 text-charcoal hover:border-red-600 hover:text-red-600";

  return (
    <a
      href={buildGmailLink(props.position)}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "group inline-flex items-center gap-2.5 px-6 py-3 text-sm tracking-wide transition-colors duration-300 " +
        linkClasses
      }
    >
      <Mail size={15} strokeWidth={1.5} />
      Apply for {props.position}
      <ArrowUpRight
        size={14}
        strokeWidth={1.5}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

export default function CareersInteractive() {
  const [openId, setOpenId] = useState<string>(positions[0].id);

  return (
    <>
      <section className="bg-white pt-10">
        <div className="max-w-content mx-auto px-6 md:px-10">
          {positions.map((pos) => {
            const isOpen = openId === pos.id;
            return (
              <div key={pos.id} className="border-t border-charcoal/10 last:border-b">
                <button
                  onClick={() => setOpenId(isOpen ? "" : pos.id)}
                  className="w-full flex items-center justify-between gap-6 py-8 text-left group"
                >
                  <span
                    className={
                      "font-display text-3xl md:text-5xl transition-colors duration-300 " +
                      (isOpen ? "text-charcoal" : "text-charcoal/40 group-hover:text-charcoal/70")
                    }
                  >
                    {pos.title}
                  </span>
                  <span
                    className={
                      "shrink-0 text-2xl font-display text-charcoal/40 transition-transform duration-300 " +
                      (isOpen ? "rotate-45" : "")
                    }
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        <div className="lg:col-span-6 space-y-4">
                          <p className="text-charcoal/40 text-xs uppercase tracking-wide">
                            Eligibility
                          </p>
                          <p className="text-charcoal/70 leading-relaxed">{pos.eligibility}</p>
                        </div>
                        <div className="lg:col-span-6 space-y-4">
                          <p className="text-charcoal/40 text-xs uppercase tracking-wide">Role</p>
                          <p className="text-charcoal/70 leading-relaxed">{pos.role}</p>
                          {pos.extra && (
                            <p className="text-charcoal/70 leading-relaxed">{pos.extra}</p>
                          )}
                        </div>
                        <div className="lg:col-span-12 pt-2">
                          <ApplyButton position={pos.title} variant="light" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white pt-20 pb-24 md:pb-32">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="bg-navy px-8 py-14 md:px-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <h3 className="font-display text-3xl md:text-4xl text-ivory">How to Apply</h3>
              <p className="text-ivory/70 leading-relaxed max-w-xl">
                Applications should be addressed to the Practice Manager in the HR team, with a
                copy to Barrister Sattar. Interested applicants must submit their CV, a covering
                letter, and a letter of recommendation from their University professor or previous
                employer. Short-listed applicants will be called for an interview with the
                Practice Manager.
              </p>
              <p className="text-ivory/50 text-sm">
                {TO_EMAIL} &nbsp;·&nbsp; cc: {CC_EMAIL}
              </p>
            </div>
            {/* <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href={buildGmailLink("Vacancy")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-ivory text-charcoal text-sm tracking-wide hover:bg-red-600 hover:text-ivory transition-colors duration-300"
              >
                <Mail size={16} strokeWidth={1.5} />
                Send Us Your CV
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}