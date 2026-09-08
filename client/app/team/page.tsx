import type { Metadata } from "next";
import teamData from "@/data/team.json";
import TeamRoster from "@/components/team/TeamRoster";

const SITE_URL = "https://www.sattarandco.com";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the consultants, associates and support team of Sattar&Co. — a corporate, financial and arbitration law practice in Dhaka, Bangladesh.",
  keywords: [
    "Sattar&Co. team",
    "Dhaka lawyers",
    "Bangladesh law firm team",
    "corporate lawyers Bangladesh",
    "arbitration counsel Dhaka",
  ],
  alternates: { canonical: `${SITE_URL}/team` },
  openGraph: {
    title: "Team — Sattar&Co.",
    description:
      "Leadership with perspective: the consultants and associates behind Sattar&Co., Dhaka.",
    url: `${SITE_URL}/team`,
    siteName: "Sattar&Co.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team — Sattar&Co.",
    description:
      "Leadership with perspective: the consultants and associates behind Sattar&Co., Dhaka.",
  },
};

interface TeamMemberSeo {
  slug: string;
  name: string;
  role?: string;
  group?: string;
}

export default function TeamRoutePage() {
  const members = teamData as unknown as TeamMemberSeo[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Team — Sattar&Co.",
    url: `${SITE_URL}/team`,
    about: {
      "@type": "LegalService",
      name: "Sattar&Co.",
      url: SITE_URL,
      areaServed: "BD",
      employee: members
        .filter((m) => m.group !== "Administration & Accounts")
        .map((m) => ({
          "@type": "Person",
          name: m.name,
          jobTitle: m.role,
          url: `${SITE_URL}/team/${m.slug}`,
        })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TeamRoster />
    </>
  );
}