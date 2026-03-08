'use client';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FileText, Plus, LogOut, Image, File } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                Dashboard
              </Link>
              <nav className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <LayoutDashboard size={18} />
                  Articles
                </Link>
                <Link
                  href="/dashboard/articles/new"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Plus size={18} />
                  New Article
                </Link>
                <Link
                  href="/dashboard/pages"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <File size={18} />
                  Pages
                </Link>
                <Link
                  href="/dashboard/images"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Image size={18} />
                  Images
                </Link>
              </nav>
            </div>
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <LogOut size={18} />
              Exit
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
