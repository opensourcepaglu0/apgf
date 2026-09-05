"use client"

import Link from "next/link"
import { useState } from "react"

import {
  Bell,
  ChevronDown,
  Compass,
  LogOut,
  Pencil,
  Share2,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { LogoutAction } from "./logout-action"

type DashboardHeaderProps = {
  user: {
    user_metadata?: {
      avatar_url?: string
      full_name?: string
    }
  }
  profile: {
    avatar_url?: string
    username: string
  }
}

export function DashboardHeader({
  user,
  profile,
}: DashboardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const name = user.user_metadata?.full_name ?? "Gamer"

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()

  return (
    <header className="relative">
      <div className="flex items-start justify-between gap-4 sm:gap-6">
        {/* ==================================================
            Welcome
        ================================================== */}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-emerald-500/20
                bg-emerald-500/10
                text-sm
              "
            >
              👋
            </span>

            <p className="text-sm font-medium text-emerald-400">
              Welcome back
            </p>
          </div>

          <h1 className="mt-3 truncate text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {name}
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
            Your APGF identity is ready. Manage your profile and stay
            connected with the gaming community.
          </p>
        </div>

        {/* ==================================================
            User controls
        ================================================== */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* ==================================================
              Explore Gamers
          ================================================== */}

          <Link
            href="/explore"
            className="
              group
              hidden
              h-11
              items-center
              gap-2
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/70
              px-3.5
              text-sm
              font-medium
              text-zinc-400
              shadow-lg
              shadow-black/10
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-emerald-500/20
              hover:bg-zinc-900
              hover:text-zinc-200
              sm:flex
            "
          >
            <Compass className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-emerald-400" />

            <span>Explore</span>
          </Link>

          {/* ==================================================
              Notifications
          ================================================== */}

          <button
            type="button"
            aria-label="Notifications"
            className="
              group
              relative
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/70
              text-zinc-500
              shadow-lg
              shadow-black/10
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-emerald-500/20
              hover:bg-zinc-900
              hover:text-zinc-200
            "
          >
            <Bell className="h-5 w-5 transition-transform duration-300 group-hover:scale-105" />

            {/* Notification indicator */}

            <span
              className="
                absolute
                right-2.5
                top-2.5
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
                shadow-sm
                shadow-emerald-400/50
              "
            />
          </button>

          {/* ==================================================
              Profile menu
          ================================================== */}

          <div className="relative">
            <button
              type="button"
              aria-label="Open profile menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="
                group
                flex
                items-center
                gap-2
                rounded-full
                outline-none
                transition-all
                focus-visible:ring-2
                focus-visible:ring-emerald-500/70
                focus-visible:ring-offset-2
                focus-visible:ring-offset-zinc-950
              "
            >
              {/* Avatar */}

              <div
                className="
                  rounded-full
                  p-0.5
                  ring-1
                  ring-zinc-800
                  transition-all
                  duration-300
                  group-hover:ring-emerald-500/50
                "
              >
                <Avatar className="h-10 w-10 sm:h-11 sm:w-11">
                  <AvatarImage
                    src={profile.avatar_url}
                    alt={name}
                  />

                  <AvatarFallback
                    className="
                      bg-zinc-800
                      text-sm
                      font-semibold
                      text-zinc-200
                    "
                  >
                    {initials || "G"}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Chevron */}

              <ChevronDown
                className={`
                  hidden
                  h-4
                  w-4
                  text-zinc-500
                  transition-transform
                  duration-200
                  sm:block
                  ${menuOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* ==================================================
                Account dropdown
            ================================================== */}

            {menuOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+12px)]
                  z-50
                  w-[280px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-zinc-950/95
                  shadow-2xl
                  shadow-black/40
                  backdrop-blur-2xl
                "
              >
                {/* ==================================================
                    Account information
                ================================================== */}

                <div className="border-b border-zinc-800/80 px-4 py-3.5">
                  <p className="truncate text-sm font-semibold text-white">
                    {name}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    @{profile.username}
                  </p>
                </div>

                {/* ==================================================
                    Account actions
                ================================================== */}

                <div className="p-2">
                  <DropdownLink
                    href="/edit-profile"
                    icon={<Pencil className="h-4 w-4" />}
                    title="Edit Profile"
                    description="Update your gamer identity"
                    onClick={() => setMenuOpen(false)}
                  />

                  <DropdownLink
                    href={`/u/${profile.username}`}
                    icon={<User className="h-4 w-4" />}
                    title="Public Profile"
                    description="View your public identity"
                    onClick={() => setMenuOpen(false)}
                  />

                  {/* ==================================================
                      Share Gamer Card
                  ================================================== */}

                  <div
                    className="
                      flex
                      cursor-not-allowed
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      opacity-40
                    "
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-zinc-800
                        bg-zinc-900
                        text-zinc-500
                      "
                    >
                      <Share2 className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-300">
                        Share Gamer Card
                      </p>

                      <p className="text-[11px] text-zinc-600">
                        Coming soon
                      </p>
                    </div>
                  </div>
                </div>

                {/* ==================================================
                    Logout
                ================================================== */}

                <div className="border-t border-zinc-800/80 p-2">
                  <div
                    className="
                      rounded-xl
                      transition-colors
                      hover:bg-red-500/[0.06]
                    "
                  >
                    <LogoutAction />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================
          Mobile Explore
      ================================================== */}

      <div className="mt-5 sm:hidden">
        <Link
          href="/explore"
          className="
            group
            flex
            h-10
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900/60
            text-sm
            font-medium
            text-zinc-400
            transition-all
            duration-300
            hover:border-emerald-500/20
            hover:bg-zinc-900
            hover:text-zinc-200
          "
        >
          <Compass className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-emerald-400" />

          <span>Explore Gamers</span>
        </Link>
      </div>

      {/* ==================================================
          Divider
      ================================================== */}

      <div className="mt-7 h-px bg-gradient-to-r from-emerald-500/20 via-zinc-800 to-transparent" />
    </header>
  )
}

/* ============================================================
   Dropdown Link
============================================================ */

function DropdownLink({
  href,
  icon,
  title,
  description,
  onClick,
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        transition-colors
        hover:bg-zinc-900
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-emerald-500/10
          bg-emerald-500/[0.07]
          text-emerald-400
          transition-colors
          group-hover:border-emerald-500/20
          group-hover:bg-emerald-500/10
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-zinc-200">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[11px] text-zinc-600">
          {description}
        </p>
      </div>
    </Link>
  )
}