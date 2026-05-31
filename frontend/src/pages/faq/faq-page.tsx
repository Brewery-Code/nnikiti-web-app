import { PageTransition } from "@/widgets";
import { useState } from "react";
import { Stagger, StaggerItem } from "@/shared/ui";
import { motion } from "framer-motion";
import Accordion from "./accordion";
import { publicRqClient } from "@/shared/api/instance";

const FALLBACK_FAQ = [
  {
    id: 1,
    question: "Які спеціальності пропонує ННІКІТІ?",
    answer:
      "ННІКІТІ пропонує навчання за спеціальностями: 121 — Інженерія програмного забезпечення, 122 — Комп'ютерні науки, 123 — Комп'ютерна інженерія, 124 — Системний аналіз, 125 — Кібербезпека, 126 — Інформаційні системи та технології, а також 113 — Прикладна математика.",
  },
  {
    id: 2,
    question: "Як вступити на бакалаврат?",
    answer:
      "Для вступу на бакалаврат необхідно скласти НМТ (Національний мультипредметний тест). Подача заяв — через електронний кабінет вступника на vstup.osvita.ua. Також передбачені пільгові умови вступу для окремих категорій вступників.",
  },
  {
    id: 3,
    question: "Чи є місця на держзамовлення?",
    answer:
      "Так, більшість місць на бакалаврат і магістратуру — бюджетні (держзамовлення). Кількість бюджетних місць щорічно затверджується Міністерством освіти і науки України. Рейтинговий відбір формується за балами НМТ або ЄФВВ.",
  },
  {
    id: 4,
    question: "Що таке ЄФВВ і коли його складати?",
    answer:
      "ЄФВВ (Єдиний фаховий вступний випробування) — це іспит для вступу на магістратуру. Реєстрація відбувається у червні через testportal.gov.ua, тестування — у липні. Альтернативно можна скласти внутрішній фаховий іспит ННІКІТІ.",
  },
  {
    id: 5,
    question: "Чи є можливість навчатись за кордоном?",
    answer:
      "Так, ННІКІТІ бере активну участь у програмі Erasmus+, яка дозволяє студентам проходити семестрове навчання або стажування в університетах-партнерах Польщі, Литви, Чехії та інших країн ЄС. Також можливе отримання подвійного диплому.",
  },
  {
    id: 6,
    question: "Як вступити в аспірантуру?",
    answer:
      "Прийом до аспірантури відбувається щорічно восени. Необхідно: обрати наукового керівника, підготувати документи (диплом магістра, реферат, мотиваційний лист), скласти вступні іспити з іноземної мови та фаху. Навчання — 4 роки, по закінченню присвоюється ступінь PhD.",
  },
  {
    id: 7,
    question: "Які партнери у ННІКІТІ серед IT-компаній?",
    answer:
      "ННІКІТІ співпрацює з провідними IT-компаніями: SoftServe, EPAM Systems, Intellias, GlobalLogic, Ciklum, Sigma Software, Luxoft, Eleks та іншими. Партнерство включає стажування, практику, хакатони, майстер-класи та сприяння у працевлаштуванні.",
  },
  {
    id: 8,
    question: "Як зв'язатись з приймальною комісією?",
    answer:
      "Приймальна комісія ННІКІТІ: email — nni-akot@nuwm.edu.ua, телефон — вказаний на сторінці контактів. Також можна відвідати особисто або скористатись формою запитань на сайті.",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-base pt-24 pb-24 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-40">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(166,132,255,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(81,162,255,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
      />

      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-40 bg-gradient-to-b from-transparent to-[#08090f]" />

      <Stagger className="container-v2 relative z-[1] flex flex-col items-center text-center" stagger={0.1} delay={0.35} inView={false}>
        <StaggerItem mode="scale">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
            <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
              FAQ
            </span>
            <span className="text-[12px] text-primary/70">Часті запитання</span>
          </div>
        </StaggerItem>

        <StaggerItem
          as="h1"
          mode="up"
          className="font-display font-black text-primary"
          style={{
            fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
          }}
        >
          Відповіді на <span className="text-grad-animated">ваші питання</span>
        </StaggerItem>

        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] text-muted sm:text-[17px]"
          style={{ lineHeight: 1.7, maxWidth: 560 }}
        >
          Зібрали найпопулярніші питання абітурієнтів, студентів і батьків.
          Якщо тут немає відповіді — задайте її особисто.
        </StaggerItem>
      </Stagger>
    </section>
  );
}

export function FAQPage() {
  const { data: rawData } = publicRqClient.useQuery("get", "/core/faq/");
  const data = rawData?.length ? rawData : FALLBACK_FAQ;

  const [whichAccordionIsOpen, setWhichAccordionIsOpen] = useState(-1);
  const accordionHandler = (id: number) => {
    setWhichAccordionIsOpen((prev) => (prev === id ? -1 : id));
  };

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <HeroSection />
      <div className="bg-base py-12 sm:py-16 lg:py-24">
        <section className="container-v2 flex flex-col gap-3 max-w-[900px]">
          {data.map((item, i) => (
            <Accordion
              key={item.id}
              index={i}
              isAccordionOpen={i === whichAccordionIsOpen}
              onClick={() => accordionHandler(i)}
              title={item.question}
              description={item.answer}
            />
          ))}
        </section>
      </div>
    </PageTransition>
  );
}

export const Component = FAQPage;
