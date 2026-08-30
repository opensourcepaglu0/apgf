"use server"

import { createClient } from "@/lib/supabase/server"
import { completeProfileSchema } from "@/lib/validations/complete-profile"
import { redirect } from "next/navigation"

export async function createProfile(values: unknown) {
  const validated = completeProfileSchema.safeParse(values)

  if (!validated.success) {
    return {
      error: "Invalid data",
    }
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      error: "Not authenticated",
    }
  }

  const { username, display_name, province, city } = validated.data

  const { error } = await supabase.from("profiles").insert({
    id: user.id,

    username,

    display_name,
    avatar_url: user.user_metadata.avatar_url,

    province,

    city,

    
  })

  if (error) {
    console.log(error)

    return {
      error: error.message,
    }
  }

  redirect("/dashboard")
}

export async function checkUsername(username: string) {
  const normalizedUsername = username.trim().toLowerCase()

  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return {
      available: false,
      error: "Not authenticated",
    }
  }

  const { data: existingProfile, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", normalizedUsername)
    .maybeSingle()

  if (error) {
    return {
      available: false,
      error: error.message,
    }
  }

  return {
    available: !existingProfile,
  }
}