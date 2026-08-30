import { notFound } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { PublicProfile } from "@/components/profile/public-profile"

type PageProps = {
  params: Promise<{
    username: string
  }>
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params

  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single()

  if (error || !profile) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-zinc-950 py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <PublicProfile profile={profile} />
      </div>
    </main>
  )
}
