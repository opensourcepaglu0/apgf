import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

import { Background } from "@/components/onboarding/background"
import { Hero } from "@/components/onboarding/hero"
import { CompleteProfileForm } from "@/components/onboarding/complete-profile-form"

export default async function CompleteProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user?.id)
    .maybeSingle()

  if (profile) {
    redirect("/dashboard")
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950">
      <Background />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-start px-6 py-16">
        <div className="grid w-full gap-10 lg:grid-cols-5">
          <Hero />

          <div className="lg:col-span-3">
            <CompleteProfileForm user={user} />
          </div>
        </div>
      </div>
    </main>
  )
}
