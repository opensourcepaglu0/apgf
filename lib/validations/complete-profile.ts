import { z } from "zod"

export const completeProfileSchema = z.object({
  username: z.string() .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be 20 characters or less")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  display_name: z.string().min(2, "Display name required"),

  province: z.string().min(1, "Province required"),

  city: z.string().min(1,"City required"),


})


export type   ProfileFormValues = z.infer<typeof completeProfileSchema>
