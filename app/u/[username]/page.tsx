import { notFound } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { PublicProfile } from "@/components/profile/public-profile"
import { APGFBackground } from "@/components/motion/apgf-background";

type PageProps = {
  params: Promise<{
    username: string
  }>
}

export default async function PublicProfilePage({
  params,
}: PageProps) {
  const { username } = await params

  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .eq("is_public", true)
    .single()

  if (error || !profile) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <APGFBackground glow cursorGlow intensity="subtle" grid />
      <PublicProfile profile={profile} />
    </main>
  )
}