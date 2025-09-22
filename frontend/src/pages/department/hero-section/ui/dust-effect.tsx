import { useMemo } from "react";
import { motion } from "framer-motion";

export function DustEffect() {
  const total = 40;

  const particles = useMemo(
    () =>
      Array.from({ length: total }).map(() => ({
        diameter: Math.round(Math.random() * 50 + 2) / 10,
        startX: Math.round(Math.random() * 1000) / 10 - 1,
        duration: Math.round((Math.random() * 2 + 10) * 10) / 10,
        delay: Math.round(Math.random() * 100) / 10,
        scale: Math.round((Math.random() * 2 + 1) * 5) / 10,
      })),
    [total]
  );

  return (
    <div className="absolute inset-0 bottom-0 h-full w-full">
      <div className="relative h-full w-full">
        {particles.map((p, i) => (
          <motion.span
            className="absolute bottom-0 rounded-full bg-white opacity-0"
            style={{
              width: `${p.diameter}px`,
              height: `${p.diameter}px`,
              left: `${p.startX}%`,
              scale: `${p.scale}`,
            }}
            key={i}
            initial={{
              bottom: 0,
              // y: "100%",
              opacity: 0,
            }}
            animate={{ bottom: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}
