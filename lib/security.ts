import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// ⚠️ WARNING: In-memory rate limiting store
// This works for single-instance deployments but will NOT work correctly
// across multiple Railway replicas. Each replica maintains its own state.
// 
// For production with numReplicas > 1, implement Redis-based rate limiting:
// - Add REDIS_URL to environment variables
// - Use a Redis client library (e.g., ioredis)
// - Replace this Map with Redis GET/SET operations
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Rate limiting middleware
 * @param identifier - Unique identifier (IP, user ID, etc.)
 * @param limit - Number of requests allowed
 * @param windowMs - Time window in milliseconds
 */
export function rateLimit(
  identifier: string, 
  limit: number = 10, 
  windowMs: number = 60000
): boolean {
  const now = Date.now()
  const key = identifier
  
  const current = rateLimitStore.get(key)
  
  if (!current || now > current.resetTime) {
    // First request or window expired
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (current.count >= limit) {
    return false
  }
  
  // Increment counter
  current.count++
  rateLimitStore.set(key, current)
  return true
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

/**
 * Authentication middleware for API routes using Clerk
 */
export async function requireAuth(request: NextRequest) {
  try {
    // Check if auth bypass is enabled in development
    const isDevelopment = process.env.NODE_ENV === 'development'
    const bypassAuth = process.env.BYPASS_AUTH === 'true'
    
    if (isDevelopment && bypassAuth) {
      console.log('🔓 Auth bypassed for API route (development mode)')
      return null // Skip authentication
    }

    // In production, require Clerk authentication
    const { auth } = await import('@clerk/nextjs/server')
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    return null // Authentication successful
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}

/**
 * Admin-only authentication middleware using Clerk
 */
export async function requireAdmin(request: NextRequest) {
  try {
    // Check if auth bypass is enabled in development
    const isDevelopment = process.env.NODE_ENV === 'development'
    const bypassAuth = process.env.BYPASS_AUTH === 'true'
    
    if (isDevelopment && bypassAuth) {
      console.log('🔓 Admin auth bypassed for API route (development mode)')
      return null // Skip authentication
    }

    // In production, require Clerk authentication and admin role
    const { auth } = await import('@clerk/nextjs/server')
    const { userId, sessionClaims } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    // Check for admin role (you can customize this logic)
    const userRole = sessionClaims?.metadata?.role || 'user'
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
    const userEmail = sessionClaims?.email
    
    if (userRole !== 'admin' && !adminEmails.includes(userEmail)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }
    
    return null // Admin authentication successful
  } catch (error) {
    console.error('Admin authentication error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}

/**
 * Combined security middleware
 */
export async function securityMiddleware(
  request: NextRequest,
  options: {
    requireAuth?: boolean
    requireAdmin?: boolean
    rateLimit?: { limit: number; windowMs: number }
  } = {}
) {
  const clientIP = getClientIP(request)
  
  // Rate limiting
  if (options.rateLimit) {
    const { limit, windowMs } = options.rateLimit
    if (!rateLimit(clientIP, limit, windowMs)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
  }
  
  // Authentication checks
  if (options.requireAdmin) {
    const adminCheck = await requireAdmin(request)
    if (adminCheck) return adminCheck
  } else if (options.requireAuth) {
    const authCheck = await requireAuth(request)
    if (authCheck) return authCheck
  }
  
  return null // All checks passed
}

/**
 * Sanitize error messages for client response
 */
export function sanitizeError(error: unknown): string {
  if (error instanceof Error) {
    // Don't expose internal error details in production
    if (process.env.NODE_ENV === 'production') {
      // Only return generic messages for known error types
      if (error.message.includes('ECONNREFUSED')) {
        return 'Service temporarily unavailable'
      }
      if (error.message.includes('timeout')) {
        return 'Request timeout'
      }
      if (error.message.includes('unauthorized') || error.message.includes('forbidden')) {
        return 'Access denied'
      }
      return 'An unexpected error occurred'
    }
    
    // In development, return the actual error
    return error.message
  }
  
  return 'An unexpected error occurred'
}

// Input validation schemas
export const schemas = {
  deploymentRequest: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    domain: z.string().optional().refine((val) => {
      if (!val || val === '') return true; // Allow empty/undefined
      
      // Simple and reliable domain validation
      const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.([a-zA-Z]{2,})$/
      const isValid = domainRegex.test(val)
      
      if (!isValid) {
        console.log(`🚨 Domain validation failed for: "${val}"`)
        console.log(`🔍 Domain regex test result: ${isValid}`)
      } else {
        console.log(`✅ Domain validation passed for: "${val}"`)
      }
      
      return isValid;
    }, { message: 'Invalid domain format (use format: example.com)' }),
    subdomain: z.string().regex(/^[a-z0-9-]+$/, 'Invalid subdomain format').optional(),
    owner_name: z.string().min(1, 'Owner name is required').max(100),
    owner_email: z.string().email('Invalid email format'),
    status: z.enum(['active', 'inactive', 'suspended']),
    plan: z.enum(['free', 'pro', 'enterprise']),
    auto_deploy: z.boolean(),
    description: z.string().max(500, 'Description too long').optional()
  }),
  
  aiRequest: z.object({
    user_vision: z.string().min(1, 'Vision is required').max(1000, 'Vision too long'),
    website_context: z.object({
      name: z.string().min(1).max(100),
      industry: z.string().min(1).max(100),
      description: z.string().max(500),
      target_audience: z.string().max(200).optional()
    }),
    claude_api_key: z.string().min(1, 'API key is required').optional()
  }),
  
  themeCustomization: z.object({
    ai_customization_message: z.string().min(1, 'Customization message is required').max(1000),
    site_name: z.string().min(1).max(100),
    instance_id: z.string().uuid('Invalid instance ID')
  })
}

/**
 * Validate request body against schema
 */
export function validateInput<T>(data: unknown, schema: z.ZodSchema<T>): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('🚨 Validation Error Details:', {
        receivedData: JSON.stringify(data, null, 2),
        validationErrors: error.errors
      })
      const message = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      throw new Error(`Validation error: ${message}`)
    }
    throw error
  }
}

/**
 * Log security events
 */
export function logSecurityEvent(
  event: string, 
  details: Record<string, any>, 
  request: NextRequest
) {
  const clientIP = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  console.log(`[SECURITY] ${event}`, {
    timestamp: new Date().toISOString(),
    ip: clientIP,
    userAgent,
    url: request.url,
    ...details
  })
}
