import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";

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
  const image = resolveMediaUrl(item.cover);
  const rgb = item.category?.rgb_color;
  const tagBg = rgb ? `rgba${rgb}` : "rgba(166,132,255,0.85)";

  return (
    <Link
      to={`/news/${item.id}`}
      className="spec-card grad-border group flex h-full flex-col overflow-hidden rounded-[20px] bg-surface backdrop-blur-xl"
    >
      <div className="relative h-60 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={item.title ?? ""}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-500/20 to-blue-500/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-transparent to-transparent" />
        {item.category?.name && (
          <span
            className="font-display absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-primary"
            style={{ background: tagBg }}
          >
            {item.category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">{formatDate(item.created_at)}</p>
        <h3
          className="font-display mb-3 line-clamp-3 flex-1 font-bold leading-snug text-primary"
          style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
        >
          {item.title}
        </h3>
        <span className="mt-auto self-start text-[12px] font-semibold text-violet-300 transition group-hover:text-primary">
          Читати далі →
        </span>
      </div>
    </Link>
  );
}

export function NewsItemPage() {
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
        <div className="relative min-h-[420px] animate-pulse bg-surface sm:min-h-[500px]" />
        <div className="bg-base pb-20 pt-12">
          <div className="container-v2 max-w-[860px] flex flex-col gap-4">
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
      {/* Hero */}
      <div className="relative min-h-[420px] overflow-hidden bg-base sm:min-h-[500px]">
        {image && (
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            style={{ filter: "blur(2px)" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090f]/60 via-[#08090f]/50 to-[#08090f]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(166,132,255,.18) 0%,transparent 70%)", filter: "blur(80px)" }}
        />

        <div className="container-v2 relative flex h-full flex-col justify-end pb-12 pt-28 sm:pb-16 sm:pt-36">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <div className="mb-6">
              <button
                onClick={() => navigate(-1)}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-primary/70 backdrop-blur-md transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-primary"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
                Назад
              </button>
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              {event.category?.name && (
                <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]" style={ts}>
                  {event.category.name}
                </span>
              )}
              <span className="text-[12px] text-subtle">{formatDate(event.created_at)}</span>
            </div>

            <h1
              className="font-display max-w-[860px] font-black text-primary"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.6rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
            >
              {event.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-base pb-20 pt-0">
        <div className="container-v2">
          {image && (
            <Reveal mode="up" delay={0.35} inView={false} className="-mt-6 mb-12">
              <div className="grad-border overflow-hidden rounded-[20px]">
                <img src={image} alt={event.title ?? ""} className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[460px]" />
              </div>
            </Reveal>
          )}

          {event.body_html ? (
            <Reveal mode="up" delay={0.45} inView={false}>
              <div
                className="prose prose-invert prose-lg max-w-none text-muted
                  prose-headings:font-display prose-headings:text-primary prose-headings:font-black
                  prose-p:leading-[1.85] prose-p:text-[16px] sm:prose-p:text-[17px]
                  prose-a:text-violet-300 prose-a:no-underline hover:prose-a:text-primary
                  prose-strong:text-primary prose-blockquote:border-violet-500/50 prose-blockquote:text-primary/70"
                dangerouslySetInnerHTML={{ __html: event.body_html }}
              />
            </Reveal>
          ) : event.body ? (
            <Stagger className="flex flex-col gap-6" stagger={0.08} amount={0.05}>
              {event.body.split("\n\n").filter(Boolean).map((para, i) => (
                <StaggerItem key={i} mode="up">
                  <p className="text-[16px] text-muted sm:text-[17px]" style={{ lineHeight: 1.85 }}>
                    {para.replace(/[#*_`>]/g, "").trim()}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}

        </div>

        {related.length > 0 && (
          <div className="container-v2 mt-20">
            <Reveal mode="up" className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-black text-primary" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.04em" }}>
                  Інші <span className="text-grad">новини</span>
                </h2>
                <Link to={ROUTES.EVENTS} className="hidden text-[12px] font-semibold text-subtle transition-colors hover:text-primary sm:block">
                  Усі новини →
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
