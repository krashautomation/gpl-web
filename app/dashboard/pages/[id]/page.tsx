'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowUp, ArrowDown, Edit2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  getPageById,
  createPage,
  updatePage,
  isPageLocked,
  isSlugUnique,
  getPageComponents,
  createPageComponent,
  updatePageComponent,
  deletePageComponent,
  type Page,
  type CreatePageInput,
  type PageComponent,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

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
  const [components, setComponents] = useState<PageComponent[]>([]);
  const [loadingComponents, setLoadingComponents] = useState(false);
  const [editingComponent, setEditingComponent] = useState<PageComponent | null>(null);
  const [editingConfig, setEditingConfig] = useState('');
  const [savingConfig, setSavingConfig] = useState(false);

  useEffect(() => {
    if (!isNew) {
      loadPage();
    }
  }, [id]);

  async function loadPage() {
    setLoadingComponents(true);
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

    const pageComponents = await getPageComponents(page.id);
    setComponents(pageComponents.sort((a, b) => a.position - b.position));
    setLoading(false);
    setLoadingComponents(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isUnlocking = locked && form.is_locked === false;

    if (locked && !isUnlocking) {
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
        try {
          const created = await createPage(pageData);
          if (created) {
            router.push('/dashboard/pages');
          } else {
            alert('Failed to create page. Please try again.');
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          console.error('Create error:', err);
          alert(`Failed to create page: ${message}`);
        }
      } else {
        try {
          const updated = await updatePage(id, pageData);
          if (updated) {
            router.push('/dashboard/pages');
          } else {
            alert('Failed to update page. Please try again.');
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          console.error('Update error:', err);
          alert(`Failed to update page: ${message}`);
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

    if (field === 'is_locked') {
      setLocked(value as boolean);
    }

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

      {/* Page Components - Only for existing pages */}
      {!isNew && (
        <Card>
          <CardHeader>
            <CardTitle>Page Components</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingComponents ? (
              <p>Loading components...</p>
            ) : (
              <div className="space-y-4">
                {components.length === 0 ? (
                  <p className="text-gray-500">No custom components. Using default layout.</p>
                ) : (
                  <div className="space-y-2">
                    {components.map((comp, index) => (
                      <div
                        key={comp.id}
                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm font-medium w-6">{index + 1}</span>
                        <div className="flex-1">
                          <p className="font-medium">{comp.component_type}</p>
                          <p className="text-sm text-gray-500">
                            {comp.config ? JSON.stringify(comp.config).slice(0, 50) : 'No config'}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            if (index === 0) return;
                            const prevComp = components[index - 1];
                            console.log(
                              'Move UP:',
                              comp.component_type,
                              'from pos',
                              comp.position,
                              'to',
                              prevComp.position
                            );
                            try {
                              const result1 = await updatePageComponent(comp.id, {
                                position: prevComp.position,
                              });
                              console.log('Update 1 result:', result1);
                              const result2 = await updatePageComponent(prevComp.id, {
                                position: comp.position,
                              });
                              console.log('Update 2 result:', result2);
                              if (result1 && result2) {
                                const pageData = await getPageById(id);
                                if (pageData) {
                                  const newComponents = await getPageComponents(pageData.id);
                                  setComponents(
                                    newComponents.sort((a, b) => a.position - b.position)
                                  );
                                }
                              } else {
                                alert('Failed to update positions');
                              }
                            } catch (err) {
                              console.error('Move up error:', err);
                              alert('Error: ' + (err instanceof Error ? err.message : 'Unknown'));
                            }
                          }}
                          disabled={locked || index === 0}
                          title="Move up"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            if (index === components.length - 1) return;
                            const nextComp = components[index + 1];
                            console.log(
                              'Move DOWN:',
                              comp.component_type,
                              'from pos',
                              comp.position,
                              'to',
                              nextComp.position
                            );
                            try {
                              const result1 = await updatePageComponent(comp.id, {
                                position: nextComp.position,
                              });
                              console.log('Update 1 result:', result1);
                              const result2 = await updatePageComponent(nextComp.id, {
                                position: comp.position,
                              });
                              console.log('Update 2 result:', result2);
                              if (result1 && result2) {
                                const pageData = await getPageById(id);
                                if (pageData) {
                                  const newComponents = await getPageComponents(pageData.id);
                                  setComponents(
                                    newComponents.sort((a, b) => a.position - b.position)
                                  );
                                }
                              } else {
                                alert('Failed to update positions');
                              }
                            } catch (err) {
                              console.error('Move down error:', err);
                              alert('Error: ' + (err instanceof Error ? err.message : 'Unknown'));
                            }
                          }}
                          disabled={locked || index === components.length - 1}
                          title="Move down"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingComponent(comp);
                            const config = comp.config as { content?: string } | null;
                            if (comp.component_type === 'text_block' && config?.content) {
                              setEditingConfig(config.content);
                            } else {
                              setEditingConfig(
                                comp.config ? JSON.stringify(comp.config, null, 2) : '{}'
                              );
                            }
                          }}
                          disabled={locked}
                          title="Edit config"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            if (confirm('Delete this component?')) {
                              await deletePageComponent(comp.id);
                              setComponents(components.filter(c => c.id !== comp.id));
                            }
                          }}
                          disabled={locked}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {!locked && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Add Component</p>
                    <div className="flex gap-2">
                      <Select
                        value=""
                        onValueChange={async value => {
                          if (!value) return;
                          const pageData = await getPageById(id);
                          if (pageData) {
                            const maxPos =
                              components.length > 0
                                ? Math.max(...components.map(c => c.position))
                                : -1;
                            await createPageComponent({
                              page_id: pageData.id,
                              component_type: value,
                              position: maxPos + 1,
                            });
                            const newComponents = await getPageComponents(pageData.id);
                            setComponents(newComponents.sort((a, b) => a.position - b.position));
                          }
                        }}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select component" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hero">Hero (Title)</SelectItem>
                          <SelectItem value="chart">Chart</SelectItem>
                          <SelectItem value="performance">Performance Table</SelectItem>
                          <SelectItem value="calculator">Calculator</SelectItem>
                          <SelectItem value="articles">Articles Section</SelectItem>
                          <SelectItem value="ads">Banner Ad</SelectItem>
                          <SelectItem value="text_block">Text Block</SelectItem>
                          <SelectItem value="contact">Contact Sidebar</SelectItem>
                          <SelectItem value="bio_card">Bio Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Component Config Dialog */}
      <Dialog open={!!editingComponent} onOpenChange={() => setEditingComponent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {editingComponent?.component_type} Configuration</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="config">
              {editingComponent?.component_type === 'text_block'
                ? 'HTML Content'
                : 'JSON Configuration'}
            </Label>
            <Textarea
              id="config"
              value={editingConfig}
              onChange={e => setEditingConfig(e.target.value)}
              rows={12}
              className="font-mono text-sm"
              placeholder={
                editingComponent?.component_type === 'text_block'
                  ? '<h2>Your Heading</h2><p>Your paragraph text here.</p>'
                  : '{"key": "value"}'
              }
            />
            <p className="text-sm text-gray-500 mt-2">
              {editingComponent?.component_type === 'text_block' ? (
                <>
                  Paste your HTML content directly. For example:{' '}
                  <code className="bg-gray-100 px-1 rounded">
                    &lt;h2&gt;Title&lt;/h2&gt;&lt;p&gt;Paragraph&lt;/p&gt;
                  </code>
                </>
              ) : (
                <>
                  Edit the JSON configuration for this component. For text_block, use:{' '}
                  <code className="bg-gray-100 px-1 rounded">
                    {'{ "content": "Your text here" }'}
                  </code>
                </>
              )}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingComponent(null)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!editingComponent) return;
                try {
                  let config: Record<string, unknown>;
                  try {
                    config = JSON.parse(editingConfig);
                  } catch {
                    config = { content: editingConfig };
                  }
                  await updatePageComponent(editingComponent.id, { config });
                  const pageData = await getPageById(id);
                  if (pageData) {
                    const newComponents = await getPageComponents(pageData.id);
                    setComponents(newComponents.sort((a, b) => a.position - b.position));
                  }
                  setEditingComponent(null);
                } catch (err) {
                  alert('Invalid input: ' + (err instanceof Error ? err.message : 'Unknown error'));
                }
              }}
              disabled={savingConfig}
            >
              {savingConfig ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
