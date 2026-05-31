import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import type { Photo } from "@/shared/model/gallery-data";

function Lightbox({
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
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const photo = photos[current];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-base/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
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
      </div>

      <button
        onClick={onClose}
        aria-label="Закрити"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-primary transition-colors hover:bg-white/20"
      >
        ✕
      </button>

      <div className="font-display absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-ui bg-white/5 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.06em] text-primary/70 backdrop-blur-md">
        {current + 1} / {photos.length}
      </div>

      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Попереднє фото"
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-primary transition-colors hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500"
          >
            ←
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Наступне фото"
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-primary transition-colors hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500"
          >
            →
          </button>
        </>
      )}
    </div>
  );
}

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="group mb-3 cursor-pointer overflow-hidden rounded-[14px] break-inside-avoid"
            onClick={() => setLightboxIndex(i)}
          >
            <div className="relative overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className={clsx(
                  "w-full object-cover transition-transform duration-500 group-hover:scale-105",
                  photo.wide ? "aspect-[3/2]" : "aspect-[2/3]"
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-500/30 to-blue-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-[#08090f]/95 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
                <p className="line-clamp-1 text-[12px] text-primary/80">
                  {photo.alt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

export function InnerPageLayout({
  backTo,
  backLabel,
  eyebrow,
  title,
  subtitle,
  count,
  children,
}: {
  backTo: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  count: number;
  accentColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-base">
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] -top-[20%] h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(166,132,255,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="container-v2 relative z-[1]">
          <Link
            to={backTo}
            className="mb-8 inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-primary"
          >
            ← {backLabel}
          </Link>

          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-500">
              — {eyebrow}
            </p>
            <h1
              className="font-display font-black text-primary"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
                {subtitle}
              </p>
            )}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />
              <span className="font-display rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1.5 text-[11px] font-bold text-violet-200">
                {count} фото
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-v2 pb-24">{children}</div>
    </div>
  );
}
