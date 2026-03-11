'use client';

import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BioCardProps {
  author?: string;
  authorImage?: string;
  date?: string | Date;
  readingTime?: number;
  imageSize?: number;
  className?: string;
}

export function BioCard({
  author = 'Dave Halmai',
  authorImage = '/images/dave-profile.png',
  date,
  readingTime = 5,
  imageSize = 80,
  className,
}: BioCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex-shrink-0">
        <Image
          src={authorImage}
          alt={author}
          width={imageSize}
          height={imageSize}
          priority={false}
          className="rounded-full border-4 border-amber-500 shadow-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Link
          href="/about-dave-halmai"
          className="font-semibold text-black flex items-center gap-2 hover:underline"
        >
          <User size={16} />
          {author}
        </Link>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Last updated: {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {readingTime} min read
          </span>
        </div>
      </div>
    </div>
  );
}
