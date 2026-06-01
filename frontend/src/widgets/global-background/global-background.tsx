import { motion } from "framer-motion";

export function SideOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden opacity-40 md:opacity-100">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700, height: 700,
          left: "-12%", top: "-5%",
          background: "radial-gradient(circle, rgba(124,58,237,0.28) 0%, rgba(124,58,237,0.06) 55%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [0.8, 1.15, 0.88, 0.8], x: [0, 24, -12, 0], y: [0, -28, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 620, height: 620,
          right: "-10%", bottom: "3%",
          background: "radial-gradient(circle, rgba(59,130,246,0.24) 0%, rgba(59,130,246,0.06) 55%, transparent 70%)",
          filter: "blur(75px)",
        }}
        animate={{ scale: [0.75, 1.2, 0.85, 0.75], x: [0, -20, 10, 0], y: [0, 30, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 460, height: 460,
          right: "12%", top: "38%",
          background: "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
        animate={{ scale: [0.9, 1.1, 0.95, 0.9], x: [0, 15, -8, 0], y: [0, -20, 12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 9 }}
      />
    </div>
  );
}

export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07080e]">
      {/* Aurora blob 1 — violet, top-left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 750, height: 750,
          left: "-15%", top: "-20%",
          background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 62%)",
          filter: "blur(120px)",
        }}
        animate={{ x: [0, 50, -22, 0], y: [0, 35, -18, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora blob 2 — indigo, bottom-right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          right: "-12%", bottom: "-10%",
          background: "radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 62%)",
          filter: "blur(100px)",
        }}
        animate={{ x: [0, -38, 20, 0], y: [0, -42, 22, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />

      {/* Aurora blob 3 — blue, top-right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 480, height: 480,
          right: "-6%", top: "-5%",
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, -25, 12, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
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
