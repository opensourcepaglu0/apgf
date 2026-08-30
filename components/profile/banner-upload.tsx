"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import { uploadImage } from "@/lib/supabase/storage"

import { updateProfileMedia } from "@/app/edit-profile/actions"

import { toast } from "@/components/ui/toast"

type BannerUploadProps = {
  userId: string
  bannerUrl: string | null
}

export function BannerUpload({ userId, bannerUrl }: BannerUploadProps) {
  const [image, setImage] = useState(bannerUrl)

  const [loading, setLoading] = useState(false)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setLoading(true)

      const url = await uploadImage(file, "banners", userId)

      const result = await updateProfileMedia({
        banner_url: url,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      setImage(url)

      toast.add({
        type: "success",
        description: "Banner updated successfully",
      })
    } catch {
      toast.add({
        type: "error",
        description: "Banner upload failed",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className="h-36 rounded-2xl border border-zinc-800 bg-zinc-950 bg-cover bg-center"
        style={{
          backgroundImage: image ? `url(${image})` : undefined,
        }}
      />

      <label>
        <Button asChild disabled={loading}>
          <span>{loading ? "Uploading..." : "Change Banner"}</span>
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
