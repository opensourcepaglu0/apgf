import { Card } from "@/components/ui/card"
import { DiscordButton } from "./discord-button"

export function AuthCard() {
  return (
    <Card className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
      <div className="space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

          <p className="text-sm leading-6 text-zinc-400">
            Sign in with Discord to access your APGF Gamer Card and join
            Pakistan fastest-growing gaming community.
          </p>
        </div>

        <DiscordButton />

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-zinc-400">
            ✓ Secure Discord authentication
          </p>

          <p className="mt-2 text-sm text-zinc-400">✓ No password required</p>

          <p className="mt-2 text-sm text-zinc-400">
            ✓ Your Gamer Card is created automatically
          </p>
        </div>

        <p className="text-center text-xs leading-6 text-zinc-500">
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </Card>
  )
}
