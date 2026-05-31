import { useParams, Link } from "react-router-dom";
import { PageTransition } from "@/widgets";
import { ALL_PHOTOS, GALLERY_EVENTS, GALLERY_PHOTOS } from "@/shared/model/gallery-data";
import { ROUTES } from "@/shared/model/routes";
import { PhotoGrid, InnerPageLayout } from "./ui";

function GalleryEventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const event = GALLERY_EVENTS.find((e) => e.id === eventId);
  const photos = ALL_PHOTOS.filter((p) => p.eventId === eventId);

  if (!event) {
    return (
      <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
        <div className="bg-base pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
          <div className="container-v2">
            <Link
              to={ROUTES.GALLERY}
              className="text-[14px] text-muted hover:text-primary"
            >
              ← Галерея
            </Link>
            <p className="font-display mt-10 text-[18px] text-subtle">
              Подію не знайдено.
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      <div className="relative h-[260px] overflow-hidden bg-base sm:h-[340px]">
        <img
          src={GALLERY_PHOTOS[event.coverSeed % GALLERY_PHOTOS.length]}
          alt={event.title}
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090f]/60 via-[#08090f]/40 to-[#08090f]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] -top-[20%] h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="container-v2 absolute inset-0 flex items-end pt-24 pb-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-300">
              {event.date}
            </p>
            <h1
              className="font-display mt-2 font-black text-primary"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 3.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <InnerPageLayout
        backTo={ROUTES.GALLERY}
        backLabel="Галерея"
        eyebrow={`Подія · ${event.year}`}
        title={event.title}
        subtitle={event.description}
        count={photos.length}
      >
        <div className="mb-10 flex flex-wrap gap-2">
          {GALLERY_EVENTS.filter((e) => e.id !== event.id).map((e) => (
            <Link
              key={e.id}
              to={`/gallery/event/${e.id}`}
              className="grad-border rounded-full bg-surface px-3.5 py-1.5 text-[12px] text-muted transition-colors hover:bg-surface-lg hover:text-primary"
            >
              {e.title}
            </Link>
          ))}
        </div>

        <PhotoGrid photos={photos} />
      </InnerPageLayout>
    </PageTransition>
  );
}

export const Component = GalleryEventPage;
