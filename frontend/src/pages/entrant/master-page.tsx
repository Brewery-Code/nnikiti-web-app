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
    code: "121",
    name: "Інженерія програмного забезпечення",
    description:
      "Архітектура складних систем, технічне лідерство, хмарні рішення та управління командами розробки.",
    duration: "1,5 роки",
    seats: "Бюджет + контракт",
  },
  {
    code: "122",
    name: "Комп'ютерні науки",
    description:
      "Глибоке занурення в AI, ML та нейромережі. Дослідницька та прикладна магістратура з орієнтацією на Scopus-публікації.",
    duration: "1,5 роки",
    seats: "Бюджет + контракт",
  },
  {
    code: "123",
    name: "Комп'ютерна інженерія",
    description:
      "Проєктування вбудованих систем, промисловий IoT, FPGA та системне програмування на рівні ядра.",
    duration: "1,5 роки",
    seats: "Бюджет",
  },
  {
    code: "125",
    name: "Кібербезпека",
    description:
      "Управління ризиками, forensics, побудова SOC, відповідність ISO 27001 та GDPR. Підготовка CISO та аналітиків безпеки.",
    duration: "1,5 роки",
    seats: "Бюджет + контракт",
  },
  {
    code: "126",
    name: "Інформаційні системи та технології",
    description:
      "Digital transformation, корпоративна архітектура, BI-аналітика та управління IT-проєктами за PMBok/Prince2.",
    duration: "1,5 роки",
    seats: "Контракт",
  },
];

const steps: Step[] = [
  {
    title: "Отримати диплом бакалавра",
    text:
      "Для вступу на магістратуру необхідний диплом бакалавра або спеціаліста будь-якого закладу вищої освіти.",
  },
  {
    title: "Скласти ЄФВВ або фаховий іспит",
    text:
      "Єдиний фаховий вступний іспит (ЄФВВ) або внутрішній фаховий іспит ННІКІТІ — за вибором вступника.",
  },
  {
    title: "Подати заяву та документи",
    text:
      "Заява через особистий кабінет ЄДЕБО, диплом бакалавра, мотиваційний лист (за бажанням) та резюме.",
  },
  {
    title: "Конкурсний відбір",
    text:
      "Рейтинг формується з балу ЄФВВ/іспиту, середнього балу диплома та додаткових балів за публікації або сертифікати.",
  },
  {
    title: "Зарахування та початок навчання",
    text:
      "Після виходу наказу підпишіть угоду. Очна магістратура — 3 семестри, заочна — 4 семестри.",
  },
];

const dates: KeyDate[] = [
  {
    period: "Червень",
    label: "Реєстрація на ЄФВВ",
    note: "testportal.gov.ua — для магістрантів окремий іспит",
  },
  {
    period: "Липень",
    label: "Проведення ЄФВВ",
    note: "Або внутрішній іспит в ННІКІТІ за розкладом",
  },
  {
    period: "01 – 22 серпня",
    label: "Прийом заяв на бюджет",
    note: "Через ЄДЕБО, до 3 заяв на магістратуру",
  },
  {
    period: "28 серпня",
    label: "Зарахування на держзамовлення",
    note: "Рейтинговий список на сайті університету",
  },
  {
    period: "01 вересня",
    label: "Початок навчального року",
    note: "Перша зустріч з науковим керівником",
  },
];

const tracks = [
  {
    icon: "◈",
    title: "Наукова магістратура",
    text:
      "Публікації у Scopus, участь у грантових проєктах і підготовка до вступу в аспірантуру. Ідеально для тих, хто прагне до PhD.",
  },
  {
    icon: "◎",
    title: "Професійна магістратура",
    text:
      "Практичні навички, корпоративні проєкти та менторство від провідних IT-компаній. Для тих, хто хоче стати лідером в галузі.",
  },
];

function TracksSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-v2">
        <SectionHead
          eyebrow="Форми навчання"
          title="Два"
          gradientTitle="треки"
          subtitle="Обери траєкторію залежно від своїх цілей — наукова кар'єра або топ-позиція в IT-компанії."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.12} amount={0.15}>
          {tracks.map((t, i) => (
            <StaggerItem
              key={i}
              mode="up"
              className="grad-border relative overflow-hidden rounded-[20px] bg-surface p-6 backdrop-blur-xl sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
                style={{
                  background:
                    i === 0
                      ? "radial-gradient(circle, rgba(166,132,255,0.20) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(81,162,255,0.20) 0%, transparent 70%)",
                }}
              />
              <span className="text-grad mb-5 block text-3xl">{t.icon}</span>
              <h3
                className="font-display mb-3 font-bold text-primary"
                style={{ fontSize: "1.2rem", letterSpacing: "-0.02em" }}
              >
                {t.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-primary/60">{t.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function MasterPage() {
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow="Вступникам · Магістратура"
        title="Наступний рівень"
        gradientWord="твоєї кар'єри"
        description="1,5 роки поглибленої підготовки в IT, AI та кібербезпеці. Наукова та професійна магістратура з можливістю держзамовлення і підготовки до PhD."
        imageSeed="/images/students-workshop.jpg"
        stats={[
          { value: "1,5", label: "роки навчання" },
          { value: "5", label: "спеціальностей" },
          { value: "ЄФВВ", label: "вступний іспит" },
        ]}
      />

      <div className="bg-base">
        <TracksSection />

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <SectionHead
              eyebrow="Спеціальності"
              title="Поглиблена"
              gradientTitle="підготовка"
            />
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07} amount={0.05}>
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
                title="Вступ на"
                gradientTitle="магістратуру"
                subtitle="Весь процес займає не більше місяця від реєстрації до зарахування."
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
              gradientTitle="магістранта"
            />
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08} amount={0.1}>
              {dates.map((d, i) => (
                <StaggerItem key={i} mode="up">
                  <DateCard date={d} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <EntrantCta
          title="Час іти далі"
          subtitle="Магістратура ННІКІТІ — це не просто ступінь, а новий рівень мислення і можливостей. Звернись до приймальної комісії."
          primaryLabel="Записатися на консультацію"
        />
      </div>
    </PageTransition>
  );
}

export const Component = MasterPage;
