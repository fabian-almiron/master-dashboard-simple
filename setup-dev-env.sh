#!/bin/bash

# =============================================
# Development Environment Setup Script
# =============================================
# This script helps set up local development environment

echo "🚀 Setting up development environment..."

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << 'EOF'
# =============================================
# LOCAL DEVELOPMENT ENVIRONMENT
# =============================================
# This file is for local development only
# DO NOT commit this file to version control

# =============================================
# AUTHENTICATION & SECURITY
# =============================================
NEXTAUTH_SECRET=dev-secret-key-min-32-chars-long-for-local-development-only
NEXTAUTH_URL=http://localhost:3001
ALLOWED_EMAILS=your-email@domain.com

# =============================================
# DEVELOPMENT BYPASS (Temporary)
# =============================================
# Set to 'true' to bypass authentication in development
BYPASS_AUTH=true

# =============================================
# OAuth Providers (Local Development)
# =============================================
# You'll need to create separate OAuth apps for local development
# or temporarily use your production ones with localhost redirects

# Google OAuth - Add http://localhost:3001/api/auth/callback/google to your Google OAuth app
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth - Add http://localhost:3001/api/auth/callback/github to your GitHub OAuth app  
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# =============================================
# DATABASE CONFIGURATION
# =============================================
# Use your existing Supabase project for local development
NEXT_PUBLIC_MASTER_SUPABASE_URL=https://your-master-project.supabase.co
NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY=your-master-anon-key
MASTER_SUPABASE_SERVICE_ROLE_KEY=your-master-service-key

# =============================================
# API CONFIGURATION (Optional for local dev)
# =============================================
# These are only needed if you want to test deployment features locally
VERCEL_TOKEN=your-vercel-api-token
VERCEL_TEAM_ID=your-vercel-team-id
BITBUCKET_USERNAME=your-bitbucket-username
BITBUCKET_API_TOKEN=your-bitbucket-api-token
BITBUCKET_WORKSPACE=your-workspace
BITBUCKET_MASTER_REPO=cms-master

# =============================================
# DEVELOPMENT SETTINGS
# =============================================
NODE_ENV=development
NEXT_PUBLIC_MASTER_DASHBOARD_URL=http://localhost:3001
DEBUG_MODE=true
LOG_LEVEL=debug
EOF
    echo "✅ Created .env.local file"
else
    echo "⚠️  .env.local already exists, skipping creation"
fi

echo ""
echo "🔧 Next steps:"
echo "1. Edit .env.local and add your actual credentials"
echo "2. For OAuth to work, add these redirect URIs to your OAuth apps:"
echo "   - Google: http://localhost:3001/api/auth/callback/google"
echo "   - GitHub: http://localhost:3001/api/auth/callback/github"
echo "3. Or use BYPASS_AUTH=true for development without OAuth"
echo ""
echo "🚀 Start development server with: npm run dev"
echo "🌐 Access the app at: http://localhost:3001"
