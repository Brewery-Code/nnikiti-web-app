import { BlackAndWhiteButton, FormInputField, FormTitle } from "@/shared/ui";
import { ModalWrapper } from "@/widgets";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { Tiptap } from "./test";

interface NewAlumniModalFormProps {
  isFormOpen: boolean;
  toggleForm: () => void;
}

const schema = z.object({
  name: z.string().min(1, { message: "Вкажіть ім'я" }),
  surname: z.string().min(1, { message: "Вкажіть прізвище" }),
  graduatedYear: z
    .number()
    .int()
    .min(1900, { message: "Рік занадто маленький" }) // або будь-який мінімум
    .max(new Date().getFullYear(), { message: "Рік не може бути майбутнім" }),
  story: z.string().min(20, { message: "Розкажіть детальніше про себе (мін. 20 символів)" }),
});

type FormFields = z.infer<typeof schema>;

export function NewAlumniModalForm({ isFormOpen, toggleForm }: NewAlumniModalFormProps) {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((res) => setTimeout(res, 1000));
      return;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalWrapper isModalOpen={isFormOpen} toggleModal={toggleForm}>
      <FormTitle className="text-center">Розкажіть про себе</FormTitle>
      <FormProvider {...methods}>
        <form className="mt-8 flex flex-col gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid w-full grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
            <FormInputField type="text" placeHolder="Your name" id="name" label="Enter your name" />
            <FormInputField
              type="text"
              placeHolder="Your surname"
              id="surname"
              label="Enter your surname"
            />
            <FormInputField
              type="number"
              placeHolder="Your year of graduating"
              id="graduatedYear"
              label="Enter your year of graduating"
            />
            <FormInputField
              type="text"
              placeHolder="Your surname"
              id="surname"
              label="Enter your major"
            />
          </div>
          <FormInputField
            type="textarea"
            placeHolder="Your story"
            id="story"
            label="Write your story"
          />
          {/* <button disabled={methods.formState.isSubmitting} type="submit">
            {methods.formState.isSubmitting ? "lo" : "Submit"}
          </button> */}
          <div className="mt-auto flex items-center justify-center">
            <BlackAndWhiteButton className="w-48">Submit</BlackAndWhiteButton>
          </div>
          <Tiptap />
        </form>
      </FormProvider>
    </ModalWrapper>
  );
}
