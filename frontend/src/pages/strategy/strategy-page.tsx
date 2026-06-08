import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";

type ThemeItem = { icon: string; title: string; text: string };
type DeptItem = { abbr: string; name: string; points: string[] };

function Hero() {
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

function CrossThemes() {
  const { t } = useTranslation("strategy");
  const items = t("themes.items", { returnObjects: true }) as ThemeItem[];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 text-center lg:mb-14">
          <h2
            className="font-display font-black text-primary"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
          >
            {t("themes.title")} <span className="text-grad">{t("themes.titleAccent")}</span>
          </h2>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08} amount={0.05}>
          {Array.isArray(items) && items.map((item, i) => (
            <StaggerItem
              key={i}
              mode="up"
              className="grad-border relative overflow-hidden rounded-[20px] bg-surface p-5 backdrop-blur-xl sm:p-6"
            >
              <span className="text-grad mb-4 block" style={{ fontSize: "1.7rem" }}>
                {item.icon}
              </span>
              <h3
                className="font-display mb-2 font-bold text-primary"
                style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}
              >
                {item.title}
              </h3>
              <p className="text-[13px] leading-snug text-muted">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function DeptCard({ dept, index }: { dept: DeptItem; index: number }) {
  const colors = [
    { accent: "rgba(139,92,246,0.9)", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
    { accent: "rgba(59,130,246,0.9)", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)" },
    { accent: "rgba(16,185,129,0.9)", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.28)" },
    { accent: "rgba(245,158,11,0.9)", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.28)" },
  ];
  const c = colors[index % colors.length];

  return (
    <div
      className="grad-border flex flex-col rounded-[22px] bg-surface p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="mb-5 flex items-center gap-3">
        <span
          className="inline-flex items-center rounded-[10px] px-3 py-1.5 font-display text-[12px] font-black tracking-[0.04em]"
          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.accent }}
        >
          {dept.abbr}
        </span>
        <span className="text-[12px] text-white/35">{dept.name}</span>
      </div>

      <ul className="flex flex-col gap-4">
        {dept.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: c.accent, boxShadow: `0 0 6px ${c.bg}` }}
            />
            <p className="text-[13px] leading-snug text-white/50">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Departments() {
  const { t } = useTranslation("strategy");
  const items = t("depts.items", { returnObjects: true }) as DeptItem[];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" className="mb-4 text-center">
          <h2
            className="font-display font-black text-primary"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
          >
            {t("depts.title")} <span className="text-grad">{t("depts.titleAccent")}</span>
          </h2>
        </Reveal>
        <Reveal mode="up" className="mb-10 text-center lg:mb-14">
          <p className="mx-auto text-[15px] leading-relaxed text-muted sm:text-[17px]" style={{ maxWidth: 560 }}>
            {t("depts.description")}
          </p>
        </Reveal>

        <Stagger className="grid gap-5 lg:grid-cols-2" stagger={0.1} amount={0.05}>
          {Array.isArray(items) && items.map((dept, i) => (
            <StaggerItem key={i} mode="up">
              <DeptCard dept={dept} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Cta() {
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

function StrategyPage() {
  useLoadNamespace("strategy", loadTranslations);

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <Hero />
      <div>
        <CrossThemes />
        <Departments />
        <Cta />
      </div>
    </PageTransition>
  );
}

export const Component = StrategyPage;
