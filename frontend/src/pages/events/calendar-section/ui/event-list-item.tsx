import { Link } from "react-router-dom";
import { EVENT_TYPE_META, type CalendarEvent } from "../../events-data";

export function EventListItem({ event, months }: { event: CalendarEvent; months: string[] }) {
  const meta = EVENT_TYPE_META[event.type];
  return (
    <Link to={`/news/${event.slug ?? event.id}`} className="grad-border card-hover flex gap-4 rounded-[16px] bg-surface p-4 backdrop-blur-xl">
      <div className="flex w-14 flex-shrink-0 flex-col items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500/20 to-blue-500/20 py-2 text-center">
        <span className="text-[10px] font-bold uppercase text-subtle">{(months[parseInt(event.date.split("-")[1]) - 1] ?? "").slice(0, 3)}</span>
        <span className="text-grad font-display text-xl font-extrabold leading-none">{parseInt(event.date.split("-")[2])}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="font-display rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] text-violet-200">{event.categoryName || meta.label}</span>
          <span className="text-[11px] text-subtle">{[event.time, event.location].filter(Boolean).join(" · ")}</span>
        </div>
        <p className="font-display truncate text-[15px] font-semibold text-primary">{event.title}</p>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-primary/50">{event.description}</p>
      </div>
    </Link>
  );
}
