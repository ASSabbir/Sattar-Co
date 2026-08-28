"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "company", label: "Company", type: "text", required: false },
  { name: "subject", label: "Subject", type: "text", required: true },
] as const;

/**
 * Demo enquiry form. There is no backend wired up yet — submitting simply
 * shows a confirmation state. Replace handleSubmit with a real API call
 * (e.g. to the CMS/admin panel described in the SRS) when that's ready.
 */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Demo only — simulate a short delay before showing confirmation.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border border-ivory/15 rounded-sm p-10 text-center"
      >
        <p className="font-display text-2xl text-ivory mb-3">Thank you.</p>
        <p className="text-ivory/60">
          Your enquiry has been received. A member of the team will be in touch shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label htmlFor={field.name} className="eyebrow text-ivory/50 mb-3">
              {field.label}
              {field.required && <span className="text-red-600"> *</span>}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              className="bg-transparent border-b border-ivory/25 focus:border-red-600 outline-none py-2 text-ivory placeholder:text-ivory/30 transition-colors duration-300"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <label htmlFor="message" className="eyebrow text-ivory/50 mb-3">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="bg-transparent border-b border-ivory/25 focus:border-red-600 outline-none py-2 text-ivory placeholder:text-ivory/30 resize-none transition-colors duration-300"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="self-start mt-4 link-underline text-ivory text-sm uppercase tracking-wide disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Submit Enquiry"}
      </button>
    </form>
  );
}
