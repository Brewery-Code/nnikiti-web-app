import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams, Navigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { AnimatePresence, motion } from "framer-motion";
import { type DepartmentData, type SubjectType } from "@/shared/model/departments-data";
import { ROUTES } from "@/shared/model/routes";
import clsx from "clsx";
import { PageTransition } from "@/widgets";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { profilePlaceholder } from "@/shared/icons";
import { publicRqClient } from "@/shared/api/instance";
import { resolveMediaUrl } from "@/shared/model/config";
import type { components } from "@/shared/api/schema/generated";

type ApiDeptDetail = components["schemas"]["DepartmentDetail"];

const SUBJECT_TYPE_MAP: Record<"MN" | "EL", SubjectType> = {
  MN: "Нормативна",
  EL: "Вибіркова",
};

function mapApiToDept(api: ApiDeptDetail): DepartmentData {
  const head = api.head_of_department?.[0];
  return {
    id: api.id ?? 0,
    name: api.name ?? "",
    description: api.description ?? "",
    email: api.email ?? "",
    address: api.address ?? "",
    imageUrl: resolveMediaUrl((api as Record<string, unknown>).image as string | null),
    historyImageUrl: resolveMediaUrl((api as Record<string, unknown>).history_image as string | null),
    head: {
      full_name: head?.full_name ?? "",
      regalia: head?.regalia ?? "",
      email: head?.email ?? undefined,
      audience: head?.audience ?? undefined,
      imageUrl: resolveMediaUrl((head as Record<string, unknown>)?.image as string | null),
    },
    programs: api.educational_program?.map((prog) => ({
      id: prog.id ?? 0,
      code: prog.code ?? "",
      name: prog.name ?? prog.degree ?? "",
      description: prog.description ?? "",
      degree: prog.degree ?? "",
      duration: prog.duration !== null && prog.duration !== undefined ? `${prog.duration} р.` : "",
      form: prog.form ?? "",
      totalCredits: prog.total_credits ?? 0,
      subjects: prog.subjects?.map((s) => ({
        name: s.name ?? "",
        credits: Number(s.credits ?? 0),
        semester: s.semester ?? 1,
        type: SUBJECT_TYPE_MAP[s.type ?? "EL"],
      })) ?? [],
    })) ?? [],
    team: [
      ...(head ? [{
        name: head.full_name ?? "",
        role: head.regalia ?? "",
        specialty: "",
        email: head.email ?? undefined,
        audience: head.audience ?? undefined,
        imageUrl: resolveMediaUrl((head as Record<string, unknown>).image as string | null),
      }] : []),
      ...(api.team?.map((m) => ({
        name: m.name ?? "",
        role: m.role ?? "",
        specialty: m.specialty ?? "",
        email: m.email ?? undefined,
        audience: m.audience ?? undefined,
        imageUrl: resolveMediaUrl(m.image),
      })) ?? []),
    ],
    history: api.history?.map((h) => ({
      year: h.year ?? "",
      text: h.text ?? "",
    })) ?? [],
  };
}

function avatar(url?: string | null) {
  return url ?? profilePlaceholder;
}
const DEPT_PHOTOS = [
  "/images/students-stage.jpg",
  "/images/students-lecture.jpg",
  "/images/students-christmas.jpg",
  "/images/noosphere-workshop.jpg",
  "/images/students-event.jpg",
  "/images/students-tennis.jpg",
  "/images/vodnik-mascot.jpg",
  "/images/halloween-event.jpg",
  "/images/students-hall.jpg",
  "/images/students-audience.jpg",
  "/images/students-workshop.jpg",
  "/images/students-sport.jpg",
  "/images/students-guitar.jpg",
];
function cover(url?: string | null, seed = 0) {
  return url ?? DEPT_PHOTOS[seed % DEPT_PHOTOS.length];
}

const sections = [
  { id: "curriculum", label: "Навчальний план" },
  { id: "team",       label: "Команда" },
  { id: "history",    label: "Історія" },
  { id: "contacts",   label: "Контакти" },
];

function useSectionSpy() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) { return; }
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) { setActive(id); }
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return active;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) { return; }
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 88,
    behavior: "smooth",
  });
}

function Sidebar({
  departments,
  currentId,
}: {
  departments: { id: number; name: string }[];
  currentId: string;
}) {
  const activeSection = useSectionSpy();

  return (
    <aside className="hidden flex-shrink-0 self-start lg:sticky lg:top-24 lg:flex lg:w-64 xl:w-72">
      <div className="flex w-full flex-col gap-4">
        <div className="grad-border rounded-[18px] bg-surface p-4 backdrop-blur-xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
            — Кафедри
          </p>
          <ul className="flex flex-col gap-0.5">
            {departments.map((dept) => {
              const isActive = String(dept.id) === currentId;
              return (
                <li key={dept.id}>
                  <Link
                    to={`/department/${dept.id}`}
                    className={clsx(
                      "group relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-br from-violet-500/[0.15] to-blue-500/[0.10] font-semibold text-primary"
                        : "text-subtle hover:bg-surface-md hover:text-primary/80"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-violet-500 to-blue-500" />
                    )}
                    <span
                      className={clsx(
                        "h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all",
                        isActive
                          ? "bg-violet-400"
                          : "bg-white/15 group-hover:bg-white/40"
                      )}
                    />
                    <span className="leading-snug">{dept.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grad-border rounded-[18px] bg-surface p-4 backdrop-blur-xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
            — Розділи
          </p>
          <ul className="flex flex-col gap-0.5">
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className={clsx(
                      "group relative flex w-full cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-br from-violet-500/[0.15] to-blue-500/[0.10] font-semibold text-primary"
                        : "text-subtle hover:bg-surface-md hover:text-primary/80"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-violet-500 to-blue-500" />
                    )}
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function SectionTitle({
  title,
  highlight,
}: {
  title: string;
  highlight: string;
}) {
  return (
    <Reveal mode="up" className="mb-8 text-left sm:text-center">
      <h2
        className="font-display font-black text-primary"
        style={{ fontSize: "clamp(1.9rem, 2.8vw, 2.4rem)", letterSpacing: "-0.04em" }}
      >
        {title} <span className="text-grad">{highlight}</span>
      </h2>
    </Reveal>
  );
}

function CurriculumSection({ dept }: { dept: DepartmentData }) {
  const [searchParams] = useSearchParams();
  const programCode = searchParams.get("program");
  const initialIdx = programCode
    ? Math.max(0, dept.programs.findIndex((p) => p.code === programCode))
    : 0;
  const [activeIdx, setActiveIdx] = useState(initialIdx);

  useEffect(() => {
    if (!programCode) { return; }
    const el = document.getElementById("curriculum");
    if (!el) { return; }
    const timeout = setTimeout(() => {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
    }, 400);
    return () => clearTimeout(timeout);
  }, [programCode]);
  const prog = dept.programs[activeIdx] ?? dept.programs[0];

  const years = [1, 2, 3, 4]
    .map((year) => ({
      year,
      subjects: prog.subjects.filter(
        (s) => s.semester === year * 2 - 1 || s.semester === year * 2
      ),
    }))
    .filter((y) => y.subjects.length > 0);

  return (
    <section id="curriculum">
      <SectionTitle title="Програма" highlight="навчання" />

      {dept.programs.length > 0 && (
        <Reveal mode="up" className="mb-8 flex flex-wrap gap-2">
          {dept.programs.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIdx(i)}
              className={clsx(
                "rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-200",
                i === activeIdx
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)]"
                  : "grad-border bg-surface-md text-primary/60 backdrop-blur-md hover:text-primary"
              )}
            >
              <span className="mr-1.5 opacity-60">{p.code}</span>
              {p.name}
            </button>
          ))}
        </Reveal>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="mb-8 grid grid-cols-3 gap-2 pb-px sm:flex sm:flex-wrap sm:gap-3">
            {[
              { label: "Рівень",     value: prog.degree },
              { label: "Тривалість", value: prog.duration },
              { label: "Форма",      value: prog.form },
            ].map((meta, i) => (
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

          <div className="flex flex-col gap-4">
            {years.map(({ year, subjects }, yi) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.3, delay: yi * 0.08, ease: "easeOut" }}
                className="grad-border rounded-[20px] bg-white/[0.02] backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 border-b border-ui-sm px-5 py-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[11px] font-extrabold text-primary">
                    {year}
                  </span>
                  <span className="font-display text-[14px] font-bold text-primary">
                    {year} курс — {year * 2 - 1} та {year * 2} семестри
                  </span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {subjects.map((subject, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                      <span className="min-w-0 flex-1 text-[14px] text-primary/80">
                        {subject.name}
                      </span>
                      <div className="flex shrink-0 items-center gap-2">
                        <span
                          className={clsx(
                            "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em]",
                            subject.type === "Нормативна"
                              ? "border border-violet-500/30 bg-violet-500/[0.12] text-violet-300"
                              : "border border-ui bg-surface-md text-subtle"
                          )}
                        >
                          {subject.type === "Нормативна" ? "Норм." : "Вибір."}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

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
                Дисциплін
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function TeamMemberCard({ member, large = false }: { member: DepartmentData["team"][number]; large?: boolean }) {
  return (
    <div className="group overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0a0b12] shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={avatar(member.imageUrl)}
          alt={member.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0b12] to-transparent" />
        {member.audience && (
          <span className="absolute right-3 top-3 rounded-[8px] border border-white/10 bg-[#08090f]/75 px-2.5 py-1 text-[10px] text-subtle backdrop-blur-sm">
            Ауд. <span className="font-display font-bold text-primary">{member.audience}</span>
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className={clsx("font-display font-bold leading-tight text-primary", large ? "text-[17px]" : "text-[13px] sm:text-[14px]")}>
            {member.name}
          </p>
          <p className={clsx("mt-0.5 text-muted", large ? "text-[13px]" : "text-[10px] sm:text-[11px]")}>{member.role}</p>
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className={clsx("mt-1.5 inline-block max-w-full truncate text-violet-300", large ? "text-[12px]" : "text-[10px] sm:text-[11px]")}
            >
              {member.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function TeamSection({ dept }: { dept: DepartmentData }) {
  return (
    <section id="team" className="m-section">
      <SectionTitle title="Команда" highlight="кафедри" />

      {/* Mobile swiper */}
      <div className="-mx-4 sm:hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={12}
          centeredSlides
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={600}
        >
          {dept.team.map((member, i) => (
            <SwiperSlide key={i} style={{ width: "84%" }}>
              <TeamMemberCard member={member} large />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tablet+ grid */}
      <Stagger className="hidden sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-4" stagger={0.05} amount={0.05}>
        {dept.team.map((member, i) => (
          <StaggerItem key={i} mode="up">
            <TeamMemberCard member={member} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function HistorySection({ dept }: { dept: DepartmentData }) {
  return (
    <section id="history" className="m-section">
      <SectionTitle title="Історія" highlight="кафедри" />

      <div className="relative mb-10 overflow-hidden rounded-[20px]">
        <img
          src={cover(dept.historyImageUrl ?? dept.imageUrl, dept.id + 10)}
          alt=""
          className="h-[340px] w-full object-cover object-top sm:h-[420px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#08090f]/95 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
            З {dept.history[0]?.year?.split("–")[0] ?? "1959"} року
          </p>
          <p className="font-display mt-1.5 text-[20px] font-bold leading-tight text-primary sm:text-[26px]">
            Кафедра {dept.name.toLowerCase()}
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

function ContactsSection({ dept }: { dept: DepartmentData }) {
  const { head } = dept;
  return (
    <section id="contacts" className="m-section">
      <SectionTitle title="Контакти" highlight="кафедри" />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:grid-rows-[230px]">
        <Reveal mode="left" delay={0.05} className="lg:col-span-2">
          <a
            href={head.email ? `mailto:${head.email}` : undefined}
            className="group flex h-full overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0c0d18] transition-colors hover:border-white/[0.18]"
          >
            <div className="relative w-[120px] flex-shrink-0 overflow-hidden sm:w-[200px]">
              <img
                src={avatar(head.imageUrl)}
                alt={head.full_name}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-y-0 right-0 w-px bg-white/[0.08]" />
            </div>

            <div className="flex flex-1 flex-col justify-between p-4 sm:p-8">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
                  Завідувач кафедри
                </p>
                <p className="mt-2 font-display text-[16px] font-bold leading-[1.15] text-primary sm:mt-3 sm:text-[26px]">
                  {head.full_name}
                </p>
                {head.regalia && (
                  <p className="mt-1.5 text-[11px] leading-snug text-subtle sm:text-[13px]">
                    {head.regalia}
                  </p>
                )}
                {head.audience && (
                  <p className="mt-1 text-[11px] text-subtle sm:text-[13px]">
                    Ауд. {head.audience}
                  </p>
                )}
              </div>

              {head.email && (
                <span className="relative mt-3 inline-block self-start overflow-hidden text-ellipsis text-[11px] text-violet-300 sm:text-[13px]">
                  {head.email}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-violet-300 transition-[width] duration-300 ease-out group-hover:w-full" />
                </span>
              )}
            </div>
          </a>
        </Reveal>

        <div className="flex flex-col gap-3">
          <Reveal mode="right" delay={0.12} className="flex flex-1">
            <a
              href={`mailto:${dept.email}`}
              className="group flex flex-1 items-center gap-4 rounded-[18px] border border-white/[0.08] bg-[#0c0d18] p-5 transition-colors hover:border-white/[0.18]"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-white/[0.07]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-subtle">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-subtle">Email кафедри</p>
                <span className="relative mt-0.5 inline-block text-[13px] font-semibold text-primary/80">
                  {dept.email}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-white/50 transition-[width] duration-300 ease-out group-hover:w-full" />
                </span>
              </div>
            </a>
          </Reveal>

          <Reveal mode="right" delay={0.2} className="flex flex-1">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dept.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center gap-4 rounded-[18px] border border-white/[0.08] bg-[#0c0d18] p-5 transition-colors hover:border-white/[0.18]"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-white/[0.07]">
                <svg width="13" height="15" viewBox="0 0 14 18" fill="none" className="text-subtle">
                  <path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 7 4.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-subtle">Адреса</p>
                <span className="relative mt-0.5 inline-block text-[13px] font-semibold text-primary/80">
                  {dept.address}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-white/50 transition-[width] duration-300 ease-out group-hover:w-full" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Circuit board hero background ───────────────────────────────────────────
// Topology: IC_A(1080,360) ↔ IC_B(1320,180) ↔ IC_C(960,540) ↔ IC_D(840,720)
// IC_E(240,270) is a sparse left-side cluster; all traces connect logically.
function CircuitBackground() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Double rAF — ensures animations start after first paint is fully committed
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const primary = [
    "M  900 165 H 1380 V 330 H 1440",  // main right horizontal → spine
    "M 1080 480 V 330 H 1260",          // inner rectangle connector
  ];

  const secondary = [
    // Top rail — extended left into center
    "M  360  45 H  660",                // top rail left extension
    "M  360  45 V   0",                 // top exit at x=360
    "M  660  45 H 1140",                // top rail right portion
    "M  660  45 V   0",                 // top exit at x=660
    "M 1140  45 V 210 H 1380 V 330",    // top-right descent
    "M  900 165 V   0",                 // main rail top exit
    // Right side
    "M 1440 120 H 1260 V 210 H 1440",   // right-edge notch
    "M 1260 330 V 480 H 1440",          // lower-right branch
    "M  900 480 H 1440",                // bottom-right horizontal
    "M  900 480 V 630 H 1440",          // bottom exit
    // Center vertical connector
    "M  660  45 V 210",                 // center drop from top rail
    "M  480 390 V 210 H 660",           // center L → joins vertical
    "M  480 390 H   0",                 // center horizontal to left edge
    // Left side
    "M    0 165 H 360 V  45",           // left staircase → top rail
    "M    0 315 H 240",                 // left mid stub
    "M    0 510 H 180",                 // left lower stub
  ];

  const signals = [
    { d: "M 360 45 H 1140 V 210 H 1380 V 330 H 1440", dur: 16, delay: 0 },
    { d: "M 900 165 H 1380 V 330 H 1440",              dur: 9,  delay: 1 },
    { d: "M 1080 480 V 330 H 1260 V 480 H 1440",       dur: 8,  delay: 3 },
    { d: "M 1440 120 H 1260 V 210 H 1440",             dur: 4,  delay: 6 },
    { d: "M 900 480 V 630 H 1440",                     dur: 6,  delay: 4 },
    { d: "M 0 390 H 480 V 210 H 660 V 45",             dur: 10, delay: 2 },
    { d: "M 0 165 H 360 V 45 H 660",                   dur: 7,  delay: 5 },
  ];

  const vias = [
    // Top rail
    { cx:  360, cy:  45 }, { cx:  660, cy:  45 }, { cx: 1140, cy:  45 },
    // Center junction
    { cx:  660, cy: 210 }, { cx:  480, cy: 210 }, { cx:  480, cy: 390 },
    // Right cluster
    { cx: 1140, cy: 210 }, { cx: 1380, cy: 210 },
    { cx: 1380, cy: 330 }, { cx:  900, cy: 165 },
    { cx: 1080, cy: 330 }, { cx: 1260, cy: 330 },
    { cx: 1080, cy: 480 }, { cx: 1260, cy: 480 }, { cx: 900, cy: 480 },
    // Left side
    { cx:  360, cy: 165 }, { cx:  240, cy: 315 }, { cx: 180, cy: 510 },
  ];

  const corners = [
    { cx: 1260, cy: 120 }, { cx: 1260, cy: 210 },
    { cx: 1380, cy: 165 },
    { cx:  900, cy: 630 },
    { cx:  360, cy: 165 },
  ];


  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="cb-fade-y" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="55%"  stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="cb-mask">
          <rect width="1440" height="900" fill="url(#cb-fade-y)" />
        </mask>
      </defs>
      <style>{`
        @keyframes cb-signal {
          0%   { stroke-dashoffset: 2600; opacity: 0; }
          6%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes cb-via { 0%,100% { opacity: 0.38; } 50% { opacity: 0.85; } }
        @keyframes cb-dot { 0%,100% { opacity: 0.28; } 50% { opacity: 0.65; } }
      `}</style>

      <g mask="url(#cb-mask)">
        {/* Secondary traces — dim background wiring */}
        <g stroke="rgba(139,92,246,0.11)" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter">
          {secondary.map((d, i) => <path key={i} d={d} />)}
        </g>

        {/* Primary traces — main data buses */}
        <g stroke="rgba(139,92,246,0.26)" strokeWidth="1.3" strokeLinecap="square" strokeLinejoin="miter">
          {primary.map((d, i) => <path key={i} d={d} />)}
        </g>

        {/* Animated signals */}
        {signals.map((s, i) => (
          <path
            key={i} d={s.d}
            stroke="rgba(196,172,255,0.9)" strokeWidth="1.5"
            strokeLinecap="round" strokeDasharray="42 2600"
            style={ready ? {
              animation: `cb-signal ${s.dur}s linear infinite ${s.delay}s`,
              animationFillMode: "backwards",
            } : { opacity: 0 }}
          />
        ))}

        {/* Corner dots */}
        {corners.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r="2"
            fill="rgba(139,92,246,0.45)"
            style={ready ? { animation: `cb-dot ${2.8 + (i % 4) * 0.6}s ease-in-out infinite ${i * 0.28}s` } : undefined}
          />
        ))}

        {/* Vias */}
        {vias.map((v, i) => (
          <g key={i} style={ready ? { animation: `cb-via ${3.5 + i * 0.7}s ease-in-out infinite ${i * 0.6}s` } : undefined}>
            <circle cx={v.cx} cy={v.cy} r="5.5"
              fill="rgba(7,8,14,0.96)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" />
            <circle cx={v.cx} cy={v.cy} r="2.2" fill="rgba(167,139,250,0.75)" />
          </g>
        ))}
      </g>

    </svg>
  );
}

function MobileDeptSelector({
  deptList,
  departmentId,
}: {
  deptList: { id: number; name: string }[];
  departmentId: string;
}) {
  const [open, setOpen] = useState(false);
  const current = deptList.find((d) => String(d.id) === departmentId);

  return (
    <div className="relative mb-8 lg:hidden">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full select-none items-center justify-between rounded-[16px] border border-white/[0.09] bg-white/[0.04] px-5 py-4 text-left outline-none backdrop-blur-sm transition-colors duration-200"
      >
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-violet-400">
            Кафедра
          </p>
          <p className="mt-1 font-display text-[15px] font-bold leading-tight text-white">
            {current?.name ?? "Оберіть кафедру"}
          </p>
        </div>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="flex-shrink-0 text-white/30"
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </button>

      {/* Dropdown list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
            className="absolute inset-x-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-[16px] border border-white/[0.09] bg-[#0d0e1a] shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            {deptList.map((d, i) => {
              const isActive = String(d.id) === departmentId;
              return (
                <Link
                  key={d.id}
                  to={`/department/${d.id}`}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 px-5 py-3.5 text-[14px] font-medium transition-colors duration-150",
                    i < deptList.length - 1 && "border-b border-white/[0.05]",
                    isActive
                      ? "text-violet-300"
                      : "text-white/50 active:text-white/80"
                  )}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                  )}
                  <span className={clsx(!isActive && "pl-[18px]")}>{d.name}</span>
                  {isActive && (
                    <svg className="ml-auto flex-shrink-0 text-violet-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DepartmentPage() {
  const { departmentId } = useParams<{ departmentId: string }>();
  const numId = Number(departmentId);

  const deptListQuery = publicRqClient.useQuery("get", "/departments/", {}, { retry: false });
  const deptDetailQuery = publicRqClient.useQuery(
    "get",
    "/departments/{id}/",
    { params: { path: { id: numId } } },
    { retry: false },
  );

  if (deptDetailQuery.isError) {
    return <Navigate to={ROUTES.ERROR} replace />;
  }

  if (deptDetailQuery.isPending) { return null; }

  const dept = mapApiToDept(deptDetailQuery.data);
  const deptList = deptListQuery.data?.map((d) => ({ id: d.id ?? 0, name: d.name ?? "" })) ?? [];

  return (
    <PageTransition isPaddingOn={false} className="!pt-0 pb-0">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <CircuitBackground />

        {/* ── Desktop: full-height centered two-column ── */}
        <div className="hidden lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center">
          <div className="container-v2 relative py-28">
            <div className="grid w-full items-center gap-12 lg:grid-cols-2">
              <Stagger className="flex flex-col items-start" stagger={0.12} delay={0.2} inView={false}>
                <StaggerItem mode="up">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4">
                    <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-white">
                      ННІКІТІ
                    </span>
                    <span className="text-[12px] text-white/55">Кафедра</span>
                  </div>
                </StaggerItem>
                <StaggerItem mode="up">
                  <h1
                    className="font-display font-black text-white"
                    style={{ fontSize: "clamp(2.6rem, 4.5vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.92 }}
                  >
                    {dept.name}
                  </h1>
                </StaggerItem>
                <StaggerItem mode="up">
                  <p className="mt-6 text-[15px] leading-[1.8] text-white/50 sm:text-[16px]">
                    {dept.description}
                  </p>
                </StaggerItem>
              </Stagger>
              <Reveal mode="fade" delay={0.4} inView={false}>
                <div className="overflow-hidden rounded-[22px] shadow-[0_16px_64px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]">
                  <img
                    src={cover(dept.imageUrl, dept.id)}
                    alt={dept.name}
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── Mobile: badge + title → photo → description ── */}
        <div className="lg:hidden">
          {/* Badge + title */}
          <div className="container-v2 pb-6 pt-24">
            <Stagger className="flex flex-col items-start" stagger={0.12} delay={0.15} inView={false}>
              <StaggerItem mode="up">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4">
                  <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-white">
                    ННІКІТІ
                  </span>
                  <span className="text-[12px] text-white/55">Кафедра</span>
                </div>
              </StaggerItem>
              <StaggerItem mode="up">
                <h1
                  className="font-display font-black text-white"
                  style={{ fontSize: "clamp(2rem, 7vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
                >
                  {dept.name}
                </h1>
              </StaggerItem>
            </Stagger>
          </div>

          {/* Photo */}
          <Reveal mode="fade" delay={0.35} inView={false}>
            <div className="relative overflow-hidden">
              <img
                src={cover(dept.imageUrl, dept.id)}
                alt={dept.name}
                className="h-[240px] w-full object-cover object-top sm:h-[300px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080e]/80 via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* Description */}
          <Reveal mode="up" delay={0.1} className="container-v2 py-6">
            <p className="text-[14px] leading-[1.8] text-white/50">
              {dept.description}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="pb-12 sm:pb-16 lg:pb-20">
        <div className="container-v2">
          {/* Mobile department selector */}
          <MobileDeptSelector
            deptList={deptList}
            departmentId={departmentId ?? ""}
          />

          <div className="flex gap-fluid-sm">
            <Sidebar
              departments={deptList}
              currentId={departmentId ?? ""}
            />
            <main className="min-w-0 flex-1">
              <CurriculumSection dept={dept} />
              <TeamSection dept={dept} />
              <HistorySection dept={dept} />
              <ContactsSection dept={dept} />
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export const Component = DepartmentPage;
