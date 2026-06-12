import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { components } from "@/shared/api/schema/generated";
import { getYear } from "../lib";
import { SectionHeader, YearPhotosPreview } from "../ui";

type Album = components["schemas"]["Album"];

export function ByYearSection({ albums }: { albums: Album[] }) {
  const { t } = useTranslation("gallery");
  const years = Array.from(new Set(albums.map((a) => getYear(a.date)).filter(Boolean) as number[])).sort((a, b) => b - a);
  const [activeYear, setActiveYear] = useState<number | null>(years[0] ?? null);

  const yearAlbums = activeYear ? albums.filter((a) => getYear(a.date) === activeYear) : albums;

  if (!years.length) return null;

  return (
    <div>
      <SectionHeader
        eyebrow={t("byYear.eyebrow")}
        title={t("byYear.title")}
        highlight={t("byYear.highlight")}
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={clsx(
              "rounded-full px-5 py-2 text-[14px] font-bold transition-all duration-200",
              activeYear === year
                ? "bg-gradient-to-r from-violet-500 to-blue-500 text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                : "grad-border bg-surface-md text-muted backdrop-blur-md hover:bg-surface-xl hover:text-primary"
            )}
          >
            {year}
          </button>
        ))}
      </div>

      <YearPhotosPreview
        albums={yearAlbums}
        total={6}
        linkTo={activeYear ? `/gallery/year/${activeYear}` : undefined}
      />

      {activeYear && (
        <div className="mt-8 flex justify-start">
          <Link
            to={`/gallery/year/${activeYear}`}
            className="grad-border rounded-full bg-surface-md px-5 py-2 text-[13px] font-semibold text-muted backdrop-blur-md transition-all duration-200 hover:bg-surface-xl hover:text-primary"
          >
            {t("byYear.linkLabel", { year: activeYear })} →
          </Link>
        </div>
      )}
    </div>
  );
}
