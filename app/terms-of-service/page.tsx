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

export default function AboutGoldPriceLive() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Terms of Service </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
            <p className="text-2xl md:text-3xl font-bold  mb-3 tracking-tight">Terms of Service</p>
          </CardHeader>
          <CardContent>
            <p className="text-base mb-3">Last updated: February 12, 2026</p>

            <p className="text-base mb-3">
              These Terms of Service (“Terms”) govern your access to and use of the Gold Price Live
              website and any related mobile application (collectively, the “Service”). By accessing
              or using the Service, you agree to these Terms. If you do not agree, do not use the
              Service.
            </p>

            <p className="text-base mb-3">
              The Service provides live and historical gold (and related precious metals) prices,
              charts, and information for personal, non-commercial use only. It is not investment,
              financial, tax, or legal advice. All content is provided “as is” for informational
              purposes.
            </p>

            <p className="text-base mb-3">1. Eligibility</p>

            <p className="text-base mb-3">
              You must be at least 18 years old (or the age of majority in your jurisdiction) to use
              the Service. The Service is not directed to children under 13.
            </p>

            <p className="text-base mb-3">2. Use Restrictions</p>

            <p className="text-base mb-3">You may not:</p>

            <p className="text-base mb-3">
              - Copy, reproduce, modify, distribute, or create derivative works of the Service or
              its content without permission.
            </p>

            <p className="text-base mb-3">
              - Use the Service for any commercial purpose or to compete with it.
            </p>

            <p className="text-base mb-3">
              - Use automated tools (bots, scrapers, etc.) to access or extract data without express
              permission.
            </p>

            <p className="text-base mb-3">
              - Interfere with the Service, violate laws, or infringe third-party rights.
            </p>

            <p className="text-base mb-3">3. Intellectual Property</p>

            <p className="text-base mb-3">
              All content, design, logos, and trademarks on the Service are owned by us or our
              licensors. You are granted a limited, non-exclusive, non-transferable license to view
              and use the Service for personal, non-commercial purposes only.
            </p>

            <p className="text-base mb-3">4. No Investment Advice</p>

            <p className="text-base mb-3">
              Gold and precious metals prices are volatile. The Service does not provide investment,
              trading, or financial advice. Do not make financial decisions based solely on
              information from the Service. Consult a qualified professional before investing.
            </p>

            <p className="text-base mb-3">5. Disclaimer of Warranties</p>

            <p className="text-base mb-3">
              The Service is provided “as is” and “as available” without warranties of any kind,
              express or implied, including accuracy, completeness, timeliness, or fitness for a
              particular purpose. We do not guarantee uninterrupted or error-free access.
            </p>

            <p className="text-base mb-3">6. Limitation of Liability</p>

            <p className="text-base mb-3">
              To the fullest extent permitted by law, we are not liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of the
              Service, even if advised of the possibility of such damages. Our total liability shall
              not exceed $100.
            </p>

            <p className="text-base mb-3">7. Third-Party Links</p>

            <p className="text-base mb-3">
              The Service may contain links to third-party sites. We are not responsible for their
              content, privacy practices, or availability.
            </p>

            <p className="text-base mb-3">8. Changes and Termination</p>

            <p className="text-base mb-3">
              We may modify, suspend, or discontinue the Service or these Terms at any time. Your
              continued use after changes constitutes acceptance.
            </p>

            <p className="text-base mb-3">9. Governing Law</p>

            <p className="text-base mb-3">
              These Terms are governed by the laws of the State of California, without regard to
              conflict of law principles.
            </p>

            <p className="text-base mb-3">10. Contact Us</p>

            <p className="text-base mb-3">
              For questions about these Terms, contact us at contact page.
            </p>

            <p className="text-base mb-3">
              By using Gold Price Live, you acknowledge that you have read, understood, and agree to
              these Terms.
            </p>
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
