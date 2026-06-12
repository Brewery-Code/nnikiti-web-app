import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { components } from "@/shared/api/schema/generated";
import { AlbumCard, SectionHeader } from "../ui";

type Album = components["schemas"]["Album"];

export function AlbumsSection({ albums }: { albums: Album[] }) {
  const { t } = useTranslation("gallery");
  const [visibleCount, setVisibleCount] = useState(3);
  const visible = albums.slice(0, visibleCount);
  const hasMore = visibleCount < albums.length;

  return (
    <div>
      <SectionHeader
        eyebrow={t("events.eyebrow")}
        title={t("events.title")}
        highlight={t("events.highlight")}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + 3)}
            className="grad-border inline-flex items-center gap-2 rounded-[12px] bg-surface-md px-7 py-3 text-[14px] font-semibold text-primary/70 backdrop-blur-md transition-all duration-200 hover:bg-surface-xl hover:text-primary"
          >
            {t("events.showMore")} <span aria-hidden className="text-violet-400">↓</span>
          </button>
        </div>
      )}
    </div>
  );
}
