import { Link } from "react-router-dom";
import { Reveal } from "@/shared/ui";

export function SectionHeader({
  title,
  highlight,
  linkTo,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  linkTo?: string;
  linkLabel?: string;
}) {
  return (
    <Reveal mode="up" className="mb-6 flex items-end justify-between sm:mb-8 lg:mb-10">
      <h2
        className="font-display font-black leading-tight text-primary"
        style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
      >
        {title} <span className="text-grad">{highlight}</span>
      </h2>
      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className="grad-border flex-shrink-0 rounded-full bg-surface-md px-4 py-1.5 text-[12px] font-semibold text-muted backdrop-blur-md transition-all duration-200 hover:bg-surface-xl hover:text-primary sm:text-[13px]"
        >
          {linkLabel} →
        </Link>
      )}
    </Reveal>
  );
}
