-- =============================================
-- DEVELOPMENT DATABASE SCHEMA (Relaxed RLS)
-- =============================================
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- SITES TABLE (Multi-tenancy)
-- =============================================
CREATE TABLE sites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT UNIQUE NOT NULL,
  subdomain TEXT,
  owner_email TEXT NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
  plan TEXT CHECK (plan IN ('free', 'pro', 'enterprise')) DEFAULT 'free',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PAGES TABLE
-- =============================================
CREATE TABLE pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT,
  status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  theme_id TEXT NOT NULL,
  header_template_id UUID,
  footer_template_id UUID,
  page_template_id UUID,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, slug)
);

-- =============================================
-- TEMPLATES TABLE
-- =============================================
CREATE TABLE templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('header', 'footer', 'page')) NOT NULL,
  theme_id TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, name, type)
);

-- =============================================
-- PAGE BLOCKS TABLE
-- =============================================
CREATE TABLE page_blocks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  props JSONB DEFAULT '{}',
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TEMPLATE BLOCKS TABLE  
-- =============================================
CREATE TABLE template_blocks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  props JSONB DEFAULT '{}',
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- NAVIGATION TABLE
-- =============================================
CREATE TABLE navigation_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  type TEXT CHECK (type IN ('internal', 'external')) NOT NULL,
  href TEXT,
  page_id UUID REFERENCES pages(id) ON DELETE SET NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SITE SETTINGS TABLE
-- =============================================
CREATE TABLE site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, key)
);

-- =============================================
-- FOREIGN KEY CONSTRAINTS
-- =============================================
ALTER TABLE pages 
  ADD CONSTRAINT fk_pages_header_template 
  FOREIGN KEY (header_template_id) REFERENCES templates(id) ON DELETE SET NULL;

ALTER TABLE pages 
  ADD CONSTRAINT fk_pages_footer_template 
  FOREIGN KEY (footer_template_id) REFERENCES templates(id) ON DELETE SET NULL;

ALTER TABLE pages 
  ADD CONSTRAINT fk_pages_page_template 
  FOREIGN KEY (page_template_id) REFERENCES templates(id) ON DELETE SET NULL;

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX idx_sites_domain ON sites(domain);
CREATE INDEX idx_sites_status ON sites(status);
CREATE INDEX idx_sites_owner_email ON sites(owner_email);
CREATE INDEX idx_pages_site_id ON pages(site_id);
CREATE INDEX idx_pages_slug ON pages(site_id, slug);
CREATE INDEX idx_pages_status ON pages(site_id, status);
CREATE INDEX idx_pages_theme_id ON pages(site_id, theme_id);
CREATE INDEX idx_pages_created_at ON pages(site_id, created_at DESC);
CREATE INDEX idx_templates_site_id ON templates(site_id);
CREATE INDEX idx_templates_type ON templates(site_id, type);
CREATE INDEX idx_templates_theme_id ON templates(site_id, theme_id);
CREATE INDEX idx_templates_is_default ON templates(site_id, is_default);
CREATE INDEX idx_templates_theme_type ON templates(site_id, theme_id, type);
CREATE INDEX idx_page_blocks_site_id ON page_blocks(site_id);
CREATE INDEX idx_page_blocks_page_id ON page_blocks(site_id, page_id);
CREATE INDEX idx_page_blocks_order ON page_blocks(page_id, order_index);
CREATE INDEX idx_template_blocks_site_id ON template_blocks(site_id);
CREATE INDEX idx_template_blocks_template_id ON template_blocks(site_id, template_id);
CREATE INDEX idx_template_blocks_order ON template_blocks(template_id, order_index);
CREATE INDEX idx_navigation_site_id ON navigation_items(site_id);
CREATE INDEX idx_navigation_order ON navigation_items(site_id, order_index);
CREATE INDEX idx_navigation_visible ON navigation_items(site_id, is_visible);
CREATE INDEX idx_site_settings_site_id ON site_settings(site_id);
CREATE INDEX idx_site_settings_key ON site_settings(site_id, key);

-- =============================================
-- ROW LEVEL SECURITY (RLS) - DEVELOPMENT VERSION
-- =============================================
-- Enable RLS on all tables
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES - ALLOW ALL FOR DEVELOPMENT
-- =============================================
-- Allow all operations for development (remove in production)
CREATE POLICY "Allow all operations for development" ON sites FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON pages FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON templates FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON page_blocks FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON template_blocks FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON navigation_items FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON site_settings FOR ALL USING (true);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_navigation_updated_at BEFORE UPDATE ON navigation_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- HELPFUL VIEWS FOR QUERYING
-- =============================================
CREATE VIEW pages_with_templates AS
SELECT 
  p.*,
  ht.name as header_template_name,
  ft.name as footer_template_name,
  pt.name as page_template_name,
  s.name as site_name,
  s.domain as site_domain
FROM pages p
LEFT JOIN templates ht ON p.header_template_id = ht.id
LEFT JOIN templates ft ON p.footer_template_id = ft.id  
LEFT JOIN templates pt ON p.page_template_id = pt.id
JOIN sites s ON p.site_id = s.id;

CREATE VIEW templates_with_block_counts AS
SELECT 
  t.*,
  COUNT(tb.id) as block_count,
  s.name as site_name,
  s.domain as site_domain
FROM templates t
LEFT JOIN template_blocks tb ON t.id = tb.template_id
JOIN sites s ON t.site_id = s.id
GROUP BY t.id, s.name, s.domain;

CREATE VIEW site_statistics AS
SELECT 
  s.*,
  COUNT(DISTINCT p.id) as total_pages,
  COUNT(DISTINCT CASE WHEN p.status = 'published' THEN p.id END) as published_pages,
  COUNT(DISTINCT t.id) as total_templates,
  COUNT(DISTINCT n.id) as navigation_items
FROM sites s
LEFT JOIN pages p ON s.id = p.site_id
LEFT JOIN templates t ON s.id = t.site_id
LEFT JOIN navigation_items n ON s.id = n.site_id
GROUP BY s.id;
