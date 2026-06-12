import { Reveal } from "@/shared/ui";

export function SectionTitle({ title, highlight }: { title: string; highlight: string }) {
  return (
    <Reveal mode="up" className="mb-6 text-left sm:mb-8 sm:text-center">
      <h2
        className="font-display font-black text-primary"
        style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
      >
        {title} <span className="text-grad">{highlight}</span>
      </h2>
    </Reveal>
  );
}
