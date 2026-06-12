import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Photo } from "@/shared/model/gallery-data";
import { Lightbox } from "./lightbox";

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
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
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

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            key="lightbox"
            photos={photos}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
