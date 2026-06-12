import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { DAY_UA, MONTH_UA } from "../../model";

export function CalendarPopover({
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
