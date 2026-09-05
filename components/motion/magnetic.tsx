"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

import { APGF_SPRING } from "@/lib/motion"

type MagneticProps = {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function Magnetic({
  children,
  strength = 0.25,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, APGF_SPRING.magnetic)
  const springY = useSpring(y, APGF_SPRING.magnetic)

  function handlePointerMove(event: React.PointerEvent) {
    if (reducedMotion || !ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const relativeX =
      event.clientX - (rect.left + rect.width / 2)

    const relativeY =
      event.clientY - (rect.top + rect.height / 2)

    x.set(relativeX * strength)
    y.set(relativeY * strength)
  }

  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}