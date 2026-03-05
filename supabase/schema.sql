-- Run this SQL in your Supabase SQL Editor to create the articles table

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create articles table
CREATE TABLE public.articles (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  title           text not null,
  excerpt         text,
  content         text not null,
  author          text,
  published_at    timestamptz not null default now(),
  category        text,
  tags            text[],
  featured_image  text,
  reading_time    integer,
  seo_title       text,
  seo_description text,
  seo_keywords    text[],
  og_image        text,
  og_title        text,
  og_description  text,
  draft           boolean default false,

  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policy: public can read published articles
CREATE POLICY "Public can read published articles"
ON public.articles FOR SELECT
USING (draft = false);

-- Create indexes for common queries
CREATE INDEX articles_published_at_idx ON articles(published_at DESC);
CREATE INDEX articles_category_idx ON articles(category);
CREATE INDEX articles_draft_idx ON articles(draft);
