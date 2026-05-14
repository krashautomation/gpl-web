import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAINTENANCE_MODE = true;

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Allow the maintenance page itself through
  if (pathname === '/maintenance') return NextResponse.next();

  // Rewrite everything else to the maintenance page
  return NextResponse.rewrite(new URL('/maintenance', request.url));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
