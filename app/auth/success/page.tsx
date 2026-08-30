"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Progress } from "@/components/ui/progress"
import { Loader2, Gamepad2, ShieldCheck } from "lucide-react"

export default function AuthSuccessPage() {
  const router = useRouter()

  const [progress, setProgress] = useState(0)

  const messages = [
    "Connecting to APGF network...",
    "Verifying your gamer identity...",
    "Preparing your Gamer Card...",
    "Almost ready...",
    "Welcome to the federation!",
  ]

  const messageIndex = Math.min(Math.floor(progress / 25), messages.length - 1)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)

          setTimeout(() => {
            router.replace("/dashboard")
          }, 500)

          return 100
        }

        return prev + 2
      })
    }, 80)

    return () => clearInterval(interval)
  }, [router])

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6">
      {/* Background glow */}

      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl">
        {/* Logo */}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
          <Gamepad2 className="h-8 w-8 text-emerald-400" />
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            APGF Authentication
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Welcome Gamer
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Setting up your federation identity
          </p>
        </div>

        <div className="mt-8">
          <Progress value={progress} className="h-3 bg-zinc-800" />

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-zinc-400">{messages[messageIndex]}</p>

            <span className="text-sm font-bold text-emerald-400">
              {progress}%
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Signing you in !!!
        </div>
      </div>
    </main>
  )
}
