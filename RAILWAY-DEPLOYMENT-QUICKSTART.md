# 🚀 Railway Production Deployment - Quick Start Guide

**Ready to deploy to Railway!** ✅

This guide will help you deploy your Altira Master Dashboard to Railway in production mode.

---

## 📋 Prerequisites

- [x] Railway account ([railway.app](https://railway.app))
- [x] GitHub repository connected to Railway
- [x] Clerk account with production keys
- [x] Supabase project (production instance)
- [x] API keys for: Vercel, Bitbucket, Anthropic

---

## 🎯 Quick Deployment Steps

### 1. Set Up Railway Project

```bash
# Install Railway CLI (optional, for local testing)
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project (if using CLI)
railway link
```

### 2. Configure Environment Variables in Railway Dashboard

Go to your Railway project → **Variables** tab and add all required environment variables.

**📝 Use this checklist:** Copy variables from `railway.env.example`

#### ✅ Critical Variables (Must Set):

```bash
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
ADMIN_EMAILS=admin@yourdomain.com

# Security
BYPASS_AUTH=false
NODE_ENV=production

# Database
NEXT_PUBLIC_MASTER_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_MASTER_SUPABASE_ANON_KEY=eyJhbG...
MASTER_SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# API Keys
VERCEL_TOKEN=xxxxx
BITBUCKET_USERNAME=xxxxx
BITBUCKET_API_TOKEN=xxxxx
BITBUCKET_WORKSPACE=xxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Railway
PORT=3000
NEXT_PUBLIC_MASTER_DASHBOARD_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

**⚠️ CRITICAL SECURITY CHECKS:**
- [ ] `BYPASS_AUTH` is set to `false`
- [ ] Using Clerk **LIVE** keys (pk_live_* and sk_live_*)
- [ ] `ADMIN_EMAILS` contains real admin email addresses
- [ ] All API keys are **production** keys (not test/dev)
- [ ] `NODE_ENV` is set to `production`

### 3. Deploy to Railway

**Option A: Automatic Deploy (Recommended)**
```bash
# Push to your GitHub main branch
git add .
git commit -m "Production security updates"
git push origin main

# Railway will automatically build and deploy
```

**Option B: Manual Deploy via CLI**
```bash
railway up
```

### 4. Verify Deployment

After deployment completes (2-5 minutes):

#### Test 1: Health Check
```bash
curl https://your-app.railway.app/api/health
# Should return: {"status":"healthy"}
```

#### Test 2: Authentication
Visit: `https://your-app.railway.app/master`
- Should redirect to Clerk sign-in
- After signing in with admin email, should access dashboard

#### Test 3: API Protection
```bash
curl -X POST https://your-app.railway.app/api/master/deploy
# Should return: 401 Unauthorized
```

#### Test 4: Security Headers
```bash
curl -I https://your-app.railway.app
# Check for headers:
# - Strict-Transport-Security
# - X-Frame-Options: DENY
# - Content-Security-Policy
```

### 5. Monitor Deployment

```bash
# View logs in Railway dashboard or via CLI
railway logs --follow

# Check for errors
railway logs | grep ERROR

# Monitor deployment status
railway status
```

---

## 🔒 Security Verification Checklist

After deployment, verify these security measures are in place:

### Authentication & Authorization:
- [ ] Unauthenticated users cannot access `/master` routes
- [ ] API calls without auth return 401
- [ ] Only admin emails can access admin endpoints
- [ ] Debug endpoints return 403 in production

### Headers & Configuration:
- [ ] HTTPS is enforced (no HTTP access)
- [ ] Security headers present (check with curl -I)
- [ ] CSP doesn't block Clerk or Supabase
- [ ] Rate limiting is working (try rapid requests)

### Environment Variables:
- [ ] All required env vars are set
- [ ] No test/dev keys in production
- [ ] `BYPASS_AUTH=false`
- [ ] Admin emails list is correct

### Monitoring:
- [ ] Railway logs are accessible
- [ ] Health check endpoint works
- [ ] Error notifications configured (optional)

---

## 🛠️ Troubleshooting

### Issue: Clerk Not Working

**Symptoms:** Redirect loop, authentication fails

**Solution:**
1. Verify Clerk keys are **LIVE** keys (pk_live_*, sk_live_*)
2. Check Clerk dashboard → API Keys
3. Ensure `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
4. Add Railway domain to Clerk allowed origins

### Issue: Database Connection Failed

**Symptoms:** 500 errors, "database not configured"

**Solution:**
1. Verify Supabase URL and keys are set
2. Check Supabase project is active
3. Test connection from Supabase dashboard
4. Verify service role key has correct permissions

### Issue: AI Generation Not Working

**Symptoms:** "API key not configured"

**Solution:**
1. Check `ANTHROPIC_API_KEY` is set in Railway
2. Verify API key is active in Anthropic dashboard
3. Check rate limits on Anthropic account
4. Review logs: `railway logs | grep ANTHROPIC`

### Issue: Deployment Failed

**Symptoms:** Build errors, deployment crashes

**Solution:**
1. Check Railway build logs
2. Verify `package.json` dependencies
3. Ensure `next.config.mjs` is valid
4. Check for TypeScript errors locally first

### Issue: Rate Limiting Not Working

**Symptoms:** Rate limit exceeded immediately

**⚠️ Known Limitation:**
If you have `numReplicas > 1` in `railway.json`, the in-memory rate limiting won't work correctly across replicas.

**Solution:**
1. Keep `numReplicas: 1` for now
2. Or implement Redis-based rate limiting (see `lib/security.ts`)

---

## 📊 Post-Deployment Tasks

### Immediate (within 24 hours):
- [ ] Test all critical user flows
- [ ] Verify Clerk authentication works
- [ ] Test AI website generation
- [ ] Check deployment automation
- [ ] Set up error monitoring

### Within First Week:
- [ ] Configure custom domain (if needed)
- [ ] Set up backup strategy
- [ ] Enable Supabase RLS policies
- [ ] Review access logs
- [ ] Test disaster recovery

### Ongoing:
- [ ] Monitor error rates daily
- [ ] Review access logs weekly
- [ ] Update dependencies monthly
- [ ] Rotate API keys quarterly
- [ ] Full security audit annually

---

## 🔗 Important Links

- **Railway Dashboard:** https://railway.app/dashboard
- **Clerk Dashboard:** https://dashboard.clerk.com
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Security Audit:** See `RAILWAY-PRODUCTION-SECURITY.md`
- **Environment Variables:** See `railway.env.example`

---

## 🆘 Support & Documentation

### Internal Documentation:
- `RAILWAY-PRODUCTION-SECURITY.md` - Full security audit
- `railway.env.example` - Environment variables reference
- `RAILWAY-DEPLOYMENT-GUIDE.md` - Detailed deployment guide

### External Resources:
- [Railway Docs](https://docs.railway.app)
- [Clerk Security Best Practices](https://clerk.com/docs/security)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🎉 You're Ready for Production!

Your Altira Master Dashboard has been:
- ✅ **Secured** with authentication and authorization
- ✅ **Hardened** with security headers and rate limiting
- ✅ **Configured** for Railway deployment
- ✅ **Documented** with comprehensive guides
- ✅ **Tested** and verified

**Next Step:** Push to GitHub and let Railway deploy automatically!

```bash
git add .
git commit -m "Production-ready deployment"
git push origin main
```

Watch the build logs in Railway dashboard and celebrate when it goes live! 🚀

---

**Questions?** Review `RAILWAY-PRODUCTION-SECURITY.md` for detailed security information.

**Issues?** Check the troubleshooting section above or Railway logs: `railway logs`

