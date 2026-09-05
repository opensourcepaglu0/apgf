import { Gamepad2, ShieldCheck, Users } from "lucide-react"

export function AuthBrand() {
  return (
    <div className="hidden flex-col lg:flex">
      {/* Brand */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] shadow-lg shadow-emerald-500/[0.05]">
          <Gamepad2 className="h-7 w-7 text-emerald-400" />
        </div>

        <div>
          <p className="text-3xl font-black tracking-tight text-white">
            APGF
          </p>

          <p className="mt-0.5 text-sm font-medium text-zinc-500">
            All Pakistan Gaming Federation
          </p>
        </div>
      </div>

      {/* Main message */}
      <div className="mt-16 max-w-2xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />

          Pakistan's Gaming Community
        </div>

        <h1 className="text-5xl font-black leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
          One identity.
          <br />
          <span className="text-emerald-400">Every gamer.</span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
          APGF brings Pakistan's gamers, creators, communities, and gaming
          culture together under one connected identity.
        </p>
      </div>

      {/* Value points */}
      <div className="mt-12 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-200">
              Your official gamer identity
            </p>

            <p className="mt-0.5 text-xs text-zinc-500">
              Your APGF Gamer Card, profile and identity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <Users className="h-5 w-5 text-emerald-400" />
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-200">
              Part of something bigger
            </p>

            <p className="mt-0.5 text-xs text-zinc-500">
              Discover and connect with gamers across Pakistan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

