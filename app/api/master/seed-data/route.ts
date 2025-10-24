import { NextRequest, NextResponse } from 'next/server'
import { getMasterSupabaseAdmin } from '@/lib/master-supabase'
import { sanitizeError } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    const masterSupabase = getMasterSupabaseAdmin()
    if (!masterSupabase) {
      throw new Error('Master Supabase admin client not available')
    }

    // Check if cms_templates table exists by trying to query it
    let templatesTableExists = true
    try {
      await masterSupabase.from('cms_templates').select('id').limit(1)
    } catch (error) {
      templatesTableExists = false
      console.log('Templates table does not exist, will create via SQL panel or skip for now')
    }

    // Default templates data
    const defaultTemplates = [
      {
        id: 'business-landing',
        name: 'Business Landing Page',
        description: 'Professional business landing page with hero section, services, and contact form',
        category: 'business',
        git_repo: 'https://bitbucket.org/trukraft/template-business-landing.git',
        git_branch: 'main',
        preview_image_url: '/templates/business-landing.jpg',
        config: {
          sections: ['hero', 'services', 'about', 'contact'],
          color_schemes: ['blue', 'green', 'purple'],
          features: ['responsive', 'seo-optimized', 'fast-loading']
        },
        is_active: true
      },
      {
        id: 'portfolio',
        name: 'Portfolio Showcase',
        description: 'Clean portfolio template for creatives and professionals',
        category: 'portfolio',
        git_repo: 'https://bitbucket.org/trukraft/template-portfolio.git',
        git_branch: 'main',
        preview_image_url: '/templates/portfolio.jpg',
        config: {
          sections: ['hero', 'projects', 'about', 'contact'],
          layouts: ['grid', 'masonry', 'carousel'],
          features: ['image-gallery', 'project-details', 'contact-form']
        },
        is_active: true
      },
      {
        id: 'ecommerce-basic',
        name: 'E-commerce Store',
        description: 'Basic e-commerce template with product catalog and shopping cart',
        category: 'ecommerce',
        git_repo: 'https://bitbucket.org/trukraft/template-ecommerce.git',
        git_branch: 'main',
        preview_image_url: '/templates/ecommerce.jpg',
        config: {
          sections: ['header', 'products', 'cart', 'checkout'],
          payment_methods: ['stripe', 'paypal'],
          features: ['product-search', 'categories', 'user-accounts']
        },
        is_active: true
      },
      {
        id: 'blog-minimal',
        name: 'Minimal Blog',
        description: 'Clean and minimal blog template with focus on content',
        category: 'blog',
        git_repo: 'https://bitbucket.org/trukraft/template-blog.git',
        git_branch: 'main',
        preview_image_url: '/templates/blog.jpg',
        config: {
          sections: ['header', 'posts', 'sidebar', 'footer'],
          post_types: ['article', 'gallery', 'video'],
          features: ['tags', 'categories', 'search', 'comments']
        },
        is_active: true
      },
      {
        id: 'saas-landing',
        name: 'SaaS Landing Page',
        description: 'Modern SaaS product landing page with pricing and features',
        category: 'saas',
        git_repo: 'https://bitbucket.org/trukraft/template-saas.git',
        git_branch: 'main',
        preview_image_url: '/templates/saas.jpg',
        config: {
          sections: ['hero', 'features', 'pricing', 'testimonials', 'signup'],
          pricing_plans: ['basic', 'pro', 'enterprise'],
          features: ['feature-comparison', 'testimonials', 'signup-flow']
        },
        is_active: true
      }
    ]

    // Insert templates (use upsert to avoid conflicts)
    const { data, error } = await masterSupabase
      .from('cms_templates')
      .upsert(defaultTemplates, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })
      .select()

    if (error) {
      throw error
    }

    // Also create some sample deployment logs for demo data
    const sampleDeployments = [
      {
        cms_instance_id: '00000000-0000-0000-0000-000000000001', // Fake UUID for demo
        deployment_id: 'deploy_demo_1',
        status: 'success',
        log_data: { message: 'Demo deployment successful' },
        started_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        completed_at: new Date(Date.now() - 86340000).toISOString(), // 1 day ago + 1 hour
        duration_ms: 60000
      },
      {
        cms_instance_id: '00000000-0000-0000-0000-000000000002', // Fake UUID for demo
        deployment_id: 'deploy_demo_2',
        status: 'success',
        log_data: { message: 'Demo deployment successful' },
        started_at: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        completed_at: new Date(Date.now() - 43140000).toISOString(), // 12 hours ago + 1 hour
        duration_ms: 45000
      },
      {
        cms_instance_id: '00000000-0000-0000-0000-000000000003', // Fake UUID for demo
        deployment_id: 'deploy_demo_3',
        status: 'failed',
        log_data: { message: 'Demo deployment failed' },
        error_message: 'Build timeout exceeded',
        started_at: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
        completed_at: new Date(Date.now() - 21540000).toISOString(), // 6 hours ago + 1 hour
        duration_ms: 120000
      }
    ]

    // Insert sample deployment logs
    await masterSupabase
      .from('deployment_logs')
      .upsert(sampleDeployments, { 
        onConflict: 'deployment_id',
        ignoreDuplicates: true 
      })

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        templates_created: data?.length || 0,
        deployment_logs_created: sampleDeployments.length
      }
    })

  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to seed database',
        details: sanitizeError(error)
      },
      { status: 500 }
    )
  }
}
