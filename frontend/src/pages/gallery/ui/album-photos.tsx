import { Link } from "react-router-dom";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";

type AlbumDetail = components["schemas"]["AlbumDetail"];

export function AlbumPhotos({ albumId, limit = Infinity, linkTo, square = true }: { albumId: number; limit?: number; linkTo?: string; square?: boolean }) {
  const { data } = publicRqClient.useQuery("get", "/gallery/{id}/" as any, { params: { path: { id: albumId } } });
  const album = data as AlbumDetail | undefined;
  const photos = (album?.photos ?? []).slice(0, limit);

  return (
    <>
      {photos.map((p) => {
        const src = resolveMediaUrl(p.image);
        return (
          <Link
            key={p.id}
            to={linkTo ?? `/gallery/event/${albumId}`}
            className={`group relative block overflow-hidden rounded-[14px] bg-surface-md${square ? " aspect-square" : ""}`}
          >
            {src ? (
              square ? (
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <img src={src} alt="" loading="lazy" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
              )
            ) : (
              <div className={square ? "h-full w-full bg-gradient-to-br from-violet-500/20 to-blue-500/20" : "aspect-square bg-gradient-to-br from-violet-500/20 to-blue-500/20"} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-violet-500/30 to-blue-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        );
      })}
    </>
  );
}
