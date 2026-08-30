import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

import { AuthBackground } from "@/components/auth/auth-background"
import { AuthBrand } from "@/components/auth/auth-brand"
import { AuthCard } from "@/components/auth/auth-card"

export default async function SignInPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle()

    if (profile) {
      redirect("/dashboard")
    }

    redirect("/complete-profile")
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-6">
      <AuthBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <AuthBrand />

        <div className="flex justify-center lg:justify-end">
          <AuthCard />
        </div>
      </div>
    </main>
  )
}
