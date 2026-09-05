"use client"

import { motion } from "motion/react"

type FeatureCardProps = {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({
  number,
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
        },

        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
          },
        },
      }}
      whileHover={{
        backgroundColor: "rgba(255,255,255,0.025)",
      }}
      className="group relative bg-[var(--apgf-surface)] p-8 transition-colors sm:p-10"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center border border-emerald-400/15 bg-emerald-400/[0.04] text-emerald-300/70 transition-colors group-hover:border-emerald-400/30 group-hover:text-emerald-300 [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </div>

        <span className="text-[9px] font-bold tracking-[0.2em] text-white/15">
          {number}
        </span>
      </div>

      <h3 className="mt-12 text-sm font-black tracking-[0.18em]">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-white/35">
        {description}
      </p>

      <div className="mt-8 h-px w-8 bg-emerald-400/30 transition-all duration-500 group-hover:w-16" />
    </motion.div>
  )
}