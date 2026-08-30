"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"

import {
  editProfileSchema,
  ProfileFormValues,
} from "@/lib/validations/edit-profile"

import { updateProfile } from "@/app/edit-profile/actions"
import { checkUsername } from "@/app/complete-profile/actions"

import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase/client"

import { EditProfileFormProps } from "@/lib/types/profile"


// ==================================================
// Provinces
// ==================================================

const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
]


// ==================================================
// Cities
// ==================================================

const citiesByProvince: Record<string, string[]> = {
  Punjab: [
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Multan",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Sheikhupura",
    "Jhelum",
    "Gujrat",
    "Rahim Yar Khan",
    "Sahiwal",
    "Okara",
    "Dera Ghazi Khan",
    "Wah Cantonment",
    "Kasur",
    "Mianwali",
    "Attock",
    "Chakwal",
  ],

  Sindh: [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Nawabshah",
    "Mirpur Khas",
    "Jacobabad",
    "Shikarpur",
    "Thatta",
    "Khairpur",
  ],

  "Khyber Pakhtunkhwa": [
    "Peshawar",
    "Mardan",
    "Abbottabad",
    "Mingora",
    "Kohat",
    "Dera Ismail Khan",
    "Bannu",
    "Swat",
    "Nowshera",
    "Charsadda",
    "Mansehra",
    "Haripur",
  ],

  Balochistan: [
    "Quetta",
    "Gwadar",
    "Turbat",
    "Khuzdar",
    "Chaman",
    "Sibi",
    "Zhob",
    "Loralai",
    "Hub",
  ],

  "Islamabad Capital Territory": [
    "Islamabad",
  ],

  "Gilgit-Baltistan": [
    "Gilgit",
    "Skardu",
    "Chilas",
    "Hunza",
    "Ghizer",
    "Astore",
  ],

  "Azad Jammu & Kashmir": [
    "Muzaffarabad",
    "Mirpur",
    "Rawalakot",
    "Kotli",
    "Bagh",
    "Bhimber",
  ],
}


// ==================================================
// Component
// ==================================================

export function EditProfileForm({
  profile,
}: EditProfileFormProps) {

  const router = useRouter()


  // ==================================================
  // State
  // ==================================================

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle")


  // ==================================================
  // Image state
  // ==================================================

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)

  const [avatarPreview, setAvatarPreview] = useState(
    profile.avatar_url ?? ""
  )

  const [bannerPreview, setBannerPreview] = useState(
    profile.banner_url ?? ""
  )


  // ==================================================
  // Temporary object URLs
  // ==================================================

  const avatarObjectUrl = useRef<string | null>(null)
  const bannerObjectUrl = useRef<string | null>(null)


  // ==================================================
  // Form
  // ==================================================

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
      isValid,
    },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(editProfileSchema),

    mode: "onChange",

    defaultValues: {
      username: profile.username ?? "",

      display_name: profile.display_name ?? "",

      province: profile.province ?? "",

      city: profile.city ?? "",

      bio: profile.bio ?? "",

     games: Array.isArray(profile.games)
  ? profile.games.join(", ")
  : profile.games ?? "",

      main_game: profile.main_game ?? "",

      avatar_url: profile.avatar_url ?? "",

      banner_url: profile.banner_url ?? "",

      social_links: profile.social_links ?? {
        discord: "",
        youtube: "",
        instagram: "",
        tiktok: "",
        steam: "",
        x: "",
        twitch: "",
      },
    },
  })


  // ==================================================
  // Watch values
  // ==================================================

  const username = watch("username")

  const selectedProvince = watch("province")

  const selectedCity = watch("city")


  // ==================================================
  // Username availability
  // ==================================================

  useEffect(() => {

    const normalizedUsername =
      username?.trim().toLowerCase() || ""

    const currentUsername =
      profile.username?.trim().toLowerCase() || ""


    // ----------------------------------------------
    // Empty username
    // ----------------------------------------------

    if (!normalizedUsername) {

      setUsernameStatus("idle")

      return
    }


    // ----------------------------------------------
    // Same username as current profile
    //
    // IMPORTANT:
    // No database request is needed.
    // ----------------------------------------------

    if (
      normalizedUsername === currentUsername
    ) {

      setUsernameStatus("available")

      return
    }


    // ----------------------------------------------
    // Invalid username
    // ----------------------------------------------

    if (
      normalizedUsername.length < 3 ||
      normalizedUsername.length > 20 ||
      !/^[a-zA-Z0-9_]+$/.test(
        normalizedUsername
      )
    ) {

      setUsernameStatus("idle")

      return
    }


    // ----------------------------------------------
    // New username
    // ----------------------------------------------

    setUsernameStatus("checking")


    const timer = setTimeout(
      async () => {

        try {

          const result =
            await checkUsername(
              normalizedUsername
            )


          if (result.error) {

            setUsernameStatus("idle")

            return
          }


          if (result.available) {

            setUsernameStatus("available")

          } else {

            setUsernameStatus("taken")
          }

        } catch (error) {

          console.error(
            "Username check failed:",
            error
          )

          setUsernameStatus("idle")
        }

      },
      500
    )


    return () => clearTimeout(timer)

  }, [
    username,
    profile.username,
  ])


  // ==================================================
  // Cities
  // ==================================================

  const cities =
    selectedProvince
      ? citiesByProvince[selectedProvince] ?? []
      : []


  // ==================================================
  // Upload image
  //
  // ONLY called during Save Changes.
  // ==================================================

  async function uploadImage(
    file: File,
    bucket: "avatars" | "banners"
  ) {

    const {
      data: {
        user,
      },
      error: userError,
    } =
      await supabase.auth.getUser()


    if (
      userError ||
      !user
    ) {

      throw new Error(
        "User is not authenticated."
      )
    }


    const fileExt =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() || "jpg"


    const filePath =
      `${user.id}/${crypto.randomUUID()}.${fileExt}`


    const {
      error: uploadError,
    } =
      await supabase.storage
        .from(bucket)
        .upload(
          filePath,
          file,
          {
            cacheControl: "3600",
            upsert: false,
          }
        )


    if (uploadError) {

      throw uploadError
    }


    const {
      data,
    } =
      supabase.storage
        .from(bucket)
        .getPublicUrl(
          filePath
        )


    if (
      !data?.publicUrl
    ) {

      throw new Error(
        `Unable to generate ${bucket} URL.`
      )
    }


    return data.publicUrl
  }


  // ==================================================
  // Avatar selection
  //
  // LOCAL PREVIEW ONLY
  // ==================================================

  function handleAvatarSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0]


    if (!file) {

      return
    }


    // Validate image

    if (
      !file.type.startsWith("image/")
    ) {

      toast.add({
        type: "error",
        description:
          "Please select a valid image.",
      })

      event.target.value = ""

      return
    }


    // Remove previous object URL

    if (
      avatarObjectUrl.current
    ) {

      URL.revokeObjectURL(
        avatarObjectUrl.current
      )
    }


    // Create local preview

    const previewUrl =
      URL.createObjectURL(file)


    avatarObjectUrl.current =
      previewUrl


    setAvatarFile(file)

    setAvatarPreview(
      previewUrl
    )
  }


  // ==================================================
  // Banner selection
  //
  // LOCAL PREVIEW ONLY
  // ==================================================

  function handleBannerSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0]


    if (!file) {

      return
    }


    // Validate image

    if (
      !file.type.startsWith("image/")
    ) {

      toast.add({
        type: "error",
        description:
          "Please select a valid image.",
      })

      event.target.value = ""

      return
    }


    // Remove previous object URL

    if (
      bannerObjectUrl.current
    ) {

      URL.revokeObjectURL(
        bannerObjectUrl.current
      )
    }


    // Create local preview

    const previewUrl =
      URL.createObjectURL(file)


    bannerObjectUrl.current =
      previewUrl


    setBannerFile(file)

    setBannerPreview(
      previewUrl
    )
  }


  // ==================================================
  // Submit
  // ==================================================

  async function onSubmit(
    data: ProfileFormValues
  ) {

    if (loading) {

      return
    }


    // ----------------------------------------------
    // Final username safety check
    // ----------------------------------------------

    if (
      usernameStatus !== "available"
    ) {

      toast.add({
        type: "error",
        description:
          "Please enter an available username.",
      })

      return
    }


    try {

      setLoading(true)

      setError("")


      // ----------------------------------------------
      // Start with existing URLs
      //
      // If user didn't select a new image,
      // these remain unchanged.
      // ----------------------------------------------

      let avatarUrl =
        profile.avatar_url ?? ""

      let bannerUrl =
        profile.banner_url ?? ""


      // ----------------------------------------------
      // Upload NEW avatar
      //
      // Only happens if user selected one.
      // ----------------------------------------------

      if (avatarFile) {

        avatarUrl =
          await uploadImage(
            avatarFile,
            "avatars"
          )
      }


      // ----------------------------------------------
      // Upload NEW banner
      //
      // Only happens if user selected one.
      // ----------------------------------------------

      if (bannerFile) {

        bannerUrl =
          await uploadImage(
            bannerFile,
            "banners"
          )
      }


      // ----------------------------------------------
      // Normalize username
      // ----------------------------------------------

      const normalizedData = {
        ...data,

        username:
          data.username
            .trim()
            .toLowerCase(),

        avatar_url:
          avatarUrl,

        banner_url:
          bannerUrl,
      }


      // ----------------------------------------------
      // Update database
      //
      // This happens AFTER image uploads.
      // ----------------------------------------------

      const result =
        await updateProfile(
          normalizedData
        )


      // ----------------------------------------------
      // Server error
      // ----------------------------------------------

      if (result?.error) {

        toast.add({
          type: "error",
          description:
            result.error,
        })

        setError(
          result.error
        )

        return
      }


      // ----------------------------------------------
      // Success
      // ----------------------------------------------

      toast.add({
        type: "success",
        description:
          "Profile updated successfully!",
      })


      // ----------------------------------------------
      // Cleanup temporary URLs
      // ----------------------------------------------

      if (
        avatarObjectUrl.current
      ) {

        URL.revokeObjectURL(
          avatarObjectUrl.current
        )

        avatarObjectUrl.current = null
      }


      if (
        bannerObjectUrl.current
      ) {

        URL.revokeObjectURL(
          bannerObjectUrl.current
        )

        bannerObjectUrl.current = null
      }


      setAvatarFile(null)

      setBannerFile(null)


      // ----------------------------------------------
      // Go to dashboard
      // ----------------------------------------------

      router.replace(
        "/dashboard"
      )

    } catch (error) {

      console.error(
        "Profile update failed:",
        error
      )


      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while updating your profile."


      toast.add({
        type: "error",
        description:
          message,
      })


      setError(message)

    } finally {

      setLoading(false)
    }
  }


  // ==================================================
  // Cleanup object URLs on unmount
  // ==================================================

  useEffect(() => {

    return () => {

      if (
        avatarObjectUrl.current
      ) {

        URL.revokeObjectURL(
          avatarObjectUrl.current
        )
      }


      if (
        bannerObjectUrl.current
      ) {

        URL.revokeObjectURL(
          bannerObjectUrl.current
        )
      }
    }

  }, [])


  // ==================================================
  // UI
  // ==================================================

  return (

    <Card
      className="
        rounded-3xl
        border-zinc-800
        bg-zinc-900/80
        shadow-2xl
        backdrop-blur-xl
      "
    >

      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <CardHeader>

        <CardTitle className="text-3xl text-white">
          Edit Profile
        </CardTitle>

        <CardDescription>
          Keep your APGF identity up to date.
        </CardDescription>

      </CardHeader>


      {/* ================================================= */}
      {/* Content */}
      {/* ================================================= */}

      <CardContent>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >

          {/* ================================================= */}
          {/* Federation Identity */}
          {/* ================================================= */}

          <section className="space-y-6">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Federation Identity
              </h3>

              <p className="text-sm text-zinc-400">
                These values identify your APGF account.
              </p>

            </div>


            <div className="grid gap-5 md:grid-cols-2">

              {/* APGF ID */}

              <div className="space-y-2">

                <Label>
                  APGF ID
                </Label>

                <Input
                  value={profile.apgf_id}
                  disabled
                  className="
                    h-12
                    rounded-xl
                    border-zinc-700
                    bg-zinc-950
                    text-zinc-400
                    opacity-80
                  "
                />

              </div>


              {/* Username */}

              <div className="space-y-2">

                <Label>
                  Username
                </Label>

                <Input
                  {...register("username")}
                  disabled={loading}
                  className="
                    h-12
                    rounded-xl
                    border-zinc-700
                    bg-zinc-950
                    text-zinc-300
                  "
                />


                <div className="flex items-center justify-between gap-3">

                  <p className="truncate text-xs text-zinc-500">
                    apgf.pk/u/{username || "username"}
                  </p>


                  {usernameStatus === "checking" && (

                    <p className="shrink-0 text-xs text-zinc-400">
                      Checking...
                    </p>

                  )}


                  {usernameStatus === "available" && (

                    <p className="shrink-0 text-xs font-medium text-emerald-400">
                      ✓ Available
                    </p>

                  )}


                  {usernameStatus === "taken" && (

                    <p className="shrink-0 text-xs font-medium text-red-400">
                      ✕ Already taken
                    </p>

                  )}

                </div>


                {errors.username && (

                  <p className="text-xs text-red-400">
                    {errors.username.message}
                  </p>

                )}

              </div>

            </div>

          </section>


          <Separator />


          {/* ================================================= */}
          {/* Gamer Card Appearance */}
          {/* ================================================= */}

          <section className="space-y-6">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Gamer Card Appearance
              </h3>

              <p className="text-sm text-zinc-400">
                Choose your avatar and banner.
              </p>

            </div>


            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-zinc-800
                bg-gradient-to-br
                from-zinc-900
                via-zinc-950
                to-black
              "
            >

              {/* Banner */}

              <div
                className="
                  relative
                  h-48
                  w-full
                  overflow-hidden
                  bg-gradient-to-r
                  from-emerald-500/20
                  via-green-400/10
                  to-transparent
                "
              >

                {bannerPreview ? (

                  <img
                    src={bannerPreview}
                    alt="Profile banner"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                ) : (

                  <div
                    className="
                      flex
                      h-full
                      items-center
                      justify-center
                      text-sm
                      text-zinc-500
                    "
                  >
                    No banner selected
                  </div>

                )}


                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-zinc-950
                    via-transparent
                    to-transparent
                  "
                />

              </div>


              {/* Avatar */}

              <div
                className="
                  relative
                  flex
                  flex-col
                  gap-6
                  p-6
                  sm:flex-row
                  sm:items-center
                "
              >

                <div
                  className="
                    relative
                    -mt-16
                    h-32
                    w-32
                    shrink-0
                    overflow-hidden
                    rounded-full
                    border-4
                    border-zinc-950
                    bg-zinc-900
                    shadow-2xl
                  "
                >

                  {avatarPreview ? (

                    <img
                      src={avatarPreview}
                      alt="Profile avatar"
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                  ) : (

                    <div
                      className="
                        flex
                        h-full
                        items-center
                        justify-center
                        text-xs
                        text-zinc-500
                      "
                    >
                      No Avatar
                    </div>

                  )}

                </div>


                <div className="flex-1 space-y-4">

                  <div>

                    <h4 className="font-semibold text-white">
                      Profile Avatar
                    </h4>

                    <p className="text-sm text-zinc-500">
                      The image is only uploaded when you
                      save your profile.
                    </p>

                  </div>


                  <Input
                    type="file"
                    accept="image/*"
                    disabled={loading}
                    onChange={handleAvatarSelect}
                    className="
                      h-12
                      rounded-xl
                      border-zinc-700
                      bg-zinc-950
                      text-zinc-300
                    "
                  />

                </div>

              </div>


              {/* Banner upload */}

              <div
                className="
                  space-y-4
                  border-t
                  border-zinc-800
                  p-6
                "
              >

                <div>

                  <h4 className="font-semibold text-white">
                    Profile Banner
                  </h4>

                  <p className="text-sm text-zinc-500">
                    Recommended: 1200 × 400. The image is
                    only uploaded when you save.
                  </p>

                </div>


                <Input
                  type="file"
                  accept="image/*"
                  disabled={loading}
                  onChange={handleBannerSelect}
                  className="
                    h-12
                    rounded-xl
                    border-zinc-700
                    bg-zinc-950
                    text-zinc-300
                  "
                />

              </div>

            </div>

          </section>


          <Separator />


          {/* ================================================= */}
          {/* Public Profile */}
          {/* ================================================= */}

          <section className="space-y-6">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Public Profile
              </h3>

              <p className="text-sm text-zinc-400">
                This information appears on your Gamer Card.
              </p>

            </div>


            <div className="space-y-2">

              <Label>
                Display Name
              </Label>

              <Input
                {...register("display_name")}
                disabled={loading}
                className="
                  h-12
                  rounded-xl
                  bg-zinc-950
                "
              />


              {errors.display_name && (

                <p className="text-xs text-red-400">
                  {errors.display_name.message}
                </p>

              )}

            </div>

          </section>


          <Separator />


          {/* ================================================= */}
          {/* Location */}
          {/* ================================================= */}

          <section className="space-y-6">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Location
              </h3>

              <p className="text-sm text-zinc-400">
                Help nearby gamers discover your profile.
              </p>

            </div>


            <div className="grid gap-5 md:grid-cols-2">

              {/* Province */}

              <div className="space-y-2">

                <Label>
                  Province
                </Label>


                <Select
                  value={selectedProvince}
                  disabled={loading}
                  onValueChange={(value) => {

                    setValue(
                      "province",
                      value,
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      }
                    )


                    setValue(
                      "city",
                      "",
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      }
                    )

                  }}
                >

                  <SelectTrigger
                    className="
                      h-12
                      rounded-xl
                      bg-zinc-950
                    "
                  >

                    <SelectValue
                      placeholder="Choose Province"
                    />

                  </SelectTrigger>


                  <SelectContent>

                    {provinces.map(
                      (province) => (

                        <SelectItem
                          key={province}
                          value={province}
                        >
                          {province}
                        </SelectItem>

                      )
                    )}

                  </SelectContent>

                </Select>


                {errors.province && (

                  <p className="text-xs text-red-400">
                    {errors.province.message}
                  </p>

                )}

              </div>


              {/* City */}

              <div className="space-y-2">

                <Label>
                  City
                </Label>


                <Select
                  value={selectedCity || ""}
                  disabled={
                    loading ||
                    !selectedProvince
                  }
                  onValueChange={(value) => {

                    setValue(
                      "city",
                      value,
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      }
                    )

                  }}
                >

                  <SelectTrigger
                    className="
                      h-12
                      rounded-xl
                      bg-zinc-950
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >

                    <SelectValue
                      placeholder={
                        selectedProvince
                          ? "Choose City"
                          : "Choose Province first"
                      }
                    />

                  </SelectTrigger>


                  <SelectContent>

                    {cities.map(
                      (city) => (

                        <SelectItem
                          key={city}
                          value={city}
                        >
                          {city}
                        </SelectItem>

                      )
                    )}

                  </SelectContent>

                </Select>


                {errors.city && (

                  <p className="text-xs text-red-400">
                    {errors.city.message}
                  </p>

                )}

              </div>

            </div>

          </section>


          <Separator />


          {/* ================================================= */}
          {/* Gamer Profile */}
          {/* ================================================= */}

          <section className="space-y-6">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Gamer Profile
              </h3>

              <p className="text-sm text-zinc-400">
                Tell the community about yourself.
              </p>

            </div>


            {/* Bio */}

            <div className="space-y-2">

              <Label>
                Bio
              </Label>

              <Textarea
                rows={5}
                {...register("bio")}
                disabled={loading}
                className="
                  resize-none
                  rounded-xl
                  bg-zinc-950
                "
                placeholder="Tell Pakistan's gaming community about yourself..."
              />


              {errors.bio && (

                <p className="text-xs text-red-400">
                  {errors.bio.message}
                </p>

              )}

            </div>


            {/* Main Game */}

            <div className="space-y-2">

              <Label>
                Main Game
              </Label>

              <Input
                {...register("main_game")}
                disabled={loading}
                className="
                  h-12
                  rounded-xl
                  bg-zinc-950
                "
                placeholder="Enter your signature game"
              />


              {errors.main_game && (

                <p className="text-xs text-red-400">
                  {errors.main_game.message}
                </p>

              )}

            </div>


            {/* Games */}

            <div className="space-y-2">

              <Label>
                Games
              </Label>

              <Input
                {...register("games")}
                disabled={loading}
                className="
                  h-12
                  rounded-xl
                  bg-zinc-950
                "
                placeholder="Valorant, CS2, PUBG Mobile"
              />

              <p className="text-xs text-zinc-500">
                Separate games with commas.
              </p>


              {errors.games && (

                <p className="text-xs text-red-400">
                  {errors.games.message}
                </p>

              )}

            </div>


            {/* Steam */}

            <div className="space-y-2">

              <Label>
                Steam Profile
              </Label>

              <Input
                {...register(
                  "social_links.steam"
                )}
                disabled={loading}
                className="
                  h-12
                  rounded-xl
                  bg-zinc-950
                "
                placeholder="https://steamcommunity.com/id/username"
              />

            </div>

          </section>


          <Separator />


          {/* ================================================= */}
          {/* Social Links */}
          {/* ================================================= */}

          <section className="space-y-6">

            <div>

              <h3 className="text-lg font-semibold text-white">
                Social Links
              </h3>

              <p className="text-sm text-zinc-400">
                Connect your gaming and social profiles.
              </p>

            </div>


            <div
              className="
                grid
                gap-6
                sm:grid-cols-2
              "
            >

              {/* Instagram */}

              <div className="space-y-2">

                <Label>
                  Instagram
                </Label>

                <Input
                  {...register(
                    "social_links.instagram"
                  )}
                  disabled={loading}
                  className="
                    h-12
                    rounded-xl
                    bg-zinc-950
                  "
                  placeholder="https://www.instagram.com/username"
                />

              </div>


              {/* TikTok */}

              <div className="space-y-2">

                <Label>
                  TikTok
                </Label>

                <Input
                  {...register(
                    "social_links.tiktok"
                  )}
                  disabled={loading}
                  className="
                    h-12
                    rounded-xl
                    bg-zinc-950
                  "
                  placeholder="https://www.tiktok.com/@username"
                />

              </div>


              {/* X */}

              <div className="space-y-2">

                <Label>
                  X
                </Label>

                <Input
                  {...register(
                    "social_links.x"
                  )}
                  disabled={loading}
                  className="
                    h-12
                    rounded-xl
                    bg-zinc-950
                  "
                  placeholder="https://x.com/username"
                />

              </div>


              {/* YouTube */}

              <div className="space-y-2">

                <Label>
                  YouTube
                </Label>

                <Input
                  {...register(
                    "social_links.youtube"
                  )}
                  disabled={loading}
                  className="
                    h-12
                    rounded-xl
                    bg-zinc-950
                  "
                  placeholder="https://youtube.com/@username"
                />

              </div>


              {/* Twitch */}

              <div className="space-y-2">

                <Label>
                  Twitch
                </Label>

                <Input
                  {...register(
                    "social_links.twitch"
                  )}
                  disabled={loading}
                  className="
                    h-12
                    rounded-xl
                    bg-zinc-950
                  "
                  placeholder="https://twitch.tv/username"
                />

              </div>


              {/* Discord */}

              <div className="space-y-2">

                <Label>
                  Discord
                </Label>

                <Input
                  {...register(
                    "social_links.discord"
                  )}
                  disabled={loading}
                  className="
                    h-12
                    rounded-xl
                    bg-zinc-950
                  "
                  placeholder="Discord username"
                />

              </div>

            </div>

          </section>


          <Separator />


          {/* ================================================= */}
          {/* Profile Status */}
          {/* ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-950/40
              p-5
            "
          >

            <h3 className="font-semibold text-white">
              Profile Status
            </h3>

            <p
              className="
                mt-2
                text-sm
                text-zinc-400
              "
            >
              Your APGF profile is active. Changes are
              reflected across your Gamer Card and public profile.
            </p>

          </div>


          {/* ================================================= */}
          {/* Error */}
          {/* ================================================= */}

          {error && (

            <div
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                p-4
                text-sm
                text-red-400
              "
            >
              {error}
            </div>

          )}


          {/* ================================================= */}
          {/* Actions */}
          {/* ================================================= */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              sm:flex-row
              sm:justify-end
            "
          >

            {/* Cancel */}

            <Button
              type="button"
              variant="outline"
              disabled={loading}
              className="
                border-zinc-700
                bg-zinc-900
                hover:bg-zinc-800
              "
              onClick={() =>
                window.history.back()
              }
            >
              Cancel
            </Button>


            {/* Save */}

            <Button
              type="submit"
              disabled={
                loading ||
               
                usernameStatus !== "available"
              }
              className="
                h-12
                min-w-[180px]
                rounded-xl
                bg-gradient-to-r
                from-emerald-500
                to-green-400
                font-semibold
                text-black
                transition-all
                hover:scale-[1.02]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading
                ? "Saving Changes..."
                : usernameStatus === "checking"
                  ? "Checking Username..."
                  : "Save Changes"}

            </Button>

          </div>

        </form>

      </CardContent>

    </Card>
  )
}