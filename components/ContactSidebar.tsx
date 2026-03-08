'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ContactSidebarProps {
  className?: string;
}

export function ContactSidebar({ className }: ContactSidebarProps) {
  return (
    <Card className={className}>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="flex flex-col px-6 py-8">
            <p className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
              Contact Dave at Gold Price live
            </p>

            <p className="text-md font-medium mb-6 max-w-md">
              I started Gold Price Live as a vibe coding project to help me share what I have
              learned about investing, finance and precious metals.
            </p>

            <p className="text-base leading-relaxed max-w-lg mb-8">
              &quot;Gold is the money of kings.&quot; — Anonymous
            </p>

            <p className="text-base font-semibold mb-3">For Advertising and Business Inquiries</p>

            <p className="mb-3">
              Reach savvy investors interested in gold and precious metals investing. Advertise on
              Gold Price Live.
            </p>

            <p className="mb-3">Contact: westrock@protonmail.com</p>
            <p className="my-1 text-base text-md">
              Learn more about ads here 👉 &nbsp;
              <a
                href="/advertise"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Advertise on Gold Price Live
              </a>
            </p>

            <p className="text-xs text-neutral-800 text-center mt-6 mb-6">
              We respond within 24 hours. Packages available.
            </p>

            <Button className="w-full bg-orange-500 hover:bg-yellow-600 text-white font-semibold">
              <Link
                href="https://investorsgold.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe to Investor&apos;s Gold on Substack
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
