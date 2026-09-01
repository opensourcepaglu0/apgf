import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

import {
  MapPin,
  Gamepad2,
  ShieldCheck,
  UserRound,
} from "lucide-react"

type GamerCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any
}

export function GamerCard({ profile }: GamerCardProps) {
  const games = Array.isArray(profile.games)
    ? profile.games.filter(Boolean)
    : []

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

  return (
    <Card className="group relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/30">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Header / Banner */}
      <div className="relative h-48 overflow-hidden sm:h-56">
        {profile.banner_url ? (
          <img
            src={profile.banner_url}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-600 to-zinc-950" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_40%)]" />

            <div className="absolute inset-0 bg-black/20" />
          </>
        )}

        {/* Dark gradient for card depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-zinc-950" />

        {/* APGF branding */}
        <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/30 text-sm font-black text-white backdrop-blur-md">
              A
            </div>

            <span className="text-sm font-bold tracking-[0.2em] text-white">
              APGF
            </span>
          </div>
        </div>

        {/* APGF ID */}
        {profile.apgf_id && (
          <div className="absolute right-5 top-5 sm:right-7 sm:top-7">
            <Badge className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-md">
              {profile.apgf_id}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="relative px-5 pb-7 sm:px-8 sm:pb-8">
        {/* Avatar */}
        <div className="-mt-16 flex justify-center sm:-mt-20">
          <div className="rounded-full border-4 border-zinc-950 bg-zinc-950 p-1 shadow-2xl shadow-black/60">
            <Avatar className="h-28 w-28 sm:h-36 sm:w-36">
              <AvatarImage
                src={profile.avatar_url || undefined}
                alt={displayName}
              />

              <AvatarFallback className="bg-zinc-800 text-3xl font-bold text-white sm:text-4xl">
                {initials || <UserRound className="h-10 w-10" />}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Identity */}
        <div className="mt-5 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {displayName}
            </h1>

            {/* Member badge */}
            <Badge className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-400">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              APGF Member
            </Badge>
          </div>

          {profile.username && (
            <p className="mt-1.5 text-sm text-zinc-500">
              @{profile.username}
            </p>
          )}
        </div>

        {/* Identity information */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {profile.apgf_id && (
            <div className="rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 font-mono text-xs text-zinc-300">
              ID:{" "}
              <span className="text-zinc-100">
                {profile.apgf_id}
              </span>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-300">
              <MapPin className="h-4 w-4 text-emerald-400" />
              {location}
            </div>
          )}
        </div>

        {/* Games */}
        {games.length > 0 && (
          <div className="mt-7">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.16em] text-zinc-500 uppercase">
              <Gamepad2 className="h-4 w-4" />
              Gaming
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {games.slice(0, 5).map((game: string) => (
                <Badge
                  key={game}
                  className="rounded-full border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 text-zinc-200"
                >
                  {game}
                </Badge>
              ))}

              {games.length > 5 && (
                <Badge className="rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-1.5 text-zinc-500">
                  +{games.length - 5}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Bottom identity strip */}
        <div className="mt-7 border-t border-zinc-800 pt-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-zinc-600 uppercase">
                Pakistan Gaming Federation
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Official Gamer Identity
              </p>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

