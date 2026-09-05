"use client"

import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useEffect } from "react"

type Intensity = "subtle" | "medium" | "strong"

type APGFBackgroundProps = {
  grid?: boolean
  glow?: boolean
  noise?: boolean
  cursorGlow?: boolean
  intensity?: Intensity
}

const intensityMap = {
  subtle: {
    main: "bg-emerald-500/[0.035]",
    secondary: "bg-emerald-400/[0.018]",
    grid: "opacity-[0.025]",
  },

  medium: {
    main: "bg-emerald-500/[0.055]",
    secondary: "bg-emerald-400/[0.03]",
    grid: "opacity-[0.035]",
  },

  strong: {
    main: "bg-emerald-500/[0.08]",
    secondary: "bg-emerald-400/[0.045]",
    grid: "opacity-[0.05]",
  },
}

export function APGFBackground({
  grid = true,
  glow = true,
  noise = true,
  cursorGlow = true,
  intensity = "medium",
}: APGFBackgroundProps) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const smoothX = useSpring(pointerX, {
    stiffness: 70,
    damping: 25,
    mass: 0.5,
  })

  const smoothY = useSpring(pointerY, {
    stiffness: 70,
    damping: 25,
    mass: 0.5,
  })

  const glowX = useTransform(
    smoothX,
    [-0.5, 0.5],
    ["40%", "60%"],
  )

  const glowY = useTransform(
    smoothY,
    [-0.5, 0.5],
    ["35%", "65%"],
  )

  useEffect(() => {
    if (!cursorGlow) return

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5)
      pointerY.set(event.clientY / window.innerHeight - 0.5)
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    })

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [cursorGlow, pointerX, pointerY])

  const colors = intensityMap[intensity]

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Cursor reactive glow */}

      {glow && cursorGlow && (
        <motion.div
          className={`absolute h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] ${colors.main}`}
          style={{
            left: glowX,
            top: glowY,
          }}
        />
      )}

      {/* Primary animated glow */}

      {glow && (
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute left-1/2 top-[-20rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-[140px] ${colors.main}`}
        />
      )}

      {/* Secondary glow */}

      {glow && (
        <motion.div
          animate={{
            x: [0, -35, 15, 0],
            y: [0, 25, -20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute right-[-15rem] top-[30%] h-[32rem] w-[32rem] rounded-full blur-[130px] ${colors.secondary}`}
        />
      )}

      {/* Animated grid */}

      {grid && (
        <motion.div
          animate={{
            backgroundPosition: [
              "0px 0px",
              "72px 72px",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`
            absolute inset-0
            ${colors.grid}
            [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
            [background-size:72px_72px]
          `}
        />
      )}

      {/* Vignette */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050706_75%)]" />

      {/* Noise */}

      {noise && (
        <div className="absolute inset-0 opacity-[0.025] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.7%22/%3E%3C/svg%3E')]" />
      )}
    </div>
  )
}