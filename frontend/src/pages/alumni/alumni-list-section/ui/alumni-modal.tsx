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
      <div
        className="overflow-hidden flex justify-center items-center sm:float-left max-w-88 sm:max-w-64 max-h-48 
          sm:max-h-64 mr-auto ml-auto sm:mr-4 mb-2 md:mb-4 rounded-3xl"
      >
        <img className="w-full h-full object-cover" src={alumni.image} alt="" />
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
    </ModalWrapper>
  );
}
