# 🔧 Railway Environment Variables Setup

**STATUS:** ✅ Build fixes applied! Now you just need to set environment variables.

**What I Fixed:**
- ✅ Made Clerk provider accept missing keys during build
- ✅ Prevented static pre-rendering of authenticated pages (`/master/*`)
- ✅ Reduced noisy Supabase logging during build
- ✅ Build will now succeed - you just need to set env vars for runtime!

---

## 🚨 Immediate Action Required

### Step 1: Go to Railway Dashboard

1. Open https://railway.app/dashboard
2. Select your project
3. Click on your service
4. Go to the **"Variables"** tab

### Step 2: Add These REQUIRED Variables

Copy and paste these variables (one at a time) and replace the placeholder values with your actual keys:

#### 🔐 Clerk Authentication (REQUIRED)
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/master
```

**Where to get Clerk keys:**
1. Go to https://dashboard.clerk.com
2. Select your application
3. Go to **API Keys**
4. Copy the **Production** keys (pk_live_* and sk_live_*)

#### 🗄️ Supabase Database (REQUIRED)
```bash
NEXT_PUBLIC_MASTER_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
MASTER_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

**Where to get Supabase keys:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → NEXT_PUBLIC_MASTER_SUPABASE_URL
   - **anon public** → NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY
   - **service_role** (secret) → MASTER_SUPABASE_SERVICE_ROLE_KEY

#### 🔑 API Keys (REQUIRED for deployments)
```bash
VERCEL_TOKEN=your_vercel_token
BITBUCKET_USERNAME=your_username
BITBUCKET_API_TOKEN=your_bitbucket_token
BITBUCKET_WORKSPACE=your_workspace
BITBUCKET_MASTER_REPO=cms-master
ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
```

#### 🛡️ Security Settings (CRITICAL)
```bash
ADMIN_EMAILS=your-email@domain.com
BYPASS_AUTH=false
NODE_ENV=production
```

#### 🚀 Railway Configuration
```bash
PORT=3000
NEXT_PUBLIC_MASTER_DASHBOARD_URL=${{RAILWAY_PUBLIC_DOMAIN}}
NEXT_TELEMETRY_DISABLED=1
```

### Step 3: Redeploy

After adding all variables:

**Option A: In Railway Dashboard**
1. Click **"Deploy"** button
2. Or wait for auto-redeploy (if you push to GitHub)

**Option B: Push Changes**
```bash
git add .
git commit -m "Fix: Add build resilience for missing env vars"
git push origin main
```

Railway will automatically rebuild with the environment variables now available.

---

## ✅ What I Just Fixed

To make your life easier, I made the build process more resilient:

1. **Clerk Provider**: Now accepts empty string during build
   - Build will succeed without Clerk keys
   - Keys still required at runtime for authentication

2. **Supabase Client**: Reduced error logging noise
   - Only warns during build (not errors)
   - Uses fallback client during build
   - Real client created at runtime with your env vars

3. **More Graceful Failures**: App can build without all env vars
   - But **you still need to set them** for the app to work!

---

## 🎯 Expected Build Output (After Setting Env Vars)

Once you set the environment variables and redeploy, you should see:

```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (27/27)
✓ Finalizing page optimization
```

No more Clerk or Supabase errors!

---

## 🧪 Test After Deployment

1. **Health Check:**
   ```bash
   curl https://your-app.railway.app/api/health
   ```
   Expected: `{"status":"healthy"}`

2. **Authentication:**
   Visit: `https://your-app.railway.app/master`
   Expected: Redirects to Clerk sign-in

3. **Check Logs:**
   ```bash
   railway logs
   ```
   Should not see Supabase or Clerk errors

---

## ❓ Still Having Issues?

### Build Still Failing?

1. Double-check all `NEXT_PUBLIC_*` variables are set
2. Verify Clerk keys start with `pk_live_` and `sk_live_`
3. Verify Supabase URL is complete (https://xxxxx.supabase.co)
4. Check Railway logs for specific error

### App Builds But Doesn't Work?

1. Verify **all** environment variables are set (not just NEXT_PUBLIC ones)
2. Check `BYPASS_AUTH=false` is set
3. Verify `ADMIN_EMAILS` contains your email
4. Test each service independently:
   - Clerk: Try to sign in
   - Supabase: Check `/api/debug-env` (admin only)
   - API Keys: Try creating a deployment

### Where to Get Help?

- Railway Logs: `railway logs`
- Railway Support: https://railway.app/help
- Clerk Docs: https://clerk.com/docs
- Supabase Docs: https://supabase.com/docs

---

## 📋 Quick Checklist

Before redeploying, verify:

- [ ] All `NEXT_PUBLIC_*` variables are set in Railway
- [ ] Clerk keys are **production** keys (pk_live_*, sk_live_*)
- [ ] Supabase URL and keys are from **production** project
- [ ] `BYPASS_AUTH=false`
- [ ] `ADMIN_EMAILS` contains your real email
- [ ] `NODE_ENV=production`
- [ ] All API tokens are set (Vercel, Bitbucket, Anthropic)

---

## 🚀 Ready to Redeploy!

After setting all environment variables in Railway:

```bash
# Push the resilience fixes
git add .
git commit -m "Fix: Build resilience for missing env vars"
git push origin main
```

Or just click **"Deploy"** in Railway dashboard.

**Build should succeed now!** 🎉

---

**Need the full list?** See `railway.env.example` for all variables with descriptions.

