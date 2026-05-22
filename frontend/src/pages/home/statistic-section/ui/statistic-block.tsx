import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

function parseTitle(title?: string) {
  if (!title) return { value: 0, before: "", after: "" };
  const matchValue = title.match(/\d+/);
  const matchBefore = title.match(/^[^\d]+/);
  const matchAfter = title.match(/[^\d]+$/);
  return {
    value: matchValue ? parseInt(matchValue[0]) : 0,
    before: matchBefore ? matchBefore[0] : "",
    after: matchAfter ? matchAfter[0] : "",
  };
}

export default function StatisticBlock({
  className,
  title,
  subtitle = "",
  start_value,
}: {
  className: string;
  title?: string;
  subtitle?: string;
  start_value?: number;
}) {
  const [current, setCurrent] = useState(start_value || null);
  const [{ value, before, after }, setParsed] = useState(() => parseTitle(title));
  const animationRef = useRef<number | null>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setParsed(parseTitle(title));
  }, [title]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (start_value === undefined) return;
        observer.disconnect();

        const start = start_value ?? 0;
        const end = value;
        const duration = 3500;
        const startTime = Date.now();

        function step() {
          const now = Date.now();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = start + (end - start) * easeOut;
          setCurrent(Math.round(currentValue));
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(step);
          }
        }

        step();
      }
    });

    if (blockRef.current) observer.observe(blockRef.current);

    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const isNumeric = start_value !== undefined;

  return (
    <div
      ref={blockRef}
      className={clsx(
        className,
        "group flex cursor-default flex-col items-center justify-center p-fluid-md text-center transition-colors duration-500",
        "border border-[rgba(240,234,224,0.08)] hover:border-[rgba(212,175,122,0.35)]"
      )}
    >
      <div
        className={clsx(
          "font-condensed leading-none",
          isNumeric
            ? "bg-gradient-to-br from-[#F4EFE5] via-[#E2C994] to-[#D4AF7A] bg-clip-text text-fluid-5xl font-light text-transparent"
            : "text-fluid-xl font-light text-[#F4EFE5]"
        )}
      >
        {isNumeric ? before + current + after : title}
      </div>
      {subtitle && (
        <p className="mt-fluid-sm text-fluid-xs font-light uppercase tracking-[0.25em] text-[#8A8273]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
