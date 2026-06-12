import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { globalLenis } from "@/shared/hooks/use-lenis";

/* ─── Photo lightbox (same as gallery) rendered via portal ───── */
export function NewsLightbox({
  urls,
  startIndex,
  onClose,
}: {
  urls: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const total = urls.length;

  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(i => (i + 1) % total), [total]);

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
    globalLenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      globalLenis?.start();
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#08090f]/95 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="relative"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={urls[current]}
          alt={`Фото ${current + 1}`}
          className="max-h-[85vh] max-w-[85vw] rounded-[16px] object-contain shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        />
      </motion.div>

      {total > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Попереднє фото"
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Наступне фото"
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      <button
        onClick={onClose}
        aria-label="Закрити"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        ✕
      </button>

      <div className="font-display absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.06em] text-white/70 backdrop-blur-md">
        {current + 1} / {total}
      </div>
    </motion.div>,
    document.body
  );
}
