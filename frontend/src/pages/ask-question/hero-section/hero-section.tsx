import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Stagger, StaggerItem } from "@/shared/ui";

export function HeroSection() {
  const { t } = useTranslation("ask-question");

  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
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
        className="pointer-events-none absolute -bottom-[15%] -right-[10%] h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(81,162,255,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
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
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
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
          style={{ lineHeight: 1.55, maxWidth: 560 }}
        >
          {t("description")}
        </StaggerItem>
      </Stagger>
    </section>
  );
}
