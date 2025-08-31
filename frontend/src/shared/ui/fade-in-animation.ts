import { type MotionProps } from "framer-motion";

export const fadeInAnimation: MotionProps = {
  initial: { y: 50, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { amount: "all" as const, once: true },
  transition: { duration: 0.5 },
};

export const fadeInAnimationControlled: MotionProps = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 },
};
