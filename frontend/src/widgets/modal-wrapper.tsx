import clsx from "clsx";
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
  console.log(isModalOpen);
  return createPortal(
    <div
      className={clsx(
        className,
        "-z-50 inset-0 fixed w-dvw h-dvh pt-16 bg-[rgba(0,0,0,0.3)] backdrop-blur-xs opacity-0",
        "transition-opacity duration-300 ease-in",
        isModalOpen && "opacity-100 z-50"
      )}
    >
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>,
    document.getElementById("modals")!
  );
}
