import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";

type NewsItem = {
  id: number;
  date: string;
  tag: string;
  title: string;
  image: string;
};

const NEWS: NewsItem[] = [
  {
    id: 1,
    date: "28 квіт 2025",
    tag: "Наука",
    title:
      "Студенти НУВГП перемогли на Всеукраїнській олімпіаді з програмування",
    image: "/images/students-lecture.jpg",
  },
  {
    id: 2,
    date: "21 квіт 2025",
    tag: "Партнерство",
    title: "Підписано угоду про співпрацю з провідними IT-компаніями",
    image: "/images/noosphere-workshop.jpg",
  },
  {
    id: 3,
    date: "15 квіт 2025",
    tag: "Освіта",
    title: "Відкрито нову лабораторію штучного інтелекту",
    image: "/images/students-workshop.jpg",
  },
  {
    id: 4,
    date: "10 квіт 2025",
    tag: "Рейтинг",
    title: "НУВГП увійшов до рейтингу найкращих університетів",
    image: "/images/students-stage.jpg",
  },
];

const TAG_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  "Наука":       { bg: "rgba(166,132,255,0.18)", border: "rgba(166,132,255,0.38)", color: "#c4a8ff" },
  "Партнерство": { bg: "rgba(56,189,248,0.15)",  border: "rgba(56,189,248,0.32)",  color: "#7dd3fc" },
  "Освіта":      { bg: "rgba(52,211,153,0.15)",  border: "rgba(52,211,153,0.32)",  color: "#6ee7b7" },
  "Рейтинг":     { bg: "rgba(251,191,36,0.15)",  border: "rgba(251,191,36,0.32)",  color: "#fcd34d" },
  "Подія":       { bg: "rgba(251,113,133,0.15)", border: "rgba(251,113,133,0.32)", color: "#fda4af" },
  "Спорт":       { bg: "rgba(251,146,60,0.15)",  border: "rgba(251,146,60,0.32)",  color: "#fdba74" },
};

const DEFAULT_TAG_COLOR = { bg: "rgba(255,255,255,0.07)", border: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" };

function Pill({ tag }: { tag: string }) {
  const { bg, border, color } = TAG_COLORS[tag] ?? DEFAULT_TAG_COLOR;
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
      {tag}
    </span>
  );
}

function SeeAll() {
  const [h, setH] = useState(false);
  return (
    <Link
      to={`${ROUTES.EVENTS}#news`}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="inline-flex items-center text-[13px] font-semibold uppercase tracking-[0.04em] transition-all duration-150"
      style={{
        gap: h ? 12 : 8,
        color: h ? "#fff" : "rgba(255,255,255,0.4)",
      }}
    >
      Усі новини
      <span style={{ color: h ? "#a684ff" : "rgba(255,255,255,0.3)" }}>↗</span>
    </Link>
  );
}

function NewsFeat({ item }: { item: NewsItem }) {
  return (
    <Link
      to={`${ROUTES.EVENTS}#news`}
      className="group grad-border relative block h-full overflow-hidden rounded-[24px] transition-transform duration-200 active:scale-[0.99]"
    >
      {/* full-bleed image with subtle zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06]"
        style={{ backgroundImage: `url(${item.image})`, willChange: "transform" }}
      />

      {/* gradient overlay — darker at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-[#08090f]/45 to-transparent" />

      {/* spacer that sets card height */}
      <div className="min-h-[360px] sm:min-h-[430px]" />

      {/* bottom content: rests 48 px below natural position so "Читати" is hidden;
          slides to translate-y-0 on hover revealing it */}
      <div className="absolute inset-x-0 bottom-0 translate-y-[48px] p-6 transition-transform duration-300 ease-out group-hover:translate-y-0 sm:p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <Pill tag={item.tag} />
          <span className="text-[11px] text-white/60">{item.date}</span>
        </div>
        <h3
          className="font-display font-bold text-white"
          style={{ fontSize: "1.1rem", letterSpacing: "-0.02em", lineHeight: 1.4 }}
        >
          {item.title}
        </h3>
        <div className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.04em] text-violet-400">
          Читати <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

function NewsRow({ item }: { item: NewsItem }) {
  return (
    <Link
      to={`${ROUTES.EVENTS}#news`}
      className="group flex h-full items-center gap-4 rounded-[16px] p-[18px] transition-all duration-200 hover:border-violet-500/20 hover:bg-violet-500/[0.06] active:scale-[0.98]"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* thumbnail with zoom */}
      <div
        className="flex-shrink-0 overflow-hidden rounded-[12px]"
        style={{ width: 96, height: 76 }}
      >
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.08]"
          style={{ backgroundImage: `url(${item.image})`, willChange: "transform" }}
        />
      </div>

      {/* text */}
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-center gap-2">
          <Pill tag={item.tag} />
          <span className="text-[10px] text-white/55">{item.date}</span>
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
        {/* "Читати" fades + slides up from below on hover */}
        <div className="mt-2 translate-y-1 text-[11px] font-bold uppercase tracking-[0.04em] text-violet-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Читати →
        </div>
      </div>

      <span
        className="flex-shrink-0 text-[15px] transition-colors duration-200 group-hover:text-violet-400"
        style={{ color: "rgba(255,255,255,0.15)" }}
      >
        ›
      </span>
    </Link>
  );
}

export default function EventsSection({ className = "" }: { className?: string }) {
  const featured = NEWS[0];
  const rest = NEWS.slice(1);

  return (
    <section className={clsx("bg-[#0a0b12] py-16 lg:py-24", className)}>
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end lg:mb-14">
          <div>
            <div className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-500">
              — Новини
            </div>
            <h2
              className="font-display font-black leading-none text-white"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Останні <span className="text-grad">події</span>
            </h2>
          </div>
          <SeeAll />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* left: featured card — Reveal passes h-full down */}
          <Reveal mode="left" amount={0.15} className="h-full">
            <NewsFeat item={featured} />
          </Reveal>

          {/* right: three rows stretched to match left card height */}
          <Stagger className="flex h-full flex-col gap-3" stagger={0.1} amount={0.1}>
            {rest.map((item) => (
              <StaggerItem key={item.id} mode="right" className="flex flex-1 flex-col">
                <NewsRow item={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
