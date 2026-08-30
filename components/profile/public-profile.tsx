"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Card, CardContent } from "@/components/ui/card"

import {
  MapPin,
  Gamepad2,
  ShieldCheck,
  ShieldX,
  Copy,
  ExternalLink,
} from "lucide-react"

import { toast } from "@/components/ui/toast"

type PublicProfileProps = {
  profile: any
}

export function PublicProfile({ profile }: PublicProfileProps) {
  async function copyProfileLink() {
    await navigator.clipboard.writeText(window.location.href)

    toast.add({
      type: "success",
      description: "Profile link copied.",
    })
  }

  return (
    <Card className="overflow-hidden rounded-3xl border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">
      {/* Banner */}

      <div className="relative h-64 overflow-hidden bg-zinc-950">
        {profile.banner_url ? (
          <img
            src={profile.banner_url}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-700" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_45%)]" />

            <div className="absolute inset-0 bg-black/40" />
          </>
        )}
      </div>

      <CardContent className="relative px-8 pb-10">
        {/* Avatar */}

        <div className="-mt-20 flex justify-center">
          <Avatar className="h-40 w-40 border-4 border-zinc-900 shadow-2xl">
            <AvatarImage src={profile.avatar_url} />

            <AvatarFallback className="text-5xl">
              {profile.display_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name */}

        <div className="mt-6 text-center">
          <h1 className="text-4xl font-bold text-white">
            {profile.display_name}
          </h1>

          <p className="mt-2 text-zinc-400">@{profile.username}</p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Badge
              className={
                profile.is_verified
                  ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border border-red-500/30 bg-red-500/10 text-red-400"
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

            <Badge className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              {profile.apgf_id}
            </Badge>
          </div>
        </div>

        {/* Bio */}

        {profile.bio && (
          <div className="mt-10">
            <h2 className="mb-3 text-lg font-semibold text-white">About</h2>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
              <p className="leading-7 text-zinc-300">{profile.bio}</p>
            </div>
          </div>
        )}

        {/* Location */}

        {(profile.city || profile.province) && (
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-semibold text-white">Location</h2>

            <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
              <MapPin className="h-5 w-5 text-emerald-400" />

              <span className="text-zinc-300">
                {[profile.city, profile.province].filter(Boolean).join(", ")}
              </span>
            </div>
          </div>
        )}

        {/* Games */}

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-white">
            Favorite Games
          </h2>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
            {profile.games?.length ? (
              <div className="flex flex-wrap gap-3">
                {profile.games.map((game: string) => (
                  <Badge
                    key={game}
                    className="border-zinc-700 bg-zinc-800 px-3 py-1 text-zinc-200"
                  >
                    <Gamepad2 className="mr-2 h-3.5 w-3.5" />

                    {game}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500">No games added yet.</p>
            )}
          </div>
        </div>

        {/* Actions */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-green-400 text-black">
            <ExternalLink className="mr-2 h-4 w-4" />
            Join APGF Discord
          </Button>

          <Button
            variant="outline"
            onClick={copyProfileLink}
            className="flex-1 border-zinc-700 bg-zinc-900"
          >
            <Copy className="mr-2 h-4 w-4" />
            Share Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
