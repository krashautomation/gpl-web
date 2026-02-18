import * as React from 'react';

interface BannerAdProps {
  affiliateName: string;
  adName: string;
  href: string;
  src: string;
  className?: string;
}

export function BannerAd({ affiliateName, adName, href, src, className }: BannerAdProps) {
  return (
    <div className={`mx-auto ${className || ''}`} style={{ maxWidth: 728 }}>
      <a rel="sponsored noopener noreferrer" href={href} target="_blank">
        <img src={src} alt={adName} className="w-full h-auto" style={{ border: 0 }} />
      </a>
    </div>
  );
}
