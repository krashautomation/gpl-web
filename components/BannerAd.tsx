import * as React from 'react';

interface BannerAdProps {
  className?: string;
}

export function BannerAd({ className }: BannerAdProps) {
  return (
    <div className={`mx-auto ${className || ''}`} style={{ maxWidth: 728 }}>
      <a
        rel="sponsored noopener noreferrer"
        href="https://www.awin1.com/cread.php?s=3928251&v=88985&q=519076&r=2775708"
        target="_blank"
      >
        <img
          src="https://www.awin1.com/cshow.php?s=3928251&v=88985&q=519076&r=2775708"
          alt="Money Metals Exchange"
          className="w-full h-auto"
          style={{ border: 0 }}
        />
      </a>
    </div>
  );
}
