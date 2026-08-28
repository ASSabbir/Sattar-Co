"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugins we use across the site exactly once.
// Every component that needs GSAP should import gsap + ScrollTrigger from this file
// instead of "gsap" directly, so registration always happens first.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
