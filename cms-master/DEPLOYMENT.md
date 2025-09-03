# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

Your CMS TailWinds application is now optimized for Vercel deployment. Follow these steps to deploy successfully:

### 1. Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [GitHub Repository](https://github.com) with your code
- [Supabase Project](https://supabase.com) with database setup

### 2. Database Setup

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and API keys

2. **Run Database Schema**:
   - Copy the SQL from `database-schema.sql`
   - Run it in your Supabase SQL editor
   - This creates all necessary tables and RLS policies

### 3. Environment Variables

Set these environment variables in your Vercel project:

```bash
# Required Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional (if needed)
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Environment
NODE_ENV=production
```

### 4. Deploy to Vercel

#### Option A: Deploy from GitHub (Recommended)

1. **Connect Repository**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

3. **Set Environment Variables**:
   - Add all environment variables from step 3
   - Click "Deploy"

#### Option B: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts to configure
```

### 5. Post-Deployment Setup

1. **Test Your Deployment**:
   - Visit your Vercel URL
   - Check that the homepage loads
   - Test admin interface at `/admin`

2. **Create Initial Site**:
   - Go to `/admin/sites/new`
   - Create your first site
   - Set up basic configuration

3. **Configure Domain** (Optional):
   - Add custom domain in Vercel dashboard
   - Update DNS settings
   - Configure SSL certificate

## 🔧 Configuration Files

### vercel.json
- Optimizes API function timeouts
- Sets up CORS headers
- Configures routing

### next.config.js
- Optimized for Vercel deployment
- Image optimization settings
- Bundle optimization
- Console removal in production

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Errors
```bash
# Check build locally first
npm run build

# Fix TypeScript errors
npm run type-check
```

#### 2. Environment Variables
- Ensure all Supabase variables are set
- Check variable names match exactly
- Verify keys are correct

#### 3. Database Connection
- Test database connection locally
- Verify RLS policies are set up
- Check service role key permissions

#### 4. API Routes Not Working
- Check function timeout settings in vercel.json
- Verify CORS headers are set
- Test API routes locally first

### Debug Commands

```bash
# Test environment variables
curl https://your-app.vercel.app/api/env-check

# Test database connection
curl https://your-app.vercel.app/api/debug-current-site

# Check build output
vercel logs
```

## 📊 Performance Optimization

### Build Optimizations
- ✅ Bundle splitting configured
- ✅ CSS optimization enabled
- ✅ Console removal in production
- ✅ Image optimization enabled

### Runtime Optimizations
- ✅ API function timeouts set
- ✅ CORS headers configured
- ✅ Static generation for pages
- ✅ CDN caching enabled

## 🔒 Security

### Environment Variables
- ✅ Service role key is server-side only
- ✅ Public keys are properly exposed
- ✅ No sensitive data in client bundle

### Database Security
- ✅ Row-level security enabled
- ✅ Site isolation implemented
- ✅ API validation in place

## 📈 Monitoring

### Vercel Analytics
- Enable Vercel Analytics in dashboard
- Monitor performance metrics
- Track user behavior

### Error Tracking
- Set up error monitoring
- Monitor API function errors
- Track build failures

## 🔄 Continuous Deployment

### Automatic Deployments
- Push to main branch triggers deployment
- Preview deployments for pull requests
- Automatic rollback on failures

### Environment Management
- Production environment for main branch
- Preview environments for PRs
- Development environment for local testing

## 📝 Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database schema executed
- [ ] Environment variables set in Vercel
- [ ] Repository connected to Vercel
- [ ] Build completes successfully
- [ ] Homepage loads correctly
- [ ] Admin interface accessible
- [ ] Database connection working
- [ ] API routes functional
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Error monitoring set up

## 🆘 Support

If you encounter issues:

1. **Check Vercel Logs**: Use `vercel logs` or dashboard
2. **Test Locally**: Run `npm run build` locally first
3. **Verify Environment**: Check all variables are set
4. **Database Connection**: Test Supabase connection
5. **Community Support**: Check Vercel and Next.js documentation

## 🎉 Success!

Your CMS TailWinds application is now deployed and ready for production use!

- **Admin Interface**: `https://your-app.vercel.app/admin`
- **API Endpoints**: `https://your-app.vercel.app/api/*`
- **Frontend**: `https://your-app.vercel.app`

Happy building! 🚀
