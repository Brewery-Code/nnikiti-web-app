import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { type SelectOption } from "../../model";

export function FilterSelect({
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
