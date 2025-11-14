# Railway Environment Variables Setup

## ⚠️ IMPORTANT: Set these in Railway Dashboard, NOT in .env.local

### Step-by-Step Instructions:

1. **Go to [railway.app](https://railway.app)**
2. **Login and find your project**
3. **Click on your service** 
4. **Click the "Variables" tab**
5. **Click "New Variable" for each one below:**

### Required Variables for Railway:

```
Variable Name: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
Value: pk_live_your_production_key_here

Variable Name: CLERK_SECRET_KEY  
Value: sk_live_your_production_secret_here

Variable Name: NEXT_PUBLIC_CLERK_SIGN_IN_URL
Value: /auth/signin

Variable Name: NEXT_PUBLIC_CLERK_SIGN_UP_URL
Value: /auth/signup

Variable Name: NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
Value: /master

Variable Name: NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
Value: /master

Variable Name: NODE_ENV
Value: production
```

### Where to get Production Keys:

1. **Go to [dashboard.clerk.com](https://dashboard.clerk.com)**
2. **Select your app**
3. **Go to "API Keys"**
4. **Copy the LIVE/Production keys** (start with `pk_live_` and `sk_live_`)

### After Setting Variables:

1. **Redeploy your service** (Railway should auto-redeploy)
2. **Add your Railway domain** to Clerk:
   - In Clerk Dashboard → "Domains"
   - Add your Railway URL (e.g., `your-app-production.up.railway.app`)

## Key Points:

- ❌ **Don't** put Railway variables in `.env.local`
- ❌ **Don't** use test keys (`pk_test_`) for Railway
- ✅ **Do** use production keys (`pk_live_`) for Railway
- ✅ **Do** set variables in Railway's web dashboard
- ✅ **Do** keep test keys in `.env.local` for local development
