import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { GRANTS_DATA } from "../grants-data";
import { GrantCard } from "./ui";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PAGE_SIZE = 6;

export function GrantsSection() {
  const { t } = useTranslation("grants-page");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = GRANTS_DATA.slice(0, visibleCount);
  const hasMore = visible.length < GRANTS_DATA.length;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" className="mb-6 sm:mb-10 lg:mb-14">
          <h2
            className="font-display font-black text-primary"
            style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            {t("sectionTitle")} <span className="text-grad">{t("sectionHighlight")}</span>
          </h2>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {visible.map((item, index) => (
              <motion.div
                key={item.id}
                className="h-full"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: index * 0.06 }}
              >
                <GrantCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="grad-border inline-flex items-center gap-2 rounded-[12px] bg-surface-md px-7 py-3 text-[14px] font-semibold text-primary/70 backdrop-blur-md transition-all duration-200 hover:bg-surface-xl hover:text-primary"
            >
              {t("loadMore")} <span aria-hidden className="text-violet-400">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
