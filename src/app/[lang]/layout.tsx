import type { Metadata, ResolvingMetadata } from "next";
import "../globals.css";
import VisualEditsMessenger from "../../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { LanguageProvider } from "@/lib/i18n";
import { i18n, type Locale } from "@/i18n-config";

type Props = {
  params: Promise<{ lang: Locale }>;
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang } = await params;
  
  // Base metadata from parent or hardcoded
  return {
    title: lang === 'id' 
      ? "Speads | Agensi Pengembangan Software Berbasis AI" 
      : "Speads | AI-Powered Software Development Agency",
    description: lang === 'id'
      ? "Bangun website, aplikasi, dan software kustom 10x lebih cepat dan murah dengan pengembangan berbantuan AI. Dari startup hingga korporat, kami mewujudkan visi Anda."
      : "Build websites, apps, and custom software 10x faster and cheaper with AI-assisted development. From startups to corporates, we scale your vision.",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en-US': '/en',
        'id-ID': '/id',
        'x-default': '/id',
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth">
      <body className="font-sans antialiased">
        <LanguageProvider initialLocale={lang}>
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
