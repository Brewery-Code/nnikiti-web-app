import { Reveal } from "@/shared/ui";

export function SectionHead({
  title,
  gradientTitle,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  gradientTitle: string;
  accent?: string;
  subtitle?: string;
}) {
  return (
    <Reveal mode="up" className="mb-6 sm:mb-10 lg:mb-14">
      <h2
        className="font-display font-black text-primary"
        style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
      >
        {title} <span className="text-grad">{gradientTitle}</span>
      </h2>
      {subtitle && (
        <p
          className="mt-4 max-w-xl text-[15px] leading-snug text-muted sm:text-[17px]"
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
