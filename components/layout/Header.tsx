'use client';

import { useState, useEffect } from 'react';
import { Coins, Menu, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
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
    label: 'Precious Metals',
    href: '/gold-stocks',
    children: [
      { label: 'Gold Price', href: '/gold-price', description: 'Live Gold Price USD' },
      {
        label: 'Gold Price FX',
        href: '/#foreign-currency',
        description: 'Gold Price in EUR, AUD, CAD, GBP',
      },
      { label: 'Gold Stocks', href: '/gold-stocks', description: 'Gold Mining Stocks' },
      { label: 'Gold ETFs', href: '/gold-etfs', description: 'Gold ETFs' },
      {
        label: 'Gold Price Live App',
        href: '/gold-price-live-app',
        description: 'Gold Price Live Mobile App',
      },
      { label: 'Silver Stocks', href: '/silver-stocks', description: 'Silver Mining Stocks' },
      { label: 'Silver ETFs', href: '/silver-etfs', description: 'Silver ETFs' },
      { label: 'Platinum Stocks', href: '/platinum-stocks', description: 'Platinum Mining Stocks' },
      { label: 'Platinum ETFs', href: '/platinum-etfs', description: 'Platinum ETFs' },
      {
        label: 'Palladium Stocks',
        href: '/palladium-stocks',
        description: 'Palladium Mining Stocks',
      },
      { label: 'Palladium ETFs', href: '/palladium-etfs', description: 'Palladium ETFs' },
      { label: 'PGM Stocks', href: '/pgm-stocks', description: 'Platinum Group Metals' },
      {
        label: 'Precious Metals ETFs',
        href: '/precious-metals-etfs',
        description: 'Multi-PGM ETFs',
      },
    ],
  },
  {
    label: 'Base Metals',
    href: '/copper-stocks',
    children: [
      { label: 'Copper Stocks', href: '/copper-stocks', description: 'Copper Mining Stocks' },
      { label: 'Copper ETFs', href: '/copper-etfs', description: 'Copper ETFs' },
      { label: 'Nickel Stocks', href: '/nickel-stocks', description: 'Nickel Mining Stocks' },
      { label: 'Nickel ETFs', href: '/nickel-etfs', description: 'Nickel ETFs' },
      { label: 'Zinc Stocks', href: '/zinc-stocks', description: 'Zinc Mining Stocks' },
      { label: 'Aluminum Stocks', href: '/aluminum-stocks', description: 'Aluminum Stocks' },
      { label: 'Iron & Steel Stocks', href: '/iron-steel-stocks', description: 'Steel Producers' },
      { label: 'Steel ETFs', href: '/steel-etfs', description: 'Steel ETFs' },
    ],
  },
  {
    label: 'Battery & Critical',
    href: '/lithium-stocks',
    children: [
      { label: 'Lithium Stocks', href: '/lithium-stocks', description: 'Lithium Mining Stocks' },
      { label: 'Lithium ETFs', href: '/lithium-etfs', description: 'Lithium ETFs' },
      { label: 'Uranium Stocks', href: '/uranium-stocks', description: 'Uranium Mining Stocks' },
      { label: 'Uranium ETFs', href: '/uranium-etfs', description: 'Uranium ETFs' },
      { label: 'Rare Earth Stocks', href: '/rare-earth-stocks', description: 'Rare Earth Mining' },
      { label: 'Rare Earth ETFs', href: '/rare-earth-etfs', description: 'Rare Earth ETFs' },
      {
        label: 'Critical Minerals Stocks',
        href: '/critical-minerals-stocks',
        description: 'Critical Metals',
      },
      {
        label: 'Critical Minerals ETFs',
        href: '/critical-minerals-etfs',
        description: 'Critical Metals ETFs',
      },
    ],
  },
  {
    label: 'Specialty Metals',
    href: '/tungsten-stocks',
    children: [
      { label: 'Tungsten Stocks', href: '/tungsten-stocks', description: 'Tungsten Mining Stocks' },
      { label: 'Antimony Stocks', href: '/antimony-stocks', description: 'Antimony Mining Stocks' },
      { label: 'Cobalt Stocks', href: '/cobalt-stocks', description: 'Cobalt Stocks' },
      { label: 'Vanadium Stocks', href: '/vanadium-stocks', description: 'Vanadium Stocks' },
      { label: 'Titanium Stocks', href: '/titanium-stocks', description: 'Titanium Stocks' },
      { label: 'Silicon Stocks', href: '/silicon-stocks', description: 'Silicon Stocks' },
      { label: 'Beryllium Stocks', href: '/beryllium-stocks', description: 'Beryllium Stocks' },
      { label: 'Niobium Stocks', href: '/niobium-stocks', description: 'Niobium Stocks' },
    ],
  },
  {
    label: 'Energy',
    href: '/#energy',
    children: [
      { label: 'Crude Oil Price', href: '/oil-price' },
      { label: 'Natural Gas Price', href: '/natural-gas-price' },
      { label: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
    ],
  },

  {
    label: 'News',
    href: '/#news',
    children: [
      { label: 'Gold News', href: '/news' },
      { label: 'Bitcoin Price', href: '/bitcoin-price', description: 'Bitcoin Price' },
      { label: 'Ethereum Price', href: '/ethereum-price', description: 'Ethereum Price' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Gold Price Live App', href: '/gold-price-live-app' },
      { label: 'Gold Advertising', href: '/advertise' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ],
  },
];

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <li>
        <SheetClose asChild>
          <Link
            href={item.href}
            className="block py-3 px-4 text-sm font-medium  hover:bg-[#002a6a] hover: rounded-md transition-colors"
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
        className="flex justify-between items-center w-full py-3 px-4 text-sm font-medium text-white hover:bg-[#002a6a] hover: rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{item.label}</span>
        <ChevronDown
          size={16}
          className={cn(
            'transition-transform duration-200 text-white',
            isOpen && 'rotate-180 text-white'
          )}
        />
      </button>

      {isOpen && (
        <div className="pl-4 space-y-1 mt-1">
          {item.children.map(child => (
            <SheetClose asChild key={child.href}>
              <Link
                href={child.href}
                className="block py-2.5 px-4 text-sm text-white hover:bg-[#002a6a] hover: rounded-md transition-colors"
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

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b border-[#001e5a]/30 bg-[#001e5a]  sticky top-0 z-50">
        <div className="container mx-auto px-2 py-2 pt-3 max-w-[1200px]">
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
            <div className="hidden lg:block text-white">
              <NavigationMenu className="text-white">
                <NavigationMenuList className="gap-1 text-white">
                  {navItems.map(item => (
                    <NavigationMenuItem key={item.label} className="text-white">
                      {item.children ? (
                        <>
                          <NavigationMenuTrigger className="text-white bg-transparent hover:bg-[#002a6a] hover: data-[state=open]:bg-[#002a6a] data-[state=open]: focus:bg-[#002a6a] focus:">
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#001a4a] border border-[#001e5a] text-white">
                              {item.children.map(child => (
                                <li key={child.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={child.href}
                                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-white hover:bg-[#002a6a] hover: focus:bg-[#002a6a]"
                                    >
                                      <div className="text-sm text-white font-medium  leading-none">
                                        {child.label}
                                      </div>
                                      {child.description && (
                                        <p className="line-clamp-2 text-sm leading-snug mt-1">
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
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-[#002a6a] hover: focus:bg-[#002a6a] focus: focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#002a6a]/50 data-[state=open]:bg-[#002a6a]/50"
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
              <SheetTrigger asChild className="lg:hidden text-white">
                <button
                  className="p-2 rounded-md  hover:bg-[#002a6a] hover:text-white transition-colors text-white"
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-[#001a4a] border-[#001e5a] ">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-8 pt-4">
                    <Coins className="h-6 w-6 text-yellow-500" />
                    <span className="text-xl font-bold text-yellow-500">Menu</span>
                  </div>

                  <nav className="flex-1">
                    <ul className="space-y-1 text-white">
                      {navItems.map(item => (
                        <MobileNavItem
                          key={item.label}
                          item={item}
                          onClose={() => setMobileMenuOpen(false)}
                        />
                      ))}
                    </ul>
                  </nav>

                  <div className="border-t border-white pt-4 mt-4">
                    <p className="text-xs text-white">© 2026 Gold Price Live</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Tagline */}
          <p className="text-xs  mt-0 hidden sm:block px-0 text-white">
            GOLD PRICES LIVE 24/7 MARKET NEWS
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
