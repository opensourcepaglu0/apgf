import { supabase } from "@/lib/supabase/client"

export async function uploadImage(
  file: File,
  bucket: "avatars" | "banners",
  userId: string
) {
  const fileExtension = file.name.split(".").pop()

  const fileName = `${Date.now()}.${fileExtension}`

  const filePath = `${userId}/${fileName}`

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
  })

  if (error) {
    throw error
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

  return data.publicUrl
}
