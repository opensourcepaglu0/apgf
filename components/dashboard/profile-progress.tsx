import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import {
  Megaphone,
  Trophy,
  Users,
  MessageCircle,
  ArrowRight,
} from "lucide-react"

import Link from "next/link"

export function APGFAnnouncements() {
  return (
    <Card className="border-zinc-800 bg-zinc-900/70 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Megaphone className="h-5 w-5 text-emerald-400" />
              APGF Updates
            </CardTitle>

            <CardDescription>
              Stay informed about the latest federation news.
            </CardDescription>
          </div>

          <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            NEW
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Welcome */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
          <h3 className="font-semibold text-white">🎉 Welcome to APGF</h3>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Your Gamer Card has been created successfully. You're now officially
            part of Pakistan's growing gaming community.
          </p>
        </div>

        {/* Roadmap */}
        <div className="space-y-3">
          <AnnouncementItem
            icon={<Trophy className="h-4 w-4" />}
            title="Competitive Tournaments"
            description="Compete in official APGF esports events."
          />

          <AnnouncementItem
            icon={<Users className="h-4 w-4" />}
            title="Teams & Organizations"
            description="Create teams and recruit players."
          />

          <AnnouncementItem
            icon={<MessageCircle className="h-4 w-4" />}
            title="Community Features"
            description="Messaging, friends, and gamer discovery are coming soon."
          />
        </div>

        <Link
          href="https://discord.gg/"
          target="_blank"
          className="group mt-2 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 transition hover:border-emerald-500/40 hover:bg-emerald-500/10"
        >
          <div>
            <p className="font-medium text-white">Join the APGF Discord</p>

            <p className="text-sm text-zinc-400">
              Connect with gamers across Pakistan.
            </p>
          </div>

          <ArrowRight className="h-5 w-5 text-emerald-400 transition group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}

type AnnouncementItemProps = {
  icon: React.ReactNode
  title: string
  description: string
}

function AnnouncementItem({ icon, title, description }: AnnouncementItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 transition hover:border-zinc-700">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
        {icon}
      </div>

      <div>
        <h4 className="font-medium text-white">{title}</h4>

        <p className="mt-1 text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  )
}
