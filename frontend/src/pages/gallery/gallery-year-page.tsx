import { useParams, Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { ALL_PHOTOS, GALLERY_YEARS } from "@/shared/model/gallery-data";
import { ROUTES } from "@/shared/model/routes";
import { BackButton } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { PhotoGrid, InnerPageLayout } from "./ui";
import { loadTranslations } from "./locales";

function GalleryYearPage() {
  useLoadNamespace("gallery", loadTranslations);
  const { t } = useTranslation("gallery");
  const { year } = useParams<{ year: string }>();
  const numYear = Number(year);
  const photos = ALL_PHOTOS.filter((p) => p.year === numYear);

  if (
    !GALLERY_YEARS.includes(numYear as (typeof GALLERY_YEARS)[number]) ||
    photos.length === 0
  ) {
    return (
      <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
        <div className="pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
          <div className="container-v2">
            <BackButton to={ROUTES.GALLERY} label={t("yearPage.back")} />
            <p className="font-display mt-10 text-[18px] text-subtle">
              {t("yearPage.notFound", { year })}
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
        backLabel={t("yearPage.back")}
        eyebrow={t("yearPage.eyebrow")}
        title={t("yearPage.title", { year: numYear })}
        count={photos.length}
      >
        <div className="mb-10 flex flex-wrap gap-2">
          {GALLERY_YEARS.map((y) => (
            <Link
              key={y}
              to={`/gallery/year/${y}`}
              className={clsx(
                "rounded-full px-5 py-2 text-[14px] font-bold transition-all duration-200",
                y === numYear
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                  : "grad-border bg-surface-md text-muted backdrop-blur-md hover:bg-surface-xl hover:text-primary"
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
