import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLoadNamespace } from "@/shared/hooks";
import { Slider } from "./ui/slider/slider";
import { loadTranslations } from "./locales";
import { useState } from "react";
import { NewAlumniModalForm } from "./ui";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";

export function HeroSection() {
  useLoadNamespace("alumni", loadTranslations);
  const { t } = useTranslation("alumni");

  const [isNewAlumniFormOpen, setIsNewAlumniFormOpen] = useState(false);
  function toggleAlumniForm() {
    setIsNewAlumniFormOpen((prev) => !prev);
  }

  return (
    <section className="relative overflow-hidden pt-24 sm:pt-32 lg:pt-40">
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
          {t("heroSection.title")} <br />
          та <span className="text-grad-animated">наша гордість</span>
        </StaggerItem>

        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] text-muted sm:text-[17px]"
          style={{ lineHeight: 1.7, maxWidth: 580 }}
        >
          {t("heroSection.formTitle")}
        </StaggerItem>

        <StaggerItem mode="scale">
          <motion.button
            type="button"
            onClick={toggleAlumniForm}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="sheen mt-8 inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-shadow duration-200 hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)] sm:text-[17px]"
          >
            {t("heroSection.fillForm")}
            <span aria-hidden>→</span>
          </motion.button>
        </StaggerItem>
      </Stagger>
      <NewAlumniModalForm
        isFormOpen={isNewAlumniFormOpen}
        toggleForm={toggleAlumniForm}
      />

      <Reveal mode="fade" delay={0.4} inView={false} className="relative z-[1] mt-14 w-full">
        <Slider />
      </Reveal>
    </section>
  );
}
