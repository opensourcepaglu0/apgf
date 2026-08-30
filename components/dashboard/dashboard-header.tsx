import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react"

type DashboardHeaderProps = {
  user: {
    user_metadata?: {
      avatar_url?: string
      full_name?: string
    }
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-emerald-400">👋 Welcome back</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          {user.user_metadata?.full_name ?? "Gamer"}
        </h1>

        <p className="mt-2 text-zinc-400">
          Your APGF identity is ready. Keep your profile updated.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 transition hover:text-white">
          <Bell className="h-5 w-5" />
        </button>

        <Avatar className="h-11 w-11 ring-2 ring-emerald-500/20 transition-all hover:ring-emerald-500">
          <AvatarImage src={user.user_metadata?.avatar_url} />

          <AvatarFallback>
            {user.user_metadata?.full_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
