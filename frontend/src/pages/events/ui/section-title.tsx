import { Reveal } from "@/shared/ui";

export function SectionTitle({ title, highlight, description }: { title: string; highlight: string; description?: string }) {
  return (
    <Reveal mode="up" className="mb-6 sm:mb-10 lg:mb-14">
      <h2 className="font-display font-black text-primary" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
        {title} <span className="text-grad">{highlight}</span>
      </h2>
      {description && <p className="mt-3 max-w-xl text-[14px] leading-snug text-muted sm:text-[17px] sm:leading-relaxed">{description}</p>}
    </Reveal>
  );
}
