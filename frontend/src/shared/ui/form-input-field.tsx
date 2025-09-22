import clsx from "clsx";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

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

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>", // initial content
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);

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
        // <textarea
        //   className="min-h-64 rounded-xl border-0 bg-[#FAF7F3] px-5 py-4 text-[18px] leading-5 font-semibold text-black outline-0"
        //   id={id}
        //   placeholder={placeHolder}
        //   {...register(id)}
        // />
        <EditorContext.Provider value={providerValue}>
          <EditorContent editor={editor} />
          <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
          <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </EditorContext.Provider>
      )}

      <div className="h-4 text-red-500"> {errors[id]?.message?.toString()}</div>
    </div>
  );
}
