import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { ALL_PHOTOS } from "@/shared/model/gallery-data";
import { ROUTES } from "@/shared/model/routes";
import { useLoadNamespace } from "@/shared/hooks";
import { PhotoGrid, InnerPageLayout } from "./ui";
import { loadTranslations } from "./locales";

function GalleryAllPage() {
  useLoadNamespace("gallery", loadTranslations);
  const { t } = useTranslation("gallery");
  return (
    <PageTransition className="pb-fluid-xl">
      <InnerPageLayout
        backTo={ROUTES.GALLERY}
        backLabel={t("allPage.back")}
        eyebrow={t("allPage.eyebrow")}
        title={t("allPage.title")}
        count={ALL_PHOTOS.length}
        accentColor="#60a5fa"
      >
        <PhotoGrid photos={ALL_PHOTOS} />
      </InnerPageLayout>
    </PageTransition>
  );
}

export const Component = GalleryAllPage;
