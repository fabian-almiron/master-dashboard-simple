# 🚀 Railway Deployment Guide

## Required Environment Variables

Set these in your Railway project dashboard under **Variables** tab:

### 🔐 Authentication & Security
```bash
# CRITICAL: Must be 32+ characters long
NEXTAUTH_SECRET=your-super-long-random-secret-min-32-chars-make-it-really-long
# CRITICAL: Must match your Railway app URL exactly
NEXTAUTH_URL=https://your-app-name.up.railway.app
ALLOWED_EMAILS=your-email@domain.com,admin@domain.com
```

### 🗄️ Master Database (Required)
```bash
NEXT_PUBLIC_MASTER_SUPABASE_URL=https://your-master-project.supabase.co
NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
MASTER_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 🔑 OAuth Providers
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### 🛠️ API Configuration
```bash
VERCEL_TOKEN=your-vercel-api-token
VERCEL_TEAM_ID=your-vercel-team-id
BITBUCKET_USERNAME=your-bitbucket-username
BITBUCKET_API_TOKEN=your-bitbucket-api-token
BITBUCKET_WORKSPACE=your-workspace
BITBUCKET_MASTER_REPO=cms-master
ANTHROPIC_API_KEY=your-anthropic-api-key
```

### 🌐 Application Settings
```bash
NODE_ENV=production
NEXT_PUBLIC_MASTER_DASHBOARD_URL=https://your-app-name.up.railway.app
DEFAULT_CMS_REPO=https://bitbucket.org/yourworkspace/cms-master.git
DEFAULT_CMS_BRANCH=main
DEFAULT_VERCEL_REGION=iad1
```

## 🔧 OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-app-name.up.railway.app/api/auth/callback/google`

### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL: `https://your-app-name.up.railway.app/api/auth/callback/github`

## ✅ Verification

After setting variables and deploying:

1. **Health Check**: `https://your-app-name.up.railway.app/api/health`
   - Should return `{"status":"healthy","database":"connected"}`

2. **Debug Check**: `https://your-app-name.up.railway.app/api/debug-railway-env`
   - Should show all master database variables as `true`

3. **Application**: `https://your-app-name.up.railway.app`
   - Should load without errors
   - Authentication should work

## 🚨 Troubleshooting

### "State cookie was missing" Error
- Ensure `NEXTAUTH_SECRET` is set and long enough (32+ characters)
- Verify `NEXTAUTH_URL` matches your Railway app URL exactly
- Check OAuth redirect URIs include Railway domain

### Database Connection Issues
- Verify all 3 master database variables are set correctly
- Test connection with health endpoint
- Check Supabase project is active and accessible

### Deployment Validation Errors
- Ensure all required fields are provided
- Check domain format if using custom domain
- Verify email format for owner_email field
