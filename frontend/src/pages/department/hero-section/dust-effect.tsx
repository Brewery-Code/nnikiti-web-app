import { motion } from "framer-motion";
import { useMemo } from "react";

export function DustEffect() {
  const total = 40;

  const particles = useMemo(
    () =>
      Array.from({ length: total }).map(() => ({
        startX: Math.round(Math.random() * 1000) / 10,
        duration: Math.round((Math.random() * 2 + 10) * 10) / 10,
        delay: Math.round(Math.random() * 100) / 10,
        scale: Math.round((Math.random() * 2 + 1) * 10) / 10,
      })),
    [total]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      {particles.map((p, i) => {
        return (
          <motion.span
            className="absolute h-1 w-1 rounded-full bg-amber-50"
            style={{ left: `${p.startX}%` }}
            key={i}
            initial={{
              x: 0,
              y: 1000,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: [0, 0.9, 0],
            }}
            transition={{
              delay: p.delay,
              duration: p.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
