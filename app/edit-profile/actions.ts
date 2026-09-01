"use server"

import { createClient } from "@/lib/supabase/server"
import {
  editProfileSchema,
  ProfileFormValues,
} from "@/lib/validations/edit-profile"

function getStoragePath(url: string | null, bucket: string) {
  if (!url) return null

  try {
    const parsedUrl = new URL(url)
    const marker = `/storage/v1/object/public/${bucket}/`
    const index = parsedUrl.pathname.indexOf(marker)

    if (index === -1) return null

    return decodeURIComponent(
      parsedUrl.pathname.slice(index + marker.length)
    )
  } catch {
    return null
  }
}

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

  // Get the existing profile BEFORE updating it.
  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("avatar_url, banner_url")
    .eq("id", user.id)
    .single()

  if (profileError) {
    return {
      error: profileError.message,
    }
  }

  const oldAvatarUrl = existingProfile.avatar_url
  const oldBannerUrl = existingProfile.banner_url

  // Update the profile first.
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

  // Delete the old avatar only if it was replaced.
  if (oldAvatarUrl && oldAvatarUrl !== avatar_url) {
    const avatarPath = getStoragePath(oldAvatarUrl, "avatars")

    if (avatarPath) {
      await supabase.storage.from("avatars").remove([avatarPath])
    }
  }

  // Delete the old banner only if it was replaced.
  if (oldBannerUrl && oldBannerUrl !== banner_url) {
    const bannerPath = getStoragePath(oldBannerUrl, "banners")

    if (bannerPath) {
      await supabase.storage.from("banners").remove([bannerPath])
    }
  }

  return {
    success: true,
  }
}