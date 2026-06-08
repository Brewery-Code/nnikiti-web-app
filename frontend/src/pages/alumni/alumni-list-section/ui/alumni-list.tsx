import { AlumniCard } from "./alumni-card";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";

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
    links?: { [key: string]: string } | undefined;
    readonly major?: string | undefined;
    readonly degree?: string | undefined;
    readonly workplace?: string | undefined;
    readonly position?: string | undefined;
  }[];
  titleText: string;
}) {
  if (!alumniList.length) return null;

  return (
    <div id={year.toString()} className="mt-fluid-2xl">
      <Reveal mode="up" className="mb-6 flex items-center gap-4 sm:mb-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/40 to-blue-500/40" />
        <h3
          className="font-display whitespace-nowrap font-black"
          style={{
            fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {titleText} <span className="text-grad-animated">{year}</span>
        </h3>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-blue-500/40 to-violet-500/40" />
      </Reveal>

      <Stagger
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        stagger={0.08}
        amount={0.1}
      >
        {alumniList.map((alumni, i) => (
          <StaggerItem key={i} mode="up" className="h-full w-full">
            <AlumniCard alumni={alumni} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
