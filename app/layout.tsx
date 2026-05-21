import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  title: "ML Beauty - Semi-Permanent & Dépose à Chessy",
  description: "ML Beauty propose des prestations de semi-permanent, dépose, manucure et soin des ongles à Chessy, Val d'Europe et Marne la Vallée, avec déplacement jusqu'à 15 km pour des rendez-vous professionnels à domicile.",
  keywords: ['semi-permanent', 'dépose', 'ongles', 'manucure', 'Chessy', "Val d'Europe", 'Marne la Vallée', 'déplacement 15 km'],
  authors: [{ name: 'ML Beauty' }],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: '/logos/logo.png',
  },
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://nails-beauty.com',
    siteName: 'ML Beauty',
    title: 'ML Beauty - Semi-Permanent & Dépose à Chessy',
    description: "Service local de semi-permanent, dépose et manucure à Chessy, Val d'Europe et Marne la Vallée, avec déplacement jusqu'à 15 km.",
    images: [
      {
        url: '/images/realisattions/33.jpg',
        width: 1200,
        height: 630,
        alt: 'ML Beauty réalisations',
      },
    ]
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <Script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          strategy="beforeInteractive"
        />
        {/* Google Analytics 4 - charge après l'interactivité */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5LK89NEFC9"
          strategy="afterInteractive"
          id="ga-script"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());
gtag('config', 'G-5LK89NEFC9');`}
        </Script>
      </head>
      <body>
        <Navbar />
        <GoogleAnalytics />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
