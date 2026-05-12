import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  type MotionProps,
  type Variants,
} from "framer-motion";

// ── Easing ────────────────────────────────────────────────────────────────────
const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Reveal variants ───────────────────────────────────────────────────────────
const revealVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 56, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: EASE_OUT_EXPO },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1.0, ease: EASE_OUT_EXPO } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.86, y: 40 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.85, ease: EASE_OUT_EXPO },
    },
  },
  left: {
    hidden: { opacity: 0, x: -56, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: EASE_OUT_EXPO },
    },
  },
  right: {
    hidden: { opacity: 0, x: 56, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: EASE_OUT_EXPO },
    },
  },
};

type RevealMode = keyof typeof revealVariants;

type AnyProps = Record<string, unknown>;

// ── <Reveal> — single element fade in on scroll ──────────────────────────────
export function Reveal({
  children,
  as: As = "div",
  mode = "up",
  delay = 0,
  className,
  amount = 0.35,
  once = true,
  inView = true,
  ...rest
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  mode?: RevealMode;
  delay?: number;
  className?: string;
  amount?: number;
  once?: boolean;
  inView?: boolean;
} & Omit<MotionProps, "variants"> &
  AnyProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MotionAs = useMemo(() => motion.create(As as React.ElementType), [As]);

  const variants = useMemo(() => {
    if (delay === 0) return revealVariants[mode];
    const base = revealVariants[mode];
    return {
      hidden: base.hidden,
      show: {
        ...base.show,
        transition: {
          ...(base.show as { transition?: object }).transition,
          delay,
        },
      },
    } as Variants;
  }, [mode, delay]);

  return (
    <MotionAs
      className={className}
      variants={variants}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once, amount } }
        : { animate: "show" })}
      {...rest}
    >
      {children}
    </MotionAs>
  );
}

// ── <Stagger> — parent that staggers all <StaggerItem> children ──────────────
export function Stagger({
  children,
  as: As = "div",
  className,
  delay = 0,
  stagger = 0.1,
  amount = 0.25,
  once = true,
  inView = true,
  ...rest
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  amount?: number;
  once?: boolean;
  inView?: boolean;
} & Omit<MotionProps, "variants"> &
  AnyProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MotionAs = useMemo(() => motion.create(As as React.ElementType), [As]);
  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  return (
    <MotionAs
      className={className}
      variants={variants}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once, amount } }
        : { animate: "show" })}
      {...rest}
    >
      {children}
    </MotionAs>
  );
}

// ── <StaggerItem> — child of <Stagger> ───────────────────────────────────────
export function StaggerItem({
  children,
  as: As = "div",
  mode = "up",
  className,
  ...rest
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  mode?: RevealMode;
  className?: string;
} & Omit<MotionProps, "variants"> &
  AnyProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MotionAs = useMemo(() => motion.create(As as React.ElementType), [As]);
  return (
    <MotionAs className={className} variants={revealVariants[mode]} {...rest}>
      {children}
    </MotionAs>
  );
}

// ── <CountUp> — animated number counter ──────────────────────────────────────
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = (t - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(to * eased);
      setDisplay(new Intl.NumberFormat("uk-UA").format(value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ── <Magnetic> — element shifts toward cursor on hover ───────────────────────
export function Magnetic({
  children,
  strength = 18,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / rect.width) * strength * 2);
    y.set(((e.clientY - cy) / rect.height) * strength * 2);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── <Tilt> — 3D tilt effect on cards ─────────────────────────────────────────
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((py - 0.5) * -max * 2);
    ry.set((px - 0.5) * max * 2);
  }
  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── <ParallaxY> — element drifts on scroll ───────────────────────────────────
export function ParallaxY({
  children,
  className,
  distance = 80,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ── <SplitWords> — animate each word sliding up ──────────────────────────────
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.07,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: "60%", filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE_OUT_QUINT },
    },
  };
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
