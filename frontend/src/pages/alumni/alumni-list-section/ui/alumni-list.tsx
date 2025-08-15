import { useScrollDownAnimation } from "@/shared/hooks";
import { useRef } from "react";
import { getColor, getYear } from "../alumni-list-section";
import { Title } from "@/shared/ui";
import { AlumniCard } from "./alumni-card";

export function AlumniList({
  year,
  alumniList,
  titleText,
}: {
  year: number;
  alumniList: any[];
  titleText: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollDownAnimation({ elementRef: sectionRef });

  return (
    <div ref={sectionRef} id={year.toString()}>
      <div
        className={`overflow-hidden relative before:absolute before:bottom-0 before:w-full before:h-0.5 before:bg-white
          before:transition-opacity before:duration-600 ${isVisible ? "before:opacity-100" : "before:opacity-0"}`}
      >
        <Title
          className={`mt-8 transition-[translate,opacity] duration-600 text-center sm:text-start ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
        >
          {titleText} {year}
        </Title>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center place-items-center sm:place-items-baseline gap-8 mt-4">
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
