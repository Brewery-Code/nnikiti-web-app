export function SideOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden opacity-40 md:opacity-100">
      <div
        className="orb-1 absolute rounded-full"
        style={{
          width: 700, height: 700,
          left: "-12%", top: "-5%",
          background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)",
          filter: "blur(0px)",
          willChange: "transform",
        }}
      />
      <div
        className="orb-2 absolute rounded-full"
        style={{
          width: 620, height: 620,
          right: "-10%", bottom: "3%",
          background: "radial-gradient(circle, rgba(59,130,246,0.30) 0%, rgba(59,130,246,0.07) 50%, transparent 70%)",
          filter: "blur(0px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07080e]">
      <div
        className="orb-bg-1 absolute rounded-full"
        style={{
          width: 750, height: 750,
          left: "-15%", top: "-20%",
          background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 62%)",
          willChange: "transform",
        }}
      />
      <div
        className="orb-bg-2 absolute rounded-full"
        style={{
          width: 600, height: 600,
          right: "-12%", bottom: "-10%",
          background: "radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 62%)",
          willChange: "transform",
        }}
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
