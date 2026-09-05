"use client"

import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  Gamepad2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import { motion } from "motion/react"

import { GamerCard } from "@/components/profile/gamer-card-shareable"

import { APGFBackground } from "@/components/motion/apgf-background"
import { APGFCursor } from "@/components/motion/apgf-cursor"
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Floating } from "@/components/motion/floating";
import { Stagger } from "@/components/motion/stagger";
import { KineticText } from "@/components/motion/kinetic-text";

type DemoProfile = {
  display_name: string
  username: string
  apgf_id: string
  avatar_url: string | null
  banner_url: string | null
  city: string
  province: string
  games: string[]
  bio: string
  is_verified: boolean
}

const demoProfile: DemoProfile = {
  display_name: "APGF Gamer",
  username: "your_username",
  apgf_id: "APGF-000000",
  avatar_url: null,
  banner_url: null,
  city: "Lahore",
  province: "Punjab",
  games: ["VALORANT", "CS2", "Fortnite"],
  bio: "Your gaming identity starts here.",
  is_verified: true,
}

const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
]

const tickerItems = [
  "APGF",
  "GAMERS",
  "CREATORS",
  "TEAMS",
  "COMMUNITY",
  "PAKISTAN",
  "IDENTITY",
  "DISCOVERY",
]

export  function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--apgf-bg)] text-white selection:bg-emerald-400/20 selection:text-white">
      {/* ============================================================
          GLOBAL APGF MOTION ENVIRONMENT
      ============================================================ */}

      <APGFBackground
        grid
        glow
        noise
        cursorGlow
        intensity="medium"
      />

      <APGFCursor />

      {/* ============================================================
          NAVIGATION
      ============================================================ */}

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between border-b border-white/[0.06]">
            <Link
              href="/"
              className="group flex items-center gap-3"
            >
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
                className="flex h-9 w-9 items-center justify-center border border-emerald-400/30 bg-emerald-400/[0.06] font-black text-emerald-300"
              >
                A
              </motion.div>

              <div className="leading-none">
                <div className="text-sm font-black tracking-[0.18em]">
                  APGF
                </div>

                <div className="mt-1 text-[9px] font-medium tracking-[0.22em] text-white/30">
                  ALL PAKISTAN GAMING FEDERATION
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <NavLink href="#why">Why APGF</NavLink>
              <NavLink href="#identity">Identity</NavLink>
              <NavLink href="/explore">Explore</NavLink>
              <NavLink href="#community">Community</NavLink>
            </nav>

            <div className="flex items-center gap-3">
              <Magnetic>
                <Link
                  href="/sign-in"
                  className="hidden px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:text-white sm:block"
                >
                  Sign in
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="/complete-profile"
                  className="group relative inline-flex items-center gap-2 overflow-hidden border border-emerald-400/30 bg-emerald-400/[0.08] px-4 py-2.5 text-sm font-semibold text-emerald-200 transition-colors hover:border-emerald-300/50 hover:text-white"
                >
                  <span className="absolute inset-0 -translate-x-full bg-emerald-300/[0.08] transition-transform duration-500 group-hover:translate-x-0" />

                  <span className="relative">
                    Claim ID
                  </span>

                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          HERO
      ============================================================ */}

      <section className="relative z-10 min-h-screen">
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* HERO COPY */}

          <div className="relative">
            <Reveal variant="left">
              <div className="mb-7 flex items-center gap-3">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: 42 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  className="h-px bg-emerald-400"
                />

                <span className="text-[10px] font-bold tracking-[0.28em] text-emerald-300/80">
                  THE GAMING IDENTITY LAYER
                </span>
              </div>
            </Reveal>

            <KineticText
              lines={[
                "YOUR GAME.",
                "YOUR IDENTITY.",
                "YOUR COMMUNITY.",
              ]}
              className="
                text-[clamp(3.6rem,8vw,7.5rem)]
                font-black
                leading-[0.88]
                tracking-[-0.065em]
              "
            />

            <Reveal delay={0.35}>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/45 sm:text-lg">
                APGF gives Pakistan&apos;s gamers a place to
                build their identity, discover each other, and
                represent the community beyond the game.
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.2}>
                  <Link
                    href="/complete-profile"
                    className="group inline-flex items-center gap-3 bg-emerald-300 px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:bg-emerald-200"
                  >
                    Claim your APGF ID

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <Link
                    href="/explore"
                    className="group inline-flex items-center gap-3 border border-white/10 bg-white/[0.025] px-6 py-3.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                  >
                    Explore gamers

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 transition-transform duration-300 group-hover:scale-150" />
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            {/* HERO STATS */}

            <Reveal delay={0.55}>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-5">
                <HeroStat
                  icon={<Users />}
                  value="01"
                  label="IDENTITY"
                />

                <HeroStat
                  icon={<Gamepad2 />}
                  value="07"
                  label="REGIONS"
                />

                <HeroStat
                  icon={<ShieldCheck />}
                  value="100%"
                  label="COMMUNITY"
                />
              </div>
            </Reveal>
          </div>

          {/* HERO CARD */}

          <Reveal
            variant="scale"
            delay={0.2}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[570px]">
              {/* ambient rings */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-8 rounded-full border border-emerald-400/[0.05] border-dashed"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 42,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-16 rounded-full border border-white/[0.025] border-dashed"
              />

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.25, 0.4, 0.25],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.08] blur-[100px]"
              />

              {/* floating labels */}

              <Floating
                distance={8}
                duration={5}
                className="absolute -left-3 top-10 z-20 hidden sm:block"
              >
                <FloatingLabel>
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                  VERIFIED IDENTITY
                </FloatingLabel>
              </Floating>

              <Floating
                distance={10}
                duration={6}
                className="absolute -right-2 bottom-20 z-20 hidden sm:block"
              >
                <FloatingLabel>
                  <MapPin className="h-3.5 w-3.5 text-emerald-300" />
                  LAHORE · PAKISTAN
                </FloatingLabel>
              </Floating>

              <Floating
                distance={6}
                duration={4.5}
                className="absolute -right-5 top-20 z-20 hidden lg:block"
              >
                <FloatingLabel>
                  <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                  APGF-000000
                </FloatingLabel>
              </Floating>

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotateX: [0, 1.5, 0],
                  rotateY: [0, -1.5, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <GamerCard profile={demoProfile} />
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* scroll indicator */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="text-[9px] font-semibold tracking-[0.3em] text-white/25">
            SCROLL
          </span>

          <motion.div
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="h-4 w-4 text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================
          MARQUEE
      ============================================================ */}

      <section className="relative z-10 overflow-hidden border-y border-white/[0.06] py-5">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max"
        >
          {[...tickerItems, ...tickerItems].map(
            (item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center"
              >
                <span className="px-7 text-[10px] font-bold tracking-[0.3em] text-white/25">
                  {item}
                </span>

                <span className="h-1 w-1 rounded-full bg-emerald-400/40" />
              </div>
            ),
          )}
        </motion.div>
      </section>

      {/* ============================================================
          WHY APGF
      ============================================================ */}

      <section
        id="why"
        className="relative z-10 px-6 py-28 sm:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionIntro
              eyebrow="WHY APGF"
              title="Gaming needs an identity."
              description="Games give us places to play. APGF gives the people playing them a place to belong."
            />
          </Reveal>

          <Stagger
            speed="normal"
            className="mt-16 grid gap-px overflow-hidden border border-white/[0.07] bg-white/[0.07] md:grid-cols-3"
          >
            <Feature
              number="01"
              icon={<ShieldCheck />}
              title="OWN YOUR ID"
              description="Create a persistent gaming identity that belongs to you — across games, communities and platforms."
            />

            <Feature
              number="02"
              icon={<Users />}
              title="FIND YOUR PEOPLE"
              description="Discover gamers across Pakistan by city, province, games and shared interests."
            />

            <Feature
              number="03"
              icon={<Gamepad2 />}
              title="REPRESENT"
              description="Turn your gaming presence into something visible, recognizable and uniquely yours."
            />
          </Stagger>
        </div>
      </section>

      {/* ============================================================
          IDENTITY
      ============================================================ */}

      <section
        id="identity"
        className="relative z-10 border-y border-white/[0.06] px-6 py-28 sm:py-36"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal variant="left">
            <div>
              <SectionEyebrow>
                YOUR GAMER CARD
              </SectionEyebrow>

              <h2 className="mt-5 max-w-xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">
                Your gaming identity.
                <span className="text-white/25">
                  {" "}
                  Made visible.
                </span>
              </h2>

              <p className="mt-7 max-w-lg text-base leading-7 text-white/40">
                Your APGF Gamer Card brings your profile,
                games, location, identity and community presence
                together in one shareable profile.
              </p>

              <div className="mt-9">
                <Magnetic>
                  <Link
                    href="/complete-profile"
                    className="group inline-flex items-center gap-3 text-sm font-bold text-emerald-300"
                  >
                    Build your Gamer Card

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right">
            <div className="relative">
              <div className="absolute -inset-10 rounded-[3rem] bg-emerald-400/[0.025] blur-3xl" />

              <Floating distance={5} duration={7}>
                <GamerCard profile={demoProfile} />
              </Floating>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          DISCOVER
      ============================================================ */}

      <section
        id="discover"
        className="relative z-10 px-6 py-28 sm:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionIntro
                eyebrow="DISCOVER"
                title="Find gamers across Pakistan."
                description="From Lahore to Gilgit. From competitive players to creators. Discover the people behind Pakistan's gaming scene."
              />

              <Magnetic>
                <Link
                  href="/explore"
                  className="group inline-flex shrink-0 items-center gap-3 text-sm font-bold text-emerald-300"
                >
                  Explore all gamers
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <Stagger
            speed="fast"
            className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {provinces.map((province, index) => (
              <ProvinceCard
                key={province}
                index={String(index + 1).padStart(2, "0")}
                province={province}
              />
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================================================
          COMMUNITY
      ============================================================ */}

      <section
        id="community"
        className="relative z-10 overflow-hidden border-y border-white/[0.06] px-6 py-32 sm:py-40"
      >
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.055] blur-[120px]" />

        <Reveal variant="scale">
          <div className="relative mx-auto max-w-4xl text-center">
            <SectionEyebrow>
              THE COMMUNITY IS ALREADY HERE
            </SectionEyebrow>

            <h2 className="mt-7 text-5xl font-black tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              <span className="text-white">
                One community.
              </span>
              <br />
              <span className="text-white/25">
                One identity.
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-white/40">
              APGF is building the infrastructure for
              Pakistan&apos;s gaming community — one gamer,
              creator and team at a time.
            </p>

            <div className="mt-10">
              <Magnetic strength={0.18}>
                <Link
                  href="/sign-in"
                  className="group inline-flex items-center gap-3 bg-white px-7 py-4 text-sm font-black text-black transition-colors hover:bg-emerald-200"
                >
                  Join APGF

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================================================
          FINAL CTA
      ============================================================ */}

      <section className="relative z-10 px-6 py-28 sm:py-36">
        <Reveal>
          <div className="mx-auto max-w-7xl border border-white/[0.07] bg-white/[0.015] px-7 py-14 sm:px-12 sm:py-20">
            <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
              <div>
                <SectionEyebrow>
                  START HERE
                </SectionEyebrow>

                <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                  Claim your place in
                  <span className="text-emerald-300">
                    {" "}
                    Pakistan&apos;s gaming community.
                  </span>
                </h2>
              </div>

              <Magnetic strength={0.18}>
                <Link
                  href="/complete-profile"
                  className="group inline-flex shrink-0 items-center gap-3 bg-emerald-300 px-7 py-4 text-sm font-black text-black transition-colors hover:bg-emerald-200"
                >
                  CLAIM YOUR ID

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================================================
          FOOTER
      ============================================================ */}

      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="text-sm font-black tracking-[0.18em]">
              APGF
            </div>

            <p className="mt-2 text-xs text-white/25">
              Pakistan&apos;s gaming identity layer.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link
              href="/explore"
              className="transition-colors hover:text-white"
            >
              Explore
            </Link>

            <Link
              href="/sign-in"
              className="transition-colors hover:text-white"
            >
              Sign in
            </Link>

            <Link
              href="/complete-profile"
              className="transition-colors hover:text-emerald-300"
            >
              Claim ID
            </Link>
          </div>

          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} APGF
          </p>
        </div>
      </footer>
    </main>
  )
}

/* ================================================================
   SMALL HOMEPAGE COMPOSITION COMPONENTS
================================================================ */

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="relative text-xs font-semibold text-white/40 transition-colors hover:text-white"
    >
      {children}
    </Link>
  )
}

function SectionEyebrow({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.28em] text-emerald-300/70">
      <span className="h-px w-7 bg-emerald-400/70" />
      {children}
    </div>
  )
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>

      <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
        {title}
      </h2>

      <p className="mt-6 max-w-2xl text-base leading-7 text-white/40">
        {description}
      </p>
    </div>
  )
}

function HeroStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: string
  label: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-emerald-300/70 [&_svg]:h-4 [&_svg]:w-4">
        {icon}
      </div>

      <div>
        <div className="text-xs font-black tracking-wider text-white/70">
          {value}
        </div>

        <div className="text-[8px] font-semibold tracking-[0.2em] text-white/25">
          {label}
        </div>
      </div>
    </div>
  )
}

function FloatingLabel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2 border border-white/10 bg-black/70 px-3 py-2 text-[8px] font-bold tracking-[0.18em] text-white/50 shadow-2xl backdrop-blur-xl">
      {children}
    </div>
  )
}

function Feature({
  number,
  icon,
  title,
  description,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
          },
        },
      }}
      whileHover={{
        backgroundColor: "rgba(255,255,255,0.025)",
      }}
      className="group relative bg-[var(--apgf-surface)] p-8 transition-colors sm:p-10"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center border border-emerald-400/15 bg-emerald-400/[0.04] text-emerald-300/70 transition-colors group-hover:border-emerald-400/30 group-hover:text-emerald-300 [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </div>

        <span className="text-[9px] font-bold tracking-[0.2em] text-white/15">
          {number}
        </span>
      </div>

      <h3 className="mt-12 text-sm font-black tracking-[0.18em]">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-white/35">
        {description}
      </p>

      <div className="mt-8 h-px w-8 bg-emerald-400/30 transition-all duration-500 group-hover:w-16" />
    </motion.div>
  )
}

function ProvinceCard({
  index,
  province,
}: {
  index: string
  province: string
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
          },
        },
      }}
      whileHover={{
        y: -5,
      }}
      className="group relative overflow-hidden border border-white/[0.07] bg-white/[0.015] p-6 transition-colors hover:border-emerald-400/20 hover:bg-emerald-400/[0.025]"
    >
      <div className="flex items-start justify-between">
        <span className="text-[9px] font-bold tracking-[0.2em] text-white/20">
          {index}
        </span>

        <MapPin className="h-4 w-4 text-white/20 transition-colors group-hover:text-emerald-300/70" />
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-bold tracking-tight">
          {province}
        </h3>

        <p className="mt-2 text-[10px] font-semibold tracking-[0.18em] text-white/20">
          EXPLORE GAMERS
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-400 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  )
}