import { Link } from "react-router-dom";
import { PageTransition } from "@/widgets";
import { ROUTES } from "@/shared/model/routes";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";

const pillars = [
  {
    icon: "◈",
    title: "Якість освіти",
    text: "Оновлення навчальних програм щороку відповідно до актуальних вимог IT-ринку. Проєктне навчання, менторство від практиків, індустріальні лабораторії.",
  },
  {
    icon: "⬡",
    title: "Наукові дослідження",
    text: "Підтримка публікацій у Scopus та Web of Science, грантові програми для студентів і викладачів, щорічні науково-практичні конференції.",
  },
  {
    icon: "◎",
    title: "Цифрова інфраструктура",
    text: "Модернізація лабораторій кібербезпеки, AI/ML та IoT. Доступ до хмарних платформ AWS, Azure та GCP для кожного студента.",
  },
  {
    icon: "⬟",
    title: "Міжнародне партнерство",
    text: "Розширення мережі Erasmus+, програми подвійних дипломів із університетами Польщі, Чехії та Литви, спільні дослідницькі проєкти.",
  },
  {
    icon: "◉",
    title: "Студентський розвиток",
    text: "Кар'єрний центр, хакатони, стартап-акселератор, доступ до коворкінгу 24/7 і менторська мережа з понад 200 випускників-практиків.",
  },
  {
    icon: "◬",
    title: "Сталий розвиток",
    text: "Зелений кампус, цифровізація документообігу, підтримка інклюзивної освіти та рівного доступу до якісних IT-програм.",
  },
];

const roadmap = [
  {
    period: "2024–2025",
    title: "Модернізація",
    items: ["Оновлення 6 навчальних лабораторій", "Нова спеціальність «AI-інженерія»", "Запуск кар'єрного порталу"],
  },
  {
    period: "2025–2026",
    title: "Партнерства",
    items: ["5 нових Erasmus+ угод", "Корпоративна лабораторія з IT-партнером", "Міжнародна акредитація програм"],
  },
  {
    period: "2026–2027",
    title: "Інновації",
    items: ["Відкриття стартап-акселератора", "Регіональний центр кібербезпеки", "Програма подвійних дипломів"],
  },
  {
    period: "2027–2030",
    title: "Лідерство",
    items: ["Топ-3 IT-інститути України", "1 000+ студентів щороку", "Власний технологічний парк"],
  },
];

const values = [
  {
    title: "Академічна свобода",
    text: "Вільна думка, критичне мислення і відкритий обмін знаннями — основа нашого навчального середовища.",
  },
  {
    title: "Практичність",
    text: "Кожен курс має реальне застосування. Ми навчаємо не теорії заради теорії, а інструментів, які працюють.",
  },
  {
    title: "Інклюзивність",
    text: "Рівні можливості для кожного студента незалежно від бекграунду, регіону чи фізичних особливостей.",
  },
  {
    title: "Відповідальність",
    text: "Технології змінюють суспільство. Ми виховуємо фахівців, які усвідомлюють етичний вимір своєї роботи.",
  },
];

function SectionTitle({
  eyebrow: _eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description?: string;
}) {
  return (
    <Reveal mode="up" className="mb-10 text-center lg:mb-14">
      <h2
        className="font-display font-black text-primary"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.04em" }}
      >
        {title} <span className="text-grad">{highlight}</span>
      </h2>
      {description && (
        <p
          className="mx-auto mt-4 text-[15px] leading-relaxed text-muted sm:text-[17px]"
          style={{ maxWidth: 580 }}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-base pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[15%] -top-[20%] h-[700px] w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[15%] -right-[10%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(81,162,255,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <Stagger className="container-v2 relative z-[1]" stagger={0.1} delay={0.35} inView={false}>
        <StaggerItem mode="scale" className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
            2024 — 2030
          </span>
          <span className="text-[12px] text-primary/70">Стратегічний план</span>
        </StaggerItem>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <StaggerItem mode="left">
            <h1
              className="font-display font-black text-primary"
              style={{
                fontSize: "clamp(2rem, 7vw, 6.5rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              Стратегія <span className="text-grad">розвитку</span>
              <br />
              ННІКІТІ
            </h1>
          </StaggerItem>

          <StaggerItem mode="right" className="flex flex-col gap-6 lg:pb-2">
            <p className="text-[15px] leading-relaxed text-muted sm:text-[17px]">
              Шість стратегічних напрямів, що визначають розвиток інституту до
              2030 року — від якості освіти до міжнародного лідерства в
              IT-підготовці.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Освіта", "Наука", "Партнерства", "Інновації"].map((tag) => (
                <span
                  key={tag}
                  className="font-display rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-primary"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(166,132,255,0.20) 0%, rgba(81,162,255,0.20) 100%)",
                    border: "1px solid rgba(166,132,255,0.30)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </StaggerItem>
        </div>
      </Stagger>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#08090f]" />
    </section>
  );
}

function MissionVision() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Stagger className="container-v2 grid gap-5 lg:grid-cols-2" stagger={0.15} amount={0.15}>
        <StaggerItem mode="left" className="grad-border relative overflow-hidden rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(166,132,255,0.20) 0%, transparent 70%)",
            }}
          />
          <div className="mb-4 flex items-center gap-3">
            <span className="text-grad text-2xl">◈</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
              Місія
            </span>
          </div>
          <p
            className="font-display font-bold leading-snug text-primary"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)", letterSpacing: "-0.02em" }}
          >
            Готувати IT-фахівців світового рівня, здатних вирішувати реальні
            задачі та рухати технологічний прогрес України вперед.
          </p>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />
          <p className="mt-4 text-[14px] leading-relaxed text-primary/50">
            Ми існуємо, щоб перетворювати талант на компетенцію, а компетенцію —
            на зміни в суспільстві.
          </p>
        </StaggerItem>

        <StaggerItem mode="right" className="grad-border relative overflow-hidden rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(81,162,255,0.20) 0%, transparent 70%)",
            }}
          />
          <div className="mb-4 flex items-center gap-3">
            <span className="text-grad text-2xl">◎</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400">
              Візія
            </span>
          </div>
          <p
            className="font-display font-bold leading-snug text-primary"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)", letterSpacing: "-0.02em" }}
          >
            Стати визнаним лідером IT-освіти в Україні та увійти до топ-100
            профільних закладів Центральної Європи до 2030 року.
          </p>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-blue-500/40 via-violet-500/20 to-transparent" />
          <p className="mt-4 text-[14px] leading-relaxed text-primary/50">
            Університет, де кожен студент знаходить шлях від ідеї до продукту,
            що змінює світ.
          </p>
        </StaggerItem>
      </Stagger>
    </section>
  );
}

function Pillars() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <SectionTitle
          eyebrow="Стратегічні напрями"
          title="Шість пріоритетів"
          highlight="розвитку"
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} amount={0.05}>
          {pillars.map((p, i) => (
            <StaggerItem
              key={i}
              mode="up"
              className="spec-card grad-border relative overflow-hidden rounded-[20px] bg-surface p-5 backdrop-blur-xl sm:p-7"
            >
              <span
                className="text-grad mb-5 block"
                style={{ fontSize: "1.8rem" }}
              >
                {p.icon}
              </span>
              <h3
                className="font-display mb-3 font-bold text-primary"
                style={{ fontSize: "1.05rem", letterSpacing: "-0.02em" }}
              >
                {p.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted">
                {p.text}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <SectionTitle
          eyebrow="Дорожня карта"
          title="Що чекає"
          highlight="попереду"
          description="Конкретні кроки і результати, заплановані на кожен етап стратегічного плану."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1} amount={0.05}>
          {roadmap.map((item) => (
            <StaggerItem
              key={item.period}
              mode="up"
              className="grad-border relative flex flex-col rounded-[20px] bg-surface p-5 backdrop-blur-xl sm:p-7"
            >
              <span
                className="font-display mb-5 self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-primary"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(166,132,255,0.85) 0%, rgba(81,162,255,0.85) 100%)",
                }}
              >
                {item.period}
              </span>
              <h3
                className="font-display mb-4 font-bold text-primary"
                style={{ fontSize: "1.15rem", letterSpacing: "-0.02em" }}
              >
                {item.title}
              </h3>
              <ul className="mt-auto flex flex-col gap-2.5">
                {item.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[12px] text-primary/60"
                  >
                    <span
                      aria-hidden
                      className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                    />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <SectionTitle
          eyebrow="Наші цінності"
          title="На чому ми"
          highlight="стоїмо"
        />
        <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.1} amount={0.1}>
          {values.map((v) => (
            <StaggerItem
              key={v.title}
              mode="up"
              className="grad-border flex gap-5 rounded-[18px] bg-surface p-7 backdrop-blur-xl"
            >
              <div
                aria-hidden
                className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-blue-500"
                style={{ boxShadow: "0 0 12px rgba(166,132,255,0.5)" }}
              />
              <div>
                <h3
                  className="font-display mb-2 font-bold text-primary"
                  style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
                >
                  {v.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  {v.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(166,132,255,0.10) 0%, transparent 70%)",
        }}
      />
      <Stagger className="container-v2 relative z-[1] flex flex-col items-center text-center" stagger={0.1}>
        <StaggerItem
          as="h2"
          mode="up"
          className="font-display font-black text-primary"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          Стратегія — це ми <span className="text-grad">разом</span>
        </StaggerItem>
        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] leading-relaxed text-primary/60 sm:text-[17px]"
          style={{ maxWidth: 580 }}
        >
          Студенти, викладачі та партнери — усі є рушійною силою розвитку
          ННІКІТІ. Долучайся до інституту, що будує майбутнє IT-освіти.
        </StaggerItem>
        <StaggerItem mode="up" className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.CONTACTS}
            className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] active:scale-95 sm:text-[17px]"
          >
            Зв'язатися з нами <span aria-hidden>→</span>
          </Link>
          <Link
            to={ROUTES.HISTORY}
            className="inline-flex items-center gap-2 rounded-[14px] border border-white/15 bg-surface-md px-7 py-3.5 text-[15px] font-semibold text-primary backdrop-blur-md transition-all duration-200 hover:bg-surface-xl active:scale-95 sm:text-[17px]"
          >
            Наша історія <span aria-hidden>→</span>
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  );
}

function StrategyPage() {
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <Hero />
      <div className="bg-base">
        <MissionVision />
        <Pillars />
        <Roadmap />
        <Values />
        <Cta />
      </div>
    </PageTransition>
  );
}

export const Component = StrategyPage;
