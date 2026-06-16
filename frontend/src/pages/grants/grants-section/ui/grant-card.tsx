import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/model/routes";
import type { GrantItem, GrantCategory } from "../../grants-data";

export type { GrantItem, GrantCategory };

const CATEGORY_STYLES: Record<GrantCategory, { bg: string; text: string; border: string }> = {
  grant: {
    bg: "rgba(56,189,132,0.18)",
    text: "rgb(52,211,153)",
    border: "rgba(52,211,153,0.35)",
  },
  competition: {
    bg: "rgba(166,132,255,0.18)",
    text: "rgb(196,168,255)",
    border: "rgba(166,132,255,0.35)",
  },
};

export function GrantCard({ item }: { item: GrantItem }) {
  const { t } = useTranslation("grants-page");
  const styles = CATEGORY_STYLES[item.category];

  return (
    <Link
      to={ROUTES.SCIENCE_GRANT_ITEM.replace(":grantId", String(item.id))}
      className="spec-card grad-border group flex h-full flex-col overflow-hidden rounded-[16px] bg-surface backdrop-blur-xl sm:rounded-[20px]"
    >
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span
            className="font-display shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em]"
            style={{ background: styles.bg, color: styles.text, border: `1px solid ${styles.border}` }}
          >
            {t(item.category)}
          </span>
          {item.amount && (
            <span className="text-right text-[13px] font-semibold text-emerald-400">{item.amount}</span>
          )}
        </div>

        <h3
          className="font-display mb-2 flex-1 font-bold leading-snug text-primary"
          style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}
        >
          {item.title}
        </h3>

        <p className="mb-4 line-clamp-3 text-[12px] leading-snug text-muted">{item.description}</p>

        <div className="mt-auto border-t border-white/5 pt-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-subtle">{item.organization}</p>
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted">
              <span className="font-semibold text-subtle">{t("deadline")}:</span>{" "}
              {new Date(item.deadline).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <span className="text-[12px] font-semibold text-violet-300 transition group-hover:text-primary">
              {t("apply")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
