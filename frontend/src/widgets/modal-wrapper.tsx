import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  children: React.ReactNode;
  className?: string;
  isModalOpen: boolean;
  toggleModal: () => void;
}

export function ModalWrapper({
  children,
  isModalOpen,
  toggleModal,
}: ModalWrapperProps) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return createPortal(
    <div
      className={`-z-50 overflow-y-auto fixed inset-0 flex justify-center items-start md:py-28 
      bg-[rgba(0,0,0,0.3)] backdrop-blur-xs opacity-0 transition-opacity duration-300 ease-in
      ${isModalOpen && "opacity-100 z-100"}`}
    >
      <div
        className="relative w-dvw md:w-192 md:h-auto min-h-full md:min-h-auto p-4 bg-[#212121] md:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="absolute top-4 right-4 w-8 h-8 cursor-pointer
            before:absolute before:top-1/2 before:-translate-y-1/2 before:rotate-45 before:w-full before:h-1 
            before:bg-red-900 before:rounded-4xl before:transition-colors hover:before:bg-red-600
            after:absolute after:top-1/2 after:-translate-y-1/2 after:-rotate-45 after:w-full after:h-1 
            after:bg-red-900 after:rounded-4xl after:transition-colors hover:after:bg-red-600"
          onClick={toggleModal}
        />
        {children}
      </div>
    </div>,
    document.getElementById("modals")!
  );
}
