import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { publicRqClient } from "@/shared/api/instance";
import { AlumniList } from "./ui";
import clsx from "clsx";
import { Reveal } from "@/shared/ui";
import type { Alumni } from "./types";

const FALLBACK_YEARS = [2024, 2023, 2022, 2021, 2020];

const FALLBACK_ALUMNI: Alumni[] = [
  { id: 1,  full_name: "Олексій Мельник",    date_of_graduation: "2024-06-20", position: "Full Stack Developer",     workplace: "SoftServe",       major: "121 ІПЗ",         degree: "Бакалавр", text: "ННІКІТІ дало мені чудову базу для старту в IT." },
  { id: 2,  full_name: "Анна Коваленко",     date_of_graduation: "2024-06-20", position: "Data Scientist",           workplace: "EPAM Systems",    major: "122 КН",          degree: "Магістр",  text: "Дослідження в рамках магістратури відкрили нові горизонти." },
  { id: 3,  full_name: "Дмитро Шевченко",    date_of_graduation: "2024-06-20", position: "Cybersecurity Analyst",    workplace: "Intellias",       major: "125 Кібербезпека", degree: "Бакалавр", text: "Практика з кібербезпеки дала реальні навички захисту систем." },
  { id: 4,  full_name: "Марія Бондаренко",   date_of_graduation: "2023-06-20", position: "iOS Developer",            workplace: "GlobalLogic",     major: "121 ІПЗ",         degree: "Бакалавр", text: "Найкраще рішення — обрати ННІКІТІ для IT-освіти." },
  { id: 5,  full_name: "Сергій Кравченко",   date_of_graduation: "2023-06-20", position: "DevOps Engineer",          workplace: "Ciklum",          major: "126 ІСТ",         degree: "Магістр",  text: "Практичні курси підготували мене до реальних проєктів." },
  { id: 6,  full_name: "Юлія Ткаченко",      date_of_graduation: "2023-06-20", position: "Machine Learning Engineer", workplace: "Sigma Software",  major: "122 КН",          degree: "Бакалавр", text: "Кафедра комп'ютерних наук — це справжнє наукове середовище." },
  { id: 7,  full_name: "Максим Павленко",    date_of_graduation: "2022-06-20", position: "Backend Developer",        workplace: "Luxoft",          major: "121 ІПЗ",         degree: "Бакалавр", text: "Від студента до сеньора — завдяки якісній освіті ННІКІТІ." },
  { id: 8,  full_name: "Вікторія Гриценко",  date_of_graduation: "2022-06-20", position: "UX/UI Designer",           workplace: "Eleks",           major: "126 ІСТ",         degree: "Бакалавр", text: "ННІКІТІ відкрив для мене світ UX та цифрового дизайну." },
  { id: 9,  full_name: "Назар Лисенко",      date_of_graduation: "2022-06-20", position: "Security Engineer",        workplace: "Cisco",           major: "125 Кібербезпека", degree: "Магістр",  text: "Лабораторія кібербезпеки — це де формується справжній фахівець." },
  { id: 10, full_name: "Оксана Романенко",   date_of_graduation: "2021-06-20", position: "Systems Analyst",          workplace: "Oracle",          major: "124 СА",          degree: "Бакалавр", text: "Системний аналіз з ННІКІТІ — це фундамент для великих проєктів." },
  { id: 11, full_name: "Іван Морозенко",     date_of_graduation: "2021-06-20", position: "Embedded Systems Engineer", workplace: "Bosch",           major: "123 КІ",          degree: "Бакалавр", text: "Практичний підхід до навчання відразу дав результат у кар'єрі." },
  { id: 12, full_name: "Тетяна Власенко",    date_of_graduation: "2020-06-20", position: "Cloud Architect",          workplace: "AWS",             major: "122 КН",          degree: "Магістр",  text: "ННІКІТІ — це старт, від якого можна дійти до хмарних технологій." },
];

export function getYear(dateStr?: string) {
  if (!dateStr) return undefined;
  return Number(dateStr.split("-")[0]);
}

interface AlumniListSectionProps {
  className?: string;
}

export function AlumniListSection({ className }: AlumniListSectionProps) {
  useLoadNamespace("alumni", loadTranslations);
  const { t } = useTranslation("alumni");

  const inlineBarRef = useRef<HTMLDivElement>(null);
  const [showFixed, setShowFixed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", onScroll, { once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = inlineBarRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFixed(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const rawYears = publicRqClient.useQuery("get", "/core/alumni/years/").data;
  const rawAlumni = publicRqClient.useQuery("get", "/core/alumni/").data;

  const graduationYears = rawYears?.length ? rawYears : FALLBACK_YEARS;
  const alumniListData = rawAlumni?.length ? rawAlumni : FALLBACK_ALUMNI;

  function scrollToYear(e: React.MouseEvent<HTMLAnchorElement>, year: number) {
    e.preventDefault();
    const target = document.getElementById(String(year));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const yearButtons = graduationYears.map((year, i) => (
    <motion.a
      key={i}
      href={`#${year}`}
      onClick={(e) => scrollToYear(e, year)}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="grad-border rounded-full bg-surface px-5 py-2 text-[14px] font-bold text-primary/70 transition-colors duration-200 hover:bg-surface-lg hover:text-primary"
    >
      {year}
    </motion.a>
  ));

  return (
    <section className={clsx("py-12 sm:py-16 lg:py-24", className)}>
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 text-center lg:mb-14">
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-500">
            — Випускники
          </div>
          <h2
            className="font-display font-black"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Наші <span className="text-grad-animated">випускники</span>
          </h2>
        </Reveal>

        {/* Inline year bar — visible in natural page flow */}
        <div ref={inlineBarRef} className="mb-10 flex flex-wrap justify-center gap-2 lg:mb-12">
          {yearButtons}
        </div>

        {/* Fixed bottom bar — portal escapes ancestor transform/will-change */}
        {createPortal(
          <div
            className={clsx(
              "fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300",
              showFixed && hasScrolled && !footerVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
            )}
          >
            <div className="flex flex-wrap justify-center gap-2 rounded-2xl border border-ui bg-base/90 px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              {yearButtons}
            </div>
          </div>,
          document.body
        )}

        {graduationYears.map((year) => {
          const matchingAlumni = alumniListData.filter(
            (a) => getYear(a.date_of_graduation) === year
          );
          return (
            <AlumniList
              key={year}
              year={year}
              alumniList={matchingAlumni}
              titleText={t("alumniList.title")}
            />
          );
        })}
      </div>
    </section>
  );
}
