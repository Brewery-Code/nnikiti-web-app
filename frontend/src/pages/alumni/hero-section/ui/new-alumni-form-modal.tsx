import { ModalWrapper } from "@/widgets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

interface NewAlumniModalFormProps {
  isFormOpen: boolean;
  toggleForm: () => void;
}

const schema = z.object({
  name: z.string().min(4),
  story: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export const NewAlumniModalForm = ({
  isFormOpen,
  toggleForm,
}: NewAlumniModalFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((res) => setTimeout(res, 1000));
      throw new Error();
      console.log("Form data:", data);
    } catch (e) {
      setError("name", {
        message: "deuwuewhfu",
      });
    }
  };

  return (
    <ModalWrapper isModalOpen={isFormOpen} toggleModal={toggleForm}>
      <div className="relative w-dvw md:w-192 min-h-dvh md:min-h-auto md:h-auto p-4 bg-[#1E201E] md:rounded-3xl">
        <div className="text-2xl text-center font-bold">
          Розкажіть про себе!
        </div>
        <form
          className="flex flex-col gap-4 *:bg-neutral-600"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input {...register("name")} type="text" />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
          <textarea {...register("story")} />
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "lo" : "Submit"}
          </button>
          {errors.root && <div>error</div>}
        </form>
      </div>
    </ModalWrapper>
  );
};
