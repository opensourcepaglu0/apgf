"use client"

import { motion } from "motion/react"
import { APGF_EASE } from "@/lib/motion"

type KineticTextProps = {
  lines: string[]
  className?: string
}

export function KineticText({
  lines,
  className = "",
}: KineticTextProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={className}
    >
      {lines.map((line, index) => (
        <div
          key={line}
          className="overflow-hidden"
        >
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: "100%",
                filter: "blur(12px)",
              },

              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.9,
                  delay: index * 0.1,
                  ease: APGF_EASE,
                },
              },
            }}
            className={
              index === lines.length - 1
                ? "text-white"
                : "text-white/90"
            }
          >
            {line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  )
}