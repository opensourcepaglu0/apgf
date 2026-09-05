
"use client"

import { useState } from "react"

import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/client"

export function DiscordButton() {
  const [loading, setLoading] = useState(false)

  async function login() {
    if (loading) return

    setLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",

      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("Discord authentication failed:", error)

      setLoading(false)
    }
  }

  return (
    <Button
      onClick={login}
      disabled={loading}
      className="
        h-13
        w-full
        rounded-xl
        bg-[#5865F2]
        text-white
        font-semibold
        shadow-lg
        shadow-indigo-500/10
        transition-all
        duration-300
        hover:bg-[#4752C4]
        hover:shadow-xl
        hover:shadow-indigo-500/20
        active:scale-[0.99]
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {loading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <svg
          className="mr-2 h-5 w-5"
          viewBox="0 0 127.14 96.36"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0 105.89 105.89 0 0 0 19.39 8.09C2.79 32.65-1.71 56.6.54 80.21h.02A105.73 105.73 0 0 0 32.71 96.36a77.7 77.7 0 0 0 6.84-11.14 68.42 68.42 0 0 1-10.78-5.18c.91-.66 1.8-1.35 2.66-2.08 20.78 9.49 43.33 9.49 63.86 0 .87.73 1.76 1.42 2.66 2.08a68.68 68.68 0 0 1-10.8 5.19 77.24 77.24 0 0 0 6.84 11.13A105.25 105.25 0 0 0 126.6 80.22c2.64-27.29-4.51-50.99-18.9-72.15z" />
        </svg>
      )}

      {loading ? "Connecting to Discord..." : "Continue with Discord"}
    </Button>
  )
}

