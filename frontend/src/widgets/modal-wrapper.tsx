import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { globalLenis } from "@/shared/hooks";

interface ModalWrapperProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  toggleModal: () => void;
  maxWidth?: string;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ModalWrapper({
  children,
  isModalOpen,
  toggleModal,
  maxWidth = "max-w-xl",
}: ModalWrapperProps) {
  const mouseDownOnOverlay = useRef(false);

  useEffect(() => {
    if (isModalOpen) {
      globalLenis?.stop();
    } else {
      globalLenis?.start();
    }
    return () => {
      globalLenis?.start();
    };
  }, [isModalOpen]);

  return createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={() => { mouseDownOnOverlay.current = true; }}
          onMouseUp={() => { if (mouseDownOnOverlay.current) toggleModal(); mouseDownOnOverlay.current = false; }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            className={`grad-border relative w-full ${maxWidth} rounded-[24px] bg-[#0d0e17]`}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            onMouseDown={(e) => { e.stopPropagation(); mouseDownOnOverlay.current = false; }}
          >
            {/* Close button — outside scroll area, always visible */}
            <button
              onClick={toggleModal}
              aria-label="Закрити"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ui bg-surface-md text-[16px] text-primary/50 transition hover:bg-surface-xl hover:text-primary"
            >
              ✕
            </button>

            {/* Scrollable content */}
            <div
              className="max-h-[88vh] overflow-y-scroll overscroll-contain rounded-[24px] p-5 pt-12 pb-8 sm:p-8 sm:pt-14"
              data-lenis-prevent
              style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
              onTouchMove={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modals")!
  );
}
