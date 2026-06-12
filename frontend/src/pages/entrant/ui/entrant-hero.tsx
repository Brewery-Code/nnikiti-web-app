import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { loadTranslations } from "../locales";

export function EntrantHero({
  eyebrow,
  title,
  gradientWord,
  description,
  imageSeed,
  stats,
}: {
  eyebrow: string;
  title: string;
  gradientWord: string;
  description: string;
  accent?: string;
  imageSeed: string;
  stats: { value: string; label: string }[];
}) {
  useLoadNamespace("entrant", loadTranslations);
  const { t } = useTranslation("entrant");

  return (
    <section className="relative overflow-hidden pt-24 pb-8 sm:pt-32 sm:pb-14 lg:pt-40 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-v2 relative z-[1]">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Stagger stagger={0.08} delay={0.35} inView={false}>
            <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
              <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
                {t("ui.badge")}
              </span>
              <span className="text-[12px] text-primary/70">{eyebrow}</span>
            </StaggerItem>

            <StaggerItem
              as="h1"
              mode="up"
              className="font-display font-black text-primary"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              {title} <span className="text-grad">{gradientWord}</span>
            </StaggerItem>

            <StaggerItem
              as="p"
              mode="up"
              className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted sm:text-[17px]"
              style={{ lineHeight: 1.55 }}
            >
              {description}
            </StaggerItem>

            <StaggerItem mode="up" className="mt-6 grid grid-cols-3 gap-2 sm:mt-10 sm:flex sm:flex-wrap sm:gap-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="grad-border flex flex-col rounded-[12px] bg-surface-md px-3 py-2.5 backdrop-blur-md sm:rounded-[14px] sm:px-5 sm:py-3"
                >
                  <span className="font-display text-[17px] font-extrabold text-primary sm:text-[20px]">
                    <span className="text-grad">{s.value}</span>
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.12em] text-subtle sm:text-[10px] sm:tracking-[0.14em]">
                    {s.label}
                  </span>
                </div>
              ))}
            </StaggerItem>
          </Stagger>

          <Reveal mode="right" delay={0.35} inView={false} className="grad-border relative hidden overflow-hidden rounded-[20px] lg:block">
            <img
              src={imageSeed}
              alt=""
              className="h-[420px] w-full object-cover"
            />
            <div className="font-display absolute bottom-6 left-6 rounded-full border border-violet-500/30 bg-violet-500/15 px-4 py-2 text-[11px] font-bold text-violet-100 backdrop-blur-md">
              {eyebrow}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
