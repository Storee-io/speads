import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Check if locale cookie exists
  const localeCookie = request.cookies.get('NEXT_LOCALE');
  
  if (!localeCookie) {
    // 1. Detect country from Vercel headers
    const country = request.headers.get('x-vercel-ip-country');
    
    // 2. Detect from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    const isIndonesianBrowser = acceptLanguage?.toLowerCase().includes('id');
    
    let detectedLocale: 'en' | 'id' = 'en';

    if (country === 'ID' || isIndonesianBrowser) {
      detectedLocale = 'id';
    }
    
    // Set cookie for client-side persistence
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      path: '/',
      maxAge: 31536000, // Fixed: maxAge instead of maxAction
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, static, etc.)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
