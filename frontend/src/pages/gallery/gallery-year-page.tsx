import { useParams, Link } from "react-router-dom";
import clsx from "clsx";
import { PageTransition } from "@/widgets";
import { ALL_PHOTOS, GALLERY_YEARS } from "@/shared/model/gallery-data";
import { ROUTES } from "@/shared/model/routes";
import { PhotoGrid, InnerPageLayout } from "./ui";

function GalleryYearPage() {
  const { year } = useParams<{ year: string }>();
  const numYear = Number(year);
  const photos = ALL_PHOTOS.filter((p) => p.year === numYear);

  if (
    !GALLERY_YEARS.includes(numYear as (typeof GALLERY_YEARS)[number]) ||
    photos.length === 0
  ) {
    return (
      <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
        <div className="bg-[#08090f] pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
          <div className="container-v2">
            <Link
              to={ROUTES.GALLERY}
              className="text-[13px] text-white/55 hover:text-white"
            >
              ← Галерея
            </Link>
            <p className="font-display mt-10 text-[18px] text-white/45">
              Фото за {year} рік не знайдено.
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <InnerPageLayout
        backTo={ROUTES.GALLERY}
        backLabel="Галерея"
        eyebrow="Архів ННКІТІ"
        title={`${numYear} рік`}
        count={photos.length}
      >
        <div className="mb-10 flex flex-wrap gap-2">
          {GALLERY_YEARS.map((y) => (
            <Link
              key={y}
              to={`/gallery/year/${y}`}
              className={clsx(
                "rounded-full px-5 py-2 text-[13px] font-bold transition-all duration-200",
                y === numYear
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                  : "grad-border bg-white/[0.04] text-white/55 backdrop-blur-md hover:bg-white/[0.10] hover:text-white"
              )}
            >
              {y}
            </Link>
          ))}
        </div>

        <PhotoGrid photos={photos} />
      </InnerPageLayout>
    </PageTransition>
  );
}

export const Component = GalleryYearPage;
