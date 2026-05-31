import { PageTransition } from "@/widgets";
import { Stagger, StaggerItem } from "@/shared/ui";
import {
  EntrantHero,
  ProgramCard,
  StepItem,
  DateCard,
  SectionHead,
  EntrantCta,
} from "./ui";
import type { Program, Step, KeyDate } from "./ui";

const programs: Program[] = [
  {
    code: "01 – Освіта/Педагогіка",
    name: "Теорія та методика навчання",
    description:
      "Дослідження методик викладання інформатики та комп'ютерних дисциплін у вищій школі. Підготовка науково-педагогічних кадрів.",
    duration: "4 роки",
    seats: "Бюджет",
  },
  {
    code: "12 – Інформаційні технології",
    name: "Комп'ютерні науки (122)",
    description:
      "Алгоритми, штучний інтелект, machine learning, великі дані та теоретична інформатика. Публікації у Scopus та WoS.",
    duration: "4 роки",
    seats: "Бюджет + контракт",
  },
  {
    code: "12 – Інформаційні технології",
    name: "Комп'ютерна інженерія (123)",
    description:
      "Вбудовані системи, апаратна безпека, FPGA та промислова автоматизація. Співпраця з індустріальними партнерами.",
    duration: "4 роки",
    seats: "Бюджет",
  },
  {
    code: "11 – Математика та статистика",
    name: "Прикладна математика (113)",
    description:
      "Математичне моделювання, обчислювальна математика, теорія оптимізації та статистичний аналіз складних систем.",
    duration: "4 роки",
    seats: "Бюджет",
  },
];

const steps: Step[] = [
  {
    title: "Вибрати наукового керівника",
    text:
      "Зверніться до кафедри для вибору наукового напряму та узгодження теми дисертації з потенційним науковим керівником.",
  },
  {
    title: "Підготувати документи",
    text:
      "Диплом магістра (або спеціаліста), список публікацій (якщо є), реферат з обраної наукової теми та мотиваційний лист.",
  },
  {
    title: "Скласти вступні іспити",
    text:
      "Два іспити: іноземна мова (англійська) та фахова дисципліна за обраною спеціальністю. Проводяться в ННІКІТІ.",
  },
  {
    title: "Пройти конкурсний відбір",
    text:
      "Рейтинг формується з балів іспитів, середнього балу диплома магістра та наукових досягнень (публікації, патенти, конференції).",
  },
  {
    title: "Зарахування та початок роботи",
    text:
      "Після зарахування розпочинається розробка індивідуального плану, затвердження теми дисертації та перший рік навчання.",
  },
];

const dates: KeyDate[] = [
  {
    period: "Вересень – жовтень",
    label: "Прийом заяв та документів",
    note: "Подача через деканат або відділ аспірантури",
  },
  {
    period: "Листопад",
    label: "Вступні іспити",
    note: "Розклад оприлюднюється на сайті НУВГП",
  },
  {
    period: "1 грудня",
    label: "Наказ про зарахування",
    note: "Початок першого семестру з 1 грудня або 1 лютого",
  },
  {
    period: "Щорічно",
    label: "Звітна конференція аспірантів",
    note: "Публічний захист річного звіту перед кафедрою",
  },
];

const benefits = [
  {
    title: "Наукові публікації",
    text:
      "Підтримка публікацій у виданнях Scopus та Web of Science, участь у міжнародних конференціях.",
  },
  {
    title: "Академічна мобільність",
    text:
      "Стажування в університетах-партнерах Польщі, Литви та Чехії в рамках Erasmus+.",
  },
  {
    title: "Грантові програми",
    text:
      "Підтримка у пошуку фінансування через МОН України, Horizon Europe та двосторонні програми.",
  },
  {
    title: "Викладацька практика",
    text:
      "Аспіранти ведуть практичні заняття та отримують педагогічний досвід під керівництвом наставників.",
  },
];

function BenefitCard({ b }: { b: (typeof benefits)[0] }) {
  return (
    <div className="grad-border card-hover rounded-[20px] bg-surface p-5 backdrop-blur-xl sm:p-7">
      <h3
        className="font-display mb-3 font-bold text-primary"
        style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
      >
        {b.title}
      </h3>
      <p className="text-[14px] leading-relaxed text-muted">{b.text}</p>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-violet-500/40 via-blue-500/20 to-transparent" />
    </div>
  );
}

function PostgraduatePage() {
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow="Вступникам · Аспірантура"
        title="Шлях до"
        gradientWord="PhD"
        description="Чотирирічна програма наукової підготовки для тих, хто прагне стати дослідником, винахідником або науковим лідером у сфері IT та математики."
        imageSeed="/images/students-hall.jpg"
        stats={[
          { value: "4–5", label: "роки навчання" },
          { value: "4", label: "спеціальності" },
          { value: "PhD", label: "науковий ступінь" },
        ]}
      />

      <div className="bg-base">
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <SectionHead
              eyebrow="Можливості аспірантури"
              title="Що ти"
              gradientTitle="отримуєш"
              subtitle="Аспірантура — це не просто навчання. Це наукова спільнота, ресурси та міжнародні зв'язки."
            />
            <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.08} amount={0.05}>
              {benefits.map((b, i) => (
                <StaggerItem key={i} mode="up">
                  <BenefitCard b={b} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <SectionHead
              eyebrow="Наукові спеціальності"
              title="Обери свій"
              gradientTitle="напрям досліджень"
            />
            <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.08} amount={0.05}>
              {programs.map((p, i) => (
                <StaggerItem key={i} mode="up">
                  <ProgramCard program={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <SectionHead
                eyebrow="Вступна кампанія"
                title="Вступ до"
                gradientTitle="аспірантури"
                subtitle="Прийом — щорічно восени. Контакт із майбутнім науковим керівником рекомендується заздалегідь."
              />
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
            <SectionHead
              eyebrow="Важливі дати"
              title="Календар"
              gradientTitle="аспіранта"
            />
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08} amount={0.1}>
              {dates.map((d, i) => (
                <StaggerItem key={i} mode="up">
                  <DateCard date={d} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <EntrantCta
          title="Готовий до наукового шляху?"
          subtitle="Зверніться до відділу аспірантури НУВГП або безпосередньо до кафедри для вибору наукового керівника та узгодження теми."
          primaryLabel="Зв'язатися з відділом"
        />
      </div>
    </PageTransition>
  );
}

export const Component = PostgraduatePage;
