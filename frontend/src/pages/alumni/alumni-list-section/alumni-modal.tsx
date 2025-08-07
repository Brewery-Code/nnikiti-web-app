import { ModalWrapper } from "@/widgets";
import testImg from "./test2.png";
import type { Alumni } from "./types";

interface AlumniModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  alumni: Alumni;
}

export function AlumniModal({ isOpen, toggleModal, alumni }: AlumniModalProps) {
  return (
    <ModalWrapper
      className="flex justify-center items-center"
      isModalOpen={isOpen}
      toggleModal={toggleModal}
    >
      <div className="relative h-11/12 w-200 p-4 bg-[#1E201E] rounded-3xl">
        <div
          className="absolute top-4 right-4 w-8 h-8 cursor-pointer
            before:absolute before:top-1/2 before:-translate-y-1/2 before:rotate-45 before:w-full before:h-1 before:bg-red-900 before:rounded-4xl 
            before:transition-colors hover:before:bg-red-600
            after:absolute after:top-1/2 after:-translate-y-1/2 after:-rotate-45 after:w-full after:h-1 after:bg-red-900 after:rounded-4xl
            after:transition-colors hover:after:bg-red-600"
          onClick={toggleModal}
        />
        <div className="float-left w-64 h-64 mr-4 mb-4">
          <img
            className="w-full h-full object-cover rounded-3xl"
            src={testImg}
            alt=""
          />
        </div>
        <div className="text-4xl font-bold">{alumni.full_name}</div>
        <ul className="flex flex-col gap-2 mt-4 text-gray-100 font-semibold">
          <li>Graduated year: {alumni.date_of_graduation}</li>
          <li>Work place: {alumni.workplace}</li>
          <li>Position: {alumni.position}</li>
          <li>Education program: {alumni.major}</li>
        </ul>
        <p className="mt-4 indent-4 text-gray-100 leading-6">
          {alumni.text}
          <p className="mt-2 italic">— Alex, Coffee Man at Gulugulu Company</p>
        </p>
      </div>
    </ModalWrapper>
  );
}
