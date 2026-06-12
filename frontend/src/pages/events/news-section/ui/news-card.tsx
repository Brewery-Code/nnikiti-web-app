import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";
import { formatDate, stripMarkdown } from "../../lib";

type ApiEvent = components["schemas"]["Events"];

export function NewsCard({ item }: { item: ApiEvent }) {
  const { t } = useTranslation("events-page");
  const image = resolveMediaUrl(item.cover);
  const rgb = item.category?.rgb_color;
  const tagBg = rgb ? `rgba${rgb}` : "rgba(166,132,255,0.85)";

  return (
    <Link to={`/news/${item.slug ?? item.id}`} className="spec-card grad-border group flex h-full flex-col overflow-hidden rounded-[16px] bg-surface backdrop-blur-xl sm:rounded-[20px]">
      <div className="relative h-44 overflow-hidden sm:h-52">
        {image ? (
          <img src={image} alt={item.title ?? ""} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-500/20 to-blue-500/20" />
        )}
        {item.category?.name && (
          <span className="font-display absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-primary" style={{ background: tagBg }}>
            {item.category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">{formatDate(item.event_date ?? item.created_at)}</p>
        <h3 className="font-display mb-2 line-clamp-3 flex-1 font-bold leading-snug text-primary" style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
          {item.title}
        </h3>
        <p className="line-clamp-2 text-[12px] leading-snug text-muted">{stripMarkdown(item.body)}</p>
        <span className="mt-3 self-start text-[12px] font-semibold text-violet-300 transition group-hover:text-primary">{t("readMore")}</span>
      </div>
    </Link>
  );
}
