import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { type DepartmentData } from "@/shared/model/departments-data";
import { Reveal } from "@/shared/ui";
import { SectionTitle } from "../ui";

const DEGREE_KEYS = ["bachelor", "master", "postgraduate"] as const;

export function CurriculumSection({ dept }: { dept: DepartmentData }) {
  const { t } = useTranslation("department");
  const [searchParams] = useSearchParams();
  const programCode = searchParams.get("program");
  const programIdParam = searchParams.get("program_id");

  const DEGREE_OPTIONS = DEGREE_KEYS.map((key) => t(`degrees.${key}`));

  const availableDegrees = DEGREE_OPTIONS.filter((d) =>
    dept.programs.some((p) => p.degree === d)
  );

  const findProgram = () => {
    if (programIdParam) return dept.programs.find((p) => p.id === parseInt(programIdParam));
    if (programCode) return dept.programs.find((p) => p.code === programCode);
    return undefined;
  };

  const initialDegree = (() => {
    const p = findProgram();
    if (p?.degree && (DEGREE_OPTIONS as string[]).includes(p.degree)) return p.degree;
    return availableDegrees[0] ?? "";
  })();

  const [activeDegree, setActiveDegree] = useState(initialDegree);

  const degreePrograms = dept.programs.filter((p) => p.degree === activeDegree);

  const initialProgramIdx = (() => {
    const p = findProgram();
    if (p) return Math.max(0, degreePrograms.findIndex((dp) => dp.id === p.id));
    return 0;
  })();

  const [activeProgramIdx, setActiveProgramIdx] = useState(initialProgramIdx);

  const handleDegreeChange = (degree: string) => {
    setActiveDegree(degree);
    setActiveProgramIdx(0);
  };

  const hasDeepLink = !!(programCode || programIdParam);

  useEffect(() => {
    if (!hasDeepLink) { return; }
    const el = document.getElementById("curriculum");
    if (!el) { return; }
    const timeout = setTimeout(() => {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
    }, 400);
    return () => clearTimeout(timeout);
  }, [hasDeepLink]);

  const prog = degreePrograms[activeProgramIdx] ?? degreePrograms[0];

  const allSubjects = prog?.subjects ?? [];

  const metaItems = [
    { label: t("curriculum.meta_duration"), value: prog?.duration },
    { label: t("curriculum.meta_form"),     value: prog?.form },
  ];

  return (
    <section id="curriculum">
      <SectionTitle title={t("curriculum.section_title")} highlight={t("curriculum.section_highlight")} />

      {/* Degree selector */}
      <Reveal mode="up" className="mb-4 flex flex-wrap gap-2">
        {DEGREE_OPTIONS.map((degree) => {
          const available = availableDegrees.includes(degree);
          const active = degree === activeDegree;
          return (
            <button
              key={degree}
              onClick={() => available && handleDegreeChange(degree)}
              disabled={!available}
              className={clsx(
                "rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                  : available
                    ? "grad-border bg-surface-md text-primary/60 backdrop-blur-md hover:text-primary"
                    : "border border-white/[0.06] bg-transparent text-white/20 cursor-not-allowed"
              )}
            >
              {degree}
            </button>
          );
        })}
      </Reveal>

      {/* Program selector */}
      {degreePrograms.length > 0 && (
        <Reveal mode="up" className="mb-8 flex flex-wrap gap-2">
          {degreePrograms.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveProgramIdx(i)}
              className={clsx(
                "rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-200",
                i === activeProgramIdx
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                  : "grad-border bg-surface-md text-primary/60 backdrop-blur-md hover:text-primary"
              )}
            >
              <span className="mr-1.5 opacity-60">{p.code}</span>
              {p.name}
            </button>
          ))}
        </Reveal>
      )}

      {prog && <AnimatePresence mode="wait">
        <motion.div
          key={`${activeDegree}-${activeProgramIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="mb-8 grid grid-cols-2 gap-2 pb-px sm:flex sm:flex-wrap sm:gap-3">
            {metaItems.map((meta, i) => (
              <motion.div
                key={meta.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.25, delay: i * 0.07, ease: "easeOut" }}
                className="grad-border flex flex-col rounded-[14px] bg-surface px-4 py-3 backdrop-blur-xl"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
                  {meta.label}
                </span>
                <span className="mt-0.5 text-[14px] font-semibold text-primary">{meta.value}</span>
              </motion.div>
            ))}
          </div>

          {allSubjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grad-border rounded-[20px] bg-white/[0.02] backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 border-b border-ui-sm px-4 py-3 sm:px-5 sm:py-4">
                <span className="font-display text-[13px] font-bold text-primary sm:text-[14px]">
                  {t("curriculum.subjects_label")}
                </span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {allSubjects.map((subject, i) => (
                  <div key={i} className="px-4 py-3 sm:px-5 sm:py-3.5">
                    <span className="text-[13px] leading-snug text-primary/80 sm:text-[14px]">
                      {subject.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            className="mt-6 pb-px"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="grad-border rounded-[16px] bg-surface p-4 text-center backdrop-blur-xl">
              <p className="font-display text-[1.8rem] font-extrabold text-primary">
                {prog.subjects.length}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-subtle">
                {t("curriculum.disciplines_label")}
              </p>
            </div>
          </motion.div>

          {prog.learnMoreUrl && (
            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            >
              <a
                href={prog.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(166,132,255,0.45)] active:scale-95"
              >
                {t("curriculum.learn_more")}
              </a>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>}
    </section>
  );
}
