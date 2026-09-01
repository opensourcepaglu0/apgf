"use client"

import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/toast"

import { GamerCard } from "@/components/profile/gamer-card-shareable"

type PublicProfileProps = {
  profile: any
}

export function PublicProfile({ profile }: PublicProfileProps) {
  async function copyProfileLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)

      toast.add({
        type: "success",
        description: "Profile link copied.",
      })
    } catch {
      toast.add({
        type: "error",
        description: "Could not copy profile link.",
      })
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Gamer Card */}
      <GamerCard profile={profile} />

      {/* Profile Information */}
      <div className="mt-6 space-y-6">
        {/* Bio */}
        {profile.bio && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl backdrop-blur-xl">
            <h2 className="mb-3 text-lg font-semibold text-white">
              About
            </h2>

            <p className="leading-7 text-zinc-300">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-400 text-black hover:from-emerald-400 hover:to-green-300"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Join APGF Discord
          </Button>

          <Button
            variant="outline"
            onClick={copyProfileLink}
            className="flex-1 border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
          >
            <Copy className="mr-2 h-4 w-4" />
            Share Profile
          </Button>
        </div>
      </div>
    </div>
  )
}

