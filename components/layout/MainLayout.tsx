import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbStructuredData } from '@/components/StructuredData';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type MainLayoutProps = {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
};

function BreadcrumbNav({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm">
      <Link href="/" className="hover:text-amber-600 transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <Link href={item.href} className="hover:text-amber-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co';
  const schemaItems = [
    { name: 'Home', url: siteUrl },
    ...items.map(item => ({
      name: item.label,
      url: item.href ? `${siteUrl}${item.href}` : '',
    })),
  ].filter(item => item.url);

  return (
    <BreadcrumbStructuredData
      items={schemaItems.map((item, index) => ({
        name: item.name,
        url: item.url,
      }))}
    />
  );
}

const MainLayout = ({ children, breadcrumbs }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <>
              <BreadcrumbSchema items={breadcrumbs} />
              <BreadcrumbNav items={breadcrumbs} />
            </>
          )}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
