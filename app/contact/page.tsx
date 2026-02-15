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

<p className="text-base mb-3">My investing journey evolved through cycles of innovation, volatility, and timeless value.</p>

<p className="text-base mb-3">It began in tech: backing startups in AI, cloud, and smartphones.</p>

<p className="text-base mb-3">Today I believe real wealth grows through genuine connection, bold idea-sharing, and creative partnerships—let's talk gold, markets, or your next big move.</p>
         
<p className="text-base mb-3">If you want to see more of my writings signup below. Otherwise, keep reading for my contact information.</p>
                  
         
             <Button className="w-full bg-orange-500 hover:bg-yellow-600  font-semibold">
             <Link href="https://investorsgold.substack.com/" target="_blank" 
  rel="noopener noreferrer">
    Subscribe to Investor's Gold on Substack
  </Link>
             </Button>
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
   I started Gold Price Live as a vibe coding project to help me share what I have learned about investing, finance and precious metals. 
  </p>

  <p className="text-base  leading-relaxed max-w-lg mb-8">
   "Gold is the money of kings." — Anonymous</p>

   <p className="text-base  font-semibold mb-3">
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
      className=" hover:underline"
    >
      Advertise on Gold Price Live
    </a></p>

   <p className="text-xs text-neutral-400 text-center mt-6">
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
