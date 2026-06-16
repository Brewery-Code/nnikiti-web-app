import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { marked } from "marked";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { BackButton, Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { GRANTS_DATA } from "./grants-data";
import { GrantCard } from "./grants-section/ui";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CATEGORY_STYLES = {
  grant: { bg: "rgba(56,189,132,0.18)", text: "rgb(52,211,153)", border: "rgba(52,211,153,0.35)" },
  competition: { bg: "rgba(166,132,255,0.18)", text: "rgb(196,168,255)", border: "rgba(166,132,255,0.35)" },
} as const;

function GrantItemPage() {
  useLoadNamespace("grants-page", loadTranslations);
  const { t } = useTranslation("grants-page");
  const { grantId } = useParams<{ grantId: string }>();
  const navigate = useNavigate();

  const item = GRANTS_DATA.find((g) => String(g.id) === grantId);
  const related = GRANTS_DATA.filter((g) => g.id !== item?.id).slice(0, 3);

  if (!item) return <Navigate to={ROUTES.SCIENCE_GRANTS} replace />;

  const styles = CATEGORY_STYLES[item.category];
  const bodyHtml = marked.parse(item.body, { breaks: true, gfm: true }) as string;

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">

      {/* ── Hero ── */}
      <div className="container-v2 pb-8 pt-28 sm:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="mb-7">
            <BackButton onClick={() => navigate(-1)} label={t("backButton")} />
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]"
              style={{ background: styles.bg, color: styles.text, border: `1px solid ${styles.border}` }}
            >
              {t(item.category)}
            </span>
          </div>

          <h1
            className="font-display font-black text-primary"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            {item.title}
          </h1>
        </motion.div>
      </div>

      {/* ── Meta card ── */}
      <div className="container-v2 pb-4">
        <Reveal mode="up" delay={0.15} inView={false}>
          <div className="grad-border flex flex-wrap gap-6 rounded-[20px] bg-surface p-6 sm:p-8">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-subtle">{t("organizerLabel")}</p>
              <p className="text-[15px] font-semibold text-primary">{item.organization}</p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-subtle">{t("deadlineLabel")}</p>
              <p className="text-[15px] font-semibold text-primary">
                {new Date(item.deadline).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            {item.amount && (
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-subtle">{t("amountLabel")}</p>
                <p className="text-[15px] font-semibold text-emerald-400">{item.amount}</p>
              </div>
            )}
            {item.link && (
              <div className="ml-auto flex items-end">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grad-border inline-flex items-center gap-2 rounded-[12px] bg-surface-md px-5 py-2.5 text-[13px] font-semibold text-primary/70 backdrop-blur-md transition-all duration-200 hover:bg-surface-xl hover:text-primary"
                >
                  {t("applyExternal")}
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* ── Body ── */}
      <div className="pb-24 pt-6">
        <div className="container-v2">
          <Reveal mode="up" delay={0.3} inView={false}>
            <div
              className="news-body prose prose-invert prose-lg mb-12 max-w-none
                prose-headings:font-display prose-headings:font-black
                prose-a:text-violet-300 hover:prose-a:text-white
                prose-blockquote:border-violet-500/60 prose-blockquote:not-italic
                prose-li:marker:text-violet-400
                prose-code:text-violet-300 prose-code:bg-white/5"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </Reveal>
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div className="container-v2 mt-16">
            <Reveal mode="up" className="mb-8">
              <div className="flex items-center justify-between">
                <h2
                  className="font-display font-black text-primary"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.04em" }}
                >
                  {t("otherOpportunities")} <span className="text-grad">{t("otherOpportunitiesHighlight")}</span>
                </h2>
                <Link
                  to={ROUTES.SCIENCE_GRANTS}
                  className="hidden text-[12px] font-semibold text-subtle transition-colors hover:text-primary sm:block"
                >
                  {t("allGrants")}
                </Link>
              </div>
            </Reveal>

            <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.08} amount={0.1}>
              {related.map((relItem) => (
                <StaggerItem key={relItem.id} mode="up">
                  <GrantCard item={relItem} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export const Component = GrantItemPage;
