import clsx from "clsx";
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
  className,
  isModalOpen,
  toggleModal,
}: ModalWrapperProps) {
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isModalOpen]);

  return createPortal(
    <div
      className={clsx(
        className,
        "-z-50 overflow-auto fixed top-0 w-dvw min-h-dvh md:pt-16 bg-[rgba(0,0,0,0.3)] backdrop-blur-xs opacity-0",
        "transition-opacity duration-300 ease-in",
        isModalOpen && "opacity-100 z-100"
      )}
    >
      <div
        className="md:pt-[10dvh]"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modals")!
  );
}
