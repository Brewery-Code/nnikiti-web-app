import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  className?: string;
  id: string;
  label: string;
  placeHolder: string;
  type: "text" | "number" | "textarea";
}

export function FormInputField({
  className,
  id,
  label,
  placeHolder,
  type,
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={clsx(className, "flex flex-col gap-2 w-full")}>
      <label className="text-xl font-semibold cursor-pointer" htmlFor={id}>
        {label}
      </label>
      {(type === "text" || type === "number") && (
        <input
          className="w-full h-auto py-2 px-5 bg-[#FAF7F3] rounded-xl outline-0 border-0 text-black text-[18px]
          font-semibold placeholder:text-[#7d7b8d]"
          id={id}
          type={type}
          placeholder={placeHolder}
          {...(type === "number"
            ? register(id, { valueAsNumber: true })
            : register(id))}
        />
      )}
      {type === "textarea" && (
        <textarea
          className="min-h-64 py-4 px-5 bg-[#FAF7F3] rounded-xl outline-0 border-0 text-black text-[18px] leading-5 
          font-semibold"
          id={id}
          placeholder={placeHolder}
          {...register(id)}
        />
      )}
      <div className="h-4 text-red-500"> {errors[id]?.message?.toString()}</div>
    </div>
  );
}
