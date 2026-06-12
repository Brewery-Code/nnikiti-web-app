import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { setScrollLocked } from "@/shared/hooks";
import type { Photo } from "@/shared/model/gallery-data";

export function Lightbox({
  photos,
  index,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + photos.length) % photos.length),
    [photos.length]
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % photos.length),
    [photos.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  useEffect(() => {
    setScrollLocked(true);
    document.body.style.overflow = "hidden";
    return () => {
      setScrollLocked(false);
      document.body.style.overflow = "";
    };
  }, []);

  const photo = photos[current];

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-base/95 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Photo */}
      <motion.div
        className="relative"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[85vh] max-w-[85vw] rounded-[16px] object-contain shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        />
        <div className="absolute bottom-0 left-0 right-0 rounded-b-[16px] bg-gradient-to-t from-[#08090f] to-transparent px-5 py-4">
          <p className="text-[15px] text-primary/90">{photo.alt}</p>
          <p className="mt-0.5 text-[11px] text-violet-300/70">{photo.year}</p>
        </div>
      </motion.div>

      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Попереднє фото"
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-primary transition-colors hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Наступне фото"
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-primary transition-colors hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Закрити"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-primary transition-colors hover:bg-white/20"
      >
        ✕
      </button>

      {/* Counter — bottom center */}
      <div className="font-display absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-ui bg-white/5 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.06em] text-primary/70 backdrop-blur-md">
        {current + 1} / {photos.length}
      </div>
    </motion.div>
  );
}
