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

export default function AboutGoldPriceLive() {
  return (
    <MainLayout breadcrumbs={[{ label: 'Privacy Policy' }]}>
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Privacy Policy </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
            <p className="text-2xl md:text-3xl font-bold  mb-3 tracking-tight">Privacy Policy</p>
          </CardHeader>
          <CardContent>
            <p className="text-base mb-3">Last updated: February 12, 2026</p>

            <p className="text-base mb-3">
              Gold Price Live ("we," "us," or "our") operates the gold price live website and any
              associated mobile application (collectively, the "Service"). We are committed to
              protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our website or use our app.
            </p>

            <p className="text-base mb-3">
              This Service provides live and historical gold (and related precious metals) price
              data, charts, and related financial information for informational purposes only. It is
              not investment advice, and we do not provide financial services.
            </p>

            <p className="text-base mb-3">
              <strong>Information We Collect</strong>
            </p>

            <p className="text-base mb-3">
              We collect minimal personal information. In most cases, you can use the Service
              without providing any personal data. We may collect:
            </p>

            <p className="text-base mb-3">
              - Device and usage information (e.g., IP address, browser type, device type, operating
              system, pages visited, time spent, and referring URLs) automatically via cookies,
              analytics tools, or server logs.
            </p>

            <p className="text-base mb-3">
              - If you contact us, subscribe to alerts, or create an account (if available), we may
              collect your email address, name, or other contact details you voluntarily provide.
            </p>

            <p className="text-base mb-3">
              We do not collect sensitive financial information, payment details, or precise
              geolocation unless explicitly provided and necessary for a feature.
            </p>

            <p className="text-base mb-3">
              <strong>How We Use Your Information</strong>
            </p>

            <p className="text-base mb-3">We use the collected information to:</p>

            <p className="text-base mb-3">
              - Operate, maintain, and improve the Service (e.g., display live prices, generate
              charts).
            </p>

            <p className="text-base mb-3">- Analyze usage trends and enhance user experience.</p>

            <p className="text-base mb-3">- Respond to inquiries or provide support.</p>

            <p className="text-base mb-3">- Comply with legal obligations.</p>

            <p className="text-base mb-3">
              We do not sell your personal information to third parties.
            </p>

            <p className="text-base mb-3">
              <strong>Third-Party Services and Analytics</strong>
            </p>

            <p className="text-base mb-3">
              We may use third-party tools (e.g., Google Analytics) to understand usage. These
              services may collect anonymized data in accordance with their own policies. We display
              ads or use services that may involve cookies for non-personalized advertising. For
              more details, see our Cookie Policy (if separate) or the privacy policies of those
              providers.
            </p>

            <p className="text-base mb-3">
              <strong>Data Sharing and Disclosure</strong>
            </p>

            <p className="text-base mb-3">We share information only:</p>

            <p className="text-base mb-3">
              - With service providers who assist us (e.g., hosting, analytics) under strict
              confidentiality.
            </p>

            <p className="text-base mb-3">
              - To comply with laws, respond to legal requests, or protect rights and safety.
            </p>

            <p className="text-base mb-3">
              We do not share personal data for marketing purposes without consent.
            </p>

            <p className="text-base mb-3">
              <strong>Data Security</strong>
            </p>

            <p className="text-base mb-3">
              We implement reasonable security measures to protect your information. However, no
              method of transmission over the internet is 100% secure.
            </p>

            <p className="text-base mb-3">
              <strong>Your Rights and Choices</strong>
            </p>

            <p className="text-base mb-3">
              You may opt out of cookies via browser settings. To request access, correction, or
              deletion of your data (where applicable under laws like GDPR or CCPA), contact us. We
              respond to verifiable requests in accordance with applicable privacy laws.
            </p>

            <p className="text-base mb-3">
              <strong>Children's Privacy</strong>
            </p>

            <p className="text-base mb-3">
              The Service is not directed to children under 13 (or 16 in some jurisdictions). We do
              not knowingly collect data from children. If we learn we have, we will delete it.
            </p>

            <p className="text-base mb-3">
              <strong>Changes to This Policy</strong>
            </p>

            <p className="text-base mb-3">
              We may update this Privacy Policy. Changes will be posted here with an updated
              effective date. Continued use of the Service constitutes acceptance.
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
