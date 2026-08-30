"use client"

import { ExternalLink, Gamepad2, MapPin, ShieldCheck, ShieldX } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type SocialLinks = {
  discord?: string
  youtube?: string
  instagram?: string
  tiktok?: string
  steam?: string
  x?: string
  twitch?: string
}

type GamerCardProfile = {
  id: string
  apgf_id: string
  username: string
  display_name: string
  avatar_url?: string | null
  banner_url?: string | null
  bio?: string | null
  province?: string | null
  city?: string | null
  games?: string[] | null
  main_game?: string | null
  social_links?: SocialLinks | null
  is_verified?: boolean | null
}

type GamerCardProps = {
  profile: GamerCardProfile
}

function normalizeSocialUrl(url: string) {
  if (!url) return "#"

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url
  }

  return `https://${url}`
}

function SocialButton({
  label,
  url,
}: {
  label: string
  url?: string
}) {
  if (!url?.trim()) {
    return null
  }

  return (
    <a
      href={normalizeSocialUrl(url)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        event.stopPropagation()
      }}
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-zinc-700
        bg-zinc-800/70
        px-3
        py-1.5
        text-xs
        font-medium
        text-zinc-300
        transition
        hover:border-emerald-500/40
        hover:bg-zinc-700
        hover:text-white
      "
    >
      {label}

      <ExternalLink className="h-3 w-3" />
    </a>
  )
}

export function GamerCard({
  profile,
}: GamerCardProps) {
  const socialLinks = profile.social_links ?? {}

  return (
    <article
      className="
        group
        h-full
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/70
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-emerald-500/30
        hover:shadow-xl
        hover:shadow-emerald-500/10
      "
    >
      {/* ==================================================
          Banner
      ================================================== */}

      <div className="relative h-40 overflow-hidden">
        {profile.banner_url ? (
          <img
            src={profile.banner_url}
            alt=""
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_45%)]" />

            <div className="absolute inset-0 bg-black/20" />
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
      </div>

      {/* ==================================================
          Content
      ================================================== */}

      <CardContent className="relative -mt-14 px-6 pb-6">

        {/* ==================================================
            Avatar
        ================================================== */}

        <div className="relative w-fit">
          <div
            className="
              h-28
              w-28
              overflow-hidden
              rounded-full
              border-4
              border-zinc-900
              bg-zinc-900
              shadow-2xl
              shadow-black/50
            "
          >
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-zinc-400">
                {profile.display_name?.charAt(0)?.toUpperCase() ?? "?"}
              </div>
            )}
          </div>
        </div>

        {/* ==================================================
            Name + Verification
        ================================================== */}

        <div className="mt-5 flex items-start justify-between gap-3">

          <div className="min-w-0">

            <h2 className="truncate text-2xl font-bold tracking-tight text-white">
              {profile.display_name}
            </h2>

            <p className="mt-1 truncate text-sm text-zinc-500">
              @{profile.username}
            </p>

          </div>

          <Badge
            className={
              profile.is_verified
                ? `
                  shrink-0
                  rounded-full
                  border
                  border-emerald-500/30
                  bg-emerald-500/10
                  px-3
                  py-1
                  text-emerald-400
                `
                : `
                  shrink-0
                  rounded-full
                  border
                  border-amber-500/30
                  bg-amber-500/10
                  px-3
                  py-1
                  text-amber-400
                `
            }
          >
            {profile.is_verified ? (
              <>
                <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                Verified
              </>
            ) : (
              <>
                <ShieldX className="mr-1 h-3.5 w-3.5" />
                Unverified
              </>
            )}
          </Badge>

        </div>

        {/* ==================================================
            APGF ID
        ================================================== */}

        <Badge
          className="
            mt-4
            rounded-full
            border
            border-emerald-500/30
            bg-emerald-500/10
            px-4
            py-1.5
            text-emerald-400
          "
        >
          {profile.apgf_id}
        </Badge>

        {/* ==================================================
            Bio
        ================================================== */}

        {profile.bio && (
          <p className="mt-5 line-clamp-3 leading-6 text-zinc-300">
            {profile.bio}
          </p>
        )}

        {/* ==================================================
            Location
        ================================================== */}

        {(profile.city || profile.province) && (
          <div
            className="
              mt-5
              flex
              w-fit
              max-w-full
              items-center
              gap-2
              rounded-full
              border
              border-zinc-800
              bg-zinc-800/60
              px-4
              py-2
              text-sm
              text-zinc-300
            "
          >
            <MapPin className="h-4 w-4 shrink-0 text-emerald-400" />

            <span className="truncate">
              {[profile.city, profile.province]
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
        )}

        {/* ==================================================
            Main Game
        ================================================== */}

        {profile.main_game && (
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              Main Game
            </p>

            <Badge
              className="
                rounded-full
                border
                border-zinc-700
                bg-zinc-800/70
                px-3
                py-1.5
                text-zinc-200
              "
            >
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />

              {profile.main_game}
            </Badge>
          </div>
        )}

        {/* ==================================================
            Games
        ================================================== */}

        <div className="mt-6">

          <h3
            className="
              mb-3
              text-xs
              font-semibold
              tracking-wider
              text-zinc-500
              uppercase
            "
          >
            Favorite Games
          </h3>

          {profile.games?.length ? (
            <div className="flex flex-wrap gap-2">

              {profile.games.slice(0, 6).map((game) => (
                <Badge
                  key={game}
                  className="
                    rounded-full
                    border
                    border-zinc-700
                    bg-zinc-800/70
                    px-3
                    py-1
                    text-zinc-200
                  "
                >
                  <Gamepad2 className="mr-1 h-3.5 w-3.5" />
                  {game}
                </Badge>
              ))}

              {profile.games.length > 6 && (
                <Badge
                  className="
                    rounded-full
                    border
                    border-zinc-700
                    bg-zinc-900
                    px-3
                    py-1
                    text-zinc-500
                  "
                >
                  +{profile.games.length - 6}
                </Badge>
              )}

            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              No games added yet.
            </p>
          )}

        </div>

        {/* ==================================================
            Social Links
        ================================================== */}

        <div className="mt-6">

          <h3
            className="
              mb-3
              text-xs
              font-semibold
              tracking-wider
              text-zinc-500
              uppercase
            "
          >
            Social Profiles
          </h3>

          <div className="flex flex-wrap gap-2">

            <SocialButton
              label="Instagram"
              url={socialLinks.instagram}
            />

            <SocialButton
              label="TikTok"
              url={socialLinks.tiktok}
            />

            <SocialButton
              label="X"
              url={socialLinks.x}
            />

            <SocialButton
              label="YouTube"
              url={socialLinks.youtube}
            />

            <SocialButton
              label="Twitch"
              url={socialLinks.twitch}
            />

            <SocialButton
              label="Steam"
              url={socialLinks.steam}
            />

          </div>

        </div>

        {/* ==================================================
            View Profile
        ================================================== */}

        <a
          href={`/u/${profile.username}`}
          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-zinc-700
            bg-zinc-800/50
            px-4
            py-2.5
            text-sm
            font-semibold
            text-zinc-200
            transition
            hover:border-emerald-500/30
            hover:bg-emerald-500/10
            hover:text-emerald-400
          "
        >
          View Gamer Profile

          <ExternalLink className="ml-2 h-4 w-4" />
        </a>

      </CardContent>
    </article>
  )
}