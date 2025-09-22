-- =============================================
-- MASTER DASHBOARD SCHEMA
-- =============================================
-- Add these tables to your existing Supabase project
-- This works alongside your existing sites/deployments tables

-- CMS Instances table (tracks all managed websites)
CREATE TABLE IF NOT EXISTS public.cms_instances (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying(255) NOT NULL,
  domain character varying(255),
  subdomain character varying(255),
  status character varying(50) DEFAULT 'creating'::character varying 
    CHECK (status::text = ANY (ARRAY['creating'::character varying, 'active'::character varying, 'inactive'::character varying, 'failed'::character varying, 'deleting'::character varying]::text[])),
  
  -- Vercel deployment info
  vercel_project_id character varying(255),
  vercel_deployment_url text,
  vercel_git_repo text,
  vercel_team_id character varying(255),
  
  -- Supabase configuration
  supabase_project_ref character varying(255),
  supabase_url text,
  supabase_anon_key text,
  supabase_service_key text, -- Encrypted
  
  -- Owner information
  owner_name character varying(255) NOT NULL,
  owner_email character varying(255) NOT NULL,
  
  -- Deployment settings
  auto_deploy boolean DEFAULT true,
  branch character varying(100) DEFAULT 'main'::character varying,
  build_command character varying(255) DEFAULT 'npm run build'::character varying,
  
  -- Metadata
  settings jsonb DEFAULT '{}'::jsonb,
  deployment_config jsonb DEFAULT '{}'::jsonb,
  last_deployed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT cms_instances_pkey PRIMARY KEY (id),
  CONSTRAINT cms_instances_name_unique UNIQUE (name),
  CONSTRAINT cms_instances_owner_email_check CHECK (owner_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Deployment Logs table (tracks deployment history)
CREATE TABLE IF NOT EXISTS public.deployment_logs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  cms_instance_id uuid NOT NULL,
  deployment_id character varying(255),
  status character varying(50) DEFAULT 'pending'::character varying
    CHECK (status::text = ANY (ARRAY['pending'::character varying, 'building'::character varying, 'success'::character varying, 'failed'::character varying, 'cancelled'::character varying]::text[])),
  log_data jsonb DEFAULT '{}'::jsonb,
  error_message text,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  duration_ms integer,
  
  CONSTRAINT deployment_logs_pkey PRIMARY KEY (id),
  CONSTRAINT deployment_logs_cms_instance_id_fkey FOREIGN KEY (cms_instance_id) REFERENCES public.cms_instances(id) ON DELETE CASCADE
);

-- Notifications table (system alerts and messages)
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  cms_instance_id uuid,
  type character varying(50) NOT NULL
    CHECK (type::text = ANY (ARRAY['deployment'::character varying, 'error'::character varying, 'success'::character varying, 'warning'::character varying]::text[])),
  title character varying(255) NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_cms_instance_id_fkey FOREIGN KEY (cms_instance_id) REFERENCES public.cms_instances(id) ON DELETE CASCADE
);

-- CMS Templates table (available templates for deployment)
CREATE TABLE IF NOT EXISTS public.cms_templates (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying(255) NOT NULL,
  description text,
  preview_image_url text,
  template_path character varying(500) NOT NULL,
  category character varying(100),
  is_active boolean DEFAULT true,
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT cms_templates_pkey PRIMARY KEY (id),
  CONSTRAINT cms_templates_name_unique UNIQUE (name)
);

-- Supabase Projects table (tracks Supabase project associations)
CREATE TABLE IF NOT EXISTS public.supabase_projects (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  cms_instance_id uuid NOT NULL,
  project_ref character varying(255) NOT NULL,
  project_id character varying(255),
  organization_id character varying(255),
  database_url text,
  api_url text,
  status character varying(50) DEFAULT 'creating'::character varying
    CHECK (status::text = ANY (ARRAY['creating'::character varying, 'active'::character varying, 'paused'::character varying, 'inactive'::character varying]::text[])),
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT supabase_projects_pkey PRIMARY KEY (id),
  CONSTRAINT supabase_projects_cms_instance_id_fkey FOREIGN KEY (cms_instance_id) REFERENCES public.cms_instances(id) ON DELETE CASCADE,
  CONSTRAINT supabase_projects_project_ref_unique UNIQUE (project_ref)
);

-- Master Settings table (application configuration)
CREATE TABLE IF NOT EXISTS public.master_settings (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  key character varying(255) NOT NULL,
  value jsonb NOT NULL,
  description text,
  is_encrypted boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT master_settings_pkey PRIMARY KEY (id),
  CONSTRAINT master_settings_key_unique UNIQUE (key)
);

-- Instance Analytics table (metrics and usage data)
CREATE TABLE IF NOT EXISTS public.instance_analytics (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  cms_instance_id uuid NOT NULL,
  metric_type character varying(100) NOT NULL,
  metric_value numeric NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  recorded_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT instance_analytics_pkey PRIMARY KEY (id),
  CONSTRAINT instance_analytics_cms_instance_id_fkey FOREIGN KEY (cms_instance_id) REFERENCES public.cms_instances(id) ON DELETE CASCADE
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- CMS Instances indexes
CREATE INDEX IF NOT EXISTS idx_cms_instances_owner_email ON public.cms_instances(owner_email);
CREATE INDEX IF NOT EXISTS idx_cms_instances_status ON public.cms_instances(status);
CREATE INDEX IF NOT EXISTS idx_cms_instances_created_at ON public.cms_instances(created_at DESC);

-- Deployment Logs indexes
CREATE INDEX IF NOT EXISTS idx_deployment_logs_cms_instance_id ON public.deployment_logs(cms_instance_id);
CREATE INDEX IF NOT EXISTS idx_deployment_logs_status ON public.deployment_logs(status);
CREATE INDEX IF NOT EXISTS idx_deployment_logs_started_at ON public.deployment_logs(started_at DESC);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_cms_instance_id ON public.notifications(cms_instance_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- CMS Templates indexes
CREATE INDEX IF NOT EXISTS idx_cms_templates_is_active ON public.cms_templates(is_active);
CREATE INDEX IF NOT EXISTS idx_cms_templates_category ON public.cms_templates(category);

-- Instance Analytics indexes
CREATE INDEX IF NOT EXISTS idx_instance_analytics_cms_instance_id ON public.instance_analytics(cms_instance_id);
CREATE INDEX IF NOT EXISTS idx_instance_analytics_metric_type ON public.instance_analytics(metric_type);
CREATE INDEX IF NOT EXISTS idx_instance_analytics_recorded_at ON public.instance_analytics(recorded_at DESC);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.cms_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployment_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supabase_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.master_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instance_analytics ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (you can customize these based on your needs)
-- For now, allow service role to access everything

-- CMS Instances policies
CREATE POLICY "Service role can manage cms_instances" ON public.cms_instances
  FOR ALL USING (auth.role() = 'service_role');

-- Deployment Logs policies  
CREATE POLICY "Service role can manage deployment_logs" ON public.deployment_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Notifications policies
CREATE POLICY "Service role can manage notifications" ON public.notifications
  FOR ALL USING (auth.role() = 'service_role');

-- CMS Templates policies
CREATE POLICY "Service role can manage cms_templates" ON public.cms_templates
  FOR ALL USING (auth.role() = 'service_role');

-- Supabase Projects policies
CREATE POLICY "Service role can manage supabase_projects" ON public.supabase_projects
  FOR ALL USING (auth.role() = 'service_role');

-- Master Settings policies
CREATE POLICY "Service role can manage master_settings" ON public.master_settings
  FOR ALL USING (auth.role() = 'service_role');

-- Instance Analytics policies
CREATE POLICY "Service role can manage instance_analytics" ON public.instance_analytics
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================
-- SAMPLE DATA (OPTIONAL)
-- =============================================

-- Insert a default CMS template
INSERT INTO public.cms_templates (name, description, template_path, category, is_active) 
VALUES (
  'Default CMS Template',
  'A modern, responsive CMS template with drag-and-drop page builder',
  'https://github.com/your-org/cms-template.git',
  'business',
  true
) ON CONFLICT (name) DO NOTHING;

-- Insert initial master settings
INSERT INTO public.master_settings (key, value, description) VALUES
  ('max_instances_per_user', '10', 'Maximum number of CMS instances per user'),
  ('default_template_id', '""', 'Default template ID for new instances'),
  ('maintenance_mode', 'false', 'Enable maintenance mode')
ON CONFLICT (key) DO NOTHING;

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_cms_instances_updated_at BEFORE UPDATE ON public.cms_instances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cms_templates_updated_at BEFORE UPDATE ON public.cms_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_supabase_projects_updated_at BEFORE UPDATE ON public.supabase_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_master_settings_updated_at BEFORE UPDATE ON public.master_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- COMPLETION MESSAGE
-- =============================================
DO $$
BEGIN
    RAISE NOTICE 'Master Dashboard schema created successfully!';
    RAISE NOTICE 'Tables created: cms_instances, deployment_logs, notifications, cms_templates, supabase_projects, master_settings, instance_analytics';
    RAISE NOTICE 'Your existing sites, deployments, and site_templates tables are preserved.';
END $$;
