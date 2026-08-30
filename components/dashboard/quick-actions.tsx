import Link from "next/link"
import { Pencil, User, MessageCircle, Share2, ChevronRight } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LogoutAction } from "./logout-action"

export function QuickActions({ profile }: { profile: any }) {
  return (
    <Card className="border-zinc-800 bg-zinc-900/70 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>

        <CardDescription>Manage your APGF account.</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-3">
        <ActionCard
          href="/edit-profile"
          icon={<Pencil className="h-5 w-5" />}
          title="Edit Profile"
          description="Update your gamer identity."
          color="emerald"
        />

        <ActionCard
          href={`/u/${profile.username}`}
          icon={<User className="h-5 w-5" />}
          title="Public Profile"
          description="See what others can view."
          color="indigo"
        />

           <ActionCard
          href={`/explore`}
          icon={<User className="h-5 w-5" />}
          title="Explore"
          description="Find amazing players"
          color="indigo"
        />

        <ActionCard
          href="#"
          disabled
          icon={<Share2 className="h-5 w-5" />}
          title="Share Gamer Card"
          description="Coming soon."
          color="zinc"
        />

        <LogoutAction />
      </CardContent>
    </Card>
  )
}

type ActionCardProps = {
  href: string
  title: string
  description: string
  icon: React.ReactNode
  color: "emerald" | "indigo" | "violet" | "zinc"
  disabled?: boolean
}

function ActionCard({
  href,
  title,
  description,
  icon,
  color,
  disabled,
}: ActionCardProps) {
  const colors = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    zinc: "bg-zinc-800 text-zinc-500 border-zinc-700",
  }

  const content = (
    <div
      className={`group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 transition-all duration-300 ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : "hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl border ${colors[color]}`}
        >
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-white">{title}</h3>

          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </div>

      {!disabled && (
        <ChevronRight className="h-5 w-5 text-zinc-500 transition group-hover:translate-x-1 group-hover:text-white" />
      )}
    </div>
  )

  if (disabled) {
    return content
  }

  return <Link href={href}>{content}</Link>
}
