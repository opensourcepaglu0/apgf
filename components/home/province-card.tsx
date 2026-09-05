"use client"

import { MapPin } from "lucide-react"
import { motion } from "motion/react"

type ProvinceCardProps = {
  index: string
  province: string
}

export function ProvinceCard({
  index,
  province,
}: ProvinceCardProps) {
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
        y: -5,
      }}
      className="group relative overflow-hidden border border-white/[0.07] bg-white/[0.015] p-6 transition-colors hover:border-emerald-400/20 hover:bg-emerald-400/[0.025]"
    >
      <div className="flex items-start justify-between">
        <span className="text-[9px] font-bold tracking-[0.2em] text-white/20">
          {index}
        </span>

        <MapPin className="h-4 w-4 text-white/20 transition-colors group-hover:text-emerald-300/70" />
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-bold tracking-tight">
          {province}
        </h3>

        <p className="mt-2 text-[10px] font-semibold tracking-[0.18em] text-white/20">
          EXPLORE GAMERS
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-400 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  )
}