'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageBlockConfig {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  width?: number;
  height?: number;
}

interface ImageBlockProps {
  config: ImageBlockConfig | null;
}

export function ImageBlock({ config }: ImageBlockProps) {
  if (!config?.src) {
    return null;
  }

  const { src, alt, caption, className, width = 800, height = 450 } = config;

  return (
    <figure className={cn('my-6', className)}>
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>
      )}
    </figure>
  );
}
