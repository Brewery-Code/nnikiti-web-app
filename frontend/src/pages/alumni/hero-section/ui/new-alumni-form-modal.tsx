import { ModalWrapper } from "@/widgets";

interface NewAlumniModalFormProps {
  isFormOpen: boolean;
  toggleForm: () => void;
}

export function NewAlumniModalForm({
  isFormOpen,
  toggleForm,
}: NewAlumniModalFormProps) {
  return (
    <ModalWrapper isModalOpen={isFormOpen} toggleModal={toggleForm}>
      <div className="relative w-dvw md:w-192 min-h-dvh md:min-h-auto md:h-auto p-4 bg-[#1E201E] md:rounded-3xl">
        UYEFihwofiefheufhu
      </div>
    </ModalWrapper>
  );
}
