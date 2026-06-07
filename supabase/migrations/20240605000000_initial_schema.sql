-- NexVolt Initial Schema

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  voltage TEXT,
  capacity TEXT,
  chemistry TEXT DEFAULT 'LiFePO4',
  weight TEXT,
  dimensions TEXT,
  cycle_life INTEGER DEFAULT 6000,
  warranty TEXT,
  description TEXT,
  features JSONB DEFAULT '[]',
  images TEXT[] DEFAULT '{}',
  documents JSONB DEFAULT '[]',
  price DECIMAL,
  status TEXT DEFAULT 'active',
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads Table
CREATE TABLE contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT,
  type TEXT DEFAULT 'general', -- 'general', 'quote', 'dealer'
  status TEXT DEFAULT 'new',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dealer Applications
CREATE TABLE dealer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  business_volume TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Energy Calculator Submissions
CREATE TABLE calculator_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  load_kwh DECIMAL,
  backup_hours DECIMAL,
  recommended_capacity DECIMAL,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Settings
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies (Public Read for products and settings)
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (status = 'active');
CREATE POLICY "Public Read Settings" ON site_settings FOR SELECT USING (true);

-- Lead insertions (Public access)
CREATE POLICY "Public Insert Leads" ON contact_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Dealer Apps" ON dealer_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Calc Submissions" ON calculator_submissions FOR INSERT WITH CHECK (true);
