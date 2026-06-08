import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../hero-section/locales";

type TimelineEvent = { year: string; title: string; description: string; tag: string };

const TAG_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  default: {
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.3)",
    color: "rgba(167,139,250,0.9)",
  },
  green: {
    bg: "rgba(34,197,94,0.10)",
    border: "rgba(34,197,94,0.28)",
    color: "rgba(74,222,128,0.9)",
  },
  blue: {
    bg: "rgba(59,130,246,0.10)",
    border: "rgba(59,130,246,0.28)",
    color: "rgba(96,165,250,0.9)",
  },
};

const TAG_COLOR_MAP: Record<string, keyof typeof TAG_COLORS> = {
  "Кафедра ОТ": "blue",
  "Dept. CT": "blue",
  "Кафедра КНПМ": "green",
  "Dept. CSAM": "green",
  "Кафедра КТЕК": "blue",
  "Dept. CTEK": "blue",
};

function getTagStyle(tag: string) {
  const key = TAG_COLOR_MAP[tag] ?? "default";
  return TAG_COLORS[key];
}

function EventCard({
  event,
  align,
}: {
  event: TimelineEvent;
  align: "left" | "right";
}) {
  const tagStyle = getTagStyle(event.tag);
  return (
    <div
      className={clsx(
        "rounded-[18px] border p-5 transition-all duration-200 hover:border-violet-500/20 hover:bg-violet-500/[0.04]",
        align === "right" && "text-right"
      )}
      style={{
        background: "rgba(255,255,255,0.025)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      <div
        className={clsx(
          "mb-3 flex items-center gap-2 flex-wrap",
          align === "right" && "justify-end"
        )}
      >
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]"
          style={{
            background: tagStyle.bg,
            border: `1px solid ${tagStyle.border}`,
            color: tagStyle.color,
          }}
        >
          {event.tag}
        </span>
        <span
          className="font-display font-black leading-none"
          style={{
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "-0.04em",
          }}
        >
          {event.year}
        </span>
      </div>
      <h3
        className="font-display font-bold text-white/90 mb-2"
        style={{ fontSize: "0.95rem", letterSpacing: "-0.02em", lineHeight: 1.35 }}
      >
        {event.title}
      </h3>
      <p className="text-[13px] leading-snug text-white/40">{event.description}</p>
    </div>
  );
}

export default function TimelineSection({ className }: { className?: string }) {
  useLoadNamespace("history", loadTranslations);
  const { t } = useTranslation("history");

  const events = t("timeline.events", { returnObjects: true }) as TimelineEvent[];

  return (
    <section className={clsx("py-12 sm:py-16 lg:py-20", className)}>
      <div className="container-v2">
        <Reveal mode="up" className="mb-14 lg:mb-20 text-center">
          <h2
            className="font-display font-black text-primary"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
          >
            {t("timeline.title")}{" "}
            <span className="text-grad">{t("timeline.titleAccent")}</span>
          </h2>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* Mobile vertical line — left edge of dot column */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 md:hidden"
            style={{
              left: 11,
              width: 1,
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 4%, rgba(255,255,255,0.08) 96%, transparent)",
            }}
          />
          {/* Desktop vertical line — true center */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 hidden md:block"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: 1,
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 4%, rgba(255,255,255,0.08) 96%, transparent)",
            }}
          />

          {Array.isArray(events) &&
            events.map((event, i) => {
              const isRight = i % 2 !== 0;
              return (
                <Reveal key={i} mode="up" amount={0.15}>
                  {/* ── Mobile layout ── */}
                  <div className="grid grid-cols-[24px_1fr] gap-0 md:hidden py-2">
                    <div className="flex justify-center pt-[22px]">
                      <div
                        className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                        style={{
                          background: "#8b5cf6",
                          boxShadow: "0 0 8px rgba(139,92,246,0.55)",
                        }}
                      />
                    </div>
                    <div className="pl-4 pb-6">
                      <EventCard event={event} align="left" />
                    </div>
                  </div>

                  {/* ── Desktop layout — alternating ── */}
                  <div className="hidden md:grid grid-cols-[1fr_40px_1fr] items-start py-5">
                    {/* Left card */}
                    <div className="flex justify-end pr-8">
                      {!isRight && (
                        <div className="w-full max-w-[420px]">
                          <EventCard event={event} align="right" />
                        </div>
                      )}
                    </div>

                    {/* Dot */}
                    <div className="flex justify-center pt-[22px]">
                      <div
                        className="h-3 w-3 flex-shrink-0 rounded-full relative z-10"
                        style={{
                          background: "#8b5cf6",
                          boxShadow: "0 0 10px rgba(139,92,246,0.65)",
                        }}
                      />
                    </div>

                    {/* Right card */}
                    <div className="pl-8">
                      {isRight && (
                        <div className="w-full max-w-[420px]">
                          <EventCard event={event} align="left" />
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
        </div>
      </div>
    </section>
  );
}
