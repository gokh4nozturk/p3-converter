import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'P3 Converter | File Conversion Tool',
  description:
    'Fast and easy file conversion tool. Convert between multiple file formats with just a few clicks.',
  keywords: ['file converter', 'format conversion', 'online converter', 'document conversion'],
  authors: [{ name: 'gokh4nozturk' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://p3-converter.vercel.app',
    title: 'P3 Converter | File Conversion Tool',
    description:
      'Fast and easy file conversion tool. Convert between multiple file formats with just a few clicks.',
    siteName: 'P3 Converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'P3 Converter | File Conversion Tool',
    description:
      'Fast and easy file conversion tool. Convert between multiple file formats with just a few clicks.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}</head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="bottom-right" richColors />
        {children}
        <Footer />
      </body>
    </html>
  );
}
