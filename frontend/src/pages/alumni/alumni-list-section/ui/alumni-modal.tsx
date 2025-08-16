import { ModalWrapper } from "@/widgets";
import type { Alumni } from "../types";

interface AlumniModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  alumni: Alumni;
}

export function AlumniModal({ isOpen, toggleModal, alumni }: AlumniModalProps) {
  return (
    <ModalWrapper isModalOpen={isOpen} toggleModal={toggleModal}>
      <div className="relative w-dvw md:w-192 p-4 bg-[#1E201E] md:rounded-3xl">
        <div
          className="absolute top-4 right-4 w-8 h-8 cursor-pointer
            before:absolute before:top-1/2 before:-translate-y-1/2 before:rotate-45 before:w-full before:h-1 
            before:bg-red-900 before:rounded-4xl before:transition-colors hover:before:bg-red-600
            after:absolute after:top-1/2 after:-translate-y-1/2 after:-rotate-45 after:w-full after:h-1 
            after:bg-red-900 after:rounded-4xl after:transition-colors hover:after:bg-red-600"
          onClick={toggleModal}
        />
        <div
          className="overflow-hidden flex justify-center items-center sm:float-left max-w-88 sm:max-w-64 max-h-48 
          sm:max-h-64 mr-auto ml-auto sm:mr-4 mb-2 md:mb-4 rounded-3xl"
        >
          <img
            className="w-full h-full object-cover"
            src={alumni.image}
            alt=""
          />
        </div>
        <div className="text-2xl md:text-4xl font-bold text-center sm:text-start">
          {alumni.full_name}
        </div>
        <ul className="flex flex-col gap-1 mt-4 text-gray-100 font-semibold">
          <li className="leading-5">
            Graduated year: {alumni.date_of_graduation}
          </li>
          <li className="leading-5">Work place: {alumni.workplace}</li>
          <li className="leading-5">Position: {alumni.position}</li>
          <li className="leading-5">Education program: {alumni.major}</li>
        </ul>
        <div className="mt-2 indent-4 text-gray-100 leading-6">
          {alumni.text}
          {alumni.text}
          {alumni.text}
          {alumni.text}
          {alumni.text}
          {alumni.text}
          <p className="mt-2 italic">— Alex, Coffee Man at Gulugulu Company</p>
        </div>
      </div>
    </ModalWrapper>
  );
}
