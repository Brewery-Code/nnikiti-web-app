import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";

type Album = components["schemas"]["Album"];
type AlbumDetail = components["schemas"]["AlbumDetail"];

function getYear(dateStr?: string | null): number | null {
  if (!dateStr) return null;
  return new Date(dateStr).getFullYear();
}

function formatAlbumDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
}

/* ─── Section header ──────────────────────────────────────────── */
function SectionHeader({
  eyebrow: _eyebrow,
  title,
  highlight,
  linkTo,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  linkTo?: string;
  linkLabel?: string;
}) {
  return (
    <Reveal mode="up" className="mb-6 flex items-end justify-between sm:mb-8 lg:mb-10">
      <h2
        className="font-display font-black leading-tight text-primary"
        style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
      >
        {title} <span className="text-grad">{highlight}</span>
      </h2>
      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className="grad-border flex-shrink-0 rounded-full bg-surface-md px-4 py-1.5 text-[12px] font-semibold text-muted backdrop-blur-md transition-all duration-200 hover:bg-surface-xl hover:text-primary sm:text-[13px]"
        >
          {linkLabel} →
        </Link>
      )}
    </Reveal>
  );
}

/* ─── Album card ──────────────────────────────────────────────── */
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

/* ─── Album photos fetcher ────────────────────────────────────── */
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

/* ─── Year photos preview (aggregates first N photos across all albums) ── */
function useAlbumPhotos(albumId: number | undefined) {
  const { data } = publicRqClient.useQuery(
    "get",
    "/gallery/{id}/" as any,
    { params: { path: { id: albumId! } } },
    { enabled: albumId != null } as any,
  );
  return ((data as AlbumDetail | undefined)?.photos ?? []) as Array<{ id: number; image: string }>;
}

function YearPhotosPreview({ albums, total, linkTo }: { albums: Album[]; total: number; linkTo?: string }) {
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

/* ─── By year section ─────────────────────────────────────────── */
function ByYearSection({ albums }: { albums: Album[] }) {
  const { t } = useTranslation("gallery");
  const years = Array.from(new Set(albums.map((a) => getYear(a.date)).filter(Boolean) as number[])).sort((a, b) => b - a);
  const [activeYear, setActiveYear] = useState<number | null>(years[0] ?? null);

  const yearAlbums = activeYear ? albums.filter((a) => getYear(a.date) === activeYear) : albums;

  if (!years.length) return null;

  return (
    <div>
      <SectionHeader
        eyebrow={t("byYear.eyebrow")}
        title={t("byYear.title")}
        highlight={t("byYear.highlight")}
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={clsx(
              "rounded-full px-5 py-2 text-[14px] font-bold transition-all duration-200",
              activeYear === year
                ? "bg-gradient-to-r from-violet-500 to-blue-500 text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                : "grad-border bg-surface-md text-muted backdrop-blur-md hover:bg-surface-xl hover:text-primary"
            )}
          >
            {year}
          </button>
        ))}
      </div>

      <YearPhotosPreview
        albums={yearAlbums}
        total={6}
        linkTo={activeYear ? `/gallery/year/${activeYear}` : undefined}
      />

      {activeYear && (
        <div className="mt-8 flex justify-start">
          <Link
            to={`/gallery/year/${activeYear}`}
            className="grad-border rounded-full bg-surface-md px-5 py-2 text-[13px] font-semibold text-muted backdrop-blur-md transition-all duration-200 hover:bg-surface-xl hover:text-primary"
          >
            {t("byYear.linkLabel", { year: activeYear })} →
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─── All albums section ──────────────────────────────────────── */
function AlbumsSection({ albums }: { albums: Album[] }) {
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

/* ─── Hero section ────────────────────────────────────────────── */
function HeroSection({ albums }: { albums: Album[] }) {
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

/* ─── Page ────────────────────────────────────────────────────── */
function GalleryPage() {
  const loaded = useLoadNamespace("gallery", loadTranslations);
  const { data, isPending } = publicRqClient.useQuery("get", "/gallery/" as any, {});
  const albums = ((data ?? []) as Album[]).filter((a) => a.status === "PB" || !a.status);

  if (!loaded || isPending) return null;

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      <HeroSection albums={albums} />
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="container-v2 flex flex-col gap-fluid-2xl">
          <ByYearSection albums={albums} />
          <AlbumsSection albums={albums} />
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = GalleryPage;
