import { type Step } from "./types";

export function StepItem({
  step,
  number,
  index,
  total,
}: {
  step: Step;
  number: number;
  accent?: string;
  index?: number;
  total?: number;
}) {
  const isLast = total !== undefined && index === total - 1;
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="font-display flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[15px] font-extrabold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.4)]">
          {number}
        </div>
        {!isLast && <div className="w-px flex-1 bg-gradient-to-b from-violet-500/40 to-blue-500/20" />}
      </div>

      <div className="pb-8">
        <h3
          className="font-display font-bold text-primary"
          style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
        >
          {step.title}
        </h3>
        <p className="mt-2 text-[14px] leading-snug text-muted">
          {step.text}
        </p>
      </div>
    </div>
  );
}
