'use client';

import { useEffect, useState, useRef } from 'react';
import {
  getAllImages,
  addImage,
  markImageUsed,
  markImageUnused,
  deleteImage,
  getImageUrl,
  type ArticleImage,
} from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Trash2, ImageIcon, Check, X } from 'lucide-react';

export default function ImagesPage() {
  const [images, setImages] = useState<ArticleImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const data = await getAllImages();
    setImages(data);
    setLoading(false);
  }

  async function handleUpload() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const result = await addImage(file);
    setUploading(false);

    if (result) {
      setImages([result, ...images]);
    } else {
      alert('Failed to upload image');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function handleToggleUsed(image: ArticleImage) {
    const success = image.is_used ? await markImageUnused(image.id) : await markImageUsed(image.id);

    if (success) {
      setImages(images.map(img => (img.id === image.id ? { ...img, is_used: !img.is_used } : img)));
    }
  }

  async function handleDelete(image: ArticleImage) {
    if (!confirm(`Delete "${image.name}"? This will also remove it from storage.`)) return;

    const success = await deleteImage(image.id, image.name);
    if (success) {
      setImages(images.filter(img => img.id !== image.id));
    } else {
      alert('Failed to delete image');
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Images</h1>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button onClick={handleUpload} disabled={uploading}>
            <Upload size={18} className="mr-2" />
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(image => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative aspect-video bg-gray-100">
              <img
                src={getImageUrl(image.name)}
                alt={image.name}
                className="w-full h-full object-cover"
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>';
                }}
              />
              {image.is_used && (
                <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">Used</Badge>
              )}
            </div>
            <CardContent className="p-3">
              <p className="text-xs text-gray-500 truncate mb-2">{image.name}</p>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={image.is_used ? 'outline' : 'default'}
                  className="flex-1"
                  onClick={() => handleToggleUsed(image)}
                >
                  {image.is_used ? (
                    <>
                      <X size={14} className="mr-1" />
                      Mark Available
                    </>
                  ) : (
                    <>
                      <Check size={14} className="mr-1" />
                      Mark Used
                    </>
                  )}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(image)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
          <p>No images yet. Upload your first image!</p>
        </div>
      )}
    </div>
  );
}
