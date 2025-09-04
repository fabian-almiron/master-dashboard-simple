/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
  // Configure external packages for Railway deployment
  serverExternalPackages: ['@anthropic-ai/sdk'],
  webpack: (config, { isServer }) => {
    // Suppress webpack warnings for our theme auto-discovery system
    config.ignoreWarnings = [
      {
        module: /register-blocks\.tsx$/,
        message: /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
      },
    ]
    return config
  },
}

export default nextConfig
