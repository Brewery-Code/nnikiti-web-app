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
    <Reveal mode="up" className="mb-8 flex items-end justify-between lg:mb-10">
      <h2
        className="font-display font-black text-primary"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.04em" }}
      >
        {title} <span className="text-grad">{highlight}</span>
      </h2>
      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className="hidden text-[13px] font-semibold text-subtle transition-colors hover:text-primary sm:block"
        >
          {linkLabel} →
        </Link>
      )}
    </Reveal>
  );
}

/* ─── Album card ──────────────────────────────────────────────── */
function AlbumCard({ album }: { album: Album }) {
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
        {album.date && (
          <span className="font-display absolute bottom-3 right-3 rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-1 text-[11px] font-bold text-violet-100 backdrop-blur-md">
            {getYear(album.date)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-400">
          {formatAlbumDate(album.date)}
        </p>
        <h3 className="font-display font-bold text-primary" style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
          {album.title}
        </h3>
        {album.description && (
          <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-muted">{album.description}</p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-violet-300 transition-colors group-hover:text-primary">
          {t("events.viewAlbum")}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

/* ─── Album photos fetcher ────────────────────────────────────── */
function AlbumPhotos({ albumId, limit }: { albumId: number; limit: number }) {
  const { data } = publicRqClient.useQuery("get", "/gallery/{id}/", { params: { path: { id: albumId } } });
  const album = data as AlbumDetail | undefined;
  const photos = (album?.photos ?? []).slice(0, limit);

  return (
    <>
      {photos.map((p) => {
        const src = resolveMediaUrl(p.image);
        return (
          <Link
            key={p.id}
            to={`/gallery/event/${albumId}`}
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
    </>
  );
}

/* ─── By year section ─────────────────────────────────────────── */
function ByYearSection({ albums }: { albums: Album[] }) {
  const { t } = useTranslation("gallery");
  const years = Array.from(new Set(albums.map((a) => getYear(a.date)).filter(Boolean) as number[])).sort((a, b) => b - a);
  const [activeYear, setActiveYear] = useState<number | null>(years[0] ?? null);

  const yearAlbums = (activeYear ? albums.filter((a) => getYear(a.date) === activeYear) : albums).slice(0, 3);

  if (!years.length) return null;

  return (
    <div>
      <SectionHeader
        eyebrow={t("byYear.eyebrow")}
        title={t("byYear.title")}
        highlight={t("byYear.highlight")}
        linkTo={activeYear ? `/gallery/year/${activeYear}` : ROUTES.GALLERY}
        linkLabel={activeYear ? t("byYear.linkLabel", { year: activeYear }) : undefined}
      />
      <div className="mb-8 flex flex-wrap gap-2">
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

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {yearAlbums.map((album) => (
          <AlbumPhotos key={album.id} albumId={album.id!} limit={2} />
        ))}
      </div>
    </div>
  );
}

/* ─── All albums section ──────────────────────────────────────── */
function AlbumsSection({ albums }: { albums: Album[] }) {
  const { t } = useTranslation("gallery");
  return (
    <div>
      <SectionHeader
        eyebrow={t("events.eyebrow")}
        title={t("events.title")}
        highlight={t("events.highlight")}
        linkTo={ROUTES.GALLERY}
        linkLabel={t("events.linkLabel")}
      />
      <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} amount={0.05}>
        {albums.map((album) => (
          <StaggerItem key={album.id} mode="up">
            <AlbumCard album={album} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* ─── Hero section ────────────────────────────────────────────── */
function HeroSection({ albums }: { albums: Album[] }) {
  const { t } = useTranslation("gallery");
  const offsets = [-6, 8, -12, 5, -3, 10, -8, 4];
  const covers = albums.slice(0, 8).map((a) => resolveMediaUrl(a.cover)).filter(Boolean) as string[];
  const years = new Set(albums.map((a) => getYear(a.date)).filter(Boolean));

  return (
    <section
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-32"
      style={{
        maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
      }}
    >
      {covers.length > 0 && (
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
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-[#07080e] from-[35%] via-[#07080e]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080e]/30 via-transparent to-transparent" />

      <Stagger className="container-v2 relative z-[1]" stagger={0.1}>
        <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">{t("hero.badge")}</span>
          <span className="text-[12px] text-primary/70">{t("hero.badgeSub")}</span>
        </StaggerItem>
        <StaggerItem as="h1" mode="up" className="font-display font-black text-primary"
          style={{ fontSize: "clamp(2rem, 6.5vw, 5.5rem)", letterSpacing: "-0.05em", lineHeight: 0.95 }}>
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
  const { data, isPending } = publicRqClient.useQuery("get", "/gallery/", {});
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
