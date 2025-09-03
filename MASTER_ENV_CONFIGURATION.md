# 🚀 Master Dashboard Environment Configuration

## Complete `.env.local` for Master Dashboard

Create a `.env.local` file in your **project root** with these environment variables:

```bash
# =============================================
# MASTER DASHBOARD DATABASE (Required)
# =============================================
# Create a separate Supabase project for the master dashboard
# This tracks all CMS instances, deployments, and analytics
NEXT_PUBLIC_MASTER_SUPABASE_URL=https://your-master-project-ref.supabase.co
NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
MASTER_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# =============================================
# SHARED CMS DATABASE (Required)
# =============================================
# This is the database that ALL deployed CMS instances will share
# Each CMS instance gets a unique site_id for data isolation
NEXT_PUBLIC_SUPABASE_URL=https://your-shared-cms-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# =============================================
# VERCEL API CONFIGURATION (Required)
# =============================================
# Get your token from: https://vercel.com/account/tokens
# This allows the master dashboard to create Vercel projects automatically
VERCEL_TOKEN=your-vercel-api-token-here
VERCEL_TEAM_ID=your-team-id-optional

# =============================================
# BITBUCKET API CONFIGURATION (Required)
# =============================================
# For automatic repository creation and code deployment
# Create API token at: https://bitbucket.org/account/settings/api-tokens/
BITBUCKET_USERNAME=your-bitbucket-username
BITBUCKET_API_TOKEN=your-workspace-scoped-api-token
BITBUCKET_WORKSPACE=trukraft
BITBUCKET_MASTER_REPO=cms-master

# =============================================
# DEPLOYMENT CONFIGURATION
# =============================================
DEFAULT_CMS_REPO=https://bitbucket.org/trukraft/cms-master.git
DEFAULT_CMS_BRANCH=main
DEFAULT_VERCEL_REGION=iad1

# =============================================
# ENVIRONMENT
# =============================================
NODE_ENV=development
NEXT_PUBLIC_MASTER_DASHBOARD_URL=http://localhost:3000
DEBUG_MODE=true
LOG_LEVEL=debug
```

## 🎯 How the Auto-Environment System Works

### When you create a new CMS instance, the Master Dashboard automatically:

1. **Creates site record** in shared CMS database with unique `site_id`
2. **Creates Bitbucket repository** with complete CMS code
3. **Creates Vercel project** connected to the repository
4. **Sets environment variables** on the Vercel project:

```bash
# Environment variables automatically set by Master Dashboard:
NEXT_PUBLIC_SUPABASE_URL=https://your-shared-cms-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-shared-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-shared-service-key
CMS_SITE_ID=uuid-generated-by-master-dashboard
NEXT_PUBLIC_CMS_SITE_ID=uuid-generated-by-master-dashboard
NODE_ENV=production
```

### 🔍 Key Code Location

The environment variable setup happens in:
**`/app/api/master/deploy/route.ts`** - Lines 563-631

```typescript
async function configureVercelEnvironmentVariables(vercelProjectId: string, siteId: string) {
  const envVars = [
    {
      key: 'NEXT_PUBLIC_SUPABASE_URL',
      value: SHARED_CMS_SUPABASE_URL,  // ← Uses shared database
      type: 'plain',
      target: ['production', 'preview', 'development']
    },
    {
      key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      value: SHARED_CMS_SUPABASE_ANON_KEY,  // ← Uses shared database
      type: 'encrypted',
      target: ['production', 'preview', 'development']
    },
    {
      key: 'SUPABASE_SERVICE_ROLE_KEY',
      value: SHARED_CMS_SUPABASE_SERVICE_KEY,  // ← Uses shared database
      type: 'encrypted',
      target: ['production', 'preview', 'development']
    },
    {
      key: 'CMS_SITE_ID',
      value: siteId,  // ← Unique site ID for data isolation
      type: 'plain',
      target: ['production', 'preview', 'development']
    },
    {
      key: 'NEXT_PUBLIC_CMS_SITE_ID',
      value: siteId,  // ← Public site ID for client-side filtering
      type: 'plain',
      target: ['production', 'preview', 'development']
    }
  ]
  
  // Sets each environment variable via Vercel API
  for (const envVar of envVars) {
    await fetch(`${VERCEL_API_URL}/v9/projects/${vercelProjectId}/env`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(envVar)
    })
  }
}
```

## 🏗️ Multi-Tenant Architecture

### Database Setup Required:

1. **Master Dashboard Database** (Separate Supabase project)
   - Run: `master-dashboard-schema.sql`
   - Stores: CMS instances, deployment logs, templates, notifications

2. **Shared CMS Database** (Your existing CMS Supabase project)
   - Run: `cms-master/database-schema.sql`
   - Stores: All site data with `site_id` isolation

### Data Flow:

```
Master Dashboard → Creates site_id → Deploys CMS → Sets CMS_SITE_ID env var
                                                  ↓
Each CMS Instance → Uses shared database → Filters by site_id → Isolated data
```

## 🔧 Setup Steps:

1. **Copy the environment variables above** to your `.env.local`
2. **Replace the placeholder values** with your actual credentials:
   - Supabase URLs and keys (both master and shared databases)
   - Vercel API token
   - Bitbucket credentials
3. **Test the configuration** by creating a new CMS instance
4. **The system will automatically** set up all environment variables for each deployed CMS

## ✅ Result:

Each deployed CMS instance will automatically have the correct environment variables set, pointing to your shared database with a unique site ID for complete data isolation. No manual environment variable setup required for each deployment!
