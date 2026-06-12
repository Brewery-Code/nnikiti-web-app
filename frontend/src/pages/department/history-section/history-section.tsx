import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { type DepartmentData } from "@/shared/model/departments-data";
import { Stagger, StaggerItem } from "@/shared/ui";
import { SectionTitle } from "../ui";
import { cover } from "../lib";

export function HistorySection({ dept }: { dept: DepartmentData }) {
  const { t } = useTranslation("department");
  return (
    <section id="history" className="mt-24 sm:mt-32 lg:m-section">
      <SectionTitle title={t("history.section_title")} highlight={t("history.section_highlight")} />

      <div className="relative mb-6 overflow-hidden rounded-[16px] sm:mb-10 sm:rounded-[20px]">
        <img
          src={cover(dept.historyImageUrl ?? dept.imageUrl, dept.id + 10)}
          alt=""
          loading="lazy"
          className="h-[200px] w-full object-cover object-top sm:h-[340px] lg:h-[420px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#08090f]/95 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
            {t("history.since", { year: dept.history[0]?.year?.split("–")[0] ?? "1959" })}
          </p>
          <p className="font-display mt-1.5 text-[20px] font-bold leading-tight text-primary sm:text-[26px]">
            {t("history.dept_name", { name: dept.name.toLowerCase() })}
          </p>
        </div>
      </div>

      <Stagger className="relative flex flex-col gap-7 pl-8" stagger={0.1} amount={0.05}>
        <motion.div
          className="absolute bottom-0 left-1.5 top-0 w-px origin-top bg-gradient-to-b from-violet-500/50 via-blue-500/25 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.05 }}
        />
        {dept.history.map((item, i) => (
          <StaggerItem key={i} mode="left" className="relative">
            <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-violet-400 bg-base" />
            <span className="font-display text-[12px] font-bold text-violet-300">
              {item.year}
            </span>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
