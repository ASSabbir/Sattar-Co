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
    id: "intern",
    title: "Intern",
    eligibility:
      "The candidate should be a fresh law graduate from any reputed university in Bangladesh or hold an equivalent law degree, with a strong interest in legal research and the practice of law, and a willingness to learn and develop practical legal skills in a professional environment.",
    role:
      "To assist with legal research, preparation of legal documents, case law research, and other legal and administrative tasks while gaining practical exposure to legal practice.",
  },
  {
    id: "research-associate",
    title: "Research Associate",
    eligibility:
      "The candidate should hold an LL.B. and LL.M., or equivalent law degree(s), from any reputed university in Bangladesh or abroad, with strong legal research, analytical, and legal writing skills. Enrolment with the Bangladesh Bar Council will be preferred.",
    role:
      "The Research Associate will conduct legal and regulatory research, and assist in preparing legal opinions, memoranda. The role will also involve drafting and vetting legal documents and supporting senior lawyers and Associates in corporate, commercial, civil, regulatory, and litigation matters.",
  },
  {
    id: "associate",
    title: "Associate",
    eligibility:
      "The candidate should hold an LL.B. and LL.M., or equivalent law degree(s), from any reputed university in Bangladesh or abroad, and be enrolled with the Bangladesh Bar Council. Relevant experience in corporate, commercial, civil, or regulatory matters will be preferred.",
    role:
      "The Associate will be responsible for conducting legal research, drafting and vetting contracts, pleadings, legal notices, opinions, and other legal documents, and assisting with corporate, commercial, civil, regulatory, and litigation matters. The role will also involve assisting senior lawyers, communicating with clients, and appearing before relevant courts and authorities, as appropriate.",
  },
];

const TO_EMAILS = ["info@sattarandco.com", "practicemanager@sattarandcobd.com"];
const CC_EMAIL = "ssattar@sattarandco.com";

export function buildGmailLink(position: string): string {
  const subject = "Application for " + position + " — Sattar&Co.";
  const body =
    "Dear Sir/Madam,\n\n" +
    "I am writing to apply for the position of " + position + " at Sattar&Co.\n\n" +
    "Please find attached my updated CV and a brief cover letter outlining my qualifications and relevant experience.\n\n" +
    "I look forward to hearing from you.\n\n" +
    "Kind regards,\n";

  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: TO_EMAILS.join(","),
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
      <section className="bg-white ">
        <div className="max-w-content mx-auto py-10  md:py-20 px-6 md:px-10">
          {positions.map((pos) => {
            const isOpen = openId === pos.id;
            return (
              <div key={pos.id} className="">
                <button
                  onClick={() => setOpenId(isOpen ? "" : pos.id)}
                  className="w-full flex items-center justify-between gap-6 pb-4 pt-4  text-left group"
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
                      <div className="  grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        <div className="lg:col-span-6 space-y-4">
                          <p className="text-charcoal/40 text-xs uppercase tracking-wide">
                            Eligibility
                          </p>
                          <p className="text-charcoal  leading-relaxed text-lg md:text-[22px]">{pos.eligibility}</p>
                        </div>
                        <div className="lg:col-span-6 space-y-4">
                          <p className="text-charcoal/40 text-xs uppercase tracking-wide">Role</p>
                          <p className="text-charcoal  leading-relaxed text-lg md:text-[22px]">{pos.role}</p>
                          {pos.extra && (
                            <p className="text-charcoal  leading-relaxed text-lg md:text-[22px]">{pos.extra}</p>
                          )}
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

      <section className="bg-white  pb-24 ">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className=" px-8 py-14 border-[1px] border-gray-500 md:px-16  grid grid-cols-1 lg:grid-cols-9 gap-10 items-center">
            <div className="lg:col-span-8  space-y-5">
              <h3 className="font-display text-3xl md:text-4xl text-gray-900">How to Apply</h3>
              <p className="text-gray-900   leading-relaxed text-lg md:text-[22px]  w-full">
                Interested candidates are invited to submit their updated CV along with a brief
                cover letter outlining their qualifications and relevant experience to{" "}
                {TO_EMAILS[0]} or {TO_EMAILS[1]}, with a copy to {CC_EMAIL}. Please mention the
                position applied for in the subject line of the email. Only shortlisted
                candidates will be contacted.
              </p>
              <p className="text-gray-900/50 text-pretty text-sm">
                {TO_EMAILS.join(" · ")} &nbsp;·&nbsp; cc: {CC_EMAIL}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}