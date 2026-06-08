import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { publicRqClient } from "@/shared/api/instance";
import { useLoadNamespace } from "@/shared/hooks";
import { InnerPageLayout } from "./ui";
import { loadTranslations } from "./locales";
import { AlbumCard } from "./gallery-page";
import type { components } from "@/shared/api/schema/generated";

type Album = components["schemas"]["Album"];

function GalleryAllPage() {
  useLoadNamespace("gallery", loadTranslations);
  const { t } = useTranslation("gallery");

  const { data, isPending } = publicRqClient.useQuery("get", "/gallery/" as any, {});
  const albums = ((data ?? []) as Album[]).filter((a) => a.status === "PB" || !a.status);

  if (isPending) {
    return (
      <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
        <div className="container-v2 pt-32 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-[20px] bg-surface" />
          ))}
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <InnerPageLayout
        backTo={ROUTES.GALLERY}
        backLabel={t("allPage.back")}
        eyebrow={t("allPage.eyebrow")}
        title={t("allPage.title")}
        count={albums.length}
        accentColor="#60a5fa"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </InnerPageLayout>
    </PageTransition>
  );
}

export const Component = GalleryAllPage;
