const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
    typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: this allows production builds to complete even with lint errors.
    ignoreDuringBuilds: true,
  },

}

export default nextConfig
