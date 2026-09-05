"use client"

type HeroStatProps = {
  icon: React.ReactNode
  value: string
  label: string
}

export function HeroStat({
  icon,
  value,
  label,
}: HeroStatProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-emerald-300/70 [&_svg]:h-4 [&_svg]:w-4">
        {icon}
      </div>

      <div>
        <div className="text-xs font-black tracking-wider text-white/70">
          {value}
        </div>

        <div className="text-[8px] font-semibold tracking-[0.2em] text-white/25">
          {label}
        </div>
      </div>
    </div>
  )
}