import { ModalWrapper } from "@/widgets";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext, type SubmitHandler } from "react-hook-form";
import z from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Вкажіть ім'я" }),
  surname: z.string().min(1, { message: "Вкажіть прізвище" }),
  graduatedYear: z
    .number()
    .int()
    .min(1900, { message: "Рік занадто маленький" })
    .max(new Date().getFullYear(), { message: "Рік не може бути в майбутньому" }),
  major: z.string().min(1, { message: "Вкажіть спеціальність" }),
  story: z.string().min(20, { message: "Розкажіть детальніше про себе (мін. 20 символів)" }),
});

type FormFields = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-[12px] border border-ui bg-surface-md px-4 py-3 text-[14px] text-primary placeholder-muted outline-none transition focus:border-violet-500/50 focus:bg-surface-lg";

function Field({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: keyof FormFields;
  label: string;
  type?: "text" | "number" | "textarea";
  placeholder: string;
}) {
  const { register, formState: { errors } } = useFormContext<FormFields>();
  const reg = type === "number"
    ? register(id, { valueAsNumber: true })
    : register(id);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-bold uppercase tracking-[0.14em] text-subtle"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={5}
          className={`${inputClass} resize-none leading-relaxed`}
          {...register(id)}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={inputClass}
          {...reg}
        />
      )}
      {errors[id] && (
        <p className="text-[11px] text-red-400">{errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
}

interface NewAlumniModalFormProps {
  isFormOpen: boolean;
  toggleForm: () => void;
}

export function NewAlumniModalForm({ isFormOpen, toggleForm }: NewAlumniModalFormProps) {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (_data) => {
    try {
      await new Promise((res) => setTimeout(res, 1000));
      toggleForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalWrapper isModalOpen={isFormOpen} toggleModal={toggleForm} maxWidth="max-w-lg">
      <div className="mb-6">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-500">
          — Випускники
        </div>
        <h2
          className="font-display font-black text-primary"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", letterSpacing: "-0.03em" }}
        >
          Розкажіть <span className="text-grad">про себе</span>
        </h2>
        <p className="mt-2 text-[14px] text-primary/50">
          Ваша історія надихне майбутніх студентів ННІКІТІ.
        </p>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-violet-500/30 via-blue-500/20 to-transparent mb-6" />

      <FormProvider {...methods}>
        <form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="name" label="Ім'я" placeholder="Іван" />
            <Field id="surname" label="Прізвище" placeholder="Шевченко" />
            <Field id="graduatedYear" label="Рік випуску" type="number" placeholder={String(new Date().getFullYear())} />
            <Field id="major" label="Спеціальність" placeholder="121 — Інженерія ПЗ" />
          </div>

          <Field
            id="story"
            label="Ваша історія"
            type="textarea"
            placeholder="Де працюєте зараз, як ННІКІТІ допоміг вам у кар'єрі…"
          />

          <button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-500 to-blue-500 py-3.5 text-[15px] font-semibold text-primary shadow-[0_4px_16px_rgba(166,132,255,0.3)] transition-all hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(166,132,255,0.5)] disabled:opacity-60"
          >
            {methods.formState.isSubmitting ? "Надсилання…" : "Надіслати"}
          </button>
        </form>
      </FormProvider>
    </ModalWrapper>
  );
}
