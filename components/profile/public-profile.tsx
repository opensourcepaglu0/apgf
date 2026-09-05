"use client"

import { useMemo, useState } from "react"

import {
  Check,
  Copy,
  ExternalLink,
  Gamepad2,
  MapPin,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import {
  siDiscord,
  siInstagram,
  siSteam,
  siTiktok,
  siTwitch,
  siX,
  siYoutube,
} from "simple-icons"

import { motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

import { GamerCard } from "@/components/profile/gamer-card-shareable"

import { APGFBackground } from "@/components/motion/apgf-background"
import { Reveal } from "@/components/motion/reveal"
import { Stagger } from "@/components/motion/stagger"
import { Magnetic } from "@/components/motion/magnetic"
import { Floating } from "@/components/motion/floating"

// ==================================================
// Types
// ==================================================

type PublicProfileProps = {
  profile: any
}

// ==================================================
// Constants
// ==================================================

const APGF_DISCORD_URL = "https://discord.gg/your-invite"

// ==================================================
// Brand Icon
// ==================================================

function BrandIcon({
  icon,
  className = "h-4 w-4",
}: {
  icon: {
    path: string
  }
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={icon.path} />
    </svg>
  )
}

// ==================================================
// Component
// ==================================================

export function PublicProfile({
  profile,
}: PublicProfileProps) {
  const reducedMotion = useReducedMotion()

  const [copied, setCopied] = useState(false)
  const [sharing, setSharing] = useState(false)

  // ==================================================
  // Profile Data
  // ==================================================

  const games = Array.isArray(profile.games)
    ? profile.games.filter(Boolean)
    : []

  const displayName =
    profile.display_name ||
    profile.username ||
    "APGF Gamer"

  const username = profile.username || "gamer"

  const location = [profile.city, profile.province]
    .filter(Boolean)
    .join(" • ")

  // ==================================================
  // Social Links
  // ==================================================

  const socialLinks = useMemo(() => {
    const links =
      profile.social_links &&
      typeof profile.social_links === "object"
        ? profile.social_links
        : {}

    return [
      {
        key: "discord",
        label: "Discord",
        value: links.discord,
        icon: siDiscord,
      },
      {
        key: "youtube",
        label: "YouTube",
        value: links.youtube,
        icon: siYoutube,
      },
      {
        key: "instagram",
        label: "Instagram",
        value: links.instagram,
        icon: siInstagram,
      },
      {
        key: "tiktok",
        label: "TikTok",
        value: links.tiktok,
        icon: siTiktok,
      },
      {
        key: "x",
        label: "X",
        value: links.x,
        icon: siX,
      },
      {
        key: "twitch",
        label: "Twitch",
        value: links.twitch,
        icon: siTwitch,
      },
      {
        key: "steam",
        label: "Steam",
        value: links.steam,
        icon: siSteam,
      },
    ].filter(
      (item) =>
        typeof item.value === "string" &&
        item.value.trim().length > 0
    )
  }, [profile.social_links])

  // ==================================================
  // Copy Profile
  // ==================================================

  async function copyProfileLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)

      setCopied(true)

      toast.add({
        type: "success",
        description: "Profile link copied.",
      })

      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      toast.add({
        type: "error",
        description: "Could not copy profile link.",
      })
    }
  }

  // ==================================================
  // Native Share
  // ==================================================

  async function shareProfile() {
    if (sharing) return

    setSharing(true)

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.share
      ) {
        await navigator.share({
          title: `${displayName} • APGF`,
          text: `Check out ${displayName}'s APGF Gamer Profile.`,
          url: window.location.href,
        })

        return
      }

      await navigator.clipboard.writeText(window.location.href)

      setCopied(true)

      toast.add({
        type: "success",
        description: "Profile link copied to clipboard.",
      })

      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return
      }

      toast.add({
        type: "error",
        description: "Could not share profile.",
      })
    } finally {
      setSharing(false)
    }
  }

  // ==================================================
  // Render
  // ==================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050706] text-white">
      {/* ==================================================
          Background
      ================================================== */}

      <APGFBackground
        grid
        glow
        noise
        cursorGlow
        intensity="subtle"
      />

      {/* ==================================================
          Main
      ================================================== */}

      <main className="relative z-10">
        <div
          className="
            mx-auto
            w-full
            max-w-6xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* ==================================================
              HERO
          ================================================== */}

          <section
            className="
              relative
              flex
              min-h-[90vh]
              flex-col
              justify-center
              py-20
              sm:py-24
              lg:py-28
            "
          >
            {/* Giant background ID */}

            {profile.apgf_id && (
              <motion.div
                initial={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        scale: 0.96,
                      }
                }
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: 1,
                        scale: 1,
                      }
                }
                transition={{
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  whitespace-nowrap
                  font-mono
                  text-[20vw]
                  font-black
                  leading-none
                  tracking-[-0.08em]
                  text-white/[0.018]
                  select-none
                "
              >
                {profile.apgf_id}
              </motion.div>
            )}

            {/* Hero content */}

            <div className="relative">
              <Reveal
                variant="blur"
                className="mb-8"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                      text-[9px]
                      font-bold
                      tracking-[0.24em]
                      text-zinc-500
                    "
                  >
                    <motion.span
                      animate={
                        reducedMotion
                          ? undefined
                          : {
                              opacity: [0.45, 1, 0.45],
                              scale: [0.9, 1.15, 0.9],
                            }
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-emerald-400
                        shadow-[0_0_14px_rgba(52,211,153,0.8)]
                      "
                    />

                    APGF GAMER IDENTITY
                  </div>

                  {profile.is_verified && (
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        font-bold
                        tracking-[0.18em]
                        text-emerald-400/80
                      "
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />

                      VERIFIED
                    </div>
                  )}
                </div>
              </Reveal>

              {/* Main identity */}

              <div
                className="
                  grid
                  items-center
                  gap-12
                  lg:grid-cols-[0.9fr_1.1fr]
                  lg:gap-16
                "
              >
                {/* Identity typography */}

                <div className="relative order-2 lg:order-1">
                  <Reveal
                    variant="left"
                    delay={0.04}
                  >
                    <p
                      className="
                        mb-4
                        text-[9px]
                        font-bold
                        tracking-[0.24em]
                        text-emerald-400/60
                      "
                    >
                      PLAYER PROFILE
                    </p>
                  </Reveal>

                  <Reveal
                    variant="blur"
                    delay={0.08}
                  >
                    <h1
                      className="
                        max-w-xl
                        text-[clamp(3rem,7vw,6.5rem)]
                        font-black
                        leading-[0.88]
                        tracking-[-0.06em]
                        text-white
                      "
                    >
                      {displayName}
                    </h1>
                  </Reveal>

                  <Reveal
                    variant="up"
                    delay={0.14}
                  >
                    <div
                      className="
                        mt-6
                        flex
                        flex-wrap
                        items-center
                        gap-x-4
                        gap-y-2
                      "
                    >
                      <span
                        className="
                          font-mono
                          text-sm
                          font-medium
                          tracking-tight
                          text-zinc-400
                        "
                      >
                        @{username}
                      </span>

                      {profile.apgf_id && (
                        <>
                          <span className="h-3 w-px bg-white/[0.10]" />

                          <span
                            className="
                              font-mono
                              text-[10px]
                              font-medium
                              tracking-[0.12em]
                              text-zinc-600
                            "
                          >
                            APGF-{profile.apgf_id}
                          </span>
                        </>
                      )}
                    </div>
                  </Reveal>

                  {location && (
                    <Reveal
                      variant="up"
                      delay={0.18}
                    >
                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          gap-2
                          text-xs
                          text-zinc-500
                        "
                      >
                        <MapPin className="h-3.5 w-3.5 text-emerald-400/70" />

                        <span>{location}</span>

                        <span className="text-zinc-700">
                          •
                        </span>

                        <span className="text-zinc-600">
                          Pakistan
                        </span>
                      </div>
                    </Reveal>
                  )}

                  {/* Hero line */}

                  <Reveal
                    variant="up"
                    delay={0.22}
                  >
                    <div
                      className="
                        mt-10
                        h-px
                        w-full
                        max-w-md
                        bg-gradient-to-r
                        from-emerald-400/30
                        via-white/[0.08]
                        to-transparent
                      "
                    />
                  </Reveal>

                  <Reveal
                    variant="up"
                    delay={0.26}
                  >
                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        gap-2
                        text-[9px]
                        font-bold
                        tracking-[0.2em]
                        text-zinc-700
                      "
                    >
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400/40" />

                      GAMING IDENTITY FOR PAKISTAN
                    </div>
                  </Reveal>
                </div>

                {/* Gamer Card */}

                <div className="relative order-1 lg:order-2">
                  {/* Ambient glow */}

                  <motion.div
                    animate={
                      reducedMotion
                        ? undefined
                        : {
                            scale: [1, 1.08, 1],
                            opacity: [0.35, 0.55, 0.35],
                          }
                    }
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      h-[70%]
                      w-[70%]
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-emerald-400/[0.07]
                      blur-[100px]
                    "
                  />

                  <Floating
                    distance={5}
                    duration={7}
                  >
                    <Reveal
                      variant="scale"
                      delay={0.1}
                    >
                      <GamerCard profile={profile} />
                    </Reveal>
                  </Floating>

                  {/* Card hint */}

                  <Reveal
                    variant="up"
                    delay={0.35}
                  >
                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-center
                        text-[9px]
                        tracking-[0.14em]
                        text-zinc-700
                      "
                    >
                      <span className="h-px w-8 bg-white/[0.06]" />

                      APGF DIGITAL IDENTITY

                      <span className="h-px w-8 bg-white/[0.06]" />
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================
              IDENTITY STRIP
          ================================================== */}

          {(location || games.length > 0) && (
            <Reveal
              variant="up"
              className="pb-20"
            >
              <div
                className="
                  border-y
                  border-white/[0.07]
                  py-7
                "
              >
                <div
                  className="
                    grid
                    gap-8
                    sm:grid-cols-2
                  "
                >
                  {/* Location */}

                  {location && (
                    <div>
                      <div
                        className="
                          mb-3
                          flex
                          items-center
                          gap-2
                          text-[8px]
                          font-bold
                          tracking-[0.2em]
                          text-zinc-700
                        "
                      >
                        <MapPin className="h-3 w-3 text-emerald-400/50" />

                        LOCATION
                      </div>

                      <p
                        className="
                          text-lg
                          font-semibold
                          tracking-tight
                          text-zinc-200
                        "
                      >
                        {location}
                      </p>
                    </div>
                  )}

                  {/* Games */}

                  {games.length > 0 && (
                    <div>
                      <div
                        className="
                          mb-3
                          flex
                          items-center
                          gap-2
                          text-[8px]
                          font-bold
                          tracking-[0.2em]
                          text-zinc-700
                        "
                      >
                        <Gamepad2 className="h-3 w-3 text-emerald-400/50" />

                        PLAYING
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {games.map(
                          (game: string, index: number) => (
                            <motion.span
                              key={`${game}-${index}`}
                              whileHover={
                                reducedMotion
                                  ? undefined
                                  : {
                                      y: -2,
                                    }
                              }
                              className="
                                rounded-full
                                border
                                border-white/[0.08]
                                bg-white/[0.025]
                                px-3
                                py-1.5
                                text-[10px]
                                font-medium
                                text-zinc-400
                                transition-colors
                                hover:border-emerald-400/20
                                hover:text-emerald-300
                              "
                            >
                              {game}
                            </motion.span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          )}

          {/* ==================================================
              ABOUT
          ================================================== */}

          {profile.bio && (
            <section className="pb-24 sm:pb-28">
              <div
                className="
                  grid
                  gap-10
                  lg:grid-cols-[0.35fr_0.65fr]
                  lg:gap-20
                "
              >
                <Reveal variant="left">
                  <div>
                    <p
                      className="
                        text-[9px]
                        font-bold
                        tracking-[0.22em]
                        text-emerald-400/60
                      "
                    >
                      01 / ABOUT
                    </p>

                    <h2
                      className="
                        mt-3
                        text-2xl
                        font-black
                        tracking-tight
                        text-white
                        sm:text-3xl
                      "
                    >
                      The player
                      <br />
                      behind the ID.
                    </h2>
                  </div>
                </Reveal>

                <Reveal
                  variant="right"
                  delay={0.08}
                >
                  <div
                    className="
                      relative
                      border-l
                      border-white/[0.08]
                      pl-6
                      sm:pl-10
                    "
                  >
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -left-px
                        top-0
                        h-16
                        w-px
                        bg-emerald-400/70
                      "
                    />

                    <p
                      className="
                        max-w-3xl
                        text-xl
                        font-medium
                        leading-relaxed
                        tracking-tight
                        text-zinc-300
                        sm:text-2xl
                      "
                    >
                      {profile.bio}
                    </p>
                  </div>
                </Reveal>
              </div>
            </section>
          )}

          {/* ==================================================
              CONNECTIONS
          ================================================== */}

          {socialLinks.length > 0 && (
            <section className="pb-24 sm:pb-28">
              <Reveal variant="up">
                <div
                  className="
                    mb-8
                    flex
                    items-end
                    justify-between
                    gap-6
                    border-b
                    border-white/[0.07]
                    pb-5
                  "
                >
                  <div>
                    <p
                      className="
                        text-[9px]
                        font-bold
                        tracking-[0.22em]
                        text-emerald-400/60
                      "
                    >
                      02 / CONNECTIONS
                    </p>

                    <h2
                      className="
                        mt-2
                        text-2xl
                        font-black
                        tracking-tight
                        text-white
                        sm:text-3xl
                      "
                    >
                      Find {displayName}
                    </h2>
                  </div>

                  <div
                    className="
                      hidden
                      text-[9px]
                      font-mono
                      tracking-[0.15em]
                      text-zinc-700
                      sm:block
                    "
                  >
                    SOCIAL / ONLINE
                  </div>
                </div>
              </Reveal>

              <Stagger
                speed="fast"
                className="
                  grid
                  gap-px
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.07]
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.key}
                    href={social.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={
                      reducedMotion
                        ? undefined
                        : {
                            y: -2,
                          }
                    }
                    whileTap={
                      reducedMotion
                        ? undefined
                        : {
                            scale: 0.985,
                          }
                    }
                    className="
                      group
                      relative
                      flex
                      min-h-[82px]
                      items-center
                      gap-4
                      bg-[#080a09]
                      p-4
                      outline-none
                      transition-colors
                      hover:bg-[#0b100d]
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-emerald-400/60
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.07]
                        bg-white/[0.025]
                        text-zinc-500
                        transition-all
                        group-hover:border-emerald-400/20
                        group-hover:bg-emerald-400/[0.05]
                        group-hover:text-emerald-400
                      "
                    >
                      <BrandIcon
                        icon={social.icon}
                        className="h-4 w-4"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          text-[9px]
                          font-bold
                          tracking-[0.16em]
                          text-zinc-500
                          transition-colors
                          group-hover:text-zinc-300
                        "
                      >
                        {social.label.toUpperCase()}
                      </p>

                      <p
                        className="
                          mt-1
                          truncate
                          text-xs
                          text-zinc-700
                          transition-colors
                          group-hover:text-zinc-500
                        "
                      >
                        {formatSocialValue(social.value)}
                      </p>
                    </div>

                    <ExternalLink
                      className="
                        h-3.5
                        w-3.5
                        shrink-0
                        text-zinc-700
                        transition-all
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        group-hover:text-emerald-400/70
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        h-px
                        origin-left
                        scale-x-0
                        bg-emerald-400/30
                        transition-transform
                        duration-500
                        group-hover:scale-x-100
                      "
                    />
                  </motion.a>
                ))}
              </Stagger>
            </section>
          )}

          {/* ==================================================
              CTA
          ================================================== */}

          <section className="pb-20 sm:pb-28">
            <Reveal variant="scale">
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-emerald-400/[0.12]
                  bg-emerald-400/[0.025]
                  px-6
                  py-12
                  sm:px-10
                  sm:py-14
                  lg:px-14
                "
              >
                {/* Glow */}

                <motion.div
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          x: [0, 40, -20, 0],
                          y: [0, -20, 15, 0],
                          scale: [1, 1.08, 0.96, 1],
                        }
                  }
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    h-96
                    w-96
                    rounded-full
                    bg-emerald-400/[0.07]
                    blur-[100px]
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.035]
                    [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
                    [background-size:48px_48px]
                  "
                />

                <div
                  className="
                    relative
                    flex
                    flex-col
                    gap-8
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                  "
                >
                  <div className="max-w-xl">
                    <p
                      className="
                        text-[9px]
                        font-bold
                        tracking-[0.22em]
                        text-emerald-400/70
                      "
                    >
                      03 / APGF COMMUNITY
                    </p>

                    <h2
                      className="
                        mt-3
                        text-3xl
                        font-black
                        tracking-[-0.03em]
                        text-white
                        sm:text-4xl
                      "
                    >
                      Your gaming identity
                      <br />
                      starts here.
                    </h2>

                    <p
                      className="
                        mt-4
                        max-w-lg
                        text-sm
                        leading-6
                        text-zinc-500
                      "
                    >
                      Claim your APGF ID and become
                      part of Pakistan's gaming identity.
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      w-full
                      flex-col
                      gap-2
                      lg:w-[270px]
                    "
                  >
                    <Magnetic strength={0.07}>
                      <Button
                        asChild
                        className="
                          h-12
                          w-full
                          rounded-xl
                          bg-emerald-400
                          font-bold
                          text-black
                          shadow-[0_0_40px_rgba(52,211,153,0.12)]
                          transition-all
                          hover:bg-emerald-300
                          hover:shadow-[0_0_55px_rgba(52,211,153,0.2)]
                        "
                      >
                        <a
                          href={APGF_DISCORD_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />

                          Join APGF Discord
                        </a>
                      </Button>
                    </Magnetic>

                    <div className="grid grid-cols-2 gap-2">
                      <Magnetic
                        strength={0.05}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          onClick={shareProfile}
                          disabled={sharing}
                          className="
                            h-11
                            w-full
                            rounded-xl
                            border-white/[0.08]
                            bg-white/[0.025]
                            text-zinc-300
                            hover:border-emerald-400/20
                            hover:bg-white/[0.05]
                            hover:text-white
                          "
                        >
                          <Share2 className="mr-2 h-4 w-4" />

                          {sharing
                            ? "Sharing..."
                            : "Share"}
                        </Button>
                      </Magnetic>

                      <Magnetic
                        strength={0.05}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          onClick={copyProfileLink}
                          className="
                            h-11
                            w-full
                            rounded-xl
                            border-white/[0.08]
                            bg-white/[0.025]
                            text-zinc-300
                            hover:border-emerald-400/20
                            hover:bg-white/[0.05]
                            hover:text-white
                          "
                        >
                          {copied ? (
                            <Check className="mr-2 h-4 w-4 text-emerald-400" />
                          ) : (
                            <Copy className="mr-2 h-4 w-4" />
                          )}

                          {copied ? "Copied" : "Copy"}
                        </Button>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ==================================================
              Footer
          ================================================== */}

          <Reveal
            variant="up"
            className="pb-12"
          >
            <footer
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-3
                border-t
                border-white/[0.06]
                pt-8
                text-center
              "
            >
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    text-[10px]
                    font-black
                    text-white
                  "
                >
                  A
                </div>

                <span
                  className="
                    text-[9px]
                    font-bold
                    tracking-[0.24em]
                    text-zinc-600
                  "
                >
                  APGF
                </span>
              </div>

              <p
                className="
                  text-[8px]
                  tracking-[0.18em]
                  text-zinc-800
                "
              >
                GAMING IDENTITY FOR PAKISTAN
              </p>
            </footer>
          </Reveal>
        </div>
      </main>
    </div>
  )
}

// ==================================================
// Helpers
// ==================================================

function formatSocialValue(value: string) {
  try {
    const url = new URL(value)

    return url.hostname
      .replace(/^www\./, "")
      .replace(/^https?:\/\//, "")
  } catch {
    return value
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/$/, "")
  }
}