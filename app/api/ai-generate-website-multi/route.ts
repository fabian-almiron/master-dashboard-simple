import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs/promises'
import path from 'path'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface GenerationStage {
  stage: number
  name: string
  description: string
  files: { [key: string]: string }
}

interface GenerationContext {
  originalPrompt: string
  websiteDescription: string
  techStack: string[]
  fileStructure: string[]
  completedStages: GenerationStage[]
}

async function generateStage(
  stageNumber: number,
  context: GenerationContext,
  stagePrompt: string
): Promise<GenerationStage> {
  console.log(`🚀 Generating Stage ${stageNumber}...`)

  const systemPrompt = `You are an expert Next.js frontend developer creating a complete client-side website.

CONTEXT FROM PREVIOUS STAGES:
- Original Request: ${context.originalPrompt}
- Website Description: ${context.websiteDescription}
- Tech Stack: ${context.techStack.join(', ')}
- Existing File Structure: ${context.fileStructure.join(', ')}
- Completed Stages: ${context.completedStages.map(s => s.name).join(', ')}

CURRENT STAGE: ${stageNumber}
${stagePrompt}

CRITICAL: Return ONLY a valid JSON object with this structure:
{
  "stage": ${stageNumber},
  "name": "Stage Name",
  "description": "What this stage accomplishes",
  "files": {
    "file/path.ext": "file content as escaped JSON string",
    "another/file.ext": "file content as escaped JSON string"
  }
}

Requirements:
- Each file content must be a properly escaped JSON string (use \\n for newlines, \\" for quotes)
- Build upon the existing structure from previous stages
- Use Next.js 14+, TypeScript, and Tailwind CSS
- Make sure all file paths use forward slashes
- Do not include any markdown formatting or extra text outside the JSON`

  const stream = await anthropic.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 32000,
    temperature: 0.7,
    stream: true,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Generate the files for this stage based on the context and requirements.`
      }
    ]
  })

  let fullResponse = ''
  let stopReason = null

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta') {
      if (chunk.delta.type === 'text_delta') {
        fullResponse += chunk.delta.text
      }
    } else if (chunk.type === 'message_delta') {
      if (chunk.delta.stop_reason) {
        stopReason = chunk.delta.stop_reason
      }
    } else if (chunk.type === 'message_stop') {
      break
    }
  }

  if (stopReason === 'refusal') {
    throw new Error('AI declined to generate content for safety reasons')
  }

  let cleanedResponse = fullResponse.trim()
  cleanedResponse = cleanedResponse.replace(/```json\s*/, '').replace(/```\s*$/, '')
  
  const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('No JSON found in AI response')
  }
  
  return JSON.parse(jsonMatch[0])
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Anthropic API key not configured' }, { status: 500 })
    }

    console.log('🎯 Starting enhanced multi-stage website generation...')

    const context: GenerationContext = {
      originalPrompt: prompt,
      websiteDescription: '',
      techStack: ['Next.js 14+', 'TypeScript', 'Tailwind CSS'],
      fileStructure: [],
      completedStages: []
    }

    // STAGE 1: FOUNDATION & CONFIGURATION
    const stage1Prompt = `
STAGE 1: FOUNDATION & CONFIGURATION

CRITICAL REQUIREMENTS FROM RULES:
- Include ALL required dependencies in package.json with proper/latest stable versions
- Configure next.config.js properly (remotePatterns for Unsplash/Pexels images, output settings)
- Include proper TypeScript configuration with strict mode
- Add all necessary Tailwind plugins and ensure they're imported correctly
- Configure for static export if needed
- NO server-side dependencies or API routes

Generate these foundational files:
1. package.json - Include Next.js 14+, React 18+, TypeScript, Tailwind CSS, and ALL necessary dependencies
2. next.config.js - Configure remotePatterns for external images (unsplash.com, images.unsplash.com, pexels.com, images.pexels.com)
3. tailwind.config.ts - Include all necessary plugins, proper content paths, custom theme if needed
4. postcss.config.js - Standard PostCSS configuration
5. tsconfig.json - Strict TypeScript settings, proper paths configuration
6. src/app/globals.css - Tailwind imports, custom CSS variables, base styles
7. src/app/layout.tsx - Root layout with proper metadata, font loading, theme provider setup
8. README.md - Comprehensive setup and deployment instructions
9. .gitignore - Proper Next.js gitignore

Focus on creating a bulletproof foundation that supports:
- Working external images from Unsplash/Pexels
- Static export capability
- Strict TypeScript
- Modern Tailwind features
- Performance optimization`

    const stage1 = await generateStage(1, context, stage1Prompt)
    context.completedStages.push(stage1)
    context.fileStructure.push(...Object.keys(stage1.files))
    context.websiteDescription = stage1.description

    // STAGE 2: UI COMPONENTS & DESIGN SYSTEM
    const stage2Prompt = `
STAGE 2: UI COMPONENTS & DESIGN SYSTEM

CRITICAL REQUIREMENTS FROM RULES:
- Use consistent export patterns (prefer default exports for components)
- Ensure all UI components are properly exported and importable
- Include proper TypeScript interfaces for all props
- Use proper forwardRef patterns where needed
- Components should be reusable and well-structured
- Follow atomic design principles (atoms, molecules, organisms)
- Implement proper accessibility (ARIA labels, keyboard navigation, focus management)
- Use semantic HTML elements
- Ensure proper color contrast and typography scaling

Generate the complete UI component system:
1. src/components/ui/ - Core reusable UI components (Button, Card, Input, Modal, etc.)
2. src/components/layout/ - Layout components (Header, Footer, Navigation)
3. src/types/index.ts - TypeScript interfaces for all components and data structures
4. src/lib/utils.ts - Utility functions, constants, helper functions
5. src/contexts/ - React Context providers for global state
6. src/hooks/ - Custom React hooks

Component Structure Requirements:
- Proper TypeScript interfaces for all props
- Accessibility features built-in
- Responsive design with mobile-first approach
- Consistent styling patterns
- Reusable and composable
- Touch-friendly interactions for mobile

Build upon Stage 1 foundation. Create a comprehensive design system that will support all pages and features.`

    const stage2 = await generateStage(2, context, stage2Prompt)
    context.completedStages.push(stage2)
    context.fileStructure.push(...Object.keys(stage2.files))

    // STAGE 3: PAGES & CONTENT STRUCTURE
    const stage3Prompt = `
STAGE 3: PAGES & CONTENT STRUCTURE

CRITICAL REQUIREMENTS FROM RULES:
- Create ALL pages referenced in navigation, footer, and internal links
- Every link should lead to an actual page with meaningful content
- Implement proper 404 handling with custom not-found.tsx
- All pages should be static/client-side rendered
- Include proper page metadata and SEO tags
- Include comprehensive mock data in static files
- Create realistic content that matches the website purpose
- All data should be in /lib or /data folders (no API calls)

Generate complete page structure:
1. src/app/page.tsx - Main homepage with hero, features, content sections
2. src/app/not-found.tsx - Custom 404 page with proper styling and navigation
3. Additional pages based on website type (about, services, contact, portfolio, etc.)
4. src/lib/data.ts - Comprehensive mock data with realistic content
5. Page-specific components in src/components/[feature-specific]/

Content Requirements:
- Realistic, meaningful content that matches the website purpose
- Proper SEO meta tags and Open Graph data
- Working image URLs from Unsplash/Pexels with proper alt tags
- Responsive image sizing using Next.js Image component
- Proper content hierarchy and structure
- All navigation links should work (no broken links)

Build upon Stages 1 & 2. Create all pages with real content and proper navigation.`

    const stage3 = await generateStage(3, context, stage3Prompt)
    context.completedStages.push(stage3)
    context.fileStructure.push(...Object.keys(stage3.files))

    // STAGE 4: INTERACTIVITY & ADVANCED FEATURES
    const stage4Prompt = `
STAGE 4: INTERACTIVITY & ADVANCED FEATURES

CRITICAL REQUIREMENTS FROM RULES:
- Implement all interactive features using client-side JavaScript/React
- Use localStorage/sessionStorage for data persistence where needed
- Add proper form validation (client-side)
- Include loading states, error handling, and user feedback
- Use React Context for global state management
- Implement proper routing and navigation
- Implement smooth animations and transitions
- Add interactive elements (modals, dropdowns, carousels, etc.)
- Include search/filter functionality (client-side)
- Implement theme switching (light/dark mode) if applicable
- Add proper loading skeletons and micro-interactions

Generate advanced interactive features:
1. Enhanced interactive components (forms, modals, carousels, etc.)
2. Client-side search/filter functionality
3. Theme switching system (if applicable)
4. Form validation and submission handling
5. Loading states and error boundaries
6. Animation and transition systems
7. Local storage integration for user preferences
8. Advanced state management with Context API

Quality Requirements:
- All code should be production-ready
- Proper error boundaries and error handling
- Performance optimizations (memoization, lazy loading)
- Cross-browser compatibility
- Proper TypeScript usage with no 'any' types
- Meaningful variable and function names

Build upon all previous stages. Add the final layer of interactivity and polish to create a fully functional frontend application.`

    const stage4 = await generateStage(4, context, stage4Prompt)
    context.completedStages.push(stage4)
    context.fileStructure.push(...Object.keys(stage4.files))

    // Combine all files from all stages
    const allFiles: { [key: string]: string } = {}
    let totalFiles = 0

    for (const stage of context.completedStages) {
      Object.assign(allFiles, stage.files)
      totalFiles += Object.keys(stage.files).length
    }

    // Create the ai-generated-site directory
    const projectRoot = process.cwd()
    const siteDir = path.join(projectRoot, 'ai-generated-site')

    try {
      await fs.rm(siteDir, { recursive: true, force: true })
    } catch (error) {
      // Directory doesn't exist, which is fine
    }

    await fs.mkdir(siteDir, { recursive: true })

    console.log('📁 Creating enhanced multi-stage file structure...')

    // Create all the files
    for (const [filePath, content] of Object.entries(allFiles)) {
      const fullPath = path.join(siteDir, filePath)
      await fs.mkdir(path.dirname(fullPath), { recursive: true })
      await fs.writeFile(fullPath, content, 'utf-8')
    }

    console.log('✅ Enhanced multi-stage website generated successfully!')

    return NextResponse.json({
      success: true,
      message: 'Enhanced multi-stage website generated successfully!',
      description: `${context.websiteDescription} Generated using a comprehensive 4-stage approach following strict frontend-only requirements with working images, complete navigation, and production-ready code.`,
      stages: context.completedStages.map(s => ({
        stage: s.stage,
        name: s.name,
        description: s.description,
        filesCount: Object.keys(s.files).length
      })),
      totalFiles: totalFiles,
      location: 'ai-generated-site/',
      files: Object.keys(allFiles)
    })

  } catch (error) {
    console.error('Error in enhanced multi-stage generation:', error)
    
    return NextResponse.json({
      error: 'Failed to generate website',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
