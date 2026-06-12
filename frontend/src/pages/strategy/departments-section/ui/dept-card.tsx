import { type DeptItem } from "../../model";

export function DeptCard({ dept, index }: { dept: DeptItem; index: number }) {
  const colors = [
    { accent: "rgba(139,92,246,0.9)", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
    { accent: "rgba(59,130,246,0.9)", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)" },
    { accent: "rgba(16,185,129,0.9)", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.28)" },
    { accent: "rgba(245,158,11,0.9)", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.28)" },
  ];
  const c = colors[index % colors.length];

  return (
    <div
      className="grad-border flex flex-col rounded-[22px] bg-surface p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="mb-5 flex items-center gap-3">
        <span
          className="inline-flex items-center rounded-[10px] px-3 py-1.5 font-display text-[12px] font-black tracking-[0.04em]"
          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.accent }}
        >
          {dept.abbr}
        </span>
        <span className="text-[12px] text-white/35">{dept.name}</span>
      </div>

      <ul className="flex flex-col gap-4">
        {dept.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: c.accent, boxShadow: `0 0 6px ${c.bg}` }}
            />
            <p className="text-[13px] leading-snug text-white/50">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
