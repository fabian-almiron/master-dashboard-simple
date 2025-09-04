# 🚂 Railway Quick Start - Master Dashboard

## 🚀 Deploy in 5 Minutes

### 1. Prerequisites
- Railway account ([railway.app](https://railway.app))
- Supabase projects (master + shared CMS database)
- Vercel API token
- Bitbucket API token

### 2. One-Command Setup
```bash
# Run the automated setup script
./scripts/setup-railway.sh
```

### 3. Set Environment Variables
Copy variables from `.env.railway.example` to Railway:

**Via Railway Dashboard:**
1. Go to [railway.app](https://railway.app)
2. Select your project → Variables tab
3. Add all variables from `.env.railway.example`

**Via CLI:**
```bash
railway variables set NEXT_PUBLIC_MASTER_SUPABASE_URL=https://your-master.supabase.co
railway variables set VERCEL_TOKEN=your-vercel-token
# ... continue for all variables
```

### 4. Deploy
```bash
# Automated deployment with all checks
./scripts/railway-deploy-complete.sh

# OR simple deployment
railway up
```

### 5. Verify
- Health check: `https://your-app.railway.app/api/health`
- Dashboard: `https://your-app.railway.app`

## 🔧 Required Environment Variables

### Core (Must Set)
```bash
NEXT_PUBLIC_MASTER_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY=eyJhbG...
MASTER_SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
NEXT_PUBLIC_SUPABASE_URL=https://shared-cms.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
VERCEL_TOKEN=vercel_xxx
BITBUCKET_USERNAME=your-username
BITBUCKET_API_TOKEN=your-token
BITBUCKET_WORKSPACE=your-workspace
BITBUCKET_MASTER_REPO=cms-master
```

### Optional
```bash
ANTHROPIC_API_KEY=sk-ant-xxx  # For AI theme generation
VERCEL_TEAM_ID=team_xxx       # If using Vercel teams
```

## 🎯 Architecture

```
Railway (Master Dashboard)
    ↓ Creates & Manages
Vercel Projects (CMS Instances) 
    ↓ Connect To
Shared Supabase Database (Multi-tenant)
```

## 🛠️ Troubleshooting

### Build Issues
```bash
railway logs
npm run build  # Test locally first
```

### Environment Issues
```bash
railway variables  # Check all variables are set
railway open       # Access Railway dashboard
```

### Database Issues
- Check Supabase URLs and keys
- Verify database schemas are applied
- Test connection: `/api/health`

## 📊 Monitoring

```bash
railway logs --tail    # Live logs
railway status         # Service status
railway metrics        # Usage metrics
```

## 🚀 Success!

Your Master Dashboard is now live on Railway and can:
- ✅ Create new CMS instances
- ✅ Deploy to Vercel automatically  
- ✅ Manage multiple sites from one dashboard
- ✅ Handle AI theme generation
- ✅ Scale automatically with Railway

Visit your dashboard and create your first CMS instance! 🎉
