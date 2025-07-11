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
  const [{ value, before, after }, setParsed] = useState(() =>
    parseTitle(title)
  );
  const animationRef = useRef<number | null>(null);

  const [isElementVisible, setIsElementVisible] = useState<boolean>();
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setParsed(parseTitle(title));
  }, [title]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (start_value === undefined) return;
        setIsElementVisible(true);
        observer.disconnect();

        const start = start_value ?? 0;
        const end = value;
        const duration = 4000;
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

  return (
    <div
      className={clsx(
        className,
        "flex flex-col items-center justify-center p-4 rounded-xl text-black text-center cursor-pointer transition-colors duration-400 hover:bg-white"
      )}
      style={{
        boxShadow: "0 0 10px 2px rgba(256, 256, 256, 0.7)",
      }}
      ref={blockRef}
    >
      <div className="text-4xl lg:text-5xl xl:text-6xl leading-9 sm:leading-10 lg:leading-12 xl:leading-14 font-bold">
        {start_value !== null ? before + current + after : title}
      </div>
      <p className="text-base lg:text-xl xl:text-2xl leading-4 lg:leading-6 font-bold">
        {subtitle}
      </p>
    </div>
  );
}
