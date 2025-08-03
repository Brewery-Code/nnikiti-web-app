import clsx from "clsx";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  isPaddingOn?: boolean;
}

export default function PageTransition({
  children,
  className,
  isPaddingOn = true,
}: PageTransitionProps) {
  return (
    <motion.main
      className={clsx(
        "grow flex flex-col mt-16 ",
        className,
        isPaddingOn && "pt-16 pb-24"
      )}
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      exit={{ filter: "blur(10px)", opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.main>
  );
}
