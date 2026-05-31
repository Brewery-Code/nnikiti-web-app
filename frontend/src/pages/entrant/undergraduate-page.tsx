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
    code: "122",
    name: "Комп'ютерні науки",
    description:
      "Основи програмування, алгоритми, бази даних та веб-технології. Ідеальний старт для майбутнього розробника після 9 або 11 класу.",
    duration: "2–3 роки",
    seats: "Бюджет + контракт",
  },
  {
    code: "123",
    name: "Комп'ютерна інженерія",
    description:
      "Архітектура ЕОМ, мережі, вбудовані системи та апаратне забезпечення. Готуємо інженерів, які розуміють комп'ютер зсередини.",
    duration: "2–3 роки",
    seats: "Бюджет + контракт",
  },
  {
    code: "126",
    name: "Інформаційні системи та технології",
    description:
      "Проєктування корпоративних систем, 1С, ERP, цифровий документообіг. Затребувана спеціальність у бізнесі та держсекторі.",
    duration: "2–3 роки",
    seats: "Контракт",
  },
];

const steps: Step[] = [
  {
    title: "Отримати атестат",
    text:
      "Завершіть 9 або 11 клас і отримайте свідоцтво про базову середню освіту або атестат про повну загальну середню освіту.",
  },
  {
    title: "Зареєструватися в ЄДЕБО",
    text:
      "Створіть обліковий запис в Єдиній державній електронній базі з питань освіти та подайте заяву на вступ онлайн.",
  },
  {
    title: "Подати документи",
    text:
      "Завантажте скановані копії атестата, паспорта, медичної довідки та фотографії. Оригінали надаються після зарахування.",
  },
  {
    title: "Пройти конкурсний відбір",
    text:
      "Вступники ранжуються за середнім балом атестата. Для окремих спеціальностей проводиться вступне випробування.",
  },
  {
    title: "Отримати наказ про зарахування",
    text:
      "Після виходу наказу про зарахування підпишіть угоду з університетом і розпочинайте навчання.",
  },
];

const dates: KeyDate[] = [
  {
    period: "01 – 31 травня",
    label: "Реєстрація в ЄДЕБО",
    note: "Для вступників після 9 класу — окремий конкурс",
  },
  {
    period: "01 – 15 серпня",
    label: "Прийом документів",
    note: "Онлайн через кабінет вступника на вступ.освіта.ua",
  },
  {
    period: "25 серпня",
    label: "Рейтингові списки",
    note: "Оприлюднення на сайті університету та в ЄДЕБО",
  },
  {
    period: "30 серпня",
    label: "Наказ про зарахування",
    note: "Необхідно підписати угоду протягом 3 робочих днів",
  },
];

function UndergraduatePage() {
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <EntrantHero
        eyebrow="Вступникам · Додипломна освіта"
        title="Фаховий молодший"
        gradientWord="бакалавр"
        description="Перший крок в IT — після 9 або 11 класу. Отримай диплом молодшого спеціаліста за 2–3 роки та продовж навчання на бакалавраті зі скороченим терміном."
        imageSeed="/images/students-lecture.jpg"
        stats={[
          { value: "2–3", label: "роки навчання" },
          { value: "3", label: "спеціальності" },
          { value: "9/11", label: "клас для вступу" },
        ]}
      />

      <div className="bg-base">
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container-v2">
            <SectionHead
              eyebrow="Спеціальності"
              title="Обери свій"
              gradientTitle="напрям"
              subtitle="Три програми підготовки — практична освіта в IT, яку цінують роботодавці."
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
                title="Як вступити"
                gradientTitle="крок за кроком"
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
              gradientTitle="вступника"
              subtitle="Запиши ключові дати, щоб нічого не пропустити."
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
          title="Готовий зробити перший крок?"
          subtitle="Вступна комісія ННІКІТІ відповість на всі твої запитання. Залиши заявку — ми зв'яжемося з тобою."
        />
      </div>
    </PageTransition>
  );
}

export const Component = UndergraduatePage;
