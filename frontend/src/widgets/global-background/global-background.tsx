import { motion } from "framer-motion";

export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07080e]">
      {/* Aurora blob 1 — violet, top-left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 650, height: 650,
          left: "-12%", top: "-18%",
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)",
          filter: "blur(110px)",
        }}
        animate={{ x: [0, 45, -20, 0], y: [0, 30, -15, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora blob 2 — indigo, bottom-right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500, height: 500,
          right: "-10%", bottom: "-8%",
          background: "radial-gradient(circle, rgba(79,70,229,0.14) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, -35, 18, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* Subtle noise grain */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
