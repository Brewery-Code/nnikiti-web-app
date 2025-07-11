import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/shared/ui";
import { PageTransition } from "@/widgets";

const AskQuestionSchema = z.object({
  email: z.string().email("Invalid email address"),
  question: z.string().min(10, "Question must be at least 10 characters"),
});
type AskQuestionSchemaType = z.infer<typeof AskQuestionSchema>;

export function AskQuestionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AskQuestionSchemaType>({
    resolver: zodResolver(AskQuestionSchema),
  });

  const onSubmit = (data: AskQuestionSchemaType) => {
    console.log("Form submitted:", data);
  };

  return (
    <PageTransition>
      <div className="container-base grow flex flex-col">
        <Title>Write us right now!</Title>
        <form className="grow" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="bg-yellow-500"
            // type="email"
            placeholder="Your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            className="bg-yellow-500"
            // type="text"
            placeholder="Your question is..."
            {...register("question")}
          />
          {errors.question && (
            <p className="text-red-500">{errors.question.message}</p>
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </PageTransition>
  );
}

export const Component = AskQuestionPage;
