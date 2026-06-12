import { useTranslation } from "react-i18next";
import { Stagger, StaggerItem } from "@/shared/ui";

export function Hero() {
  const { t } = useTranslation("strategy");
  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[15%] -top-[20%] h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[15%] -right-[10%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(81,162,255,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Stagger className="container-v2 relative z-[1]" stagger={0.1} delay={0.35} inView={false}>
        <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
            {t("hero.badge")}
          </span>
          <span className="text-[12px] text-primary/70">{t("hero.badgeSub")}</span>
        </StaggerItem>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <StaggerItem mode="left">
            <h1
              className="font-display font-black leading-none text-primary"
              style={{ fontSize: "clamp(2rem, 7vw, 6.5rem)", letterSpacing: "-0.05em" }}
            >
              {t("hero.title")}
              <br />
              <span className="text-grad">{t("hero.titleAccent")}</span>
            </h1>
          </StaggerItem>

          <StaggerItem mode="right" className="flex flex-col gap-6 lg:pb-2">
            <p className="text-[15px] leading-relaxed text-muted sm:text-[17px]">
              {t("hero.description")}
            </p>
          </StaggerItem>
        </div>
      </Stagger>
    </section>
  );
}
