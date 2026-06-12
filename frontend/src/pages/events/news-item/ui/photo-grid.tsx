import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { resolveMediaUrl } from "@/shared/model/config";
import { NewsLightbox } from "./news-lightbox";

/* ─── Photo grid ──────────────────────────────────────────────── */
export function PhotoGrid({ images }: { images: { id: number; image: string }[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const urls = images.map(img => resolveMediaUrl(img.image) ?? img.image);
  const total = urls.length;

  const MAX = 3;
  const SHOW = Math.min(total, MAX);
  const extra = total - MAX;
  const H = "clamp(320px, 44vw, 520px)";

  function Thumb({ idx, className }: { idx: number; className?: string }) {
    const isLast = idx === SHOW - 1;
    const showMore = isLast && extra > 0;
    return (
      <button
        className={`group relative overflow-hidden bg-surface-md ${className ?? ""}`}
        onClick={() => setLightboxIndex(idx)}
        aria-label={`Фото ${idx + 1}`}
      >
        <img
          src={urls[idx]}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {showMore && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="font-display text-[2.5rem] font-black leading-none text-white">+{extra}</span>
            <span className="mt-1 text-[12px] font-medium text-white/60">фото</span>
          </div>
        )}
      </button>
    );
  }

  function renderGrid() {
    if (total === 1) return (
      <div style={{ height: H }} className="overflow-hidden rounded-[18px]">
        <Thumb idx={0} className="h-full w-full" />
      </div>
    );
    if (total === 2) return (
      <div className="grid grid-cols-2 gap-2" style={{ height: H }}>
        <Thumb idx={0} className="h-full rounded-[16px]" />
        <Thumb idx={1} className="h-full rounded-[16px]" />
      </div>
    );
    // 3+: big left spanning 2 rows + 2 stacked right (last blurred if extra > 0)
    return (
      <div className="grid gap-2" style={{ height: H, gridTemplateColumns: "5fr 3fr", gridTemplateRows: "1fr 1fr" }}>
        <Thumb idx={0} className="row-span-2 h-full rounded-[16px]" />
        <Thumb idx={1} className="h-full rounded-[12px]" />
        <Thumb idx={2} className="h-full rounded-[12px]" />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-white/40">Фото з події</span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-semibold text-white/50">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            {total} фото
          </span>
        </div>
        {renderGrid()}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <NewsLightbox
            key="lightbox"
            urls={urls}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
