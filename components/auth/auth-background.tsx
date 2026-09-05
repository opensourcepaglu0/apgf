export function AuthBackground() {
  return (
    <>
      {/* Base */}
      <div className="absolute inset-0 bg-[#070908]" />

      {/* Ambient APGF glow */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-emerald-500/[0.08] blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-[-120px] h-[520px] w-[520px] rounded-full bg-emerald-400/[0.06] blur-[160px]" />

      {/* Subtle center light */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.025] blur-[140px]" />

      {/* Technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />

      {/* Bottom depth */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
    </>
  )
}

