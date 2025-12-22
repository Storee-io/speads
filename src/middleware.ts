import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Check if locale cookie exists
  const localeCookie = request.cookies.get('NEXT_LOCALE');
  
  if (!localeCookie) {
    // Detect country from Vercel headers
    const country = request.headers.get('x-vercel-ip-country') || 'US';
    
    // Simple logic: if ID (Indonesia), set to 'id', else 'en'
    const detectedLocale = country === 'ID' ? 'id' : 'en';
    
    // Set cookie for client-side persistence
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      path: '/',
      maxAction: 31536000,
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
