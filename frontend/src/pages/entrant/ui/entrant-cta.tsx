import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { ROUTES } from "@/shared/model/routes";
import { Stagger, StaggerItem } from "@/shared/ui";
import { loadTranslations } from "../locales";

export function EntrantCta({
  title,
  subtitle,
  primaryLabel,
  primaryTo = ROUTES.CONTACTS,
  secondaryLabel,
  secondaryTo = ROUTES.ASK_QUESTION,
}: {
  accent?: string;
  title: string;
  subtitle: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  useLoadNamespace("entrant", loadTranslations);
  const { t } = useTranslation("entrant");

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(166,132,255,0.10) 0%, transparent 70%)",
        }}
      />
      <Stagger className="container-v2 relative z-[1] flex flex-col items-center text-center" stagger={0.1}>
        <StaggerItem
          as="h2"
          mode="up"
          className="font-display font-black text-primary"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {title}
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] leading-relaxed text-primary/60 sm:text-[17px]"
          style={{ maxWidth: 580 }}
        >
          {subtitle}
        </StaggerItem>
        <StaggerItem mode="up" className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to={primaryTo}
            className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95 sm:text-[17px]"
          >
            {primaryLabel ?? t("ui.ctaPrimaryLabel")} <span aria-hidden>{t("ui.arrow")}</span>
          </Link>
          <Link
            to={secondaryTo}
            className="inline-flex items-center gap-2 rounded-[14px] border border-white/15 bg-surface-md px-7 py-3.5 text-[15px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95 sm:text-[17px]"
          >
            {secondaryLabel ?? t("ui.ctaSecondaryLabel")} <span aria-hidden>{t("ui.arrow")}</span>
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
