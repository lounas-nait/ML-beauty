"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA_ID = 'G-5LK89NEFC9';

export default function GoogleAnalytics(): null {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Ne rien faire si gtag n'est pas chargé
    if (!(window as any).gtag) return;
    (window as any).gtag('config', GA_ID, { page_path: pathname });
  }, [pathname]);

  return null;
}
