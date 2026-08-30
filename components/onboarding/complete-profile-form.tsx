"use client"

import { useEffect, useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"

import { completeProfileSchema, ProfileFormValues } from "@/lib/validations/complete-profile"

import { createProfile, checkUsername } from "@/app/complete-profile/actions"

import { toast } from "../ui/toast"

// --------------------------------------------------
// Provinces
// --------------------------------------------------

const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
]

// --------------------------------------------------
// Cities
// --------------------------------------------------

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

  "Islamabad Capital Territory": ["Islamabad"],

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

// --------------------------------------------------
// Component
// --------------------------------------------------

export function CompleteProfileForm({ user }: { user: any }) {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [selectedProvince, setSelectedProvince] = useState("")

  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle")

  // --------------------------------------------------
  // Form
  // --------------------------------------------------

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    mode: "onChange",

    defaultValues: {
      username: "",
      display_name: "",
      province: "",
      city: "",
      
    },
  })

  // --------------------------------------------------
  // Watch username
  // --------------------------------------------------

  const username = watch("username")

  // --------------------------------------------------
  // Check username availability
  // --------------------------------------------------

  useEffect(() => {
    const normalizedUsername = username?.trim().toLowerCase() || ""

    // Empty username
    if (!normalizedUsername) {
      setUsernameStatus("idle")
      return
    }

    // Don't check usernames that are
    // already invalid
    if (
      normalizedUsername.length < 3 ||
      normalizedUsername.length > 20 ||
      !/^[a-zA-Z0-9_]+$/.test(normalizedUsername)
    ) {
      setUsernameStatus("idle")
      return
    }

    setUsernameStatus("checking")

    const timer = setTimeout(async () => {
      try {
        const result = await checkUsername(normalizedUsername)

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
        console.error("Username check failed:", error)

        setUsernameStatus("idle")
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [username])

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  async function onSubmit(data: ProfileFormValues) {
    // Don't allow submission while username
    // is being checked
    // if (usernameStatus === "checking") {
    //   toast.add({
    //     type: "error",
    //     description: "Please wait while we check your username.",
    //   })

    //   return
    // }

    // // Don't allow unavailable username
    // if (usernameStatus === "taken") {
    //   toast.add({
    //     type: "error",
    //     description: "Please choose a different username.",
    //   })

    //   return
    // }

    // // Safety check
    // if (usernameStatus !== "available") {
    //   toast.add({
    //     type: "error",
    //     description: "Please enter a valid available username.",
    //   })

    //   return
    // }

    setLoading(true)
    setError("")

    // Normalize username before sending it
    // to the Server Action
    const normalizedData = {
      ...data,
      username: data.username.trim().toLowerCase(),
    }

    const result = await createProfile(normalizedData)

    if (result?.error) {
      toast.add({
        type: "error",
        description: result.error,
      })

      setError(result.error)
      setLoading(false)

      return
    }

    toast.add({
      type: "success",
      description: "Gamer Card has been created",
    })

    setLoading(false)
  }

  // --------------------------------------------------
  // Current cities
  // --------------------------------------------------

  const cities = selectedProvince
    ? citiesByProvince[selectedProvince] || []
    : []

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <Card className="rounded-3xl border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">
      {/* --------------------------------------------- */}
      {/* Header */}
      {/* --------------------------------------------- */}

      <CardHeader>
        <CardTitle className="text-3xl text-white">
          Complete your profile
        </CardTitle>

        <CardDescription>
          This information creates your APGF Gamer Card.
        </CardDescription>
      </CardHeader>

      {/* --------------------------------------------- */}
      {/* Content */}
      {/* --------------------------------------------- */}

      <CardContent className="space-y-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ========================================= */}
          {/* Identity */}
          {/* ========================================= */}

          <section className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Identity</h3>

              <p className="text-sm text-zinc-400">
                Your public federation profile.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* ------------------------------------- */}
              {/* Username */}
              {/* ------------------------------------- */}

              <div className="space-y-2">
                <Label>Username</Label>

                <Input
                  placeholder="paglu"
                  {...register("username")}
                  className="h-12 rounded-xl bg-zinc-950"
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

              {/* ------------------------------------- */}
              {/* Display Name */}
              {/* ------------------------------------- */}

              <div className="space-y-2">
                <Label>Display Name</Label>

                <Input
                  placeholder="Muhammad Ali"
                  {...register("display_name")}
                  className="h-12 rounded-xl bg-zinc-950"
                />

                {errors.display_name && (
                  <p className="text-xs text-red-400">
                    {errors.display_name.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          <Separator />

          {/* ========================================= */}
          {/* Location */}
          {/* ========================================= */}

          <section className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Location</h3>

              <p className="text-sm text-zinc-400">
                Helps gamers near you discover your profile.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* ------------------------------------- */}
              {/* Province */}
              {/* ------------------------------------- */}

              <div className="space-y-2">
                <Label>Province</Label>

                <Select
                  value={selectedProvince}
                
                  onValueChange={(value) => {
                    setSelectedProvince(value)

                    setValue("province", value, {
                      shouldValidate: true,
                    })

                    // Reset city whenever province changes

                    setValue("city", "", {
                      shouldValidate: true,
                    })
                  }}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-zinc-950 px-4">
                    <SelectValue placeholder="Choose Province" />
                  </SelectTrigger>

                  <SelectContent className="max-h-80 min-w-[300px] p-1">
                    {provinces.map((province) => (
                      <SelectItem
                        key={province}
                        value={province}
                        className="cursor-pointer rounded-lg px-3 py-2.5 pr-8 leading-5"
                      >
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.province && (
                  <p className="text-xs text-red-400">
                    {errors.province.message}
                  </p>
                )}
              </div>

              {/* ------------------------------------- */}
              {/* City */}
              {/* ------------------------------------- */}

              <div className="space-y-2">
                <Label>City</Label>

                <Select
                  value={watch("city")}
                  onValueChange={(value) =>
                    setValue("city", value, {
                      shouldValidate: true,
                    })
                  }
                  disabled={!selectedProvince}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-zinc-950 px-4 disabled:cursor-not-allowed disabled:opacity-50">
                    <SelectValue
                      placeholder={
                        selectedProvince
                          ? "Choose City"
                          : "Choose Province first"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent className="max-h-80 min-w-[260px] p-1">
                    {cities.map((city) => (
                      <SelectItem
                        key={city}
                        value={city}
                        className="cursor-pointer rounded-lg px-3 py-2.5 pr-8 leading-5"
                      >
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.city && (
                  <p className="text-xs text-red-400">{errors.city.message}</p>
                )}
              </div>
            </div>
          </section>

          <Separator />

          {/* ========================================= */}
          {/* Gamer Profile */}
          {/* ========================================= */}

          {/*
          <section className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-white">
                Gamer Profile
              </h3>

              <p className="text-sm text-zinc-400">
                Tell the community who you are.
              </p>
            </div>


            <div className="space-y-2">

              <Label>
                Bio
              </Label>

              <Textarea
                rows={4}
                placeholder="Competitive Valorant player from Karachi..."
                {...register("bio")}
                className="resize-none rounded-xl bg-zinc-950"
              />

            </div>


            <div className="space-y-2">

              <Label>
                Main gamer
              </Label>

              <Input
                placeholder="Valorant, Counter-Strike 2, PUBG Mobile"
                {...register("main_game")}
                className="h-12 rounded-xl bg-zinc-950"
              />

            </div>

          </section>
          */}

          {/* ========================================= */}
          {/* After Profile */}
          {/* ========================================= */}

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <h3 className="font-semibold text-white">
              After creating your profile
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>✓ APGF ID generated</li>

              <li>✓ Gamer Card unlocked</li>

              <li>✓ Public profile created</li>

              <li>✓ Discoverable by gamers</li>
            </ul>
          </div>

          {/* ========================================= */}
          {/* Error */}
          {/* ========================================= */}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* ========================================= */}
          {/* Submit */}
          {/* ========================================= */}

          <Button
            type="submit"
            disabled={loading || usernameStatus !== "available" || !isValid}
            className="h-14 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-base font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating Profile..."
              : usernameStatus === "checking"
                ? "Checking Username..."
                : "Claim My APGF ID"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
