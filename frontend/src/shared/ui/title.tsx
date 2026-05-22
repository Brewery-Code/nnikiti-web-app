import clsx from "clsx";
import { motion } from "framer-motion";
import { fadeInAnimation } from "./fade-in-animation";

interface TitleProps {
  className?: string;
  children: React.ReactNode;
  color?: string;
  animated?: boolean;
}

export function Title({ className, children, color, animated }: TitleProps) {
  return (
    <motion.h2
      className={clsx(
        "font-open-sans mb-[var(--title-gap)] text-fluid-4xl font-bold uppercase",
        color ?? "text-white",
        className
      )}
      {...(!animated ? fadeInAnimation : {})}
    >
      {children}
    </motion.h2>
  );
}
