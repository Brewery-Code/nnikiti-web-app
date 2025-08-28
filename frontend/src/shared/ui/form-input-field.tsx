import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  className?: string;
  id: string;
  label: string;
  placeHolder: string;
  type: "text" | "number" | "textarea";
}

export function FormInputField({ className, id, label, placeHolder, type }: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={clsx(className, "flex w-full flex-col gap-2")}>
      <label className="cursor-pointer text-xl font-semibold" htmlFor={id}>
        {label}
      </label>
      {(type === "text" || type === "number") && (
        <input
          className="h-auto w-full rounded-xl border-0 bg-[#FAF7F3] px-5 py-2 text-[18px] font-semibold text-black outline-0 placeholder:text-[#7d7b8d]"
          id={id}
          type={type}
          placeholder={placeHolder}
          {...(type === "number" ? register(id, { valueAsNumber: true }) : register(id))}
        />
      )}
      {type === "textarea" && (
        <textarea
          className="min-h-64 rounded-xl border-0 bg-[#FAF7F3] px-5 py-4 text-[18px] leading-5 font-semibold text-black outline-0"
          id={id}
          placeholder={placeHolder}
          {...register(id)}
        />
      )}
      <div className="h-4 text-red-500"> {errors[id]?.message?.toString()}</div>
    </div>
  );
}
