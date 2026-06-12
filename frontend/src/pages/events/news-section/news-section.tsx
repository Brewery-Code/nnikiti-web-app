import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { publicRqClient } from "@/shared/api/instance";
import type { components } from "@/shared/api/schema/generated";
import { SectionTitle } from "../ui";
import { NewsCard } from "./ui";

type ApiEvent = components["schemas"]["Events"];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function NewsSection() {
  const { t } = useTranslation("events-page");
  const [visibleCount, setVisibleCount] = useState(6);
  const prevCountRef = useRef(0);
  const { data, isPending } = publicRqClient.useQuery("get", "/events/", {});
  const events = ((data ?? []) as ApiEvent[]).filter((e) => !!e.title);
  const visible = events.slice(0, visibleCount);
  const hasMore = visible.length < events.length;

  const handleLoadMore = () => {
    prevCountRef.current = visibleCount;
    setVisibleCount((c) => c + 6);
  };

  if (isPending) {
    return (
      <section id="news" className="scroll-mt-24 py-8 sm:py-16 lg:py-20">
        <div className="container-v2">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {[0,1,2,3,4,5].map((i) => <div key={i} className="h-80 animate-pulse rounded-[20px] bg-surface" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!events.length) {
    return (
      <section id="news" className="scroll-mt-24 py-8 sm:py-16 lg:py-20">
        <div className="container-v2 flex flex-col items-center py-20 text-center">
          <p className="text-[15px] text-subtle">{t("noNews")}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="scroll-mt-24 py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <SectionTitle title={t("newsTitle")} highlight={t("newsHighlight")} />
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {visible.map((item, index) => (
              <motion.div
                key={item.id}
                className="h-full"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                  delay: Math.max(0, index - prevCountRef.current) * 0.07,
                }}
              >
                <NewsCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button onClick={handleLoadMore}
              className="grad-border inline-flex items-center gap-2 rounded-[12px] bg-surface-md px-7 py-3 text-[14px] font-semibold text-primary/70 backdrop-blur-md transition-all duration-200 hover:bg-surface-xl hover:text-primary">
              {t("loadMore")} <span aria-hidden className="text-violet-400">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
