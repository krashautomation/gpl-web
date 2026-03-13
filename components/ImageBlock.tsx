'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageBlockConfig {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

interface ImageBlockProps {
  config: ImageBlockConfig | null;
}

export function ImageBlock({ config }: ImageBlockProps) {
  if (!config?.src) {
    return null;
  }

  const { src, alt, caption, className } = config;

  return (
    <figure className={cn('my-6', className)}>
      <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt || ''}
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg"
          unoptimized
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>
      )}
    </figure>
  );
}
