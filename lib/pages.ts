import { supabase } from './supabase';

export interface Page {
  id: string;
  slug: string;
  title: string;
  symbol: string | null;
  symbol2: string | null;
  page_type: string;
  seo_page_type: string | null;
  pillar_slug: string | null;
  pillar_priority: number | null;
  primary_keyword: string | null;
  secondary_keywords: string[] | null;
  internal_links: { keyword: string; target: string }[] | null;
  schema_type: string | null;
  related_pages: string[] | null;
  canonical_url: string | null;
  is_locked: boolean;
  refresh_interval_days: number | null;
  page_views: number;
  ranking_keywords: string[] | null;
  description: string | null;
  category: string | null;
  display_order: number;
  is_active: boolean;
  has_calculator: boolean;
  has_ads: boolean;
  has_articles: boolean;
  show_earliest_date: boolean;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  og_image: string | null;
  twitter_card: string | null;
  robots: string;
  layout_type: string;
  components: unknown[] | null;
  created_at: string;
  updated_at: string;
}

export interface PageComponent {
  id: string;
  page_id: string;
  component_type: string;
  config: Record<string, unknown> | null;
  position: number;
  created_at: string;
}

export async function getAllPages(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }

  return data ?? [];
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching page:', error);
    return null;
  }

  return data;
}

export async function getActivePages(): Promise<Page[]> {
  return getAllPages();
}

export async function getLockedPages(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('is_locked', true)
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching locked pages:', error);
    return [];
  }

  return data ?? [];
}

export async function getPagesByCategory(category: string): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching pages by category:', error);
    return [];
  }

  return data ?? [];
}

export async function getPagesByType(pageType: string): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('page_type', pageType)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching pages by type:', error);
    return [];
  }

  return data ?? [];
}

export async function getDataPages(): Promise<Page[]> {
  return getPagesByType('commodity');
}

export async function getPageComponents(pageId: string): Promise<PageComponent[]> {
  const { data, error } = await supabase
    .from('page_components')
    .select('*')
    .eq('page_id', pageId)
    .order('position', { ascending: true });

  if (error) {
    console.error('Error fetching page components:', error);
    return [];
  }

  return data ?? [];
}

export async function getAllPagesAdmin(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }

  return data ?? [];
}

export async function getPageById(id: string): Promise<Page | null> {
  const { data, error } = await supabase.from('pages').select('*').eq('id', id).single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching page:', error);
    return null;
  }

  return data;
}

export interface CreatePageInput {
  slug: string;
  title: string;
  description?: string | null;
  symbol?: string | null;
  symbol2?: string | null;
  page_type?: string;
  category?: string | null;
  is_active?: boolean;
  is_locked?: boolean;
  display_order?: number;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string[] | null;
  og_image?: string | null;
  twitter_card?: string | null;
  robots?: string;
  seo_page_type?: string | null;
  pillar_slug?: string | null;
  pillar_priority?: number | null;
  primary_keyword?: string | null;
  related_pages?: string[] | null;
  has_calculator?: boolean;
  has_ads?: boolean;
  has_articles?: boolean;
  show_earliest_date?: boolean;
}

export async function createPage(pageData: CreatePageInput): Promise<Page | null> {
  const { data, error } = await supabase.from('pages').insert(pageData).select().single();

  if (error) {
    console.error('Error creating page:', error);
    return null;
  }

  return data;
}

export async function updatePage(
  id: string,
  pageData: Partial<CreatePageInput>
): Promise<Page | null> {
  const { data, error } = await supabase
    .from('pages')
    .update({ ...pageData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating page:', error);
    return null;
  }

  return data;
}

export async function deletePage(id: string): Promise<boolean> {
  const { error } = await supabase.from('pages').delete().eq('id', id);

  if (error) {
    console.error('Error deleting page:', error);
    return false;
  }

  return true;
}

export async function isPageLocked(id: string): Promise<boolean> {
  const { data, error } = await supabase.from('pages').select('is_locked').eq('id', id).single();

  if (error) {
    console.error('Error checking page lock status:', error);
    return false;
  }

  return data?.is_locked ?? false;
}

export async function isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
  let query = supabase.from('pages').select('id').eq('slug', slug);

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error checking slug uniqueness:', error);
    return false;
  }

  return !data || data.length === 0;
}
