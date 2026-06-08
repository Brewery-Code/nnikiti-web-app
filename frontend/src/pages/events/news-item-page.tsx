import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { marked } from "marked";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { BackButton, Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import { globalLenis } from "@/shared/hooks/use-lenis";
import type { components } from "@/shared/api/schema/generated";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";

type ApiEvent = components["schemas"]["Events"] & {
  images?: { id: number; image: string }[];
};

/* ─── Photo lightbox (same as gallery) rendered via portal ───── */
function NewsLightbox({
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

/* ─── Photo grid ──────────────────────────────────────────────── */
function PhotoGrid({ images }: { images: { id: number; image: string }[] }) {
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

/* ─── Helpers ─────────────────────────────────────────────────── */
function formatDate(iso?: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
}

function tagStyle(rgb?: string | null) {
  if (!rgb) return { background: "rgba(166,132,255,0.2)", border: "1px solid rgba(166,132,255,0.4)", color: "#c4a8ff" };
  return {
    background: `rgba${rgb.replace(/(\d+),(\d+),(\d+).*/, "$1,$2,$3,0.18)")}`,
    border: `1px solid rgba${rgb.replace(/(\d+),(\d+),(\d+).*/, "$1,$2,$3,0.38)")}`,
    color: `rgb${rgb.replace(/(\d+),(\d+),(\d+).*/, "$1,$2,$3)")}`,
  };
}

function RelatedCard({ item }: { item: ApiEvent }) {
  const { t } = useTranslation("events-page");
  const image = resolveMediaUrl(item.cover);
  const rgb = item.category?.rgb_color;
  const tagBg = rgb ? `rgba${rgb}` : "rgba(166,132,255,0.85)";

  return (
    <Link
      to={`/news/${item.slug ?? item.id}`}
      className="spec-card grad-border group flex h-full flex-col overflow-hidden rounded-[20px] bg-surface backdrop-blur-xl"
    >
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={item.title ?? ""}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-500/20 to-blue-500/20" />
        )}
        {item.category?.name && (
          <span
            className="font-display absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-primary"
            style={{ background: tagBg }}
          >
            {item.category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">{formatDate(item.created_at)}</p>
        <h3
          className="font-display mb-3 line-clamp-3 flex-1 font-bold leading-snug text-primary"
          style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}
        >
          {item.title}
        </h3>
        <span className="mt-auto self-start text-[12px] font-semibold text-violet-300 transition group-hover:text-primary">
          {t("readMore")}
        </span>
      </div>
    </Link>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export function NewsItemPage() {
  useLoadNamespace("events-page", loadTranslations);
  const { t } = useTranslation("events-page");

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: allEvents, isPending: isListPending } = publicRqClient.useQuery("get", "/events/", {});
  const allList = (allEvents ?? []) as ApiEvent[];

  const foundEvent = allList.find((e) => e.slug === slug || String(e.id) === slug);
  const numId = foundEvent?.id ?? 0;

  const { data: news, isPending: isDetailPending, isError } = publicRqClient.useQuery(
    "get",
    "/events/{id}/",
    { params: { path: { id: numId } } },
    { enabled: !!numId },
  );

  const isPending = isListPending || isDetailPending;

  const related = allList
    .filter((e) => e.id !== numId)
    .slice(0, 3);

  if (!isListPending && !foundEvent) return <Navigate to={ROUTES.EVENTS} replace />;
  if (isError) return <Navigate to={ROUTES.EVENTS} replace />;

  if (isPending) {
    return (
      <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
        <div className="relative min-h-[500px] animate-pulse bg-surface" />
        <div className="pb-20 pt-12">
          <div className="container-v2 max-w-[800px] flex flex-col gap-4">
            {[1, 0.8, 0.9, 0.7, 0.85].map((w, i) => (
              <div key={i} className="h-5 animate-pulse rounded-full bg-surface-md" style={{ width: `${w * 100}%` }} />
            ))}
          </div>
        </div>
      </PageTransition>
    );
  }

  const event = news as ApiEvent;
  const image = resolveMediaUrl(event.cover);
  const ts = tagStyle(event.category?.rgb_color);
  const hasPhotos = (event.images?.length ?? 0) > 0;

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">

      {/* ── Hero ── */}
      <div className="container-v2 pb-8 pt-28 sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-7">
            <BackButton onClick={() => navigate(-1)} label={t("backButton")} />
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            {event.category?.name && (
              <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]" style={ts}>
                {event.category.name}
              </span>
            )}
            <span className="text-[13px] text-white/40">{formatDate(event.event_date ?? event.created_at)}</span>
          </div>

          <h1
            className="font-display font-black text-primary"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            {event.title}
          </h1>
        </motion.div>
      </div>

      {/* ── Feature image ── */}
      {image && (
        <div className="container-v2 pb-2">
          <Reveal mode="up" delay={0.2} inView={false}>
            <div className="grad-border overflow-hidden rounded-[22px] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
              <img
                src={image}
                alt={event.title ?? ""}
                className="h-[260px] w-full object-cover sm:h-[400px] lg:h-[500px]"
              />
            </div>
          </Reveal>
        </div>
      )}

      {/* ── Body ── */}
      <div className="pb-24 pt-10">
        <div className="container-v2">

          {/* Prose text — narrow for readability */}
          {(event.body || event.body_html) && (
            <Reveal mode="up" delay={0.35} inView={false}>
              <div
                className="news-body prose prose-invert prose-lg mb-12 max-w-none
                  prose-headings:font-display prose-headings:font-black
                  prose-a:text-violet-300 hover:prose-a:text-white
                  prose-blockquote:border-violet-500/60 prose-blockquote:not-italic
                  prose-li:marker:text-violet-400
                  prose-code:text-violet-300 prose-code:bg-white/5"
                dangerouslySetInnerHTML={{
                  __html: event.body
                    ? marked.parse(event.body, { breaks: true, gfm: true }) as string
                    : event.body_html!,
                }}
              />
            </Reveal>
          )}

          {/* Photo grid — full container width */}
          {hasPhotos && (
            <Reveal mode="up" delay={0.1} inView={false}>
              <PhotoGrid images={event.images!} />
            </Reveal>
          )}
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div className="container-v2 mt-24">
            <Reveal mode="up" className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-black text-primary" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.04em" }}>
                  {t("otherNews")} <span className="text-grad">{t("otherNewsHighlight")}</span>
                </h2>
                <Link to={ROUTES.EVENTS} className="hidden text-[12px] font-semibold text-subtle transition-colors hover:text-primary sm:block">
                  {t("allNews")}
                </Link>
              </div>
            </Reveal>

            <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.08} amount={0.1}>
              {related.map((item) => (
                <StaggerItem key={item.id} mode="up">
                  <RelatedCard item={item} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export const Component = NewsItemPage;
