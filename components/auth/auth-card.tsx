import { Card } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"

import { DiscordButton } from "./discord-button"

export function AuthCard() {
  return (
    <Card className="w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950/70 p-7 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-9">
      <div className="space-y-8">
        {/* Mobile brand */}
        <div className="flex items-center justify-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08]">
            <span className="text-sm font-black text-emerald-400">
              A
            </span>
          </div>

          <span className="text-xl font-black tracking-tight text-white">
            APGF
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07]">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Welcome to APGF
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-400">
              Sign in with Discord to create and access your APGF Gamer
              Identity.
            </p>
          </div>
        </div>

        {/* Discord */}
        <DiscordButton />

        {/* Trust points */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <p className="text-xs font-medium text-zinc-300">
              Secure Discord authentication
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <p className="text-xs font-medium text-zinc-300">
              No APGF password required
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <p className="text-xs font-medium text-zinc-300">
              Your Gamer Card starts with your identity
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-[11px] leading-5 text-zinc-600">
          By continuing, you agree to APGF's Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </Card>
  )
}

