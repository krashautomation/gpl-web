import { supabase } from './supabase';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  category: string;
  tags: string[];
  featured_image: string;
  reading_time: number;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  og_image: string;
  og_title: string;
  og_description: string;
  draft: boolean;
  created_at: string;
  updated_at: string;
}

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('draft', false)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('draft', false)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching article:', error);
    return null;
  }

  return data;
}

export async function getPublishedSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from('articles').select('slug').eq('draft', false);

  if (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }

  return data?.map(a => a.slug) ?? [];
}

export const getArticles = getAllArticles;
