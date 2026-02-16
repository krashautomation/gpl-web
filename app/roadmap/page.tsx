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

import Link from 'next/link';

export default function Roadmap() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Roadmap </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
            <p className="text-2xl md:text-3xl font-bold  mb-3 tracking-tight">Roadmap</p>
          </CardHeader>
          <CardContent>
            <p className="text-base mb-3">Last updated: February 15, 2026</p>

            <p className="text-base mb-3">
              This roadmap outlines our planned improvements and priorities for goldpricelive.co. We are constantly working to enhance the user experience, provide
              valuable content, and grow our platform.
            </p>

            <p className="text-base mb-3">
              <strong>Monetization</strong>
            </p>

            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li className="text-base">Add Google Ads placements across key pages.</li>
              <li className="text-base">
                Optimize ad positions for visibility without harming user experience.
              </li>
              <li className="text-base">
                Test ad density and formats for best revenue performance.
              </li>
            </ul>

            <p className="text-base mb-3">
              <strong>Lead Generation</strong>
            </p>

            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li className="text-base">
                Add email lead capture forms for the Investors Gold Substack.
              </li>
              <li className="text-base">
                Place signup forms in high-traffic areas (header, sidebar, end of articles,
                pop-ups).
              </li>
              <li className="text-base">
                Create a compelling incentive to subscribe (e.g., reports, alerts, insights).
              </li>
            </ul>

            <p className="text-base mb-3">
              <strong>Charts & Content</strong>
            </p>

            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li className="text-base">
                Improve existing gold price charts (design, speed, usability, mobile
                responsiveness).
              </li>
              <li className="text-base">Add new chart types and timeframes.</li>
              <li className="text-base">Build out additional content pages and resources.</li>
              <li className="text-base">Add browser and app icons.</li>
               <li className="text-base">Complete alpha mobile app, launch and add links.</li>
               <li className="text-base">Secure apis.</li>
            </ul>

            <p className="text-base mb-3">
              <strong>On-Page SEO</strong>
            </p>

            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li className="text-base">
                Interlink related articles and pages to improve crawlability and rankings.
              </li>
              <li className="text-base">
                Optimize titles, meta descriptions, headings, and internal anchor text.
              </li>
              <li className="text-base">Ensure proper keyword targeting on each page.</li>
              <li className="text-base">Improve page speed and mobile optimization.</li>
            </ul>

            <p className="text-base mb-3">
              <strong>Off-Page SEO</strong>
            </p>

            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li className="text-base">Acquire high-quality backlinks from relevant sites.</li>
              <li className="text-base">
                Submit sites to reputable directories and financial resources.
              </li>
              <li className="text-base">Pursue guest posts, partnerships, and mentions.</li>
              <li className="text-base">Monitor backlink profile and domain authority growth.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className=" border-neutral-800">
          <CardContent>
            <div className="overflow-x-auto">
              <div className="flex flex-col px-6 py-8">
                <p className="text-2xl md:text-3xl font-bold  mb-3 tracking-tight">
                  Contact Dave at Gold Price live
                </p>

                <p className="text-md font-medium mb-6  max-w-md">
                  I started Gold Price Live as a vibe coding project to help me share what I have
                  learned about investing, finance and precious metals.
                </p>

                <p className="text-base  leading-relaxed max-w-lg mb-8">
                  "Gold is the money of kings." — Anonymous
                </p>

                <p className="text-base  font-semibold mb-3">
                  For Advertising and Business Inquiries
                </p>

                <p className="mb-3">
                  Reach savvy investors interested in gold and precious metals investing. Advertise
                  on Gold Price Live.
                </p>

                <p className="mb-3">Contact: westrock@protonmail.com</p>
                <p className="my-1 text-base text-md">
                  Learn more about ads here 👉 &nbsp;
                  <a
                    href="/advertise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:underline"
                  >
                    Advertise on Gold Price Live
                  </a>
                </p>

                <p className="text-xs text-neutral-800 text-center mt-6 mb-6">
                  We respond within 24 hours. Packages available.
                </p>

                <Button className="w-full bg-orange-500 hover:bg-yellow-600  font-semibold">
                  <Link
                    href="https://investorsgold.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe to Investor's Gold on Substack
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
