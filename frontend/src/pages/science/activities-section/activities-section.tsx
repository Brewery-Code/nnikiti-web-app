import { useMemo, useState } from "react";
import { Reveal } from "@/shared/ui";
import {
  labelsByStatus,
  STATUS_KEYS,
  type SciencePageData,
  type ScienceLabels,
  type SelectOption,
} from "../model";
import { ActivityCard, CalendarPopover, FilterSelect } from "./ui";

export function ActivitiesSection({
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
              fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
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
