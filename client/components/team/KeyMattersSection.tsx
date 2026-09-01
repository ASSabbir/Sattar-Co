"use client";

import React, { useState } from "react";

interface KeyMatterCategory {
  id: string;
  number: string;
  title: string;
  countLabel: string;
  matters: string[];
}

const KEY_MATTERS_DATA: KeyMatterCategory[] = [
  {
    id: "commercial-drafting",
    number: "01",
    title: "Commercial Drafting / Advisory Work",
    countLabel: "14 Representative Matters",
    matters: [
      "Advised a leading power generation company on power projects.",
      "Advised a leading bank in relation to a loan syndication project involving foreign lenders.",
      "Advised a leading airlines operator on aircraft leases, GSAs.",
      "Advised the Bangladeshi Privatisation Commission in relation to the proposed sale of a State-owned bank involving $Ms.",
      "Advised the Bangladeshi Seller in relation to the acquisition of shares in a local telecommunications company by a Japanese Buyer involving $Ms.",
      "Advised a leading foreign pharmaceutical company in relation to their divestment and management sale in Bangladesh involving $Ms.",
      "Advised a German financial institution on loan syndication projects in Bangladesh.",
      "Advised a leading telecommunications company on its loan syndication project in Bangladesh and other telecom matters.",
      "Advised foreign companies in setting up joint venture companies for various projects in Bangladesh.",
      "Advised a mobile phone manufacturing company based in Singapore to set up operations in Bangladesh.",
      "Advised a semi-State entity in relation to the sale of exclusive marketing agency rights to a foreign company for $Ms for the broadcasting of international cricket matches.",
      "Advised a foreign company, in relation to a concession agreement, regarding the construction of a 7km fly-over in Bangladesh.",
      "Advised a leading foreign company in relation to their turn-key contract/project for setting up telecommunication network facilities in Bangladesh."
    ]
  },
  {
    id: "arbitration",
    number: "02",
    title: "International and Domestic Arbitration",
    countLabel: "07 Representative Matters",
    matters: [
      "Represented a major Turkish construction company in an ICSID arbitration against the Government of Turkmenistan. The client undertook numerous high-value construction projects which have been cancelled by the State.",
      "Represented one of the largest private companies in the world (US based) in an ICSID arbitration against the Government of Venezuela whose investments in a fertilizer company have been expropriated through changes in law and a formal expropriation.",
      "Defended a private equity firm in a LCIA commercial arbitration brought against it by a partner. The dispute involved the unlawful termination of a partnership agreement.",
      "Represented an Eastern-European State in an investment treaty arbitration under the UNCITRAL Rules. The dispute involved allegations of expropriation of a shipping construction programme by the actions of a State entity attributable to the State.",
      "Represented a South-Asian State in an investment treaty arbitration under the rules of ICSID. The dispute involved allegations of expropriation of a financial contract by State organs.",
      "Represented the Government of Bangladesh in an investment treaty arbitration under ICSID rules in a dispute involving indirect expropriation of an ICC arbitral award by the national courts.",
      "Represented a Bangladeshi State entity in an international commercial arbitration held under the ICC rules involving a complex dispute regarding the construction of a dam."
    ]
  },
  {
    id: "international-law",
    number: "03",
    title: "International Law (Advisory Work)",
    countLabel: "06 Representative Matters",
    matters: [
      "Advised a multinational company in relation to economic sanctions.",
      "Advised a foreign investor in relation to its legal rights under a concession contract containing an ICSID clause. The concession contract has been annulled by the new Government after coming into power recently.",
      "Advised a foreign pre-shipment inspection company in relation to its rights under international law and a bilateral investment treaty with respect to an unlawful termination of a PSI contract.",
      "Represented companies in domestic commercial arbitration held under the Arbitration Act 2001 of Bangladesh. Most disputes related primarily to breach of commercial contracts and the compensation due.",
      "Represented companies in the Bangladeshi courts for and against banks in relation to debt recovery claims, matters relating to fraud, disputes relating to share buy-back agreements.",
      "Represented companies in the Bangladeshi courts in relation to contract claims, shareholder disputes, rectification of share register, minority protection matters."
    ]
  },
  {
    id: "lecture-training",
    number: "04",
    title: "Lecture / Legal Training",
    countLabel: "02 Key Programs",
    matters: [
      "Trained government officers in a Middle Eastern State on issues of dispute resolution and arbitration.",
      "Delivered a joint lecture at Kings College London on Evidence and Weighting in International Boundary Adjudication."
    ]
  }
];

export default function KeyMattersSection() {
  // Nothing open by default
  const [openCategoryId, setOpenCategoryId] = useState<string>("");

  const toggleCategory = (id: string) => {
    setOpenCategoryId((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="w-full bg-[#F4F1E8] text-[#1A1A1A] py-12 md:py-16 border-t border-[#1A1A1A]/15 font-sans">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="mb-10 md:mb-14">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#C92B2B] font-semibold block mb-3">
            REPRESENTATIVE PRACTICE
          </span>
          <h2 className="font-serif text-2xl md:text-4xl text-[#1A1A1A] font-normal tracking-tight leading-tight">
            Some of the key matters, on which Barrister Sattar worked, include:
          </h2>
        </div>

        {/* Editorial Table / Index Container */}
        <div className="border-t border-b border-[#1A1A1A]/20 divide-y divide-[#1A1A1A]/15">
          {KEY_MATTERS_DATA.map((category) => {
            const isOpen = openCategoryId === category.number;

            return (
              <div
                key={category.id}
                className={`transition-colors duration-200 ${
                  isOpen ? "bg-[#1A1A1A]/[0.03]" : "hover:bg-[#1A1A1A]/[0.015]"
                }`}
              >
                {/* Row Header / Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category.number)}
                  className="w-full text-left py-6 md:py-8 px-2 md:px-4 flex items-center justify-between gap-4 group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
                    {/* Index Number */}
                    <span
                      className={`font-serif text-xl md:text-3xl transition-colors duration-200 ${
                        isOpen
                          ? "text-[#C92B2B] font-medium"
                          : "text-[#1A1A1A]/40 group-hover:text-[#1A1A1A]/70"
                      }`}
                    >
                      [{category.number}]
                    </span>

                    {/* Category Title */}
                    <h3
                      className={`font-serif text-lg md:text-2xl tracking-tight transition-colors duration-200 ${
                        isOpen
                          ? "text-[#1A1A1A] font-medium"
                          : "text-[#1A1A1A]/85 group-hover:text-[#C92B2B]"
                      }`}
                    >
                      {category.title}
                    </h3>
                  </div>

                  {/* Metadata & Interaction Indicator */}
                  <div className="flex items-center gap-4 md:gap-8 shrink-0">
                    <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-[#1A1A1A]/50 font-mono">
                      {category.countLabel}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center text-sm transition-all duration-300 ${
                        isOpen
                          ? "bg-[#C92B2B] text-white border-[#C92B2B] rotate-90"
                          : "text-[#1A1A1A]/60 group-hover:border-[#C92B2B] group-hover:text-[#C92B2B]"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </button>

                {/* Expanded Detailed Content Area */}
                {isOpen && (
                  <div className="px-2 md:px-4 pb-8 md:pb-12 pt-2 animate-fadeIn">
                    <div className="pl-10 md:pl-16 pr-2 md:pr-8 border-l-2 border-[#C92B2B]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {category.matters.map((matter, idx) => (
                          <div
                            key={idx}
                            className="bg-white/40 border border-[#1A1A1A]/10 p-5 md:p-6 flex items-start gap-4 transition-shadow hover:shadow-sm"
                          >
                            <span className="text-[#C92B2B] font-serif text-lg leading-none select-none">
                              —
                            </span>
                            <p className="text-sm md:text-base text-[#1A1A1A]/85 font-light leading-relaxed">
                              {matter}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}