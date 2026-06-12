import { useTranslation } from "react-i18next";
import { Stagger, StaggerItem } from "@/shared/ui";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";
import { getYear, useAlbumPhotos } from "../lib";

type Album = components["schemas"]["Album"];

export function HeroSection({ albums }: { albums: Album[] }) {
  const { t } = useTranslation("gallery");
  const offsets = [-6, 8, -12, 5, -3, 10, -8, 4];
  const years = new Set(albums.map((a) => getYear(a.date)).filter(Boolean));

  const ids = Array.from({ length: 8 }, (_, i) => albums[i]?.id as number | undefined);
  const p0 = useAlbumPhotos(ids[0]);
  const p1 = useAlbumPhotos(ids[1]);
  const p2 = useAlbumPhotos(ids[2]);
  const p3 = useAlbumPhotos(ids[3]);
  const p4 = useAlbumPhotos(ids[4]);
  const p5 = useAlbumPhotos(ids[5]);
  const p6 = useAlbumPhotos(ids[6]);
  const p7 = useAlbumPhotos(ids[7]);

  const covers = [...p0, ...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7]
    .filter(p => !!p.image)
    .slice(0, 8)
    .map(p => resolveMediaUrl(p.image))
    .filter(Boolean) as string[];

  return (
    <section
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-32"
      style={{
        maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
      }}
    >
      {covers.length >= 4 && (
        <>
          {/* Desktop: right-side collage */}
          <div
            className="absolute inset-y-0 right-0 hidden w-[65%] overflow-hidden sm:block"
            style={{
              maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
            }}
          >
            <div className="grid h-[130%] grid-cols-4 gap-1.5 -mt-[15%]">
              {covers.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-[10px]" style={{ transform: `translateY(${offsets[i] ?? 0}%)` }}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="absolute inset-0 hidden bg-gradient-to-r from-[#07080e] from-[35%] via-[#07080e]/40 to-transparent sm:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-b from-[#07080e]/30 via-transparent to-transparent sm:block" />

      <Stagger className="container-v2 relative z-[1]" stagger={0.1}>
        <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">{t("hero.badge")}</span>
          <span className="text-[12px] text-primary/70">{t("hero.badgeSub")}</span>
        </StaggerItem>
        <StaggerItem as="h1" mode="up" className="font-display font-black text-primary"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", letterSpacing: "-0.05em", lineHeight: 0.95 }}>
          {t("hero.title")} <span className="text-grad">{t("hero.titleAccent")}</span>
        </StaggerItem>
        <StaggerItem as="p" mode="up" className="mt-4 text-[15px] text-muted sm:text-[17px]">
          {t("hero.stats", { photos: albums.length, events: albums.length, years: years.size })}
        </StaggerItem>
      </Stagger>
    </section>
  );
}
