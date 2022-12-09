import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';

import gaService from '@/lib/gtag';
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';

import '@/styles/index.css';
import '@/styles/menu.css';
import '@/styles/scrollbar.css';

import { SettingsProvider } from '@/lib/settings';

import { Lexend_Deca, Rubik } from '@next/font/google';

const lexend = Lexend_Deca({
  subsets: ['latin'],
  variable: '--font-lexend',
});

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

function handleAcceptCookie() {
  gaService.initGA();
}

function handleRouteChange(url: URL) {
  gaService.pageView(url);
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

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
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider session={pageProps.session}>
      <SettingsProvider settings={pageProps.settings}>
        <div
          className={`${rubik.variable} font-sans ${lexend.variable} font-title`}
        >
          <Component {...pageProps} />
        </div>
        <CookieConsent
          disableStyles
          containerClasses="fixed mb-4 left-0 right-0 bottom-4 flex text-primary justify-between px-4 py-2 items-center bg-zinc-700 z-20 container mx-auto rounded-md"
          buttonText="Aceptar"
          buttonClasses="btn btn-primary rounded-lg"
          onAccept={handleAcceptCookie}
        >
          Este sitio usa cookies para mejorar la experiencia de usuario.
        </CookieConsent>
      </SettingsProvider>
    </Provider>
  );
};

export default MyApp;
