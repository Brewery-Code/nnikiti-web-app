import { type MotionProps } from "framer-motion";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeInAnimation: MotionProps = {
  initial: { y: 56, opacity: 0, filter: "blur(10px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { amount: 0.35, once: true },
  transition: { duration: 0.8, ease: EASE_OUT_EXPO },
};

export const fadeInAnimationControlled: MotionProps = {
  initial: { y: 40, opacity: 0, filter: "blur(6px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.7, ease: EASE_OUT_EXPO },
};
