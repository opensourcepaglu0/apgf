import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

import { EditProfileForm } from "@/components/profile/edit-profile-form"

export default async function EditProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single()

  if (!profile) {
    redirect("/complete-profile")
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <EditProfileForm profile={profile} />
      </div>
    </main>
  )
}
