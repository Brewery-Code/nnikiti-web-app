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
    <div className="z-0 overflow-hidden absolute inset-0 w-full h-full pointer-events-none">
      {particles.map((p, i) => {
        return (
          <motion.span
            className="absolute w-1 h-1 bg-amber-50 rounded-full"
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
