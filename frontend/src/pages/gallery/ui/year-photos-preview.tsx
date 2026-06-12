import { Link } from "react-router-dom";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";
import { useAlbumPhotos } from "../lib";

type Album = components["schemas"]["Album"];

export function YearPhotosPreview({ albums, total, linkTo }: { albums: Album[]; total: number; linkTo?: string }) {
  const ids = Array.from({ length: 8 }, (_, i) => albums[i]?.id as number | undefined);
  const p0 = useAlbumPhotos(ids[0]);
  const p1 = useAlbumPhotos(ids[1]);
  const p2 = useAlbumPhotos(ids[2]);
  const p3 = useAlbumPhotos(ids[3]);
  const p4 = useAlbumPhotos(ids[4]);
  const p5 = useAlbumPhotos(ids[5]);
  const p6 = useAlbumPhotos(ids[6]);
  const p7 = useAlbumPhotos(ids[7]);

  const allPhotos = [
    ...p0.map(p => ({ ...p, albumId: ids[0]! })),
    ...p1.map(p => ({ ...p, albumId: ids[1]! })),
    ...p2.map(p => ({ ...p, albumId: ids[2]! })),
    ...p3.map(p => ({ ...p, albumId: ids[3]! })),
    ...p4.map(p => ({ ...p, albumId: ids[4]! })),
    ...p5.map(p => ({ ...p, albumId: ids[5]! })),
    ...p6.map(p => ({ ...p, albumId: ids[6]! })),
    ...p7.map(p => ({ ...p, albumId: ids[7]! })),
  ].filter(p => p.albumId != null && !!p.image).slice(0, total);

  if (!allPhotos.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-6">
      {allPhotos.map(({ id, image, albumId }) => {
        const src = resolveMediaUrl(image);
        return (
          <Link
            key={id}
            to={linkTo ?? `/gallery/event/${albumId}`}
            className="group relative block aspect-square overflow-hidden rounded-[14px] bg-surface-md"
          >
            {src ? (
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-violet-500/20 to-blue-500/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-violet-500/30 to-blue-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        );
      })}
    </div>
  );
}
