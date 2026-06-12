import { useTranslation } from "react-i18next";
import { Stagger, StaggerItem } from "@/shared/ui";

export function HeroSection() {
  const { t } = useTranslation("team");
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-24 lg:pt-52 lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[30%] h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[10%] h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(81,162,255,0.12) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <Stagger className="container-v2 relative z-[1] text-center" stagger={0.1} delay={0.35} inView={false}>
        <StaggerItem
          as="h1"
          mode="up"
          className="font-display font-black leading-none text-primary"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", letterSpacing: "-0.05em" }}
        >
          {t("hero.title")} <span className="text-grad">{t("hero.titleAccent")}</span>
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] text-muted sm:text-[17px]"
          style={{ lineHeight: 1.55, maxWidth: 600 }}
        >
          {t("hero.description")}
        </StaggerItem>
      </Stagger>
    </section>
  );
}
