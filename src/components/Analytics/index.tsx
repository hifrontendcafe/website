// import { useEffect } from 'react';
// import { usePathname } from 'next/navigation';
import Script from 'next/script';

import CookieConsent from './CookieConsent';
import VercelAnalytics from './Vercel';

export default function Analytics() {
  return (
    <>
      <CookieConsent />

      <Script
        strategy="afterInteractive"
        src={`https://static.hotjar.com/c/hotjar-${process.env.NEXT_PUBLIC_HOTJAR_HJID}.js?sv=${process.env.NEXT_PUBLIC_HOTJAR_HJSV}`}
      />

      <VercelAnalytics />
    </>
  );
}
