# 🚀 Railway Deployment Guide for Master Dashboard

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **Railway CLI**: Install with `npm install -g @railway/cli`
3. **Git Repository**: Your code should be in a Git repository
4. **Environment Variables**: Prepare your environment variables (see below)

## Quick Deployment Steps

### 1. Install Railway CLI

```bash
npm install -g @railway/cli
```

### 2. Login to Railway

```bash
railway login
```

### 3. Initialize Railway Project

```bash
# In your project directory
railway init
```

### 4. Set Environment Variables

Copy all variables from `.env.railway.example` to your Railway project:

```bash
# Set each variable individually
railway variables set NEXT_PUBLIC_MASTER_SUPABASE_URL=https://your-master-project.supabase.co
railway variables set NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY=your-anon-key
railway variables set MASTER_SUPABASE_SERVICE_ROLE_KEY=your-service-key
# ... continue for all variables
```

Or use the Railway dashboard:
1. Go to your project on railway.app
2. Click on your service
3. Go to "Variables" tab
4. Add all environment variables from `.env.railway.example`

### 5. Deploy

```bash
railway up
```

## Environment Variables Required

### Core Database Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_MASTER_SUPABASE_URL` | Master dashboard Supabase URL | ✅ |
| `NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY` | Master dashboard Supabase anon key | ✅ |
| `MASTER_SUPABASE_SERVICE_ROLE_KEY` | Master dashboard service role key | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | Shared CMS database URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Shared CMS database anon key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Shared CMS service role key | ✅ |

### API Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `VERCEL_TOKEN` | Vercel API token for auto-deployment | ✅ |
| `VERCEL_TEAM_ID` | Vercel team ID (if using teams) | ⚠️ |
| `BITBUCKET_USERNAME` | Bitbucket username | ✅ |
| `BITBUCKET_API_TOKEN` | Bitbucket API token | ✅ |
| `BITBUCKET_WORKSPACE` | Bitbucket workspace name | ✅ |
| `BITBUCKET_MASTER_REPO` | Master repository name | ✅ |

### Railway Specific

| Variable | Description | Auto-Set |
|----------|-------------|----------|
| `PORT` | Application port | ✅ (Railway) |
| `NODE_ENV` | Environment mode | ✅ (Railway) |
| `RAILWAY_PUBLIC_DOMAIN` | Public domain | ✅ (Railway) |

### Optional Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | For AI theme generation | ⚠️ |
| `SMTP_HOST` | Email notifications | ❌ |
| `SMTP_PORT` | Email port | ❌ |
| `SMTP_USER` | Email username | ❌ |
| `SMTP_PASS` | Email password | ❌ |

## Database Setup

### 1. Master Dashboard Database

Create a new Supabase project for the master dashboard:

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Run the SQL from `master-dashboard-schema.sql`
4. Copy the URL and keys to Railway environment variables

### 2. Shared CMS Database

This should be your existing CMS Supabase project:

1. Use your existing CMS Supabase project
2. Ensure `cms-master/database-schema.sql` is applied
3. Copy the URL and keys to Railway environment variables

## Deployment Architecture

```
Railway (Master Dashboard) 
    ↓
Creates Vercel Projects (CMS Instances)
    ↓  
Each CMS → Shared Supabase Database (Multi-tenant)
```

## Post-Deployment Configuration

### 1. Custom Domain (Optional)

1. In Railway dashboard, go to your service
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### 2. Environment Variables Update

After deployment, update the master dashboard URL:

```bash
railway variables set NEXT_PUBLIC_MASTER_DASHBOARD_URL=https://your-railway-domain.railway.app
```

### 3. Test the Deployment

1. Visit your Railway URL
2. Check the health endpoint: `https://your-domain/api/health`
3. Create a test CMS instance to verify the full flow

## Monitoring and Logs

### View Logs

```bash
railway logs
```

### Monitor Service

```bash
railway status
```

### Access Railway Dashboard

Visit [railway.app](https://railway.app) to monitor:
- Service metrics
- Build logs
- Environment variables
- Domain settings

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all environment variables are set
   - Verify Node.js version compatibility
   - Check build logs in Railway dashboard

2. **Database Connection Issues**
   - Verify Supabase URLs and keys
   - Check network connectivity
   - Ensure database schemas are applied

3. **API Integration Issues**
   - Verify Vercel and Bitbucket tokens
   - Check token permissions
   - Test API endpoints manually

### Debug Commands

```bash
# Check environment variables
railway variables

# View recent logs
railway logs --tail

# Check service status
railway status

# Open Railway dashboard
railway open
```

## Security Considerations

1. **Environment Variables**: Never commit real environment variables to version control
2. **API Tokens**: Rotate tokens regularly
3. **Database Access**: Use service role keys only for server-side operations
4. **HTTPS**: Railway provides HTTPS by default
5. **CORS**: Configure CORS headers appropriately

## Cost Optimization

1. **Resource Limits**: Set appropriate CPU and memory limits
2. **Sleep Mode**: Enable for development environments
3. **Monitoring**: Use Railway's built-in monitoring to track usage
4. **Database**: Monitor Supabase usage and optimize queries

## Support

- Railway Documentation: [docs.railway.app](https://docs.railway.app)
- Railway Community: [Discord](https://discord.gg/railway)
- Railway Status: [status.railway.app](https://status.railway.app)
