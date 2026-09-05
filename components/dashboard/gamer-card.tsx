import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  MapPin,
  Gamepad2,
  ShieldCheck,
  ShieldX,
  ExternalLink,
} from "lucide-react"

type GamerCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any
  variant?: "dashboard" | "explore"
}

export function GamerCard({
  profile,
  variant = "dashboard",
}: GamerCardProps) {
  const isExplore = variant === "explore"

  const socialLinks = profile.social_links ?? {}

  const location = [profile.city, profile.province]
    .filter(Boolean)
    .join(", ")

  const displayName =
    profile.display_name || profile.username || "APGF Gamer"

  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word: string) => word.charAt(0))
    .join("")
    .toUpperCase()

  const favoriteGames = Array.isArray(profile.games)
    ? profile.games.filter(Boolean)
    : []

  const hasSocialLinks = Object.values(socialLinks).some(
    (value) => typeof value === "string" && value.trim(),
  )

  return (
    <Card
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950
        shadow-2xl
        shadow-black/30
        transition-all
        duration-500
        hover:border-emerald-500/20
        hover:shadow-emerald-500/5
      "
    >
      {/* ==================================================
          Ambient Glow
      ================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          left-1/2
          -translate-x-1/2
          rounded-full
          bg-emerald-500/10
          blur-3xl
          ${
            isExplore
              ? "-top-20 h-40 w-40"
              : "-top-32 h-64 w-64"
          }
        `}
      />

      {/* ==================================================
          Banner
      ================================================== */}

      <div
        className={`
          relative
          overflow-hidden
          ${isExplore ? "h-32" : "h-44 sm:h-52"}
        `}
      >
        {profile.banner_url ? (
          <img
            src={profile.banner_url}
            alt=""
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.03]
            "
          />
        ) : (
          <>
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-emerald-500
                via-green-600
                to-zinc-950
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_40%)]
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-[linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.65)_100%)]
              "
            />
          </>
        )}

        {/* Banner depth */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/10
            via-transparent
            to-zinc-950
          "
        />

        {/* ==================================================
            APGF Branding
        ================================================== */}

        <div
          className={
            isExplore
              ? "absolute left-4 top-4"
              : "absolute left-5 top-5 sm:left-7 sm:top-6"
          }
        >
          <div
            className={
              isExplore
                ? "flex items-center gap-2"
                : "flex items-center gap-2.5"
            }
          >
            <div
              className={`
                flex
                items-center
                justify-center
                rounded-xl
                border
                border-white/20
                bg-black/30
                font-black
                text-white
                shadow-lg
                backdrop-blur-md
                ${
                  isExplore
                    ? "h-7 w-7 text-[11px]"
                    : "h-9 w-9 text-sm"
                }
              `}
            >
              A
            </div>

            <div>
              <p
                className={
                  isExplore
                    ? "text-[10px] font-bold tracking-[0.22em] text-white"
                    : "text-xs font-bold tracking-[0.25em] text-white"
                }
              >
                APGF
              </p>

              <p
                className={
                  isExplore
                    ? "text-[7px] font-medium tracking-[0.14em] text-white/50 uppercase"
                    : "mt-0.5 text-[9px] font-medium tracking-[0.16em] text-white/50 uppercase"
                }
              >
                Gamer Identity
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            APGF ID
        ================================================== */}

        {profile.apgf_id && (
          <div
            className={
              isExplore
                ? "absolute right-4 top-4"
                : "absolute right-5 top-5 sm:right-7 sm:top-6"
            }
          >
            <div
              className={`
                rounded-full
                border
                border-white/15
                bg-black/30
                font-mono
                font-bold
                text-white/80
                shadow-lg
                backdrop-blur-md
                ${
                  isExplore
                    ? "px-2.5 py-1 text-[9px] "
                    : "px-3 py-1.5 text-[11px]"
                }
              `}
            >
              {profile.apgf_id}
            </div>
          </div>
        )}
      </div>

      <CardContent
        className={
          isExplore
            ? "relative px-4 pb-5 sm:px-5 sm:pb-6"
            : "relative px-5 pb-7 sm:px-7 sm:pb-8"
        }
      >
        {/* ==================================================
            Avatar
        ================================================== */}

        <div
          className={
            isExplore
              ? "-mt-10 flex"
              : "-mt-16 flex sm:-mt-20"
          }
        >
          <div
            className={`
              rounded-full
              border-4
              border-zinc-950
              bg-zinc-950
              shadow-2xl
              shadow-black/60
              ${isExplore ? "p-0.5" : "p-1"}
            `}
          >
            <Avatar
              className={
                isExplore
                  ? "h-20 w-20"
                  : "h-28 w-28 sm:h-36 sm:w-36"
              }
            >
              <AvatarImage
                src={profile.avatar_url || undefined}
                alt={displayName}
              />

              <AvatarFallback
                className={
                  isExplore
                    ? "bg-zinc-800 text-xl font-bold text-white"
                    : "bg-zinc-800 text-3xl font-bold text-white sm:text-4xl"
                }
              >
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* ==================================================
            Identity
        ================================================== */}

        <div className={isExplore ? "mt-3" : "mt-5"}>
          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  className={
                    isExplore
                      ? "truncate text-lg font-bold tracking-tight text-white transition-colors group-hover:text-emerald-300"
                      : "text-2xl font-bold tracking-tight text-white sm:text-3xl"
                  }
                >
                  {isExplore
                    ? `@${profile.username || "gamer"}`
                    : displayName}
                </h2>

                {/* Verification only on Dashboard */}

                {!isExplore && (
                  <Badge
                    className={
                      profile.is_verified
                        ? `
                          rounded-full
                          border
                          border-emerald-500/30
                          bg-emerald-500/10
                          px-2.5
                          py-1
                          text-emerald-400
                        `
                        : `
                          rounded-full
                          border
                          border-amber-500/30
                          bg-amber-500/10
                          px-2.5
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
                )}
              </div>

              {/* Username only on Dashboard */}

              {!isExplore && profile.username && (
                <p className="mt-1.5 text-sm text-zinc-500">
                  @{profile.username}
                </p>
              )}
            </div>

            {/* APGF ID beside identity only on Dashboard */}

            {!isExplore && profile.apgf_id && (
              <div
                className="
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900/80
                  px-3
                  py-2
                  sm:shrink-0
                "
              >
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />

                <span className="font-mono text-xs text-zinc-400">
                  {profile.apgf_id}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================
            Bio
            Dashboard only
        ================================================== */}

        {!isExplore && profile.bio && (
          <div className="mt-6">
            <p
              className="
                max-w-2xl
                text-sm
                leading-6
                text-zinc-400
                sm:text-[15px]
              "
            >
              {profile.bio}
            </p>
          </div>
        )}

        {/* ==================================================
            Identity Metadata

            Dashboard:
            Location + Main Game

            Explore:
            Location + Main Game
            Same data, more compact
        ================================================== */}

        <div
          className={`
            flex
            flex-wrap
            gap-2
            ${isExplore ? "mt-3" : "mt-6"}
          `}
        >
          {location && (
            <div
              className={`
                flex
                min-w-0
                max-w-full
                items-center
                gap-2
                rounded-full
                border
                border-zinc-800
                bg-zinc-900/70
                text-zinc-300
                ${
                  isExplore
                    ? "px-2.5 py-1.5 text-[11px]"
                    : "px-3.5 py-2 text-xs"
                }
              `}
            >
              <MapPin
                className={
                  isExplore
                    ? "h-3 w-3 shrink-0 text-emerald-400"
                    : "h-3.5 w-3.5 text-emerald-400"
                }
              />

              <span className="truncate">{location}</span>
            </div>
          )}

          {profile.main_game && (
            <div
              className={`
                flex
                min-w-0
                max-w-full
                items-center
                gap-2
                rounded-full
                border
                border-emerald-500/15
                bg-emerald-500/5
                text-emerald-300
                ${
                  isExplore
                    ? "px-2.5 py-1.5 text-[11px]"
                    : "px-3.5 py-2 text-xs"
                }
              `}
            >
              <Gamepad2
                className={
                  isExplore
                    ? "h-3 w-3 shrink-0"
                    : "h-3.5 w-3.5"
                }
              />

              <span className="truncate">
                {profile.main_game}
              </span>
            </div>
          )}
        </div>

        {/* ==================================================
            Main Game
            Dashboard only
        ================================================== */}

        {!isExplore && profile.main_game && (
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h3
                className="
                  text-[10px]
                  font-bold
                  tracking-[0.2em]
                  text-zinc-600
                  uppercase
                "
              >
                Main Game
              </h3>

              <span className="text-[10px] font-medium text-emerald-500/60">
                PRIMARY
              </span>
            </div>

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-emerald-500/20
                bg-gradient-to-r
                from-emerald-500/10
                via-emerald-500/5
                to-transparent
                p-4
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-28
                  w-28
                  rounded-full
                  bg-emerald-500/10
                  blur-2xl
                "
              />

              <div className="relative flex items-center gap-3">
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
                    border-emerald-500/20
                    bg-emerald-500/10
                  "
                >
                  <Gamepad2 className="h-5 w-5 text-emerald-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {profile.main_game}
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-500">
                    Primary gaming title
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            Favorite Games
            Dashboard only
        ================================================== */}

        {!isExplore && favoriteGames.length > 0 && (
          <div className="mt-8">
            <h3
              className="
                mb-3
                text-[10px]
                font-bold
                tracking-[0.2em]
                text-zinc-600
                uppercase
              "
            >
              Favorite Games
            </h3>

            <div className="flex flex-wrap gap-2">
              {favoriteGames.map((game: string) => (
                <Badge
                  key={game}
                  className="
                    rounded-full
                    border
                    border-zinc-800
                    bg-zinc-900
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-zinc-300
                    transition-colors
                    hover:border-zinc-700
                    hover:bg-zinc-800
                    hover:text-white
                  "
                >
                  <Gamepad2 className="mr-1.5 h-3.5 w-3.5 text-zinc-500" />
                  {game}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================
            Social Profiles
            Dashboard only
        ================================================== */}

        {!isExplore && hasSocialLinks && (
          <div className="mt-8">
            <h3
              className="
                mb-3
                text-[10px]
                font-bold
                tracking-[0.2em]
                text-zinc-600
                uppercase
              "
            >
              Connected Profiles
            </h3>

            <div className="flex flex-wrap gap-2">
              {socialLinks.instagram && (
                <SocialLink
                  href={socialLinks.instagram}
                  label="Instagram"
                />
              )}

              {socialLinks.tiktok && (
                <SocialLink
                  href={socialLinks.tiktok}
                  label="TikTok"
                />
              )}

              {socialLinks.x && (
                <SocialLink
                  href={socialLinks.x}
                  label="X"
                />
              )}

              {socialLinks.youtube && (
                <SocialLink
                  href={socialLinks.youtube}
                  label="YouTube"
                />
              )}

              {socialLinks.twitch && (
                <SocialLink
                  href={socialLinks.twitch}
                  label="Twitch"
                />
              )}

              {socialLinks.steam && (
                <SocialLink
                  href={socialLinks.steam}
                  label="Steam"
                />
              )}

              {socialLinks.discord && (
                <SocialLink
                  href={socialLinks.discord}
                  label="Discord"
                />
              )}
            </div>
          </div>
        )}

        {/* ==================================================
            Official Identity Footer
            Dashboard only

            Explore intentionally has no internal profile
            link because Explore already wraps the card in
            an outer <a>.
        ================================================== */}

     
          <div
            className="
              mt-8
              border-t
              border-zinc-800
              pt-5
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-emerald-500/20
                    bg-emerald-500/5
                  "
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      tracking-[0.18em]
                      text-zinc-500
                      uppercase
                    "
                  >
                    Pakistan Gaming Federation
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-600">
                    Official Gamer Identity
                  </p>
                </div>
              </div>

              {profile.username && (
                <a
                  href={`/u/${profile.username}`}
                  className="
                    group/link
                    flex
                    w-fit
                    items-center
                    gap-1.5
                    text-xs
                    font-medium
                    text-zinc-500
                    transition-colors
                    hover:text-emerald-400
                  "
                >
                  View public profile

                  <ExternalLink
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      group-hover/link:-translate-y-0.5
                      group-hover/link:translate-x-0.5
                    "
                  />
                </a>
              )}
            </div>
          </div>
     
      </CardContent>
    </Card>
  )
}

/* ==================================================
   Social Link
================================================== */

function SocialLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group/social
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-zinc-800
        bg-zinc-900
        px-3
        py-1.5
        text-xs
        font-medium
        text-zinc-400
        transition-all
        duration-200
        hover:border-emerald-500/20
        hover:bg-zinc-800
        hover:text-white
      "
    >
      {label}

      <ExternalLink
        className="
          h-3
          w-3
          text-zinc-600
          transition-colors
          group-hover/social:text-emerald-400
        "
      />
    </a>
  )
}