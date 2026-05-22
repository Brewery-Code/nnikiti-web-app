import { motion } from "framer-motion";
import clsx from "clsx";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  isPaddingOn?: boolean;
}

export function PageTransition({ children, className, isPaddingOn = true }: PageTransitionProps) {
  return (
    <motion.main
      className={clsx("flex grow flex-col", className, isPaddingOn && "pt-16 pb-24")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
    >
      {children}
    </motion.main>
  );
}
