import { useScrollDownAnimation } from "@/shared/hooks";
import { useRef } from "react";
import { getColor, getYear } from "../alumni-list-section";
import { Title } from "@/shared/ui";
import { AlumniCard } from "./alumni-card";
import clsx from "clsx";

export function AlumniList({
  year,
  alumniList,
  titleText,
}: {
  year: number;
  alumniList: {
    readonly id?: number | undefined;
    readonly full_name?: string | undefined;
    readonly text?: string | undefined;
    readonly image?: string | undefined;
    readonly created_at?: string | undefined;
    readonly date_of_graduation?: string | undefined;
    links?:
      | {
          [key: string]: string;
        }
      | undefined;
    readonly major?: string | undefined;
    readonly degree?: string | undefined;
    readonly workplace?: string | undefined;
    readonly position?: string | undefined;
  }[];
  titleText: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollDownAnimation({
    elementRef: sectionRef,
  });

  return (
    <div ref={sectionRef} id={year.toString()}>
      <div
        className={clsx(
          "relative overflow-hidden before:absolute before:bottom-0 before:h-0.5 before:w-full before:bg-white before:transition-opacity before:duration-600",
          isVisible ? "before:opacity-100" : "before:opacity-0"
        )}
      >
        <Title
          className={`mt-8 text-center transition-[translate,opacity] duration-600 sm:text-start ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
        >
          {titleText} {year}
        </Title>
      </div>
      <div className="mt-4 grid grid-cols-1 place-items-center justify-center gap-8 sm:grid-cols-2 sm:place-items-baseline lg:grid-cols-3 xl:grid-cols-4">
        {alumniList.map((alumni, i) => (
          <AlumniCard
            key={i}
            alumni={alumni}
            color={getColor(getYear(alumni.date_of_graduation))}
          />
        ))}
      </div>
    </div>
  );
}
