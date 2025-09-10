# 🚂 Railway Docker Deployment Guide

## Overview

This guide will help you deploy your secure Master Dashboard application to Railway using Docker.

## 🔧 Prerequisites

- ✅ Railway account (https://railway.app)
- ✅ Docker Desktop installed and running
- ✅ GitHub repository with your code
- ✅ Environment variables ready (see `railway-docker.env.example`)

## 🚀 Deployment Steps

### 1. **Prepare Your Environment Variables**

Copy `railway-docker.env.example` and prepare your production values:

```bash
# Required for authentication
NEXTAUTH_SECRET=your-super-long-random-secret-min-32-chars
NEXTAUTH_URL=https://your-app-name.railway.app
ALLOWED_EMAILS=admin@yourdomain.com

# OAuth providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Database connections
NEXT_PUBLIC_MASTER_SUPABASE_URL=https://your-master.supabase.co
MASTER_SUPABASE_SERVICE_ROLE_KEY=your-master-service-key
# ... (see railway-docker.env.example for complete list)
```

### 2. **Deploy to Railway**

#### Option A: Deploy from GitHub (Recommended)

1. **Connect Repository**:
   - Go to https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select your `master-dashboard-simple` repository

2. **Configure Build**:
   - Railway will automatically detect the `Dockerfile`
   - The `railway.toml` file will configure the build settings

3. **Set Environment Variables**:
   - Go to your project → Variables tab
   - Add all variables from your prepared list
   - **Important**: Set `NEXTAUTH_URL` to your Railway app URL

#### Option B: Deploy with Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Set environment variables
railway variables set NEXTAUTH_SECRET="your-secret"
railway variables set NEXTAUTH_URL="https://your-app.railway.app"
# ... (set all other variables)

# Deploy
railway up
```

### 3. **Configure OAuth Providers**

Update your OAuth app settings to include Railway URLs:

#### Google OAuth
- Go to Google Cloud Console
- Add to "Authorized redirect URIs":
  ```
  https://your-app-name.railway.app/api/auth/callback/google
  ```

#### GitHub OAuth
- Go to GitHub → Settings → Developer settings → OAuth Apps
- Add to "Authorization callback URL":
  ```
  https://your-app-name.railway.app/api/auth/callback/github
  ```

### 4. **Update CORS Configuration**

The `vercel.json` file has been updated to include Railway domains:
```json
{
  "key": "Access-Control-Allow-Origin",
  "value": "https://localhost:3000,https://yourdomain.com,https://*.railway.app"
}
```

## 🔍 Verification Steps

### 1. **Check Health Endpoint**
```bash
curl https://your-app-name.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "responseTime": "123ms",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### 2. **Test Authentication**
- Visit `https://your-app-name.railway.app`
- Try signing in with Google/GitHub
- Verify admin access works

### 3. **Test Security Features**
```bash
# Test rate limiting
for i in {1..35}; do curl -s https://your-app-name.railway.app/api/health; done

# Test protected endpoints
curl https://your-app-name.railway.app/api/debug-env
# Should return 401 Unauthorized
```

## 🛡️ Security Checklist

- [ ] **NEXTAUTH_SECRET** is long and random (32+ characters)
- [ ] **ALLOWED_EMAILS** is set to restrict admin access
- [ ] **OAuth redirect URIs** include Railway domain
- [ ] **Database RLS policies** are enabled in Supabase
- [ ] **API keys** are properly configured
- [ ] **CORS origins** include Railway domain
- [ ] **Health check** returns "healthy" status

## 📊 Railway Configuration Files

### `railway.toml`
```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"

[deploy]
healthcheckPath = "/api/health"
healthcheckTimeout = 30
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3
```

### `Dockerfile`
- Multi-stage build for optimization
- Node.js 20 Alpine for security
- Non-root user for security
- Health check included
- Production-optimized

## 🔧 Troubleshooting

### Build Issues
```bash
# Check Railway logs
railway logs

# Local Docker test
docker build -t test-app .
docker run -p 3000:3000 test-app
```

### Database Connection Issues
- Verify Supabase URLs and keys
- Check network connectivity
- Ensure RLS policies allow connections

### Authentication Issues
- Verify OAuth redirect URIs
- Check NEXTAUTH_URL matches Railway domain
- Ensure NEXTAUTH_SECRET is set

### Rate Limiting Issues
- Check if hitting rate limits
- Verify IP detection works in Railway environment

## 📈 Monitoring

### Railway Dashboard
- Monitor CPU/Memory usage
- Check deployment logs
- View metrics and analytics

### Application Monitoring
- Health endpoint: `/api/health`
- Security logs in Railway console
- Database performance in Supabase dashboard

## 🚀 Production Optimization

### Performance
- Railway automatically scales based on traffic
- Docker image is optimized for production
- Health checks ensure reliability

### Security
- All endpoints are protected
- Rate limiting prevents abuse
- Security headers are configured
- Non-root container user

### Reliability
- Automatic restarts on failure
- Health check monitoring
- Multi-stage Docker build

## 📞 Support

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Application Issues**: Check the SECURITY.md file

---

**🎉 Your secure Master Dashboard is now deployed on Railway with enterprise-grade security!**
