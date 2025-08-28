import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  isPaddingOn?: boolean;
}

export function PageTransition({ children, className, isPaddingOn = true }: PageTransitionProps) {
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [location]);

  return (
    <motion.main
      className={clsx("mt-16 flex grow flex-col", className, isPaddingOn && "pt-16 pb-24")}
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      exit={{ filter: "blur(10px)", opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.main>
  );
}
