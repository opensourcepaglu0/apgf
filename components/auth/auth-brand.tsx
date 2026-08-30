import { Gamepad2 } from "lucide-react"

export function AuthBrand() {
  return (
    <div className="hidden flex-col space-y-8 lg:flex">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-500/30">
          <Gamepad2 className="h-8 w-8 text-indigo-400" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white">APGF</h1>

          <p className="text-zinc-400">All Pakistan Gaming Federation</p>
        </div>
      </div>

      <div className="max-w-xl space-y-6">
        <h2 className="text-6xl leading-tight font-black tracking-tight text-white">
          One Identity.
          <br />
          Every Gamer.
        </h2>

        <p className="text-lg leading-8 text-zinc-400">
          Create your official gaming identity, connect with Pakistan gaming
          community, discover creators, explore content, and become part of the
          future of esports.
        </p>
      </div>

      <div className="flex gap-10 text-sm text-zinc-500">
        <div>
          <p className="text-3xl font-bold text-white">100%</p>
          Community
        </div>

        <div>
          <p className="text-3xl font-bold text-white">24/7</p>
          Discord
        </div>

        <div>
          <p className="text-3xl font-bold text-white">∞</p>
          Future Ready
        </div>
      </div>
    </div>
  )
}
