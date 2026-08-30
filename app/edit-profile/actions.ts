"use server"

import { createClient } from "@/lib/supabase/server"
import { editProfileSchema, ProfileFormValues } from "@/lib/validations/edit-profile"

export async function updateProfile(data: ProfileFormValues) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      error: "Unauthorized",
    }
  }

  const validated = editProfileSchema.safeParse(data)

  if (!validated.success) {
    return {
      error: "Invalid form data.",
    }
  }

  const {

    avatar_url,
    
    banner_url,
    username,
    display_name,
    province,
    city,
    bio,
    main_game,
    social_links,
    games,
  } = validated.data

  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      avatar_url,
      banner_url,
      display_name,
      province,
      city,
      bio,
      main_game,
      social_links: social_links ?? {},
      games: games
        ? games
            .split(",")
            .map((game) => game.trim())
            .filter(Boolean)
        : [],
    })
    .eq("id", user.id)
    .select()
    .single()

  if (error) {
    return {
      error: error.message,
    }
  }

  return {
    success: true,
  }
}
