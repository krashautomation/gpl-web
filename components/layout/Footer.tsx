'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Script from 'next/script';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-neutral-800 h-full">
            <CardContent className="p-3">
              {/* Flex row → image left | text right */}
              <div className="flex items-start gap-4">
                {/* Image column */}
                <div className="flex-shrink-0 pl-3 pt-2">
                  <Image
                    src="/images/dave-profile.png"
                    alt="Dave at Gold Price Live"
                    width={80}
                    height={80}
                    priority={false}
                    className="shadow-lg rounded-full border-4 border-amber-500" // rounded-full is nice for profile pics
                  />
                </div>

                {/* Text column */}
                <div className="flex-1">
                  <p className="mt-1 text-sm">
                    <b className="">Hey guys</b> 👋 (
                    <a
                      href="/about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover: hover:underline"
                    >
                      about
                    </a>
                    ){' '}
                  </p>
                  <p className="mt-1  text-sm">
                    Welcome to Gold Price Live. I created this site to help my gold bug friends
                    invest their savings wisely. When I am not working on this site, I write about
                    investing on Substack. You can signup below:
                  </p>

                  <p className="my-1  text-sm">
                    <a
                      href="https://investorsgold.substack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" hover:underline font-extrabold"
                    >
                      investorsgold.substack.com
                    </a>
                  </p>
                  <p className="mt-1  text-sm">I appreciate your support 😊 - Dave</p>
                  <p className="mt-1  text-sm">
                    P.S. Keep stacking and feel free to contact me with comments or questions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#001e5a]/30 bg-[#001e5a]  h-full">
            <CardContent className="p-3">
              <div className="flex-shrink-0 text-white  font-extrabold px-3 pb-2">
                INVESTORS <span className="text-[#ffe600]">GOLD</span> 🎯 (Newsletter)
              </div>

              <ul className="space-y-2 text-sm text-gray-200 pl-3">
                {loading ? (
                  <li className="">Loading articles...</li>
                ) : (
                  articles.map((article, index) => (
                    <li key={index}>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#ffe600] hover:underline"
                      >
                        {article.title}
                      </a>
                    </li>
                  ))
                )}
              </ul>

              <div className="mt-1 pl-3 text-white">
                <a
                  href="https://investorsgold.substack.com/archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm  hover:text-[#ffe600] hover:underline"
                >
                  See more posts from Investor's Gold →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-8">
          <div id="substack-embed" className="min-h-[320px]">
            <div className="h-[320px] flex items-center justify-center bg-gray-100 rounded">
              <span className="text-gray-500">Loading newsletter...</span>
            </div>
          </div>
          <Script id="substack-load" strategy="lazyOnload">
            {`
              document.getElementById('substack-embed').innerHTML = '<iframe src="https://investorsgold.substack.com/embed" width="480" height="320" style="border:1px solid #EEE;background:white" frameborder="0" scrolling="no"></iframe>';
            `}
          </Script>
        </div>
      </div>

      <footer className="bg-[#001e5a] border-t border-[#001e5a]/30  mt-8 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Column 1: WORLD GOLD PRICES */}
            <div>
              <h4 className="text-yellow-500 font-bold mb-4 text-sm">WORLD GOLD PRICES</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="/#foreign-currency" className="hover:text-yellow-500">
                    <span className="fi fi-eu"></span> Gold Price EUR
                  </a>
                </li>
                <li>
                  <a href="/#foreign-currency" className="hover:text-yellow-500">
                    <span className="fi fi-au"></span> Gold Price AUD
                  </a>
                </li>
                <li>
                  <a href="/#foreign-currency" className="hover:text-yellow-500">
                    <span className="fi fi-ca"></span> Gold Price CAD
                  </a>
                </li>
                <li>
                  <a href="/#foreign-currency" className="hover:text-yellow-500">
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
                  <a href="/news" className="hover:text-yellow-500">
                    Gold Price News
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-yellow-500">
                    About Us
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">GOLD PRICE CHARTS</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="/charts" className="hover:text-yellow-500">
                    Gold Price Charts
                  </a>
                </li>
                <li>
                  <a href="/gold-price-history" className="hover:text-yellow-500">
                    Gold Price History
                  </a>
                </li>
                <li>
                  <a href="/gold-silver-ratio" className="hover:text-yellow-500">
                    Gold Silver Ratio
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: PRECIOUS METALS + PRICE OF GOLD */}
            <div>
              <h4 className="text-yellow-500 font-bold mb-4 text-sm">PRECIOUS METALS</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/silver-price" className="hover:text-yellow-500">
                    Silver Price
                  </a>
                </li>
                <li>
                  <a href="/platinum-price" className="hover:text-yellow-500">
                    Platinum Price
                  </a>
                </li>
                <li>
                  <a href="/palladium-price" className="hover:text-yellow-500">
                    Palladium Price
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">BASE METALS</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/copper-price" className="hover:text-yellow-500">
                    Copper Price
                  </a>
                </li>
                <li>
                  <a href="/aluminum-price" className="hover:text-yellow-500">
                    Aluminum Price
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: CRYPTOCURRENCY + BUY GOLD */}
            <div>
              <h4 className="text-yellow-500 font-bold mb-4 text-sm">GOLD STOCKS</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/gold-etfs" className="hover:text-yellow-500">
                    Gold ETFs
                  </a>
                </li>
                <li>
                  <a href="/silver-etfs" className="hover:text-yellow-500">
                    Silver ETFs
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">CRYPTOCURRENCY</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/bitcoin-price" className="hover:text-yellow-500">
                    Bitcoin Price
                  </a>
                </li>
                <li>
                  <a href="/ethereum-price" className="hover:text-yellow-500">
                    Ethereum Price
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: CONTACT + MOBILE + ADVERTISING */}
            <div>
              <h4 className="text-yellow-500 font-bold mb-4 text-sm">CONTACT</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/contact" className="hover:text-yellow-500">
                    Contact Us
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">MOBILE APPS</h4>
              <ul className="space-y-2 text-xs mb-6">
                <li>
                  <a href="/gold-price-live-app" className="hover:text-yellow-500">
                    📱 Gold Price Live App
                  </a>
                </li>
              </ul>

              <h4 className="text-yellow-500 font-bold mb-4 text-sm">ADVERTISING</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="/advertise" className="hover:text-yellow-500">
                    Gold Price Live Advertising
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white text-center text-xs text-white">
            <p>© 2026 Gold Price Live. Gold, Silver and Precious Metals Prices.</p>
            <p>
              <a href="/terms-of-service" className="hover:text-yellow-500">
                Terms of Service
              </a>{' '}
              &nbsp;
              <a href="/disclaimer" className="hover:text-yellow-500">
                Disclaimer
              </a>{' '}
              &nbsp;
              <a href="/risk-warning" className="hover:text-yellow-500">
                Risk Warning
              </a>{' '}
              &nbsp;
              <a href="/privacy" className="hover:text-yellow-500">
                Privacy
              </a>{' '}
              &nbsp;
              <a href="/roadmap" className="hover:text-yellow-500">
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
