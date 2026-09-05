import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GamerCard } from "@/components/dashboard/gamer-card"
import { APGFAnnouncements } from "@/components/dashboard/profile-progress"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // User must be logged in
  if (!user) {
    redirect("/sign-in")
  }

  // Get the user's APGF profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

  if (error) {
    console.error("Dashboard profile error:", error)
  }

  // User is authenticated but hasn't completed their profile
  if (!profile) {
    redirect("/complete-profile")
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute -left-32 -top-32
            h-96 w-96
            rounded-full
            bg-emerald-500/[0.04]
            blur-3xl
          "
        />

        <div
          className="
            absolute -right-32 top-1/3
            h-96 w-96
            rounded-full
            bg-emerald-500/[0.025]
            blur-3xl
          "
        />

        <div
          className="
            absolute bottom-0 left-1/3
            h-80 w-80
            rounded-full
            bg-emerald-500/[0.02]
            blur-3xl
          "
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Dashboard header */}
        <DashboardHeader user={user} profile={profile} />

        {/* Dashboard content */}
        <section className="mt-8 lg:mt-10">
          <div className="grid gap-6">
            <div className="min-w-0 space-y-6">
              {/* APGF Gamer Card */}
              <GamerCard profile={profile} variant="dashboard" />

              {/* APGF Announcements / Profile Progress */}
              <section>
                <APGFAnnouncements />
              </section>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-zinc-900 pt-6 pb-4">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-zinc-600 sm:flex-row">
            <p>© {new Date().getFullYear()} All Pakistan Gaming Federation</p>

            <p>
              Your gaming identity. Your community.{" "}
              <span className="text-emerald-500/70">🇵🇰</span>
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}