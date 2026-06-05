import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { BackButton } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { PhotoGrid, InnerPageLayout } from "./ui";
import { loadTranslations } from "./locales";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";
import type { Photo } from "@/shared/model/gallery-data";

type AlbumDetail = components["schemas"]["AlbumDetail"];

function GalleryEventPage() {
  useLoadNamespace("gallery", loadTranslations);
  const { t } = useTranslation("gallery");
  const { eventId } = useParams<{ eventId: string }>();
  const numId = Number(eventId);

  const { data, isPending, isError } = publicRqClient.useQuery(
    "get",
    "/gallery/{id}/",
    { params: { path: { id: numId } } },
  );

  if (isError) return <Navigate to={ROUTES.GALLERY} replace />;

  if (isPending) {
    return (
      <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
        <div className="relative h-[260px] animate-pulse bg-surface sm:h-[340px]" />
        <div className="container-v2 mt-10 flex flex-col gap-4">
          {[1, 0.8, 0.9].map((w, i) => (
            <div key={i} className="h-5 animate-pulse rounded-full bg-surface-md" style={{ width: `${w * 100}%` }} />
          ))}
        </div>
      </PageTransition>
    );
  }

  const album = data as AlbumDetail;
  const cover = resolveMediaUrl(album.cover);

  const photos: Photo[] = (album.photos ?? []).map((p, i) => ({
    id: String(p.id ?? i),
    src: resolveMediaUrl(p.image) ?? "",
    alt: album.title ?? "",
    year: album.date ? new Date(album.date).getFullYear() : 0,
    eventId: String(album.id ?? ""),
  }));

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      <div className="relative h-[260px] overflow-hidden sm:h-[340px]">
        {cover ? (
          <img src={cover} alt={album.title ?? ""} className="h-full w-full object-cover opacity-50" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-500/20 to-blue-900/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090f]/60 via-[#08090f]/40 to-[#08090f]" />
        <div className="container-v2 absolute inset-0 flex items-end pt-24 pb-8">
          <div>
            {album.date && (
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-300">
                {new Date(album.date).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
            <h1
              className="font-display mt-2 font-black text-primary"
              style={{ fontSize: "clamp(1.6rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {album.title}
            </h1>
          </div>
        </div>
      </div>

      <InnerPageLayout
        backTo={ROUTES.GALLERY}
        backLabel={t("eventPage.back")}
        eyebrow={t("eventPage.eyebrow", { year: album.date ? new Date(album.date).getFullYear() : "" })}
        title={album.title ?? ""}
        subtitle={album.description ?? ""}
        count={photos.length}
      >
        {photos.length > 0 ? (
          <PhotoGrid photos={photos} />
        ) : (
          <p className="text-[14px] text-subtle">Фото ще не додано</p>
        )}
      </InnerPageLayout>
    </PageTransition>
  );
}

export const Component = GalleryEventPage;
