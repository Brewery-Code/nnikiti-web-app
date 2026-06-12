import { type KeyDate } from "./types";

export function DateCard({
  date,
}: {
  date: KeyDate;
  accent?: string;
  index?: number;
}) {
  return (
    <div className="grad-border card-hover flex h-full flex-col rounded-[18px] bg-surface p-6 backdrop-blur-xl">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-400">
        {date.period}
      </span>
      <p className="font-display mt-2 text-[15px] font-semibold text-primary">
        {date.label}
      </p>
      {date.note && <p className="mt-2 flex-1 text-[11px] text-subtle">{date.note}</p>}
      <div className="mt-5 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />
    </div>
  );
}
