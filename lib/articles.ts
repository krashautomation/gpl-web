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

export async function getAllArticlesAdmin(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data ?? [];
}

export async function createArticle(article: Partial<Article>): Promise<Article | null> {
  const { data, error } = await supabase.from('articles').insert(article).select().single();

  if (error) {
    console.error('Error creating article:', error);
    return null;
  }

  return data;
}

export async function updateArticle(
  id: string,
  article: Partial<Article>
): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .update(article)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating article:', error);
    return null;
  }

  return data;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const { error } = await supabase.from('articles').delete().eq('id', id);

  if (error) {
    console.error('Error deleting article:', error);
    return false;
  }

  return true;
}

export interface ArticleImage {
  id: string;
  name: string;
  is_used: boolean;
  created_at: string;
}

const STORAGE_BUCKET = 'gpl';

export async function getAllImages(): Promise<ArticleImage[]> {
  const { data, error } = await supabase
    .from('article_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching images:', error);
    return [];
  }

  return data ?? [];
}

export async function getUnusedImages(): Promise<ArticleImage[]> {
  const { data, error } = await supabase
    .from('article_images')
    .select('*')
    .eq('is_used', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching unused images:', error);
    return [];
  }

  return data ?? [];
}

export async function addImage(file: File): Promise<ArticleImage | null> {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`;

  const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(fileName, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    return null;
  }

  const { data: imageData, error: insertError } = await supabase
    .from('article_images')
    .insert({ name: fileName, is_used: false })
    .select()
    .single();

  if (insertError) {
    console.error('Error adding image record:', insertError);
    return null;
  }

  return imageData;
}

export async function markImageUsed(id: string): Promise<boolean> {
  const { error } = await supabase.from('article_images').update({ is_used: true }).eq('id', id);

  if (error) {
    console.error('Error marking image as used:', error);
    return false;
  }

  return true;
}

export async function markImageUnused(id: string): Promise<boolean> {
  const { error } = await supabase.from('article_images').update({ is_used: false }).eq('id', id);

  if (error) {
    console.error('Error marking image as unused:', error);
    return false;
  }

  return true;
}

export async function deleteImage(id: string, name: string): Promise<boolean> {
  const { error: storageError } = await supabase.storage.from(STORAGE_BUCKET).remove([name]);

  if (storageError) {
    console.error('Error deleting file from storage:', storageError);
  }

  const { error: dbError } = await supabase.from('article_images').delete().eq('id', id);

  if (dbError) {
    console.error('Error deleting image record:', dbError);
    return false;
  }

  return true;
}

export function getImageUrl(name: string): string {
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(name);
  return data.publicUrl;
}
