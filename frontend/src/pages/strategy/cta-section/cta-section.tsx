import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/model/routes";
import { Stagger, StaggerItem } from "@/shared/ui";

export function Cta() {
  const { t } = useTranslation("strategy");
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(166,132,255,0.10) 0%, transparent 70%)",
        }}
      />
      <Stagger className="container-v2 relative z-[1] flex flex-col items-center text-center" stagger={0.1}>
        <StaggerItem
          as="h2"
          mode="up"
          className="font-display font-black leading-none text-primary"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
        >
          {t("cta.title")} <span className="text-grad">{t("cta.titleAccent")}</span>
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] leading-relaxed text-primary/60 sm:text-[17px]"
          style={{ maxWidth: 580 }}
        >
          {t("cta.description")}
        </StaggerItem>
        <StaggerItem mode="up" className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.CONTACTS}
            className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95 sm:text-[17px]"
          >
            {t("cta.contact")} <span aria-hidden>→</span>
          </Link>
          <Link
            to={ROUTES.HISTORY}
            className="inline-flex items-center gap-2 rounded-[14px] border border-white/15 bg-surface-md px-7 py-3.5 text-[15px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95 sm:text-[17px]"
          >
            {t("cta.history")} <span aria-hidden>→</span>
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
