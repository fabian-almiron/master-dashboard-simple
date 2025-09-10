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
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.anthropic.com https://api.vercel.com https://api.bitbucket.org;"
          }
        ]
      }
    ]
  },
  webpack: (config, { isServer }) => {
    // Suppress webpack warnings for our theme auto-discovery system
    config.ignoreWarnings = [
      {
        module: /register-blocks\.tsx$/,
        message: /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
      },
    ]
    
    // Fix CSS loader URL replacement issues by completely disabling URL processing
    config.module.rules.forEach(rule => {
      if (rule.oneOf) {
        rule.oneOf.forEach(oneOfRule => {
          if (oneOfRule.use && Array.isArray(oneOfRule.use)) {
            oneOfRule.use.forEach(use => {
              if (use.loader && use.loader.includes('css-loader')) {
                use.options = use.options || {}
                use.options.url = false
                use.options.import = false
              }
            })
          }
        })
      }
      if (rule.use && Array.isArray(rule.use)) {
        rule.use.forEach(use => {
          if (use.loader && use.loader.includes('css-loader')) {
            use.options = use.options || {}
            use.options.url = false
            use.options.import = false
          }
        })
      }
    })
    
    return config
  },
}

export default nextConfig
