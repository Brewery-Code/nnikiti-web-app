import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";

export default function HeroSection() {
  useLoadNamespace("history", loadTranslations);
  const { t } = useTranslation("history");

  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  const STATS = [
    { value: "25", label: t("hero.stats.yearsLabel") },
    { value: "2000", label: t("hero.stats.foundedLabel") },
    { value: "5", label: t("hero.stats.departmentsLabel") },
    { value: "3", label: t("hero.stats.directorsLabel") },
  ];

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none items-end justify-end overflow-hidden pr-10 pb-10"
      >
        <span
          className="font-display leading-none"
          style={{
            fontWeight: 900,
            fontSize: "clamp(180px, 30vw, 480px)",
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "-0.06em",
          }}
        >
          ННІКІТІ
        </span>
      </div>


<div className="container-v2 relative z-[1] flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] py-4 pt-24 sm:pt-28 lg:pt-32">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-subtle">
          {t("hero.institute")}
        </span>
        <span className="text-[10px] font-bold tracking-[0.15em] text-subtle">
          {t("hero.years")}
        </span>
      </div>

      <div className="container-v2 relative z-[1] flex flex-1 flex-col justify-center py-16">
        <div
          className={clsx(
            "transition-all duration-1000",
            entered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
            <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
              {t("hero.badge")}
            </span>
            <span className="text-[12px] text-primary/70">{t("hero.city")}</span>
          </div>

          <h1
            className="font-display leading-none text-primary"
            style={{
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 9vw, 9rem)",
              letterSpacing: "-0.05em",
            }}
          >
            {t("hero.title1")}
            <br />
            <span className="text-grad">{t("hero.title2")}</span>
          </h1>

          <div className="my-10" />

          <p className="max-w-xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
            {t("hero.description")}
          </p>
        </div>
      </div>

      <div className="container-v2 relative z-[1] border-t border-white/[0.07] pb-10">
        <div className="grid grid-cols-2 gap-px md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={clsx(
                "flex flex-col gap-1.5 px-2 py-7 transition-all duration-700",
                entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: `${400 + i * 80}ms` }}
            >
              <span
                className="font-display leading-none"
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                <span className="text-grad">{s.value}</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-subtle">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
