'use client';

import { useState, useEffect } from 'react';
import { Coins, Menu, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Gold Price',
    href: '/gold-price',
    children: [
      {
        label: 'Gold Price FX',
        href: '/#foreign-currency',
        description: 'Gold Price in EUR, AUD, CAD, GBP',
      },

      {
        label: 'Gold Price Live App',
        href: '/gold-price-live-app',
        description: 'Gold Price Live Mobile App',
      },
    ],
  },
  {
    label: 'Gold Stocks',
    href: '/gold-stocks',
    children: [
      { label: 'Gold ETFs', href: '/gold-etfs', description: 'Gold ETFs' },
      { label: 'Silver ETFs', href: '/silver-etfs', description: 'Silver ETFs' },
    ],
  },
  {
    label: 'Metals',
    href: '/#metals',
    children: [
      { label: 'Silver Price', href: '/silver-price' },
      { label: 'Platinum Price', href: '/platinum-price' },
      { label: 'Palladium Price', href: '/palladium-price' },
      { label: 'Copper Price', href: '/copper-price' },
      { label: 'Aluminum Price', href: '/aluminum-price' },
    ],
  },

  {
    label: 'Crypto',
    href: '/#crypto',
    children: [
      { label: 'Bitcoin Price', href: '/bitcoin-price' },
      { label: 'Ethereum Price', href: '/ethereum-price' },
    ],
  },

  {
    label: 'News',
    href: '/#news',
    children: [
      { label: 'Gold News', href: '/news' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Gold Price Live App', href: '/gold-price-live-app' },
      { label: 'Gold Advertising', href: '/advertise' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ],
  },
];

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

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <>
      <header className="border-b border-[#001e5a]/30 bg-[#001e5a] text-white sticky top-0 z-50">
        <div className="container mx-auto px-2 py-2 pt-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  src="/images/gold-price-live-word-220.png"
                  alt="Gold Price Live logo"
                  width={210} // replace with your actual width
                  height={25} // replace with your actual height (important for layout)
                  priority // optional: if this is above-the-fold / important image
                  className="drop-shadow-2xl"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <NavigationMenu className="text-white">
                <NavigationMenuList className="gap-1">
                  {navItems.map(item => (
                    <NavigationMenuItem key={item.label}>
                      {item.children ? (
                        <>
                          <NavigationMenuTrigger className="text-white bg-transparent hover:bg-[#002a6a] hover:text-white data-[state=open]:bg-[#002a6a] data-[state=open]:text-white focus:bg-[#002a6a] focus:text-white">
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#001a4a] border border-[#001e5a]">
                              {item.children.map(child => (
                                <li key={child.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={child.href}
                                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#002a6a] hover:text-white focus:bg-[#002a6a]"
                                    >
                                      <div className="text-sm font-medium text-white leading-none">
                                        {child.label}
                                      </div>
                                      {child.description && (
                                        <p className="line-clamp-2 text-sm leading-snug text-gray-300 mt-1">
                                          {child.description}
                                        </p>
                                      )}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-[#002a6a] hover:text-white focus:bg-[#002a6a] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#002a6a]/50 data-[state=open]:bg-[#002a6a]/50"
                        >
                          {item.label}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button
                  className="p-2 rounded-md text-white hover:bg-[#002a6a] transition-colors"
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-[#001a4a] border-[#001e5a] text-white"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-8 pt-4">
                    <Coins className="h-6 w-6 text-yellow-500" />
                    <span className="text-xl font-bold text-yellow-500">Menu</span>
                  </div>

                  <nav className="flex-1">
                    <ul className="space-y-1">
                      {navItems.map(item => (
                        <MobileNavItem
                          key={item.label}
                          item={item}
                          onClose={() => setMobileMenuOpen(false)}
                        />
                      ))}
                    </ul>
                  </nav>

                  <div className="border-t border-neutral-800 pt-4 mt-4">
                    <p className="text-xs text-neutral-400">© 2026 Gold Price Live</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Tagline */}
          <p className="text-xs text-white mt-0 hidden sm:block px-0">
            GOLD PRICES LIVE 24/7 MARKET NEWS
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-neutral-800 h-full">
            <CardContent className="p-6">
              {/* Flex row → image left | text right */}
              <div className="flex items-center gap-6">
                {/* Image column */}
                <div className="flex-shrink-0">
                  <Image
                    src="/images/dave-profile.png"
                    alt="Dave at Gold Price Live"
                    width={110}
                    height={110}
                    priority={false}
                    className="shadow-lg " // rounded-full is nice for profile pics
                  />
                </div>

                {/* Text column */}
                <div className="flex-1">
                  <p className="mt-1 text-sm">
                    <b className="">Hey guys...</b> 👋 (
                    <a
                      href="/about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-400 hover:underline"
                    >
                      about
                    </a>
                    ){' '}
                  </p>
                  <p className="mt-1  text-sm">
                    I created this site to help my fellow gold bugs invest more wisely. I write
                    about investing on Substack...
                  </p>

                  <p className="my-1  text-sm">
                    Signup here: 👉 &nbsp;
                    <a
                      href="https://investorsgold.substack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" hover:underline font-extrabold"
                    >
                      investorsgold.substack.com
                    </a>
                  </p>
                  <p className="mt-1  text-sm">( Your support is appreciated 😊) - Dave</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#001e5a]/30 bg-[#001e5a]  h-full">
            <CardContent className="p-3">
              <div className="flex-shrink-0 text-white font-extrabold px-3 pb-2">
                INVESTORS <span className="text-[#ffe600]">GOLD</span> 🎯 (Newsletter)
              </div>

              <ul className="space-y-2 text-sm text-gray-200 pl-3">
                {loading ? (
                  <li className="text-gray-400">Loading articles...</li>
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

              <div className="mt-1 pl-3">
                <a
                  href="https://investorsgold.substack.com/archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white hover:text-[#ffe600] hover:underline"
                >
                  See more posts from Investor's Gold →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <li>
        <SheetClose asChild>
          <Link
            href={item.href}
            className="block py-3 px-4 text-sm font-medium text-white hover:bg-[#002a6a] hover:text-white rounded-md transition-colors"
            onClick={onClose}
          >
            {item.label}
          </Link>
        </SheetClose>
      </li>
    );
  }

  return (
    <li>
      <button
        className="flex justify-between items-center w-full py-3 px-4 text-sm font-medium text-white hover:bg-[#002a6a] hover:text-white rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{item.label}</span>
        <ChevronDown
          size={16}
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="pl-4 space-y-1 mt-1">
          <SheetClose asChild>
            <Link
              href={item.href}
              className="block py-2.5 px-4 text-sm text-gray-200 hover:bg-[#002a6a] hover:text-white rounded-md transition-colors"
              onClick={onClose}
            >
              View All {item.label}
            </Link>
          </SheetClose>
          {item.children.map(child => (
            <SheetClose asChild key={child.href}>
              <Link
                href={child.href}
                className="block py-2.5 px-4 text-sm text-gray-200 hover:bg-[#002a6a] hover:text-white rounded-md transition-colors"
                onClick={onClose}
              >
                {child.label}
              </Link>
            </SheetClose>
          ))}
        </div>
      )}
    </li>
  );
}

export default Header;
