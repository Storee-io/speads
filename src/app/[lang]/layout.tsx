import type { Metadata, ResolvingMetadata } from "next";
import "../globals.css";
import VisualEditsMessenger from "../../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { LanguageProvider } from "@/lib/i18n";
import { i18n, type Locale } from "@/i18n-config";
import { ContactModalProvider } from "@/components/contact-modal-context";

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
  
  // Replace with your actual domain
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://speads.id';
  
  return {
    title: lang === 'id' 
      ? "Speads | Agensi Pengembangan Software Berbasis AI" 
      : "Speads | AI-Powered Software Development Agency",
    description: lang === 'id'
      ? "Bangun website, aplikasi, dan software kustom 10x lebih cepat dan murah dengan pengembangan berbantuan AI. Dari startup hingga korporat, kami mewujudkan visi Anda."
      : "Build websites, apps, and custom software 10x faster and cheaper with AI-assisted development. From startups to corporates, we scale your vision.",
    alternates: {
      canonical: lang === i18n.defaultLocale ? baseUrl : `${baseUrl}/${lang}`,
      languages: {
        'id-ID': baseUrl, // Default language at root
        'en-US': `${baseUrl}/en`,
        'x-default': baseUrl,
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
        <html lang={lang} className="scroll-smooth dark" suppressHydrationWarning>
          <body className="font-sans antialiased bg-slate-950 text-zinc-100 selection:bg-indigo-500/30">
        <LanguageProvider initialLocale={lang}>
          <ContactModalProvider>
            <Script
              id="orchids-browser-logs"

            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
            strategy="afterInteractive"
            data-orchids-project-id="34d98f4a-1f34-4ce6-88f7-adf01ee0e5f6"
          />
          <ErrorReporter />
          <Script
            id="route-messenger"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "Speads", "version": "1.0.0"}'
          />
          {children}
          <VisualEditsMessenger />
        </LanguageProvider>
      </body>
    </html>
  );
}
