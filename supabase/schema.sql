-- ============================================
-- GOLD PRICE LIVE - PAGE MANAGEMENT SYSTEM
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- NOTE: Articles table already exists from previous CMS
-- This schema adds the pages and page_components tables

-- ============================================
-- PAGE MANAGEMENT SYSTEM TABLES
-- ============================================

-- Create pages table with SEO fields
CREATE TABLE IF NOT EXISTS public.pages (
  id                    uuid primary key default uuid_generate_v4(),
  
  -- Basic fields
  slug                  text unique not null,
  title                 text not null,
  
  -- Data source
  symbol                text,
  symbol2               text,
  page_type             text default 'static',
  
  -- SEO Classification (13 SEO fields)
  seo_page_type         text,
  pillar_slug           text,
  pillar_priority       int,
  primary_keyword       text,
  secondary_keywords    text[],
  internal_links        jsonb,
  schema_type           text,
  related_pages         text[],
  canonical_url         text,
  is_locked             boolean default false,
  refresh_interval_days int,
  page_views            int default 0,
  ranking_keywords      text[],
  
  -- Display options
  description           text,
  category             text,
  display_order        int default 0,
  is_active            boolean default true,
  
  -- Feature flags
  has_calculator       boolean default false,
  has_ads              boolean default false,
  has_articles         boolean default false,
  show_earliest_date  boolean default false,
  
  -- Metadata
  meta_title           text,
  meta_description     text,
  meta_keywords        text[],
  og_image             text,
  twitter_card         text,
  robots               text default 'index,follow',
  layout_type          text default 'standard',
  
  -- Component layout
  components           jsonb,
  
  -- Timestamps
  created_at           timestamptz default now(),
  updated_at           timestamptz default now()
);

-- Create page_components table
CREATE TABLE IF NOT EXISTS public.page_components (
  id              uuid primary key default uuid_generate_v4(),
  page_id         uuid references pages(id) on delete cascade,
  component_type  text not null,
  config          jsonb,
  position        int default 0,
  created_at      timestamptz default now()
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_components ENABLE ROW LEVEL SECURITY;

-- Public read policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public can read active pages'
  ) THEN
    CREATE POLICY "Public can read active pages"
    ON public.pages FOR SELECT
    USING (is_active = true);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public can read page components'
  ) THEN
    CREATE POLICY "Public can read page components"
    ON public.page_components FOR SELECT
    USING (true);
  END IF;
END
$$;

-- Indexes for pages (create if not exist)
CREATE INDEX IF NOT EXISTS pages_slug_idx ON pages(slug);
CREATE INDEX IF NOT EXISTS pages_page_type_idx ON pages(page_type);
CREATE INDEX IF NOT EXISTS pages_seo_page_type_idx ON pages(seo_page_type);
CREATE INDEX IF NOT EXISTS pages_pillar_slug_idx ON pages(pillar_slug);
CREATE INDEX IF NOT EXISTS pages_is_active_idx ON pages(is_active);
CREATE INDEX IF NOT EXISTS pages_is_locked_idx ON pages(is_locked);
CREATE INDEX IF NOT EXISTS pages_category_idx ON pages(category);

-- Indexes for page_components
CREATE INDEX IF NOT EXISTS page_components_page_id_idx ON page_components(page_id);
CREATE INDEX IF NOT EXISTS page_components_position_idx ON page_components(position);

-- ============================================
-- SEED DATA: Pre-locked Data Pages
-- ============================================

INSERT INTO pages (slug, title, page_type, seo_page_type, is_locked, category, description, robots, is_active, symbol) VALUES
('gold-price', 'Gold Price Live - Real-Time USD Rates', 'commodity', 'data', true, 'precious-metals', 'Live gold price in USD with real-time updates, charts, and historical data.', 'index,follow', true, 'GC=F'),
('silver-price', 'Silver Price Live - Real-Time USD Rates', 'commodity', 'data', true, 'precious-metals', 'Live silver price in USD with real-time updates, charts, and historical data.', 'index,follow', true, 'SI=F'),
('platinum-price', 'Platinum Price Live - Real-Time USD Rates', 'commodity', 'data', true, 'precious-metals', 'Live platinum price in USD with real-time updates, charts, and historical data.', 'index,follow', true, 'PL=F'),
('palladium-price', 'Palladium Price Live - Real-Time USD Rates', 'commodity', 'data', true, 'precious-metals', 'Live palladium price in USD with real-time updates, charts, and historical data.', 'index,follow', true, 'PA=F'),
('copper-price', 'Copper Price Live - Real-Time USD Rates', 'commodity', 'data', true, 'commodities', 'Live copper price in USD with real-time updates, charts, and historical data.', 'index,follow', true, 'HG=F'),
('aluminum-price', 'Aluminum Price Live - Real-Time USD Rates', 'commodity', 'data', true, 'commodities', 'Live aluminum price in USD with real-time updates, charts, and historical data.', 'index,follow', true, 'ALI=F'),
('oil-price', 'Crude Oil Price Live - Real-Time USD Rates', 'commodity', 'data', true, 'energy', 'Live crude oil price in USD with real-time updates, charts, and historical data.', 'index,follow', true, 'CL=F'),
('natural-gas-price', 'Natural Gas Price Live - Real-Time USD Rates', 'commodity', 'data', true, 'energy', 'Live natural gas price in USD with real-time updates, charts, and historical data.', 'index,follow', true, 'NG=F'),
('bitcoin-price', 'Bitcoin Price Live - Real-Time USD Rates', 'crypto', 'data', true, 'crypto', 'Live Bitcoin price in USD with real-time updates, charts, and historical data.', 'index,follow', true, 'BTC-USD'),
('ethereum-price', 'Ethereum Price Live - Real-Time USD Rates', 'crypto', 'data', true, 'crypto', 'Live Ethereum price in USD with real-time updates, charts, and historical data.', 'index,follow', true, 'ETH-USD'),
('gold-silver-ratio', 'Gold Silver Ratio Live - Historical Chart', 'ratio', 'data', true, 'precious-metals', 'Live gold silver ratio with historical charts and comparison data.', 'index,follow', true, 'GC=F')
ON CONFLICT (slug) DO NOTHING;

-- Update symbol2 for gold-silver-ratio
UPDATE pages SET symbol2 = 'SI=F' WHERE slug = 'gold-silver-ratio';
