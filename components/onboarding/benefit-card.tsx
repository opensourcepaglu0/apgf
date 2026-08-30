import { ReactNode } from "react"

type Props = {
  icon: ReactNode
  title: string
  description: string
}

export function BenefitCard({ icon, title, description }: Props) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-emerald-500/30">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 text-emerald-400 transition group-hover:scale-110">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-white">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
      </div>
    </div>
  )
}
