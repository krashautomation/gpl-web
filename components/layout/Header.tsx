'use client';

import { useState } from 'react';
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
      { label: 'Live Gold Price', href: '/gold-price', description: 'Current gold prices worldwide' },
      { label: 'Gold Price Chart', href: '/#gold-chart', description: 'Interactive price charts' },
      { label: 'Gold Calculator', href: '/#calculator', description: 'Calculate gold value' },
      { label: 'Gold by Country', href: '/#countries', description: 'Prices by region' },
    ],
  },
  {
    label: 'Silver Price',
    href: '/silver-price',
    children: [
      { label: 'Live Silver Price', href: '/silver-price', description: 'Current silver spot price' },
      { label: 'Silver Chart', href: '/silver-price#chart', description: 'Silver price history' },
      { label: 'Silver Calculator', href: '/silver-price#calculator', description: 'Calculate silver value' },
    ],
  },
  {
    label: 'Precious Metals',
    href: '/#metals',
    children: [
      { label: 'Gold', href: '/gold-price' },
      { label: 'Silver', href: '/silver-price' },
      { label: 'Platinum', href: '/platinum-price' },
      { label: 'Palladium', href: '/palladium-price' },
    ],
  },
  {
    label: 'Charts',
    href: '/charts',
  },
  {
    label: 'News',
    href: '/news',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-neutral-800 bg-neutral-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu className="text-white">
              <NavigationMenuList className="gap-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="text-white bg-transparent hover:bg-neutral-800 data-[state=open]:bg-neutral-800 focus:bg-neutral-800">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-neutral-900 border border-neutral-800">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-yellow-500 focus:bg-neutral-800"
                                  >
                                    <div className="text-sm font-medium text-white leading-none">
                                      {child.label}
                                    </div>
                                    {child.description && (
                                      <p className="line-clamp-2 text-sm leading-snug text-neutral-400 mt-1">
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
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-800 hover:text-yellow-500 focus:bg-neutral-800 focus:text-yellow-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral-800/50 data-[state=open]:bg-neutral-800/50"
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
                className="p-2 rounded-md text-white hover:bg-neutral-800 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-neutral-900 border-neutral-800 text-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-8 pt-4">
                  <Coins className="h-6 w-6 text-yellow-500" />
                  <span className="text-xl font-bold text-yellow-500">Menu</span>
                </div>

                <nav className="flex-1">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <MobileNavItem 
                        key={item.label} 
                        item={item} 
                        onClose={() => setMobileMenuOpen(false)}
                      />
                    ))}
                  </ul>
                </nav>

                <div className="border-t border-neutral-800 pt-4 mt-4">
                  <p className="text-xs text-neutral-400">
                    © 2026 Gold Price Live
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Tagline */}
        <p className="text-xs text-neutral-400 mt-2 hidden sm:block">
          GOLD PRICES LIVE. SILVER PRICE LIVE. GOLD PRICE CHARTS.
        </p>
      </div>
    </header>
  );
};

function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <li>
        <SheetClose asChild>
          <Link
            href={item.href}
            className="block py-3 px-4 text-sm font-medium text-white hover:bg-neutral-800 hover:text-yellow-500 rounded-md transition-colors"
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
        className="flex justify-between items-center w-full py-3 px-4 text-sm font-medium text-white hover:bg-neutral-800 hover:text-yellow-500 rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{item.label}</span>
        <ChevronDown 
          size={16} 
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <div className="pl-4 space-y-1 mt-1">
          <SheetClose asChild>
            <Link
              href={item.href}
              className="block py-2.5 px-4 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-yellow-500 rounded-md transition-colors"
              onClick={onClose}
            >
              View All {item.label}
            </Link>
          </SheetClose>
          {item.children.map((child) => (
            <SheetClose asChild key={child.href}>
              <Link
                href={child.href}
                className="block py-2.5 px-4 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-yellow-500 rounded-md transition-colors"
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
