import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { NEWS } from "./events-data";

function RelatedCard({ item }: { item: (typeof NEWS)[0] }) {
  return (
    <Link
      to={`/news/${item.id}`}
      className="spec-card grad-border group flex flex-col overflow-hidden rounded-[20px] bg-surface backdrop-blur-xl"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={item.imageSeed}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090f] via-transparent to-transparent" />
        <span
          className="font-display absolute bottom-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] text-primary"
          style={{ background: "linear-gradient(135deg,rgba(166,132,255,.85),rgba(81,162,255,.85))" }}
        >
          {item.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">{item.date}</p>
        <h3
          className="font-display line-clamp-3 flex-1 font-bold text-primary transition-colors group-hover:text-violet-200"
          style={{ fontSize: "0.9rem", letterSpacing: "-0.01em", lineHeight: 1.4 }}
        >
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

export function NewsItemPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const news = NEWS.find((n) => String(n.id) === id);

  if (!news) {
    return (
      <PageTransition className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <p className="text-[4rem]">📰</p>
        <p className="font-display text-[1.4rem] font-bold text-primary">Новину не знайдено</p>
        <Link
          to={ROUTES.EVENTS}
          className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-2.5 text-[14px] font-semibold text-primary"
        >
          До всіх новин
        </Link>
      </PageTransition>
    );
  }

  const related = NEWS.filter((n) => n.id !== news.id).slice(0, 3);

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      {/* ── Hero ── */}
      <div className="relative min-h-[420px] overflow-hidden bg-base sm:min-h-[500px]">
        <img
          src={news.imageSeed}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          style={{ filter: "blur(2px) scale(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090f]/60 via-[#08090f]/50 to-[#08090f]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-0 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle,rgba(166,132,255,.18) 0%,transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container-v2 relative flex h-full flex-col justify-end pb-12 pt-28 sm:pb-16 sm:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Back + breadcrumb */}
            <div className="mb-6 flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-subtle transition-colors hover:text-primary"
              >
                ← Назад
              </button>
              <span className="text-primary/20">/</span>
              <Link to={ROUTES.EVENTS} className="text-[12px] text-subtle transition-colors hover:text-primary">
                Новини
              </Link>
            </div>

            {/* Tag + date */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-primary"
                style={{ background: news.tagAccent + "33", border: `1px solid ${news.tagAccent}55`, color: news.tagAccent }}
              >
                {news.tag}
              </span>
              <span className="text-[12px] text-subtle">{news.date}</span>
            </div>

            {/* Title */}
            <h1
              className="font-display max-w-[860px] font-black text-primary"
              style={{
                fontSize: "clamp(1.8rem, 4.5vw, 3.6rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
              }}
            >
              {news.title}
            </h1>

            {/* Author */}
            <p className="mt-5 text-[14px] text-subtle">
              <span className="text-primary/25">Автор: </span>{news.author}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="bg-base pb-20 pt-0">
        <div className="container-v2 max-w-[860px]">

          {/* Cover image */}
          <Reveal mode="up" delay={0.35} inView={false} className="-mt-6 mb-12">
            <div className="grad-border overflow-hidden rounded-[20px]">
              <img
                src={news.imageSeed}
                alt={news.title}
                className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[460px]"
              />
            </div>
          </Reveal>

          {/* Lead excerpt */}
          <Reveal mode="up" delay={0.55} inView={false}>
            <p
              className="mb-10 border-l-2 border-violet-500/50 pl-5 text-[17px] leading-relaxed text-primary/70 sm:text-[18px]"
              style={{ lineHeight: 1.75 }}
            >
              {news.excerpt}
            </p>
          </Reveal>

          {/* Article body */}
          <Stagger className="flex flex-col gap-6" stagger={0.08} amount={0.05}>
            {news.content.map((paragraph, i) => (
              <StaggerItem key={i} mode="up">
                <p
                  className="text-[16px] text-muted sm:text-[17px]"
                  style={{ lineHeight: 1.85 }}
                >
                  {paragraph}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Meta footer */}
          <Reveal mode="up" className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-sm">
                  ✍
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">Автор</p>
                  <p className="text-[14px] font-semibold text-primary">{news.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[12px] text-subtle">{news.date}</span>
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em]"
                  style={{ background: news.tagAccent + "22", border: `1px solid ${news.tagAccent}44`, color: news.tagAccent }}
                >
                  {news.tag}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Related news ── */}
        {related.length > 0 && (
          <div className="container-v2 mt-20">
            <Reveal mode="up" className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-400">
                    — Читайте також
                  </p>
                  <h2
                    className="font-display font-black text-primary"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.04em" }}
                  >
                    Інші <span className="text-grad">новини</span>
                  </h2>
                </div>
                <Link
                  to={ROUTES.EVENTS}
                  className="hidden text-[12px] font-semibold text-subtle transition-colors hover:text-primary sm:block"
                >
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
