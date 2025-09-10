# 🔒 Security Guide

## Overview

This document outlines the security measures implemented in the Master Dashboard application and provides guidelines for secure deployment and maintenance.

## 🚨 Security Features Implemented

### ✅ Authentication & Authorization
- **NextAuth.js** with OAuth providers (Google, GitHub)
- **Email whitelist** for admin access control
- **Session-based authentication** with secure cookies
- **Route protection** via middleware for `/master` routes
- **Admin-only endpoints** for sensitive operations

### ✅ Input Validation
- **Zod schemas** for all API endpoint inputs
- **Type-safe validation** with detailed error messages
- **SQL injection protection** via Supabase parameterized queries
- **XSS protection** through input sanitization

### ✅ Rate Limiting
- **Per-endpoint rate limiting** to prevent abuse
- **IP-based tracking** with configurable limits
- **Different limits** for different operation types:
  - Health checks: 30/minute
  - Deployments: 5/5 minutes
  - AI operations: 5-20/5 minutes
  - Admin operations: 3-10/5 minutes

### ✅ Security Headers
- **Content Security Policy (CSP)** to prevent XSS
- **X-Frame-Options** to prevent clickjacking
- **X-Content-Type-Options** to prevent MIME sniffing
- **Referrer-Policy** for privacy protection
- **Permissions-Policy** to restrict browser features

### ✅ CORS Configuration
- **Restricted origins** (no wildcard `*`)
- **Credential support** for authenticated requests
- **Specific allowed methods** and headers

### ✅ Error Handling
- **Sanitized error messages** in production
- **Detailed logging** server-side only
- **Security event logging** for audit trails

### ✅ Environment Security
- **Secure environment variable handling**
- **Admin-only debug endpoints**
- **Production/development environment separation**

## 🔧 Configuration

### Required Environment Variables

```bash
# Authentication
NEXTAUTH_SECRET=your-long-random-secret
NEXTAUTH_URL=https://yourdomain.com
ALLOWED_EMAILS=admin@yourdomain.com

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Database (with proper RLS policies)
NEXT_PUBLIC_MASTER_SUPABASE_URL=https://your-master.supabase.co
MASTER_SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

### CORS Configuration

Update `vercel.json` for your domain:

```json
{
  "key": "Access-Control-Allow-Origin",
  "value": "https://yourdomain.com"
}
```

## 🛡️ Security Middleware

The application uses a comprehensive security middleware (`lib/security.ts`) that provides:

### Rate Limiting
```typescript
// Usage in API routes
const securityCheck = await securityMiddleware(request, {
  rateLimit: { limit: 10, windowMs: 60000 }
})
```

### Authentication Checks
```typescript
// Require authentication
const securityCheck = await securityMiddleware(request, {
  requireAuth: true
})

// Require admin access
const securityCheck = await securityMiddleware(request, {
  requireAdmin: true
})
```

### Input Validation
```typescript
import { schemas, validateInput } from '@/lib/security'

// Validate deployment request
const data = validateInput(rawData, schemas.deploymentRequest)
```

## 🚀 Deployment Security Checklist

### Before Going Live

- [ ] **Update CORS origins** to your production domain
- [ ] **Set strong NEXTAUTH_SECRET** (32+ characters)
- [ ] **Configure ALLOWED_EMAILS** for admin access
- [ ] **Enable Supabase RLS policies**
- [ ] **Set up proper OAuth app configurations**
- [ ] **Configure environment variables** in production
- [ ] **Test authentication flows**
- [ ] **Verify rate limiting works**
- [ ] **Check security headers** are applied
- [ ] **Remove debug endpoints** or secure them

### Production Environment

```bash
# Use production environment file
cp production.env.example .env.production.local
# Edit with your production values
```

### Supabase Security

1. **Enable Row Level Security (RLS)**:
```sql
ALTER TABLE cms_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployment_logs ENABLE ROW LEVEL SECURITY;
```

2. **Create RLS Policies**:
```sql
-- Example: Only allow authenticated users to read instances
CREATE POLICY "Users can read own instances" ON cms_instances
  FOR SELECT USING (auth.uid()::text = owner_email);
```

### Vercel Deployment

1. **Set environment variables** in Vercel dashboard
2. **Configure custom domains** with HTTPS
3. **Enable security headers** via `next.config.mjs`
4. **Set up monitoring** and alerts

## 🔍 Monitoring & Logging

### Security Event Logging

The application logs security events including:
- Authentication attempts
- Rate limit violations
- Admin endpoint access
- Deployment operations
- Deletion attempts

### Log Format
```typescript
{
  timestamp: "2024-01-01T00:00:00.000Z",
  event: "DEPLOYMENT_INITIATED",
  ip: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  url: "/api/master/deploy",
  details: { name: "example-site" }
}
```

### Monitoring Recommendations

1. **Set up log aggregation** (e.g., Vercel Analytics, DataDog)
2. **Monitor rate limit violations**
3. **Alert on failed authentication attempts**
4. **Track admin endpoint usage**
5. **Monitor API response times**

## 🚨 Incident Response

### Security Incident Checklist

1. **Immediate Response**:
   - [ ] Identify the scope of the incident
   - [ ] Rotate compromised API keys
   - [ ] Review access logs
   - [ ] Block suspicious IP addresses

2. **Investigation**:
   - [ ] Analyze security logs
   - [ ] Check for data breaches
   - [ ] Identify attack vectors
   - [ ] Document findings

3. **Recovery**:
   - [ ] Patch vulnerabilities
   - [ ] Update security measures
   - [ ] Restore from backups if needed
   - [ ] Notify affected users

4. **Post-Incident**:
   - [ ] Conduct security review
   - [ ] Update security policies
   - [ ] Improve monitoring
   - [ ] Train team on lessons learned

## 🔄 Regular Security Maintenance

### Weekly Tasks
- [ ] Review access logs for anomalies
- [ ] Check for failed authentication attempts
- [ ] Monitor rate limiting effectiveness

### Monthly Tasks
- [ ] Update dependencies (`npm audit fix`)
- [ ] Review and rotate API keys
- [ ] Check security header effectiveness
- [ ] Review admin access list

### Quarterly Tasks
- [ ] Conduct security audit
- [ ] Review and update RLS policies
- [ ] Test incident response procedures
- [ ] Update security documentation

## 📞 Security Contacts

- **Security Issues**: Report to your security team
- **Dependency Vulnerabilities**: Monitor GitHub security advisories
- **Infrastructure**: Contact your hosting provider

## 🔗 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Supabase Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Vercel Security](https://vercel.com/docs/security)

---

**Remember**: Security is an ongoing process, not a one-time setup. Regular reviews and updates are essential for maintaining a secure application.
