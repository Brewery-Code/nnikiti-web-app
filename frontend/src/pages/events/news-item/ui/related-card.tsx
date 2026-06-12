import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";
import { formatDate } from "../../lib";

type ApiEvent = components["schemas"]["Events"];

export function RelatedCard({ item }: { item: ApiEvent }) {
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
