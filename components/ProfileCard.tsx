'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProfileCardProps {
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  paragraphs: string[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function ProfileCard({
  imageSrc,
  imageAlt,
  imageWidth = 720,
  imageHeight = 479,
  paragraphs,
  ctaText,
  ctaHref,
  className,
}: ProfileCardProps) {
  return (
    <Card className={className}>
      <CardContent>
        <div className="flex-shrink-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority={false}
            className="shadow-lg"
          />
        </div>
        {paragraphs.map((text, index) => (
          <p key={index} className="text-base mb-3">
            {text}
          </p>
        ))}
        {ctaText && ctaHref && (
          <Button className="w-full bg-orange-500 hover:bg-yellow-600 text-white font-semibold">
            <Link href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaText}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
