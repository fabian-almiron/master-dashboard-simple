# Development Setup Guide

## Clerk Authentication Setup

The errors you're seeing are due to Clerk configuration issues. Here's how to fix them:

### Problem
- Production Clerk keys (`pk_live_`) cannot be used in development (`localhost`)
- This causes domain mismatch errors and 400 status codes

### Solution

1. **Get Development Keys**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Select your application
   - Go to "API Keys" section
   - Copy the **test/development** keys (they start with `pk_test_`)

2. **Create Environment File**
   Create a `.env.local` file in your project root:

   ```env
   # Use TEST keys for development (pk_test_xxx, not pk_live_xxx)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_here
   
   # Development URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/signin
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/master
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/master
   
   # Development settings
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Restart Your Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Key Differences

| Environment | Key Type | Domain | Usage |
|------------|----------|--------|-------|
| Development | `pk_test_` | localhost | Testing |
| Production | `pk_live_` | your-domain.com | Live site |

### Common Issues Fixed

✅ **Domain/Origin Mismatch**: Test keys work with localhost  
✅ **400 Status Errors**: Proper key-domain pairing  
✅ **Deprecated Props**: Updated to current Clerk API  
✅ **Build Errors**: Graceful fallbacks for missing config  

### Verification

Once configured, you should see:
- No console errors about domain mismatches
- Clerk sign-in form loads properly
- No 400 status codes from Clerk services

### Need Help?

If you're still seeing errors:
1. Check that your `.env.local` file is in the project root
2. Verify you're using `pk_test_` keys (not `pk_live_`)
3. Restart your development server
4. Check the browser console for any remaining errors

### Security Note

- Never commit `.env.local` to version control
- Use test keys for development, live keys for production
- The app will show helpful error messages if keys are misconfigured
