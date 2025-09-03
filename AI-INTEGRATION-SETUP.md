# AI Theme Customization Setup Guide

## Overview
This implementation adds AI-powered theme customization to the CMS Master Dashboard. Users can now describe their vision and have Claude AI generate a custom theme before deployment.

## Features Added

### 1. UI Enhancements (in `/app/master/create/page.tsx`)
- ✅ AI Theme Customization toggle section
- ✅ Message field for user vision description
- ✅ Industry/business type selector
- ✅ Design style selector (minimal, modern, professional, creative, tech)
- ✅ Primary color picker (optional)
- ✅ AI customization step in deployment progress

### 2. AI Rules System
- ✅ Created comprehensive JSON rules file (`ai-theme-customization-rules.json`)
- ✅ Defines theme structure, component requirements, and styling guidelines
- ✅ Includes industry-specific content examples
- ✅ Quality assurance checklist for AI

### 3. API Integration
- ✅ New API route: `/api/master/ai-generate-theme`
- ✅ Claude API integration for theme generation
- ✅ Base theme analysis and customization
- ✅ Integration with deployment pipeline

### 4. Deployment Integration
- ✅ AI theme generation step added to deployment process
- ✅ Custom theme storage in CMS instance settings
- ✅ Fallback to default theme if AI generation fails

## Environment Variables Required

Add to your `.env.local`:

```env
# Claude API Key for AI theme generation
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# Base URL for internal API calls (usually automatic)
NEXTAUTH_URL=http://localhost:3000
```

## How It Works

1. **User Input**: User enables AI customization and describes their vision
2. **AI Processing**: Claude analyzes the request using comprehensive rules
3. **Theme Generation**: AI generates custom theme files (components, styles, config)
4. **Integration**: Custom theme is integrated into deployment process
5. **Deployment**: Website deploys with the AI-generated custom theme

## File Structure Created

```
ai-theme-customization-rules.json    # AI rules and guidelines
app/
├── master/create/page.tsx           # Updated with AI UI
└── api/master/
    ├── ai-generate-theme/route.ts   # New AI generation endpoint
    └── deploy/route.ts              # Updated with AI integration
```

## AI Generation Process

1. **Analysis**: AI analyzes user input, industry, and style preferences
2. **Color Generation**: Creates cohesive color palette based on requirements
3. **Component Modification**: Updates all theme components with new styling
4. **Content Customization**: Generates industry-appropriate content
5. **Validation**: Ensures all technical requirements are met

## Theme Output

The AI generates a complete theme package including:
- `auto-register.tsx` - Component registry
- `styles.css` - Custom CSS variables and styles
- `tailwind.config.ts` - Tailwind configuration
- All UI components (Header, Footer, Hero, Features, etc.)
- Industry-appropriate content and styling

## Testing

1. Navigate to `http://localhost:3000/master/create`
2. Fill in basic website information
3. Enable "AI Theme Customization"
4. Describe your vision in detail
5. Select industry and design style
6. Deploy and watch AI customize the theme

## Fallback Behavior

- If AI generation fails, deployment continues with default theme
- Errors are logged but don't block the deployment process
- Users are notified if AI customization was not successful

## Performance Notes

- AI generation adds ~10-30 seconds to deployment time
- Generated themes are cached in CMS instance settings
- Base theme files are loaded once and reused
- Claude API calls are optimized for efficiency

## Future Enhancements

- Real-time theme preview
- Multiple theme variants
- User feedback integration
- Theme marketplace
- Advanced customization options
