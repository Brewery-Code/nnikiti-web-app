import { useRef, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoadNamespace } from "@/shared/hooks";
import { loadTranslations } from "../locales";
import { ModalWrapper } from "@/widgets";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext, useController, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { publicFetchClient } from "@/shared/api/instance";

type FormFields = {
  name: string;
  surname: string;
  graduatedYear: number;
  major: string;
  story: string;
};

function getSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, { message: t("form.errors.name") }),
    surname: z.string().min(1, { message: t("form.errors.surname") }),
    graduatedYear: z
      .number()
      .int()
      .min(2000, { message: t("form.errors.yearMin") })
      .max(new Date().getFullYear(), { message: t("form.errors.yearMax") }),
    major: z.string().min(1, { message: t("form.errors.major") }),
    story: z.string().min(20, { message: t("form.errors.story") }),
  });
}

const inputClass =
  "w-full rounded-[12px] border border-ui bg-surface-md px-4 py-3 text-[14px] text-primary placeholder-muted outline-none transition focus:border-violet-500/50 focus:bg-surface-lg";

/* ─── Rich text toolbar ──────────────────────────────────────── */
type Cmd = { cmd: string; val?: string };

function StoryEditor() {
  const { t } = useTranslation("alumni");
  const { control, formState: { errors } } = useFormContext<FormFields>();
  const { field } = useController({ control, name: "story" });
  const editorRef = useRef<HTMLDivElement>(null);

  const TOOLS: { title: string; label: string; cmd: Cmd; icon: React.ReactNode }[] = useMemo(() => [
    {
      title: t("form.tools.h1"), label: "h1",
      cmd: { cmd: "formatBlock", val: "h1" },
      icon: <span className="text-[11px] font-black tracking-tight">H1</span>,
    },
    {
      title: t("form.tools.h2"), label: "h2",
      cmd: { cmd: "formatBlock", val: "h2" },
      icon: <span className="text-[11px] font-black tracking-tight">H2</span>,
    },
    {
      title: t("form.tools.h3"), label: "h3",
      cmd: { cmd: "formatBlock", val: "h3" },
      icon: <span className="text-[11px] font-black tracking-tight">H3</span>,
    },
    {
      title: t("form.tools.h4"), label: "h4",
      cmd: { cmd: "formatBlock", val: "h4" },
      icon: <span className="text-[11px] font-black tracking-tight">H4</span>,
    },
    {
      title: "sep1", label: "sep1",
      cmd: { cmd: "" },
      icon: <div className="w-px h-4 bg-white/[0.08] mx-0.5" />,
    },
    {
      title: t("form.tools.bold"), label: "B",
      cmd: { cmd: "bold" },
      icon: <span className="font-black text-[14px]">B</span>,
    },
    {
      title: t("form.tools.italic"), label: "I",
      cmd: { cmd: "italic" },
      icon: <span className="italic font-semibold text-[13px]">I</span>,
    },
    {
      title: t("form.tools.underline"), label: "U",
      cmd: { cmd: "underline" },
      icon: <span className="underline text-[13px]">U</span>,
    },
    {
      title: "sep2", label: "sep2",
      cmd: { cmd: "" },
      icon: <div className="w-px h-4 bg-white/[0.08] mx-0.5" />,
    },
    {
      title: t("form.tools.ul"), label: "ul",
      cmd: { cmd: "insertUnorderedList" },
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <rect x="5" y="3" width="10" height="1.5" rx="0.75"/>
          <rect x="5" y="7.25" width="10" height="1.5" rx="0.75"/>
          <rect x="5" y="11.5" width="10" height="1.5" rx="0.75"/>
          <circle cx="1.5" cy="3.75" r="1.5"/><circle cx="1.5" cy="8" r="1.5"/><circle cx="1.5" cy="12.25" r="1.5"/>
        </svg>
      ),
    },
    {
      title: t("form.tools.ol"), label: "ol",
      cmd: { cmd: "insertOrderedList" },
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <rect x="5" y="3" width="10" height="1.5" rx="0.75"/>
          <rect x="5" y="7.25" width="10" height="1.5" rx="0.75"/>
          <rect x="5" y="11.5" width="10" height="1.5" rx="0.75"/>
          <text x="0" y="4.5" fontSize="4.5" fontWeight="700">1.</text>
          <text x="0" y="8.75" fontSize="4.5" fontWeight="700">2.</text>
          <text x="0" y="13" fontSize="4.5" fontWeight="700">3.</text>
        </svg>
      ),
    },
    {
      title: t("form.tools.blockquote"), label: "bq",
      cmd: { cmd: "formatBlock", val: "blockquote" },
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
        </svg>
      ),
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [t]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el || el.innerHTML) return;
    if (field.value) el.innerHTML = field.value;
  }, []);

  const exec = useCallback((cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  }, []);

  const handleInput = useCallback(() => {
    field.onChange(editorRef.current?.innerHTML ?? "");
  }, [field]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">
        {t("form.story")}
      </label>

      <div className="overflow-hidden rounded-[12px] border border-ui focus-within:border-violet-500/50 transition-colors">
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 border-b border-white/[0.06] bg-surface-md px-2 py-1.5">
          {TOOLS.map(({ title, label, cmd, icon }) => (
            <button
              key={label}
              type="button"
              title={title}
              onMouseDown={(e) => { e.preventDefault(); exec(cmd.cmd, cmd.val); }}
              className="flex h-7 w-7 items-center justify-center rounded-[6px] text-white/40 transition-all hover:bg-white/[0.08] hover:text-white/80"
            >
              {icon}
            </button>
          ))}
          <div className="mx-1.5 h-4 w-px bg-white/[0.08]" />
          <button
            type="button"
            title={t("form.clearFormatting")}
            onMouseDown={(e) => { e.preventDefault(); exec("removeFormat"); }}
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-white/30 transition-all hover:bg-white/[0.08] hover:text-white/70"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10Z"/>
              <path d="m8.5 12.5 2 2"/><path d="m5 15-1.5 1.5"/><path d="m3.5 20h5"/>
            </svg>
          </button>
        </div>

        {/* Editable area */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={field.onBlur}
          data-placeholder={t("form.storyPlaceholder")}
          className="story-editor min-h-[140px] px-4 py-3 text-[14px] leading-relaxed text-primary outline-none bg-surface-md"
        />
      </div>

      {errors.story && (
        <p className="text-[11px] text-red-400">{errors.story.message}</p>
      )}
    </div>
  );
}

/* ─── Generic Field ──────────────────────────────────────────── */
function Field({
  id, label, type = "text", placeholder,
}: {
  id: keyof Omit<FormFields, "story">;
  label: string;
  type?: "text" | "number";
  placeholder: string;
}) {
  const { register, formState: { errors } } = useFormContext<FormFields>();
  const reg = type === "number"
    ? register(id, { valueAsNumber: true })
    : register(id);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-[0.14em] text-subtle">
        {label}
      </label>
      <input id={id} type={type} placeholder={placeholder} className={inputClass} {...reg} />
      {errors[id] && (
        <p className="text-[11px] text-red-400">{errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
}

/* ─── Modal ──────────────────────────────────────────────────── */
interface NewAlumniModalFormProps {
  isFormOpen: boolean;
  toggleForm: () => void;
}

export function NewAlumniModalForm({ isFormOpen, toggleForm }: NewAlumniModalFormProps) {
  useLoadNamespace("alumni", loadTranslations);
  const { t } = useTranslation("alumni");

  const schema = useMemo(() => getSchema(t), [t]);
  const methods = useForm<FormFields>({ resolver: zodResolver(schema) });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setSubmitError(null);
    try {
      const { error } = await publicFetchClient.POST("/core/alumni/", {
        body: {
          first_name: data.name,
          last_name: data.surname,
          graduation_year: data.graduatedYear,
          major: data.major,
          text: data.story,
        },
        bodySerializer(body) {
          const fd = new FormData();
          for (const [k, v] of Object.entries(body)) {
            if (v !== undefined) fd.append(k, String(v));
          }
          return fd;
        },
      });
      if (error) throw error;
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmitError(t("form.submitError"));
    }
  };

  return (
    <ModalWrapper isModalOpen={isFormOpen} toggleModal={toggleForm} maxWidth="max-w-2xl">
      {submitSuccess ? (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2
            className="font-display font-black text-primary"
            style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", letterSpacing: "-0.03em" }}
          >
            {t("form.successTitle")}
          </h2>
          <p className="text-[14px] text-primary/50">{t("form.successSubtitle")}</p>
          <button
            onClick={toggleForm}
            className="mt-2 inline-flex items-center justify-center rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-3 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all hover:scale-[1.01]"
          >
            {t("form.successClose")}
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2
              className="font-display font-black text-primary"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", letterSpacing: "-0.03em" }}
            >
              {t("form.heading")} <span className="text-grad">{t("form.headingHighlight")}</span>
            </h2>
            <p className="mt-2 text-[14px] text-primary/50">
              {t("form.subtitle")}
            </p>
          </div>

          <FormProvider {...methods}>
            <form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="name"          label={t("form.name")}          placeholder="Іван" />
                <Field id="surname"       label={t("form.surname")}       placeholder="Шевченко" />
                <Field id="graduatedYear" label={t("form.graduatedYear")} type="number" placeholder={String(new Date().getFullYear())} />
                <Field id="major"         label={t("form.major")}         placeholder="121 — Інженерія ПЗ" />
              </div>

              <StoryEditor />

              {submitError && (
                <p className="text-[12px] text-red-400 text-center">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={methods.formState.isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(166,132,255,0.5)] disabled:opacity-60"
              >
                {methods.formState.isSubmitting ? t("form.submitting") : t("form.submit")}
              </button>
            </form>
          </FormProvider>
        </>
      )}
    </ModalWrapper>
  );
}
