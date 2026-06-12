import { type ScienceActivity } from "../../model";

export function ActivityCard({
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
      <p className="text-[14px] leading-snug text-subtle sm:text-[15px]">
        {activity.description}
      </p>
    </article>
  );
}
