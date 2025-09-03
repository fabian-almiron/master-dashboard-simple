# Build Scripts

This directory contains build-time scripts for the CMS TailWinds application.

## discover-components.js

**Purpose:** Automatically discovers and registers UI components in all themes during the build process.

**What it does:**
- Scans all theme directories in `/themes/`
- Finds all `.tsx` component files in each theme's `/ui/` directory
- Checks which components have proper metadata exports
- Regenerates `auto-register.tsx` files with discovered components
- Preserves existing theme metadata (name, description, author, version)

**When it runs:**
- Before every build (`npm run build`)
- During Vercel deployments (`npm run build:vercel`)
- After package installation (`npm run postinstall`)
- Can be run manually (`npm run discover:components`)

**Output:**
- Updates `themes/[theme-name]/auto-register.tsx` for each theme
- Colorized console output showing discovery progress
- Component counts and registration statistics

**Benefits:**
- No more manual component registration
- New components are automatically available after adding them to `/ui/`
- Build-time discovery ensures components are always up-to-date
- Prevents runtime errors from missing component registrations

**Example output:**
```
🎨 Build-time Component Discovery
ℹ Found 1 theme(s): base-theme
ℹ Discovering components for theme: base-theme
ℹ Found 12 total components (9 main, 3 sub)
✅ Regenerated auto-register.tsx for base-theme with 9 components
✅ Component discovery completed: 1/1 themes processed, 9 total components registered
```

## Usage

### Manual Discovery
```bash
npm run discover:components
```

### Build with Discovery (automatic)
```bash
npm run build
```

### Development
Component discovery runs automatically during builds, so developers just need to:
1. Add new component files to `themes/[theme-name]/ui/`
2. Ensure components export proper metadata
3. Build or deploy - components are automatically registered!

## Component Requirements

For a component to be auto-discovered and registered, it must:

1. Be a `.tsx` file in a theme's `/ui/` directory
2. Export metadata with the `ComponentInfo` interface:

```typescript
export const metadata: ComponentInfo = {
  type: 'MyComponent',
  name: 'My Component',
  category: 'content-blocks',
  description: 'A custom component',
  props: {
    // Component props schema
  }
}
```

3. Export the component as default:

```typescript
export default function MyComponent(props: any) {
  return <div>My Component</div>
}
```
