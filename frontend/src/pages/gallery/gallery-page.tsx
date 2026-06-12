import { PageTransition } from "@/widgets";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { publicRqClient } from "@/shared/api/instance";
import type { components } from "@/shared/api/schema/generated";
import { HeroSection } from "./hero-section";
import { ByYearSection } from "./by-year-section";
import { AlbumsSection } from "./albums-section";

type Album = components["schemas"]["Album"];

function GalleryPage() {
  const loaded = useLoadNamespace("gallery", loadTranslations);
  const { data, isPending } = publicRqClient.useQuery("get", "/gallery/" as any, {});
  const albums = ((data ?? []) as Album[]).filter((a) => a.status === "PB" || !a.status);

  if (!loaded || isPending) return null;

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      <HeroSection albums={albums} />
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="container-v2 flex flex-col gap-fluid-2xl">
          <ByYearSection albums={albums} />
          <AlbumsSection albums={albums} />
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = GalleryPage;
