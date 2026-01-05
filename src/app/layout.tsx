import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/07499db0-1c82-4b25-9a10-20f14972a9a0/Icon-Speads-1767433693990.png?width=8000&height=8000&resize=contain',
    shortcut: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/07499db0-1c82-4b25-9a10-20f14972a9a0/Icon-Speads-1767433693990.png?width=8000&height=8000&resize=contain',
    apple: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/07499db0-1c82-4b25-9a10-20f14972a9a0/Icon-Speads-1767433693990.png?width=8000&height=8000&resize=contain',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="07499db0-1c82-4b25-9a10-20f14972a9a0"
        />
        {children}
      </body>
    </html>
  );
}