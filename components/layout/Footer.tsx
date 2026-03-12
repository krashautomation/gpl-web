'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Script from 'next/script';
import { BannerAd } from '@/components/BannerAd';

const fetchArticles = async () => {
  const res = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Finvestorsgold.substack.com%2Ffeed',
    { next: { revalidate: 86400 } }
  );
  const data = await res.json();
  if (data.status === 'ok' && data.items) {
    return data.items.slice(0, 5);
  }
  return [];
};

const Footer = () => {
  const [articles, setArticles] = useState<{ title: string; link: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch articles:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 pt-4">
        <div className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {/* Card 1: Hey guys intro */}
            <Card className="border-neutral-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-4 mt-2">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/dave-profile.png"
                      alt="Dave at Gold Price Live"
                      width={80}
                      height={80}
                      priority={false}
                      className="shadow-lg rounded-full border-4 border-amber-500"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="">
                      <b className="">Hey guys</b> 👋 (
                      <a
                        href="/about"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        about
                      </a>
                      ){' '}
                    </p>
                    <p className="mt-6">
                      Welcome to Gold Price Live. I created this site to help my gold bug friends
                      invest their savings wisely. When I am not working on this site, I write about
                      investing on Substack. You can signup below:
                    </p>
                    <p className="mt-6">
                      <a
                        href="https://investorsgold.substack.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline font-extrabold"
                      >
                        investorsgold.substack.com
                      </a>
                    </p>
                    <p className=" mt-6">I appreciate your support 😊</p>
                    <p className=" mt-1"> - Dave</p>
                    <p className=" mt-6">
                      P.S. Keep stacking and feel free to contact me with comments or questions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: INVESTORS GOLD Newsletter */}
            <Card className="border-neutral-800" style={{ backgroundColor: '#001e5a' }}>
              <CardContent className="p-4">
                <div className="flex-shrink-0 text-white font-extrabold px-3 pb-2">
                  INVESTORS <span className="text-[#ffe600]">GOLD</span> 🎯 (Newsletter)
                </div>
                <ul className="space-y-2 text-white pl-3 mt-2 mb-3">
                  {loading ? (
                    <li className="">Loading articles...</li>
                  ) : (
                    articles.map((article, index) => (
                      <li key={index}>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-orange-600 hover:underline"
                        >
                          {article.title}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
                <div className="mt-1 mb-3 pl-3 text-white">
                  <a
                    href="https://investorsgold.substack.com/archive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-orange-600 hover:underline"
                  >
                    See more posts from Investor's Gold →
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Subscribe form */}
            <Card className="border-neutral-800">
              <CardContent className="p-4">
                <div className="flex flex-col items-center mt-2" suppressHydrationWarning>
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/images/substack-logo.jpg"
                      alt="Investor's Gold"
                      width={40}
                      height={40}
                      className="rounded"
                      unoptimized
                    />
                    <div>
                      <p className="font-bold text-lg">Investor's Gold</p>
                      <p className="text-md ">The Investor's Edge. Subscribe ↓</p>
                    </div>
                  </div>
                  <div data-supascribe-embed-id="232973870932" data-supascribe-subscribe></div>
                  <Script
                    src="https://js.supascribe.com/v1/loader/z1oBwbT8aJaUbULnzyYbNJfmm5u2.js"
                    strategy="afterInteractive"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Gold Price Live App - at bottom */}
            <Card className="bg-amber-100 border-amber-300">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <div className="inline-block bg-amber-200 rounded-lg p-2 mb-3">
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/app-mockup.png"
                        alt="Gold Price Live App"
                        width={566}
                        height={500}
                        priority={false}
                        className="shadow-lg rounded"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-1">GOLD PRICE LIVE APP</h3>
                  <p className="text-md">(coming soon)</p>
                </div>
                <ul className="space-y-1  mb-4">
                  <li>• Gold price charts available on Android.</li>
                  <li>• Live gold and silver price tickers.</li>
                  <li>• Buy gold from a premier online gold bullion dealer.</li>
                  <li>• Read the latest financial news impacting gold prices.</li>
                </ul>
                <div className="text-center">
                  <div className="inline-block rounded-lg">
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/goldprice-googleplay.png"
                        alt="Gold Price Live App"
                        width={180}
                        height={55}
                        priority={false}
                        className="shadow-lg rounded"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BannerAd
        affiliateName="Money Metals Exchange"
        adName="Money Metals Exchange"
        href="https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708"
        src="https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708"
        className="my-6 pt-6"
      />

      <footer className="bg-[#001e5a] border-t border-[#001e5a]/30  mt-8 py-12 text-white">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Column 1: WORLD GOLD PRICES */}
            <div>
              <h4 className="text-yellow-500 font-bold mb-4 text-sm">WORLD GOLD PRICES</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="/#foreign-currency" className="text-white hover:text-orange-600">
                    <span className="fi fi-eu"></span> Gold Price EUR
                  </a>
                </li>
                <li>
                  <a href="/#foreign-currency" className="text-white hover:text-orange-600">
                    <span className="fi fi-au"></span> Gold Price AUD
                  </a>
                </li>
                <li>
                  <a href="/#foreign-currency" className="text-white hover:text-orange-600">
                    <span className="fi fi-ca"></span> Gold Price CAD
                  </a>
                </li>
                <li>
                  <a href="/#foreign-currency" className="text-white hover:text-orange-600">
                    <span className="fi fi-gb"></span> Gold Price GBP
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: GOLD PRICE NEWS + CHARTS */}
            <div>
              <h4 className="text-yellow-500 font-bold mb-4 text-sm">GOLD PRICE NEWS</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/news" className="text-white hover:text-orange-600">
                    Gold Price News
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-white hover:text-orange-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/about-dave-halmai" className="text-white hover:text-orange-600">
                    About Dave Halmai
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">GOLD PRICE CHARTS</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="/charts" className="text-white hover:text-orange-600">
                    Gold Price Charts
                  </a>
                </li>
                <li>
                  <a href="/gold-price-history" className="text-white hover:text-orange-600">
                    Gold Price History
                  </a>
                </li>
                <li>
                  <a href="/gold-silver-ratio" className="text-white hover:text-orange-600">
                    Gold Silver Ratio
                  </a>
                </li>
                <li>
                  <a href="/gold-price-today" className="text-white hover:text-orange-600">
                    Gold Price Today
                  </a>
                </li>
                <li>
                  <a href="/gold-price" className="text-white hover:text-orange-600">
                    Gold Price
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: PRECIOUS METALS + PRICE OF GOLD */}
            <div>
              <h4 className="text-yellow-500 font-bold mb-4 text-sm">PRECIOUS METALS</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/silver-price" className="text-white hover:text-orange-600">
                    Silver Price
                  </a>
                </li>
                <li>
                  <a href="/platinum-price" className="text-white hover:text-orange-600">
                    Platinum Price
                  </a>
                </li>
                <li>
                  <a href="/palladium-price" className="text-white hover:text-orange-600">
                    Palladium Price
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">BASE METALS</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/copper-price" className="text-white hover:text-orange-600">
                    Copper Price
                  </a>
                </li>
                <li>
                  <a href="/aluminum-price" className="text-white hover:text-orange-600">
                    Aluminum Price
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: STOCKS + CRYPTOCURRENCY */}
            <div>
              <h4 className="text-yellow-500 font-bold mb-4 text-sm">STOCKS</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/gold-stocks" className="text-white hover:text-orange-600">
                    Gold Stocks
                  </a>
                </li>
                <li>
                  <a href="/silver-stocks" className="text-white hover:text-orange-600">
                    Silver Stocks
                  </a>
                </li>
                <li>
                  <a href="/tungsten-stocks" className="text-white hover:text-orange-600">
                    Tungsten Stocks
                  </a>
                </li>
                <li>
                  <a href="/copper-stocks" className="text-white hover:text-orange-600">
                    Copper Stocks
                  </a>
                </li>
                <li>
                  <a href="/copper-etfs" className="text-white hover:text-orange-600">
                    Copper ETFs
                  </a>
                </li>
                <li>
                  <a href="/oil-energy-stocks" className="text-white hover:text-orange-600">
                    Oil & Energy Stocks
                  </a>
                </li>
                <li>
                  <a href="/gold-etfs" className="text-white hover:text-orange-600">
                    Gold ETFs
                  </a>
                </li>
                <li>
                  <a href="/silver-etfs" className="text-white hover:text-orange-600">
                    Silver ETFs
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">CRYPTOCURRENCY</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/bitcoin-price" className="text-white hover:text-orange-600">
                    Bitcoin Price
                  </a>
                </li>
                <li>
                  <a href="/ethereum-price" className="text-white hover:text-orange-600">
                    Ethereum Price
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">ENERGY PRICES</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/oil-price" className="text-white hover:text-orange-600">
                    Crude Oil Price
                  </a>
                </li>
                <li>
                  <a href="/natural-gas-price" className="text-white hover:text-orange-600">
                    Natural Gas Price
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: CONTACT + MOBILE + ADVERTISING */}
            <div>
              <h4 className="text-yellow-500 font-bold mb-4 text-sm">CONTACT</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/contact" className="text-white hover:text-orange-600">
                    Contact Us
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">MOBILE APPS</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/gold-price-live-app" className="text-white hover:text-orange-600">
                    📱 Gold Price Live App
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">ADVERTISING</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="/advertise" className="text-white hover:text-orange-600">
                    Gold Price Live Advertising
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white text-center text-xs text-white">
            <p>© 2026 Gold Price Live. Gold, Silver and Precious Metals Prices.</p>
            <p>
              <a href="/terms-of-service" className="text-white hover:text-orange-600">
                Terms of Service
              </a>{' '}
              &nbsp;
              <a href="/disclaimer" className="text-white hover:text-orange-600">
                Disclaimer
              </a>{' '}
              &nbsp;
              <a href="/risk-warning" className="text-white hover:text-orange-600">
                Risk Warning
              </a>{' '}
              &nbsp;
              <a href="/privacy" className="text-white hover:text-orange-600">
                Privacy
              </a>{' '}
              &nbsp;
              <a href="/roadmap" className="text-white hover:text-orange-600">
                Roadmap
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
