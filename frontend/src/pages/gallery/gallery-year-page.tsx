import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { publicRqClient } from "@/shared/api/instance";
import { useLoadNamespace } from "@/shared/hooks";
import { useSeo } from "@/shared/ui";
import { SITE_NAME } from "@/shared/model/seo";
import { AlbumPhotos, InnerPageLayout } from "./ui";
import { loadTranslations } from "./locales";
import type { components } from "@/shared/api/schema/generated";

type Album = components["schemas"]["Album"];

function getYear(dateStr?: string | null): number | null {
  if (!dateStr) return null;
  const y = Number(dateStr.slice(0, 4));
  return isNaN(y) ? null : y;
}

function GalleryYearPage() {
  useLoadNamespace("gallery", loadTranslations);
  const { t } = useTranslation("gallery");
  const { year } = useParams<{ year: string }>();
  const numYear = Number(year);

  useSeo(
    !isNaN(numYear)
      ? {
          title: `Галерея ${numYear} — ${SITE_NAME}`,
          description: `Фотоальбоми подій та заходів ННІКІТІ за ${numYear} рік.`,
        }
      : null,
  );

  const { data, isPending } = publicRqClient.useQuery("get", "/gallery/" as any, {});
  const allAlbums = ((data ?? []) as Album[]).filter((a) => a.status === "PB" || !a.status);
  const yearAlbums = allAlbums.filter((a) => getYear(a.date) === numYear);

  if (isPending) {
    return (
      <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
        <div className="container-v2 pt-32 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="aspect-square animate-pulse rounded-[14px] bg-surface" />
          ))}
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
        count={yearAlbums.length}
      >
        {yearAlbums.length === 0 ? (
          <p className="font-display text-[18px] text-subtle">
            {t("yearPage.notFound", { year })}
          </p>
        ) : (
          <>
            {/* Mobile: masonry via CSS columns */}
            <div className="columns-2 gap-2 sm:hidden">
              {yearAlbums.map((album) => (
                <div key={album.id} className="mb-2 break-inside-avoid">
                  <AlbumPhotos albumId={album.id!} square={false} />
                </div>
              ))}
            </div>
            {/* sm+: grid */}
            <div className="hidden grid-cols-3 gap-3 sm:grid lg:grid-cols-4">
              {yearAlbums.map((album) => (
                <AlbumPhotos key={album.id} albumId={album.id!} />
              ))}
            </div>
          </>
        )}
      </InnerPageLayout>
    </PageTransition>
  );
}

export const Component = GalleryYearPage;
