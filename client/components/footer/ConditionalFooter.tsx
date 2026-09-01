
"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer/Footer";

const HIDDEN_FOOTER_ROUTES = ["/team"];

export default function ConditionalFooter() {
  const pathname = usePathname();

  const shouldHide = HIDDEN_FOOTER_ROUTES.some(
    (route) => pathname === route || pathname === `${route}/`
  );

  if (shouldHide) return null;

  return <Footer />;
}