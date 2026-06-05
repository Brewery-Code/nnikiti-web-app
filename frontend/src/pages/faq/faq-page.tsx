import { PageTransition } from "@/widgets";
import { useState } from "react";
import { Stagger, StaggerItem } from "@/shared/ui";
import { motion } from "framer-motion";
import Accordion from "./accordion";
import { publicRqClient } from "@/shared/api/instance";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";

type FaqItem = { id: number; question: string; answer: string };

function HeroSection() {
  useLoadNamespace("faq", loadTranslations);
  const { t } = useTranslation("faq");

  return (
    <section className="relative overflow-hidden pt-24 pb-24 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-40">
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

      <Stagger className="container-v2 relative z-[1] flex flex-col items-center text-center" stagger={0.1} delay={0.35} inView={false}>
        <StaggerItem mode="scale">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 py-1.5 pl-2 pr-4 backdrop-blur-md">
            <span className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.06em] text-primary">
              {t("badge")}
            </span>
            <span className="text-[12px] text-primary/70">{t("badgeSub")}</span>
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
          {t("heading")} <span className="text-grad-animated">{t("headingAccent")}</span>
        </StaggerItem>

        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] text-muted sm:text-[17px]"
          style={{ lineHeight: 1.7, maxWidth: 560 }}
        >
          {t("description")}
        </StaggerItem>
      </Stagger>
    </section>
  );
}

export function FAQPage() {
  useLoadNamespace("faq", loadTranslations);
  const { t } = useTranslation("faq");

  const { data: rawData } = publicRqClient.useQuery("get", "/core/faq/", {});
  const rawFallback = t("fallback", { returnObjects: true });
  const FALLBACK_FAQ: FaqItem[] = Array.isArray(rawFallback) ? rawFallback : [];
  const data = rawData?.length ? rawData : FALLBACK_FAQ;

  const [whichAccordionIsOpen, setWhichAccordionIsOpen] = useState(-1);
  const accordionHandler = (id: number) => {
    setWhichAccordionIsOpen((prev) => (prev === id ? -1 : id));
  };

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <HeroSection />
      <div className="py-12 sm:py-16 lg:py-24">
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
