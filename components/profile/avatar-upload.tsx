"use client"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

import { uploadImage } from "@/lib/supabase/storage"
import { updateProfileMedia } from "@/app/edit-profile/actions"

import { toast } from "@/components/ui/toast"

type AvatarUploadProps = {
  userId: string
  avatarUrl: string | null
}

export function AvatarUpload({ userId, avatarUrl }: AvatarUploadProps) {
  const [image, setImage] = useState(avatarUrl)
  const [loading, setLoading] = useState(false)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setLoading(true)

      const url = await uploadImage(file, "avatars", userId)

      const result = await updateProfileMedia({
        avatar_url: url,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      setImage(url)

      toast.add({
        type: "success",
        description: "Avatar updated successfully",
      })
    } catch (error) {
      toast.add({
        type: "error",
        description: "Avatar upload failed",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Avatar className="h-28 w-28 border-4 border-zinc-900">
        <AvatarImage src={image ?? ""} />

        <AvatarFallback>AP</AvatarFallback>
      </Avatar>

      <label>
        <Button asChild disabled={loading}>
          <span>{loading ? "Uploading..." : "Change Avatar"}</span>
        </Button>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </label>
    </div>
  )
}
