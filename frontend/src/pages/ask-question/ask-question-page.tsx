import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageTransition } from "@/widgets";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "./locales";

type AskQuestionSchemaType = {
  full_name: string;
  email: string;
  phone?: string;
  question: string;
};

function HeroSection() {
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

function InputField({
  label,
  error,
  type = "text",
  placeholder,
  register,
  textarea = false,
  optional = false,
  optionalLabel,
}: {
  label: string;
  error?: string;
  type?: string;
  placeholder: string;
  register: ReturnType<ReturnType<typeof useForm<AskQuestionSchemaType>>["register"]>;
  textarea?: boolean;
  optional?: boolean;
  optionalLabel?: string;
}) {
  const baseClass =
    "w-full rounded-[14px] border bg-surface-md px-5 py-3.5 text-[15px] text-primary placeholder-muted backdrop-blur-md transition-all duration-200 focus:outline-none";
  const stateClass = error
    ? "border-red-400/40 focus:border-red-400/70"
    : "border-ui hover:border-white/20 focus:border-violet-500/50 focus:bg-surface-lg";

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-primary/60">
        {label}
        {optional && (
          <span className="text-[10px] font-normal text-subtle">
            {optionalLabel}
          </span>
        )}
      </label>
      {textarea ? (
        <textarea
          rows={5}
          placeholder={placeholder}
          {...register}
          className={clsx(baseClass, stateClass, "resize-none")}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className={clsx(baseClass, stateClass)}
        />
      )}
      {error && (
        <p className="mt-2 text-[12px] text-red-400/90">{error}</p>
      )}
    </div>
  );
}

function FormSection() {
  const { t } = useTranslation("ask-question");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const AskQuestionSchema = useMemo(
    () =>
      z.object({
        full_name: z.string().min(2, t("errors.name")),
        email: z.string().email(t("errors.email")),
        phone: z.string().optional(),
        question: z.string().min(10, t("errors.question")),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AskQuestionSchemaType>({
    resolver: zodResolver(AskQuestionSchema),
  });

  const onSubmit = async (data: AskQuestionSchemaType) => {
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      console.log("Form submitted:", data);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container-v2 max-w-[760px]">
        {isSubmitted ? (
          <div className="grad-border rounded-[20px] bg-gradient-to-br from-violet-500/[0.10] to-blue-500/[0.08] p-6 text-center backdrop-blur-xl sm:p-10">
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-2xl"
              aria-hidden
            >
              ✓
            </div>
            <h3
              className="font-display font-black"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
            >
              {t("successHeading")} <span className="text-grad">{t("successHeadingAccent")}</span>
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-primary/60">
              {t("successText")}
            </p>
          </div>
        ) : (
          <Reveal as="form" mode="up" onSubmit={handleSubmit(onSubmit)} className="grad-border-animated relative overflow-hidden rounded-[24px] bg-surface p-6 backdrop-blur-xl sm:p-10" amount={0.1}>
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label={t("nameLabel")}
                placeholder={t("namePlaceholder")}
                register={register("full_name")}
                error={errors.full_name?.message}
              />
              <InputField
                label={t("emailLabel")}
                type="email"
                placeholder={t("emailPlaceholder")}
                register={register("email")}
                error={errors.email?.message}
              />
            </div>

            <div className="mt-5">
              <InputField
                label={t("phoneLabel")}
                type="tel"
                placeholder={t("phonePlaceholder")}
                register={register("phone")}
                optional
                optionalLabel={t("optional")}
              />
            </div>

            <div className="mt-5">
              <InputField
                label={t("questionLabel")}
                placeholder={t("questionPlaceholder")}
                register={register("question")}
                error={errors.question?.message}
                textarea
              />
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(
                  "inline-flex items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-9 py-4 text-[16px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all duration-200",
                  isSubmitting
                    ? "opacity-70"
                    : "hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(166,132,255,0.55)]"
                )}
              >
                {isSubmitting ? t("submitting") : t("submit")}
                {!isSubmitting && <span aria-hidden>→</span>}
              </button>
              <p className="text-center text-[11px] text-subtle">
                {t("footerNote")}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ContactInfoSection() {
  const { t } = useTranslation("ask-question");

  const contacts = [
    {
      title: "Email",
      value: "info@nuvhp.edu.ua",
      href: "mailto:info@nuvhp.edu.ua",
      icon: "✉",
    },
    {
      title: "Телефон",
      value: "+38 (360) 41-32-11",
      href: "tel:+380364132111",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      title: "Адреса",
      value: "м. Рівне, вул. О. Новака, 75",
      href: "#",
      icon: "◎",
    },
  ];

  return (
    <section className="pb-16 sm:pb-24 lg:pb-32">
      <div className="container-v2">
        <Reveal mode="up" className="mb-10 text-center lg:mb-14">
          <h2
            className="font-display font-black"
            style={{
              fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {t("contactsHeading")} <span className="text-grad-animated">{t("contactsHeadingAccent")}</span>
          </h2>
        </Reveal>

        <Stagger className="grid gap-4 py-3 sm:grid-cols-3" stagger={0.12}>
          {contacts.map((c) => (
            <StaggerItem
              as="a"
              key={c.title}
              mode="scale"
              href={c.href}
              className="sheen grad-border card-hover block rounded-[20px] bg-surface p-6 backdrop-blur-xl"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-lg text-violet-300">
                {c.icon}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-subtle">
                {c.title}
              </p>
              <p className="mt-1 text-[15px] font-semibold text-primary">{c.value}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function AskQuestionPage() {
  useLoadNamespace("ask-question", loadTranslations);

  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <HeroSection />
      <div>
        <FormSection />
        <ContactInfoSection />
      </div>
    </PageTransition>
  );
}

export const Component = AskQuestionPage;
