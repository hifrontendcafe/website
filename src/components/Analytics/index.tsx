// import { useEffect } from 'react';
// import { usePathname } from 'next/navigation';
import Script from 'next/script';

import CookieConsent from './CookieConsent';
import VercelAnalytics from './Vercel';

export default function Analytics() {
  return (
    <>
      <CookieConsent />

      <Script id="hotjar" strategy="lazyOnload">
        {`<!-- Hotjar Tracking Code for https://frontend.cafe -->
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_HJID},hjsv:${process.env.NEXT_PUBLIC_HOTJAR_HJSV}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
      </Script>

      <VercelAnalytics />
    </>
  );
}
