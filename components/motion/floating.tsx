"use client"

import { motion, useReducedMotion } from "motion/react"

type FloatingProps = {
  children: React.ReactNode
  distance?: number
  duration?: number
  className?: string
}

export function Floating({
  children,
  distance = 8,
  duration = 5,
  className,
}: FloatingProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={
        reducedMotion
          ? undefined
          : {
              y: [0, -distance, 0],
            }
      }
      transition={
        reducedMotion
          ? undefined
          : {
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}