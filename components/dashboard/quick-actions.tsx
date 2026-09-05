import Link from "next/link"
import {
  ChevronRight,
  Compass,
  LogOut,
  Pencil,
  Share2,
  User,
} from "lucide-react"

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
    <Card
      className="
        overflow-hidden
        rounded-3xl
        border-zinc-800
        bg-zinc-900/60
        shadow-xl
        shadow-black/20
        backdrop-blur-xl
      "
    >
      {/* ==================================================
          Header
      ================================================== */}

      <CardHeader className="border-b border-zinc-800/70 px-5 pb-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-emerald-500/20
              bg-emerald-500/10
              text-emerald-400
            "
          >
            <Compass className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <CardTitle className="text-lg font-semibold text-white">
              Your APGF
            </CardTitle>

            <CardDescription className="mt-0.5 text-zinc-500">
              Manage your gaming identity.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* ==================================================
          Actions
      ================================================== */}

      <CardContent className="space-y-2.5 p-4 sm:p-5">
        <ActionCard
          href="/edit-profile"
          icon={<Pencil className="h-5 w-5" />}
          title="Edit Profile"
          description="Update your gamer identity."
        />

        <ActionCard
          href={`/u/${profile.username}`}
          icon={<User className="h-5 w-5" />}
          title="Public Profile"
          description="See your public identity."
        />

        <ActionCard
          href="/explore"
          icon={<Compass className="h-5 w-5" />}
          title="Explore Gamers"
          description="Discover the APGF community."
        />

        <ActionCard
          href="#"
          icon={<Share2 className="h-5 w-5" />}
          title="Share Gamer Card"
          description="Coming soon."
          disabled
        />

        {/* ==================================================
            Divider
        ================================================== */}

        <div className="my-4 h-px bg-zinc-800/70" />

        {/* Logout */}

        <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-1">
          <LogoutAction />
        </div>
      </CardContent>
    </Card>
  )
}

type ActionCardProps = {
  href: string
  title: string
  description: string
  icon: React.ReactNode
  disabled?: boolean
}

function ActionCard({
  href,
  title,
  description,
  icon,
  disabled = false,
}: ActionCardProps) {
  const content = (
    <div
      className={`
        group
        flex
        min-h-[72px]
        items-center
        justify-between
        gap-3
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-950/50
        px-4
        py-3.5
        transition-all
        duration-300

        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:-translate-y-0.5 hover:border-emerald-500/20 hover:bg-zinc-900 hover:shadow-lg hover:shadow-black/10"
        }
      `}
    >
      <div className="flex min-w-0 items-center gap-3.5">
        {/* Icon */}

        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-emerald-500/15
            bg-emerald-500/[0.07]
            text-emerald-400
            transition-all
            duration-300

            ${
              !disabled
                ? "group-hover:border-emerald-500/25 group-hover:bg-emerald-500/10"
                : ""
            }
          `}
        >
          {icon}
        </div>

        {/* Text */}

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-white">
            {title}
          </h3>

          <p className="mt-0.5 truncate text-xs text-zinc-500">
            {description}
          </p>
        </div>
      </div>

      {/* Arrow */}

      {!disabled && (
        <ChevronRight
          className="
            h-5
            w-5
            shrink-0
            text-zinc-600
            transition-all
            duration-300
            group-hover:translate-x-0.5
            group-hover:text-emerald-400
          "
        />
      )}
    </div>
  )

  if (disabled) {
    return content
  }

  return (
    <Link
      href={href}
      className="
        block
        rounded-2xl
        outline-none
        focus-visible:ring-2
        focus-visible:ring-emerald-500/70
        focus-visible:ring-offset-2
        focus-visible:ring-offset-zinc-950
      "
    >
      {content}
    </Link>
  )
}
