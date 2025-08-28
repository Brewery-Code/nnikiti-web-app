import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  children: React.ReactNode;
  className?: string;
  isModalOpen: boolean;
  toggleModal: () => void;
}

export function ModalWrapper({ children, isModalOpen, toggleModal }: ModalWrapperProps) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return createPortal(
    <div
      className={`fixed inset-0 -z-50 flex items-start justify-center overflow-y-auto bg-[rgba(0,0,0,0.3)] opacity-0 backdrop-blur-xs transition-opacity duration-300 ease-in md:py-28 ${isModalOpen && "z-100 opacity-100"}`}
    >
      <div
        className="relative min-h-full w-dvw bg-[#212121] p-4 md:h-auto md:min-h-auto md:w-192 md:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="absolute top-4 right-4 h-8 w-8 cursor-pointer before:absolute before:top-1/2 before:h-1 before:w-full before:-translate-y-1/2 before:rotate-45 before:rounded-4xl before:bg-red-900 before:transition-colors after:absolute after:top-1/2 after:h-1 after:w-full after:-translate-y-1/2 after:-rotate-45 after:rounded-4xl after:bg-red-900 after:transition-colors hover:before:bg-red-600 hover:after:bg-red-600"
          onClick={toggleModal}
        />
        {children}
      </div>
    </div>,
    document.getElementById("modals")!
  );
}
