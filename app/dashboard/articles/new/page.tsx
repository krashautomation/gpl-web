'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  createArticle,
  getUnusedImages,
  markImageUsed,
  getImageUrl,
  type Article,
  type ArticleImage,
} from '@/lib/articles';
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

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [unusedImages, setUnusedImages] = useState<ArticleImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [form, setForm] = useState({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    featured_image: '',
    reading_time: 0,
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    og_image: '',
    og_title: '',
    og_description: '',
    draft: true,
  });

  useEffect(() => {
    loadUnusedImages();
  }, []);

  async function loadUnusedImages() {
    const images = await getUnusedImages();
    setUnusedImages(images);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const article: Partial<Article> = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
      seo_keywords: form.seo_keywords ? form.seo_keywords.split(',').map(k => k.trim()) : [],
      published_at: new Date().toISOString(),
    };

    const result = await createArticle(article);

    if (result && selectedImage) {
      const image = unusedImages.find(img => img.id === selectedImage);
      if (image) {
        await markImageUsed(image.id);
      }
    }

    setSaving(false);

    if (result) {
      router.push('/dashboard');
    } else {
      alert('Failed to create article');
    }
  }

  function handleChange(field: string, value: string | boolean | number) {
    setForm({ ...form, [field]: value });
  }

  function handleImageChange(value: string) {
    setSelectedImage(value);
    if (value) {
      const image = unusedImages.find(img => img.id === value);
      if (image) {
        setForm({ ...form, featured_image: getImageUrl(image.name) });
      }
    }
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Article</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={e => handleChange('title', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={e => handleChange('slug', e.target.value)}
                  required
                  placeholder="article-url-slug"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={e => handleChange('excerpt', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                  id="content"
                  value={form.content}
                  onChange={e => handleChange('content', e.target.value)}
                  required
                  rows={15}
                  className="mt-1 font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={form.author}
                  onChange={e => handleChange('author', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={e => handleChange('category', e.target.value)}
                  placeholder="Market Analysis"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={form.tags}
                  onChange={e => handleChange('tags', e.target.value)}
                  placeholder="gold, trading, analysis"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="featured_image">Featured Image</Label>
                <Select value={selectedImage} onValueChange={handleImageChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select an available image" />
                  </SelectTrigger>
                  <SelectContent>
                    {unusedImages.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No images available. Upload in Images tab.
                      </SelectItem>
                    ) : (
                      unusedImages.map(image => (
                        <SelectItem key={image.id} value={image.id}>
                          <div className="flex items-center gap-2">
                            <img
                              src={getImageUrl(image.name)}
                              alt={image.name}
                              className="w-8 h-8 object-cover rounded"
                              onError={e => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <span className="truncate max-w-[200px]">{image.name}</span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">Or enter URL manually below</p>
                <Input
                  id="featured_image"
                  value={form.featured_image}
                  onChange={e => handleChange('featured_image', e.target.value)}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                <Input
                  id="reading_time"
                  type="number"
                  value={form.reading_time}
                  onChange={e => handleChange('reading_time', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="draft">Draft</Label>
                <Switch
                  id="draft"
                  checked={form.draft}
                  onCheckedChange={checked => handleChange('draft', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  id="seo_title"
                  value={form.seo_title}
                  onChange={e => handleChange('seo_title', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="seo_description">SEO Description</Label>
                <Textarea
                  id="seo_description"
                  value={form.seo_description}
                  onChange={e => handleChange('seo_description', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="seo_keywords">SEO Keywords (comma separated)</Label>
                <Input
                  id="seo_keywords"
                  value={form.seo_keywords}
                  onChange={e => handleChange('seo_keywords', e.target.value)}
                  placeholder="gold, investment, trading"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="og_image">OG Image URL</Label>
                <Input
                  id="og_image"
                  value={form.og_image}
                  onChange={e => handleChange('og_image', e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? 'Saving...' : 'Save Article'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
