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
      <div className="mr-auto mb-2 ml-auto flex max-h-48 max-w-88 items-center justify-center overflow-hidden rounded-3xl sm:float-left sm:mr-4 sm:max-h-64 sm:max-w-64 md:mb-4">
        <img className="h-full w-full object-cover" src={alumni.image} alt="" />
      </div>
      <div className="text-center text-2xl font-bold sm:text-start md:text-4xl">
        {alumni.full_name}
      </div>
      <ul className="mt-4 flex flex-col gap-1 font-semibold text-gray-100">
        <li className="leading-5">Graduated year: {alumni.date_of_graduation}</li>
        <li className="leading-5">Work place: {alumni.workplace}</li>
        <li className="leading-5">Position: {alumni.position}</li>
        <li className="leading-5">Education program: {alumni.major}</li>
      </ul>
      <div className="mt-2 indent-4 leading-6 text-gray-100">
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
