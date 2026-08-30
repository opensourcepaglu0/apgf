"use client"

import { useCallback, useEffect, useState } from "react"

import {
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { GamerCard } from "@/components/profile/gamer-card"

import { getExploreProfiles } from "./actions"

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
  const [profiles, setProfiles] = useState<Profile[]>([])

  // What the user is currently typing
  const [search, setSearch] = useState("")

  // Debounced search value actually used for the database query
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [province, setProvince] = useState("")
  const [city, setCity] = useState("")

  const [page, setPage] = useState(1)

  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // ==================================================
  // Cities for selected province
  // ==================================================

  const cities = province
    ? citiesByProvince[province] ?? []
    : []

  // ==================================================
  // Search Debounce
  // ==================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
    }
  }, [search])

  // ==================================================
  // Fetch Profiles
  // ==================================================

  const fetchProfiles = useCallback(async () => {
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
    page,
    debouncedSearch,
    province,
    city,
  ])

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  // ==================================================
  // Search
  // ==================================================

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setSearch(event.target.value)
  }

  // ==================================================
  // Province
  // ==================================================

  function handleProvinceChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const value = event.target.value

    setProvince(value)

    // Province changed, so old city is no longer valid.
    setCity("")

    setPage(1)
  }

  // ==================================================
  // City
  // ==================================================

  function handleCityChange(
    event: React.ChangeEvent<HTMLSelectElement>
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
    <main className="min-h-screen bg-black text-white">
      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          py-10
          sm:px-6
          lg:px-8
        "
      >
        {/* ==================================================
            Header
        ================================================== */}

        <section className="mb-10">
          <Badge
            className="
              mb-4
              rounded-full
              border
              border-emerald-500/30
              bg-emerald-500/10
              px-3
              py-1
              text-emerald-400
            "
          >
            <Users className="mr-1.5 h-3.5 w-3.5" />

            APGF Community
          </Badge>

          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
              sm:text-5xl
            "
          >
            Explore Gamers
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-zinc-400
            "
          >
            Discover gamers across Pakistan, find players
            with similar interests, and explore their APGF
            Gamer Cards.
          </p>
        </section>

        {/* ==================================================
            Filters
        ================================================== */}

        <section
          className="
            mb-10
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900/60
            p-4
            shadow-xl
            backdrop-blur-xl
            sm:p-5
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              lg:flex-row
            "
          >
            {/* Search */}

            <div className="relative flex-1">
              <Search
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-zinc-500
                "
              />

              <Input
                value={search}
                onChange={handleSearchChange}
                placeholder="Search username, name, or APGF ID..."
                className="
                  h-12
                  rounded-xl
                  border-zinc-700
                  bg-zinc-950
                  pl-12
                  text-white
                  placeholder:text-zinc-500
                "
              />
            </div>

            {/* Province */}

            <select
              value={province}
              onChange={handleProvinceChange}
              className="
                h-12
                rounded-xl
                border
                border-zinc-700
                bg-zinc-950
                px-4
                text-sm
                text-white
                outline-none
                transition
                focus:border-emerald-500
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

            {/* City */}

            <select
              value={city}
              onChange={handleCityChange}
              disabled={!province}
              className="
                h-12
                rounded-xl
                border
                border-zinc-700
                bg-zinc-950
                px-4
                text-sm
                text-white
                outline-none
                transition
                focus:border-emerald-500
                disabled:cursor-not-allowed
                disabled:opacity-50
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
          </div>

          {/* Result count */}

          <div className="mt-4 text-sm text-zinc-500">
            {loading
              ? "Finding gamers..."
              : `${total} gamer${
                  total === 1 ? "" : "s"
                } found`}
          </div>
        </section>

        {/* ==================================================
            Error
        ================================================== */}

        {error && (
          <div
            className="
              mb-8
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              p-5
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* ==================================================
            Loading
        ================================================== */}

        {loading && (
          <div
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
              <div
                key={index}
                className="
                  h-[650px]
                  animate-pulse
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-zinc-900/60
                "
              />
            ))}
          </div>
        )}

        {/* ==================================================
            Empty
        ================================================== */}

        {!loading &&
          !error &&
          profiles.length === 0 && (
            <div
              className="
                flex
                min-h-[400px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900/40
                px-6
                text-center
              "
            >
              <div
                className="
                  mb-5
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-zinc-800
                "
              >
                <Users
                  className="
                    h-7
                    w-7
                    text-zinc-500
                  "
                />
              </div>

              <h2 className="text-xl font-semibold text-white">
                No gamers found
              </h2>

              <p
                className="
                  mt-2
                  max-w-md
                  text-sm
                  text-zinc-500
                "
              >
                Try changing your search, province, or city.
              </p>
            </div>
          )}

        {/* ==================================================
            Gamer Grid
        ================================================== */}

        {!loading &&
          !error &&
          profiles.length > 0 && (
            <div
              className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {profiles.map((profile) => (
                <a
                  key={profile.id}
                  href={`/u/${profile.username}`}
                  className="
                    block
                    h-full
                    rounded-2xl
                    outline-none
                    focus-visible:ring-2
                    focus-visible:ring-emerald-500
                  "
                >
                  <GamerCard profile={profile} />
                </a>
              ))}
            </div>
          )}

        {/* ==================================================
            Pagination
        ================================================== */}

        {!loading && totalPages > 1 && (
          <div
            className="
              mt-10
              flex
              flex-col
              items-center
              justify-between
              gap-4
              sm:flex-row
            "
          >
            <p className="text-sm text-zinc-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={previousPage}
                disabled={
                  page === 1 || loading
                }
                className="
                  h-10
                  rounded-xl
                  border-zinc-700
                  bg-zinc-900
                  text-zinc-300
                  hover:bg-zinc-800
                "
              >
                <ChevronLeft className="mr-1 h-4 w-4" />

                Previous
              </Button>

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
                  border-zinc-700
                  bg-zinc-900
                  text-zinc-300
                  hover:bg-zinc-800
                "
              >
                Next

                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ==================================================
            Results footer
        ================================================== */}

        {!loading &&
          profiles.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-sm text-zinc-600">
                Showing{" "}
                {Math.min(
                  (page - 1) * PAGE_SIZE + 1,
                  total
                )}
                {" "}–{" "}
                {Math.min(
                  page * PAGE_SIZE,
                  total
                )}
                {" "}of{" "}
                {total} gamers
              </p>
            </div>
          )}
      </div>
    </main>
  )
}