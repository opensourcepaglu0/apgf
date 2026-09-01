
"use server"

import { createClient } from "@/lib/supabase/server"

const PAGE_SIZE = 12

type ExploreParams = {
  page?: number
  search?: string
  province?: string
  city?: string
}

// Escape characters that have special meaning
// inside a PostgREST filter expression.
function sanitizeSearch(value: string) {
  return value
    .trim()
    .replace(/[%_,.()]/g, "")
    .replace(/[{}]/g, "")
}

export async function getExploreProfiles({
  page = 1,
  search = "",
  province = "",
  city = "",
}: ExploreParams) {
  const supabase = await createClient()

  const currentPage = Math.max(1, page)
  const from = (currentPage - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  try {
    let query = supabase
      .from("profiles")
      .select(
        `
          id,
          apgf_id,
          username,
          display_name,
          avatar_url,
          banner_url,
          bio,
          province,
          city,
          games,
          main_game,
          social_links,
          is_public,
          is_verified,
          created_at
        `,
        { count: "exact" }
      )
      .eq("is_public", true)

    // ==================================================
    // Search
    // ==================================================

    const sanitizedSearch = sanitizeSearch(search)

    if (sanitizedSearch) {
      query = query.or(
        `username.ilike.%${sanitizedSearch}%,display_name.ilike.%${sanitizedSearch}%,apgf_id.ilike.%${sanitizedSearch}%`
      )
    }

    // ==================================================
    // Province
    // ==================================================

    if (province) {
      query = query.eq("province", province)
    }

    // ==================================================
    // City
    // ==================================================

    if (city) {
      query = query.eq("city", city)
    }

    // ==================================================
    // Execute
    // ==================================================

    const {
      data,
      error,
      count,
    } = await query
      .order("created_at", { ascending: false })
      .range(from, to)

    if (error) {
      console.error(
        "Explore profiles error:",
        error
      )

      return {
        success: false,
        profiles: [],
        total: 0,
        totalPages: 0,
        error: error.message,
      }
    }

    const total = count ?? 0

    return {
      success: true,
      profiles: data ?? [],
      total,
      totalPages: Math.ceil(
        total / PAGE_SIZE
      ),
      error: null,
    }
  } catch (error) {
    console.error(
      "Explore profiles exception:",
      error
    )

    return {
      success: false,
      profiles: [],
      total: 0,
      totalPages: 0,
      error: "Unable to load profiles.",
    }
  }
}

