# 🚀 V0-CMS - Modern Page Builder & Content Management System

A powerful, modern CMS built with Next.js 15, featuring a visual drag-and-drop page builder, dynamic navigation management, and a professional admin interface.

![CMS Demo](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)

## ✨ Features

### 🎨 **Visual Page Builder**
- **Drag & Drop Interface**: Intuitive component-based page building
- **Real-time Preview**: See changes instantly as you build
- **Component Library**: Pre-built components (Hero, Features, Pricing, Blog, etc.)
- **Visual Block Management**: Show/hide, reorder, and delete components easily

### 📄 **Page Management**
- **Dynamic Pages**: Create, edit, delete, and publish pages
- **Smart Routing**: Automatic URL generation from page titles
- **Status Management**: Draft and published states
- **Search & Filter**: Find pages quickly with built-in search
- **SEO Ready**: Meta descriptions and clean URLs

### 🧭 **Navigation Manager**
- **Dynamic Menus**: Manage header navigation from admin panel
- **Link Types**: Internal pages and external URLs
- **Visibility Control**: Show/hide navigation items
- **Auto-sync**: Header updates automatically with navigation changes

### 🎯 **Admin Interface**
- **Professional Dashboard**: Analytics overview and quick actions
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modular Architecture**: Clean, maintainable code structure
- **Real-time Feedback**: Instant save confirmations and status updates

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Data Storage**: localStorage (Supabase-ready)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fabian-almiron/v0-cms.git
   cd v0-cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📖 Usage Guide

### 🏠 **Getting Started**
1. Visit `/admin` to access the admin panel
2. Go to **Pages** to create your first page
3. Use the **Page Builder** to add and arrange components
4. Manage navigation through the **Navigation** section
5. Publish your pages and see them live on the frontend

### 📝 **Creating Pages**
1. Navigate to **Admin → Pages → New Page**
2. Enter page title, URL slug, and description
3. Choose publish status (Draft/Published)
4. Click **Create Page** to open the page builder
5. Drag components from the sidebar to build your page
6. Click **Save** to persist your changes

### 🧭 **Managing Navigation**
1. Go to **Admin → Navigation**
2. Add navigation items with **Add Navigation Item**
3. Choose between:
   - **Internal Pages**: Link to your CMS pages
   - **External URLs**: Link to external websites or anchors
4. Reorder items and toggle visibility as needed
5. Changes appear instantly in the site header

### 🎨 **Page Builder**
- **Drag components** from the left sidebar to the main area
- **Reorder components** by dragging them up or down
- **Toggle visibility** with the eye icon
- **Delete components** with the trash icon
- **Preview mode** shows how visitors will see the page
- **Save frequently** to persist your changes

## 📁 Project Structure

```
v0-cms/
├── app/
│   ├── [slug]/           # Dynamic page routes
│   ├── admin/            # Admin panel routes
│   │   ├── pages/        # Page management
│   │   ├── builder/      # Visual page builder
│   │   ├── navigation/   # Navigation manager
│   │   ├── analytics/    # Analytics dashboard
│   │   └── settings/     # System settings
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with header/footer
│   └── page.tsx          # Homepage
├── components/
│   ├── cms/              # CMS-specific components
│   │   ├── AdminSidebar.tsx
│   │   ├── PageBuilder.tsx
│   │   ├── ComponentPalette.tsx
│   │   └── DraggableBlock.tsx
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Site header with dynamic nav
│   ├── Footer.tsx        # Site footer
│   └── [page-components] # Page building blocks
├── lib/
│   ├── cms-types.ts      # TypeScript definitions
│   ├── component-registry.tsx # Component mapping
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🔧 Configuration

### 🗄️ **Data Storage**
Currently uses localStorage for data persistence. Ready for Supabase integration:

- **Pages**: Stored in `cms_pages` localStorage key
- **Navigation**: Stored in `cms_navigation` localStorage key
- **Database schemas** available in `lib/supabase-utils.ts`

### 🎨 **Customization**
- **Components**: Add new page components in `components/` and register in `lib/component-registry.tsx`
- **Styling**: Customize theme in `tailwind.config.ts`
- **Admin Interface**: Extend admin functionality in `app/admin/`

## 🔄 Database Integration (Optional)

Ready for Supabase integration with provided schemas:

```sql
-- Pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page blocks table
CREATE TABLE page_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  props JSONB DEFAULT '{}',
  order_index INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 📚 Documentation

- **[Admin Guide](./ADMIN-GUIDE.md)**: Complete user guide for content editors
- **[Technical Documentation](./CMS-README.md)**: Developer documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Features Roadmap

- [ ] **Multi-language support**
- [ ] **User authentication & roles**
- [ ] **Media library manager**
- [ ] **Form builder**
- [ ] **SEO optimization tools**
- [ ] **Theme customization**
- [ ] **Export/Import functionality**

## 💡 Built With Love

This CMS was built to be:
- **Developer-friendly**: Clean, maintainable code
- **User-friendly**: Intuitive admin interface
- **Performance-focused**: Fast loading and rendering
- **Scalable**: Ready for production use

---

**Made with ❤️ and Next.js**

For questions or support, please open an issue on GitHub. 