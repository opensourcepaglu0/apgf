import type { Variants, Transition } from "motion/react"

/* ================================================================
   APGF MOTION SYSTEM
================================================================ */

/* ---------------------------------------------------------------
   EASINGS
---------------------------------------------------------------- */

export const APGF_EASE = [0.22, 1, 0.36, 1] as const

export const APGF_EASE_SMOOTH = [0.16, 1, 0.3, 1] as const

export const APGF_EASE_LINEAR = [0, 0, 1, 1] as const

/* ---------------------------------------------------------------
   DURATIONS
---------------------------------------------------------------- */

export const APGF_DURATION = {
  instant: 0.12,
  fast: 0.18,
  normal: 0.4,
  medium: 0.65,
  slow: 0.8,
  dramatic: 1.1,
  cinematic: 1.4,
} as const

/* ---------------------------------------------------------------
   TRANSITIONS
---------------------------------------------------------------- */

export const APGF_TRANSITION: Record<
  keyof typeof APGF_DURATION,
  Transition
> = {
  instant: {
    duration: APGF_DURATION.instant,
    ease: APGF_EASE,
  },

  fast: {
    duration: APGF_DURATION.fast,
    ease: APGF_EASE,
  },

  normal: {
    duration: APGF_DURATION.normal,
    ease: APGF_EASE,
  },

  medium: {
    duration: APGF_DURATION.medium,
    ease: APGF_EASE,
  },

  slow: {
    duration: APGF_DURATION.slow,
    ease: APGF_EASE,
  },

  dramatic: {
    duration: APGF_DURATION.dramatic,
    ease: APGF_EASE,
  },

  cinematic: {
    duration: APGF_DURATION.cinematic,
    ease: APGF_EASE,
  },
}

/* ---------------------------------------------------------------
   SPRINGS
---------------------------------------------------------------- */

export const APGF_SPRING = {
  gentle: {
    type: "spring",
    stiffness: 80,
    damping: 20,
    mass: 0.6,
  },

  smooth: {
    type: "spring",
    stiffness: 120,
    damping: 22,
    mass: 0.5,
  },

  responsive: {
    type: "spring",
    stiffness: 240,
    damping: 22,
    mass: 0.4,
  },

  magnetic: {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 0.4,
  },
} satisfies Record<string, Transition>

/* ---------------------------------------------------------------
   REVEAL VARIANTS
---------------------------------------------------------------- */

export const APGF_REVEAL: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: APGF_TRANSITION.slow,
  },
}

export const APGF_REVEAL_UP: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: APGF_TRANSITION.dramatic,
  },
}

export const APGF_REVEAL_DOWN: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: APGF_TRANSITION.slow,
  },
}

export const APGF_REVEAL_LEFT: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: APGF_TRANSITION.slow,
  },
}

export const APGF_REVEAL_RIGHT: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: APGF_TRANSITION.slow,
  },
}

/* ---------------------------------------------------------------
   BLUR REVEAL
---------------------------------------------------------------- */

export const APGF_BLUR_REVEAL: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(14px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: APGF_TRANSITION.dramatic,
  },
}

/* ---------------------------------------------------------------
   SCALE REVEAL
---------------------------------------------------------------- */

export const APGF_SCALE_REVEAL: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: APGF_TRANSITION.dramatic,
  },
}

/* ---------------------------------------------------------------
   STAGGER
---------------------------------------------------------------- */

export const APGF_STAGGER: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const APGF_STAGGER_FAST: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

export const APGF_STAGGER_SLOW: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
}

/* ---------------------------------------------------------------
   CHILD ITEM
---------------------------------------------------------------- */

export const APGF_STAGGER_ITEM: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: APGF_TRANSITION.medium,
  },
}

/* ---------------------------------------------------------------
   HOVER
---------------------------------------------------------------- */

export const APGF_HOVER_LIFT = {
  y: -5,
}

export const APGF_HOVER_SCALE = {
  scale: 1.02,
}

export const APGF_HOVER_SCALE_SMALL = {
  scale: 1.015,
}

export const APGF_TAP = {
  scale: 0.97,
}

/* ---------------------------------------------------------------
   VIEWPORT
---------------------------------------------------------------- */

export const APGF_VIEWPORT = {
  once: true,
  amount: 0.2,
} as const