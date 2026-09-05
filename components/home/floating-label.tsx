"use client"

type FloatingLabelProps = {
  children: React.ReactNode
}

export function FloatingLabel({
  children,
}: FloatingLabelProps) {
  return (
    <div className="flex items-center gap-2 border border-white/10 bg-black/70 px-3 py-2 text-[8px] font-bold tracking-[0.18em] text-white/50 shadow-2xl backdrop-blur-xl">
      {children}
    </div>
  )
}