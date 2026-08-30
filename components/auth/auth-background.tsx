export function AuthBackground() {
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 bg-[#09090B]" />

      {/* Top Glow */}
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[180px]" />

      {/* Bottom Glow */}
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[180px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
    </>
  )
}
