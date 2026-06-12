import { publicRqClient } from "@/shared/api/instance";
import type { components } from "@/shared/api/schema/generated";

type AlbumDetail = components["schemas"]["AlbumDetail"];

export function getYear(dateStr?: string | null): number | null {
  if (!dateStr) return null;
  return new Date(dateStr).getFullYear();
}

export function formatAlbumDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
}

/* Single-album photos fetcher used to aggregate previews across albums. */
export function useAlbumPhotos(albumId: number | undefined) {
  const { data } = publicRqClient.useQuery(
    "get",
    "/gallery/{id}/" as any,
    { params: { path: { id: albumId! } } },
    { enabled: albumId != null } as any,
  );
  return ((data as AlbumDetail | undefined)?.photos ?? []) as Array<{ id: number; image: string }>;
}
