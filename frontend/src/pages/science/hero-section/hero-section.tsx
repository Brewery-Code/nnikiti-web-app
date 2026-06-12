import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Stagger, StaggerItem } from "@/shared/ui";
import { NAV_ITEMS, type SciencePageData, type SciencePageKind } from "../model";

export function ScienceHero({
  data,
  currentKind,
}: {
  data: SciencePageData;
  currentKind: SciencePageKind;
}) {
  const { t } = useTranslation("science");

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      <img
        src={data.heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-[#08090f]/80 to-[#08090f]/60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Stagger className="container-v2 relative z-[1]" stagger={0.08} delay={0.35} inView={false}>
        <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
            ННІКІТІ
          </span>
          <span className="text-[12px] text-primary/70">{data.eyebrow}</span>
        </StaggerItem>

        <StaggerItem
          as="h1"
          mode="up"
          className="font-display max-w-5xl font-black text-primary"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
          }}
        >
          {data.title} <span className="text-grad">{data.gradientTitle}</span>
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]"
          style={{ lineHeight: 1.55 }}
        >
          {data.intro}
        </StaggerItem>

        <StaggerItem mode="up" className="mt-10 flex flex-wrap gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.kind}
              to={item.route}
              className={clsx(
                "rounded-[12px] px-5 py-2.5 text-[14px] font-semibold transition-all duration-200",
                item.kind === currentKind
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                  : "grad-border bg-surface-md text-primary/60 backdrop-blur-md hover:bg-surface-xl hover:text-primary"
              )}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </StaggerItem>
      </Stagger>
    </section>
  );
}
