"use client"

import type { HTMLMotionProps } from "motion/react"
import { motion, useReducedMotion } from "motion/react"

import {
  APGF_STAGGER,
  APGF_STAGGER_FAST,
  APGF_STAGGER_SLOW,
  APGF_VIEWPORT,
} from "@/lib/motion"

type StaggerSpeed = "fast" | "normal" | "slow"

type StaggerProps = HTMLMotionProps<"div"> & {
  speed?: StaggerSpeed
}

const variants = {
  fast: APGF_STAGGER_FAST,
  normal: APGF_STAGGER,
  slow: APGF_STAGGER_SLOW,
}

export function Stagger({
  children,
  speed = "normal",
  ...props
}: StaggerProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={APGF_VIEWPORT}
      variants={variants[speed]}
      {...props}
    >
      {children}
    </motion.div>
  )
}