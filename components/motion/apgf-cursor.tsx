"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react"
import { useEffect, useState } from "react"

export function APGFCursor() {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, {
    stiffness: 300,
    damping: 30,
    mass: 0.2,
  })

  const springY = useSpring(y, {
    stiffness: 300,
    damping: 30,
    mass: 0.2,
  })

  useEffect(() => {
    if (reducedMotion) return

    const media = window.matchMedia("(pointer: fine)")

    setEnabled(media.matches)

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    })

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [reducedMotion, x, y])

  if (!enabled || reducedMotion) return null

  return (
    <>
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="
          pointer-events-none fixed left-0 top-0 z-[100]
          h-3 w-3
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-300
          mix-blend-screen
        "
      />

      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="
          pointer-events-none fixed left-0 top-0 z-[99]
          h-10 w-10
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border border-emerald-400/20
          bg-emerald-400/[0.03]
          blur-[1px]
        "
      />
    </>
  )
} 