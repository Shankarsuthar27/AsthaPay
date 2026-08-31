import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A1931',
};

export const metadata: Metadata = {
  title: 'AsthaPay - Turnkey B2B FinTech, Payments & Banking Infrastructure',
  description: 'Launch 25+ turnkey banking services including AePS, Micro ATM, DMT, BBPS, and E-Governance under your own brand with unified wallet and multi-bank switches.',
  keywords: [
    'AsthaPay',
    'B2B FinTech Platform',
    'White Label Banking',
    'AePS Software',
    'Micro ATM Machine',
    'BBPS Bill Payment Switch',
    'DMT Money Transfer API',
    'NSDL PAN Card Center'
  ],
  authors: [{ name: 'AsthaPay Technologies' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <body className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-[#EEF5FF] via-white to-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}

