'use client';
import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';

import Image from 'next/image';

export default function AdvertiseGoldPriceLive() {
  return (
    <MainLayout breadcrumbs={[{ label: 'Advertise' }]}>
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Advertise</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
            <div className="flex-shrink-0">
              <Image
                src="/images/dave-gold-price-live.png"
                alt="Gold Price Live"
                width={720}
                height={479}
                priority={false}
                className="shadow-lg" // rounded-full is nice for profile pics
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-base mb-3">
              My investing journey evolved through cycles of innovation, volatility, and timeless
              value.
            </p>

            <p className="text-base mb-3">
              It began in tech: backing startups in AI, cloud, and smartphones.
            </p>

            <p className="text-base mb-3">
              Today I’ve learned that real wealth—and real impact—comes from strong relationships,
              meaningful connections, and reaching the right people with precision.
            </p>

            <p className="text-base mb-3">
              That’s the power behind Gold Price Live: building targeted, trust-based audiences who
              value timeless assets like gold. Let’s connect and explore how we can create something
              valuable together.
            </p>

            <p className="text-base mb-3">If you want to see more of my writings, signup below.</p>
            <Button className="w-full bg-orange-500 hover:bg-yellow-600 text-white font-semibold">
              <Link
                href="https://investorsgold.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe to Investor's Gold on Substack
              </Link>
            </Button>

            <p className="text-base mt-5">
              Otherwise, keep reading to find out more about Advertising on Gold Price Live.👇
            </p>
          </CardContent>
        </Card>

        <Card className=" border-neutral-800">
          <CardContent>
            <div className="overflow-x-auto">
              <div className="flex flex-col px-6 py-8">
                <p className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                  Advertising on GoldPricelive.co
                </p>

                <p className="text-md font-medium mb-6  max-w-md">
                  I started Gold Price Live as a vibe coding project to help me share what I have
                  learned about investing, finance and precious metals.
                </p>

                <p className="text-base  leading-relaxed max-w-lg mb-8">
                  "Gold is the money of kings." — Anonymous
                </p>
                <p className="text-md font-medium mb-6  max-w-md">
                  I didn't realize how many people I would help along the way. If you want to be a
                  part of our growth story, we are looking for long-term partners who want to build
                  the relationships of the future.
                </p>

                <p className="text-base  font-semibold mb-3">
                  For Advertising and Business Inquiries
                </p>

                <p className="mb-3">
                  Reach savvy investors interested in gold and precious metals investing. Advertise
                  on Gold Price Live.
                </p>

                <p className="mb-3">
                  Contact: 👉 &nbsp;<span className="">westrock@protonmail.com</span>
                </p>
                <p className="my-1 text-base text-md">Thanks for stopping by... </p>
                <p className="my-1 text-base text-md">Dave at Gold Price Live</p>

                <p className="text-xs text-neutral-800 text-center mt-6">
                  We respond within 24 hours. Packages available.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
