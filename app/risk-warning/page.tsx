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
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
             
            <p className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
  Risk Warning
  </p>
          </CardHeader>
           <CardContent>


<p className="text-base mb-3">Investing in gold, silver, or any precious metals involves significant risk and is not suitable for everyone. Prices can be highly volatile and may fluctuate dramatically due to economic, geopolitical, market, supply/demand, currency, interest rate, and other factors beyond our control.</p>

<p className="text-base mb-3">Gold Price Live provides price data, charts, and information sourced from third parties believed to be reliable, but we make no representations or warranties regarding accuracy, completeness, timeliness, or fitness for any purpose. Errors, delays, or omissions may occur. You should not rely on this information as the sole basis for any investment, trading, or financial decision.</p>

<p className="text-base mb-3">Past performance is not indicative of future results. You may lose some or all of your invested capital. The material on this site is general in nature and does not take into account your personal financial situation, risk tolerance, investment objectives, or needs.</p>

<p className="text-base mb-3">It is your responsibility to conduct your own due diligence, research, and risk assessment before making any investment decisions. We strongly recommend consulting a licensed, qualified financial advisor or professional before acting on any information from this site.</p>

<p className="text-base mb-3">Gold Price Live accepts no liability for any loss, damage, cost, or expense (direct, indirect, incidental, consequential, or otherwise) arising from the use of or reliance on any content provided on this site.</p>

<p className="text-base mb-3">Gold Price Live does not buy, sell, trade, store, or facilitate transactions in gold, silver, or any precious metals. We are a free informational resource only and do not provide personalized investment advice, recommendations, valuations of physical items (coins, bars, jewelry), or financial services of any kind.</p>

<p className="text-base mb-3">By accessing or using Gold Price Live, you acknowledge and accept these risks and this warning in full. If you do not agree, please do not use the site.</p>

<p className="text-base mb-3">For questions, contact us at contact page.</p>


         
             
           </CardContent>
        </Card>
        
        
        <Card className="bg-neutral-900 border-neutral-800">
    
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
