import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { publicRqClient } from "@/shared/api/instance";
import type { components } from "@/shared/api/schema/generated";
import { type CalendarEvent } from "../events-data";
import { categoryToType, stripMarkdown } from "../lib";
import { SectionTitle } from "../ui";
import { EventListItem, MiniCalendar } from "./ui";

type ApiEvent = components["schemas"]["Events"];

const ALL_TYPES = "all";

export function CalendarSection() {
  const { t } = useTranslation("events-page");
  const rawMonths = t("months", { returnObjects: true });
  const months: string[] = Array.isArray(rawMonths) ? rawMonths : [];
  const rawDays = t("daysShort", { returnObjects: true });
  const daysShort: string[] = Array.isArray(rawDays) ? rawDays : [];

  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [selected, setSelected] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>(ALL_TYPES);

  const { data: apiEventsRaw } = publicRqClient.useQuery("get", "/events/", {});

  const apiCalendarEvents: CalendarEvent[] = ((apiEventsRaw ?? []) as ApiEvent[])
    .filter((e) => !!e.event_date && !!e.title)
    .map((e) => ({
      id: e.id ?? 0,
      slug: e.slug,
      title: e.title ?? "",
      type: categoryToType(e.category?.name),
      date: (e.event_date as string).slice(0, 10),
      time: "",
      location: e.location ?? "",
      description: stripMarkdown(e.body),
      categoryName: e.category?.name ?? "",
    }));

  const availableCategories = Array.from(
    new Map(
      ((apiEventsRaw ?? []) as ApiEvent[])
        .filter((e) => !!e.category?.name)
        .map((e) => [e.category!.name, e.category!])
    ).values()
  );

  const changeMonth = (delta: number) => {
    setMonth((m) => {
      const nm = m + delta;
      if (nm < 0) { setYear((y) => y - 1); return 11; }
      if (nm > 11) { setYear((y) => y + 1); return 0; }
      return nm;
    });
    setSelected(null);
  };

  const visibleEvents = apiCalendarEvents
    .filter((e) => categoryFilter === ALL_TYPES || e.categoryName === categoryFilter)
    .filter((e) => {
      if (selected) return e.date === selected;
      const [ey, em] = e.date.split("-").map(Number);
      return ey === year && em - 1 === month;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section id="calendar" className="scroll-mt-24 py-8 sm:py-14 lg:py-20">
      <div className="container-v2">
        <SectionTitle title={t("calendarTitle")} highlight={t("calendarHighlight")} />
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[340px_1fr]">
          <div className="flex flex-col gap-4">
            <MiniCalendar year={year} month={month} events={apiCalendarEvents} selected={selected}
              onSelect={setSelected} onPrev={() => changeMonth(-1)} onNext={() => changeMonth(1)}
              months={months} daysShort={daysShort} />
            {availableCategories.length > 0 && (
              <div className="grad-border rounded-[18px] bg-surface p-4 backdrop-blur-xl">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">{t("eventTypeLabel")}</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setCategoryFilter(ALL_TYPES)}
                    className={clsx("rounded-full border px-3 py-1 text-[11px] font-semibold transition",
                      categoryFilter === ALL_TYPES ? "border-transparent bg-gradient-to-r from-violet-500 to-blue-500 text-primary" : "border-ui text-muted hover:border-white/30 hover:text-primary")}>
                    {t("allFilter")}
                  </button>
                  {availableCategories.map((cat) => (
                    <button key={cat.name} onClick={() => setCategoryFilter(cat.name!)}
                      className={clsx("rounded-full border px-3 py-1 text-[11px] font-semibold transition",
                        categoryFilter === cat.name ? "border-transparent bg-gradient-to-r from-violet-500 to-blue-500 text-primary" : "border-ui text-muted hover:border-white/30 hover:text-primary")}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {selected && (
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-muted">
                  {t("eventsOn")} <span className="font-semibold text-primary">{parseInt(selected.split("-")[2])} {months[parseInt(selected.split("-")[1]) - 1]}</span>
                </p>
                <button onClick={() => setSelected(null)} className="text-[11px] text-violet-300 transition hover:text-primary">{t("showAll")}</button>
              </div>
            )}
            {visibleEvents.length === 0 ? (
              <div className="grad-border flex h-48 items-center justify-center rounded-[18px] bg-surface text-[14px] text-subtle backdrop-blur-xl">
                {t("noEventsDay")}
              </div>
            ) : (
              visibleEvents.map((ev) => <EventListItem key={ev.id} event={ev} months={months} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
