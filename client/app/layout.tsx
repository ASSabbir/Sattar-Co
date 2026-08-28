import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageLoader from "@/components/loader/PageLoader";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sattarandco.com"),
  title: {
    default: "Sattar&Co. — Corporate, Financial & Arbitration Law Firm, Dhaka",
    template: "%s — Sattar&Co.",
  },
  description:
    "Sattar&Co. is a corporate, financial and arbitration law practice in Dhaka, Bangladesh, advising domestic and multinational clients across banking, energy, TMT and dispute resolution.",
  openGraph: {
    title: "Sattar&Co. — Corporate, Financial & Arbitration Law Firm",
    description:
      "A high-calibre legal practice built around expertise, integrity and practical understanding.",
    url: "https://www.sattarandco.com",
    siteName: "Sattar&Co.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sattar&Co. — Corporate, Financial & Arbitration Law Firm",
    description:
      "A high-calibre legal practice built around expertise, integrity and practical understanding.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <PageLoader />
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}