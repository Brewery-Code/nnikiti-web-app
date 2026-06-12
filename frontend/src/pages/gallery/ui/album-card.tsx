import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";
import { formatAlbumDate } from "../lib";

type Album = components["schemas"]["Album"];

export function AlbumCard({ album }: { album: Album }) {
  const { t } = useTranslation("gallery");
  const cover = resolveMediaUrl(album.cover);

  return (
    <Link
      to={`/gallery/event/${album.id}`}
      className="spec-card grad-border group flex flex-col overflow-hidden rounded-[20px] bg-surface backdrop-blur-xl"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-md">
        {cover ? (
          <img
            src={cover}
            alt={album.title ?? ""}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-500/20 to-blue-500/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f]/60 via-transparent to-transparent" />
      </div>
      <div className="flex flex-col gap-1.5 p-4 sm:gap-2 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-400">
          {formatAlbumDate(album.date)}
        </p>
        <h3 className="font-display font-bold leading-tight text-primary" style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
          {album.title}
        </h3>
        {album.description && (
          <p className="line-clamp-2 text-[13px] leading-snug text-muted">{album.description}</p>
        )}
        <span className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-violet-300 transition-colors group-hover:text-primary">
          {t("events.viewAlbum")}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
