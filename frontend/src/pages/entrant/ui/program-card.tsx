import { type Program } from "./types";

export function ProgramCard({
  program,
}: {
  program: Program;
  accent?: string;
  index?: number;
}) {
  return (
    <div className="spec-card grad-border group flex flex-col rounded-[20px] bg-surface p-5 backdrop-blur-xl sm:p-7">
      <span
        className="font-display mb-5 self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-primary"
        style={{
          background:
            "linear-gradient(135deg, rgba(166,132,255,0.85) 0%, rgba(81,162,255,0.85) 100%)",
        }}
      >
        {program.code}
      </span>

      <h3
        className="font-display mb-3 font-bold text-primary"
        style={{ fontSize: "1.05rem", letterSpacing: "-0.01em", lineHeight: 1.2 }}
      >
        {program.name}
      </h3>
      <p className="flex-1 text-[14px] leading-snug text-muted">
        {program.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-ui bg-surface-md px-3 py-1 text-[11px] text-muted">
          {program.duration}
        </span>
        {program.seats && (
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] text-violet-200">
            {program.seats}
          </span>
        )}
      </div>
    </div>
  );
}
