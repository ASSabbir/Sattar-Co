"use client";

import { motion } from "framer-motion";

/**
 * Next.js re-mounts this on every route change, so it's the natural place
 * for a page-transition fade. Kept deliberately simple — a soft fade/rise —
 * per the brief's "restrained interaction" direction.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
