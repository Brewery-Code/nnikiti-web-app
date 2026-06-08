import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import type { components } from "@/shared/api/schema/generated";

type ApiEvent = components["schemas"]["Events"];

function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("uk-UA", { day: "numeric", month: "short", year: "numeric" });
}

function newsItemRoute(item: ApiEvent) {
  return ROUTES.NEWS_ITEM.replace(":slug", String(item.slug ?? ""));
}

function Pill({ category }: { category: ApiEvent["category"] }) {
  const name = category?.name ?? "";
  const rgb = category?.rgb_color;
  const bg     = rgb ? `rgba${rgb}`      : "rgba(255,255,255,0.07)";
  const border = rgb ? `rgba${rgb.replace(/[\d.]+\)$/, "0.45)")}` : "rgba(255,255,255,0.12)";
  const color  = rgb ? `rgba${rgb.replace(/[\d.]+\)$/, "0.9)")}`  : "rgba(255,255,255,0.5)";
  return (
    <span
      className="inline-block flex-shrink-0"
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "4px 12px",
        borderRadius: 999,
        background: bg,
        border: `1px solid ${border}`,
        color,
      }}
    >
      {name}
    </span>
  );
}

function SeeAll() {
  const [h, setH] = useState(false);
  const { t } = useTranslation("home");
  return (
    <Link
      to={`${ROUTES.EVENTS}#news`}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="inline-flex items-center text-[14px] font-semibold uppercase tracking-[0.04em] transition-all duration-150"
      style={{
        gap: h ? 12 : 8,
        color: h ? "#fff" : "rgba(255,255,255,0.4)",
      }}
    >
      {t("eventsSection.seeAll")}
      <span style={{ color: h ? "#a684ff" : "rgba(255,255,255,0.3)" }}>↗</span>
    </Link>
  );
}

function NewsFeat({ item }: { item: ApiEvent }) {
  const { t } = useTranslation("home");
  const image = resolveMediaUrl(item.cover);
  return (
    <Link
      to={newsItemRoute(item)}
      className="group grad-border relative block h-full overflow-hidden rounded-[24px] transition-transform duration-200 active:scale-[0.99]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06]"
        style={{ backgroundImage: image ? `url(${image})` : undefined, backgroundColor: "#12131f", willChange: "transform" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-[#08090f]/45 to-transparent" />
      <div className="min-h-[280px] sm:min-h-[430px]" />
      <div className="absolute inset-x-0 bottom-0 translate-y-[48px] p-6 transition-transform duration-300 ease-out group-hover:translate-y-0 sm:p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <Pill category={item.category} />
          <span className="text-[11px] text-white/60">{formatDate(item.event_date ?? item.created_at)}</span>
        </div>
        <h3
          className="font-display font-bold text-white"
          style={{ fontSize: "1.1rem", letterSpacing: "-0.02em", lineHeight: 1.4 }}
        >
          {item.title}
        </h3>
        <div className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.04em] text-violet-400">
          {t("eventsSection.readMore")} <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

function NewsRow({ item }: { item: ApiEvent }) {
  const { t } = useTranslation("home");
  const image = resolveMediaUrl(item.cover);
  return (
    <Link
      to={newsItemRoute(item)}
      className="group flex h-full items-center gap-4 rounded-[16px] p-[18px] transition-all duration-200 hover:border-violet-500/20 hover:bg-violet-500/[0.06] active:scale-[0.98]"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="hidden flex-shrink-0 overflow-hidden rounded-[12px] xs:block"
        style={{ width: 96, height: 76 }}
      >
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.08]"
          style={{ backgroundImage: image ? `url(${image})` : undefined, backgroundColor: "#12131f", willChange: "transform" }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-center gap-2">
          <Pill category={item.category} />
          <span className="text-[10px] text-white/55">{formatDate(item.event_date ?? item.created_at)}</span>
        </div>
        <p
          className="font-display font-semibold text-[0.85rem] leading-[1.4] text-white/75 transition-colors duration-150 group-hover:text-white"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.title}
        </p>
        <div className="mt-2 translate-y-1 text-[11px] font-bold uppercase tracking-[0.04em] text-violet-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {t("eventsSection.readMore")} →
        </div>
      </div>
      <span
        className="flex-shrink-0 text-[16px] transition-colors duration-200 group-hover:text-violet-400"
        style={{ color: "rgba(255,255,255,0.15)" }}
      >
        ›
      </span>
    </Link>
  );
}

export default function EventsSection({ className = "" }: { className?: string }) {
  useLoadNamespace("home", loadTranslations);
  const { t } = useTranslation("home");
  const { data, isPending } = publicRqClient.useQuery("get", "/events/", {});

  const events = (data ?? []).filter((e) => !!e.title).slice(0, 4);
  const featured = events[0];
  const rest = events.slice(1);

  if (isPending || !featured) return null;

  return (
    <section className={clsx("bg-[#0a0b12] py-16 lg:py-24", className)}>
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 flex items-center justify-between lg:mb-14">
          <h2
            className="font-display font-black leading-none text-white"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
          >
            {t("eventsSection.heading")} <span className="text-grad">{t("eventsSection.headingAccent")}</span>
          </h2>
          {/* Desktop only */}
          <span className="hidden sm:block"><SeeAll /></span>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal mode="left" amount={0.15} className="h-full">
            <NewsFeat item={featured} />
          </Reveal>

          <Stagger className="flex h-full flex-col gap-3" stagger={0.1} amount={0.1}>
            {rest.map((item) => (
              <StaggerItem key={item.id} mode="right" className="flex flex-1 flex-col">
                <NewsRow item={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Mobile: button below list */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to={`${ROUTES.EVENTS}#news`}
            className="inline-flex items-center justify-center rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-10 py-3 text-[14px] font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            {t("eventsSection.seeAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
