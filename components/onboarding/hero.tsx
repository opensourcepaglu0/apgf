import { BadgeCheck, Gamepad2, ShieldCheck, Users } from "lucide-react"

import { BenefitCard } from "./benefit-card"

export function Hero() {
  return (
    <div className="flex flex-col justify-start lg:col-span-2">
      <div className="mb-6 inline-flex w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
        🇵🇰 All Pakistan Gaming Federation
      </div>

      <h1 className="text-5xl leading-tight font-black text-white">
        Claim Your
        <span className="mt-2 block bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
          APGF Identity
        </span>
      </h1>

      <p className="mt-6 text-lg leading-8 text-zinc-400">
        Join Pakistan's fastest-growing gaming community and create your
        official APGF Gamer Card.
      </p>

      <div className="mt-12 space-y-5">
        <BenefitCard
          icon={<ShieldCheck size={20} />}
          title="Official APGF ID"
          description="Your permanent federation identity."
        />

        <BenefitCard
          icon={<Gamepad2 size={20} />}
          title="Gamer Card"
          description="A beautiful profile you can share anywhere."
        />

        <BenefitCard
          icon={<Users size={20} />}
          title="Community Discovery"
          description="Find gamers from every province."
        />

        <BenefitCard
          icon={<BadgeCheck size={20} />}
          title="Exclusive Badges"
          description="Founder, Creator, Verified and more."
        />
      </div>
    </div>
  )
}
