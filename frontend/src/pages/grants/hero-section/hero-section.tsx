import { useTranslation } from "react-i18next";
import { Stagger, StaggerItem } from "@/shared/ui";

export function GrantsHero() {
  const { t } = useTranslation("grants-page");

  return (
    <section className="relative overflow-hidden pt-32 pb-10 sm:pt-40 sm:pb-14 lg:pt-48 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(56,189,132,0.15) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[5%] top-[10%] h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(166,132,255,0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <Stagger className="container-v2 relative z-[1]" stagger={0.08} delay={0.35} inView={false}>
        <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
          <span className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-white">
            {t("badge")}
          </span>
          <span className="text-[12px] text-primary/70">{t("badgeSub")}</span>
        </StaggerItem>
        <StaggerItem as="h1" mode="up" className="font-display font-black text-primary"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", letterSpacing: "-0.05em", lineHeight: 0.95 }}>
          {t("heading")} <span className="text-grad">{t("headingAccent")}</span>
        </StaggerItem>
        <StaggerItem as="p" mode="up" className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
          {t("description")}
        </StaggerItem>
      </Stagger>
    </section>
  );
}
