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

export default function GoldPriceLiveApp() {
  return (
    <MainLayout>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
              <div className="flex-shrink-0">
                        <Image
                          src="/images/app-mockup.png"
                          alt="Gold Price Live App"
                          width={566}
                          height={500}
                          priority={false}
                          className="shadow-lg" // rounded-full is nice for profile pics
                        />
                      </div>
            
          </CardHeader>
           <CardContent>
             <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
               Download App
             </Button>
           </CardContent>
        </Card>
        
        
        <Card className="bg-neutral-900 border-neutral-800">
    
          <CardContent>
            <div className="overflow-x-auto">
        <div className="flex flex-col items-center px-6 py-8">
  <p className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
    Gold Price Live App
  </p>
  
  <p className="text-lg md:text-xl text-gray-300 font-medium mb-6 text-center max-w-md">
    Real-Time Precious Metals & Market Tracker
  </p>

  <p className="text-base text-gray-400 leading-relaxed text-center max-w-lg mb-8">
    Stay ahead of the market with live gold prices, silver prices, and major market indexes — updated in real time on your Android device.
  </p>

  <p className="text-sm text-neutral-300 font-medium mb-4">
    Current features:
  </p>

  <ul className="text-sm text-neutral-400 list-disc list-inside mb-6 space-y-1.5">
    <li>Live spot prices for Gold (XAU/USD) and Silver (XAG/USD)</li>
    <li>Real-time major market indexes</li>
    <li>Clean, fast, mobile-optimized interface</li>
    <li>Available now on Android</li>
  </ul>

   <p className="text-base text-amber-400 font-semibold mb-3">
     More powerful features coming soon:
   </p>

   <p className="text-sm text-neutral-400 text-center mb-8 max-w-md">
     Portfolio tracking • Price alerts • Interactive charts • Historical data • And much more…
   </p>

   <Button className="w-full max-w-xs mx-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
     Download Now
   </Button>

   <p className="text-xs text-neutral-400 text-center mt-6">
     Download Gold Price Live now and never miss a move in the precious metals market!
   </p>
</div>
            </div>
          </CardContent>
        </Card>
  
      </div>
    </MainLayout>
  );
}
