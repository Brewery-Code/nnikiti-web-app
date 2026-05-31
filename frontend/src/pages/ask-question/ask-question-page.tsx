import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageTransition } from "@/widgets";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Reveal, Stagger, StaggerItem } from "@/shared/ui";

const AskQuestionSchema = z.object({
  full_name: z.string().min(2, "Ім'я повинно містити принаймні 2 символи"),
  email: z.string().email("Некорректна email адреса"),
  phone: z.string().optional(),
  question: z.string().min(10, "Питання повинно містити принаймні 10 символів"),
});

type AskQuestionSchemaType = z.infer<typeof AskQuestionSchema>;

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-base pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
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
              КОНТАКТ
            </span>
            <span className="text-[12px] text-primary/70">Ми завжди на зв'язку</span>
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
          Задайте <span className="text-grad-animated">ваше питання</span>
        </StaggerItem>

        <StaggerItem
          as="p"
          mode="up"
          className="mx-auto mt-6 text-[15px] text-muted sm:text-[17px]"
          style={{ lineHeight: 1.7, maxWidth: 560 }}
        >
          Маєте питання про ННІКІТІ, навчальні програми або вступ? Напишіть нам —
          ми обов'язково відповімо протягом 24 годин.
        </StaggerItem>
      </Stagger>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#08090f]" />
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
}: {
  label: string;
  error?: string;
  type?: string;
  placeholder: string;
  register: ReturnType<ReturnType<typeof useForm<AskQuestionSchemaType>>["register"]>;
  textarea?: boolean;
  optional?: boolean;
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
            (необов'язково)
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
              Дякуємо за <span className="text-grad">ваше питання</span>
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-primary/60">
              Ми отримали вашу заявку та обов'язково відповімо найближчим часом
              на вказану email адресу.
            </p>
          </div>
        ) : (
          <Reveal as="form" mode="up" onSubmit={handleSubmit(onSubmit)} className="grad-border-animated relative overflow-hidden rounded-[24px] bg-surface p-6 backdrop-blur-xl sm:p-10" amount={0.1}>
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="Ваше ім'я"
                placeholder="Іван Петренко"
                register={register("full_name")}
                error={errors.full_name?.message}
              />
              <InputField
                label="Email адреса"
                type="email"
                placeholder="vam@example.com"
                register={register("email")}
                error={errors.email?.message}
              />
            </div>

            <div className="mt-5">
              <InputField
                label="Номер телефону"
                type="tel"
                placeholder="+38 (067) 123-45-67"
                register={register("phone")}
                optional
              />
            </div>

            <div className="mt-5">
              <InputField
                label="Ваше питання"
                placeholder="Напишіть ваше питання тут. Чим більше деталей, тим краще ми вам допоможемо…"
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
                {isSubmitting ? "Надсилаємо…" : "Надіслати питання"}
                {!isSubmitting && <span aria-hidden>→</span>}
              </button>
              <p className="text-center text-[11px] text-subtle">
                Ми переглядаємо звернення протягом 24 годин
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ContactInfoSection() {
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
      icon: "☎",
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
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-500">
            — Контакти
          </div>
          <h2
            className="font-display font-black"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Інші <span className="text-grad-animated">канали зв'язку</span>
          </h2>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-3" stagger={0.12}>
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
  return (
    <PageTransition className="!pt-0 pb-0" isPaddingOn={false}>
      <HeroSection />
      <div className="bg-base">
        <FormSection />
        <ContactInfoSection />
      </div>
    </PageTransition>
  );
}

export const Component = AskQuestionPage;
