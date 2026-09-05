"use client"

import type { HTMLMotionProps } from "motion/react"
import { motion, useReducedMotion } from "motion/react"

import {
  APGF_BLUR_REVEAL,
  APGF_REVEAL,
  APGF_REVEAL_DOWN,
  APGF_REVEAL_LEFT,
  APGF_REVEAL_RIGHT,
  APGF_REVEAL_UP,
  APGF_SCALE_REVEAL,
  APGF_VIEWPORT,
} from "@/lib/motion"

type RevealVariant =
  | "default"
  | "up"
  | "down"
  | "left"
  | "right"
  | "blur"
  | "scale"

type RevealProps = HTMLMotionProps<"div"> & {
  variant?: RevealVariant
  delay?: number
}

const variants = {
  default: APGF_REVEAL,
  up: APGF_REVEAL_UP,
  down: APGF_REVEAL_DOWN,
  left: APGF_REVEAL_LEFT,
  right: APGF_REVEAL_RIGHT,
  blur: APGF_BLUR_REVEAL,
  scale: APGF_SCALE_REVEAL,
}

export function Reveal({
  children,
  variant = "default",
  delay = 0,
  ...props
}: RevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    )
  }

  const selectedVariant = variants[variant]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={APGF_VIEWPORT}
      variants={selectedVariant}
      transition={{
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}