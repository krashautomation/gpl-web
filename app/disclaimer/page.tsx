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

import Link from "next/link"                      // if using Next.js

export default function AboutGoldPriceLive() {
  return (
    <MainLayout>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
             
            <p className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
  Disclaimer
  </p>
          </CardHeader>
           <CardContent>

<p className="text-base mb-3">Disclaimer for Gold Price Live</p>

<p className="text-base mb-3">Gold Price Live provides live and historical gold prices, charts, and related information sourced from third-party providers believed to be reliable. However, we do not guarantee the accuracy, completeness, timeliness, or reliability of any data displayed on the site.</p>

<p className="text-base mb-3">All content is provided for informational and educational purposes only and should not be considered financial, investment, tax, or legal advice. The information on this site does not take into account your personal financial situation, investment objectives, or risk tolerance.</p>

<p className="text-base mb-3">Precious metals prices are highly volatile and subject to rapid change. Past performance is not indicative of future results. Visitors are solely responsible for their own investment decisions and should conduct independent research and consult with a qualified financial advisor before making any purchases, sales, or investments.</p>

<p className="text-base mb-3">Gold Price Live accepts no liability for any loss, damage, or expense (direct or indirect) arising from the use of or reliance on any information provided on this site, including but not limited to errors, omissions, delays, or inaccuracies in pricing data.</p>

<p className="text-base mb-3">We may receive referral fees or advertising revenue from third-party gold dealers, providers, or affiliates linked or mentioned on the site. Any such relationships do not influence the presentation of price data. Always perform your own due diligence before engaging with any listed providers.</p>

<p className="text-base mb-3">Gold Price Live does not buy, sell, store, or trade gold or any precious metals. We are a free informational resource only and do not offer personal investment advice, valuations of coins, bars, jewelry, or any financial products.</p>

<p className="text-base mb-3">Your use of this site constitutes acceptance of this disclaimer. If you do not agree, please do not use the site.</p>

<p className="text-base mb-3">For questions, contact us at contact page.</p>


         
             
           </CardContent>
        </Card>
        
        
        <Card className=" border-neutral-800">
    
          <CardContent>
            <div className="overflow-x-auto">
        <div className="flex flex-col px-6 py-8">
  <p className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
    Contact Dave at Gold Price live
  </p>
  
  <p className="text-md text-gray-300 font-medium mb-6  max-w-md">
   I started Gold Price Live as a vibe coding project to help me share what I have learned about investing, finance and precious metals. 
  </p>

  <p className="text-base text-gray-400 leading-relaxed max-w-lg mb-8">
   "Gold is the money of kings." — Anonymous</p>

   <p className="text-base text-amber-400 font-semibold mb-3">
    For Advertising and Business Inquiries
  </p>
     

 <p className='mb-3'>Reach savvy investors interested in gold and precious metals investing. Advertise on Gold Price Live.</p>
 
    <p className='mb-3'>Contact: westrock@protonmail.com</p>
    <p className="my-1 text-base text-md">
    Learn more about ads here 👉 &nbsp;
    <a 
      href="/advertise" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-amber-400 hover:underline"
    >
      Advertise on Gold Price Live
    </a></p>

   <p className="text-xs text-neutral-400 text-center mt-6 mb-6">
     We respond within 24 hours. Packages available. 
   </p>

   <Button className="w-full bg-orange-500 hover:bg-yellow-600 text-white font-semibold">
             <Link href="https://investorsgold.substack.com/" target="_blank" 
  rel="noopener noreferrer">
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
