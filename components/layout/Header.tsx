'use client';

import { Coins } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="border-b border-neutral-800 bg-neutral-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-8 w-8 text-yellow-500" />
            <h1 className="text-2xl font-bold">
              <Link href="/">
                <span className="text-yellow-500">GOLD</span>
                <span className="text-white">PRICE </span>
                <span 
                  className="text-white" 
                  style={{
                      padding: '0px 5px',
                      backgroundColor: 'red',
                      borderRadius: '9px',
                      fontWeight: 'bold',
                  }}
                >
                  LIVE
                </span>
              </Link>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm hover:text-yellow-500 transition">CHARTS</button>
            <button className="text-sm hover:text-yellow-500 transition">PRICE OF GOLD</button>
            <button className="text-sm hover:text-yellow-500 transition">GOLD STOCKS</button>
            <Link href="/silver-price" className="text-sm hover:text-yellow-500 transition">SILVER PRICE</Link>
            <button className="text-sm hover:text-yellow-500 transition">CRYPTO</button>
            <button className="text-sm hover:text-yellow-500 transition">NEWS</button>
          </nav>
        </div>
        <p className="text-xs text-neutral-400 mt-2">GOLD PRICES LIVE. SILVER PRICE LIVE. GOLD PRICE CHARTS.</p>
      </div>
    </header>
  );
};

export default Header;
