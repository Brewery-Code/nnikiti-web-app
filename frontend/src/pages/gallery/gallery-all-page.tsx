import { PageTransition } from "@/widgets";
import { ALL_PHOTOS } from "@/shared/model/gallery-data";
import { ROUTES } from "@/shared/model/routes";
import { PhotoGrid, InnerPageLayout } from "./ui";

function GalleryAllPage() {
  return (
    <PageTransition className="pb-fluid-xl">
      <InnerPageLayout
        backTo={ROUTES.GALLERY}
        backLabel="Галерея"
        eyebrow="Фотохроніка ННІКІТІ"
        title="Усі фото"
        count={ALL_PHOTOS.length}
        accentColor="#60a5fa"
      >
        <PhotoGrid photos={ALL_PHOTOS} />
      </InnerPageLayout>
    </PageTransition>
  );
}

export const Component = GalleryAllPage;
