"use client"

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from "react"

import {
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
  MapPin,
  Sparkles,
} from "lucide-react"

import { motion, useReducedMotion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { GamerCard } from "@/components/dashboard/gamer-card"

import { APGFBackground } from "@/components/motion/apgf-background"
import { Reveal } from "@/components/motion/reveal"
import { Stagger } from "@/components/motion/stagger"
import { Magnetic } from "@/components/motion/magnetic"

import { getExploreProfiles } from "./actions"
import { supabase } from "@/lib/supabase/client"

// ==================================================
// Provinces
// ==================================================

const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
]

// ==================================================
// Cities
// ==================================================

const citiesByProvince: Record<string, string[]> = {
  Punjab: [
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Multan",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Sheikhupura",
    "Jhelum",
    "Gujrat",
    "Rahim Yar Khan",
    "Sahiwal",
    "Okara",
    "Dera Ghazi Khan",
    "Wah Cantonment",
    "Kasur",
    "Mianwali",
    "Attock",
    "Chakwal",
  ],

  Sindh: [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Nawabshah",
    "Mirpur Khas",
    "Jacobabad",
    "Shikarpur",
    "Thatta",
    "Khairpur",
  ],

  "Khyber Pakhtunkhwa": [
    "Peshawar",
    "Mardan",
    "Abbottabad",
    "Mingora",
    "Kohat",
    "Dera Ismail Khan",
    "Bannu",
    "Swat",
    "Nowshera",
    "Charsadda",
    "Mansehra",
    "Haripur",
  ],

  Balochistan: [
    "Quetta",
    "Gwadar",
    "Turbat",
    "Khuzdar",
    "Chaman",
    "Sibi",
    "Zhob",
    "Loralai",
    "Hub",
  ],

  "Islamabad Capital Territory": [
    "Islamabad",
  ],

  "Gilgit-Baltistan": [
    "Gilgit",
    "Skardu",
    "Chilas",
    "Hunza",
    "Ghizer",
    "Astore",
  ],

  "Azad Jammu & Kashmir": [
    "Muzaffarabad",
    "Mirpur",
    "Rawalakot",
    "Kotli",
    "Bagh",
    "Bhimber",
  ],
}

const PAGE_SIZE = 12
const SEARCH_DEBOUNCE_MS = 500

// ==================================================
// Profile Type
// ==================================================

type Profile = {
  id: string
  apgf_id: string
  username: string
  display_name: string
  avatar_url: string | null
  banner_url: string | null
  bio: string | null
  province: string | null
  city: string | null
  games: string[] | null
  main_game: string | null
  social_links: Record<string, string> | null
  is_public: boolean
  is_verified: boolean
  created_at: string
}

// ==================================================
// Page
// ==================================================

export default function ExplorePage() {
  const reducedMotion = useReducedMotion()

  const [profiles, setProfiles] = useState<Profile[]>([])

  // ==================================================
  // Search
  // ==================================================

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // ==================================================
  // Location Filters
  // ==================================================

  const [province, setProvince] = useState("")
  const [city, setCity] = useState("")

  const [locationLoaded, setLocationLoaded] =
    useState(false)

  // ==================================================
  // Pagination
  // ==================================================

  const [page, setPage] = useState(1)

  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  // ==================================================
  // Loading / Error
  // ==================================================

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // ==================================================
  // Cities
  // ==================================================

  const cities = province
    ? citiesByProvince[province] ?? []
    : []

  // ==================================================
  // Load Logged-in User's Default Location
  // ==================================================

  useEffect(() => {
    const loadUserLocation = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLocationLoaded(true)
          return
        }

        const { data, error: profileError } =
          await supabase
            .from("profiles")
            .select("province, city")
            .eq("id", user.id)
            .single()

        if (profileError) {
          console.error(
            "Failed to load user profile location:",
            profileError
          )

          setLocationLoaded(true)
          return
        }

        if (data) {
          setProvince(data.province || "")
          setCity(data.city || "")
        }

        setLocationLoaded(true)
      } catch (error) {
        console.error(
          "Failed to load default location:",
          error
        )

        setLocationLoaded(true)
      }
    }

    loadUserLocation()
  }, [])

  // ==================================================
  // Search Debounce
  // ==================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [search])

  // ==================================================
  // Fetch Profiles
  // ==================================================

  const fetchProfiles = useCallback(async () => {
    if (!locationLoaded) {
      return
    }

    try {
      setLoading(true)
      setError("")

      const result = await getExploreProfiles({
        page,
        search: debouncedSearch,
        province,
        city,
      })

      if (!result.success) {
        setProfiles([])
        setTotal(0)
        setTotalPages(0)

        setError(
          result.error ?? "Unable to load profiles."
        )

        return
      }

      setProfiles(result.profiles as Profile[])
      setTotal(result.total)
      setTotalPages(result.totalPages)
    } catch (error) {
      console.error(
        "Explore fetch failed:",
        error
      )

      setProfiles([])
      setTotal(0)
      setTotalPages(0)

      setError(
        "Something went wrong while loading profiles."
      )
    } finally {
      setLoading(false)
    }
  }, [
    locationLoaded,
    page,
    debouncedSearch,
    province,
    city,
  ])

  // ==================================================
  // Run Fetch
  // ==================================================

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  // ==================================================
  // Search
  // ==================================================

  function handleSearchChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setSearch(event.target.value)
  }

  // ==================================================
  // Province
  // ==================================================

  function handleProvinceChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    const value = event.target.value

    setProvince(value)
    setCity("")
    setPage(1)
  }

  // ==================================================
  // City
  // ==================================================

  function handleCityChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setCity(event.target.value)
    setPage(1)
  }

  // ==================================================
  // Pagination
  // ==================================================

  function previousPage() {
    if (page > 1) {
      setPage((current) => current - 1)
    }
  }

  function nextPage() {
    if (page < totalPages) {
      setPage((current) => current + 1)
    }
  }

  // ==================================================
  // Render
  // ==================================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050706] text-white">
      {/* ==================================================
          APGF Ambient System
      ================================================== */}

      <APGFBackground
        grid
        glow
        noise
        cursorGlow
        intensity="medium"
      />

      {/* ==================================================
          Content Layer
      ================================================== */}

      <div className="relative z-10">
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-10
            sm:px-6
            sm:py-14
            lg:px-8
            lg:py-16
          "
        >
          {/* ==================================================
              Header
          ================================================== */}

          <section className="mb-10 sm:mb-14">
            <Reveal variant="blur">
              <Badge
                className="
                  mb-5
                  rounded-full
                  border
                  border-emerald-400/20
                  bg-emerald-400/[0.06]
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  tracking-[0.16em]
                  text-emerald-300
                  shadow-[0_0_30px_rgba(52,211,153,0.05)]
                "
              >
                <Users className="mr-1.5 h-3.5 w-3.5" />

                APGF COMMUNITY
              </Badge>
            </Reveal>

            <div className="max-w-5xl">
              <motion.div
                initial={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 55,
                        filter: "blur(16px)",
                      }
                }
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }
                }
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.08,
                }}
              >
                <h1
                  className="
                    text-[clamp(3.2rem,9vw,7.8rem)]
                    font-black
                    leading-[0.86]
                    tracking-[-0.065em]
                    text-white
                  "
                >
                  EXPLORE
                  <br />
                  <span className="text-white/45">
                    GAMERS.
                  </span>
                </h1>
              </motion.div>

              <Reveal
                variant="up"
                delay={0.12}
                className="mt-7"
              >
                <p
                  className="
                    max-w-2xl
                    text-sm
                    leading-7
                    text-zinc-400
                    sm:text-base
                  "
                >
                  Discover gamers across Pakistan,
                  find players with similar interests,
                  and explore their APGF Gamer Cards.
                </p>
              </Reveal>
            </div>

            {/* ==================================================
                Directory Status
            ================================================== */}

            <Reveal
              variant="up"
              delay={0.2}
              className="mt-8"
            >
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-x-5
                  gap-y-2
                  text-[9px]
                  font-bold
                  tracking-[0.2em]
                  text-zinc-600
                "
              >
                <span className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_12px_rgba(52,211,153,0.7)]
                    "
                  />

                  GAMER INDEX
                </span>

                <span className="h-3 w-px bg-white/[0.08]" />

                <span>PAKISTAN</span>

                <span className="h-3 w-px bg-white/[0.08]" />

                <span>
                  {loading
                    ? "INDEXING..."
                    : `${total} GAMER${
                        total === 1 ? "" : "S"
                      } FOUND`}
                </span>
              </div>
            </Reveal>
          </section>

          {/* ==================================================
              Filters
          ================================================== */}

          <Reveal
            variant="up"
            delay={0.1}
            className="mb-10"
          >
            <section
              className="
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-3
                shadow-[0_25px_80px_rgba(0,0,0,0.3)]
                backdrop-blur-2xl
                sm:p-4
              "
            >
              {/* Ambient filter glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -left-20
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-emerald-400/[0.045]
                  blur-3xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-32
                  right-0
                  h-64
                  w-64
                  rounded-full
                  bg-emerald-500/[0.025]
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  flex
                  flex-col
                  gap-3
                  lg:flex-row
                "
              >
                {/* Search */}

                <Magnetic
                  strength={0.03}
                  className="flex-1"
                >
                  <div className="relative">
                    <Search
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-zinc-600
                        transition-colors
                      "
                    />

                    <Input
                      value={search}
                      onChange={handleSearchChange}
                      placeholder="Search username, name, or APGF ID..."
                      className="
                        h-12
                        rounded-xl
                        border-white/[0.08]
                        bg-black/40
                        pl-11
                        text-sm
                        text-white
                        shadow-none
                        transition-all
                        duration-300
                        placeholder:text-zinc-600
                        hover:border-white/[0.12]
                        focus:border-emerald-400/40
                        focus:bg-black/55
                        focus:ring-1
                        focus:ring-emerald-400/10
                      "
                    />

                    {search && (
                      <motion.div
                        initial={
                          reducedMotion
                            ? undefined
                            : {
                                opacity: 0,
                                scale: 0.8,
                              }
                        }
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          rounded-full
                          border
                          border-emerald-400/10
                          bg-emerald-400/[0.06]
                          px-2
                          py-1
                          text-[8px]
                          font-bold
                          tracking-[0.12em]
                          text-emerald-300/70
                        "
                      >
                        SEARCH
                      </motion.div>
                    )}
                  </div>
                </Magnetic>

                {/* Province */}

                <Magnetic strength={0.025}>
                  <select
                    value={province}
                    onChange={handleProvinceChange}
                    disabled={!locationLoaded}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-black/40
                      px-4
                      text-sm
                      text-white
                      outline-none
                      transition-all
                      duration-300
                      hover:border-white/[0.12]
                      focus:border-emerald-400/40
                      disabled:cursor-wait
                      disabled:opacity-50
                      lg:w-72
                    "
                  >
                    <option value="">
                      All Provinces
                    </option>

                    {provinces.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </Magnetic>

                {/* City */}

                <Magnetic strength={0.025}>
                  <select
                    value={city}
                    onChange={handleCityChange}
                    disabled={
                      !locationLoaded ||
                      !province
                    }
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-black/40
                      px-4
                      text-sm
                      text-white
                      outline-none
                      transition-all
                      duration-300
                      hover:border-white/[0.12]
                      focus:border-emerald-400/40
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                      lg:w-64
                    "
                  >
                    <option value="">
                      {province
                        ? "All Cities"
                        : "Choose Province First"}
                    </option>

                    {cities.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </Magnetic>
              </div>

              {/* Filter Footer */}

              <div
                className="
                  relative
                  mt-3
                  flex
                  flex-col
                  gap-2
                  border-t
                  border-white/[0.05]
                  px-1
                  pt-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div className="flex items-center gap-2 text-[9px] font-medium tracking-[0.12em] text-zinc-600">
                  <MapPin className="h-3 w-3 text-emerald-400/50" />

                  {locationLoaded
                    ? province
                      ? city
                        ? `${city} • ${province}`
                        : province
                      : "ALL OF PAKISTAN"
                    : "LOADING LOCATION..."}
                </div>

                <div className="text-[9px] font-medium tracking-[0.12em] text-zinc-600">
                  {loading
                    ? "UPDATING INDEX..."
                    : `${total} RESULT${
                        total === 1 ? "" : "S"
                      }`}
                </div>
              </div>
            </section>
          </Reveal>

          {/* ==================================================
              Error
          ================================================== */}

          {error && (
            <Reveal
              variant="down"
              className="mb-8"
            >
              <div
                className="
                  rounded-2xl
                  border
                  border-red-500/20
                  bg-red-500/[0.06]
                  p-5
                  text-sm
                  text-red-400
                  shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                "
              >
                {error}
              </div>
            </Reveal>
          )}

          {/* ==================================================
              Loading
          ================================================== */}

          {loading && (
            <motion.div
              initial={
                reducedMotion
                  ? undefined
                  : { opacity: 0 }
              }
              animate={{ opacity: 1 }}
              className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {Array.from({
                length: PAGE_SIZE,
              }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: reducedMotion
                      ? 0
                      : index * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    relative
                    aspect-[1.58/1]
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                  "
                >
                  <motion.div
                    animate={
                      reducedMotion
                        ? undefined
                        : {
                            x: [
                              "-100%",
                              "150%",
                            ],
                          }
                    }
                    transition={
                      reducedMotion
                        ? undefined
                        : {
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.08,
                          }
                    }
                    className="
                      absolute
                      inset-y-0
                      w-1/2
                      skew-x-[-18deg]
                      bg-gradient-to-r
                      from-transparent
                      via-white/[0.035]
                      to-transparent
                    "
                  />

                  <div className="absolute inset-x-6 top-6 h-8 w-24 rounded-lg bg-white/[0.04]" />

                  <div className="absolute bottom-7 left-6 right-6">
                    <div className="h-6 w-2/3 rounded-md bg-white/[0.05]" />

                    <div className="mt-2 h-3 w-1/3 rounded-md bg-white/[0.035]" />

                    <div className="mt-5 flex gap-3">
                      <div className="h-3 w-20 rounded-full bg-white/[0.035]" />
                      <div className="h-3 w-24 rounded-full bg-white/[0.035]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ==================================================
              Empty
          ================================================== */}

          {!loading &&
            !error &&
            profiles.length === 0 && (
              <Reveal variant="scale">
                <div
                  className="
                    relative
                    flex
                    min-h-[420px]
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/[0.07]
                    bg-white/[0.02]
                    px-6
                    text-center
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      h-72
                      w-72
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-emerald-400/[0.035]
                      blur-3xl
                    "
                  />

                  <motion.div
                    animate={
                      reducedMotion
                        ? undefined
                        : {
                            rotate: [0, 4, -4, 0],
                            scale: [
                              1,
                              1.04,
                              1,
                            ],
                          }
                    }
                    transition={
                      reducedMotion
                        ? undefined
                        : {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="
                      relative
                      mb-6
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-emerald-400/10
                      bg-emerald-400/[0.04]
                      shadow-[0_0_50px_rgba(52,211,153,0.06)]
                    "
                  >
                    <Users className="h-7 w-7 text-emerald-400/60" />
                  </motion.div>

                  <h2 className="relative text-xl font-bold tracking-tight text-white">
                    No gamers found
                  </h2>

                  <p className="relative mt-2 max-w-md text-sm leading-6 text-zinc-500">
                    Try changing your search,
                    province, or city.
                  </p>

                  {(search ||
                    province ||
                    city) && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSearch("")
                        setDebouncedSearch("")
                        setProvince("")
                        setCity("")
                        setPage(1)
                      }}
                      className="
                        relative
                        mt-6
                        rounded-xl
                        border-white/[0.08]
                        bg-white/[0.03]
                        text-zinc-300
                        hover:bg-white/[0.06]
                        hover:text-white
                      "
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              </Reveal>
            )}

          {/* ==================================================
              Gamer Grid
          ================================================== */}

          {!loading &&
            !error &&
            profiles.length > 0 && (
              <Stagger
                speed="fast"
                className="
                  grid
                  gap-6
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {profiles.map((profile) => (
                  <motion.a
                    key={profile.id}
                    href={`/u/${profile.username}`}
                    whileHover={
                      reducedMotion
                        ? undefined
                        : {
                            y: -5,
                          }
                    }
                    whileTap={
                      reducedMotion
                        ? undefined
                        : {
                            scale: 0.985,
                          }
                    }
                    transition={{
                      duration: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      group
                      block
                      h-full
                      rounded-[28px]
                      outline-none
                      focus-visible:ring-2
                      focus-visible:ring-emerald-400/70
                      focus-visible:ring-offset-4
                      focus-visible:ring-offset-[#050706]
                    "
                  >
                    <div
                      className="
                        relative
                        h-full
                        rounded-[30px]
                        transition-shadow
                        duration-500
                        group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)]
                      "
                    >
                      <div
                        className="
                          pointer-events-none
                          absolute
                          -inset-px
                          rounded-[29px]
                          bg-emerald-400/0
                          opacity-0
                          blur-xl
                          transition-all
                          duration-500
                          group-hover:bg-emerald-400/[0.035]
                          group-hover:opacity-100
                        "
                      />

                      <div className="relative">
                        <GamerCard
                          profile={profile}
                          variant="explore"
                        />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </Stagger>
            )}

          {/* ==================================================
              Pagination
          ================================================== */}

          {!loading && totalPages > 1 && (
            <Reveal
              variant="up"
              delay={0.05}
              className="mt-12"
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-between
                  gap-5
                  border-t
                  border-white/[0.06]
                  pt-6
                  sm:flex-row
                "
              >
                <div>
                  <p className="text-[9px] font-bold tracking-[0.18em] text-zinc-600">
                    GAMER INDEX
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Page{" "}
                    <span className="font-semibold text-zinc-300">
                      {page}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-zinc-300">
                      {totalPages}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Magnetic strength={0.08}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={previousPage}
                      disabled={
                        page === 1 ||
                        loading
                      }
                      className="
                        h-10
                        rounded-xl
                        border-white/[0.08]
                        bg-white/[0.025]
                        px-4
                        text-zinc-400
                        transition-all
                        hover:border-white/[0.12]
                        hover:bg-white/[0.05]
                        hover:text-white
                        disabled:opacity-30
                      "
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />

                      Previous
                    </Button>
                  </Magnetic>

                  <Magnetic strength={0.08}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={nextPage}
                      disabled={
                        page === totalPages ||
                        loading
                      }
                      className="
                        h-10
                        rounded-xl
                        border-emerald-400/15
                        bg-emerald-400/[0.04]
                        px-4
                        text-emerald-300
                        transition-all
                        hover:border-emerald-400/30
                        hover:bg-emerald-400/[0.08]
                        hover:text-emerald-200
                        disabled:opacity-30
                      "
                    >
                      Next

                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </Reveal>
          )}

          {/* ==================================================
              Results Footer
          ================================================== */}

          {!loading &&
            profiles.length > 0 && (
              <Reveal
                variant="up"
                delay={0.1}
                className="mt-8"
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                    text-center
                    sm:flex-row
                    sm:gap-3
                  "
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400/40" />

                  <p className="text-[9px] font-medium tracking-[0.16em] text-zinc-700">
                    SHOWING{" "}
                    {Math.min(
                      (page - 1) *
                        PAGE_SIZE +
                        1,
                      total
                    )}{" "}
                    –{" "}
                    {Math.min(
                      page * PAGE_SIZE,
                      total
                    )}{" "}
                    OF {total} GAMERS
                  </p>
                </div>
              </Reveal>
            )}
        </div>
      </div>
    </main>
  )
}