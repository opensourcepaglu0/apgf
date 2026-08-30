import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GamerCard } from "@/components/dashboard/gamer-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { APGFAnnouncements } from "@/components/dashboard/profile-progress"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/sign-in")
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

  if (error) {
    console.error(error)
  }

  // User is authenticated but hasn't completed onboarding
  if (!profile) {
    redirect("/complete-profile")
  }

  console.log(profile)

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <DashboardHeader user={user} />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <GamerCard profile={profile} />
            <APGFAnnouncements />
          </div>

          <QuickActions profile={profile} />
        </div>
      </div>
    </main>
  )
}
