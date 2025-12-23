import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

/**
 * Priority: 
 * 1. Cookie 'NEXT_LOCALE'
 * 2. Accept-Language Header
 * 3. GeoIP (Vercel/Cloudflare headers)
 * 4. Default Locale (id)
 */
function getLocale(request: NextRequest): string {
  // 1. Check Cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // 2. Check GeoIP (Optional fallback)
  const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry');
  if (country === 'ID') return 'id';

  // 3. Check Browser Language
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (e) {
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  const pathnameLocale = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 1. Handle FORBIDDEN /id slug (default language must not have slug)
  if (pathnameLocale === i18n.defaultLocale) {
    const newPathname = pathname.replace(`/${i18n.defaultLocale}`, '') || '/';
    const response = NextResponse.redirect(new URL(newPathname, request.url));
    response.cookies.set('NEXT_LOCALE', i18n.defaultLocale, { path: '/', maxAge: 31536000 });
    return response;
  }

  // 2. Handle Non-Default Locale Slug (e.g. /en)
  if (pathnameLocale) {
    const response = NextResponse.next();
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    
    // Sync cookie if it differs from URL slug
    if (cookieLocale !== pathnameLocale) {
      response.cookies.set('NEXT_LOCALE', pathnameLocale, { path: '/', maxAge: 31536000 });
    }
    return response;
  }

  // 3. Handle No Slug (Root / or /path)
  const preferredLocale = getLocale(request);

  // If preferred locale is NOT the default, redirect to its slug
  if (preferredLocale !== i18n.defaultLocale) {
    const response = NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname === '/' ? '' : pathname}`, request.url)
    );
    // Only set cookie if it doesn't exist to prevent overriding manual choices if something went wrong
    if (!request.cookies.has('NEXT_LOCALE')) {
        response.cookies.set('NEXT_LOCALE', preferredLocale, { path: '/', maxAge: 31536000 });
    }
    return response;
  }

  // If preferred locale IS default, rewrite internally to include the slug so it matches [lang]
  // This keeps the URL clean (no /id) while allowing the app to share code via [lang]
  const response = NextResponse.rewrite(
    new URL(`/${i18n.defaultLocale}${pathname}`, request.url)
  );
  
  // Persist default locale to cookie on first visit
  if (!request.cookies.has('NEXT_LOCALE')) {
    response.cookies.set('NEXT_LOCALE', i18n.defaultLocale, { path: '/', maxAge: 31536000 });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
