import ArrowLink from "@/components/ui/ArrowLink";
import RevealText from "@/components/ui/RevealText";
import firm from "@/data/firm.json";

export default function ContactCTA() {
  return (
    <section className="grain bg-navy py-28 md:py-44">
      <div className="max-w-content mx-auto px-6 md:px-10 text-center">
        <p className="eyebrow text-red-600 mb-8">06 — Start a Conversation</p>
        <RevealText as="h2" className="font-display text-display-lg text-ivory mb-10 mx-auto max-w-3xl">
          Discretion, expertise and a practical way forward.
        </RevealText>
        <p className="text-ivory/55 max-w-xl mx-auto mb-12 leading-relaxed">
          Reach the firm directly at {firm.location}, or send a note outlining your matter
          and a member of the team will respond promptly.
        </p>
        <div className="flex justify-center">
          <ArrowLink href="/contact" light className="text-base">
            Get in Touch
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
