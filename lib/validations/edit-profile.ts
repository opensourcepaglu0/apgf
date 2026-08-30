// lib/validations/complete-profile.ts

import { z } from "zod"

const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
] as const

export const editProfileSchema = z
  .object({
    avatar_url: z
      .string()
      .url("Enter a valid image URL.")
      .optional()
      .or(z.literal("")),

    banner_url: z
      .string()
      .url("Enter a valid image URL.")
      .optional()
      .or(z.literal("")),
      
      username: z.string() .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be 20 characters or less")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

    display_name: z
      .string()
      .min(2, "Display name must be at least 2 characters.")
      .max(40, "Display name must be under 40 characters.")
      .optional(),

    province: z.string().min(1, "Province required").optional(),

  city: z.string().min(1,"City required").optional(),

    bio: z
      .string()
      .max(300, "Bio must be under 300 characters.")
      .optional()
      .or(z.literal("")),

    main_game: z
      .string()
      .max(50, "Main game must be under 50 characters.")
      
      .or(z.literal("")),
      social_links: z
      .object({
        discord: z
          .string()
          .optional()
          .or(z.literal("")),

        youtube: z
          .string()
          .optional()
          .or(z.literal("")),

        instagram: z
          .string()
          .optional()
          .or(z.literal("")),

        tiktok: z
          .string()
          .optional()
          .or(z.literal("")),

        steam: z
          .string()
          .optional()
          .or(z.literal("")),

        x: z
          .string()
          .optional()
          .or(z.literal("")),

        twitch: z
          .string()
          .optional()
          .or(z.literal("")),
      })
      .default({
        discord: "",
        youtube: "",
        instagram: "",
        tiktok: "",
        steam: "",
        x: "",
        twitch: "",
      }),

    // Raw comma-separated string as typed in the input —
    // the server action splits/trims/filters this into an array.
    games: z
      .string()
      .max(200, "Games list is too long.")
      .optional()
      .or(z.literal("")),
  })
  // If both are being updated together, keep them paired — but this
  // only fires when BOTH are present in the same submission. If your
  // edit form always sends the full object (not just changed fields),
  // this catches "city sent without province" mismatches.
  .refine(
    (data) => !(data.city && !data.province),
    {
      message: "Select a province before choosing a city.",
      path: ["city"],
    }
  )

export type ProfileFormValues = z.infer<typeof editProfileSchema>