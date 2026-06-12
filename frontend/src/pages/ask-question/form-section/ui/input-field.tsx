import clsx from "clsx";
import type { UseFormRegisterReturn } from "react-hook-form";

export function InputField({
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
  register: UseFormRegisterReturn;
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
