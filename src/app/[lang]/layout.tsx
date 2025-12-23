import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { LanguageProvider, type Locale } from "@/lib/i18n";
import { cookies, headers } from "next/headers";

export const metadata: Metadata = {
  title: "Speads | AI-Powered Software Development Agency",
  description: "Build websites, apps, and custom software 10x faster and cheaper with AI-assisted development. From startups to corporates, we scale your vision.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headersList = await headers();
  
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  let initialLocale: Locale | undefined = (localeCookie?.value === 'id' || localeCookie?.value === 'en') 
    ? localeCookie.value as Locale 
    : undefined;

  // Fallback to headers for first request
  if (!initialLocale) {
    const country = headersList.get('x-vercel-ip-country');
    const acceptLanguage = headersList.get('accept-language');
    if (country === 'ID' || acceptLanguage?.toLowerCase().includes('id')) {
      initialLocale = 'id';
    }
  }

  return (
    <html lang={initialLocale || "en"} className="scroll-smooth">
      <body className="font-sans antialiased">
        <LanguageProvider initialLocale={initialLocale}>
          <Script
            id="orchids-browser-logs"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
            strategy="afterInteractive"
            data-orchids-project-id="34d98f4a-1f34-4ce6-88f7-adf01ee0e5f6"
          />
          <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />
          {children}
          <VisualEditsMessenger />
        </LanguageProvider>
      </body>
    </html>
  );
}
