export type EditProfileFormProps = {
  profile: {
    id: string
    apgf_id: string
    username: string
    display_name: string
    province: string
    city: string | null
    bio: string | null
    games: string | null
    main_game: string | null
    social_links: object
    avatar_url: string | null
    banner_url: string | null
    
  }
}
