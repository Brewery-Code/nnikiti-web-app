import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { PageTransition } from "@/widgets";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import {
  EntrantHero,
  StepItem,
  SectionHead,
  EntrantCta,
} from "./ui";
import type { Step, KeyDate } from "./ui";

import "swiper/css";
import "swiper/css/autoplay";

const programs = [
  {
    code: "121", departmentId: 4,
    name: "Інженерія програмного забезпечення",
    tags: ["Backend", "Frontend", "AI", "DevOps"],
    budget: 20, contract: 40,
  },
  {
    code: "122", departmentId: 2,
    name: "Комп'ютерні науки",
    tags: ["Algorithms", "ML", "Networks"],
    budget: 15, contract: 35,
  },
  {
    code: "123", departmentId: 3,
    name: "Комп'ютерна інженерія",
    tags: ["Hardware", "IoT", "Networks"],
    budget: 12, contract: 30,
  },
  {
    code: "125", departmentId: 3,
    name: "Кібербезпека",
    tags: ["Pentest", "SOC", "Crypto"],
    budget: 18, contract: 25,
  },
  {
    code: "126", departmentId: 2,
    name: "Інформаційні системи та технології",
    tags: ["ERP", "Cloud", "BI"],
    budget: 0, contract: 35,
  },
  {
    code: "051", departmentId: 2,
    name: "Економічна кібернетика",
    tags: ["Fintech", "Analytics", "AI"],
    budget: 0, contract: 28,
  },
  {
    code: "113", departmentId: 1,
    name: "Прикладна математика",
    tags: ["Modelling", "ML", "Optimisation"],
    budget: 10, contract: 0,
  },
  {
    code: "111", departmentId: 1,
    name: "Математика",
    tags: ["Algebra", "Analysis", "Logic"],
    budget: 8, contract: 0,
  },
];

const steps: Step[] = [
  {
    title: "Зареєструватися на НМТ",
    text:
      "Національний мультипредметний тест — обов'язкова умова вступу. Реєстрація відкривається у лютому–березні на сайті testportal.gov.ua.",
  },
  {
    title: "Скласти НМТ",
    text:
      "Обов'язкові предмети: українська мова та математика. Додатково — іноземна мова або профільний предмет за вибором.",
  },
  {
    title: "Подати заяву в ЄДЕБО",
    text:
      "До 5 заяв на різні спеціальності та університети. Заяви подаються онлайн через особистий кабінет вступника.",
  },
  {
    title: "Завантажити документи",
    text:
      "Атестат, паспорт, сертифікат НМТ та фото — все в електронному вигляді. Оригінали надаються після зарахування.",
  },
  {
    title: "Конкурсний відбір та зарахування",
    text:
      "Ранжування за конкурсним балом (НМТ + середній бал атестата). Держзамовлення — безоплатно, контракт — на основі угоди.",
  },
];

const dates: KeyDate[] = [
  {
    period: "Лютий – березень",
    label: "Реєстрація на НМТ",
    note: "На сайті testportal.gov.ua",
  },
  {
    period: "Червень",
    label: "Проведення НМТ",
    note: "Перевірте місце та час у кабінеті вступника",
  },
  {
    period: "01 – 22 липня",
    label: "Прийом заяв на бюджет",
    note: "До 5 заяв через ЄДЕБО",
  },
  {
    period: "22 – 30 липня",
    label: "Зарахування держзамовлення",
    note: "Рейтингові списки оновлюються щодня",
  },
  {
    period: "01 – 15 серпня",
    label: "Прийом заяв на контракт",
    note: "Оплатна форма навчання, без прохідного балу",
  },
];

function SpecCard({ spec }: { spec: (typeof programs)[0] }) {
  const [h, setH] = useState(false);
  return (
    <Link
      to={`/department/${spec.departmentId}?program=${spec.code}#curriculum`}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="spec-card grad-border flex h-full cursor-pointer flex-col rounded-2xl px-6 py-6 sm:rounded-[20px] sm:px-7 sm:py-7"
      style={{
        background: h
          ? "linear-gradient(135deg, rgba(166,132,255,0.10) 0%, rgba(81,162,255,0.08) 100%)"
          : "var(--bg-surface)",
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.02em", marginBottom: 14, color: "var(--text-subtle)", transition: "color 200ms" }}>
        Code:{" "}
        <span style={{ color: h ? "#fff" : "var(--text-muted)" }}>{spec.code}</span>
      </div>

      <h3
        className="font-display font-extrabold uppercase"
        style={{ fontSize: "clamp(1.15rem, 1.4vw, 1.4rem)", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: 22, minHeight: "2.4em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", color: h ? "#fff" : "var(--text-primary)", transition: "color 200ms" }}
      >
        {spec.name}
      </h3>

      <div className="mb-6 flex flex-wrap gap-2">
        {spec.tags.map((t) => (
          <span
            key={t}
            className="font-display inline-block uppercase"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", padding: "6px 16px", borderRadius: 999, color: "#fff", background: "linear-gradient(135deg, #a684ff 0%, #51a2ff 100%)", boxShadow: "0 4px 14px rgba(166,132,255,0.25)" }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-4">
        <div className="flex gap-5">
          {spec.budget > 0 && (
            <div>
              <div className="font-display font-extrabold" style={{ fontSize: "1rem" }}>{spec.budget}</div>
              <div style={{ fontSize: 9, color: "var(--text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>бюджет</div>
            </div>
          )}
          {spec.contract > 0 && (
            <div>
              <div className="font-display font-extrabold" style={{ fontSize: "1rem" }}>{spec.contract}</div>
              <div style={{ fontSize: 9, color: "var(--text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>контракт</div>
            </div>
          )}
        </div>
        <div
          className="flex flex-shrink-0 items-center justify-center"
          style={{ width: 36, height: 36, borderRadius: 10, background: h ? "linear-gradient(135deg, #a684ff, #51a2ff)" : "rgba(255,255,255,0.06)", color: h ? "#fff" : "var(--text-muted)", transition: "all 200ms", fontSize: 16 }}
        >
          ↗
        </div>
      </div>
    </Link>
  );
}

function ProgramsSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section className="bg-base py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end lg:mb-14">
          <div>
            <h2
              className="font-display font-black leading-none text-primary"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
            >
              Знайди свій <span className="text-grad">напрям</span>
            </h2>
            <p className="mt-3 text-[15px] text-muted" style={{ maxWidth: 480 }}>
              Від розробки до математики — обери програму, яка відповідає твоїм цілям і захопленням.
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev(600)}
              aria-label="Попередня програма"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-surface-md text-primary/70 transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500 hover:text-primary active:scale-95"
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>←</span>
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext(600)}
              aria-label="Наступна програма"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/[0.12] bg-surface-md text-primary/70 transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-violet-500 hover:to-blue-500 hover:text-primary active:scale-95"
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
            </button>
          </div>
        </Reveal>
      </div>

      <div className="overflow-hidden">
        <Swiper
          onSwiper={(s) => { swiperRef.current = s; }}
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={600}
          slidesPerView="auto"
          spaceBetween={20}
          allowTouchMove
          grabCursor
          className="specialties-swiper !overflow-visible py-2 [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
        >
          {programs.map((p) => (
            <SwiperSlide
              key={p.code}
              className="!w-[260px] sm:!w-[300px] lg:!w-[340px] xl:!w-[380px] 2xl:!w-[420px]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <SpecCard spec={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function BachelorPage() {
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow="Вступникам · Бакалаврат"
        title="Чотири роки до"
        gradientWord="кар'єри в IT"
        description="8 спеціальностей у сферах розробки, кібербезпеки, AI та математики. Держзамовлення, сучасні лабораторії та викладачі-практики з реального IT-ринку."
        imageSeed="/images/students-stage.jpg"
        stats={[
          { value: "4", label: "роки навчання" },
          { value: "8", label: "спеціальностей" },
          { value: "НМТ", label: "вступний іспит" },
        ]}
      />

      <div className="bg-base">
        <ProgramsSlider />

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <Reveal mode="left" amount={0.1}>
                <SectionHead
                  eyebrow="Вступна кампанія"
                  title="Як вступити"
                  gradientTitle="на бакалавра"
                  subtitle="Весь процес — онлайн через ЄДЕБО. Жодних черг і паперів до моменту зарахування."
                />

                <div className="grad-border mt-8 rounded-[20px] bg-surface p-6 backdrop-blur-xl">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
                    Предмети НМТ для вступу
                  </p>
                  {[
                    { subject: "Українська мова", required: true },
                    { subject: "Математика", required: true },
                    {
                      subject: "Іноземна мова або профільний предмет",
                      required: false,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 border-b border-ui-sm py-3 last:border-0"
                    >
                      <span
                        aria-hidden
                        className="h-2 w-2 flex-shrink-0 rounded-full"
                        style={{
                          background: item.required
                            ? "linear-gradient(135deg, #a684ff, #51a2ff)"
                            : "var(--text-subtle)",
                        }}
                      />
                      <span className="text-[14px] text-primary/75">
                        {item.subject}
                      </span>
                      {item.required && (
                        <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.06em] text-violet-300">
                          обов'язково
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>

              <Stagger className="flex flex-col" stagger={0.1} amount={0.1}>
                {steps.map((s, i) => (
                  <StaggerItem key={i} mode="right">
                    <StepItem
                      step={s}
                      number={i + 1}
                      index={i}
                      total={steps.length}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <Reveal mode="up" className="mb-12 lg:mb-16">
              <h2
                className="font-display font-black text-primary"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
              >
                Не пропусти <span className="text-grad">дедлайни</span>
              </h2>
            </Reveal>

            {/* Desktop timeline */}
            <div className="relative hidden lg:block">
              <div className="absolute left-[52px] right-[52px] top-[26px] h-px bg-gradient-to-r from-violet-500/20 via-violet-500/50 to-violet-500/20" />
              <Stagger className="grid grid-cols-5 gap-4" stagger={0.1} amount={0.05}>
                {dates.map((d, i) => (
                  <StaggerItem key={i} mode="up" className="flex flex-col items-center text-center">
                    <div className="relative z-10 mb-5 flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[14px] font-extrabold text-primary shadow-[0_0_28px_rgba(166,132,255,0.45)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="grad-border w-full rounded-[18px] bg-surface p-4 backdrop-blur-xl">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-violet-400">
                        {d.period}
                      </span>
                      <h3
                        className="font-display mt-2 font-bold text-primary"
                        style={{ fontSize: "0.88rem", letterSpacing: "-0.01em", lineHeight: 1.3 }}
                      >
                        {d.label}
                      </h3>
                      {d.note && (
                        <p className="mt-2 text-[11px] leading-relaxed text-subtle">{d.note}</p>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Mobile vertical timeline */}
            <div className="relative lg:hidden">
              <div className="absolute bottom-4 left-[23px] top-4 w-px bg-gradient-to-b from-violet-500/60 via-blue-500/30 to-transparent" />
              <Stagger className="flex flex-col gap-6" stagger={0.1} amount={0.05}>
                {dates.map((d, i) => (
                  <StaggerItem key={i} mode="left" className="flex items-start gap-5">
                    <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[12px] font-extrabold text-primary shadow-[0_0_20px_rgba(166,132,255,0.4)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="grad-border flex-1 rounded-[18px] bg-surface p-4 backdrop-blur-xl">
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-violet-400">
                        {d.period}
                      </span>
                      <h3
                        className="font-display mt-1.5 font-bold text-primary"
                        style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}
                      >
                        {d.label}
                      </h3>
                      {d.note && (
                        <p className="mt-1.5 text-[12px] leading-relaxed text-subtle">{d.note}</p>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        <EntrantCta
          title="Готовий вступити?"
          subtitle="Вступна комісія ННІКІТІ проконсультує з вибором спеціальності, документами та умовами навчання."
          primaryLabel="Зв'язатися з комісією"
        />
      </div>
    </PageTransition>
  );
}

export const Component = BachelorPage;
