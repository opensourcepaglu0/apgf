
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  MapPin,
  Gamepad2,
  ShieldCheck,
  ShieldX,
} from "lucide-react"

type GamerCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any
}

export function GamerCard({ profile }: GamerCardProps) {
  const socialLinks = profile.social_links ?? {}

  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-900/70 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/10">
      {/* Banner */}
      <div className="relative h-40 overflow-hidden">
        {profile.banner_url ? (
          <img
            src={profile.banner_url}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_45%)]" />

            <div className="absolute inset-0 bg-black/20" />
          </>
        )}
      </div>

      <CardContent className="relative -mt-14 px-6 pb-6">
        {/* Avatar */}
        <div className="relative w-fit">
          <Avatar className="h-28 w-28 border-4 border-zinc-900 shadow-2xl shadow-black/50">
            <AvatarImage src={profile.avatar_url} />

            <AvatarFallback className="text-3xl">
              {profile.display_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {profile.display_name}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              @{profile.username}
            </p>
          </div>

          <Badge
            className={
              profile.is_verified
                ? "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400"
                : "rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-amber-400"
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

        {/* APGF ID */}
        <Badge className="mt-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-emerald-400">
          {profile.apgf_id}
        </Badge>

        {/* Bio */}
        {profile.bio && (
          <p className="mt-5 max-w-2xl leading-7 text-zinc-300">
            {profile.bio}
          </p>
        )}

        {/* Location */}
        {(profile.city || profile.province) && (
          <div className="mt-6 flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-800/60 px-4 py-2 text-sm text-zinc-300">
            <MapPin className="h-4 w-4 text-emerald-400" />

            <span>
              {[profile.city, profile.province]
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
        )}

        {/* Games */}
           <div className="mt-8">
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-zinc-500 uppercase">
            Main Game
          </h3>


            <div className="flex flex-wrap gap-2">
     
                <Badge
                  key={profile.main_game}
                  className="rounded-full border border-zinc-700 bg-zinc-800/70 px-3 py-1 text-zinc-200 transition hover:bg-zinc-700"
                >
                  <Gamepad2 className="mr-1 h-3.5 w-3.5" />
                  {profile.main_game}
                </Badge>
           
 </div>
 </div>

        <div className="mt-8">
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-zinc-500 uppercase">
            Favorite Games
          </h3>

          {profile.games?.length ? (
            <div className="flex flex-wrap gap-2">
              {profile.games.map((game: string) => (
                <Badge
                  key={game}
                  className="rounded-full border border-zinc-700 bg-zinc-800/70 px-3 py-1 text-zinc-200 transition hover:bg-zinc-700"
                >
                  <Gamepad2 className="mr-1 h-3.5 w-3.5" />
                  {game}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              No games added yet.
            </p>
          )}
        </div>

        {/* Social Links */}
        {Object.values(socialLinks).some(
          (value) => typeof value === "string" && value.trim()
        ) && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-zinc-500 uppercase">
              Social Profiles
            </h3>

            <div className="flex flex-wrap gap-2">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-700 hover:text-white"
                >
                  Instagram
                </a>
              )}

              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-700 hover:text-white"
                >
                  TikTok
                </a>
              )}

              {socialLinks.x && (
                <a
                  href={socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-700 hover:text-white"
                >
                  X
                </a>
              )}

              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-700 hover:text-white"
                >
                  YouTube
                </a>
              )}

              {socialLinks.twitch && (
                <a
                  href={socialLinks.twitch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-700 hover:text-white"
                >
                  Twitch
                </a>
              )}

              {socialLinks.steam && (
                <a
                  href={socialLinks.steam}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-700 hover:text-white"
                >
                  Steam
                </a>
              )}

              {socialLinks.discord && (
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-700 hover:text-white"
                >
                  Discord
                </a>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

