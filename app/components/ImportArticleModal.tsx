'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Download, Loader2 } from 'lucide-react';

interface ImportedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seo_description: string;
  seo_keywords: string;
  ai_tokens_used?: number;
}

interface ImportArticleModalProps {
  onImport: (article: ImportedArticle) => void;
}

export function ImportArticleModal({ onImport }: ImportArticleModalProps) {
  const [open, setOpen] = useState(false);
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleImport() {
    if (!rawText.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/import-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawArticle: rawText }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Unknown error');
      }

      onImport({
        ...data.article,
        ai_tokens_used: data.tokens,
      });
      setOpen(false);
      setRawText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import article');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Import Article
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import & Reword Article</DialogTitle>
            <DialogDescription>
              Paste the raw article text below. Claude will reword it and pre-fill all fields for
              your review.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="raw-article">Raw Article Text</Label>
              <Textarea
                id="raw-article"
                value={rawText}
                onChange={e => setRawText(e.target.value)}
                placeholder="Paste the full article text here..."
                rows={12}
                className="mt-1 font-mono text-sm"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleImport} disabled={loading || !rawText.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Reword & Import'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
