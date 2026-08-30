"use client"

import { useTransition } from "react"
import { LogOut } from "lucide-react"

import { logout } from "@/app/auth/actions"
import { toast } from "../ui/toast"

export function LogoutAction() {
  const [pending, startTransition] = useTransition()

  return (
    <button
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await logout()
        })
      }
      className="group flex w-full items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-zinc-900"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
          <LogOut className="h-5 w-5" />
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-white">
            {pending ? "Logging out..." : "Logout"}
          </h3>

          <p className="text-sm text-zinc-400">
            Sign out from your APGF account.
          </p>
        </div>
      </div>
    </button>
  )
}
