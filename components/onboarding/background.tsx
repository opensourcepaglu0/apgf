export function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_40%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  )
}
