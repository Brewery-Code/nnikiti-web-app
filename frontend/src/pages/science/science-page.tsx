import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { loadTranslations } from "./locales";

export type SciencePageKind =
  | "publications"
  | "research"
  | "conferences"
  | "grants";

type ActivityStatusKey = "open" | "upcoming" | "completed";

type ScienceActivity = {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  theme: string;
  location: string;
  status: ActivityStatusKey;
  statusLabel: string;
  organizer: string;
  tags: string[];
};

type SciencePageData = {
  eyebrow: string;
  title: string;
  gradientTitle: string;
  intro: string;
  heroImage: string;
  activitiesTitle: string;
  activitiesIntro: string;
  activities: ScienceActivity[];
};

type ScienceLabels = {
  navPublications: string;
  navResearch: string;
  navConferences: string;
  navGrants: string;
  activities: string;
  results: string;
  search: string;
  searchPlaceholder: string;
  date: string;
  theme: string;
  status: string;
  all: string;
  reset: string;
  location: string;
  organizer: string;
  noResultsTitle: string;
  noResultsText: string;
};

const PAGE_HERO_IMAGE: Record<SciencePageKind, string> = {
  publications: "/images/students-event.jpg",
  research: "/images/noosphere-workshop.jpg",
  conferences: "/images/students-stage.jpg",
  grants: "/images/students-workshop.jpg",
};

const ACTIVITY_META: Record<
  SciencePageKind,
  Array<{ date: string; status: ActivityStatusKey }>
> = {
  publications: [
    { date: "2026-05-12", status: "open" },
    { date: "2026-06-03", status: "upcoming" },
    { date: "2026-04-18", status: "completed" },
    { date: "2026-05-28", status: "open" },
  ],
  research: [
    { date: "2026-05-07", status: "open" },
    { date: "2026-05-21", status: "upcoming" },
    { date: "2026-04-09", status: "completed" },
    { date: "2026-06-10", status: "upcoming" },
  ],
  conferences: [
    { date: "2026-05-15", status: "open" },
    { date: "2026-05-30", status: "upcoming" },
    { date: "2026-04-16", status: "completed" },
    { date: "2026-06-18", status: "open" },
  ],
  grants: [
    { date: "2026-05-05", status: "open" },
    { date: "2026-05-23", status: "upcoming" },
    { date: "2026-04-12", status: "completed" },
    { date: "2026-06-07", status: "open" },
  ],
};

const NAV_ITEMS = [
  {
    kind: "publications",
    route: ROUTES.SCIENCE_PUBLICATIONS,
    labelKey: "common.navPublications",
  },
  {
    kind: "research",
    route: ROUTES.SCIENCE_RESEARCH,
    labelKey: "common.navResearch",
  },
  {
    kind: "conferences",
    route: ROUTES.SCIENCE_CONFERENCES,
    labelKey: "common.navConferences",
  },
  {
    kind: "grants",
    route: ROUTES.SCIENCE_GRANTS,
    labelKey: "common.navGrants",
  },
] satisfies Array<{ kind: SciencePageKind; route: string; labelKey: string }>;

const STATUS_KEYS = ["open", "upcoming", "completed"];

const MONTH_UA = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];
const DAY_UA = ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"];

function ScienceHero({
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
            fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
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
          style={{ lineHeight: 1.7 }}
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

function ActivityCard({
  activity,
  dateLocale,
}: {
  activity: ScienceActivity;
  dateLocale: string;
}) {
  const formattedDate = new Intl.DateTimeFormat(dateLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${activity.date}T12:00:00`));

  return (
    <article className="grad-border card-hover group relative overflow-hidden rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: "radial-gradient(circle, rgba(166,132,255,0.30) 0%, transparent 70%)" }}
      />

      {/* Author + date */}
      <div className="mb-3 flex items-center gap-2 text-[12px] text-subtle">
        <span className="font-medium">{activity.author}</span>
        <span className="text-primary/15">·</span>
        <span>{formattedDate}</span>
      </div>

      {/* Title */}
      <h3
        className="font-display mb-2 font-bold text-primary"
        style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)", letterSpacing: "-0.025em", lineHeight: 1.3 }}
      >
        {activity.title}
      </h3>

      {/* Subtitle */}
      <p className="text-[14px] leading-relaxed text-subtle sm:text-[15px]">
        {activity.description}
      </p>
    </article>
  );
}

type SelectOption = { value: string; label: string };

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const selected = options.find((o) => o.value === value);
  const isFiltered = value !== "";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "flex h-11 items-center gap-2 rounded-[12px] border px-4 text-[14px] font-medium transition-all duration-200",
          open
            ? "border-violet-500/40 bg-violet-500/[0.12] text-primary"
            : isFiltered
              ? "border-violet-500/30 bg-violet-500/[0.08] text-violet-200"
              : "border-ui bg-surface-md text-muted hover:border-white/15 hover:text-primary"
        )}
      >
        <span className="max-w-[140px] truncate">{isFiltered ? selected?.label : label}</span>
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className={clsx("flex-shrink-0 transition-transform duration-200", open ? "rotate-180 text-violet-400" : "text-subtle")}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={clsx(
          "absolute top-[calc(100%+6px)] left-0 z-[100] min-w-[200px] overflow-hidden rounded-[14px] border border-white/[0.07] shadow-[0_24px_56px_rgba(0,0,0,0.9)] transition-all duration-150 origin-top-left",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
        style={{ backgroundColor: "#0f1019", backdropFilter: "none" }}
      >
        <div className="h-px bg-gradient-to-r from-violet-500/50 via-blue-500/25 to-transparent" />
        <div className="flex flex-col p-1.5">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => { onChange(option.value); setOpen(false); }}
                className={clsx(
                  "flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition-colors duration-100",
                  isSelected
                    ? "bg-violet-500/[0.14] text-primary"
                    : "text-primary/50 hover:bg-surface-md hover:text-primary"
                )}
              >
                <span className={clsx("w-3.5 flex-shrink-0 text-[11px] font-bold leading-none", isSelected ? "text-violet-400" : "text-transparent")}>✓</span>
                <span className={clsx("truncate", isSelected && "font-semibold")}>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CalendarPopover({
  placeholder,
  value,
  onChange,
  fromDate,
  toDate,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  fromDate: string;
  toDate: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const init = value ? new Date(value + "T12:00:00") : today;
  const [viewYear, setViewYear] = useState(init.getFullYear());
  const [viewMonth, setViewMonth] = useState(init.getMonth());

  useEffect(() => {
    if (open && value) {
      const d = new Date(value + "T12:00:00");
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onPD(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPD);
    return () => document.removeEventListener("pointerdown", onPD);
  }, [open]);

  function toStr(y: number, m: number, d: number) {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const displayText = value
    ? new Intl.DateTimeFormat("uk-UA", { day: "numeric", month: "short" }).format(new Date(value + "T12:00:00"))
    : placeholder;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "flex h-11 items-center gap-2 rounded-[12px] border px-4 text-[14px] font-medium transition-all duration-200",
          open
            ? "border-violet-500/40 bg-violet-500/[0.12] text-primary"
            : value
              ? "border-violet-500/30 bg-violet-500/[0.08] text-violet-200"
              : "border-ui bg-surface-md text-muted hover:border-white/15 hover:text-primary"
        )}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 opacity-50">
          <rect x="1" y="2.5" width="10" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M1 6h10" stroke="currentColor" strokeWidth="1.3" />
          <path d="M4 1v3M8 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span className="min-w-[44px] text-center">{displayText}</span>
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className={clsx("flex-shrink-0 transition-transform duration-200", open ? "rotate-180 text-violet-400" : "text-subtle")}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={clsx(
          "absolute top-[calc(100%+6px)] left-0 z-[200] w-[264px] overflow-hidden rounded-[18px] border border-ui shadow-[0_32px_64px_rgba(0,0,0,0.95)] transition-all duration-150 origin-top-left",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
        style={{ backgroundColor: "#0c0d15", backdropFilter: "none" }}
      >
        <div className="h-px bg-gradient-to-r from-violet-500/60 via-blue-500/30 to-transparent" />

        <div className="flex items-center justify-between px-3 pt-3 pb-2">
          <button type="button" onClick={prevMonth} className="flex h-7 w-7 items-center justify-center rounded-[8px] text-subtle transition-colors hover:bg-surface-lg hover:text-primary/80">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-[14px] font-bold text-primary/80">{MONTH_UA[viewMonth]} {viewYear}</span>
          <button type="button" onClick={nextMonth} className="flex h-7 w-7 items-center justify-center rounded-[8px] text-subtle transition-colors hover:bg-surface-lg hover:text-primary/80">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 px-2.5 pb-1">
          {DAY_UA.map((d) => (
            <div key={d} className="flex items-center justify-center py-1 text-[10px] font-bold uppercase tracking-wider text-primary/20">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px px-2.5 pb-2">
          {cells.map((day, i) => {
            if (!day) return <div key={i} className="aspect-square" />;
            const dayStr = toStr(viewYear, viewMonth, day);
            const isSelected = value === dayStr;
            const isToday = todayStr === dayStr;
            const inRange = !!(fromDate && toDate && dayStr > fromDate && dayStr < toDate);
            return (
              <button
                key={i}
                type="button"
                onClick={() => { onChange(dayStr); setOpen(false); }}
                className={clsx(
                  "flex aspect-square items-center justify-center rounded-[8px] text-[14px] font-medium transition-colors duration-100",
                  isSelected
                    ? "bg-gradient-to-br from-violet-500 to-blue-500 font-bold text-primary shadow-[0_2px_10px_rgba(139,92,246,0.5)]"
                    : inRange
                      ? "bg-violet-500/[0.15] text-violet-200 hover:bg-violet-500/[0.25]"
                      : "text-primary/60 hover:bg-surface-lg hover:text-primary",
                  isToday && !isSelected && "ring-1 ring-inset ring-violet-500/50 text-primary/90"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-ui-sm px-4 py-2.5">
          <button
            type="button"
            onClick={() => { onChange(""); setOpen(false); }}
            className="text-[12px] text-subtle transition-colors hover:text-primary/60"
          >
            Очистити
          </button>
          <button
            type="button"
            onClick={() => { onChange(todayStr); setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); setOpen(false); }}
            className="text-[12px] font-semibold text-violet-400 transition-colors hover:text-violet-300"
          >
            Сьогодні
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivitiesSection({
  data,
  labels,
  dateLocale,
}: {
  data: SciencePageData;
  labels: ScienceLabels;
  dateLocale: string;
}) {
  const [search, setSearch] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateTo, setSelectedDateTo] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const themeOptions = useMemo<SelectOption[]>(
    () => [
      { value: "", label: labels.all },
      ...Array.from(new Set(data.activities.map((a) => a.theme))).map((t) => ({ value: t, label: t })),
    ],
    [data.activities, labels.all]
  );

  const statusOptions = useMemo<SelectOption[]>(
    () => [
      { value: "", label: labels.all },
      ...STATUS_KEYS.map((s) => ({
        value: s,
        label: labelsByStatus(s, data.activities),
      })),
    ],
    [data.activities, labels.all]
  );

  const filteredActivities = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return data.activities.filter((activity) => {
      const matchesSearch =
        !normalizedSearch ||
        [activity.title, activity.description, activity.theme, activity.location, activity.organizer, activity.statusLabel, ...activity.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesDate =
        (!selectedDateFrom || activity.date >= selectedDateFrom) &&
        (!selectedDateTo || activity.date <= selectedDateTo);
      const matchesTheme = !selectedTheme || activity.theme === selectedTheme;
      const matchesStatus = !selectedStatus || activity.status === selectedStatus;
      return matchesSearch && matchesDate && matchesTheme && matchesStatus;
    });
  }, [data.activities, search, selectedDateFrom, selectedDateTo, selectedTheme, selectedStatus]);

  const hasActiveFilters = !!(search || selectedDateFrom || selectedDateTo || selectedTheme || selectedStatus);

  function resetFilters() {
    setSearch("");
    setSelectedDateFrom("");
    setSelectedDateTo("");
    setSelectedTheme("");
    setSelectedStatus("");
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" delay={0.55} inView={false} className="mb-10 lg:mb-14">
          <h2
            className="font-display font-black text-primary"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {data.activitiesTitle}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
            {data.activitiesIntro}
          </p>
        </Reveal>

        <div className="grad-border relative z-10 mb-8 rounded-[22px] bg-surface p-5 backdrop-blur-xl">
          {/* Search */}
          <div className="relative mb-3">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary/25"
              width="16" height="16" viewBox="0 0 16 16" fill="none"
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="h-12 w-full rounded-[14px] border border-ui bg-surface-md pl-11 pr-4 text-[15px] text-primary placeholder-muted outline-none transition-all duration-200 focus:border-violet-500/40 focus:bg-surface-lg"
            />
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-2">
            <CalendarPopover
              placeholder="від"
              value={selectedDateFrom}
              onChange={setSelectedDateFrom}
              fromDate={selectedDateFrom}
              toDate={selectedDateTo}
            />
            <CalendarPopover
              placeholder="до"
              value={selectedDateTo}
              onChange={setSelectedDateTo}
              fromDate={selectedDateFrom}
              toDate={selectedDateTo}
            />

            <FilterSelect
              label={labels.theme}
              value={selectedTheme}
              options={themeOptions}
              onChange={setSelectedTheme}
            />

            <FilterSelect
              label={labels.status}
              value={selectedStatus}
              options={statusOptions}
              onChange={setSelectedStatus}
            />

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto flex h-11 items-center gap-2 rounded-[12px] border border-ui bg-surface-md px-4 text-[12px] font-semibold text-primary/50 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/[0.08] hover:text-red-300"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {labels.reset}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <Reveal key={activity.id} mode="up" amount={0.15}>
                <ActivityCard
                  activity={activity}
                  dateLocale={dateLocale}
                />
              </Reveal>
            ))
          ) : (
            <div className="grad-border rounded-[20px] bg-surface p-10 text-center backdrop-blur-xl">
              <p className="font-display text-[18px] font-bold text-primary">
                {labels.noResultsTitle}
              </p>
              <p className="mt-2 text-[14px] text-muted">
                {labels.noResultsText}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function labelsByStatus(status: string, activities: ScienceActivity[]) {
  return (
    activities.find((activity) => activity.status === status)?.statusLabel ??
    status
  );
}

export function SciencePage({ kind }: { kind: SciencePageKind }) {
  const { t, i18n } = useTranslation("science");
  const loaded = useLoadNamespace("science", loadTranslations);

  const labels = useMemo(
    () => ({
      navPublications: t("common.navPublications"),
      navResearch: t("common.navResearch"),
      navConferences: t("common.navConferences"),
      navGrants: t("common.navGrants"),
      activities: t("common.activities"),
      results: t("common.results"),
      search: t("common.search"),
      searchPlaceholder: t("common.searchPlaceholder"),
      date: t("common.date"),
      theme: t("common.theme"),
      status: t("common.status"),
      all: t("common.all"),
      reset: t("common.reset"),
      location: t("common.location"),
      organizer: t("common.organizer"),
      noResultsTitle: t("common.noResultsTitle"),
      noResultsText: t("common.noResultsText"),
    }),
    [t, loaded]
  );

  const data = useMemo(() => {
    const heroImage = PAGE_HERO_IMAGE[kind];
    const pageKey = `pages.${kind}`;

    return {
      heroImage,
      eyebrow: t("common.heroEyebrow"),
      title: t(`${pageKey}.title`),
      gradientTitle: t(`${pageKey}.gradientTitle`),
      intro: t(`${pageKey}.intro`),
      activitiesTitle: t(`${pageKey}.activitiesTitle`),
      activitiesIntro: t(`${pageKey}.activitiesIntro`),
      activities: ACTIVITY_META[kind].map((activity, index) => {
        const itemKey = `${pageKey}.activities.${index}`;
        return {
          id: index + 1,
          title: t(`${itemKey}.title`),
          description: t(`${itemKey}.description`),
          author: t(`${itemKey}.author`),
          theme: t(`${itemKey}.theme`),
          location: t(`${itemKey}.location`),
          organizer: t(`${itemKey}.organizer`),
          tags: t(`${itemKey}.tags`).split("|"),
          status: activity.status,
          statusLabel: t(`common.statuses.${activity.status}`),
          date: activity.date,
        };
      }),
    };
  }, [kind, t, loaded]);

  if (!loaded) return null;

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <ScienceHero data={data} currentKind={kind} />
      <div>
        <ActivitiesSection
          data={data}
          labels={labels}
          dateLocale={i18n.language}
        />
      </div>
    </PageTransition>
  );
}
