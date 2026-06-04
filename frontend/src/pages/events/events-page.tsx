import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import clsx from "clsx";
import { PageTransition } from "@/widgets";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";
import {
  EVENT_TYPE_META,
  type CalendarEvent,
  type EventType,
} from "./events-data";

type ApiEvent = components["schemas"]["Events"];

function formatDate(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
}

function stripMarkdown(md?: string | null): string {
  if (!md) return "";
  return md.replace(/[#*_`>\[\]!]/g, "").replace(/\n+/g, " ").trim();
}

const UK_MONTHS = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];
const UK_DAYS_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

function monFirstDay(year: number, month: number): number {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el)
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 88,
      behavior: "smooth",
    });
}


function SectionTitle({
  eyebrow: _eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description?: string;
}) {
  return (
    <Reveal mode="up" className="mb-10 lg:mb-14">
      <h2
        className="font-display font-black text-primary"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
      >
        {title} <span className="text-grad">{highlight}</span>
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
          {description}
        </p>
      )}
    </Reveal>
  );
}

function Hero() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) setTimeout(() => scrollToId(hash), 100);
  }, [location.hash]);

  return (
    <section className="relative overflow-hidden bg-base pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(81,162,255,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Stagger className="container-v2 relative z-[1]" stagger={0.08} delay={0.35} inView={false}>
        <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
            ННІКІТІ
          </span>
          <span className="text-[12px] text-primary/70">Події та новини</span>
        </StaggerItem>

        <StaggerItem
          as="h1"
          mode="up"
          className="font-display font-black text-primary"
          style={{
            fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
          }}
        >
          Події та <span className="text-grad">новини</span>
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]"
        >
          Все, що відбувається в ННІКІТІ — в одному місці. Конференції,
          олімпіади, оголошення, новини та культурні заходи.
        </StaggerItem>

      </Stagger>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#08090f]" />
    </section>
  );
}

function categoryToType(name?: string): EventType {
  const lower = (name ?? "").toLowerCase();
  for (const [type, meta] of Object.entries(EVENT_TYPE_META)) {
    if (meta.label.toLowerCase() === lower) return type as EventType;
  }
  return "conference";
}

function MiniCalendar({
  year,
  month,
  events,
  selected,
  onSelect,
  onPrev,
  onNext,
}: {
  year: number;
  month: number;
  events: CalendarEvent[];
  selected: string | null;
  onSelect: (d: string) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const offset = monFirstDay(year, month);
  const total = daysInMonth(year, month);
  const cells: Array<number | null> = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  const eventsOnDay = (day: number) =>
    events.filter((e) => e.date === toDateStr(year, month, day));

  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isPast = (day: number) => toDateStr(year, month, day) < todayStr;

  return (
    <div className="grad-border select-none rounded-[20px] bg-surface p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onPrev}
          aria-label="Попередній місяць"
          className="flex h-9 w-9 items-center justify-center rounded-full text-primary/60 transition hover:bg-surface-xl hover:text-primary"
        >
          ‹
        </button>
        <span className="font-display text-[15px] font-bold text-primary">
          {UK_MONTHS[month]} {year}
        </span>
        <button
          onClick={onNext}
          aria-label="Наступний місяць"
          className="flex h-9 w-9 items-center justify-center rounded-full text-primary/60 transition hover:bg-surface-xl hover:text-primary"
        >
          ›
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1">
        {UK_DAYS_SHORT.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold uppercase tracking-wider text-subtle"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const dateStr = toDateStr(year, month, day);
          const dayEvents = eventsOnDay(day);
          const isSelected = selected === dateStr;

          return (
            <button
              key={dateStr}
              onClick={() => onSelect(isSelected ? "" : dateStr)}
              className={clsx(
                "relative flex flex-col items-center rounded-[10px] py-1.5 text-[12px] font-medium transition-all duration-150",
                isSelected
                  ? "bg-gradient-to-br from-violet-500 to-blue-500 text-primary"
                  : isToday(day)
                    ? "ring-2 ring-violet-500 ring-offset-1 ring-offset-[#0e0f1a] font-bold text-primary"
                    : "text-muted hover:bg-surface-lg hover:text-primary"
              )}
            >
              {day}
              {dayEvents.length > 0 && (
                <div className="mt-0.5 flex gap-[3px]">
                  {dayEvents.slice(0, 3).map((ev, i) => {
                    const accent = EVENT_TYPE_META[ev.type]?.accent ?? "#8b5cf6";
                    const past = isPast(day);
                    return (
                      <span
                        key={i}
                        aria-hidden
                        className="h-1 w-1 rounded-full"
                        style={{
                          background: isSelected
                            ? "#fff"
                            : past
                              ? "rgba(255,255,255,0.25)"
                              : accent,
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EventListItem({ event }: { event: CalendarEvent }) {
  const meta = EVENT_TYPE_META[event.type];
  return (
    <div className="grad-border card-hover flex gap-4 rounded-[16px] bg-surface p-4 backdrop-blur-xl">
      <div className="flex w-14 flex-shrink-0 flex-col items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500/20 to-blue-500/20 py-2 text-center">
        <span className="text-[10px] font-bold uppercase text-subtle">
          {UK_MONTHS[parseInt(event.date.split("-")[1]) - 1].slice(0, 3)}
        </span>
        <span className="text-grad font-display text-xl font-extrabold leading-none">
          {parseInt(event.date.split("-")[2])}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="font-display rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] text-violet-200">
            {meta.label}
          </span>
          <span className="text-[11px] text-subtle">
            {[event.time, event.location].filter(Boolean).join(" · ")}
          </span>
        </div>
        <p className="font-display truncate text-[15px] font-semibold text-primary">
          {event.title}
        </p>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-primary/50">
          {event.description}
        </p>
      </div>
    </div>
  );
}

const ALL_TYPES = "all";

function CalendarSection() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth());

  const { data: apiEventsRaw } = publicRqClient.useQuery("get", "/events/", {});

  const apiCalendarEvents: CalendarEvent[] = ((apiEventsRaw ?? []) as ApiEvent[])
    .filter((e) => !!e.event_date && !!e.title)
    .map((e) => ({
      id: e.id ?? 0,
      title: e.title ?? "",
      type: categoryToType(e.category?.name),
      date: (e.event_date as string).slice(0, 10),
      time: "",
      location: e.location ?? "",
      description: stripMarkdown(e.body),
    }));

  const [selected, setSelected] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<EventType | typeof ALL_TYPES>(
    ALL_TYPES
  );

  const changeMonth = (delta: number) => {
    setMonth((m) => {
      const nm = m + delta;
      if (nm < 0) {
        setYear((y) => y - 1);
        return 11;
      }
      if (nm > 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return nm;
    });
    setSelected(null);
  };

  const visibleEvents = apiCalendarEvents
    .filter((e) => typeFilter === ALL_TYPES || e.type === typeFilter)
    .filter((e) => {
      if (selected) return e.date === selected;
      const [ey, em] = e.date.split("-").map(Number);
      return ey === year && em - 1 === month;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section id="calendar" className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <SectionTitle
          eyebrow="Календар подій"
          title="Найближчі"
          highlight="події"
        />

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="flex flex-col gap-4">
            <MiniCalendar
              year={year}
              month={month}
              events={apiCalendarEvents}
              selected={selected}
              onSelect={setSelected}
              onPrev={() => changeMonth(-1)}
              onNext={() => changeMonth(1)}
            />

            <div className="grad-border rounded-[18px] bg-surface p-4 backdrop-blur-xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
                Тип події
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTypeFilter(ALL_TYPES)}
                  className={clsx(
                    "rounded-full border px-3 py-1 text-[11px] font-semibold transition",
                    typeFilter === ALL_TYPES
                      ? "border-transparent bg-gradient-to-r from-violet-500 to-blue-500 text-primary"
                      : "border-ui text-muted hover:border-white/30 hover:text-primary"
                  )}
                >
                  Всі
                </button>
                {(Object.keys(EVENT_TYPE_META) as EventType[]).map((type) => {
                  const m = EVENT_TYPE_META[type];
                  const isActive = typeFilter === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={clsx(
                        "rounded-full border px-3 py-1 text-[11px] font-semibold transition",
                        isActive
                          ? "border-transparent bg-gradient-to-r from-violet-500 to-blue-500 text-primary"
                          : "border-ui text-muted hover:border-white/30 hover:text-primary"
                      )}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {selected && (
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-muted">
                  Події на{" "}
                  <span className="font-semibold text-primary">
                    {parseInt(selected.split("-")[2])}{" "}
                    {UK_MONTHS[parseInt(selected.split("-")[1]) - 1]}
                  </span>
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[11px] text-violet-300 transition hover:text-primary"
                >
                  Показати всі ›
                </button>
              </div>
            )}

            {visibleEvents.length === 0 ? (
              <div className="grad-border flex h-48 items-center justify-center rounded-[18px] bg-surface text-[14px] text-subtle backdrop-blur-xl">
                Подій у цей день не заплановано
              </div>
            ) : (
              visibleEvents.map((ev) => <EventListItem key={ev.id} event={ev} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsCard({ item }: { item: ApiEvent }) {
  const image = resolveMediaUrl(item.cover);
  const rgb = item.category?.rgb_color;
  const tagBg = rgb ? `rgba${rgb}` : "rgba(166,132,255,0.85)";

  return (
    <Link
      to={`/news/${item.id}`}
      className="spec-card grad-border group flex h-full flex-col overflow-hidden rounded-[20px] bg-surface backdrop-blur-xl"
    >
      <div className="relative h-60 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={item.title ?? ""}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-500/20 to-blue-500/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-transparent to-transparent" />
        {item.category?.name && (
          <span
            className="font-display absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-primary"
            style={{ background: tagBg }}
          >
            {item.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">
          {formatDate(item.event_date ?? item.created_at)}
        </p>
        <h3
          className="font-display mb-3 line-clamp-3 flex-1 font-bold leading-snug text-primary"
          style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
        >
          {item.title}
        </h3>
        <p className="line-clamp-3 text-[12px] leading-relaxed text-muted">
          {stripMarkdown(item.body)}
        </p>
        <span className="mt-4 self-start text-[12px] font-semibold text-violet-300 transition group-hover:text-primary">
          Читати далі →
        </span>
      </div>
    </Link>
  );
}

function NewsSection() {
  const [visibleCount, setVisibleCount] = useState(3);
  const { data, isPending } = publicRqClient.useQuery("get", "/events/", {});
  const events = ((data ?? []) as ApiEvent[]).filter((e) => !!e.title);

  const visible = events.slice(0, visibleCount);
  const hasMore = visible.length < events.length;

  if (isPending) {
    return (
      <section id="news" className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
        <div className="container-v2">
          <SectionTitle eyebrow="Новини" title="Останні" highlight="новини" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-[20px] bg-surface" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <SectionTitle eyebrow="Новини" title="Останні" highlight="новини" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <Reveal key={item.id} mode="up" amount={0.05} className="h-full">
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + 3)}
              className="grad-border inline-flex items-center gap-2 rounded-[12px] bg-surface-md px-7 py-3 text-[14px] font-semibold text-primary/70 backdrop-blur-md transition-all duration-200 hover:bg-surface-xl hover:text-primary"
            >
              Завантажити ще
              <span aria-hidden className="text-violet-400">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function EventsPage() {
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <Hero />
      <div className="bg-base pb-16 lg:pb-20">
        <CalendarSection />
        <NewsSection />
      </div>
    </PageTransition>
  );
}

export const Component = EventsPage;
