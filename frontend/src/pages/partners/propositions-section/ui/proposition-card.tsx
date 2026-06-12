import { type PartnerProposition, type PartnersLabels } from "../../model";

export function PropositionCard({
  proposition,
  labels,
  dateLocale,
}: {
  proposition: PartnerProposition;
  labels: PartnersLabels;
  dateLocale: string;
}) {
  const formattedDate = new Intl.DateTimeFormat(dateLocale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${proposition.deadline}T12:00:00`));

  return (
    <article className="grad-border card-hover relative grid gap-5 overflow-hidden rounded-[20px] bg-surface p-6 backdrop-blur-xl lg:grid-cols-[1fr_280px] lg:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.22) 0%, transparent 70%)",
        }}
      />

      <div className="relative min-w-0">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="font-display rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-violet-200">
            {proposition.type}
          </span>
          <span className="rounded-full border border-ui bg-surface-md px-3 py-1 text-[10px] font-semibold text-muted">
            {proposition.direction}
          </span>
          <span className="rounded-full border border-ui bg-surface-md px-3 py-1 text-[10px] font-semibold text-muted">
            {proposition.format}
          </span>
        </div>

        <p className="text-grad font-display text-[14px] font-bold">
          {proposition.partner}
        </p>
        <h3
          className="font-display mt-2 font-bold text-primary"
          style={{ fontSize: "1.2rem", letterSpacing: "-0.02em" }}
        >
          {proposition.name}
        </h3>
        <p className="mt-3 text-[14px] leading-snug text-muted">
          {proposition.description}
        </p>

        <div className="mt-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
            {labels.neededSkills}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {proposition.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grad-border relative flex flex-col justify-between gap-5 rounded-[16px] bg-gradient-to-br from-violet-500/[0.10] to-blue-500/[0.06] p-5 backdrop-blur-xl">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
            {labels.deadline}
          </p>
          <p className="text-grad font-display mt-2 text-[20px] font-extrabold">
            {formattedDate}
          </p>
        </div>

        <a
          href={proposition.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 text-[14px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95"
        >
          {labels.moreInfo} <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}
