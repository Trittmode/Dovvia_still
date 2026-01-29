import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { Toaster } from '@/components/ui/toaster';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - Premium Glass Bottled Water Nigeria`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'glass bottled water',
    'premium water Nigeria',
    'still water',
    'sustainable water',
    'circular economy',
    'eco-friendly water',
    'Lagos water',
    'pure water',
    'Dovvia',
  ],
  authors: [{ name: SITE_CONFIG.company }],
  creator: SITE_CONFIG.company,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} - Premium Glass Bottled Water Nigeria`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/dovvia_still.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dovvia Still Premium Glass Bottled Water',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} - Premium Glass Bottled Water Nigeria`,
    description: SITE_CONFIG.description,
    images: ['/dovvia_still.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
