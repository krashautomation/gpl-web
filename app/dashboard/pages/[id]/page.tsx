'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  getPageById,
  createPage,
  updatePage,
  isPageLocked,
  isSlugUnique,
  type Page,
  type CreatePageInput,
} from '@/lib/pages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const STORAGE_BUCKET = 'gpl';

const pageTypes = [
  { value: 'commodity', label: 'Commodity (Gold, Silver, etc.)' },
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'ratio', label: 'Ratio (Gold/Silver)' },
  { value: 'static', label: 'Static Content' },
  { value: 'legal', label: 'Legal Page' },
];

const robotsOptions = [
  { value: 'index,follow', label: 'Index, Follow' },
  { value: 'index,nofollow', label: 'Index, No Follow' },
  { value: 'noindex,follow', label: 'No Index, Follow' },
  { value: 'noindex,nofollow', label: 'No Index, No Follow' },
];

const pageTypeDefaults: Record<string, Partial<CreatePageInput>> = {
  commodity: {
    has_ads: true,
    has_articles: true,
    has_calculator: false,
    show_earliest_date: false,
  },
  crypto: { has_ads: true, has_articles: true, has_calculator: false, show_earliest_date: true },
  ratio: { has_ads: true, has_articles: true, has_calculator: false, show_earliest_date: false },
  static: { has_ads: false, has_articles: false, has_calculator: false, show_earliest_date: false },
  legal: { has_ads: false, has_articles: false, has_calculator: false, show_earliest_date: false },
  home: { has_ads: true, has_articles: true, has_calculator: true, show_earliest_date: false },
};

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [locked, setLocked] = useState(false);
  const [uploadingOgImage, setUploadingOgImage] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [form, setForm] = useState<CreatePageInput>({
    slug: '',
    title: '',
    description: '',
    symbol: '',
    symbol2: '',
    page_type: 'static',
    category: '',
    is_active: true,
    is_locked: false,
    display_order: 0,
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    og_image: '',
    twitter_card: 'summary_large_image',
    robots: 'index,follow',
    seo_page_type: '',
    pillar_slug: '',
    pillar_priority: null,
    primary_keyword: '',
    related_pages: [],
    has_calculator: false,
    has_ads: true,
    has_articles: true,
    show_earliest_date: false,
  });

  useEffect(() => {
    if (!isNew) {
      loadPage();
    }
  }, [id]);

  async function loadPage() {
    const page = await getPageById(id);
    if (!page) {
      alert('Page not found');
      router.push('/dashboard/pages');
      return;
    }

    const pageLocked = await isPageLocked(id);
    setLocked(pageLocked);

    setForm({
      slug: page.slug,
      title: page.title,
      description: page.description || '',
      symbol: page.symbol || '',
      symbol2: page.symbol2 || '',
      page_type: page.page_type,
      category: page.category || '',
      is_active: page.is_active,
      is_locked: page.is_locked,
      display_order: page.display_order,
      meta_title: page.meta_title || '',
      meta_description: page.meta_description || '',
      meta_keywords: page.meta_keywords || [],
      og_image: page.og_image || '',
      twitter_card: page.twitter_card || '',
      robots: page.robots,
      seo_page_type: page.seo_page_type || '',
      pillar_slug: page.pillar_slug || '',
      pillar_priority: page.pillar_priority,
      primary_keyword: page.primary_keyword || '',
      related_pages: page.related_pages || [],
      has_calculator: page.has_calculator,
      has_ads: page.has_ads,
      has_articles: page.has_articles,
      show_earliest_date: page.show_earliest_date,
    });
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (locked) {
      alert('This page is locked and cannot be edited.');
      return;
    }

    setSlugError(null);
    setTitleError(null);

    if (!form.slug.trim()) {
      setSlugError('Slug is required.');
      return;
    }

    if (!form.title.trim()) {
      setTitleError('Title is required.');
      return;
    }

    setSaving(true);
    try {
      const excludeId = isNew ? undefined : id;
      const unique = await isSlugUnique(form.slug, excludeId);
      if (!unique) {
        setSlugError(`Slug "${form.slug}" is already in use. Please choose a different slug.`);
        setSaving(false);
        return;
      }

      const pageData = {
        ...form,
        meta_keywords: form.meta_keywords || [],
        related_pages: form.related_pages || [],
      };

      if (isNew) {
        const created = await createPage(pageData);
        if (created) {
          router.push('/dashboard/pages');
        } else {
          alert(
            'Failed to create page. Check console for details or ensure RLS policies are set up.'
          );
        }
      } else {
        const updated = await updatePage(id, pageData);
        if (updated) {
          router.push('/dashboard/pages');
        } else {
          alert('Failed to update page. Please check that all required fields are filled.');
        }
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleOgImageUpload() {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setUploadingOgImage(true);
    try {
      const fileName = `og-images/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('Failed to upload image');
        return;
      }

      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
      setForm({ ...form, og_image: data.publicUrl });
    } finally {
      setUploadingOgImage(false);
    }
  }

  function handleChange(field: keyof CreatePageInput, value: unknown) {
    const newForm = { ...form, [field]: value };

    if (field === 'page_type' && !locked) {
      const defaults = pageTypeDefaults[value as string] || {};
      newForm.has_calculator = defaults.has_calculator ?? form.has_calculator;
      newForm.has_ads = defaults.has_ads ?? form.has_ads;
      newForm.has_articles = defaults.has_articles ?? form.has_articles;
      newForm.show_earliest_date = defaults.show_earliest_date ?? form.show_earliest_date;
    }

    setForm(newForm);
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New Page' : 'Edit Page'}</h1>
        {locked && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
            Locked
          </span>
        )}
      </div>

      {locked && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            This page is locked and cannot be edited. Changes cannot be saved.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Data Source */}
          <Card>
            <CardHeader>
              <CardTitle>Data Source</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="page_type">Page Type</Label>
                  <Select
                    value={form.page_type}
                    onValueChange={value => handleChange('page_type', value)}
                    disabled={locked}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pageTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    value={form.symbol || ''}
                    onChange={e => handleChange('symbol', e.target.value)}
                    placeholder="GC=F"
                    disabled={locked}
                  />
                </div>
                <div>
                  <Label htmlFor="symbol2">Symbol 2 (for ratios)</Label>
                  <Input
                    id="symbol2"
                    value={form.symbol2 || ''}
                    onChange={e => handleChange('symbol2', e.target.value)}
                    placeholder="SI=F"
                    disabled={locked}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={form.category || ''}
                  onChange={e => handleChange('category', e.target.value)}
                  placeholder="precious-metals"
                  disabled={locked}
                />
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={e => {
                      handleChange('title', e.target.value);
                      setTitleError(null);
                    }}
                    placeholder="Page Title"
                    required
                    disabled={locked}
                  />
                  {titleError && <p className="text-sm text-red-600 mt-1">{titleError}</p>}
                </div>
                <div>
                  <Label htmlFor="slug">
                    Slug <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={e => {
                      handleChange('slug', e.target.value);
                      setSlugError(null);
                    }}
                    placeholder="page-slug"
                    required
                    disabled={locked}
                  />
                  {slugError && <p className="text-sm text-red-600 mt-1">{slugError}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description || ''}
                  onChange={e => handleChange('description', e.target.value)}
                  placeholder="Page description"
                  rows={3}
                  disabled={locked}
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={form.meta_title || ''}
                    onChange={e => handleChange('meta_title', e.target.value)}
                    placeholder="SEO Title"
                    disabled={locked}
                  />
                </div>
                <div>
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Input
                    id="meta_description"
                    value={form.meta_description || ''}
                    onChange={e => handleChange('meta_description', e.target.value)}
                    placeholder="SEO Description"
                    disabled={locked}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="meta_keywords">Meta Keywords (comma separated)</Label>
                <Input
                  id="meta_keywords"
                  value={form.meta_keywords?.join(', ') || ''}
                  onChange={e =>
                    handleChange(
                      'meta_keywords',
                      e.target.value
                        .split(',')
                        .map(k => k.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder="gold, silver, precious metals"
                  disabled={locked}
                />
              </div>
              <div>
                <Label>OG Image (for social media)</Label>
                <div className="mt-2 space-y-2">
                  {form.og_image && (
                    <div className="relative w-full max-w-md">
                      <img
                        src={form.og_image}
                        alt="OG Preview"
                        className="w-full h-auto rounded-lg border"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleOgImageUpload}
                      disabled={locked || uploadingOgImage}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={locked || uploadingOgImage}
                      variant="outline"
                    >
                      {uploadingOgImage ? 'Uploading...' : 'Upload OG Image'}
                    </Button>
                    {form.og_image && (
                      <Button
                        type="button"
                        onClick={() => handleChange('og_image', '')}
                        disabled={locked}
                        variant="outline"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Recommended size: 1200x630 pixels for social media
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Social Preview</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Twitter Card defaults to &quot;summary_large_image&quot; (1200 x 630 px). Upload
                    an OG image above for best social media visibility.
                  </p>
                </div>
                <div>
                  <Label htmlFor="robots">Robots</Label>
                  <Select
                    value={form.robots}
                    onValueChange={value => handleChange('robots', value)}
                    disabled={locked}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {robotsOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Classification */}
          <Card>
            <CardHeader>
              <CardTitle>Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seo_page_type">SEO Page Type</Label>
                  <Input
                    id="seo_page_type"
                    value={form.seo_page_type || ''}
                    onChange={e => handleChange('seo_page_type', e.target.value)}
                    placeholder="data"
                    disabled={locked}
                  />
                </div>
                <div>
                  <Label htmlFor="pillar_slug">Pillar Slug</Label>
                  <Input
                    id="pillar_slug"
                    value={form.pillar_slug || ''}
                    onChange={e => handleChange('pillar_slug', e.target.value)}
                    placeholder="gold"
                    disabled={locked}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary_keyword">Primary Keyword</Label>
                  <Input
                    id="primary_keyword"
                    value={form.primary_keyword || ''}
                    onChange={e => handleChange('primary_keyword', e.target.value)}
                    placeholder="gold price"
                    disabled={locked}
                  />
                </div>
                <div>
                  <Label htmlFor="related_pages">Related Pages (comma separated slugs)</Label>
                  <Input
                    id="related_pages"
                    value={form.related_pages?.join(', ') || ''}
                    onChange={e =>
                      handleChange(
                        'related_pages',
                        e.target.value
                          .split(',')
                          .map(s => s.trim())
                          .filter(Boolean)
                      )
                    }
                    placeholder="silver-price, platinum-price"
                    disabled={locked}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    checked={form.is_active}
                    onCheckedChange={checked => handleChange('is_active', checked)}
                    disabled={locked}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_locked"
                    checked={form.is_locked}
                    onCheckedChange={checked => handleChange('is_locked', checked)}
                    disabled={locked}
                  />
                  <Label htmlFor="is_locked">Locked</Label>
                </div>
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={form.display_order}
                    onChange={e => handleChange('display_order', parseInt(e.target.value) || 0)}
                    disabled={locked}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="has_calculator"
                    checked={form.has_calculator}
                    onCheckedChange={checked => handleChange('has_calculator', checked)}
                    disabled={locked}
                  />
                  <Label htmlFor="has_calculator">Calculator</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="has_ads"
                    checked={form.has_ads}
                    onCheckedChange={checked => handleChange('has_ads', checked)}
                    disabled={locked}
                  />
                  <Label htmlFor="has_ads">Ads</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="has_articles"
                    checked={form.has_articles}
                    onCheckedChange={checked => handleChange('has_articles', checked)}
                    disabled={locked}
                  />
                  <Label htmlFor="has_articles">Articles</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="show_earliest_date"
                    checked={form.show_earliest_date}
                    onCheckedChange={checked => handleChange('show_earliest_date', checked)}
                    disabled={locked}
                  />
                  <Label htmlFor="show_earliest_date">Show Earliest Date</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div>
              {form.slug && (
                <a
                  href={`/${form.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  Preview: /{form.slug}
                </a>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/pages')}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving || locked}>
                {saving ? 'Saving...' : isNew ? 'Create Page' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
