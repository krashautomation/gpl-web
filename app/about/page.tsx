'use client';
import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';
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

import Link from 'next/link'; // if using Next.js

export default function ContactGoldPriceLive() {
  return (
    <MainLayout>

<div className="flex items-center justify-center mb-6">
  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
    About Us
  </h1>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
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
            <p className="text-base  mb-3">
              At Gold Price Live, our mission is to empower everyday investors with accurate
              real-time gold prices, in-depth market analysis, and proven strategies.
            </p>

            <p className="text-base  mb-3">
              My investing journey evolved through cycles of innovation, volatility, and timeless
              value.
            </p>

            <p className="text-base  mb-3">
              It began in tech: backing startups in AI, cloud, and smartphones.
            </p>

            <p className="text-base  mb-3">
              Thrilling gains came from disruption, but bubbles burst, teaching me to value
              fundamentals over hype and avoid emotional bets.
            </p>
            <p className="text-base  mb-3">
              Crypto followed in the mid-2010s—Bitcoin as digital gold, altcoins, DeFi booms.{' '}
            </p>
            <p className="text-base  mb-3">
              Massive upsides dwarfed tech, yet crashes, scams, and 2022's winter demanded strict
              discipline.
            </p>
            <p className="text-base  mb-3">
              Now, in this historic gold bull amid uncertainty and central bank demand—I've shifted
              to precious metals and resources.
            </p>
            <Button className="w-full bg-orange-500 hover:bg-yellow-600 text-white font-semibold">
              <Link
                href="https://investorsgold.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe to Investor's Gold on Substack
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="flex flex-col px-6 py-8">
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                  About Gold Price live
                </p>

                <p className="text-md text-gray-700 font-medium mb-6  max-w-md">
                  After dissecting the mechanics of modern financial markets investing in bitcoin,
                  my thoughts inevitably turned towards precious metals investing and gold....
                </p>

                <p className="text-base leading-relaxed max-w-lg mb-8">
                  "Gold is money. Everything else is credit." — J.P. Morgan
                </p>

                <p className="text-base  font-semibold mb-3">
                  My Mission for Gold Price Live
                </p>
                <p className="text-base  mb-3">
                  At Gold Price Live, our mission is to empower everyday investors with accurate
                  real-time gold prices, in-depth market analysis, and proven strategies.
                </p>

                <p className="text-base  mb-3">
                  We help you seize profits from the powerful ongoing bull market in gold while
                  safeguarding your savings against inflation, currency devaluation, and economic
                  instability in today's uncertain world.
                </p>

                <p className="text-base font-semibold mb-3 mt-6">
                  Advertise with Us{' '}
                </p>

                <p className="mb-3">
                  Reach savvy investors tracking gold's bull run. Advertise on Gold Price Live.
                </p>

                <p className="mb-3">Contact: westrock@protonmail.com</p>
                <p className="my-1 text-base text-md">
                  Learn more about ads here 👉 &nbsp;
                  <a
                    href="/advertise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:underline"
                  >
                    Advertise on Gold Price Live
                  </a>
                </p>

                <p className="text-xs text-gray-500 text-center mt-6">
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
