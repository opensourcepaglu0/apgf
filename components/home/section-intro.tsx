"use client"

type SectionIntroProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionIntro({
  eyebrow,
  title,
  description,
}: SectionIntroProps) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.28em] text-emerald-300/70">
        <span className="h-px w-7 bg-emerald-400/70" />
        {eyebrow}
      </div>

      <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
        {title}
      </h2>

      <p className="mt-6 max-w-2xl text-base leading-7 text-white/40">
        {description}
      </p>
    </div>
  )
}