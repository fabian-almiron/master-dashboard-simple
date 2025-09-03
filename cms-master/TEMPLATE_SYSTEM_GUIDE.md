# 🎯 Template System Guide (Elementor-Style)

## How the Template System Works

The CMS TailWinds template system works exactly like Elementor - you can visually build reusable templates by dragging and dropping components, and they get saved to the database.

### 🔧 **Fixed Issues**

1. **Service Key Loading**: Fixed environment variable loading for server-side operations
2. **RLS Policies**: Created API routes to handle database operations server-side
3. **Authentication**: Bypassed client-side authentication issues for development
4. **Multiple Clients**: Fixed Supabase client initialization conflicts

### 📊 **Database Structure**

**Templates Table:**
```sql
templates (
  id UUID PRIMARY KEY,
  site_id UUID REFERENCES sites(id),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('header', 'footer', 'page')),
  theme_id TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

**Template Blocks Table:**
```sql
template_blocks (
  id UUID PRIMARY KEY,
  site_id UUID REFERENCES sites(id),
  template_id UUID REFERENCES templates(id),
  component_type TEXT NOT NULL, -- 'Header', 'Hero', 'Features', etc.
  order_index INTEGER NOT NULL, -- Position in template (0, 1, 2...)
  props JSONB DEFAULT '{}',     -- Component properties as JSON
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ
)
```

### 🎨 **How It Works (Elementor-Style)**

#### **Step 1: Create Template**
- User creates a template (header/footer/page)
- Template metadata stored in `templates` table
- Each template has a unique ID and type

#### **Step 2: Add Components (Drag & Drop)**
- User drags components from palette to canvas
- Each component becomes a row in `template_blocks` table
- Components are ordered by `order_index` field
- Component properties stored as JSON in `props` field

#### **Step 3: Configure Components**
- Each component stores its props in JSON format
- Props can be edited via the block editor modal
- Changes are saved immediately to database via API routes

#### **Step 4: Apply to Pages**
- Pages reference templates via foreign keys:
  - `header_template_id`
  - `footer_template_id` 
  - `page_template_id`
- When rendering, system loads template blocks
- Each component renders with its stored props

### 🚀 **Example Template Structure**

**Template Record:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Main Header",
  "type": "header",
  "theme_id": "default",
  "site_id": "site-uuid"
}
```

**Template Blocks:**
```json
[
  {
    "id": "block-1",
    "template_id": "123e4567-e89b-12d3-a456-426614174000",
    "component_type": "Header",
    "order_index": 0,
    "props": {
      "siteName": "My Store",
      "showNavigation": true,
      "backgroundColor": "#ffffff"
    },
    "is_visible": true
  },
  {
    "id": "block-2", 
    "template_id": "123e4567-e89b-12d3-a456-426614174000",
    "component_type": "Hero",
    "order_index": 1,
    "props": {
      "title": "Welcome to Our Store",
      "subtitle": "Find amazing products",
      "buttonText": "Shop Now",
      "buttonUrl": "/products"
    },
    "is_visible": true
  }
]
```

### 🛠️ **API Routes (Server-Side Operations)**

**`/api/templates`** - Handles template operations:
- `POST /api/templates` - Create/update/delete template blocks
- `GET /api/templates?templateId=xxx` - Get template blocks

**`/api/sites`** - Handles site operations:
- `GET /api/sites?action=getCurrentSite` - Get current site

### 🎯 **Visual Builder Interface**

The template editor provides:
- **Component Palette**: Drag components from left sidebar
- **Canvas**: Drop zone where components are arranged
- **Block Editor**: Modal for editing component properties
- **Real-time Saving**: Changes saved automatically via API
- **Preview**: See how template looks before applying

### 🧪 **Testing the System**

1. **Visit `/test-template`** - Interactive test page
2. **Create Template** - Creates a new template in database
3. **Add Components** - Adds Header and Hero components
4. **Load Blocks** - Retrieves all blocks for a template
5. **Update Props** - Modifies component properties
6. **Delete Blocks** - Removes components from template

### 🔄 **Integration with Pages**

When a page uses a template:
1. Page loads template blocks from database via API
2. Each component renders with its stored props
3. Components appear in the correct order
4. Template can be changed without affecting page content

### 📝 **Available Components**

From the `/default` theme:
- **Header** - Site navigation and branding
- **Hero** - Hero section with title, subtitle, button
- **Features** - Feature grid with icons and descriptions
- **CTA** - Call-to-action section
- **Testimonials** - Customer testimonials
- **Pricing** - Pricing tables
- **Blog** - Blog post grid
- **Footer** - Site footer with links

### 🎨 **Template Types**

1. **Header Templates** - Site navigation, branding, top sections
2. **Footer Templates** - Site footer, links, bottom sections  
3. **Page Templates** - Full page layouts with content areas

### 🔧 **Technical Implementation**

- **Frontend**: React with drag-and-drop (react-beautiful-dnd)
- **Backend**: Next.js API routes with Supabase
- **Database**: PostgreSQL with JSONB for component props
- **Real-time**: Automatic saving via API calls
- **Multi-tenant**: Site isolation via `site_id` foreign keys

This system provides the same powerful visual building experience as Elementor, with the flexibility to create reusable templates that can be applied to multiple pages!
