import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const PATH_VARIANTS = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 1.4, ease: EASE },
      opacity: { delay, duration: 0.01 },
    },
  }),
};

const TEXT_VARIANTS = {
  hidden: { opacity: 0, x: -8 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.5, ease: EASE },
  }),
};

export default function AnimatedLogo({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 176 74"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      aria-label="ННІКІТІ логотип"
      style={{ overflow: "visible" }}
    >
      {/* Outer arc: ~316° circle with cat-ear notch at top */}
      <motion.path
        d="M 50,13 A 30,30 0 1 1 28,13 C 26,3 38,10 39,10 C 40,10 42,3 50,13"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={PATH_VARIANTS}
        custom={0}
      />
      {/* Inner arc: creates yin-yang swirl effect */}
      <motion.path
        d="M 56,33 C 62,42 56,57 37,61"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        variants={PATH_VARIANTS}
        custom={0.4}
      />
      {/* Text line 1 */}
      <motion.text
        x="84"
        y="31"
        fontFamily="'Open Sans Condensed', 'Open Sans', sans-serif"
        fontWeight="800"
        fontSize="26"
        fill="currentColor"
        variants={TEXT_VARIANTS}
        custom={0.7}
      >
        ННІ
      </motion.text>
      {/* Text line 2 */}
      <motion.text
        x="84"
        y="61"
        fontFamily="'Open Sans Condensed', 'Open Sans', sans-serif"
        fontWeight="800"
        fontSize="26"
        fill="currentColor"
        variants={TEXT_VARIANTS}
        custom={0.9}
      >
        КІТІ
      </motion.text>
    </motion.svg>
  );
}
