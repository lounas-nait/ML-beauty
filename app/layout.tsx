import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'MLbeauty - Prothésiste Ongulaire à Domicile',
  description: 'Service de pose de gel, semi-permanent et nail art haut de gamme à domicile. Paris et alentours.',
  keywords: ['nail art', 'ongles', 'gel', 'prothésiste', 'beauté', 'domicile', 'Paris'],
  authors: [{ name: 'MLbeauty' }],
  viewport: {
  width: "device-width",
  initialScale: 1,
},
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://nails-beauty.com',
    siteName: 'MLbeauty',
    title: 'MLbeauty - Prothésiste Ongulaire à Domicile',
    description: 'Service de pose de gel, semi-permanent et nail art haut de gamme à domicile.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'MLbeauty',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head />
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
