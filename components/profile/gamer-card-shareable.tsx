
"use client"

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react"

import {
  ArrowRight,
  Check,
  Gamepad2,
  Globe2,
  MapPin,
  Rotate3D,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { motion, useReducedMotion } from "motion/react"

import { APGF_EASE, APGF_EASE_SMOOTH } from "@/lib/motion"

type GamerCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any
}

export function GamerCard({ profile }: GamerCardProps) {
  const [flipped, setFlipped] = useState(false)

  const tiltRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const games = Array.isArray(profile.games)
    ? profile.games.filter(Boolean)
    : []

  const location = [profile.city, profile.province]
    .filter(Boolean)
    .join(" • ")

  const displayName =
    profile.display_name || profile.username || "APGF Gamer"

  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word: string) => word.charAt(0))
    .join("")
    .toUpperCase()

  const profileUrl = profile.username
    ? `/u/${profile.username}`
    : null

  /* ==============================================================
     TILT
  ============================================================== */

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return

    const card = tiltRef.current

    if (!card) return

    const rect = card.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * 4
    const rotateX = ((centerY - y) / centerY) * 4

    card.style.setProperty("--rotate-x", `${rotateX}deg`)
    card.style.setProperty("--rotate-y", `${rotateY}deg`)
    card.style.setProperty(
      "--glow-x",
      `${(x / rect.width) * 100}%`,
    )
    card.style.setProperty(
      "--glow-y",
      `${(y / rect.height) * 100}%`,
    )
  }

  const handleMouseLeave = () => {
    const card = tiltRef.current

    if (!card) return

    card.style.setProperty("--rotate-x", "0deg")
    card.style.setProperty("--rotate-y", "0deg")
    card.style.setProperty("--glow-x", "50%")
    card.style.setProperty("--glow-y", "50%")
  }

  /* ==============================================================
     FLIP
  ============================================================== */

  const toggleFlip = () => {
    setFlipped((value) => !value)

    const card = tiltRef.current

    if (!card) return

    card.style.setProperty("--rotate-x", "0deg")
    card.style.setProperty("--rotate-y", "0deg")
    card.style.setProperty("--glow-x", "50%")
    card.style.setProperty("--glow-y", "50%")
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      toggleFlip()
    }
  }

  return (
    <div className="mx-auto w-full max-w-[680px]">
      {/* ==========================================================
          PERSPECTIVE
      ========================================================== */}

      <div
        className="relative w-full"
        style={{
          perspective: "1800px",
        }}
      >
        {/* ========================================================
            TILT LAYER

            This layer handles ONLY mouse tilt.

            The actual flip happens on the inner motion.div.
        ======================================================== */}

        <div
          ref={tiltRef}
          className="
            relative aspect-[1.58/1] w-full
            outline-none
            will-change-transform
            focus-visible:ring-2
            focus-visible:ring-emerald-400/70
            focus-visible:ring-offset-4
            focus-visible:ring-offset-zinc-950
          "
          role="button"
          tabIndex={0}
          aria-label={
            flipped
              ? "APGF Gamer Card back. Press Enter to flip."
              : "APGF Gamer Card front. Press Enter to flip."
          }
          onClick={toggleFlip}
          onKeyDown={handleKeyDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={
            {
              "--rotate-x": "0deg",
              "--rotate-y": "0deg",
              "--glow-x": "50%",
              "--glow-y": "50%",
              transform:
                "rotateX(var(--rotate-x)) rotateY(var(--rotate-y))",
              transition: reducedMotion
                ? "none"
                : `transform 300ms ${APGF_EASE}`,
              transformStyle: "preserve-3d",
            } as CSSProperties
          }
        >
          {/* ======================================================
              FLIP LAYER

              ONE physical object rotates from 0 → 180.

              This is the important part that makes the flip smooth.
          ====================================================== */}

          <motion.div
            animate={{
              rotateY: flipped ? 180 : 0,
            }}
            transition={
              reducedMotion
                ? {
                    duration: 0,
                  }
                : {
                    duration: 0.85,
                    ease: APGF_EASE_SMOOTH,
                  }
            }
            className="
              absolute inset-0
              [transform-style:preserve-3d]
              will-change-transform
            "
          >
            <GamerCardFront
              profile={profile}
              games={games}
              location={location}
              displayName={displayName}
              initials={initials}
              flipped={flipped}
            />

            <GamerCardBack
              profile={profile}
              games={games}
              location={location}
              displayName={displayName}
              profileUrl={profileUrl}
              flipped={flipped}
              onFlip={toggleFlip}
            />
          </motion.div>
        </div>
      </div>

      {/* ==========================================================
          HELPER
      ========================================================== */}

      <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-medium tracking-wide text-zinc-600">
        <Rotate3D className="h-3.5 w-3.5" />

        <span>
          {flipped
            ? "Click the card to return"
            : "Click the card to reveal the back"}
        </span>

        <ArrowRight className="h-3 w-3" />
      </div>
    </div>
  )
}

/* =================================================================
   FRONT
================================================================= */

type FrontProps = {
  profile: any
  games: string[]
  location: string
  displayName: string
  initials: string
  flipped: boolean
}

function GamerCardFront({
  profile,
  games,
  location,
  displayName,
  initials,
  flipped,
}: FrontProps) {
  return (
    <div
      className={`
        absolute inset-0 overflow-hidden rounded-[28px]
        border border-white/[0.12]
        bg-[#09090B]
        shadow-[0_35px_100px_rgba(0,0,0,0.55)]
        [backface-visibility:hidden]
        [transform:rotateY(0deg)]
        [transform-style:preserve-3d]
        ${flipped ? "pointer-events-none" : ""}
      `}
    >
      {/* ==========================================================
          BANNER
      ========================================================== */}

      <div className="absolute inset-x-0 top-0 h-[54%] overflow-hidden">
        {profile.banner_url ? (
          <img
            src={profile.banner_url}
            alt=""
            className="
              h-full w-full object-cover
              scale-[1.02]
              transition-transform duration-700
            "
          />
        ) : (
          <div className="relative h-full w-full overflow-hidden bg-zinc-950">
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.45),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(34,197,94,0.22),transparent_30%),linear-gradient(135deg,#064e3b_0%,#09090b_65%)]
              "
            />

            <div
              className="
                absolute -right-16 -top-20 h-64 w-64
                rounded-full border border-emerald-400/10
              "
            />

            <div
              className="
                absolute -right-6 -top-10 h-48 w-48
                rounded-full border border-emerald-400/[0.07]
              "
            />

            <div
              className="
                absolute bottom-0 left-0 h-px w-full
                bg-gradient-to-r
                from-transparent via-emerald-400/40 to-transparent
              "
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#09090B]" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/25" />
      </div>

      {/* ==========================================================
          CURSOR LIGHT
      ========================================================== */}

      <div
        className="
          pointer-events-none absolute inset-0 z-10
        "
        style={{
          background:
            "radial-gradient(circle 180px at var(--glow-x) var(--glow-y), rgba(52,211,153,0.12), transparent 70%)",
        }}
      />

      {/* ==========================================================
          TOP IDENTITY
      ========================================================== */}

      <div className="absolute left-6 right-6 top-5 z-20 flex items-center justify-between sm:left-7 sm:right-7 sm:top-6">
        <div className="flex items-center gap-2.5">
          <motion.div
            whileHover={{
              rotate: -8,
              scale: 1.08,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl border border-white/15
              bg-black/30 text-sm font-black text-white
              shadow-lg backdrop-blur-xl
            "
          >
            A
          </motion.div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.28em] text-white">
              APGF
            </p>

            <p className="mt-0.5 text-[7px] font-medium tracking-[0.18em] text-white/45">
              GAMER IDENTITY
            </p>
          </div>
        </div>

        {profile.apgf_id && (
          <div
            className="
              rounded-full border border-emerald-400/25
              bg-black/35 px-3 py-1.5
              font-mono text-[9px] font-medium
              tracking-[0.08em] text-emerald-300
              shadow-lg backdrop-blur-xl
            "
          >
            {profile.apgf_id}
          </div>
        )}
      </div>

      {/* ==========================================================
          AVATAR
      ========================================================== */}

      <div
        className="
          absolute left-6 top-[35%] z-30
          sm:left-8
        "
      >
        <div
          className="
            relative rounded-full
            bg-[#09090B]
            p-1
            shadow-[0_15px_45px_rgba(0,0,0,0.65)]
          "
        >
          <div
            className="
              pointer-events-none absolute -inset-2
              rounded-full bg-emerald-400/10
              blur-xl
            "
          />

          <div
            className="
              relative rounded-full
              border border-white/[0.12]
              bg-zinc-950 p-1
            "
          >
            <div className="overflow-hidden rounded-full">
              <div className="flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-xl font-bold text-white sm:text-2xl">
                    {initials || (
                      <UserRound className="h-7 w-7 text-zinc-400" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================
          MAIN IDENTITY
      ========================================================== */}

      <div className="absolute bottom-[19%] left-6 right-6 z-20 sm:left-8 sm:right-8">
        <div className="flex flex-col items-start">
          <div className="flex max-w-full items-center gap-2">
            <h2 className="truncate text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">
              {displayName}
            </h2>

            {profile.is_verified && (
              <div
                className="
                  flex h-5 w-5 shrink-0 items-center justify-center
                  rounded-full border border-emerald-400/30
                  bg-emerald-400/10
                "
                title="Verified APGF profile"
              >
                <ShieldCheck className="h-3 w-3 text-emerald-300" />
              </div>
            )}
          </div>

          {profile.username && (
            <p className="mt-1 text-xs font-medium tracking-wide text-zinc-500">
              @{profile.username}
            </p>
          )}
        </div>
      </div>

      {/* ==========================================================
          METADATA
      ========================================================== */}

      <div className="absolute bottom-5 left-6 right-6 z-20 flex items-end justify-between gap-4 sm:bottom-6 sm:left-8 sm:right-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {location && (
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 sm:text-[11px]">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />

                <span>{location}</span>
              </div>
            )}

            {games.length > 0 && (
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 sm:text-[11px]">
                <Gamepad2 className="h-3.5 w-3.5 text-emerald-400" />

                <span>
                  {games.slice(0, 2).join(" • ")}

                  {games.length > 2
                    ? ` +${games.length - 2}`
                    : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          className="
            flex shrink-0 items-center gap-1.5
            rounded-full border border-white/[0.08]
            bg-white/[0.04] px-2.5 py-1.5
            text-[8px] font-medium tracking-wide text-zinc-500
            backdrop-blur-md
          "
        >
          <Rotate3D className="h-3 w-3" />

          FLIP
        </div>
      </div>

      {/* ==========================================================
          BOTTOM LIGHT
      ========================================================== */}

      <div
        className="
          absolute bottom-0 left-0 right-0 h-px
          bg-gradient-to-r
          from-transparent via-emerald-400/30 to-transparent
        "
      />
    </div>
  )
}

/* =================================================================
   BACK
================================================================= */

type BackProps = {
  profile: any
  games: string[]
  location: string
  displayName: string
  profileUrl: string | null
  flipped: boolean
  onFlip: () => void
}

function GamerCardBack({
  profile,
  games,
  location,
  displayName,
  profileUrl,
  flipped,
  onFlip,
}: BackProps) {
  return (
    <div
      className={`
        absolute inset-0 overflow-hidden rounded-[28px]
        border border-emerald-400/[0.14]
        bg-[#080A09]
        shadow-[0_35px_100px_rgba(0,0,0,0.55)]
        [backface-visibility:hidden]
        [transform:rotateY(180deg)]
        [transform-style:preserve-3d]
        ${flipped ? "" : "pointer-events-none"}
      `}
    >
      {/* ==========================================================
          AMBIENT GLOW
      ========================================================== */}

      <div
        className="
          pointer-events-none absolute -left-20 -top-20
          h-72 w-72 rounded-full
          bg-emerald-500/[0.08] blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute -bottom-32 -right-20
          h-80 w-80 rounded-full
          bg-emerald-400/[0.05] blur-3xl
        "
      />

      {/* ==========================================================
          GRID
      ========================================================== */}

      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
          [background-size:32px_32px]
        "
      />

      {/* ==========================================================
          HEADER
      ========================================================== */}

      <div className="absolute left-6 right-6 top-5 z-20 flex items-center justify-between sm:left-8 sm:right-8 sm:top-6">
        <div>
          <p className="text-[11px] font-black tracking-[0.28em] text-white">
            APGF
          </p>

          <p className="mt-1 text-[7px] font-medium tracking-[0.22em] text-zinc-600">
            ALL PAKISTAN GAMING FEDERATION
          </p>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onFlip()
          }}
          aria-label="Flip Gamer Card"
          className="
            flex h-8 w-8 items-center justify-center
            rounded-lg border border-emerald-400/20
            bg-emerald-400/[0.06]
            transition-colors
            hover:border-emerald-400/40
            hover:bg-emerald-400/[0.1]
          "
        >
          <Rotate3D className="h-4 w-4 text-emerald-400" />
        </button>
      </div>

      {/* ==========================================================
          MAIN BACK CONTENT
      ========================================================== */}

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pt-3">
        <div className="grid w-full max-w-[530px] grid-cols-[1fr_auto] items-center gap-6 sm:gap-10">
          {/* PROFILE */}

          <div className="min-w-0">
            <p className="text-[8px] font-bold tracking-[0.25em] text-emerald-300/60">
              APGF GAMER PROFILE
            </p>

            <h3 className="mt-3 truncate text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
              {displayName}
            </h3>

            {profile.username && (
              <p className="mt-1 text-xs text-zinc-600">
                @{profile.username}
              </p>
            )}

            <div className="mt-5 space-y-2.5">
              {profile.apgf_id && (
                <BackMeta
                  icon={<ShieldCheck />}
                  label="IDENTITY"
                  value={profile.apgf_id}
                />
              )}

              {location && (
                <BackMeta
                  icon={<MapPin />}
                  label="LOCATION"
                  value={location}
                />
              )}

              {games.length > 0 && (
                <BackMeta
                  icon={<Gamepad2 />}
                  label="GAMES"
                  value={`${games.length} ${
                    games.length === 1 ? "GAME" : "GAMES"
                  }`}
                />
              )}
            </div>

            {profile.is_verified && (
              <div className="mt-5 inline-flex items-center gap-2 border border-emerald-400/15 bg-emerald-400/[0.04] px-2.5 py-1.5">
                <Check className="h-3 w-3 text-emerald-300" />

                <span className="text-[8px] font-bold tracking-[0.18em] text-emerald-300/80">
                  VERIFIED APGF IDENTITY
                </span>
              </div>
            )}
          </div>

          {/* QR */}

          <div className="shrink-0">
            <div
              className="
                rounded-2xl border border-white/[0.08]
                bg-white/[0.035] p-2.5
                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                backdrop-blur-xl
                sm:p-3
              "
            >
              <FakeQRCode />
            </div>

            <p className="mt-2 text-center text-[7px] font-bold tracking-[0.18em] text-zinc-600">
              SCAN PROFILE
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================================
          PROFILE URL
      ========================================================== */}

      <div className="absolute bottom-[5.5rem] left-6 right-6 sm:left-8 sm:right-8">
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
          <div className="flex min-w-0 items-center gap-2">
            <Globe2 className="h-3 w-3 shrink-0 text-emerald-400/60" />

            <span className="truncate text-[8px] tracking-wide text-zinc-600">
              {profileUrl || "APGF"}
            </span>
          </div>

          <span className="text-[7px] font-bold tracking-[0.18em] text-zinc-700">
            IDENTITY LAYER
          </span>
        </div>
      </div>

      {/* ==========================================================
          GAMES
      ========================================================== */}

      <div className="absolute bottom-5 left-6 right-6 z-20 sm:bottom-6 sm:left-8 sm:right-8">
        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {games.slice(0, 3).map((game) => (
              <div
                key={game}
                className="
                  flex items-center gap-1.5
                  border border-white/[0.07]
                  bg-white/[0.025]
                  px-2 py-1.5
                  text-[8px] font-semibold
                  tracking-wide text-zinc-500
                "
              >
                <Gamepad2 className="h-3 w-3 text-emerald-400/70" />

                {game}
              </div>
            ))}

            {games.length > 3 && (
              <span className="text-[8px] font-medium text-zinc-700">
                +{games.length - 3}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 text-[8px] font-medium tracking-[0.12em] text-zinc-600">
            <span>PAKISTAN</span>

            <span className="text-emerald-500/70">
              🇵🇰
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================================
          EDGE
      ========================================================== */}

      <div
        className="
          absolute bottom-0 left-0 right-0 h-px
          bg-gradient-to-r
          from-transparent via-emerald-400/30 to-transparent
        "
      />
    </div>
  )
}

/* =================================================================
   BACK META
================================================================= */

function BackMeta({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
          flex h-7 w-7 shrink-0 items-center justify-center
          border border-white/[0.07]
          bg-white/[0.025]
          text-emerald-400/70
          [&_svg]:h-3.5
          [&_svg]:w-3.5
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[7px] font-bold tracking-[0.18em] text-zinc-700">
          {label}
        </p>

        <p className="truncate text-[9px] font-medium text-zinc-400">
          {value}
        </p>
      </div>
    </div>
  )
}

/* =================================================================
   QR PLACEHOLDER
================================================================= */

function FakeQRCode() {
  const pattern = [
    "111111100101111",
    "100000101101001",
    "101110101011101",
    "101110100100101",
    "101110101111101",
    "100000101000001",
    "111111101010101",
    "000000001101100",
    "110101111001011",
    "001110010111100",
    "101011101001101",
    "100100011110010",
    "111111101011101",
    "100000101100001",
    "111111101011111",
  ]

  return (
    <div className="grid h-24 w-24 grid-cols-15 gap-[2px] rounded-lg bg-white p-2 sm:h-28 sm:w-28">
      {pattern.flatMap((row, rowIndex) =>
        row.split("").map((cell, columnIndex) => (
          <span
            key={`${rowIndex}-${columnIndex}`}
            className={
              cell === "1"
                ? "bg-zinc-950"
                : "bg-white"
            }
          />
        )),
      )}
    </div>
  )
}

