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
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isModalOpen]);

  return createPortal(
    <div
      className={`-z-50 overflow-y-auto fixed inset-0 flex justify-center md:pt-28 
      bg-[rgba(0,0,0,0.3)] backdrop-blur-xs opacity-0 transition-opacity duration-300 ease-in
      ${isModalOpen && "opacity-100 z-100"}`}
    >
      <div className="" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modals")!
  );
}
