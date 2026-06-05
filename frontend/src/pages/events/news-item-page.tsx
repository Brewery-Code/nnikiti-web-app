import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { marked } from "marked";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { BackButton, Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";

type ApiEvent = components["schemas"]["Events"];

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
      to={`/news/${item.id}`}
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

export function NewsItemPage() {
  useLoadNamespace("events-page", loadTranslations);
  const { t } = useTranslation("events-page");

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numId = Number(id);

  const { data: news, isPending, isError } = publicRqClient.useQuery(
    "get",
    "/events/{id}/",
    { params: { path: { id: numId } } },
  );

  const { data: allEvents } = publicRqClient.useQuery("get", "/events/", {});
  const related = ((allEvents ?? []) as ApiEvent[])
    .filter((e) => e.id !== numId)
    .slice(0, 3);

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

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">

      {/* ── Hero ── */}
      <div className="container-v2 max-w-[900px] pb-8 pt-28 sm:pt-36">
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
        <div className="container-v2 max-w-[900px] pb-2">
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
        <div className="container-v2 max-w-[800px]">
          {(event.body || event.body_html) && (
            <Reveal mode="up" delay={0.35} inView={false}>
              <div
                className="news-body prose prose-invert prose-lg max-w-none
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
