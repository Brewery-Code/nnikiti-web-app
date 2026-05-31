import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function Accordion({
  isAccordionOpen,
  onClick,
  title,
  description,
  index,
}: {
  isAccordionOpen: boolean;
  onClick: () => void;
  title?: string;
  description?: string;
  index?: number;
}) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.scrollHeight);
    }
  }, [isAccordionOpen]);

  return (
    <div
      onClick={onClick}
      className="grad-border group relative cursor-pointer overflow-hidden rounded-[18px] bg-surface backdrop-blur-xl transition-all duration-300 active:scale-[0.99] tap-highlight-transparent hover:bg-surface-md"
    >
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/[0.08] to-blue-500/[0.05] transition-opacity duration-300",
          isAccordionOpen ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="flex items-start gap-3 px-5 py-5 sm:gap-5 sm:px-7 sm:py-6">
        {typeof index === "number" && (
          <div
            className={clsx(
              "font-display text-grad flex-shrink-0 font-extrabold transition-opacity duration-300",
              isAccordionOpen ? "opacity-100" : "opacity-30"
            )}
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        )}
        <h3
          className="font-display flex-1 font-bold leading-snug text-primary"
          style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)", letterSpacing: "-0.01em" }}
        >
          {title}
        </h3>
        <span
          aria-hidden
          className={clsx(
            "flex-shrink-0 text-xl text-primary/50 transition-transform duration-300",
            isAccordionOpen ? "rotate-45 text-violet-400" : "group-hover:text-primary/80"
          )}
        >
          +
        </span>
      </div>

      <div
        className="overflow-hidden transition-[height] duration-300 ease-out"
        style={{ height: isAccordionOpen ? descriptionHeight : 0 }}
      >
        <div ref={descriptionRef} className="px-5 pb-5 sm:px-7 sm:pb-6">
          {typeof index === "number" && <div className="ml-0 mb-4 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />}
          <p className="text-[15px] leading-relaxed text-muted sm:text-[17px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
