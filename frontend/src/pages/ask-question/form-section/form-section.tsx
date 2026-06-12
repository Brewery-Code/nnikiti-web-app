import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/shared/ui";
import { type AskQuestionSchemaType } from "./model";
import { InputField } from "./ui";

export function FormSection() {
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
