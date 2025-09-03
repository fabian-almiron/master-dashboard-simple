# Base Theme

A clean and modern theme for CMS TailWinds with a professional blue color scheme. Perfect for businesses, portfolios, and content-focused websites.

## Features

- **Modern Design**: Clean, professional aesthetic with a cohesive blue color palette
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Performance Optimized**: Built with performance and accessibility in mind
- **Customizable**: Easy to customize with CSS variables and modular components
- **TypeScript Support**: Full TypeScript integration for better development experience
- **Component Library**: Includes utility components (Button, Card, Badge) for consistent styling

## Components Included

### Layout Components
- **Header**: Site navigation with responsive mobile menu
- **Footer**: Comprehensive footer with links and contact information
- **DNDArea**: Dynamic content area for template system

### Content Blocks
- **Hero**: Main landing section with compelling headlines and CTAs
- **Features**: Showcase key features with icons and descriptions
- **CTA**: Call-to-action section to drive conversions
- **Blog**: Display latest blog posts and articles
- **Pricing**: Pricing plans and packages display
- **Testimonials**: Customer testimonials and reviews

### Utility Components
- **Button**: Flexible button component with multiple variants
- **Card**: Reusable card component with customizable styling
- **Badge**: Status and category badges

## Color Palette

The theme uses a professional blue color scheme:

- **Primary**: Blue (#3b82f6) with full shade range (50-900)
- **Gray**: Neutral gray scale for text and UI elements
- **All colors**: Defined as CSS variables for easy customization

## Installation

1. Copy the `base-theme` folder to your `/themes/` directory
2. The theme will be automatically discovered by CMS TailWinds
3. Activate the theme in the admin interface at `/admin/themes`

## Customization

### Colors
Edit the CSS variables in `styles.css` to change the color scheme:

```css
:root {
  --theme-primary-500: 59 130 246;  /* Main brand color */
  /* ... other color variables ... */
}
```

### Typography
Update font families in `tailwind.config.ts`:

```typescript
fontFamily: {
  sans: ["Inter", "sans-serif"],
  heading: ["Inter", "sans-serif"],
}
```

### Components
All components are modular and can be customized individually. Each component exports metadata for the CMS auto-discovery system.

## Development

This theme follows CMS TailWinds theming standards:

- Components export `metadata` for auto-discovery
- Uses theme-specific CSS variables
- Responsive design with Tailwind CSS
- TypeScript support throughout
- Proper component categorization

## Support

For support and customization help, please refer to the CMS TailWinds documentation or contact support.

## Version

**Version**: 1.0.0  
**Author**: CMS TailWinds  
**License**: MIT
