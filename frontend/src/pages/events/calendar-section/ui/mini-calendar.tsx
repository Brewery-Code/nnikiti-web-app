import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { EVENT_TYPE_META, type CalendarEvent } from "../../events-data";
import { daysInMonth, monFirstDay, toDateStr } from "../../lib";

export function MiniCalendar({ year, month, events, selected, onSelect, onPrev, onNext, months, daysShort }: {
  year: number; month: number; events: CalendarEvent[];
  selected: string | null; onSelect: (d: string) => void; onPrev: () => void; onNext: () => void;
  months: string[]; daysShort: string[];
}) {
  const { t } = useTranslation("events-page");
  const offset = monFirstDay(year, month);
  const total = daysInMonth(year, month);
  const cells: Array<number | null> = [...Array.from({ length: offset }, () => null), ...Array.from({ length: total }, (_, i) => i + 1)];
  const eventsOnDay = (day: number) => events.filter((e) => e.date === toDateStr(year, month, day));
  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
  const isToday = (day: number) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  const isPast = (day: number) => toDateStr(year, month, day) < todayStr;

  return (
    <div className="grad-border select-none rounded-[20px] bg-surface p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={onPrev} aria-label={t("prevMonth")} className="flex h-9 w-9 items-center justify-center rounded-full text-primary/60 transition hover:bg-surface-xl hover:text-primary">‹</button>
        <span className="font-display text-[15px] font-bold text-primary">{months[month]} {year}</span>
        <button onClick={onNext} aria-label={t("nextMonth")} className="flex h-9 w-9 items-center justify-center rounded-full text-primary/60 transition hover:bg-surface-xl hover:text-primary">›</button>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1">
        {daysShort.map((d) => <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-subtle">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const dateStr = toDateStr(year, month, day);
          const dayEvents = eventsOnDay(day);
          const isSelected = selected === dateStr;
          return (
            <button key={dateStr} onClick={() => onSelect(isSelected ? "" : dateStr)}
              className={clsx("relative flex flex-col items-center rounded-[10px] py-1.5 text-[12px] font-medium transition-all duration-150",
                isSelected ? "bg-gradient-to-br from-violet-500 to-blue-500 text-primary"
                  : isToday(day) ? "ring-2 ring-violet-500 ring-offset-1 ring-offset-[#0e0f1a] font-bold text-primary"
                    : "text-muted hover:bg-surface-lg hover:text-primary")}>
              {day}
              {dayEvents.length > 0 && (
                <div className="mt-0.5 flex gap-[3px]">
                  {dayEvents.slice(0, 3).map((ev, i) => (
                    <span key={i} aria-hidden className="h-1 w-1 rounded-full"
                      style={{ background: isSelected ? "#fff" : isPast(day) ? "rgba(255,255,255,0.25)" : (EVENT_TYPE_META[ev.type]?.accent ?? "#8b5cf6") }} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
