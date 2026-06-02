import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { PageTransition } from "@/widgets";
import {
  ALL_PHOTOS,
  GALLERY_EVENTS,
  GALLERY_YEARS,
  GALLERY_PHOTOS,
  type Photo,
  type GalleryEvent,
} from "@/shared/model/gallery-data";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";

function PhotoCard({
  photo,
  className,
}: {
  photo: Photo;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "group relative cursor-pointer overflow-hidden rounded-[14px] bg-surface-md",
        className
      )}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-violet-500/30 to-blue-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-[#08090f]/95 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
        <p className="line-clamp-1 text-[12px] text-primary/85">{photo.alt}</p>
      </div>
    </div>
  );
}

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
  linkTo: string;
  linkLabel: string;
}) {
  return (
    <Reveal mode="up" className="mb-8 flex items-end justify-between gap-4 lg:mb-12">
      <div>
        <h2
          className="font-display font-black text-primary"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
            letterSpacing: "-0.04em",
          }}
        >
          {title} <span className="text-grad">{highlight}</span>
        </h2>
      </div>
      <Link
        to={linkTo}
        className="group hidden shrink-0 items-center gap-2 text-[14px] font-medium text-muted transition-colors hover:text-primary sm:flex"
      >
        {linkLabel}
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </Reveal>
  );
}

function AllPhotosSection() {
  const preview = ALL_PHOTOS.slice(0, 9);

  return (
    <div>
      <SectionHeader
        eyebrow="Фотохроніка"
        title="Усі"
        highlight="фото"
        linkTo={ROUTES.GALLERY_ALL}
        linkLabel={`Переглянути всі ${ALL_PHOTOS.length} фото`}
      />

      <div
        className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2"
        style={{ height: "min(480px, 75vw)" }}
      >
        <div className="col-span-2 row-span-2 aspect-video md:aspect-auto">
          <PhotoCard photo={preview[0]} className="h-full" />
        </div>
        {preview.slice(1, 5).map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            className="aspect-[4/3] md:aspect-auto md:h-full"
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 md:hidden">
        {preview.slice(5, 9).map((photo) => (
          <PhotoCard key={photo.id} photo={photo} className="aspect-[4/3]" />
        ))}
      </div>
    </div>
  );
}

function ByYearSection() {
  const [activeYear, setActiveYear] = useState<number>(GALLERY_YEARS[0]);
  const yearPhotos = ALL_PHOTOS.filter((p) => p.year === activeYear).slice(0, 6);

  return (
    <div>
      <SectionHeader
        eyebrow="Архів"
        title="По"
        highlight="роках"
        linkTo={`/gallery/year/${activeYear}`}
        linkLabel={`Всі фото ${activeYear} року`}
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {GALLERY_YEARS.map((year) => (
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

      <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" stagger={0.05} amount={0.05}>
        {yearPhotos.map((photo) => (
          <StaggerItem key={photo.id} mode="scale">
            <PhotoCard photo={photo} className="aspect-square" />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-8 flex justify-center">
        <Link
          to={`/gallery/year/${activeYear}`}
          className="inline-flex items-center gap-2 rounded-[14px] border border-white/15 bg-surface-md px-6 py-3 text-[14px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95"
        >
          Всі фото {activeYear} року <span>→</span>
        </Link>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: GalleryEvent }) {
  const photoCount = ALL_PHOTOS.filter((p) => p.eventId === event.id).length;

  return (
    <Link
      to={`/gallery/event/${event.id}`}
      className="spec-card grad-border group flex flex-col overflow-hidden rounded-[20px] bg-surface backdrop-blur-xl"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={GALLERY_PHOTOS[event.coverSeed % GALLERY_PHOTOS.length]}
          alt={event.title}
          loading="lazy"
          className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-transparent to-transparent" />
        <span className="font-display absolute bottom-3 right-3 rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-1 text-[11px] font-bold text-violet-100 backdrop-blur-md">
          {photoCount} фото
        </span>
      </div>

      <div className="flex flex-col gap-2 p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-400">
          {event.date}
        </p>
        <h3
          className="font-display font-bold text-primary"
          style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
        >
          {event.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-muted">
          {event.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-violet-300 transition-colors group-hover:text-primary">
          Переглянути альбом
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function EventsSection() {
  return (
    <div>
      <SectionHeader
        eyebrow="Альбоми"
        title="Альбоми"
        highlight="подій"
        linkTo={ROUTES.GALLERY}
        linkLabel="Усі події"
      />
      <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} amount={0.05}>
        {GALLERY_EVENTS.map((event) => (
          <StaggerItem key={event.id} mode="up">
            <EventCard event={event} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-base pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      <div className="absolute inset-0 grid grid-cols-2 gap-1 opacity-25 sm:grid-cols-4">
        {ALL_PHOTOS.slice(0, 8).map((photo) => (
          <div key={photo.id} className="overflow-hidden">
            <img
              src={photo.src}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-[#08090f]/80 to-[#08090f]/60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Stagger className="container-v2 relative z-[1]" stagger={0.1}>
        <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
            ННІКІТІ
          </span>
          <span className="text-[12px] text-primary/70">Фотохроніка</span>
        </StaggerItem>

        <StaggerItem
          as="h1"
          mode="up"
          className="font-display font-black text-primary"
          style={{
            fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
          }}
        >
          Галерея <span className="text-grad">подій</span>
        </StaggerItem>
        <StaggerItem as="p" mode="up" className="mt-4 text-[15px] text-muted sm:text-[17px]">
          {ALL_PHOTOS.length} фото · {GALLERY_EVENTS.length} подій ·{" "}
          {GALLERY_YEARS.length} роки
        </StaggerItem>
      </Stagger>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#08090f]" />
    </section>
  );
}

function GalleryPage() {
  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      <HeroSection />
      <div className="bg-base py-12 sm:py-16 lg:py-20">
        <div className="container-v2 flex flex-col gap-fluid-2xl">
          <AllPhotosSection />
          <ByYearSection />
          <EventsSection />
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = GalleryPage;
