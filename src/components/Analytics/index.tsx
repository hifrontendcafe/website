'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import gaService from '@/lib/gtag';
import { hotjar } from 'react-hotjar';

export default function Analytics() {
  const pathname = usePathname();

  const handleAcceptCookie = () => gaService.initGA();

  useEffect(() => {
    const isConsent = getCookieConsentValue();

    if (isConsent === 'true') {
      handleAcceptCookie();
    }

    hotjar.initialize(
      parseInt(process.env.NEXT_PUBLIC_HOTJAR_HJID, 10),
      parseInt(process.env.NEXT_PUBLIC_HOTJAR_HJSV, 10),
    );
  }, []);

  useEffect(() => {
    if (pathname) {
      gaService.pageView(pathname);
    }
  }, [pathname]);

  return (
    <>
      <CookieConsent
        disableStyles
        containerClasses="fixed mb-4 left-0 right-0 bottom-4 flex text-primary justify-between px-4 py-2 items-center bg-zinc-700 z-20 container mx-auto rounded-md"
        buttonText="Aceptar"
        buttonClasses="btn btn-primary rounded-lg"
        onAccept={handleAcceptCookie}
      >
        Este sitio usa cookies para mejorar la experiencia de usuario.
      </CookieConsent>

      <VercelAnalytics />
    </>
  );
}
