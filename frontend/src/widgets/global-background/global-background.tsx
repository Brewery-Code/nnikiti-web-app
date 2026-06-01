import { motion } from "framer-motion";

export function GlobalBackground({ sideOrbs = false }: { sideOrbs?: boolean }) {
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

      {sideOrbs && (
        <>
          {/* Side orb left — violet, top-left */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 520, height: 520,
              left: "-8%", top: "2%",
              background: "radial-gradient(circle, rgba(124,58,237,0.45) 0%, rgba(124,58,237,0.12) 50%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [0.75, 1.2, 0.85, 0.75], x: [0, 20, -10, 0], y: [0, -30, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Side orb right — blue, bottom-right */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 460, height: 460,
              right: "-7%", bottom: "2%",
              background: "radial-gradient(circle, rgba(59,130,246,0.40) 0%, rgba(59,130,246,0.10) 50%, transparent 70%)",
              filter: "blur(55px)",
            }}
            animate={{ scale: [0.7, 1.18, 0.82, 0.7], x: [0, -18, 9, 0], y: [0, 28, -14, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </>
      )}

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
