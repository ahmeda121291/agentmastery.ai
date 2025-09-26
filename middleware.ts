import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { resolveToCanonical } from './app/compare/_lib/slug-normalize';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle compare page redirects
  if (pathname.startsWith('/compare/') && pathname !== '/compare/') {
    const slug = pathname.replace('/compare/', '');
    const result = resolveToCanonical(slug);

    if (result.type === 'redirect') {
      const url = new URL(`/compare/${result.target}`, request.url);
      return NextResponse.redirect(url, { status: 308 });
    }
  }

  // Normalize trailing slashes (remove them except for root)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = new URL(pathname.slice(0, -1), request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, { status: 308 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)',
  ],
};